'use strict';

const pinsList = document.querySelector(`.map__pins`);
const activeMap = document.querySelector(`.map`);
const adForm = document.querySelector(`.ad-form`);
const mapFilters = activeMap.querySelector(`.map__filters`);
const addFromFieldset = adForm.querySelectorAll(`fieldset`);
const mapFiltersSelect = mapFilters.querySelectorAll(`*`);
const address = adForm.querySelector(`#address`);
const mainPin = pinsList.querySelector(`.map__pin--main`);
const mainPinArrow = 22;
const mainPinSize = 62;

const mainPinStartChords = {
  x: 570 + Math.floor(mainPinSize / 2),
  y: 375 + Math.floor(mainPinSize / 2)
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
  address.value = `${mainPinStartChords.x}, ${mainPinStartChords.y}`;
  mainPin.style.left = `${mainPinStartChords.x}px`;
  mainPin.style.top = `${mainPinStartChords.y}px`;
  window.card.removePopup();
};

const renderPins = (evt) => {
  window.util.isMouseDown(evt, () => {
    setActivePage();
    setPinLocation();
    mainPin.removeEventListener(`click`, window.map.renderPins);
  });
};

const setPinLocation = (x = mainPinStartChords.x, y = mainPinStartChords.y) => {

  if (activeMap.classList.contains(`map--faded`)) {
    address.value = `${x}, ${y}`;
  } else {
    address.value = `${x}, ${y + Math.ceil(mainPinSize / 2 + mainPinArrow)}`;
  }
};

window.map = {
  renderPins,
  setPinLocation,
  disablePage
};

