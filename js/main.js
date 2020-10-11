'use strict';

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
const pinsList = document.querySelector(`.map__pins`);
const advertTemplate = document.querySelector(`#pin`).content;

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

const generateAdverts = (quantity) => {
  const adverts = [];
  for (let i = 0; i < quantity; i++) {
    adverts.push(getAdvert());
  }
  return adverts;
};

const createPin = (pinData) => {
  const pinElement = advertTemplate.cloneNode(true);
  const pinButton = pinElement.querySelector(`.map__pin`);
  const pinPhoto = pinElement.querySelector(`img`);
  pinButton.style.left = `${pinData.location.x - pinButton.offsetWidth}px`;
  pinButton.style.top = `${pinData.location.y - pinButton.offsetHeight}px`;
  pinPhoto.src = pinData.offer.photos;
  pinPhoto.alt = pinData.offer.title;

  return pinElement;
};

const fragment = document.createDocumentFragment();
generateAdverts(ADVERT_QUANTITY).forEach((pin) => {
  fragment.appendChild(createPin(pin));
});

const mapPin = pinsList.querySelector(`.map__pin--main`);
const adForm = document.querySelector(`.ad-form`);
const addFromFieldset = adForm.querySelectorAll(`fieldset`);

const mapFilters = activeMap.querySelector(`.map__filters`);
const mapFiltersSelect = mapFilters.querySelectorAll(`select`);

const setFieldStatus = (list, isDisable) => {
  list.forEach((item) => {
    item.disabled = isDisable;
  });
};

setFieldStatus(addFromFieldset, true);
setFieldStatus(mapFiltersSelect, true);

const setActivePage = () => {
  setFieldStatus(addFromFieldset, false);
  setFieldStatus(mapFiltersSelect, false);
  adForm.classList.remove(`ad-form--disabled`);
  activeMap.classList.remove(`map--faded`);
  pinsList.appendChild(fragment);
};

const address = adForm.querySelector(`#address`);
const mainPin = pinsList.querySelector(`.map__pin--main`);
const mainPinSize = {
  width: mainPin.offsetWidth,
  height: mainPin.offsetHeight
};

const getPinLocation = (evt) => {
  const startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  address.value = `${startCoords.x + (Math.round(mainPinSize.width / 2))}, ${startCoords.y + mainPinSize.height}`;
};

mapPin.addEventListener(`mousedown`, (evt) => {
  if (evt.which === 1) {
    setActivePage();
    getPinLocation(evt);
  }
});

mapPin.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    setActivePage();
  }
});

const adTitle = adForm.querySelector(`#title`);

adTitle.addEventListener(`invalid`, () => {
  if (adTitle.validity.tooShort) {
    adTitle.setCustomValidity(`Минимальная длина заголовка — 30 символов`);
  } else if (adTitle.validity.tooLong) {
    adTitle.setCustomValidity(`Максимальная длина заголовка — 100 символов`);
  } else if (adTitle.validity.valueMissing) {
    adTitle.setCustomValidity(`Заголовок объявления обязателен для заполнения`);
  } else {
    adTitle.setCustomValidity(``);
  }
});

const adPrice = adForm.querySelector(`#price`);

adPrice.addEventListener(`invalid`, () => {
  if (adPrice.validity.rangeOverflow) {
    adPrice.setCustomValidity(`Максимальная сумма 1 000 000`);
    adPrice.value = 1000000;
  } else {
    adPrice.setCustomValidity(``);
  }
});

const adRoomNumber = adForm.querySelector(`#room_number`);
const roomOptions = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};
const adCapacity = adForm.querySelector(`#capacity`);
const capacityOptions = adCapacity.querySelectorAll(`option`);
adCapacity.disabled = true;

const setRooms = (roomsQuantity) => {
  capacityOptions.forEach((option) => {
    option.disabled = true;
  });

  roomOptions[roomsQuantity].forEach((room) => {
    capacityOptions.forEach((option) => {
      if (Number(option.value) === room) {
        option.disabled = false;
      }
    });
  });
};

adRoomNumber.addEventListener(`change`, (evt) => {
  setRooms(evt.target.value);
  adCapacity.disabled = false;
});

