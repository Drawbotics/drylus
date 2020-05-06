const is = require('unist-util-is');
const nodeToString = require('hast-util-to-string');
const strip = require('strip-indent');
const { flow } = require('lodash');

function getComponentName(value) {
  const match = value.match(/^<\\?(\w+)/);
  return match && match[1];
}

function removePlaygroundTag(code) {
  return code.replace(/<Playground.*?>(.+)<\/Playground>/gms, '$1');
}

function trim(arg) {
  return arg.trim();
}

function addCodeProp(node, index) {
  const name = getComponentName(node.value);
  const tagOpen = new RegExp(`^\\<${name}`);

  if (name === 'Playground') {
    const code = flow(nodeToString, removePlaygroundTag, strip, trim)(node);

    node.value = node.value.replace(tagOpen, `<${name} __position={${index}} __code={\`${code}\`}`);
  }
}

module.exports = function rehypePlayground() {
  return (tree) => {
    // eslint-disable-next-line no-unused-vars
    const reactNodes = tree.children.filter((node) => is('jsx', node)).map(addCodeProp);
  };
};
