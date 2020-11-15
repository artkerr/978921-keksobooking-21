'use strict';

const TIMEOUT_IN_MS = 10000;
const Url = {
  LOAD: `https://21.javascript.pages.academy/keksobooking/data`,
  SEND: `https://21.javascript.pages.academy/keksobooking`
};
const StatusCode = {
  OK: 200
};


const xhrRequest = (xhr, onLoad, onError) => {
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

  return xhr;
};

const load = (onLoad, onError) => {
  const xhr = new XMLHttpRequest();
  xhrRequest(xhr, onLoad, onError);
  xhr.open(`GET`, Url.LOAD);
  xhr.send();
};

const send = (data, onLoad, onError) => {
  const xhr = new XMLHttpRequest();
  xhrRequest(xhr, onLoad, onError);
  xhr.open(`POST`, Url.SEND);
  xhr.send(data);
};

window.backend = {
  load,
  send
};
