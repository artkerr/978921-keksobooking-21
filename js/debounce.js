'use strict';

const DEBOUNCE_INTERVAL = 5000;
let lastTimeout = null;

window.debounce = (cb) => {
  if (lastTimeout) {
    window.clearTimeout(lastTimeout);
  }
  lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
};
