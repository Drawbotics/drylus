/* eslint-disable no-use-before-define */

import flow from 'lodash/flow';
import merge from 'lodash/merge';
import omit from 'lodash/omit';
import React from 'react';
import { shape } from 'prop-types';

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
              child.$$typeof ? mdxTransform(child, `${propKey}${i}`) : child,
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

function _getInterfaceDescription(name, docs) {

  const flattenedProps = docs.children.reduce((memo, child) => {
    const propDescriptions = child?.children?.filter((c) => c.name.endsWith('Props')) ?? [];
    return [...memo, ...propDescriptions];
  }, []);

  const propsInterfaceName = `${name}Props`;
  return flattenedProps.find((child) => child.name === propsInterfaceName);
}

function _getDefault(prop) {
  const def = prop.comment?.tags?.find((t) => t.tag === 'default');
  return def ? def.text : null;
}

function _getDeprecation(prop) {
  const deprecation = prop.comment?.tags?.find((t) => t.tag === 'deprecated');
  return deprecation ? deprecation.text : null;
}

function _getValuesForEnum(enumName, docs, parentComponentName) {
  const moduleName = `"react-drylus/src/enums/${enumName}"`;
  let doc;
  doc = docs.children.find((module) => module.name === moduleName);

  if (doc == null) {
    const parentModule = docs.children.find((module) => module.name.includes(parentComponentName));
    const doc = parentModule.children.find((c) => c.name.includes(enumName));
    return doc.children.map((v) => `${enumName}.${v.name}`);
  }
  else {
    return doc.children[0].children.map((v) => `${enumName}.${v.name}`);
  }
}

function _computeExclude(type, docs) {
  const enumName = type.typeArguments[0].name;
  const enumValues = _getValuesForEnum(enumName, docs);

  const valuesToRemove = type.typeArguments[1].name != null
    ? [`${enumName}.${type.typeArguments[1].name}`]
    : type.typeArguments[1].types.map((arg) => `${enumName}.${arg.name}`);

  const withValuesRemoved = enumValues.filter((v) => !valuesToRemove.includes(v));

  return {
    type: 'enum',
    name: `Subset of ${enumName}`,
    values: withValuesRemoved,
  };
}

function _computeObject(properties, docs, parentComponentName) {
  return properties?.reduce((memo, property) => {
    return {
      ...memo,
      [property.name]: _getType(property.type, docs, parentComponentName),
    }
  }, {});
}

function _getFunctionSignature(type) {
  const parameters = type.declaration.signatures[0]?.parameters?.map((p) => {
    const displayType = p.type.type === 'union'
      ? p.type.types.map((t) => t.name).join(' | ')
      : p.type.name;
    return `${p.name}: ${displayType}`;
  }).join(', ')
  return `(${parameters || ''}) => ${type.declaration.signatures[0].type.name}`
}

function _getResponsiveDoc(docs) {
  const flattened = docs.children.reduce((memo, module) => [...memo, ...(module?.children ?? [])], []);
  return flattened.find((entity) => entity?.name === 'Responsive' && entity?.kindString === 'Interface');
}

function _resolveReference(ref, docs, parentComponentName) {
  const parentModule = docs?.children.find((module) => module.name.includes(parentComponentName));
  let doc = parentModule?.children.find((c) => c.name.includes(ref.name));

  if (doc == null) {
    const flattened = docs?.children.reduce((memo, module) => [...memo, ...(module?.children ?? [])], []);
    doc = flattened?.find((entity) => entity?.name === ref.name);
  }

  if (doc == null) return ref 
  else if (doc?.type != null) return _getType(doc.type, docs, parentComponentName);
  else if (doc?.kindString === 'Enumeration') {
    return {
      type: 'enum',
      name: doc.name,
      values: doc.children.map((v) => `${doc.name}.${v.name}`),
    };
  }
  else { 
    return {
      type: 'shape',
      name: doc?.name,
      values: _computeObject(doc.children, docs, parentComponentName),
    };
  }
}

