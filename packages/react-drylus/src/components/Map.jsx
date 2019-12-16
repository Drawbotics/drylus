import React, { useRef, useState } from 'react';
import { css } from 'emotion';
import MapboxMap, { Marker as MapboxMarker } from 'react-mapbox-wrapper';
import { LngLatBounds } from 'mapbox-gl';
import PropTypes from 'prop-types';
import sv from '@drawbotics/drylus-style-vars';

import Flex, { FlexDirection, FlexItem } from '../layout/Flex';
import { Size, Tier } from '../enums';
import Popover from './Popover';
import Text from './Text';
import Margin from '../layout/Margin';


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
  `,
  dropContainer: css`
    transform: scaleX(0.8);
  `,
  drop: css`
    height: ${sv.marginLarge};
    width: ${sv.marginLarge};
    border-radius: 0 50% 80% 50%;
    transform: rotate(-135deg);
    background: ${sv.brand};
  `,
  label: css`
    position: absolute;
    top: calc(${sv.marginLarge} / 2);
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9;
    display: flex;
    color: ${sv.white};
  `,
};


const PopoverContent = ({
  title,
  subtitle,
}) => {
  return (
    <Flex direction={FlexDirection.VERTICAL}>
      <FlexItem>
        <Text>{title}</Text>
      </FlexItem>
      {do {
        if (subtitle) {
          <FlexItem>
            <Margin size={{ top: Size.EXTRA_SMALL }}>
              <Text
                size={Size.SMALL}
                tier={Tier.SECONDARY}>
                {subtitle}
              </Text>
            </Margin>
          </FlexItem>
        }
      }}
    </Flex>
  );
}


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
    const coordinatesToFit = markers.reduce((coords, marker) => {
      const { coordinates } = marker;
      return coords.extend([coordinates.lng, coordinates.lat]);
    }, new LngLatBounds());
    map.fitBounds(coordinatesToFit, { padding: { top: 60, bottom: 60, left: 60, right: 60 } });
    setMapRef(map);
  };

  const renderMarker = (marker) => {
    return (
      <div className={styles.marker}>
        {do {
          if (marker.label != null) {
            <div className={styles.label}>{marker.label}</div>
          }
        }}
        <div className={styles.dropContainer}>
          <div className={styles.drop} />
        </div>
      </div>
    );
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
        {do {
          if (mapRef) {
            markers.map((marker, i) => (
              <MapboxMarker
                key={i}
                coordinates={marker.coordinates}
                map={mapRef}
                {...marker.options}>
                {do {
                  if (marker.title) {
                    <Popover
                      content={
                        <PopoverContent
                          title={marker.title}
                          subtitle={marker.subtitle} />
                      }>
                      {renderMarker(marker)}
                    </Popover>
                  }
                  else {
                    renderMarker(marker)
                  }
                }}
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
    label: PropTypes.node,
    title: PropTypes.string,
    subtitle: PropTypes.string,
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