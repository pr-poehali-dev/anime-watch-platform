import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/187f0f61-f364-4a3d-a404-661603d2a649.jpg";

const ANIME_DATA = [
  {
    id: 1,
    title: "Клинок, рассекающий демонов",
    titleJp: "Клинок",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/fcb7b6e2-8e17-475d-8c8c-4b72575f45ea.jpg",
    genres: ["Экшн", "Фэнтези", "Драма"],
    rating: 9.1,
    episodes: 26,
    year: 2019,
    status: "Завершён",
    views: "12M",
    isNew: false,
    description: "Эпическая история о юноше, вступившем в бой с демонами ради спасения сестры.",
  },
  {
    id: 2,
    title: "Атака титанов",
    titleJp: "Атака",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/b3a31336-f102-409e-9456-488864d052cf.jpg",
    genres: ["Экшн", "Тёмное фэнтези"],
    rating: 9.0,
    episodes: 87,
    year: 2013,
    status: "Завершён",
    views: "25M",
    isNew: false,
    description: "Человечество сражается за выживание против гигантских существ.",
  },
  {
    id: 3,
    title: "Твоё имя",
    titleJp: "Твоё имя",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/6c45aa6a-4f6d-46b5-84cc-90439f09b832.jpg",
    genres: ["Романтика", "Драма", "Фэнтези"],
    rating: 8.9,
    episodes: 1,
    year: 2016,
    status: "Фильм",
    views: "8M",
    isNew: false,
    description: "Двое подростков обнаруживают таинственную связь между собой.",
  },
  {
    id: 4,
    title: "Код Гиас",
    titleJp: "Код Гиас",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/b3a31336-f102-409e-9456-488864d052cf.jpg",
    genres: ["Меха", "Экшн", "Драма"],
    rating: 8.8,
    episodes: 50,
    year: 2006,
    status: "Завершён",
    views: "9M",
    isNew: false,
    description: "Изгнанный принц получает силу абсолютного повиновения.",
  },
  {
    id: 5,
    title: "Магическая битва",
    titleJp: "Магическая битва",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/fcb7b6e2-8e17-475d-8c8c-4b72575f45ea.jpg",
    genres: ["Экшн", "Тёмное фэнтези"],
    rating: 8.7,
    episodes: 47,
    year: 2020,
    status: "Онгоинг",
    views: "15M",
    isNew: true,
    description: "Студент проглатывает проклятый палец и становится вместилищем демона.",
  },
  {
    id: 6,
    title: "Одним ударом",
    titleJp: "Одним ударом",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/b3a31336-f102-409e-9456-488864d052cf.jpg",
    genres: ["Комедия", "Экшн", "Супергерой"],
    rating: 8.6,
    episodes: 24,
    year: 2015,
    status: "Онгоинг",
    views: "11M",
    isNew: false,
    description: "Герой настолько силён, что побеждает всех одним ударом.",
  },
  {
    id: 7,
    title: "Хвост феи",
    titleJp: "Хвост феи",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/6c45aa6a-4f6d-46b5-84cc-90439f09b832.jpg",
    genres: ["Приключения", "Фэнтези", "Комедия"],
    rating: 8.3,
    episodes: 328,
    year: 2009,
    status: "Завершён",
    views: "7M",
    isNew: false,
    description: "Приключения гильдии волшебников в магическом мире.",
  },
  {
    id: 8,
    title: "Re:Zero",
    titleJp: "Re:Zero",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/fcb7b6e2-8e17-475d-8c8c-4b72575f45ea.jpg",
    genres: ["Исекай", "Драма", "Тёмное фэнтези"],
    rating: 8.8,
    episodes: 50,
    year: 2016,
    status: "Завершён",
    views: "13M",
    isNew: false,
    description: "Парень попадает в другой мир и обнаруживает способность возрождаться.",
  },
];

const GENRES = ["Все", "Экшн", "Романтика", "Фэнтези", "Комедия", "Драма", "Меха", "Исекай", "Тёмное фэнтези", "Приключения", "Супергерой"];
const SAKURA = ["🌸", "🌺", "✿", "❀", "🌸"];

