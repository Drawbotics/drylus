/* eslint-disable no-use-before-define */

import omit from 'lodash/omit';

function _getInterfaceDescription(name, docs) {
  const flattenedProps = docs.children.reduce((memo, child) => {
    const propDescriptions = child?.children?.filter((c) => c.name.endsWith('Props')) ?? [];
    return [...memo, ...propDescriptions];
  }, []);

  const propsInterfaceName = `${name}Props`;
  return flattenedProps.find(
    (child) => child.name === propsInterfaceName && child.kindString === 'Interface',
  );
}

function _getDefault(prop) {
  const def = prop.comment?.tags?.find((t) => t.tag === 'default');
  return def ? def.text : null;
}

function _getDeprecation(prop) {
  const deprecation = prop.comment?.tags?.find((t) => t.tag === 'deprecated');
  return deprecation ? deprecation.text : null;
}

function _computeObject(properties, docs, parentComponentName) {
  return properties?.reduce((memo, property) => {
    const parsed = _getType(property.type, docs, parentComponentName);

    let value;
    if (parsed?.type === 'enum') value = parsed.name;
    else if (parsed?.type != null) value = omit(parsed, 'type');
    else value = parsed;

    return {
      ...memo,
      [property.name]: value,
    };
  }, {});
}

function _getFunctionSignature(type, docs, parentComponentName) {
  const parameters = type.declaration.signatures[0]?.parameters
    ?.map((p) => {
      let displayType = '';
      if (p.type.type === 'union') {
        displayType = p.type.types.map((t) => t.name).join(' | ');
      } else {
        const parsedType = _getType(p.type, docs, parentComponentName);
        displayType = parsedType.name ?? parsedType.type ?? parsedType;
      }

      return `${p.name}: ${displayType}`;
    })
    .join(', ');

  return `(${parameters ?? ''}) => ${type.declaration.signatures[0].type.name}`;
}

function _getResponsiveDoc(docs) {
  const flattened = docs.children.reduce(
    (memo, module) => [...memo, ...(module?.children ?? [])],
    [],
  );
  return flattened.find(
    (entity) => entity?.name === 'Responsive' && entity?.kindString === 'Interface',
  );
}

function _resolveReference(ref, docs, parentComponentName) {
  const parentModule = docs?.children.find((module) => module.name.includes(parentComponentName));
  let doc = parentModule?.children.find((c) => c.name === ref.name);

  if (doc == null) {
    const flattened = docs?.children.reduce(
      (memo, module) => [...memo, ...(module?.children ?? [])],
      [],
    );
    const candidates = flattened?.filter((entity) => entity?.name === ref.name);

    const withType = candidates?.find((c) => c.type != null);
    const noRef = candidates.find((c) => c?.kindString !== 'Reference');

    if (withType != null) doc = withType;
    if (noRef != null) doc = noRef;
    else doc = candidates[0];
  }

  if (doc == null) return ref;
  else if (doc?.type?.type === 'intersection') return ref.name;
  else if (doc?.type != null) return _getType(doc.type, docs, parentComponentName);
  else if (doc?.kindString === 'Enumeration') {
    return {
      type: 'enum',
      name: doc.name,
      values: doc.children.map((v) => `${doc.name}.${v.name}`),
    };
  } else {
    return {
      type: 'shape',
      name: doc?.name,
      values: _computeObject(doc.children, docs, parentComponentName),
    };
  }
}

let _parsingStack = [];
function _getType(type, docs, componentName, comment, enums) {
  if (
    type.name !== 'Array' &&
    type?.kindString !== 'Enumeration' &&
    _parsingStack.includes(type.name)
  ) {
    return type.name;
  } else {
    let mustPop = false;
    if (type.name != null) {
      mustPop = true;
      _parsingStack.push(type.name);
    }
    const res = _parseType(type, docs, componentName, comment, enums);

    if (mustPop) _parsingStack.pop();

    return res;
  }
}

