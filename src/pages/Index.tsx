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
  {
    id: 9,
    title: "Наруто",
    titleJp: "Наруто",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/fcb7b6e2-8e17-475d-8c8c-4b72575f45ea.jpg",
    genres: ["Экшн", "Приключения", "Фэнтези"],
    rating: 8.4,
    episodes: 220,
    year: 2002,
    status: "Завершён",
    views: "30M",
    isNew: false,
    description: "Юный ниндзя мечтает стать главой деревни и обрести признание.",
  },
  {
    id: 10,
    title: "Тетрадь смерти",
    titleJp: "Тетрадь смерти",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/b3a31336-f102-409e-9456-488864d052cf.jpg",
    genres: ["Драма", "Тёмное фэнтези"],
    rating: 9.0,
    episodes: 37,
    year: 2006,
    status: "Завершён",
    views: "20M",
    isNew: false,
    description: "Школьник находит тетрадь, позволяющую убивать людей записывая их имена.",
  },
  {
    id: 11,
    title: "Стальной алхимик",
    titleJp: "Стальной алхимик",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/6c45aa6a-4f6d-46b5-84cc-90439f09b832.jpg",
    genres: ["Экшн", "Фэнтези", "Драма"],
    rating: 9.1,
    episodes: 64,
    year: 2009,
    status: "Завершён",
    views: "18M",
    isNew: false,
    description: "Два брата-алхимика ищут философский камень после трагического ритуала.",
  },
  {
    id: 12,
    title: "Ван Пис",
    titleJp: "Ван Пис",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/fcb7b6e2-8e17-475d-8c8c-4b72575f45ea.jpg",
    genres: ["Экшн", "Приключения", "Комедия"],
    rating: 8.9,
    episodes: 1000,
    year: 1999,
    status: "Онгоинг",
    views: "40M",
    isNew: false,
    description: "Луффи и его команда пиратов отправляются на поиски легендарного сокровища.",
  },
  {
    id: 13,
    title: "Bleach",
    titleJp: "Bleach",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/b3a31336-f102-409e-9456-488864d052cf.jpg",
    genres: ["Экшн", "Тёмное фэнтези"],
    rating: 8.3,
    episodes: 366,
    year: 2004,
    status: "Онгоинг",
    views: "16M",
    isNew: true,
    description: "Подросток получает силу Синигами и защищает людей от злых духов.",
  },
  {
    id: 14,
    title: "Хантер х Хантер",
    titleJp: "Хантер х Хантер",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/6c45aa6a-4f6d-46b5-84cc-90439f09b832.jpg",
    genres: ["Экшн", "Приключения", "Фэнтези"],
    rating: 9.0,
    episodes: 148,
    year: 2011,
    status: "Завершён",
    views: "14M",
    isNew: false,
    description: "Мальчик отправляется в мир охотников, чтобы найти своего отца.",
  },
  {
    id: 15,
    title: "Врата Штейна",
    titleJp: "Врата Штейна",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/fcb7b6e2-8e17-475d-8c8c-4b72575f45ea.jpg",
    genres: ["Фэнтези", "Драма"],
    rating: 9.1,
    episodes: 24,
    year: 2011,
    status: "Завершён",
    views: "11M",
    isNew: false,
    description: "Учёный изобретает машину времени и меняет ход истории с трагическими последствиями.",
  },
  {
    id: 16,
    title: "Аниме про богиню",
    titleJp: "Косомэ",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/6c45aa6a-4f6d-46b5-84cc-90439f09b832.jpg",
    genres: ["Романтика", "Комедия"],
    rating: 7.9,
    episodes: 13,
    year: 2013,
    status: "Завершён",
    views: "4M",
    isNew: false,
    description: "Богиня попадает в мир людей и заводит необычные отношения.",
  },
  {
    id: 17,
    title: "Тоторо",
    titleJp: "Тоторо",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/6c45aa6a-4f6d-46b5-84cc-90439f09b832.jpg",
    genres: ["Приключения", "Фэнтези"],
    rating: 8.2,
    episodes: 1,
    year: 1988,
    status: "Фильм",
    views: "6M",
    isNew: false,
    description: "Две девочки дружат с лесным духом Тоторо в послевоенной Японии.",
  },
  {
    id: 18,
    title: "Евангелион",
    titleJp: "Евангелион",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/b3a31336-f102-409e-9456-488864d052cf.jpg",
    genres: ["Меха", "Драма"],
    rating: 8.5,
    episodes: 26,
    year: 1995,
    status: "Завершён",
    views: "10M",
    isNew: false,
    description: "Подростки управляют гигантскими роботами для защиты человечества.",
  },
  {
    id: 19,
    title: "Клетка для героя",
    titleJp: "Клетка для героя",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/fcb7b6e2-8e17-475d-8c8c-4b72575f45ea.jpg",
    genres: ["Исекай", "Экшн"],
    rating: 8.1,
    episodes: 25,
    year: 2019,
    status: "Завершён",
    views: "8M",
    isNew: false,
    description: "Герой попадает в игровой мир, где необходимо спасти рабынь-героинь.",
  },
  {
    id: 20,
    title: "Акме га Киру",
    titleJp: "Акме",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/b3a31336-f102-409e-9456-488864d052cf.jpg",
    genres: ["Экшн", "Тёмное фэнтези"],
    rating: 7.8,
    episodes: 24,
    year: 2014,
    status: "Завершён",
    views: "6M",
    isNew: false,
    description: "Группа убийц сражается против коррумпированной империи.",
  },
  {
    id: 21,
    title: "Синий экзорцист",
    titleJp: "Синий экзорцист",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/fcb7b6e2-8e17-475d-8c8c-4b72575f45ea.jpg",
    genres: ["Экшн", "Фэнтези"],
    rating: 8.0,
    episodes: 25,
    year: 2011,
    status: "Завершён",
    views: "9M",
    isNew: false,
    description: "Сын Сатаны решает стать экзорцистом и победить отца.",
  },
  {
    id: 22,
    title: "Убийца Акамэ",
    titleJp: "Убийца Акамэ",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/b3a31336-f102-409e-9456-488864d052cf.jpg",
    genres: ["Экшн", "Тёмное фэнтези"],
    rating: 7.9,
    episodes: 24,
    year: 2014,
    status: "Завершён",
    views: "7M",
    isNew: false,
    description: "Молодой боец присоединяется к революционной группе убийц.",
  },
  {
    id: 23,
    title: "Токийский гуль",
    titleJp: "Токийский гуль",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/fcb7b6e2-8e17-475d-8c8c-4b72575f45ea.jpg",
    genres: ["Тёмное фэнтези", "Экшн", "Драма"],
    rating: 7.9,
    episodes: 48,
    year: 2014,
    status: "Завершён",
    views: "12M",
    isNew: false,
    description: "Студент становится гулем после трагической встречи с монстром.",
  },
  {
    id: 24,
    title: "Ромео и Джульетта",
    titleJp: "Ромео",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/6c45aa6a-4f6d-46b5-84cc-90439f09b832.jpg",
    genres: ["Романтика", "Драма"],
    rating: 7.7,
    episodes: 24,
    year: 2007,
    status: "Завершён",
    views: "3M",
    isNew: false,
    description: "Аниме-адаптация классической истории любви Шекспира.",
  },
  {
    id: 25,
    title: "Sword Art Online",
    titleJp: "SAO",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/b3a31336-f102-409e-9456-488864d052cf.jpg",
    genres: ["Экшн", "Исекай", "Романтика"],
    rating: 7.7,
    episodes: 100,
    year: 2012,
    status: "Завершён",
    views: "22M",
    isNew: false,
    description: "Игроки застревают в виртуальной реальности, где смерть означает гибель в реале.",
  },
  {
    id: 26,
    title: "Overlord",
    titleJp: "Overlord",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/b3a31336-f102-409e-9456-488864d052cf.jpg",
    genres: ["Исекай", "Фэнтези", "Экшн"],
    rating: 8.1,
    episodes: 52,
    year: 2015,
    status: "Завершён",
    views: "10M",
    isNew: false,
    description: "Гильдмастер остаётся в игре после её отключения в теле скелета-мага.",
  },
  {
    id: 27,
    title: "That Time I Got Reincarnated",
    titleJp: "Тензура",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/6c45aa6a-4f6d-46b5-84cc-90439f09b832.jpg",
    genres: ["Исекай", "Фэнтези", "Комедия"],
    rating: 8.2,
    episodes: 48,
    year: 2018,
    status: "Завершён",
    views: "11M",
    isNew: false,
    description: "Менеджер перерождается в слизь в магическом мире и строит собственное королевство.",
  },
  {
    id: 28,
    title: "Мой герой академия",
    titleJp: "Боку но Хиро",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/fcb7b6e2-8e17-475d-8c8c-4b72575f45ea.jpg",
    genres: ["Экшн", "Супергерой", "Драма"],
    rating: 8.4,
    episodes: 138,
    year: 2016,
    status: "Онгоинг",
    views: "19M",
    isNew: true,
    description: "Мальчик без способностей мечтает стать великим героем в мире суперсил.",
  },
  {
    id: 29,
    title: "Demon Slayer: Mugen Train",
    titleJp: "Бесконечный поезд",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/b3a31336-f102-409e-9456-488864d052cf.jpg",
    genres: ["Экшн", "Фэнтези", "Драма"],
    rating: 8.8,
    episodes: 1,
    year: 2020,
    status: "Фильм",
    views: "14M",
    isNew: false,
    description: "Отряд охотников на демонов расследует исчезновения людей в поезде.",
  },
  {
    id: 30,
    title: "Клетка для проклятых",
    titleJp: "Клетка",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/6c45aa6a-4f6d-46b5-84cc-90439f09b832.jpg",
    genres: ["Тёмное фэнтези", "Драма"],
    rating: 8.3,
    episodes: 24,
    year: 2021,
    status: "Завершён",
    views: "9M",
    isNew: false,
    description: "Проклятые духи угрожают миру, и только избранные могут их остановить.",
  },
  {
    id: 31,
    title: "Виолетта Эвергарден",
    titleJp: "Виолетта",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/6c45aa6a-4f6d-46b5-84cc-90439f09b832.jpg",
    genres: ["Драма", "Романтика"],
    rating: 8.9,
    episodes: 13,
    year: 2018,
    status: "Завершён",
    views: "8M",
    isNew: false,
    description: "Бывший солдат учится писать письма и понимать человеческие эмоции.",
  },
  {
    id: 32,
    title: "Нет игры нет жизни",
    titleJp: "No Game No Life",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/b3a31336-f102-409e-9456-488864d052cf.jpg",
    genres: ["Исекай", "Комедия", "Фэнтези"],
    rating: 8.3,
    episodes: 12,
    year: 2014,
    status: "Завершён",
    views: "10M",
    isNew: false,
    description: "Два брата-геймера попадают в мир, где всё решается через игры.",
  },
  {
    id: 33,
    title: "Клинок демонов: Арка Развлекательного квартала",
    titleJp: "Арка Ёшивара",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/fcb7b6e2-8e17-475d-8c8c-4b72575f45ea.jpg",
    genres: ["Экшн", "Фэнтези"],
    rating: 8.6,
    episodes: 11,
    year: 2021,
    status: "Завершён",
    views: "13M",
    isNew: true,
    description: "Танджиро и команда раскрывают заговор в квартале развлечений.",
  },
  {
    id: 34,
    title: "Призрак в доспехах",
    titleJp: "Призрак",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/b3a31336-f102-409e-9456-488864d052cf.jpg",
    genres: ["Меха", "Драма"],
    rating: 8.4,
    episodes: 26,
    year: 1995,
    status: "Завершён",
    views: "7M",
    isNew: false,
    description: "Киборг-офицер расследует дела в мире, где граница между человеком и машиной стёрта.",
  },
  {
    id: 35,
    title: "Самурай Чамплу",
    titleJp: "Самурай Чамплу",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/fcb7b6e2-8e17-475d-8c8c-4b72575f45ea.jpg",
    genres: ["Экшн", "Приключения"],
    rating: 8.5,
    episodes: 26,
    year: 2004,
    status: "Завершён",
    views: "6M",
    isNew: false,
    description: "Два воина с разными стилями боя путешествуют с девушкой по Японии эпохи Эдо.",
  },
  {
    id: 36,
    title: "Темнее чёрного",
    titleJp: "Темнее чёрного",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/b3a31336-f102-409e-9456-488864d052cf.jpg",
    genres: ["Экшн", "Тёмное фэнтези"],
    rating: 8.1,
    episodes: 25,
    year: 2007,
    status: "Завершён",
    views: "5M",
    isNew: false,
    description: "Агент со сверхспособностями расследует тайны загадочных зон.",
  },
  {
    id: 37,
    title: "Fate/Zero",
    titleJp: "Fate/Zero",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/fcb7b6e2-8e17-475d-8c8c-4b72575f45ea.jpg",
    genres: ["Экшн", "Фэнтези", "Драма"],
    rating: 8.9,
    episodes: 25,
    year: 2011,
    status: "Завершён",
    views: "10M",
    isNew: false,
    description: "Маги вызывают легендарных героев прошлого для битвы за Святой Грааль.",
  },
  {
    id: 38,
    title: "Меланхолия Харухи",
    titleJp: "Харухи",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/6c45aa6a-4f6d-46b5-84cc-90439f09b832.jpg",
    genres: ["Комедия", "Фэнтези"],
    rating: 8.2,
    episodes: 28,
    year: 2006,
    status: "Завершён",
    views: "8M",
    isNew: false,
    description: "Девочка неосознанно обладает силой изменять реальность вокруг себя.",
  },
  {
    id: 39,
    title: "Планетарная история",
    titleJp: "Планетариан",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/6c45aa6a-4f6d-46b5-84cc-90439f09b832.jpg",
    genres: ["Драма"],
    rating: 8.0,
    episodes: 5,
    year: 2016,
    status: "Завершён",
    views: "2M",
    isNew: false,
    description: "Робот-гид в заброшенном планетарии ждёт новых посетителей после апокалипсиса.",
  },
  {
    id: 40,
    title: "Врата: Японские силы самообороны",
    titleJp: "Gate",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/b3a31336-f102-409e-9456-488864d052cf.jpg",
    genres: ["Экшн", "Фэнтези", "Исекай"],
    rating: 7.8,
    episodes: 24,
    year: 2015,
    status: "Завершён",
    views: "6M",
    isNew: false,
    description: "Японская армия проходит через портал в средневековый магический мир.",
  },
  {
    id: 41,
    title: "Ковбой Бибоп",
    titleJp: "Ковбой Бибоп",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/fcb7b6e2-8e17-475d-8c8c-4b72575f45ea.jpg",
    genres: ["Приключения", "Драма"],
    rating: 8.9,
    episodes: 26,
    year: 1998,
    status: "Завершён",
    views: "9M",
    isNew: false,
    description: "Охотники за головами путешествуют по Солнечной системе в далёком будущем.",
  },
  {
    id: 42,
    title: "Триган",
    titleJp: "Триган",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/b3a31336-f102-409e-9456-488864d052cf.jpg",
    genres: ["Экшн", "Комедия"],
    rating: 8.2,
    episodes: 26,
    year: 1998,
    status: "Завершён",
    views: "4M",
    isNew: false,
    description: "Стрелок по прозвищу Тайфун бродит по пустынной планете, избегая насилия.",
  },
  {
    id: 43,
    title: "Мастера меча онлайн",
    titleJp: "Мастера меча",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/fcb7b6e2-8e17-475d-8c8c-4b72575f45ea.jpg",
    genres: ["Исекай", "Экшн", "Романтика"],
    rating: 7.5,
    episodes: 50,
    year: 2012,
    status: "Завершён",
    views: "15M",
    isNew: false,
    description: "Игроки оказались заперты в виртуальной ролевой игре.",
  },
  {
    id: 44,
    title: "Магия книг",
    titleJp: "Магия книг",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/6c45aa6a-4f6d-46b5-84cc-90439f09b832.jpg",
    genres: ["Исекай", "Фэнтези", "Драма"],
    rating: 8.6,
    episodes: 36,
    year: 2019,
    status: "Завершён",
    views: "7M",
    isNew: false,
    description: "Книжный червь возрождается в мире без книг и решает создать их сама.",
  },
  {
    id: 45,
    title: "Высокородный",
    titleJp: "Высокородный",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/b3a31336-f102-409e-9456-488864d052cf.jpg",
    genres: ["Исекай", "Экшн"],
    rating: 7.6,
    episodes: 13,
    year: 2021,
    status: "Онгоинг",
    views: "5M",
    isNew: true,
    description: "Современный офисный работник перерождается в другом мире с необычной силой.",
  },
  {
    id: 46,
    title: "Клуб ленивых",
    titleJp: "Клуб ленивых",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/6c45aa6a-4f6d-46b5-84cc-90439f09b832.jpg",
    genres: ["Комедия", "Романтика"],
    rating: 7.4,
    episodes: 12,
    year: 2022,
    status: "Завершён",
    views: "3M",
    isNew: false,
    description: "Студенты школьного клуба ничегонеделания неожиданно сближаются.",
  },
  {
    id: 47,
    title: "Академия героев: Два героя",
    titleJp: "Два героя",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/fcb7b6e2-8e17-475d-8c8c-4b72575f45ea.jpg",
    genres: ["Экшн", "Супергерой"],
    rating: 8.0,
    episodes: 1,
    year: 2018,
    status: "Фильм",
    views: "5M",
    isNew: false,
    description: "Деку и Всемогущий спасают технологический остров от злодеев.",
  },
  {
    id: 48,
    title: "Принцесса мономоно",
    titleJp: "Мономоно",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/6c45aa6a-4f6d-46b5-84cc-90439f09b832.jpg",
    genres: ["Приключения", "Фэнтези"],
    rating: 8.7,
    episodes: 1,
    year: 1997,
    status: "Фильм",
    views: "8M",
    isNew: false,
    description: "Юноша отправляется на запад, чтобы снять проклятие демона.",
  },
  {
    id: 49,
    title: "Ходячий замок",
    titleJp: "Ходячий замок",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/6c45aa6a-4f6d-46b5-84cc-90439f09b832.jpg",
    genres: ["Романтика", "Фэнтези", "Приключения"],
    rating: 8.6,
    episodes: 1,
    year: 2004,
    status: "Фильм",
    views: "9M",
    isNew: false,
    description: "Девушка, превращённая в старуху, ищет спасения у волшебника Хаула.",
  },
  {
    id: 50,
    title: "Сезон охоты",
    titleJp: "Сезон охоты",
    image: "https://cdn.poehali.dev/projects/908e2866-07ca-402b-970e-a51b448b7526/files/fcb7b6e2-8e17-475d-8c8c-4b72575f45ea.jpg",
    genres: ["Тёмное фэнтези", "Драма"],
    rating: 8.5,
    episodes: 13,
    year: 2023,
    status: "Онгоинг",
    views: "6M",
    isNew: true,
    description: "Охотники на монстров сталкиваются с угрозой, которая превосходит их понимание.",
  },
];

