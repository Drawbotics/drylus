import React from 'react';
import flow from 'lodash/flow';
import omit from 'lodash/omit';


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


function transformMdxToReact(mdxElement) {
  if (typeof mdxElement.type === 'string' && mdxElement.type.includes('react.fragment')) {
    return mdxElement;
  }
  return React.createElement(mdxElement.props.originalType || mdxElement.type, omit(mdxElement.props, ['mdxType', 'originalType']))
}


export function recursiveMdxTransform(tree) {
  if (! tree.props.children.$$typeof && ! Array.isArray(tree.props.children)) {   // end of tree
    return transformMdxToReact(tree);
  }
  else if (Array.isArray(tree.props.children)) {
    const newTree = React.cloneElement(tree, { children: React.Children.map(tree.props.children, recursiveMdxTransform) });
    return transformMdxToReact(newTree);
  }
  else {
    const newTree = React.cloneElement(tree, { children: React.Children.map(tree.props.children, recursiveMdxTransform) });
    return transformMdxToReact(newTree);
  }
}
