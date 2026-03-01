"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getScreenSize;

var _drylusStyleVars = _interopRequireDefault(require("@drawbotics/drylus-style-vars"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _parseMaxWidth(mediaQuery) {
  var _mediaQuery$match = mediaQuery.match(/max-width: (\d+)/),
      _mediaQuery$match2 = _slicedToArray(_mediaQuery$match, 2),
      maxWidth = _mediaQuery$match2[1];

  return parseInt(maxWidth);
}

function _parseMinWidth(mediaQuery) {
  var _mediaQuery$match3 = mediaQuery.match(/min-width: (\d+)/),
      _mediaQuery$match4 = _slicedToArray(_mediaQuery$match3, 2),
      minWidth = _mediaQuery$match4[1];

  return parseInt(minWidth);
}

function getScreenSize() {
  if (window.innerWidth <= _parseMaxWidth(_drylusStyleVars["default"].screenXs)) {
    return 1;
  } else if (window.innerWidth <= _parseMaxWidth(_drylusStyleVars["default"].screenS)) {
    return 2;
  } else if (window.innerWidth <= _parseMaxWidth(_drylusStyleVars["default"].screenM)) {
    return 3;
  } else if (window.innerWidth <= _parseMaxWidth(_drylusStyleVars["default"].screenL)) {
    return 4;
  } else if (window.innerWidth <= _parseMaxWidth(_drylusStyleVars["default"].screenXl)) {
    return 5;
  } else if (window.innerWidth > _parseMinWidth(_drylusStyleVars["default"].screenHuge)) {
    return window.innerWidth;
  }
}