const ALL_COMMENTS = [
  { id: 101, user: "КацукиФан", text: "Невероятная анимация!", time: "2 ч назад", avatar: "🦊", anime: "Магическая битва" },
  { id: 102, user: "АнимеОтаку", text: "Лучшее аниме сезона!", time: "3 ч назад", avatar: "🐉", anime: "Атака титанов" },
  { id: 103, user: "СакураЧан", text: "Плакала на каждой серии 😭", time: "5 ч назад", avatar: "🌸", anime: "Твоё имя" },
  { id: 104, user: "ОтакуКинг", text: "10 из 10, шедевр!", time: "7 ч назад", avatar: "👑", anime: "Стальной алхимик" },
  { id: 105, user: "НиндзяФан", text: "Смотрел всю ночь не останавливаясь", time: "9 ч назад", avatar: "🥷", anime: "Наруто" },
  { id: 106, user: "МечтательЗвезд", text: "Красивейшая история о любви", time: "12 ч назад", avatar: "⭐", anime: "Виолетта Эвергарден" },
  { id: 107, user: "ПиратКороль", text: "Никогда не устану смотреть!", time: "1 д назад", avatar: "🏴‍☠️", anime: "Ван Пис" },
  { id: 108, user: "АльфаОтаку", text: "Финал просто разорвал мне сердце", time: "1 д назад", avatar: "💔", anime: "Врата Штейна" },
  { id: 109, user: "СинийДракон", text: "Графика на высшем уровне", time: "2 д назад", avatar: "🐲", anime: "Клинок, рассекающий демонов" },
  { id: 110, user: "МангаЧитер", text: "Манга лучше, но аниме тоже огонь 🔥", time: "2 д назад", avatar: "📖", anime: "Re:Zero" },
];

