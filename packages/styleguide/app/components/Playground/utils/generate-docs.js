/* eslint-disable no-use-before-define */

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
  }).join(', ');

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

function _getType(type, docs, componentName, comment) {
  if (type.name !== 'Array' && type?.kindString !== 'Enumeration' && parsingStack.includes(type.name)) {
    return type.name;
  }
  else {
    let mustPop = false
    if (type.name != null) {
      mustPop = true;
      parsingStack.push(type.name);
    }
    const res = __getType(type, docs, componentName, comment);
    
    if (mustPop) parsingStack.pop();
    
    return res;
  }
}

function __getType(type, docs, componentName, comment) {
  const enumTag = comment?.tags?.find((t) => t.tag === 'description');
  if (enumTag != null) {
    const match = enumTag.text.match('uses enum (?<name>[A-Z][a-z]+)');
    const enumName = match.groups.name;

    return {
      type: 'enum',
      name: enumName,
      values: type.types.filter((t) => t.name !== 'undefined').map((t) => `${enumName}.${t.name}`),
    };
  }

  else if (type.type === 'instrinsic') {
    return {
      type: type.name,
      name: type.name,
    };
  }

  else  if (type.type === 'stringLiteral') {
    return type.value;
  }

  else if (type.type ==='tuple') {
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
        type: 'shape',
        name: 'Responsive',
        values: doc.children.reduce((memo, property) => ({
          ...memo,
          [property.name]: `Partial<${componentName}Props>`,
        }), {}),
      };
    }
    else {
      return _resolveReference(type, docs, componentName);
    }
  }

  // Reflection
  else if (type.type === 'reflection') {
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

  // Union
  else if (type.type === 'union') {
    const potentialTypes = type?.types?.filter((t) => t.name !== 'undefined').map((t) => t.name);
    if (potentialTypes.includes('true') && potentialTypes.includes('false')) {
      return 'boolean';
    }
    else if (potentialTypes.length === 1) {
      // This means the only other member was undefined (optional) and we can treat this as a regular type
      return _getType(type.types.find((t) => t.name === potentialTypes[0]), docs, componentName, comment);
    }
    else {
      return {
        type: 'union',
        values: type.types.map((t) => _getType(t, docs, componentName))
      };
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
        type: _getType(prop.type, docs, componentName, prop.comment),
        deprecation: _getDeprecation(prop),
        defaultValue: _getDefault(prop),
        description:  prop.comment?.shortText || '',
      },
    };
  }, {});
  return res;
}