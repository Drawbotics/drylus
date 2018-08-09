module.exports = function bindObject(object) {
  return Object.keys(object).reduce((memo, k) => ({
    ...memo,
    [k]: typeof object[k] === 'function' ? object[k](memo) : object[k],
  }), {});
}
