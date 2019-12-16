const enumDefinitions = require('./enums');
const iconDefinitions = require('./icons');


const baseImport = `import React from 'react';`;


function generateCustomDefinitions() {
  let lines = [];
  lines.push(baseImport);
  lines.push(enumDefinitions);
  lines.push(iconDefinitions);

  return lines.join('\n');
}


module.exports = {
  generateCustomDefinitions,
};