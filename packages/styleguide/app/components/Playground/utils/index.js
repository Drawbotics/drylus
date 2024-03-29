import flow from 'lodash/flow';
import merge from 'lodash/merge';
import omit from 'lodash/omit';
import React from 'react';

export * from './generate-docs';
export * from './extract-intrinsics';

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
  const adapted = markup.replace(/css-.+?(?=["|\s])/gm, transformClassname);
  return adapted;
}

function transformMdxToReact(mdxElement, target, props) {
  if (
    (typeof mdxElement.type === 'string' && mdxElement.type.includes('react.fragment')) ||
    mdxElement.props == null
  ) {
    return mdxElement;
  }
  if ((target && target === mdxElement.props.originalType) || target === mdxElement.type) {
    const newProps = merge(
      omit(mdxElement.props, ['mdxType', 'originalType']),
      Object.assign({}, props),
    );
    return React.createElement(target, { ...newProps, key: mdxElement.key ?? undefined });
  }
  return React.createElement(mdxElement.props.originalType || mdxElement.type, {
    ...omit(mdxElement.props, ['mdxType', 'originalType']),
    key: mdxElement.key ?? undefined,
  });
}

export function recursiveMdxTransform(tree, target) {
  const { component, props } = target;
  const targetComponent = component || null;

  function mdxTransform(_tree, key) {
    if (Array.isArray(_tree)) {
      return React.createElement(React.Fragment, {}, ...React.Children.map(_tree, mdxTransform));
    }
    if (Object.values(_tree.props || {}).some((c) => !!c?.$$typeof || Array.isArray(c))) {
      const newTree = React.cloneElement(_tree, {
        ...Object.keys(_tree.props).reduce((currentProps, propKey) => {
          let newProp;
          const propValue = _tree.props[propKey];

          if (propKey === 'children' && Array.isArray(propValue)) {
            newProp = propValue.map((child, i) =>
              child?.$$typeof ? mdxTransform(child, `${propKey}${i}`) : child,
            );
          } else {
            if (Array.isArray(propValue)) {
              newProp = propValue.map((p) => (p.$$typeof ? mdxTransform(p) : p));
            } else {
              newProp = propValue?.$$typeof ? mdxTransform(propValue) : propValue;
            }
          }
          return { ...currentProps, [propKey]: newProp, key };
        }, {}),
      });
      return transformMdxToReact(newTree, targetComponent, props);
    }
    return transformMdxToReact(_tree, targetComponent, props);
  }
  return mdxTransform(tree);
}
