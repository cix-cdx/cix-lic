const AppEnv = require('archappenv').AppEnv;
const chalk = require('chalk');
const LICProps = require('./util/licprops');
const configLoader = require('./util/configloader');
const assertFilesLicensing = require('./assertfilelicensing');

const emptyArgv = (argv) => Object.keys(argv).length == 1;

const argvQuerier = () => {
  console.log(`\n::  ${chalk.cyan('CIX-LIC')}  ::\n`);
  let argv = AppEnv.Services.processArgv();

  if (argv.hasOwnProperty('conf')) {
    argv = configLoader(argv.conf);
    console.log(`[loaded config file: ${configLoader.defaultConfig}]`);
  }

  const props = LICProps(argv);

  if (argv.hasOwnProperty('assert')) {
    assertFilesLicensing(props, false, true);
  } else if (argv.hasOwnProperty('assert-all')) {
    assertFilesLicensing(props, true, true);
  } else {
    outLICProps(props);

    return props;
  }
};

const outLICProps = (props) => console.log(`${chalk.green('#LIC Properties')}
  lic: ${chalk.yellow(props.lic)}
  owner: ${chalk.green(props.owner)}
  beginYear: ${chalk.green(props.beginYear)}
  endYear: ${chalk.green(props.endYear)}
  baseDir: ${chalk.green(props.baseDir)}
  filter: ${props.filter ? chalk.green(props.filter) : undefined}
  licFile: ${props.licFile ? chalk.green(props.licFile) : undefined}
  licenseFile: ${props.licenseFile ? chalk.green(props.licenseFile) : undefined}
`);

module.exports = argvQuerier;
