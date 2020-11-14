'use strict';

(() => {
  const pinsList = document.querySelector(`.map__pins`);
  const mapPin = pinsList.querySelector(`.map__pin--main`);
  const activeMap = document.querySelector(`.map`);
  const adForm = document.querySelector(`.ad-form`);
  const mapFilters = activeMap.querySelector(`.map__filters`);
  const addFromFieldset = adForm.querySelectorAll(`fieldset`);
  const mapFiltersSelect = mapFilters.querySelectorAll(`select`);

  window.form.setFieldStatus(addFromFieldset, true);
  window.form.setFieldStatus(mapFiltersSelect, true);
  window.map.getPinLocation(mapPin);

  mapPin.addEventListener(`click`, window.map.renderPins);

  const adRoomNumber = adForm.querySelector(`#room_number`);

  adRoomNumber.addEventListener(`change`, (evt) => {
    window.form.setRooms(evt.target.value);
  });
})();
