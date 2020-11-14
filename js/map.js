'use strict';

(() => {
  const pinsList = document.querySelector(`.map__pins`);
  const activeMap = document.querySelector(`.map`);
  const adForm = document.querySelector(`.ad-form`);
  const mapFilters = activeMap.querySelector(`.map__filters`);
  const addFromFieldset = adForm.querySelectorAll(`fieldset`);
  const mapFiltersSelect = mapFilters.querySelectorAll(`*`);
  const address = adForm.querySelector(`#address`);
  const mainPin = pinsList.querySelector(`.map__pin--main`);
  const mainPinArrow = 22;
  const mainPinSize = {
    width: mainPin.offsetWidth,
    height: mainPin.offsetHeight
  };


  const setActivePage = () => {
    window.form.setFieldStatus(addFromFieldset, false);
    window.form.setFieldStatus(mapFiltersSelect, false);
    adForm.classList.remove(`ad-form--disabled`);
    activeMap.classList.remove(`map--faded`);
    window.backend.load(window.pin.successHandler, window.pin.errorHandler);
  };

  const disablePage = () => {
    window.form.setFieldStatus(addFromFieldset, true);
    window.form.setFieldStatus(mapFiltersSelect, true);
    adForm.classList.add(`ad-form--disabled`);
    activeMap.classList.add(`map--faded`);

    const buttons = pinsList.querySelectorAll(`button[type="button"]`);
    buttons.forEach((button) => {
      button.remove();
    });
    mainPin.addEventListener(`click`, window.map.renderPins);

    window.card.removePopup();
  };

  const renderPins = (evt) => {
    window.util.isMouseDown(evt, () => {
      setActivePage();
      getPinLocation(mainPin);
      mainPin.removeEventListener(`click`, window.map.renderPins);
    });
  };

  const getPinLocation = (el) => {
    const startCoords = {
      x: Math.floor(parseInt(el.style.left, 10) - (mainPinSize.width / 2)),
      y: Math.floor(parseInt(el.style.top, 10) - (mainPinSize.height / 2))
    };

    if (document.querySelector(`.map--faded`)) {
      address.value = `${startCoords.x}, ${startCoords.y - mainPinArrow}`;
    } else {
      address.value = `${startCoords.x}, ${startCoords.y}`;
    }

  };

  window.map = {
    renderPins,
    getPinLocation,
    disablePage
  };

})();
