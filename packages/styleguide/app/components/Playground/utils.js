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


export function hideSecrets(string) {
  return string.replace(/accessToken="\S+"/gm, 'accessToken="*"');
}


export function replaceSymbol(string) {
  return string.replace(/Symbol\((.+?)\)/gm, '$1');
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
    if (Array.isArray(_tree)) {
      return React.createElement(React.Fragment, {}, ...React.Children.map(_tree, mdxTransform));
    }
    if (Object.values(_tree.props || {}).some((c) => !! c?.$$typeof || Array.isArray(c))) {
      const newTree = React.cloneElement(_tree, { ...Object.keys(_tree.props).reduce((currentProps, propKey) => {
        let newProp;
        const propValue = _tree.props[propKey];

        if (propKey === 'children' && Array.isArray(propValue)) {
          newProp = propValue.map((child) => child.$$typeof ? mdxTransform(child) : child);
        }
        else {
          if (Array.isArray(propValue)) {
            newProp = propValue.map((p) => p.$$typeof ? mdxTransform(p) : p);
          }
          else {
            newProp = propValue?.$$typeof ? mdxTransform(propValue) : propValue;
          }
        }
        return { ...currentProps, [propKey]: newProp };
      }, {})});
      return transformMdxToReact(newTree, targetComponent, props);
    }
    return transformMdxToReact(_tree, targetComponent, props);
  }
  return mdxTransform(tree);
}