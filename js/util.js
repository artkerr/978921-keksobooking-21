'use strict';

(() => {

  const isEnterEvt = (evt, action) => {
    if (evt.key === `Enter`) {
      action();
    }
  };

  const isMouseDown = (evt, action) => {
    if (evt.which === 1) {
      action();
    }
  };

  const errorHandler = (message) => {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: tomato;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `40px`;

    node.textContent = message;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.util = {
    isEnterEvt,
    isMouseDown,
    errorHandler
  };
})();
