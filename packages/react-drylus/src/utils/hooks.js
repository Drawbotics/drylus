import { useScreenSize } from '@drawbotics/use-screen-size';
import assign from 'lodash/assign';


function _getPropsForSize(responsive, sizes) {
  const { screenSize, ScreenSizes } = useScreenSize();

  if (screenSize <= ScreenSizes.XS && responsive.XS != null) {
    return responsive.XS;
  }
  else if (screenSize <= ScreenSizes.S && responsive.S != null) {
    return responsive.S;
  }
  else if (screenSize <= ScreenSizes.M && responsive.M != null) {
    return responsive.M;
  }
  else if (screenSize <= ScreenSizes.L && responsive.L != null) {
    return responsive.L;
  }
  if (screenSize <= ScreenSizes.XL && responsive.XL != null) {
    return responsive.XL;
  }
  else if (screenSize > ScreenSizes.XL && responsive.HUGE != null) {
    return responsive.HUGE;
  }
  else {
    return {};
  }
}


export function useResponsiveProps(original, responsive) {
  if ( ! responsive) {
    return original;
  }

  const responsiveProps = _getPropsForSize(responsive);

  const props = assign({}, original, responsiveProps);

  return props;
}