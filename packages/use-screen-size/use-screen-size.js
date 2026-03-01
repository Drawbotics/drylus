"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useScreenSize;

var _react = require("react");

var _getScreenSize = _interopRequireDefault(require("./get-screen-size"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ScreenSizes = {
  XS: 1,
  S: 2,
  M: 3,
  L: 4,
  XL: 5
};

function useScreenSize() {
  var _useState = (0, _react.useState)((0, _getScreenSize["default"])()),
      _useState2 = _slicedToArray(_useState, 2),
      size = _useState2[0],
      setSize = _useState2[1];

  (0, _react.useEffect)(function () {
    var handleResize = function handleResize() {
      setSize((0, _getScreenSize["default"])());
    };

    window.addEventListener('resize', handleResize);
    return function () {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return {
    screenSize: size,
    ScreenSizes: ScreenSizes
  };
}