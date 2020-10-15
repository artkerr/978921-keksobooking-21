'use strict';

(() => {
  window.util = {
    isEnterEvt: (evt, action) => {
      if (evt.key === `Enter`) {
        action();
      }
    },
    isMouseDown: (evt, action) => {
      if (evt.which === 1) {
        action();
      }
    }
  };
})();
