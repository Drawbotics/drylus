const { mapping } = require('@drawbotics/icons/dist/drycons');


const generatedType = Object.values(mapping).map((v) => `'${v}'`).join(' | ');


module.exports = `
type Icons = ${generatedType};
`;