const GENRES = ["Все", "Экшн", "Романтика", "Фэнтези", "Комедия", "Драма", "Меха", "Исекай", "Тёмное фэнтези", "Приключения", "Супергерой"];
const SAKURA = ["🌸", "🌺", "✿", "❀", "🌸"];
const PER_PAGE = 10;

type Page = "home" | "catalog" | "favorites" | "profile" | "newest";

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
  const [newestPage, setNewestPage] = useState(1);

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
          <div className="font-zen glitch" style={{ fontSize: 22, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }} onClick={() => { setActivePage("newest"); setNewestPage(1); }}>
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

        {/* NEWEST */}
        {activePage === "newest" && (() => {
          const sorted = [...ANIME_DATA].sort((a, b) => b.id - a.id);
          const totalPages = Math.ceil(sorted.length / PER_PAGE);
          const pageItems = sorted.slice((newestPage - 1) * PER_PAGE, newestPage * PER_PAGE);
          return (
            <div>
              <div style={{ marginBottom: 28 }}>
                <h1 className="font-rajdhani" style={{ fontSize: 32, fontWeight: 700, color: "white", marginBottom: 4, display: "flex", alignItems: "center", gap: 12 }}>
                  <span className="neon-text-pink">🆕</span> Последние обновления
                </h1>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>Всего {sorted.length} тайтлов · Страница {newestPage} из {totalPages}</p>
              </div>

              {/* List */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                {pageItems.map((anime, i) => (
                  <div key={anime.id} className="anime-card" style={{ display: "flex", gap: 20, padding: 16, cursor: "pointer", alignItems: "center" }} onClick={() => openAnime(anime)}>
                    <div className="font-rajdhani" style={{ width: 36, textAlign: "center", fontSize: 20, fontWeight: 700, color: "rgba(255,255,255,0.2)", flexShrink: 0 }}>
                      {(newestPage - 1) * PER_PAGE + i + 1}
                    </div>
                    <img src={anime.image} alt={anime.title} style={{ width: 70, height: 96, objectFit: "cover", borderRadius: 8, flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span className="font-rajdhani" style={{ fontWeight: 700, color: "white", fontSize: 17 }}>{anime.title}</span>
                        {anime.isNew && <span className="tag-new">NEW</span>}
                      </div>
                      <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, marginBottom: 8, lineHeight: 1.5 }}>{anime.description}</div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {anime.genres.slice(0, 3).map(g => <span key={g} className="genre-chip" style={{ fontSize: 11, padding: "2px 10px" }}>{g}</span>)}
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, flexShrink: 0 }}>
                      <span className="rating-badge">⭐ {anime.rating}</span>
                      <span style={{ fontSize: 12, color: anime.status === "Онгоинг" ? "var(--neon-cyan)" : anime.status === "Фильм" ? "var(--neon-gold)" : "rgba(255,255,255,0.3)", fontFamily: "'Rajdhani',sans-serif", fontWeight: 600 }}>{anime.status}</span>
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontFamily: "'Rajdhani',sans-serif" }}>{anime.year} · {anime.episodes} {anime.episodes === 1 ? "фильм" : "сер."}</span>
                      <button onClick={(e) => { e.stopPropagation(); toggleFav(anime.id); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                        <Icon name="Heart" size={18} style={{ color: favList.includes(anime.id) ? "var(--neon-pink)" : "rgba(255,255,255,0.3)" }} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 48 }}>
                <button onClick={() => setNewestPage(p => Math.max(1, p - 1))} disabled={newestPage === 1} style={{ width: 40, height: 40, borderRadius: 8, border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: newestPage === 1 ? "rgba(255,255,255,0.2)" : "white", cursor: newestPage === 1 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="ChevronLeft" size={18} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button key={p} onClick={() => setNewestPage(p)} style={{ width: 40, height: 40, borderRadius: 8, border: `1px solid ${newestPage === p ? "var(--neon-pink)" : "rgba(255,255,255,0.15)"}`, background: newestPage === p ? "linear-gradient(135deg,var(--neon-pink),var(--neon-purple))" : "transparent", color: "white", cursor: "pointer", fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 15, boxShadow: newestPage === p ? "0 0 12px rgba(255,45,120,0.5)" : "none", transition: "all 0.2s" }}>
                    {p}
                  </button>
                ))}
                <button onClick={() => setNewestPage(p => Math.min(totalPages, p + 1))} disabled={newestPage === totalPages} style={{ width: 40, height: 40, borderRadius: 8, border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: newestPage === totalPages ? "rgba(255,255,255,0.2)" : "white", cursor: newestPage === totalPages ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="ChevronRight" size={18} />
                </button>
              </div>

              {/* Latest comments */}
              <div>
                <div className="section-divider">
                  <h2 className="font-rajdhani" style={{ fontSize: 20, fontWeight: 700, color: "white", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 10, margin: 0 }}>
                    <span className="neon-text-purple">💬</span> Последние комментарии
                  </h2>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {ALL_COMMENTS.map(c => (
                    <div key={c.id} className="anime-card" style={{ padding: 16 }}>
                      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(180,77,255,0.15)", border: "1px solid rgba(180,77,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{c.avatar}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                            <span className="font-rajdhani" style={{ color: "var(--neon-purple)", fontWeight: 600, fontSize: 14 }}>{c.user}</span>
                            <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 11 }}>{c.time}</span>
                          </div>
                          <div style={{ fontSize: 12, color: "var(--neon-cyan)", marginBottom: 4, fontFamily: "'Rajdhani',sans-serif" }}>→ {c.anime}</div>
                          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, lineHeight: 1.5 }}>{c.text}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

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