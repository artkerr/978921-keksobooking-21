'use strict';

(() => {
  const OFFER_TITLES = [`Апартаменты-студия`, `Аппартаменты в центре`, `Дом за городом`, `Малокомнатная квартира`, `Многокомнатная квартира`, `Несколькокомнатная квартира`];
  const OFFER_TYPES = [`palace`, `flat`, `house`, `bungalow`];
  const OFFER_CHECKIN_CHECKOUT_TIMES = [`12:00`, `13:00`, `14:00`];
  const OFFER_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const OFFER_DESCRIPTIONS = [
    `Новостройка расположена в Ценратральном районе, на территории национального парка.`,
    `Охраняемая территория, система контроля управления доступом в т.ч. по смартфону. Есть подземный паркинг.`,
    `Собственная инфраструктура: детский сад, детская площадка, тир, тренажерный зал, бассейн, спортивно-оздоровительный комплекс, собственное футбольное поле, магазины, салоны красоты, сауны, массажный и косметический салоны и т.д.`,
    `Очень престижный район, инфраструктура мегаполиса и тихий двор, большой плюс, что 2 из 3х балконов находятся в данных комнатах.`];
  const OFFER_PHOTOS = [
    `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
  ];
  const ADVERT_QUANTITY = 8;
  const Price = {
    MIN: 10000,
    MAX: 100000
  };
  const Rooms = {
    MIN: 1,
    MAX: 10
  };
  const Guests = {
    MIN: 1,
    MAX: 15
  };
  const MarkY = {
    MIN: 130,
    MAX: 630
  };

  const activeMap = document.querySelector(`.map`);

  const getRandomNumber = (min, max) => Math.round(Math.random() * (max - min)) + min;
  const getRandomElement = (items) => items[Math.floor(Math.random() * items.length)];
  const getRoundNumber = (num) => Math.round(num / 1000) * 1000;

  const getAdvert = () => {
    const location = {
      x: getRandomNumber(0, activeMap.offsetWidth),
      y: getRandomNumber(MarkY.MIN, MarkY.MAX)
    };

    return {
      author: {
        avatar: `img/avatars/user0${getRandomNumber(1, ADVERT_QUANTITY)}.png`
      },
      offer: {
        title: getRandomElement(OFFER_TITLES),
        address: `${location.x}, ${location.y}`,
        price: getRoundNumber(getRandomNumber(Price.MIN, Price.MAX)),
        type: getRandomElement(OFFER_TYPES),
        rooms: getRandomNumber(Rooms.MIN, Rooms.MAX),
        guests: getRandomNumber(Guests.MIN, Guests.MAX),
        checkin: getRandomElement(OFFER_CHECKIN_CHECKOUT_TIMES),
        checkout: getRandomElement(OFFER_CHECKIN_CHECKOUT_TIMES),
        features: OFFER_FEATURES.slice(0, getRandomNumber(0, OFFER_FEATURES.length)),
        description: getRandomElement(OFFER_DESCRIPTIONS),
        photos: getRandomElement(OFFER_PHOTOS)
      },
      location
    };
  };

  window.adverts = {
    list: (quantity) => {
      const adverts = [];
      for (let i = 0; i < quantity; i++) {
        adverts.push(getAdvert());
      }
      return adverts;
    },
    quantity: ADVERT_QUANTITY
  };

})();