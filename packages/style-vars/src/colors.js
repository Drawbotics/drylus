const tc = require('tinycolor2');


module.exports.lighten = function lighten(color, amount) {
  return tc(color).lighten(amount).toString();
}


module.exports.fade = function fade(color, amount) {
  return tc(color).setAlpha(amount / 100).toString();
}
