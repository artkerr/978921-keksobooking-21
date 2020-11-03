'use strict';

(() => {
  const filter = document.querySelector(`.map__filters`);
  const type = filter.querySelector(`#housing-type`);
  // const price = filter.querySelector(`#housing-price`);
  // const rooms = filter.querySelector(`#housing-rooms`);
  // const quests = filter.querySelector(`#housing-guests`);
  // const features = filter.querySelector(`#housing-features`);

  const typeFilter = (pin) => {
    if (type.value === `any`) {
      return true;
    } else {
      return type.value === pin.offer.type;
    }
  };

  window.filter = {
    typeFilter
  };
})();