type Page = "home" | "catalog" | "favorites" | "profile";

const WATCH_HISTORY = [1, 3, 2];
const INIT_FAVORITES = [2, 5, 7];

export default function Index() {
  const [activePage, setActivePage] = useState<Page>("home");
  const [activeGenre, setActiveGenre] = useState("Все");
  const [searchQuery, setSearchQuery] = useState("");
  const [favList, setFavList] = useState<number[]>(INIT_FAVORITES);
  const [particles, setParticles] = useState<{ id: number; x: number; delay: number; duration: number; symbol: string }[]>([]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [statusFilter, setStatusFilter] = useState("Все");
  const [selectedAnime, setSelectedAnime] = useState<typeof ANIME_DATA[0] | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [comments, setComments] = useState([
    { id: 1, user: "КацукиФан", text: "Невероятная анимация! Обожаю эту серию.", time: "2 ч назад", avatar: "🦊" },
    { id: 2, user: "АнимеОтаку", text: "Лучшее аниме этого сезона, без сомнений.", time: "5 ч назад", avatar: "🐉" },
    { id: 3, user: "СакураЧан", text: "Плакала на каждой серии 😭", time: "1 д назад", avatar: "🌸" },
  ]);
  const [newComment, setNewComment] = useState("");
  const [watchedCount] = useState(3);
  const [commentCount, setCommentCount] = useState(3);

  useEffect(() => {
    const pts = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 6,
      symbol: SAKURA[Math.floor(Math.random() * SAKURA.length)],
    }));
    setParticles(pts);
  }, []);

  const filteredAnime = ANIME_DATA.filter((a) => {
    const matchGenre = activeGenre === "Все" || a.genres.includes(activeGenre);
    const matchSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.titleJp.includes(searchQuery);
    const matchRating = ratingFilter === 0 || a.rating >= ratingFilter;
    const matchStatus = statusFilter === "Все" || a.status === statusFilter;
    return matchGenre && matchSearch && matchRating && matchStatus;
  });

  const recommended = ANIME_DATA.filter(
    (a) => !WATCH_HISTORY.includes(a.id) && a.rating >= 8.7
  ).slice(0, 4);

  const toggleFav = (id: number) => {
    setFavList((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const addComment = () => {
    if (!newComment.trim()) return;
    setComments((prev) => [{ id: Date.now(), user: "Вы", text: newComment, time: "Только что", avatar: "⭐" }, ...prev]);
    setCommentCount((c) => c + 1);
    setNewComment("");
  };

  const openAnime = (anime: typeof ANIME_DATA[0]) => {
    setSelectedAnime(anime);
    setActiveTab("overview");
  };

  const heroAnime = ANIME_DATA[0];

  return (
    <div style={{ minHeight: "100vh", background: "var(--dark-bg)" }}>
      {/* Sakura particles */}
      {particles.map((p) => (
        <div key={p.id} className="sakura-particle" style={{ left: `${p.x}%`, animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s` }}>
          {p.symbol}
        </div>
      ))}

      {/* NAVBAR */}
      <nav style={{ background: "rgba(8,8,16,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(180,77,255,0.2)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div className="font-zen glitch" style={{ fontSize: 22, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }} onClick={() => { const newest = [...ANIME_DATA].filter(a => a.isNew).pop() || [...ANIME_DATA].at(-1)!; openAnime(newest); }}>
            <span style={{ color: "var(--neon-pink)", textShadow: "0 0 8px rgba(255,45,120,1), 0 0 20px rgba(255,45,120,0.9), 0 0 40px rgba(255,45,120,0.6), 0 0 80px rgba(180,77,255,0.4)" }}>Аниме</span>
            <span style={{ color: "white", textShadow: "0 0 8px rgba(255,255,255,0.9), 0 0 20px rgba(180,77,255,0.8), 0 0 40px rgba(180,77,255,0.5)" }}>Портал</span>
          </div>

          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {[
              { id: "home", label: "Главная", icon: "Home" },
              { id: "catalog", label: "Каталог", icon: "Grid3X3" },
              { id: "favorites", label: "Избранное", icon: "Heart" },
              { id: "profile", label: "Профиль", icon: "User" },
            ].map((item) => (
              <button key={item.id} className={`nav-link ${activePage === item.id ? "active" : ""}`} onClick={() => setActivePage(item.id as Page)} style={{ background: "none", border: "none", display: "flex", alignItems: "center", gap: 6, padding: "4px 0" }}>
                <Icon name={item.icon} size={16} />
                {item.label}
              </button>
            ))}
          </div>

          <div style={{ position: "relative", width: 240 }}>
            <input className="search-input" placeholder="Поиск аниме..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); if (e.target.value) setActivePage("catalog"); }} />
            <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)" }}>
              <Icon name="Search" size={16} style={{ color: "rgba(255,255,255,0.4)" }} />
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px" }}>

        {/* HOME */}
        {activePage === "home" && (
          <div>
            {/* Hero */}
            <div className="hero-banner animate-fade-in-up" style={{ height: 480, position: "relative", marginBottom: 48 }}>
              <img src={HERO_IMAGE} alt="hero" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, zIndex: 2, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 48 }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                  {heroAnime.genres.map((g) => <span key={g} className="genre-chip" style={{ fontSize: 12 }}>{g}</span>)}
                </div>
                <div className="font-zen" style={{ fontSize: 13, color: "var(--neon-pink)", marginBottom: 8, letterSpacing: 2 }}>{heroAnime.titleJp}</div>
                <h1 className="font-rajdhani" style={{ fontSize: 42, fontWeight: 700, color: "white", margin: "0 0 12px", lineHeight: 1.1, textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}>{heroAnime.title}</h1>
                <p style={{ color: "rgba(255,255,255,0.75)", maxWidth: 480, fontSize: 15, lineHeight: 1.6, marginBottom: 28 }}>{heroAnime.description}</p>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <button className="btn-neon animate-pulse-glow" onClick={() => openAnime(heroAnime)} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Icon name="Play" size={18} /> Смотреть
                  </button>
                  <button className="btn-ghost-neon" onClick={() => toggleFav(heroAnime.id)} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Icon name={favList.includes(heroAnime.id) ? "HeartOff" : "Heart"} size={16} />
                    {favList.includes(heroAnime.id) ? "В избранном" : "В избранное"}
                  </button>
                  <span className="rating-badge" style={{ marginLeft: 12 }}>⭐ {heroAnime.rating}</span>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <SectionTitle icon="✦" iconColor="var(--neon-cyan)" title="Рекомендации для вас" subtitle="на основе истории" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
              {recommended.map((anime, i) => (
                <AnimeCard key={anime.id} anime={anime} isFav={favList.includes(anime.id)} onFav={() => toggleFav(anime.id)} onClick={() => openAnime(anime)} style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>

            {/* Continue watching */}
            <div style={{ marginTop: 48 }}>
              <SectionTitle icon="⟳" iconColor="var(--neon-purple)" title="Продолжить просмотр" />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
                {WATCH_HISTORY.map((id, i) => {
                  const anime = ANIME_DATA.find((a) => a.id === id)!;
                  const progress = [65, 30, 100][i] || 50;
                  return (
                    <div key={id} className="anime-card" style={{ display: "flex", gap: 16, padding: 16, cursor: "pointer" }} onClick={() => openAnime(anime)}>
                      <img src={anime.image} alt={anime.title} style={{ width: 80, height: 110, objectFit: "cover", borderRadius: 8, flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 11, color: "var(--neon-pink)", fontFamily: "'Zen Dots',cursive", marginBottom: 4 }}>{anime.titleJp}</div>
                        <div className="font-rajdhani" style={{ fontWeight: 600, color: "white", fontSize: 16, marginBottom: 8 }}>{anime.title}</div>
                        <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                          {anime.genres.slice(0, 2).map((g) => <span key={g} className="genre-chip" style={{ fontSize: 11, padding: "3px 10px" }}>{g}</span>)}
                        </div>
                        <div className="progress-bar"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>Серия {Math.floor(anime.episodes * progress / 100)} из {anime.episodes}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top rated */}
            <div style={{ marginTop: 48 }}>
              <SectionTitle icon="★" iconColor="var(--neon-pink)" title="Топ рейтинга" />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
                {[...ANIME_DATA].sort((a, b) => b.rating - a.rating).slice(0, 4).map((anime, i) => (
                  <AnimeCard key={anime.id} anime={anime} isFav={favList.includes(anime.id)} onFav={() => toggleFav(anime.id)} onClick={() => openAnime(anime)} rankNum={i + 1} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CATALOG */}
        {activePage === "catalog" && (
          <div>
            <div style={{ marginBottom: 32 }}>
              <h1 className="font-rajdhani" style={{ fontSize: 32, fontWeight: 700, color: "white", marginBottom: 8 }}>
                <span className="neon-text-purple">★</span> Каталог аниме
              </h1>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>Найдено {filteredAnime.length} тайтлов</p>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
              {GENRES.map((g) => <button key={g} className={`genre-chip ${activeGenre === g ? "active" : ""}`} onClick={() => setActiveGenre(g)}>{g}</button>)}
            </div>

            <div style={{ display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, fontFamily: "'Rajdhani',sans-serif" }}>Рейтинг от:</span>
                {[0, 7, 8, 9].map((r) => (
                  <button key={r} onClick={() => setRatingFilter(r)} style={{ padding: "5px 14px", borderRadius: 6, border: `1px solid ${ratingFilter === r ? "var(--neon-gold)" : "rgba(255,255,255,0.15)"}`, background: ratingFilter === r ? "rgba(255,215,0,0.15)" : "transparent", color: ratingFilter === r ? "var(--neon-gold)" : "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 13, fontFamily: "'Rajdhani',sans-serif", fontWeight: 600, transition: "all 0.2s" }}>
                    {r === 0 ? "Любой" : `${r}+`}
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, fontFamily: "'Rajdhani',sans-serif" }}>Статус:</span>
                {["Все", "Онгоинг", "Завершён", "Фильм"].map((s) => (
                  <button key={s} onClick={() => setStatusFilter(s)} style={{ padding: "5px 14px", borderRadius: 6, border: `1px solid ${statusFilter === s ? "var(--neon-cyan)" : "rgba(255,255,255,0.15)"}`, background: statusFilter === s ? "rgba(0,212,255,0.1)" : "transparent", color: statusFilter === s ? "var(--neon-cyan)" : "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 13, fontFamily: "'Rajdhani',sans-serif", fontWeight: 600, transition: "all 0.2s" }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {filteredAnime.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0", color: "rgba(255,255,255,0.3)" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                <div className="font-rajdhani" style={{ fontSize: 20 }}>Ничего не найдено</div>
                <div style={{ fontSize: 14, marginTop: 8 }}>Попробуй другие фильтры или поисковый запрос</div>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
                {filteredAnime.map((anime) => <AnimeCard key={anime.id} anime={anime} isFav={favList.includes(anime.id)} onFav={() => toggleFav(anime.id)} onClick={() => openAnime(anime)} />)}
              </div>
            )}
          </div>
        )}

        {/* FAVORITES */}
        {activePage === "favorites" && (
          <div>
            <div style={{ marginBottom: 32 }}>
              <h1 className="font-rajdhani" style={{ fontSize: 32, fontWeight: 700, color: "white", marginBottom: 8, display: "flex", alignItems: "center", gap: 12 }}>
                <Icon name="Heart" size={28} style={{ color: "var(--neon-pink)" }} />
                Моё избранное
              </h1>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>{favList.length} тайтлов в коллекции</p>
            </div>
            {favList.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0", color: "rgba(255,255,255,0.3)" }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>💔</div>
                <div className="font-rajdhani" style={{ fontSize: 24 }}>Список пуст</div>
                <div style={{ fontSize: 14, marginTop: 8 }}>Добавляй аниме через ♡ на карточках</div>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
                {favList.map((id) => {
                  const anime = ANIME_DATA.find((a) => a.id === id);
                  if (!anime) return null;
                  return <AnimeCard key={anime.id} anime={anime} isFav={true} onFav={() => toggleFav(anime.id)} onClick={() => openAnime(anime)} />;
                })}
              </div>
            )}
          </div>
        )}

        {/* PROFILE */}
        {activePage === "profile" && (
          <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 32 }}>
            <div>
              <div className="anime-card" style={{ padding: 32, textAlign: "center", background: "linear-gradient(160deg,#0e0e1a,#14102a)" }}>
                <div style={{ width: 96, height: 96, borderRadius: "50%", margin: "0 auto 20px", background: "linear-gradient(135deg,var(--neon-pink),var(--neon-purple))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, boxShadow: "0 0 30px rgba(255,45,120,0.5)" }}>🦊</div>
                <div className="font-rajdhani" style={{ fontSize: 22, fontWeight: 700, color: "white" }}>АнимеОтаку</div>
                <div style={{ color: "var(--neon-purple)", fontSize: 13, marginTop: 4 }}>@anime_otaku_69</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, margin: "24px 0", padding: "20px 0", borderTop: "1px solid var(--card-border)", borderBottom: "1px solid var(--card-border)" }}>
                  {[{ label: "Просмотрено", value: WATCH_HISTORY.length }, { label: "Избранное", value: favList.length }, { label: "Оценок", value: 47 }].map((stat) => (
                    <div key={stat.label}>
                      <div className="font-rajdhani" style={{ fontSize: 24, fontWeight: 700, color: "var(--neon-pink)" }}>{stat.value}</div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
                <button className="btn-neon" style={{ width: "100%" }}>Настроить профиль</button>
              </div>

              <div className="anime-card" style={{ padding: 24, marginTop: 20 }}>
                <div className="font-rajdhani" style={{ fontSize: 16, fontWeight: 700, color: "white", marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
                  🏅 Достижения
                </div>
                {[
                  {
                    icon: "🎬", title: "Новичок", desc: "Просмотри 1 аниме", current: watchedCount, max: 1, unlocked: watchedCount >= 1, color: "var(--neon-cyan)"
                  },
                  {
                    icon: "📺", title: "Заядлый зритель", desc: "Просмотри 5 аниме", current: watchedCount, max: 5, unlocked: watchedCount >= 5, color: "var(--neon-purple)"
                  },
                  {
                    icon: "👑", title: "Аниме-мастер", desc: "Просмотри 20 аниме", current: watchedCount, max: 20, unlocked: watchedCount >= 20, color: "var(--neon-gold)"
                  },
                  {
                    icon: "💬", title: "Болтун", desc: "Оставь 1 комментарий", current: commentCount, max: 1, unlocked: commentCount >= 1, color: "var(--neon-cyan)"
                  },
                  {
                    icon: "🗣️", title: "Активист", desc: "Оставь 5 комментариев", current: commentCount, max: 5, unlocked: commentCount >= 5, color: "var(--neon-pink)"
                  },
                  {
                    icon: "📢", title: "Голос сообщества", desc: "Оставь 20 комментариев", current: commentCount, max: 20, unlocked: commentCount >= 20, color: "var(--neon-gold)"
                  },
                  {
                    icon: "❤️", title: "Коллекционер", desc: "Добавь 5+ в избранное", current: favList.length, max: 5, unlocked: favList.length >= 5, color: "var(--neon-pink)"
                  },
                ].map((ach) => {
                  const pct = Math.min(100, Math.round((ach.current / ach.max) * 100));
                  return (
                    <div key={ach.title} style={{ marginBottom: 16, opacity: ach.unlocked ? 1 : 0.55, transition: "opacity 0.3s" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                        <span style={{ fontSize: 22, filter: ach.unlocked ? "none" : "grayscale(1)" }}>{ach.icon}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ color: ach.unlocked ? "white" : "rgba(255,255,255,0.5)", fontSize: 14, fontFamily: "'Rajdhani',sans-serif", fontWeight: 600 }}>{ach.title}</span>
                            {ach.unlocked
                              ? <span style={{ fontSize: 11, background: `${ach.color}22`, color: ach.color, border: `1px solid ${ach.color}55`, borderRadius: 10, padding: "1px 8px", fontFamily: "'Rajdhani',sans-serif", fontWeight: 700 }}>✓ Получено</span>
                              : <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "'Rajdhani',sans-serif" }}>{ach.current}/{ach.max}</span>
                            }
                          </div>
                          <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, marginBottom: 5 }}>{ach.desc}</div>
                        </div>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${pct}%`, background: ach.unlocked ? `linear-gradient(to right, ${ach.color}, ${ach.color})` : "linear-gradient(to right,var(--neon-pink),var(--neon-purple))", boxShadow: ach.unlocked ? `0 0 8px ${ach.color}88` : "none", transition: "width 0.5s ease" }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="anime-card" style={{ padding: 28, marginBottom: 24 }}>
                <div className="font-rajdhani" style={{ fontSize: 18, fontWeight: 700, color: "white", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
                  <Icon name="Clock" size={18} style={{ color: "var(--neon-cyan)" }} />
                  История просмотров
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {WATCH_HISTORY.map((id, i) => {
                    const anime = ANIME_DATA.find((a) => a.id === id)!;
                    const progress = [65, 30, 100][i] || 50;
                    return (
                      <div key={id} style={{ display: "flex", gap: 16, alignItems: "center", cursor: "pointer" }} onClick={() => openAnime(anime)}>
                        <img src={anime.image} alt={anime.title} style={{ width: 56, height: 76, objectFit: "cover", borderRadius: 8, flexShrink: 0 }} />
                        <div style={{ flex: 1 }}>
                          <div className="font-rajdhani" style={{ fontWeight: 600, color: "white", fontSize: 16 }}>{anime.title}</div>
                          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>Серия {Math.floor(anime.episodes * progress / 100)} из {anime.episodes}</div>
                          <div className="progress-bar"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div className="rating-badge">⭐ {anime.rating}</div>
                          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 6 }}>{progress}%</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="anime-card" style={{ padding: 28, background: "linear-gradient(135deg,rgba(0,212,255,0.05),rgba(180,77,255,0.05))", border: "1px solid rgba(0,212,255,0.2)" }}>
                <div className="font-rajdhani" style={{ fontSize: 18, fontWeight: 700, color: "white", marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
                  <Icon name="Sparkles" size={18} style={{ color: "var(--neon-cyan)" }} />
                  Умные рекомендации
                </div>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.7 }}>
                  Алгоритм анализирует историю просмотров, любимые жанры и рейтинги — чтобы предлагать именно то, что понравится. Чем больше смотришь, тем точнее рекомендации.
                </p>
                <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
                  {["Экшн", "Фэнтези", "Драма"].map((g) => <span key={g} className="genre-chip active" style={{ fontSize: 12 }}>{g} ✓</span>)}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ANIME MODAL */}
      {selectedAnime && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, backdropFilter: "blur(8px)" }} onClick={(e) => { if (e.target === e.currentTarget) setSelectedAnime(null); }}>
          <div style={{ background: "var(--card-bg)", border: "1px solid rgba(180,77,255,0.3)", borderRadius: 20, width: "100%", maxWidth: 900, maxHeight: "90vh", overflowY: "auto", position: "relative" }}>
            <button onClick={() => setSelectedAnime(null)} style={{ position: "absolute", top: 20, right: 20, background: "rgba(255,255,255,0.1)", border: "none", color: "white", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="X" size={18} />
            </button>

            <div style={{ position: "relative", height: 280, borderRadius: "20px 20px 0 0", overflow: "hidden" }}>
              <img src={selectedAnime.image} alt={selectedAnime.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,var(--card-bg) 0%,transparent 60%)" }} />
              <div style={{ position: "absolute", bottom: 24, left: 24, right: 60 }}>
                <div className="font-zen" style={{ fontSize: 13, color: "var(--neon-pink)", marginBottom: 6 }}>{selectedAnime.titleJp}</div>
                <h2 className="font-rajdhani" style={{ fontSize: 30, fontWeight: 700, color: "white", margin: 0 }}>{selectedAnime.title}</h2>
              </div>
            </div>

            <div style={{ padding: 32 }}>
              <div style={{ display: "flex", gap: 24, marginBottom: 24, flexWrap: "wrap", alignItems: "center" }}>
                <span className="rating-badge" style={{ fontSize: 14, padding: "5px 12px" }}>⭐ {selectedAnime.rating}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
                  <Icon name="Tv" size={16} />
                  {selectedAnime.episodes} {selectedAnime.episodes === 1 ? "фильм" : "серий"}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
                  <Icon name="Calendar" size={16} />
                  {selectedAnime.year}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
                  <Icon name="Eye" size={16} />
                  {selectedAnime.views}
                </div>
                <span style={{ padding: "4px 14px", borderRadius: 20, background: selectedAnime.status === "Онгоинг" ? "rgba(0,212,255,0.15)" : "rgba(180,77,255,0.15)", color: selectedAnime.status === "Онгоинг" ? "var(--neon-cyan)" : "var(--neon-purple)", fontSize: 13, fontFamily: "'Rajdhani',sans-serif", fontWeight: 600 }}>
                  {selectedAnime.status}
                </span>
              </div>

              <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
                {selectedAnime.genres.map((g) => <span key={g} className="genre-chip">{g}</span>)}
              </div>

              <div style={{ display: "flex", gap: 0, borderBottom: "1px solid var(--card-border)", marginBottom: 24 }}>
                {[{ id: "overview", label: "Описание" }, { id: "episodes", label: "Серии" }, { id: "comments", label: "Комментарии" }].map((tab) => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`font-rajdhani ${activeTab === tab.id ? "tab-active" : ""}`} style={{ padding: "12px 20px", background: "none", border: "none", color: activeTab === tab.id ? "white" : "rgba(255,255,255,0.4)", fontWeight: 600, fontSize: 15, cursor: "pointer", transition: "color 0.2s" }}>
                    {tab.label}
                  </button>
                ))}
              </div>

              {activeTab === "overview" && (
                <div>
                  <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8, fontSize: 15, marginBottom: 28 }}>{selectedAnime.description}</p>
                  <div style={{ display: "flex", gap: 12 }}>
                    <button className="btn-neon" style={{ display: "flex", alignItems: "center", gap: 8 }}><Icon name="Play" size={18} /> Смотреть</button>
                    <button className="btn-ghost-neon" onClick={() => toggleFav(selectedAnime.id)} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Icon name={favList.includes(selectedAnime.id) ? "HeartOff" : "Heart"} size={16} />
                      {favList.includes(selectedAnime.id) ? "Убрать" : "В избранное"}
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "episodes" && (
                <div style={{ display: "grid", gap: 8 }}>
                  {Array.from({ length: Math.min(selectedAnime.episodes, 12) }, (_, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 16px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid var(--card-border)", cursor: "pointer", transition: "all 0.2s" }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: "linear-gradient(135deg,var(--neon-pink),var(--neon-purple))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon name="Play" size={16} style={{ color: "white" }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div className="font-rajdhani" style={{ color: "white", fontWeight: 600 }}>Серия {i + 1}</div>
                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>24 мин · HD</div>
                      </div>
                      {i < 3 && <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>✓ Просмотрено</div>}
                    </div>
                  ))}
                  {selectedAnime.episodes > 12 && <div style={{ textAlign: "center", padding: 16, color: "rgba(255,255,255,0.3)", fontSize: 14 }}>+{selectedAnime.episodes - 12} серий...</div>}
                </div>
              )}

              {activeTab === "comments" && (
                <div>
                  <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
                    <input value={newComment} onChange={(e) => setNewComment(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") addComment(); }} className="search-input" placeholder="Напиши комментарий..." style={{ flex: 1 }} />
                    <button className="btn-neon" onClick={addComment} style={{ padding: "10px 18px" }}><Icon name="Send" size={16} /></button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {comments.map((c) => (
                      <div key={c.id} style={{ display: "flex", gap: 12 }}>
                        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(180,77,255,0.2)", border: "1px solid rgba(180,77,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{c.avatar}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                            <span className="font-rajdhani" style={{ color: "var(--neon-purple)", fontWeight: 600, fontSize: 14 }}>{c.user}</span>
                            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>{c.time}</span>
                          </div>
                          <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, lineHeight: 1.6 }}>{c.text}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <footer style={{ borderTop: "1px solid rgba(180,77,255,0.1)", marginTop: 64, padding: "32px 24px", textAlign: "center" }}>
        <div className="font-zen neon-text-pink" style={{ fontSize: 18, marginBottom: 8 }}>АнимеПортал</div>
        <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 13 }}>© 2024 АнимеПортал · Смотри любимое аниме в HD</div>
      </footer>
    </div>
  );
}

function SectionTitle({ icon, iconColor, title, subtitle }: { icon: string; iconColor: string; title: string; subtitle?: string }) {
  return (
    <div className="section-divider">
      <h2 className="font-rajdhani" style={{ fontSize: 22, fontWeight: 700, color: "white", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 10, margin: 0 }}>
        <span style={{ color: iconColor }}>{icon}</span> {title}
        {subtitle && <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontWeight: 400, marginLeft: 8 }}>{subtitle}</span>}
      </h2>
    </div>
  );
}

function AnimeCard({ anime, isFav, onFav, onClick, style, rankNum }: {
  anime: typeof ANIME_DATA[0];
  isFav: boolean;
  onFav: () => void;
  onClick: () => void;
  style?: React.CSSProperties;
  rankNum?: number;
}) {
  return (
    <div className="anime-card animate-fade-in-up" style={{ cursor: "pointer", ...style }}>
      <div style={{ position: "relative" }} onClick={onClick}>
        <img src={anime.image} alt={anime.title} style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(8,8,16,0.95) 0%,transparent 50%)" }} />
        {rankNum && (
          <div className="font-zen" style={{ position: "absolute", top: 12, left: 12, fontSize: 28, fontWeight: 700, color: "white", textShadow: "0 0 20px rgba(255,45,120,0.8)" }}>#{rankNum}</div>
        )}
        {anime.isNew && (
          <div style={{ position: "absolute", top: 12, left: rankNum ? 56 : 12 }}><span className="tag-new">NEW</span></div>
        )}
        <div style={{ position: "absolute", top: 10, right: 10 }}><span className="rating-badge">⭐ {anime.rating}</span></div>
        <button onClick={(e) => { e.stopPropagation(); onFav(); }} style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(0,0,0,0.6)", border: "none", borderRadius: "50%", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" }}>
          <Icon name="Heart" size={16} style={{ color: isFav ? "var(--neon-pink)" : "rgba(255,255,255,0.6)" }} />
        </button>
      </div>
      <div style={{ padding: 14 }} onClick={onClick}>
        <div className="font-zen" style={{ fontSize: 10, color: "var(--neon-pink)", marginBottom: 4, opacity: 0.8 }}>{anime.titleJp}</div>
        <div className="font-rajdhani" style={{ fontWeight: 600, color: "white", fontSize: 15, marginBottom: 8, lineHeight: 1.3 }}>{anime.title}</div>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 10 }}>
          {anime.genres.slice(0, 2).map((g) => <span key={g} className="genre-chip" style={{ fontSize: 11, padding: "2px 9px" }}>{g}</span>)}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontFamily: "'Rajdhani',sans-serif" }}>{anime.year} · {anime.episodes} {anime.episodes === 1 ? "фильм" : "сер."}</span>
          <span style={{ fontSize: 12, color: anime.status === "Онгоинг" ? "var(--neon-cyan)" : "rgba(255,255,255,0.3)", fontFamily: "'Rajdhani',sans-serif", fontWeight: 600 }}>{anime.status}</span>
        </div>
      </div>
    </div>
  );
}