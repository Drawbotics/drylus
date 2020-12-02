export function multiply(value: string, times: number) {
  const number = parseFloat(value);
  const units = value.replace(`${number}`, '');
  return `${number * times}${units}`;
}

export function divide(value: string, times: number) {
  const number = parseFloat(value);
  const units = value.replace(`${number}`, '');
  return `${number / times}${units}`;
}

export function subtract(value1: string, value2: number) {
  const number = parseFloat(value1);
  const units = value1.replace(`${number}`, '');
  return `${number - value2}${units}`;
}

export function add(value1: string, value2: number) {
  const number = parseFloat(value1);
  const units = value1.replace(`${number}`, '');
  return `${number + value2}${units}`;
}
