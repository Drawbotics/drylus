const enumDefinitions = require('./enums');
const componentDefinitions = require('./components');
const layoutDefinitions = require('./layout');


const baseImport = `import React from 'react';`;

const customTypes = `
type OnClickCallback<T> = (event: React.MouseEvent<T, React.MouseEvent>) => void;
type OnChangeCallback<T> = (event: React.ChangeEvent<T>) => void;
`;


function generateCustomDefinitions() {
  let lines = [];
  lines.push(baseImport);
  lines.push(customTypes);
  lines.push(enumDefinitions);
  
  for (const definition of Object.values(componentDefinitions)) {
    lines.push(definition);
  }

  for (const definition of Object.values(layoutDefinitions)) {
    lines.push(definition);
  }

  return lines.join('\n');
}


module.exports = {
  generateCustomDefinitions,
};