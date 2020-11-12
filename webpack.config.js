const path = require("path");

module.exports = {
 entry: [
  "./js/backend.js",
  "./js/debounce.js",
  "./js/form.js",
  "./js/map.js",
  "./js/util.js",
  "./js/main.js",
  "./js/pin.js",
  "./js/filter.js",
  "./js/card.js",
  "./js/moving.js",
  "./js/photo.js"
 ],
 output: {
   filename: "bundle.js",
   path: path.resolve(__dirname),
   iife: true
 },
 devtool: false
};
