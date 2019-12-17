const enumDefinitions = require('./enums');
const componentDefinitions = require('./components');
const layoutDefinitions = require('./layout');


const baseImport = `import React from 'react';`;

const customTypes = `
type OnClickCallback = (event: React.MouseEvent<React.MouseEvent>) => void;
type OnChangeCallback = (event: React.ChangeEvent) => void;
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