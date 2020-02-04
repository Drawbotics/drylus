module.exports.m = function multiplication(value, times) {
  const number = parseFloat(value);
  const units = value.replace(number, '');
  return `${number * times}${units}`;
};

module.exports.d = function division(value, times) {
  const number = parseFloat(value);
  const units = value.replace(number, '');
  return `${number / times}${units}`;
};

module.exports.s = function subtraction(value1, value2) {
  const number = parseFloat(value1);
  const units = value1.replace(number, '');
  return `${number - value2}${units}`;
};

module.exports.a = function addition(value1, value2) {
  const number = parseFloat(value1);
  const units = value1.replace(number, '');
  return `${number + value2}${units}`;
};
