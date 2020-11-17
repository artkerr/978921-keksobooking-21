'use strict';

const map = document.querySelector(`.map`);
const mainPin = map.querySelector(`.map__pin--main`);
const mainPinArrow = 22;
const mainPinSize = 62;

const PinLimit = {
  TOP_Y: 130 - mainPinSize - mainPinArrow,
  BOTTOM_Y: 630 - mainPinSize - mainPinArrow,
  LEFT_X: 0 - mainPin.offsetWidth / 2,
  RIGHT_X: map.offsetWidth - mainPin.offsetWidth / 2
};

mainPin.addEventListener(`mousedown`, (evt) => {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  let dragged = false;

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();
    dragged = true;

    const shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    let top = mainPin.offsetTop - shift.y;
    let left = mainPin.offsetLeft - shift.x;

    if (top < PinLimit.TOP_Y) {
      top = PinLimit.TOP_Y;
    } else if (top > PinLimit.BOTTOM_Y) {
      top = PinLimit.BOTTOM_Y;
    }
    if (left < PinLimit.LEFT_X) {
      left = PinLimit.LEFT_X;
    } else if (left > PinLimit.RIGHT_X) {
      left = PinLimit.RIGHT_X;
    }

    mainPin.style.top = `${top}px`;
    mainPin.style.left = `${left}px`;

    window.map.setPinLocation(left, top + Math.floor(mainPinSize / 2));
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);

    if (dragged) {
      const onClickPreventDefault = (clickEvt) => {
        clickEvt.preventDefault();
        mainPin.removeEventListener(`click`, onClickPreventDefault);
      };
      mainPin.addEventListener(`click`, onClickPreventDefault);
    }
  };

  if (!map.classList.contains(`map--faded`)) {
    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  }

});

