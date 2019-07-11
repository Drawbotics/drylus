import camelCase from 'lodash/camelCase';


export function getEnumAsClass(enumVal) {
  return camelCase(enumVal?.description.toLowerCase());
}
