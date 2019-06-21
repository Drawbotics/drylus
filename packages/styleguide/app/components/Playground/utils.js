import React from 'react';
import flow from 'lodash/flow';
import omit from 'lodash/omit';
import merge from 'lodash/merge';


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
  if (string.includes('noreplace')) {
    return string;
  }
  const classes = flow(removeHash, splitClasses)(string);
  // NOTE remove next line if they fix the emotion issue https://github.com/emotion-js/emotion/issues/1328
  const noDuplicate = removeDuplicate(classes);
  const withPrefix = noDuplicate.map(prependString);
  return withPrefix.join(' ');
}


export function adaptForVanilla(markup) {
  const adapted = markup.replace(/css-\S+(?=")/gm, transformClassname);
  return adapted;
}


function transformMdxToReact(mdxElement, target, props) {
  if (typeof mdxElement.type === 'string' && mdxElement.type.includes('react.fragment')) {
    return mdxElement;
  }
  if (target && target === mdxElement.props.originalType || target === mdxElement.type) {
    const newProps = merge(omit(mdxElement.props, ['mdxType', 'originalType']), Object.assign({}, props));
    return React.createElement(target, newProps);
  }
  return React.createElement(mdxElement.props.originalType || mdxElement.type, omit(mdxElement.props, ['mdxType', 'originalType']));
}


export function recursiveMdxTransform(tree, target) {
  const { component, props } = target;
  const targetComponent = component || null;

  function mdxTransform(_tree) {
    if (Object.values(_tree.props || {}).some((c) => !! c?.$$typeof || Array.isArray(c))) {
      const newTree = React.cloneElement(_tree, { ...Object.keys(_tree.props).reduce((props, propKey) => ({
        ...props,
        [propKey]: _tree.props[propKey]?.$$typeof ? mdxTransform(_tree.props[propKey]) : (
          Array.isArray(_tree.props[propKey]) && propKey !== 'children' ? _tree.props[propKey].map((p) => p.$$typeof ? mdxTransform(p) : p) : _tree.props[propKey]
        ),
      }), {}) });
      return transformMdxToReact(newTree, targetComponent, props);
    }
    if (Array.isArray(_tree)) {
      return React.createElement(React.Fragment, {}, ...React.Children.map(_tree, mdxTransform));
    }
    if (! _tree.props.children?.$$typeof && ! Array.isArray(_tree.props.children)) {   // end of tree
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
