import React from 'react';

function MapGL(props) {
  return React.createElement('div', { 'data-testid': 'map', ref: props.ref }, props.children);
}

export function Marker(props) {
  return React.createElement('div', { 'data-testid': 'marker' }, props.children);
}

export { MapGL as Map };
export default MapGL;
