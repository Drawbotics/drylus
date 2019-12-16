/* eslint-disable */
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  result["default"] = mod;
  return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const prettier = __importStar(require("prettier"));
const react_docgen_1 = require("react-docgen");
const { findAllExportedComponentDefinitions } = require('react-docgen/dist/resolver');
const dom = __importStar(require("react-dts-generator/bin/src/dts-dom"));
const Utils = __importStar(require("react-dts-generator/bin/src/utils"));

function generate(options) {
  let result = '';
  let baseType = 'React.Component';
  const { input, output, isBaseClass, propTypesComposition, imports } = options;
  const rawContent = fs.readFileSync(input, 'utf8');
  
  // strip out custom prop types and use defined `type` value if specified
  const content = rawContent.replace(/CustomPropTypes.mutuallyExclusive.*?(type: (.*?,)).*?}\),/gms, '$2');

  const componentInfos = react_docgen_1.parse(content, findAllExportedComponentDefinitions);
  for (const componentInfo of componentInfos) {
    const className = isBaseClass ? Utils.writeGeneric(componentInfo.displayName, 'T = any') : componentInfo.displayName;
    const importDefinitions = [];
    const interfaceDefinitions = [];

    if (componentInfo) {
      const propsIntefaceName = `${componentInfo.displayName}Props`;
      const propsDefinition = dom.create.interface(propsIntefaceName, dom.DeclarationFlags.Export);
      // const importDefinition = dom.create.importAll('React', 'react');
      const classDefinition = dom.create.class(className, dom.DeclarationFlags.ExportDefault);
      // importDefinitions.push(importDefinition);
      if (imports && imports.length > 0) {
        imports.forEach(x => {
          importDefinitions.push(Utils.createImport(x.from, x.default, x.named));
        });
      }
      if (componentInfo.props) {
        const props = componentInfo.props;
        const keys = Object.keys(props);
        if (keys.length > 0) {
          keys.forEach(key => {
            const prop = Object.assign({}, props[key], { name: key });
            if (!prop.type) {
              return;
            }
            const propResult = Utils.generateProp(prop);
            if (propResult) {
              const { property, interfaces } = propResult;
              propsDefinition.members.push(property);
              if (interfaces && interfaces.length > 0) {
                interfaceDefinitions.push(...interfaces);
              }
            }
          });
        }
        baseType = Utils.writeGeneric('React.Component', isBaseClass ? 'T' : propsIntefaceName);
        interfaceDefinitions.push(propsDefinition);
      }
      if (propTypesComposition && propTypesComposition.length > 0) {
        propsDefinition.baseTypes = [];
        propTypesComposition.forEach(x => {
          importDefinitions.push(Utils.createImport(x.from, x.default, x.named));
          propsDefinition.baseTypes.push(x.default || x.named);
        });
      }
      if (options.extends) {
        if (options.extends.import) {
          const { from, named } = options.extends.import;
          importDefinitions.push(Utils.createImport(from, options.extends.import.default, named));
          const baseTypeName = named || options.extends.import.default;
          const genericName = isBaseClass ? 'T' : propsIntefaceName;
          baseType = Utils.writeGeneric(baseTypeName, genericName);
        }
      }
      if (componentInfo.methods) {
        componentInfo.methods.forEach(method => {
          const { params, returns } = method;
          const parameters = [];
          if (params && params.length > 0) {
            params.forEach(param => {
              const type = param.type ? param.type.name : 'any';
              parameters.push(dom.create.parameter(param.name, Utils.getType(type)));
            });
          }
          const returnType = returns ? returns.type.name : 'any';
          classDefinition.members.push(dom.create.method(method.name, parameters, Utils.getType(returnType)));
        });
      }
      result += dom.emit(dom.create.imports(importDefinitions));
      interfaceDefinitions.forEach(x => result += dom.emit(x));
      classDefinition.baseType = baseType;
      result += dom.emit(classDefinition);
      if (result) {
        result = prettier.format(result, { parser: 'typescript' });
      }
    }
  }
  return result;
}
exports.generate = generate;
