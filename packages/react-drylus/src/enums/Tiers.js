import Enum from '@drawbotics/enums';

import { deprecateProperty } from '../utils';

/**
 * @deprecated and will be removed in version 6.0
 */

const Tiers = deprecateProperty(new Enum('PRIMARY', 'SECONDARY', 'TERTIARY'), 'Tiers', 'Tier');

export default Tiers;
