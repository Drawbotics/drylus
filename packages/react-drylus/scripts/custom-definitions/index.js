const enumDefinitions = require('./enums');
const componentDefinitions = require('./components');
const layoutDefinitions = require('./layout');

const baseImport = `import React from 'react';`;

const customTypes = `
type OnClickCallback = (event?: React.MouseEvent<React.MouseEvent>) => void;
type OnChangeCallback = (value: any, name?: string) => void;
`;

const customAdditionalDefinitions = `
// components/AlertsProvider
export function showAlert(args: { text: string; id?: string; category?: Category }): void;

export function hideAlert(args: { id: string }): void;

export function useAlert(): { showAlert: typeof showAlert; hideAlert: typeof hideAlert };

// components/Text - Date/Price formatting
export function formatDate(args: { date: Date, options?: any, locale?: string }): string;

interface Price {
  value: number;
  currency: string;
}

export function formatPrice(args: { price: Price, locale?: string, options?: any }): string;
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

  lines.push(customAdditionalDefinitions);

  return lines.join('\n');
}

module.exports = {
  generateCustomDefinitions,
};
