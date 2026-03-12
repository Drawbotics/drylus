const React = require('react');

const MapGL = React.forwardRef(function MapGL(props, ref) {
  return React.createElement('div', { 'data-testid': 'map', ref }, props.children);
});

function Marker(props) {
  return React.createElement('div', { 'data-testid': 'marker' }, props.children);
}

module.exports = {
  __esModule: true,
  default: MapGL,
  Map: MapGL,
  Marker,
};
