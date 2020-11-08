'use strict';

(() => {
  const pinsList = document.querySelector(`.map__pins`);
  const activeMap = document.querySelector(`.map`);
  const adForm = document.querySelector(`.ad-form`);
  const mapFilters = activeMap.querySelector(`.map__filters`);
  const addFromFieldset = adForm.querySelectorAll(`fieldset`);
  const mapFiltersSelect = mapFilters.querySelectorAll(`select`);
  const address = adForm.querySelector(`#address`);
  const mainPin = pinsList.querySelector(`.map__pin--main`);
  const mainPinArrow = 22;
  const mainPinSize = {
    width: mainPin.offsetWidth,
    height: mainPin.offsetHeight
  };

  const setActivePage = () => {
    window.setFieldStatus(addFromFieldset, false);
    window.setFieldStatus(mapFiltersSelect, false);
    adForm.classList.remove(`ad-form--disabled`);
    activeMap.classList.remove(`map--faded`);
    window.backend.getAdverts(window.pin.successHandler, window.pin.errorHandler);
  };

  const renderPins = (evt) => {
    window.util.isMouseDown(evt, () => {
      setActivePage();
      getPinLocation(mainPin);
    });
  };

  const getPinLocation = (el) => {
    const startCoords = {
      x: Math.floor(parseInt(el.style.left, 10) - (mainPinSize.width / 2)),
      y: Math.floor(parseInt(el.style.top, 10) - (mainPinSize.height / 2) + mainPinArrow)
    };
    address.value = `${startCoords.x}, ${startCoords.y}`;
  };

  window.map = {
    renderPins
  };

})();