function _parseType(type, docs, componentName, comment, enums) {
  const enumTag = comment?.tags?.find((t) => t.tag === 'kind');
  if (enumTag != null) {
    const match = enumTag.text.match(/([A-z]+)/g);
    const enumName = match[0];
    const intrinsic = type.types.filter((t) => t.type === 'intrinsic');
    const nonIntrinsic = type.types.filter((t) => t.type !== 'intrinsic');
    const enumValues = match.reduce(
      (memo, name) => [
        ...memo,
        ...enums
          .find((e) => e.name === name)
          .values.filter((e) => !!nonIntrinsic.find((type) => type.name === e))
          .map((v) => `${name}.${v}`),
      ],
      [],
    );

    return {
      type: 'enum',
      name: match.join(','),
      values: [...enumValues, ...intrinsic.map((i) => `${enumName}.${i.name}`)],
    };
  } else if (type.type === 'instrinsic') {
    return {
      type: type.name,
      name: type.name,
    };
  } else if (type.type === 'stringLiteral') {
    return type.value;
  } else if (type.type === 'tuple') {
    return {
      type: 'tuple',
      values: type.elements.map((e) => _getType(e, docs, componentName)),
    };
  }

  // Reference
  else if (type.type === 'reference') {
    if (type.name === 'Array') {
      return {
        type: 'array',
        values: type.typeArguments.map((v) => _getType(v, docs, componentName)),
      };
    } else if (type.name === 'Style') {
      return {
        type: 'shape',
        name: 'Style',
        values: {
          CssProperty: 'string',
        },
      };
    } else if (type.name.includes('ReactElement')) {
      return type.typeArguments[0].queryType.name;
    } else if (type.name === 'React.ReactNode') {
      return 'React Node';
    } else if (type.name === 'Responsive') {
      const doc = _getResponsiveDoc(docs);
      return {
        type: 'shape',
        name: 'Responsive',
        values: doc.children.reduce(
          (memo, property) => ({
            ...memo,
            [property.name]: `Partial<${componentName}Props>`,
          }),
          {},
        ),
      };
    } else {
      return _resolveReference(type, docs, componentName);
    }
  }

  // Reflection
  else if (type.type === 'reflection') {
    if (type.declaration.signatures != null) {
      return {
        type: 'function',
        name: 'func',
        values: _getFunctionSignature(type, docs, componentName),
      };
    } else {
      return {
        type: 'shape',
        values: _computeObject(type.declaration.children, docs, componentName),
      };
    }
  }

  // Union
  else if (type.type === 'union') {
    const potentialTypes = type?.types?.filter((t) => t.name !== 'undefined').map((t) => t.name);
    if (potentialTypes.includes('true') && potentialTypes.includes('false')) {
      return 'boolean';
    } else if (potentialTypes.length === 1) {
      // This means the only other member was undefined (optional) and we can treat this as a regular type
      return _getType(
        type.types.find((t) => t.name === potentialTypes[0]),
        docs,
        componentName,
        comment,
      );
    } else {
      return {
        type: 'union',
        values: type.types.map((t) => _getType(t, docs, componentName)),
      };
    }
  } else if (type?.operator === 'keyof') {
    return {
      type: 'string',
      name: 'string',
    };
  } else if (type.type === 'indexedAccess') {
    if (type?.objectType?.typeArguments) {
      return {
        type: `<${type?.objectType?.typeArguments?.map((t) => t.name).join(', ')}>: any`,
      };
    } else {
      return {
        type: `${type?.objectType.name}['${type?.indexType?.value}']`,
      };
    }
  } else {
    return type.name;
  }
}

function _getSearchableEnums(docs) {
  const enumFiles = docs.children.filter((file) => file.name.includes('src/enums'));
  return enumFiles.reduce((memo, file) => {
    if (file.children.some((c) => c.kindString !== 'Enumeration')) {
      return memo;
    }
    const definitions = file.children.map((_enum) => ({
      name: _enum.name,
      values: _enum.children.map((value) => value.name),
    }));
    return [...memo, ...definitions];
  }, []);
}

export function generateDocs(componentName, docs) {
  const interfaceDescription = _getInterfaceDescription(componentName, docs);

  if (interfaceDescription == null) {
    return null;
  }
  const enums = _getSearchableEnums(docs);
  const res = interfaceDescription.children.reduce((props, prop) => {
    if (prop?.flags?.isPrivate) {
      return props;
    }

    return {
      ...props,
      [prop.name]: {
        required: !prop.flags?.isOptional,
        type: _getType(prop.type, docs, componentName, prop.comment, enums),
        deprecation: _getDeprecation(prop),
        defaultValue: _getDefault(prop),
        description: prop.comment?.shortText || '',
      },
    };
  }, {});
  return res;
}
