'use strict';

(() => {
  const adForm = document.querySelector(`.ad-form`);
  const adTitle = adForm.querySelector(`#title`);

  const setFieldStatus = (list, isDisable) => {
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

  const TypeOptions = {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
  };
  const adType = adForm.querySelector(`#type`);

  const setTypePrice = (type) => {
    adPrice.setAttribute(`min`, TypeOptions[type]);
    adPrice.setAttribute(`placeholder`, TypeOptions[type]);
  };

  adType.addEventListener(`change`, (evt) => {
    setTypePrice(evt.target.value);
  });

  const roomOptions = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };
  const adCapacity = adForm.querySelector(`#capacity`);
  const capacityOptions = adCapacity.querySelectorAll(`option`);

  const setRooms = (roomsQuantity) => {
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

  const adTimeIn = adForm.querySelector(`#timein`);
  const timeInOptions = adTimeIn.querySelectorAll(`option`);
  const adTimeOut = adForm.querySelector(`#timeout`);
  const timeOutOptions = adTimeOut.querySelectorAll(`option`);

  const timeChecker = (evt) => {
    timeInOptions.forEach((inItem) => {
      timeOutOptions.forEach((outItem) => {
        if (evt.target.value === inItem.value && evt.target.value === outItem.value) {
          inItem.selected = true;
          outItem.selected = true;
        }
      });
    });
  };

  adTimeIn.addEventListener(`change`, (evt) => {
    timeChecker(evt);
  });

  adTimeOut.addEventListener(`change`, (evt) => {
    timeChecker(evt);
  });

  const mainContent = document.querySelector(`main`);

  const closePopup = (evt, popup) => {
    window.util.isMouseDown(evt, () => popup.remove());
  };

  const onEscButton = (evt, popup) => {
    window.util.isEscEvt(evt, () => popup.remove());
    document.removeEventListener(`keydown`, onSuccessEscButton);
    document.removeEventListener(`keydown`, onErrorEscButton);
  };

  const closeSuccessPopup = (evt) => {
    const popup = mainContent.querySelector(`.success`);
    closePopup(evt, popup);
  };

  const onSuccessEscButton = (evt) => {
    const popup = mainContent.querySelector(`.success`);
    onEscButton(evt, popup);
  };

  const closeErrorPopup = (evt) => {
    const popup = mainContent.querySelector(`.error`);
    closePopup(evt, popup);
  };

  const onErrorEscButton = (evt) => {
    const popup = mainContent.querySelector(`.error`);
    onEscButton(evt, popup);
  };

  const onSuccess = () => {
    const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
    const successMessage = successTemplate.cloneNode(true);

    mainContent.appendChild(successMessage);
    clearForm();

    document.addEventListener(`keydown`, onSuccessEscButton);
    successMessage.addEventListener(`click`, closeSuccessPopup);
  };

  const onError = () => {
    const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
    const errorMessage = errorTemplate.cloneNode(true);

    mainContent.appendChild(errorMessage);
    errorMessage.addEventListener(`click`, closeErrorPopup);
    document.addEventListener(`keydown`, onErrorEscButton);
  };

  adForm.addEventListener(`submit`, (evt) => {
    window.backend.send(new FormData(adForm), onSuccess, onError);
    evt.preventDefault();
  });

  const clearForm = () => {
    adForm.reset();
    window.map.disablePage();
  };

  adForm.querySelector(`.ad-form__reset`).addEventListener(`click`, (evt) => {
    evt.preventDefault();
    clearForm();
  });

  window.form = {
    setFieldStatus,
    setRooms
  };
})();
