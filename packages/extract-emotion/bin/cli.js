#!/usr/bin/env node

const path = require('path');
const program = require('commander');
const chalk = require('chalk');

const packageJson = require('../package.json');
const extractEmotion = require('../lib/index');

function normalizePath(dirPath, cwd) {
  // if path starts with / treat it as absolute
  if (dirPath.startsWith('/')) {
    return dirPath;
  }
  // else, prepend cwd
  else {
    return path.join(cwd, dirPath);
  }
}

async function run(program, args) {
  const inputFile = args[0];
  if (!inputFile) {
    console.error(chalk.red('No input file specified'));
    program.help();
  }
  if (!program.filename) {
    console.warn(chalk.yellow('No filename specified, fallback to styles.css'));
  }
  if (!program.prefix) {
    console.warn(chalk.yellow('No prefix specified, emotion hashes will be removed anyway'));
  }
  if (!program.output) {
    console.error(chalk.red('No output directory specified'));
    program.help();
  }
  const cwd = process.cwd();
  return await extractEmotion({
    inputFile: normalizePath(inputFile, cwd),
    output: normalizePath(program.output, cwd),
    filename: program.filename,
    prefix: program.prefix,
  });
}

async function main() {
  program
    .version(packageJson.version)
    .option(
      '-f, --filename <[name].css>',
      'Set the filename of the output file, with the .css extension included. Defaults to styles.css',
    )
    .option(
      '-p, --prefix <prefix>',
      'Set the prefix to all the CSS classes to isolate them, since emotion hashes are removed by default',
    )
    .option('-o, --output <outputDir>', 'output folder')
    .usage('<srcFile> --filename <[name].css> --output <outputDir> --prefix <prefix>')
    .action(run);
  await program.parseAsync(process.argv);
}

main();