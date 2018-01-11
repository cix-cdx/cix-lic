#!/usr/bin/env node

const chalk = require('chalk');
const argvQuerier = require('./argvquerier');
const filesLicensing = require('./fileslicensing');
const pkgLicensing = require('./pkglicensing');

const argv = argvQuerier();

if (argv.proc.indexOf('pkg') > -1) {
  console.log(chalk.cyan('Processing : Package Licensing..'));
  pkgLicensing(argv);
} else {
  console.log(chalk.yellow('Skipped : Package Licensing..'));
}

console.log('');

if (argv.proc.indexOf('file') > -1) {
  console.log(chalk.cyan('Processing : File Licensing..'));
  filesLicensing(argv);
} else {
  console.log(chalk.yellow('Skipping : File Licensing..'));
}
