'use strict';

(() => {
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

    return pinElement;
  };

  const getPinsList = (pins) => {
    window.fragment = document.createDocumentFragment();

    for (let i = 0; i < pins.length; i++) {
      window.fragment.appendChild(createPin(pins[i]));
    }
    pinsList.appendChild(window.fragment);
  };

  window.updatePinsList = () => {
    getPinsList(adsList.filter(window.filter.typeFilter).slice(0, MAX_PINS));
  };

  const type = document.querySelector(`#housing-type`);

  type.addEventListener(`change`, () => {
    pinsList.innerHTML = ``;
    window.updatePinsList();
  });

  const successHandler = (pins) => {
    adsList = pins;
    window.updatePinsList();
  };

  const errorHandler = (errorMessage) => {
    window.util.errorHandler(errorMessage);
  };

  window.backend.getAdverts(successHandler, errorHandler);
})();
