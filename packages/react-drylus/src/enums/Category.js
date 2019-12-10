import Enum from '@drawbotics/enums';

import { deprecateProperty } from '../utils';


/**
 * @deprecated and will be removed in version 6.0
 */

const Category = deprecateProperty(new Enum(
  'BRAND',
  'SUCCESS',
  'INFO',
  'WARNING',
  'DANGER',
  'PRIMARY',
), 'Category', 'Categories');


export default Category;
