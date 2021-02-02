import { IconType } from '../components';
import { icons as styleDefinition } from './inject-global-styles';

export function getIconContent(icon: IconType): string {
  return `\'` + styleDefinition.match(new RegExp(`${icon}.*?content: "(.*?)";`, 's'))[1] + `'`;
}
