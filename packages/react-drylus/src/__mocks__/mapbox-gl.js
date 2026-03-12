class LngLat {
  constructor(lng, lat) {
    this.lng = lng;
    this.lat = lat;
  }
}

class LngLatBounds {
  constructor() {
    this._sw = null;
    this._ne = null;
  }
  extend(coord) {
    return this;
  }
}

class Map {
  on() { return this; }
  remove() {}
  fitBounds() {}
}

class Marker {
  setLngLat() { return this; }
  addTo() { return this; }
  remove() {}
}

module.exports = {
  Map,
  Marker,
  LngLat,
  LngLatBounds,
  default: { Map, Marker, LngLat, LngLatBounds },
};