let parsingStack = [];

function _getType(type, docs, componentName) {
  if (type.name !== 'Array' && type?.kindString !== 'Enumeration' && parsingStack.includes(type.name)) {
    return type.name;
  }
  else {
    let mustPop = false
    if (type.name != null) {
      mustPop = true;
      parsingStack.push(type.name);
    }
    const res = __getType(type, docs, componentName);
    if (mustPop) parsingStack.pop();
    return res;
  }
}

function __getType(type, docs, componentName) {
  if (type.type === 'instrinsic') {
    return {
      type: type.name,
      name: type.name,
    };
  }
  if (type.type === 'stringLiteral') {
    return type.value;
  }

  if (type.type ==='tuple') {
    return {
      type: 'tuple',
      values: type.elements.map((e) => _getType(e, docs, componentName)),
    };
  }

  // Reference
  if (type.type === 'reference') {
    if (type.name === 'Exclude') {
      return _computeExclude(type, docs);
    }
    if (type.name === 'Array') {
      return {
        type: 'array',
        values: type.typeArguments.map((v) => _getType(v, docs, componentName))
      }
    }
    else if (type.name === 'Style') {
      return {
        type: 'shape',
        name: 'Style',
        values: {
          'CssProperty': 'string',
        },
      };
    }
    else if (type.name.includes('ReactElement')) {
      let returnType = {
        type: 'ReactElement',
      }
      if (type.typeArguments != null) {
        returnType.query = type.typeArguments[0].queryType.name;
        returnType.name = `ReactElement<${type.typeArguments[0].queryType.name}>`;
      }
      return returnType;
    }
    else if (type.name === 'React.ReactNode') {
      return {
        type: 'React node',
      };
    }
    else if (type.name === 'Responsive') {
      const doc = _getResponsiveDoc(docs);
      return {
        type: shape,
        name: 'Responsive',
        values: doc.children.reduce((memo, property) => ({...memo, [property.name]: `Partial<${componentName}Props>`}), {}),
      };
    }
    else {
      const resolved = _resolveReference(type, docs, componentName);
      return resolved;
    }
  }

  // Reflection
  if (type.type === 'reflection') {
    if (type.declaration.signatures != null) {
      return {
        type: 'function',
        name: 'func',
        values: _getFunctionSignature(type)
      }
    }
    else {
      return {
        type: 'shape',
        values: _computeObject(type.declaration.children, docs, componentName),
      };
    }
  }

  // TODO: move me
  if (type.type === 'reference' && !type.typeArguments && type.name !== 'Record') {
    return {
      type: 'enum',
      name: type.name,
      values: _getValuesForEnum(type.name, docs, componentName),
    };
  }

  // Union
  else if (type.type === 'union') {
    const potentialTypes = type?.types?.filter((t) => t.name !== 'undefined').map((t) => t.name);
    if (potentialTypes.includes('true') && potentialTypes.includes('false')) {
      return 'boolean';
    }
    if (potentialTypes.length === 1) {
      return _getType(type.types.find((t) => t.name === potentialTypes[0]), docs, componentName);
    }
    return {
      type: 'union',
      values: type.types.map((t) => _getType(t, docs, componentName))
    }
  }
  else if (type?.operator === 'keyof') {
    return {
      type: 'string',
      name: 'string',
    };
  }
  else {
    return type.name;
  }
}

export function generateDocs(componentName, docs) {
  const interfaceDescription = _getInterfaceDescription(componentName, docs);

  if (interfaceDescription == null) {
    return null;
  }

  const res = interfaceDescription.children.slice(0).reduce((props, prop) => {
    return {
      ...props,
      [prop.name]: {
        required: !prop.flags?.isOptional,
        type: _getType(prop.type, docs, componentName),
        deprecation: _getDeprecation(prop),
        defaultValue: _getDefault(prop),
        description:  prop.comment?.shortText || '',
      },
    };
  }, {});
  return res;
}
