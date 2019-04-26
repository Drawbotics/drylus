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


function transformMdxToReact(mdxElement, target, props) {
  if (typeof mdxElement.type === 'string' && mdxElement.type.includes('react.fragment')) {
    return mdxElement;
  }
  if (target && target.type === mdxElement.props.originalType) {
    return React.cloneElement(target, {
      ...omit(mdxElement.props, ['mdxType', 'originalType']),
      ...props,
    });
  }
  return React.createElement(mdxElement.props.originalType || mdxElement.type, omit(mdxElement.props, ['mdxType', 'originalType']));
}


export function recursiveMdxTransform(tree, target) {
  const { component, props } = target;
  const targetComponent = component ? React.createElement(component) : null;

  function mdxTransform(_tree) {
    if (Array.isArray(_tree)) {
      return React.createElement(React.Fragment, {}, ...React.Children.map(_tree, mdxTransform));
    }
    if (! _tree.props.children.$$typeof && ! Array.isArray(_tree.props.children)) {   // end of tree
      return transformMdxToReact(_tree, targetComponent, props);
    }
    else if (Array.isArray(_tree.props.children)) {
      const newTree = React.cloneElement(_tree, { children: React.Children.map(_tree.props.children, mdxTransform) });
      return transformMdxToReact(newTree, targetComponent, props);
    }
    else {
      const newTree = React.cloneElement(_tree, { children: React.Children.map(_tree.props.children, mdxTransform) });
      return transformMdxToReact(newTree, targetComponent, props);
    }
  }
  return mdxTransform(tree);
}
