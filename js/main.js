'use strict';

const OFFER_TITLE = [`Апартаменты-студия`, `Аппартаменты в центре`, `Дом за городом`, `Малокомнатная квартира`, `Многокомнатная квартира`, `Несколькокомнатная квартира`];
const OFFER_TYPE = [`palace`, `flat`, `house`, `bungalow`];
const OFFER_CHECKIN_CHECKOUT = [`12:00`, `13:00`, `14:00`];
const OFFER_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const OFFER_DESCRIPTION = [
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
const PRICE = {
  min: 10000,
  max: 100000
};
const ROOMS = {
  min: 1,
  max: 10
};
const GUESTS = {
  min: 1,
  max: 15
};
const MARK_Y = {
  min: 130,
  max: 630
};
const advertList = [];

const activeMap = document.querySelector(`.map`);
activeMap.classList.remove(`map--faded`);
const pinsList = document.querySelector(`.map__pins`);
const advertTemplate = document.querySelector(`#pin`).content;

const getRandomNumber = (min, max) => Math.round(Math.random() * (max - min)) + min;
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRoundNum = (num) => Math.round(num / 1000) * 1000;

const getAdvert = () => {
  const MAP_X = getRandomNumber(0, activeMap.offsetWidth);
  const MAP_Y = getRandomNumber(MARK_Y.min, MARK_Y.max);

  const newAdvert = {
    autor: {
      avatar: `img/avatars/user0${getRandomNumber(1, ADVERT_QUANTITY)}.png`
    },
    offer: {
      title: getRandomElement(OFFER_TITLE),
      address: `${MAP_X}, ${MAP_Y}`,
      price: getRoundNum(getRandomNumber(PRICE.min, PRICE.max)),
      type: getRandomElement(OFFER_TYPE),
      rooms: `${getRandomNumber(ROOMS.min, ROOMS.max)}`,
      guests: `${getRandomNumber(GUESTS.min, GUESTS.max)}`,
      checkin: getRandomElement(OFFER_CHECKIN_CHECKOUT),
      checkout: getRandomElement(OFFER_CHECKIN_CHECKOUT),
      features: OFFER_FEATURES.slice(0, getRandomNumber(0, OFFER_FEATURES.length)),
      description: getRandomElement(OFFER_DESCRIPTION),
      photos: getRandomElement(OFFER_PHOTOS)
    },
    location: {
      x: MAP_X,
      y: MAP_Y
    }
  };
  return newAdvert;
};

const generateAdvertArr = (quantity) => {
  for (let i = 0; i < quantity; i++) {
    advertList.push(getAdvert());
  }
  return advertList;
};

const createPin = (pinData) => {
  const pinElement = advertTemplate.cloneNode(true);
  const pinButton = pinElement.querySelector(`.map__pin`);
  const pinPhoto = pinElement.querySelector(`img`);
  pinButton.style.left = `${pinData.location.x - pinButton.offsetWidth}px`;
  pinButton.style.top = `${pinData.location.y - pinButton.offsetHeight}px`;
  pinPhoto.src = `${pinData.offer.photos}`;
  pinPhoto.alt = `${pinData.offer.title}`;

  return pinElement;
};

const fragment = document.createDocumentFragment();
generateAdvertArr(ADVERT_QUANTITY);

advertList.forEach((pin) => {
  fragment.appendChild(createPin(pin));
});
pinsList.appendChild(fragment);
