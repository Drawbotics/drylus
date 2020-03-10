import { useScreenSize } from '@drawbotics/use-screen-size';
import assign from 'lodash/assign';
import { useState } from 'react';

import { Responsive } from '../types';

function _getPropsForSize(responsive: Responsive) {
  const { screenSize, ScreenSizes } = useScreenSize();

  if (screenSize <= ScreenSizes.XS && responsive.XS != null) {
    return responsive.XS;
  } else if (screenSize <= ScreenSizes.S && responsive.S != null) {
    return responsive.S;
  } else if (screenSize <= ScreenSizes.M && responsive.M != null) {
    return responsive.M;
  } else if (screenSize <= ScreenSizes.L && responsive.L != null) {
    return responsive.L;
  }
  if (screenSize <= ScreenSizes.XL && responsive.XL != null) {
    return responsive.XL;
  } else if (screenSize > ScreenSizes.XL && responsive.HUGE != null) {
    return responsive.HUGE;
  } else {
    return {};
  }
}

export function useResponsiveProps<T>(original: T, responsive?: Responsive) {
  if (!responsive) {
    return original;
  }

  const responsiveProps = _getPropsForSize(responsive);

  const props = assign({}, original, responsiveProps);

  return props;
}

// We use this instead of useState to get correct object equality
// otherwise the hook will cause a re-render all the time when using
// the rect object directly
export function useRect() {
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const rect = { top, left, height, width };
  const setRect = ({
    top,
    left,
    height,
    width,
  }: {
    top: number;
    left: number;
    height: number;
    width: number;
  }) => {
    setTop(top);
    setLeft(left);
    setHeight(height);
    setWidth(width);
  };
  return {
    rect,
    setRect,
  };
}
