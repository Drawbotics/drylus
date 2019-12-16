const enumDefinitions = require('./enums');


const baseImport = `import React from 'react';`;


function generateCustomDefinitions() {
  let lines = [];
  lines.push(baseImport);
  lines.push(enumDefinitions);

  return lines.join('\n');
}


module.exports = {
  generateCustomDefinitions,
};