'use strict';

(() => {
  const adForm = document.querySelector(`.ad-form`);
  const adTitle = adForm.querySelector(`#title`);

  window.setFieldStatus = (list, isDisable) => {
    list.forEach((item) => {
      item.disabled = isDisable;
    });
  };

  adTitle.addEventListener(`invalid`, () => {
    if (adTitle.validity.tooShort) {
      adTitle.setCustomValidity(`Минимальная длина заголовка — 30 символов`);
    } else if (adTitle.validity.tooLong) {
      adTitle.setCustomValidity(`Максимальная длина заголовка — 100 символов`);
    } else if (adTitle.validity.valueMissing) {
      adTitle.setCustomValidity(`Заголовок объявления обязателен для заполнения`);
    } else {
      adTitle.setCustomValidity(``);
    }
  });

  const adPrice = adForm.querySelector(`#price`);

  adPrice.addEventListener(`invalid`, () => {
    if (adPrice.validity.rangeOverflow) {
      adPrice.setCustomValidity(`Максимальная сумма 1 000 000`);
      adPrice.value = 1000000;
    } else {
      adPrice.setCustomValidity(``);
    }
  });

  const roomOptions = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };
  const adCapacity = adForm.querySelector(`#capacity`);
  const capacityOptions = adCapacity.querySelectorAll(`option`);

  window.setRooms = (roomsQuantity) => {
    capacityOptions.forEach((option) => {
      option.disabled = true;
    });

    roomOptions[roomsQuantity].forEach((room) => {
      capacityOptions.forEach((option) => {
        if (Number(option.value) === room) {
          option.disabled = false;
          option.selected = true;
        }
      });
    });
  };

})();
