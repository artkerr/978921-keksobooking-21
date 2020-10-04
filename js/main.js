'use strict';

const OFFER_TITLE = ['Апартаменты-студия', 'Аппартаменты в центре', 'Дом за городом', 'Малокомнатная квартира', 'Многокомнатная квартира', 'Несколькокомнатная квартира'];
const OFFER_TYPE = ['palace', 'flat', 'house', 'bungalow'];
const OFFER_CHECKIN_CHECKOUT = ['12:00', '13:00', '14:00'];
const OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const OFFER_DESCRIPTION = [
  'Новостройка расположена в Ценратральном районе, на территории национального парка.',
  'Охраняемая территория, система контроля управления доступом в т.ч. по смартфону. Есть подземный паркинг.',
  'Собственная инфраструктура: детский сад, детская площадка, тир, тренажерный зал, бассейн, спортивно-оздоровительный комплекс, собственное футбольное поле, магазины, салоны красоты, сауны, массажный и косметический салоны и т.д.',
  'Очень престижный район, инфраструктура мегаполиса и тихий двор, большой плюс, что 2 из 3х балконов находятся в данных комнатах.'];
const OFFER_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
const ADVERT_QUANTITY = 8;
const advertList = [];

const getRandomNumber = (min, max) => Math.round(Math.random() * (max - min)) + min;
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getAdvert = () => {
  let newAdvert = {
    autor: {
      avatar: `img/avatars/user0${getRandomNumber(1, 8)}.png`
    },
    offer: {
      title: getRandomElement(OFFER_TITLE),
      address: `${getRandomNumber(100, 500)}, ${getRandomNumber(300, 900)}`,
      price: `${getRandomNumber(30000, 100000)}`,
      type: getRandomElement(OFFER_TYPE),
      rooms: `${getRandomNumber(1, 10)}`,
      guests: `${getRandomNumber(1, 10)}`,
      checkin: getRandomElement(OFFER_CHECKIN_CHECKOUT),
      checkout: getRandomElement(OFFER_CHECKIN_CHECKOUT),
      features: OFFER_FEATURES.slice(0, getRandomNumber(0, OFFER_FEATURES.length)),
      description: getRandomElement(OFFER_DESCRIPTION),
      photos: getRandomElement(OFFER_PHOTOS)
    },
    location: {
      x: getRandomNumber(20, 1000),
      y: getRandomNumber(130, 630)
    }
  };
  return newAdvert;
};

for (let i = 0; i < ADVERT_QUANTITY; i++) {
  advertList.push(getAdvert());
}

const activeMap = document.querySelector('.map');
activeMap.classList.remove('map--faded');
const pinsList = document.querySelector('.map__pins');
const advertTemplate = document.querySelector('#pin').content;


const createPin = (data) => {
  const pinElement = advertTemplate.cloneNode(true);
  const pinButton = pinElement.querySelector('.map__pin');
  const pinPhoto = pinElement.querySelector('img');

  pinButton.setAttribute('style', `left: ${data.location.x - pinButton.offsetWidth}px; top: ${data.location.y - pinButton.offsetHeight}px;`);
  pinPhoto.setAttribute('src', `${data.offer.photos}`);
  pinPhoto.setAttribute('alt', `${data.offer.title}`);

  return pinElement;
};

const renderPins = (arr) => {
  const pinsFragment = document.createDocumentFragment();

  for (let i = 0; i < arr.length; i++) {
    pinsFragment.appendChild(createPin(arr[i]));
  }
  pinsList.appendChild(pinsFragment);
  return pinsFragment;
};

renderPins(advertList);
