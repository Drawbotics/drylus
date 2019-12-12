import Enum from '@drawbotics/enums';

import { deprecateProperty } from '../utils';


/**
 * @deprecated and will be removed in version 6.0
 */

const Categories = deprecateProperty(new Enum(
  'BRAND',
  'SUCCESS',
  'INFO',
  'WARNING',
  'DANGER',
  'PRIMARY',
), 'Categories', 'Category');


export default Categories;
