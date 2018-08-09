module.exports.m = function multiplication(value, times) {
  const number = parseFloat(value);
  const units = value.replace(number, '');
  return `${number * times}${units}`;
}


module.exports.d = function division(value, times) {
  const number = parseFloat(value);
  const units = value.replace(number, '');
  return `${number / times}${units}`;
}
