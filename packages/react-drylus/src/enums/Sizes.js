import Enum from '@drawbotics/enums';

import { deprecateProperty } from '../utils';


/**
 * @deprecated and will be removed in version 6.0
 */

const Sizes = deprecateProperty(new Enum(
  'EXTRA_SMALL',
  'SMALL',
  'DEFAULT',
  'LARGE',
  'EXTRA_LARGE',
  'HUGE',
  'EXTRA_HUGE',
  'MASSIVE',
), 'Sizes', 'Size');


export default Sizes;
