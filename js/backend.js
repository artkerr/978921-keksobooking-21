'use strict';

(() => {
  const LOAD_URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const TIMEOUT_IN_MS = 10000;
  const StatusCode = {
    OK: 200
  };

  window.getAdverts = (onLoad, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError(`Статус ответа:  ${xhr.status} ${xhr.statusText}`);
      }
    });
    xhr.addEventListener(`error`, () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout }мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(`GET`, LOAD_URL);
    xhr.send();
  };
})();
