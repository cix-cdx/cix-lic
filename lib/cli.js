#!/usr/bin/env node

const argvQuerier = require('./argvquerier');
const filesLicensing = require('./fileslicensing');
const pkgLicensing = require('./pkglicensing');

const argv = argvQuerier();

if (argv.proc.indexOf('pkg') > -1) {
  pkgLicensing(argv);
}

if (argv.proc.indexOf('file') > -1) {
  filesLicensing(argv);
}
