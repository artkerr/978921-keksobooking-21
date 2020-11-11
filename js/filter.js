'use strict';

(() => {
  const filter = document.querySelector(`.map__filters`);
  const type = filter.querySelector(`#housing-type`);
  const price = filter.querySelector(`#housing-price`);
  const priceValue = {
    LOW: 10000,
    HIGH: 50000
  };
  const rooms = filter.querySelector(`#housing-rooms`);
  const quests = filter.querySelector(`#housing-guests`);
  const features = filter.querySelector(`#housing-features`);

  const typeFilter = (ads) => {
    if (type.value === `any`) {
      return true;
    } else {
      return type.value === ads.offer.type;
    }
  };

  const priceFilter = (ads) => {
    if (price.value === `any`) {
      return true;
    } else if (price.value === `low`) {
      return ads.offer.price < priceValue.LOW;
    } else if (price.value === `middle`) {
      return ads.offer.price > priceValue.LOW && ads.offer.price <= priceValue.HIGH;
    } else if (price.value === `high`) {
      return ads.offer.price >= priceValue.HIGH;
    } else {
      return false;
    }
  };

  const roomsFilter = (ads) => {
    if (rooms.value === `any`) {
      return true;
    } else {
      return parseInt(rooms.value, 10) === ads.offer.rooms;
    }
  };

  const questsFilter = (ads) => {
    if (quests.value === `any`) {
      return true;
    } else {
      return parseInt(quests.value, 10) === ads.offer.guests;
    }
  };

  const featuresFilter = (ads) => {
    const checkedInput = features.querySelectorAll(`.map__checkbox:checked`);
    const checkedInputArr = [];

    checkedInput.forEach((item) => {
      checkedInputArr.push(item.value);
    });

    return checkedInputArr.every((item) => {
      return ads.offer.features.includes(item);
    });
  };

  const applyFilter = (ads) => {
    return typeFilter(ads) && priceFilter(ads) && roomsFilter(ads) && questsFilter(ads) && featuresFilter(ads);
  };

  window.filter = {
    applyFilter
  };
})();
