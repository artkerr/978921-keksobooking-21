'use strict';

const pinsList = document.querySelector(`.map__pins`);
const mapPin = pinsList.querySelector(`.map__pin--main`);
const activeMap = document.querySelector(`.map`);
const adForm = document.querySelector(`.ad-form`);
const mapFilters = activeMap.querySelector(`.map__filters`);
const addFromFieldset = adForm.querySelectorAll(`fieldset`);
const mapFiltersSelect = mapFilters.querySelectorAll(`select`);

window.setFieldStatus(addFromFieldset, true);
window.setFieldStatus(mapFiltersSelect, true);

mapPin.addEventListener(`mousedown`, (evt) => {
  window.util.isMouseDown(evt, window.map.setActivePage);
  window.util.isMouseDown(evt, () => {
    window.map.getPinLocation(evt);
  });
});

mapPin.addEventListener(`keydown`, (evt) => {
  window.util.isEnterEvt(evt, window.map.setActivePage);
});

const adRoomNumber = adForm.querySelector(`#room_number`);

adRoomNumber.addEventListener(`change`, (evt) => {
  window.setRooms(evt.target.value);
});
