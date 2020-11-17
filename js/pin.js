'use strict';

const MAX_PINS = 5;
const advertTemplate = document.querySelector(`#pin`).content;
const pinsList = document.querySelector(`.map__pins`);
let adsList = [];

const createPin = (pinData) => {
  const pinElement = advertTemplate.cloneNode(true);
  const pinButton = pinElement.querySelector(`.map__pin`);
  const pinPhoto = pinElement.querySelector(`img`);

  pinButton.style.left = `${pinData.location.x - pinButton.offsetWidth}px`;
  pinButton.style.top = `${pinData.location.y - pinButton.offsetHeight}px`;
  pinPhoto.src = pinData.author.avatar;
  pinPhoto.alt = pinData.offer.title;

  pinButton.addEventListener(`click`, () => {

    removeActiveClass();

    window.card.renderCard(window.card.createCard(pinData));
    pinButton.classList.add(`map__pin--active`);
  });

  return pinElement;
};

const removeActiveClass = () => {
  const pinButtons = pinsList.querySelectorAll(`button`);
  pinButtons.forEach((pin) => {
    if (pinsList.querySelector(`.map__pin--active`)) {
      pin.classList.remove(`map__pin--active`);
    }
  });

};

const getPinsList = (pins) => {
  const fragment = document.createDocumentFragment();

  pins.forEach((pin) => {
    fragment.appendChild(createPin(pin));
  });

  pinsList.appendChild(fragment);
};

const clearPins = () => {
  const pins = pinsList.querySelectorAll(`button[type="button"]`);
  pins.forEach((item) => {
    item.remove();
  });
};

const updatePinsList = () => {
  clearPins();
  const filteredPins = [];

  for (let i = 0; i < adsList.length; i++) {
    if (filteredPins.length >= MAX_PINS) {
      break;
    }
    if (window.filter.applyFilter(adsList[i])) {
      filteredPins.push(adsList[i]);
    }
  }
  getPinsList(filteredPins);
};

const select = document.querySelector(`.map__filters`);

select.addEventListener(`change`, () => {
  window.card.removePopup();
  clearPins();
  window.debounce(updatePinsList);
});

const successHandler = (pins) => {
  adsList = pins;
  updatePinsList();
};

const errorHandler = (errorMessage) => {
  window.util.errorHandler(errorMessage);
};

window.pin = {
  updatePinsList,
  successHandler,
  errorHandler,
  removeActiveClass
};
