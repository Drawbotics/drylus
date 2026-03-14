import React from 'react';

const MapGL = React.forwardRef(function MapGL(props, ref) {
  return React.createElement('div', { 'data-testid': 'map', ref }, props.children);
});

export function Marker(props) {
  return React.createElement('div', { 'data-testid': 'marker' }, props.children);
}

export { MapGL as Map };
export default MapGL;
