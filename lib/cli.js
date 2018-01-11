#!/usr/bin/env node

const chalk = require('chalk');
const argvQuerier = require('./argvquerier');
const filesLicensing = require('./fileslicensing');
const pkgLicensing = require('./pkglicensing');

const argv = argvQuerier();

if (argv.proc.indexOf('pkg') > -1) {
  console.log(chalk.cyan('#Package License: Processing..'));
  pkgLicensing(argv);
} else {
  console.log(chalk.yellow('#Package License: Skipped!'));
}

console.log('\n');

if (argv.proc.indexOf('file') > -1) {
  console.log(chalk.cyan('##File License: Processing..'));
  filesLicensing(argv);
} else {
  console.log(chalk.yellow('##File License: Skipped!'));
}
