'use strict';

(() => {
  const pinsList = document.querySelector(`.map__pins`);
  const activeMap = document.querySelector(`.map`);
  const adForm = document.querySelector(`.ad-form`);
  const mapFilters = activeMap.querySelector(`.map__filters`);
  const addFromFieldset = adForm.querySelectorAll(`fieldset`);
  const mapFiltersSelect = mapFilters.querySelectorAll(`select`);

  window.setActivePage = () => {
    window.setFieldStatus(addFromFieldset, false);
    window.setFieldStatus(mapFiltersSelect, false);
    adForm.classList.remove(`ad-form--disabled`);
    activeMap.classList.remove(`map--faded`);
    pinsList.appendChild(window.fragment);
  };

  const address = adForm.querySelector(`#address`);
  const mainPin = pinsList.querySelector(`.map__pin--main`);
  const mainPinSize = {
    width: mainPin.offsetWidth,
    height: mainPin.offsetHeight
  };

  window.getPinLocation = (evt) => {
    const startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    address.value = `${startCoords.x + (Math.round(mainPinSize.width / 2))}, ${startCoords.y + mainPinSize.height}`;
  };

})();
