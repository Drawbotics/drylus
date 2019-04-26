import flow from 'lodash/flow';


function removeHash(string) {
  return string.replace(/(css-).*?(-)/gm, '');
}


function splitClasses(string) {
  return string.split('-');
}


function removeDuplicate(array) {
  return array.filter((_, index) => index % 2 === 1);
}


function prependString(string) {
  return `Drylus-${string}`;
}


export function transformClassname(string) {
  const classes = flow(removeHash, splitClasses)(string);
  // NOTE remove next line if they fix the emotion issue https://github.com/emotion-js/emotion/issues/1328
  const noDuplicate = removeDuplicate(classes);
  const withPrefix = noDuplicate.map(prependString);
  return withPrefix.join(' ');
}


export function adaptForVanilla(markup) {
  const adapted = markup.replace(/(?<=")css-\S+(?=")/gm, transformClassname);
  return adapted;
}
