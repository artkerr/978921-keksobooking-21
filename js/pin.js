'use strict';

(() => {
  const advertTemplate = document.querySelector(`#pin`).content;

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

  window.fragment = document.createDocumentFragment();
  window.adverts.list(window.adverts.quantity).forEach((pin) => {
    window.fragment.appendChild(createPin(pin));
  });
})();
