'use strict';

(() => {
  const advertTemplate = document.querySelector(`#pin`).content;

  const createPin = (pinData) => {
    const pinElement = advertTemplate.cloneNode(true);
    const pinButton = pinElement.querySelector(`.map__pin`);
    const pinPhoto = pinElement.querySelector(`img`);
    pinButton.style.left = `${pinData.location.x - pinButton.offsetWidth}px`;
    pinButton.style.top = `${pinData.location.y - pinButton.offsetHeight}px`;
    pinPhoto.src = pinData.offer.photos[0];
    pinPhoto.alt = pinData.offer.title;

    return pinElement;
  };

  const successHandler = (pins) => {
    window.fragment = document.createDocumentFragment();

    pins.forEach((pin) => {
      window.fragment.appendChild(createPin(pin));
    });
  };

  const errorHandler = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: tomato;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `40px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.getAdverts(successHandler, errorHandler);

})();
