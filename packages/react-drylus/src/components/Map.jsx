import React, { useRef, useState } from 'react';
import { css } from 'emotion';
import MapboxMap, { Marker as MapboxMarker } from 'react-mapbox-wrapper';
import { LngLatBounds } from 'mapbox-gl';
import PropTypes from 'prop-types';
import sv, { fade } from '@drawbotics/drylus-style-vars';


const styles = {
  root: css`
    overflow: hidden;
  `,
  map: css`
    height: 100%;
    
    & .mapboxgl-control-container {
      display: none;
    }

    canvas {
      outline: none;
    }
  `,
  marker: css`
    position: relative;
    height: ${sv.defaultMargin};
    width: ${sv.defaultMargin};
    border-radius: 1000px;
    background: ${fade(sv.brand, 30)};
    border: 1px solid ${sv.brand};
  `,
  label: css`
    position: absolute;
    top: calc(-100% - 3px);
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 5px 10px;
    border-radius: ${sv.defaultBorderRadius};
    color: ${sv.white};
    background: ${sv.brand};
    font-size: 0.9rem;
  `,
};


const Map = ({
  accessToken,
  markers,
  height,
  style,
  ...props,
}) => {
  const ref = useRef();

  const [ mapRef, setMapRef ] = useState(ref.current);

  const handleFitMarkers = (map) => {
    const coordinatesToFit = markers.reduce((coords, marker) =>
      coords.extend([ marker.coordinates.lng, marker.coordinates.lat ]), new LngLatBounds());
    map.fitBounds(coordinatesToFit, { padding: { top: 60, bottom: 60, left: 60, right: 60 } });
    setMapRef(map);
  };
  return (
    <div className={styles.root} style={{ height, ...style }}>
      <MapboxMap
        onLoad={handleFitMarkers}
        className={styles.map}
        accessToken={accessToken}
        // eslint-disable-next-line react/style-prop-object
        style="mapbox://styles/mapbox/light-v9"
        coordinates={markers[0]?.coordinates}
        {...props}>
        {do{
          if (mapRef) {
            markers.map((marker, i) => (
              <MapboxMarker
                key={i}
                coordinates={marker.coordinates}
                map={mapRef}
                {...marker.options}>
                <div className={styles.marker}>
                  {do {
                    if (marker.label != null) {
                      <div className={styles.label}>{marker.label}</div>
                    }
                  }}
                </div>
              </MapboxMarker>
            ));
          }
        }}
      </MapboxMap>
    </div>
  );
};


Map.propTypes = {
  /** Determines the height of the map in pixels */
  height: PropTypes.number,

  /** If true, the user can interact with the map through panning and zooming */
  interactive: PropTypes.bool,

  /** Level of zoom by default */
  zoom: PropTypes.number,

  /** Access token to use the mapbox API, ask an admin for this if you dont have it */
  accessToken: PropTypes.string.isRequired,

  /** Elements you want to see on the map. To customize the Marker object, you can use the options field */
  markers: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    coordinates: PropTypes.shape({
      lng: PropTypes.number.isRequired,
      lat: PropTypes.number.isRequired,
    }).isRequired,
    options: PropTypes.object,
  })).isRequired,

  /** Used for style overrides, applied to Map */
  style: PropTypes.object,
};


Map.defaultProps = {
  interactive: false,
  height: 300,
};


export default Map;