import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import { LngLat, LngLatBounds } from 'mapbox-gl';
import React, { useRef, useState } from 'react';
import MapboxMap, { Marker as MapboxMarker } from 'react-mapbox-wrapper';

import { useThemeColor } from '../base';
import { Size, Tier } from '../enums';
import { Flex, FlexDirection, FlexItem, Margin } from '../layout';
import { Style } from '../types';
import { getEnumAsClass, run } from '../utils';
import { Popover } from './Popover';
import { Text } from './Text';

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
  blue: css`
    background: ${sv.blue};
  `,
  red: css`
    background: ${sv.red};
  `,
  green: css`
    background: ${sv.green};
  `,
  orange: css`
    background: ${sv.orange};
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

export interface PopoverContentProps {
  title: string;
  subtitle?: string;
}

const PopoverContent = ({ title, subtitle }: PopoverContentProps) => {
  return (
    <Flex direction={FlexDirection.VERTICAL}>
      <FlexItem>
        <Text>{title}</Text>
      </FlexItem>
      {run(() => {
        if (subtitle) {
          return (
            <FlexItem>
              <Margin size={{ top: Size.EXTRA_SMALL }}>
                <Text size={Size.SMALL} tier={Tier.SECONDARY}>
                  {subtitle}
                </Text>
              </Margin>
            </FlexItem>
          );
        }
      })}
    </Flex>
  );
};

export interface Marker {
  label?: React.ReactNode;
  title?: string;
  subtitle?: string;
  marker?: React.ReactNode;
  coordinates: {
    lng: number;
    lat: number;
  };
  options?: any;
}

export interface MapProps {
  /**
   * Determines the height of the map in pixels
   * @default 300
   */
  height?: number;

  /**
   * If true, the user can interact with the map through panning and zooming
   * @default false
   */
  interactive?: boolean;

  /** Level of zoom by default */
  zoom?: number;

  /** Access token to use the mapbox API, ask an admin for this if you dont have it */
  accessToken: string;

  /** Elements you want to see on the map. To customize the Marker object, you can use the options field */
  markers: Array<Marker>;

  /** Used for style overrides */
  style?: Style;

  /** Used for style overrides */
  className?: string;

  /** @private */
  [x: string]: any;
}

export const Map = ({
  accessToken,
  markers,
  height = 300,
  style,
  interactive = false,
  className,
  ...props
}: MapProps) => {
  const ref = useRef();
  const [mapRef, setMapRef] = useState(ref.current);
  const themeColor = useThemeColor();

  const handleFitMarkers = (map: typeof MapboxMap) => {
    const coordinatesToFit = markers.reduce((coords, marker) => {
      const { coordinates } = marker;
      return coords.extend(new LngLat(coordinates.lng, coordinates.lat));
    }, new LngLatBounds());
    map.fitBounds(coordinatesToFit, { padding: { top: 60, bottom: 60, left: 60, right: 60 } });
    setMapRef(map);
  };

  const renderMarker = (marker: Marker) => {
    return (
      <div className={styles.marker}>
        {run(() => {
          if (marker.label != null) {
            return <div className={styles.label}>{marker.label}</div>;
          }
        })}
        <div className={styles.dropContainer}>
          <div
            className={cx(styles.drop, {
              [styles[getEnumAsClass<typeof styles>(themeColor)]]: themeColor != null,
            })}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={cx(styles.root, className)} style={{ height, ...style }}>
      <MapboxMap
        interactive={interactive}
        onLoad={handleFitMarkers}
        className={styles.map}
        accessToken={accessToken}
        // eslint-disable-next-line react/style-prop-object
        style="mapbox://styles/mapbox/light-v9"
        coordinates={markers[0]?.coordinates}
        {...props}>
        {run(() => {
          if (mapRef) {
            return markers.map((marker, i) => (
              <MapboxMarker
                key={i}
                coordinates={marker.coordinates}
                map={mapRef}
                {...marker.options}>
                {run(() => {
                  if (marker.title) {
                    return (
                      <Popover
                        content={
                          <PopoverContent title={marker.title} subtitle={marker.subtitle} />
                        }>
                        {marker.marker ?? renderMarker(marker)}
                      </Popover>
                    );
                  } else {
                    return marker.marker ?? renderMarker(marker);
                  }
                })}
              </MapboxMarker>
            ));
          }
        })}
      </MapboxMap>
    </div>
  );
};
