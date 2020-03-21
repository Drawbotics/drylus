import flow from 'lodash/flow';
import last from 'lodash/last';
import merge from 'lodash/merge';
import omit from 'lodash/omit';
import React from 'react';

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

function _getDefault(prop) {
  const def = prop.comment?.tags?.find((t) => t.tag === 'default');
  return def ? def.text : null;
}

function _getDeprecation(prop) {
  const deprecation = prop.comment?.tags?.find((t) => t.tag === 'deprecated');
  return deprecation ? deprecation.text : null;
}

function _getValuesForEnum(enumName, docs) {
  const moduleName = `"react-drylus/src/enums/${enumName}"`;
  const doc = docs.children.find((module) => module.name === moduleName);
  return doc.children[0].children.map((v) => `${enumName}.${v.name}`);
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

function _getType(type, docs) {
  console.log('Type: ', type)
  if (type.type === 'instrinsic') {
    return {
      type: type.name,
    };
  }

  if (type.type === 'reference') {
    if (type.name === 'Style') {
      return {
        type: 'shape',
        name: 'Style',
        // TODO: add the shape and display it in a tooltip
      };
    }

    if (type.name === 'React.ReactNode') {
      return {
        type: 'React node',
        name: 'React node',
      };
    }
  }

  if (type.type === 'reflection') {
    return {
      type: 'function',
      name: 'func',
      signature: `() => void`, // TODO infer function signature
    }
  }

  if (type.name === 'Exclude') {
    return _computeExclude(type, docs);
  }
  if (type.type === 'reference' && !type.typeArguments && type.name !== 'Record') {
    return {
      type: 'enum',
      name: type.name,
      values: _getValuesForEnum(type.name, docs),
    };
  }
  else if (type.type === 'union') {
    const potentialTypes = type?.types?.filter((t) => t.name !== 'undefined').map((t) => t.name);
    if (potentialTypes.includes('true') && potentialTypes.includes('false')) {
      return {
        type: 'boolean',
        name: 'boolean',
      };
    }
    if (type?.types.map((t) => t.type).includes('reflection')) {
      return {
        type: 'function',
        name: 'func',
        signature: `() => void`, // TODO infer function signature
      }
    }
    if (potentialTypes.length === 1) {
      return {
        type: potentialTypes[0],
        name: potentialTypes[0], // TODO  make recursive
      };
    }
    return {
      type: 'union',
      name: 'union',
      values: type.types.map((t) => _getType(t, docs))
    }
  }
  else if (type?.operator === 'keyof') {
    return {
      type: 'string',
      name: 'string',
    };
  }
  else {
    console.log('final else')
    return { name: type.name};
  }
}

export function generateDocs(componentName, docs) {
  const { children } = docs;
  console.log(children);

  const componentDescription = children.find(
    (child) => last(child.name.replace(/"/g, '').split('/')) === componentName,
  );

  const propsInterfaceName = `${componentName}Props`;
  const interfaceDescription = componentDescription.children.find(
    (child) => child.name === propsInterfaceName,
  );

  if (interfaceDescription == null) {
    return null;
  }


  const res = interfaceDescription.children.reduce((props, prop) => {
    console.log(prop);
    return {
      ...props,
      [prop.name]: {
        required: !prop.flags?.isOptional,
        type: _getType(prop.type, docs),
        deprecation: _getDeprecation(prop),
        defaultValue: _getDefault(prop),
        description:  prop.comment?.shortText || '',
      },
    };
  }, {});
  return res;
}
