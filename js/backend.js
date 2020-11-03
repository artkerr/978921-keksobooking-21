'use strict';

(() => {
  const TIMEOUT_IN_MS = 10000;
  const Url = {
    LOAD: `https://21.javascript.pages.academy/keksobooking/data`
  };
  const StatusCode = {
    OK: 200
  };

  const getAdverts = (onLoad, onError) => {
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
    xhr.open(`GET`, Url.LOAD);
    xhr.send();
  };

  window.backend = {
    getAdverts
  };
})();