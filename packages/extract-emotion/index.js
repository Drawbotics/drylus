const path = require('path');
const fs = require('fs');
const { JSDOM } = require('jsdom');
const webpack = require('webpack');
const MemoryFS = require('memory-fs');

const ExtractEmotionWatchPlugin = require('./plugin');


async function build(input, output) {
  const fs = new MemoryFS();
  const compiler = webpack({
    mode: 'development',
    entry: { bundle: input },
    output: {
      path: output,
    },
  });
  compiler.outputFileSystem = fs;

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) {
        reject();
      }
      const content = fs.readFileSync(path.resolve(output, 'bundle.js'), 'utf8');
      resolve(content);
    });
  });
}


function writeFile(file, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
}


function removeHash(css, replacement) {
  return css.replace(/(css-).*?(-)/gm, replacement ? `${replacement}-` : '');
}


function runBrowser(code) {
  const dom = new JSDOM(`
    <html>
      <head></head>
      <body>
        <script>${code}</script>
      </body>
    </html>
  `, { runScripts: 'dangerously' });
  const styles = Object.values(dom.window.document.querySelectorAll('[data-emotion]') || {}).map((element) =>
    element.sheet.cssRules.map((rules) => rules.cssText)
  );
  const stylesList = styles.reduce((memo, list) => [ ...memo, ...list.reduce((memo, rule) => [ ...memo, rule ], [])], []);
  return stylesList.join('');
}


async function extractEmotion(options) {
  const { inputFile, output, filename='styles.css', prefix } = options;
  const fileSource = await build(inputFile, output);
  const extractedCSS = runBrowser(fileSource);
  const pruned = removeHash(extractedCSS, prefix);
  if (! fs.existsSync(output)) {
    fs.mkdirSync(output);
  }
  await writeFile(path.resolve(output, filename), pruned);
  return pruned;
}


module.exports = extractEmotion;


module.exports.plugin = ExtractEmotionWatchPlugin;
