#!/usr/bin/env node

const Chalk = require('chalk');
const ArgvLoader = require('./core/argv.loader');
const ConfigLoader = require('./core/config.loader');
const LICPropsBuilder = require('./licprops.builder');
const LicenseProcess = require('./license.process');
const HFLicenseProcess = require('./HFLicense.process');

const argv = ArgvLoader.load();
const props = argv.hasOwnProperty('conf') ? ConfigLoader.load(argv.conf, argv) : argv;
const LICProps = LICPropsBuilder.build(props);

const AssertingProcess = {
  LicenseProcess: () => {
    console.log(Chalk.cyan('# LICENSE ASSERT : Processing..'));

    if (LICProps.proc.indexOf('lic') > -1) {
      if (LicenseProcess.assert(LICProps)) {
        console.log(`\n  - Assert Result : ${Chalk.green('SUCCESS')}\n`);
      } else {
        console.log(Chalk.red('\n  - Assert Result : FAILED\n'));

        if (!LICProps.assertAll) {
          process.exit(1);
        }
      }
    } else {
      console.log(Chalk.yellow('\n  - License Assert : Skipped!\n'));
    }
  },
  HFLProcess: () => {
    console.log(Chalk.cyan('# HFLICENSE ASSERT : Processing..'));

    if (LICProps.proc.indexOf('file') > -1) {
      const handler = (error, negative, positive) => {
        if (negative) {
          console.log(Chalk.red(`    ${negative} - MISSING..`));
        } else if (positive) {
          console.log(`    ${positive} - ${Chalk.green('FOUND..')} `);
        }
      };

      if (HFLicenseProcess.assert(LICProps, handler)) {
        console.log(`\n  - Assert Result : ${Chalk.green('SUCCESS')}\n`);
      } else {
        console.log(Chalk.red('\n  - Assert Result : FAILED\n'));
      }
    } else {
      console.log(Chalk.yellow('\n  - HFLicense Assert : Skipped!\n'));
    }
  }
};

const LicensingProcess = {
  LicenseProcess: () => {
    console.log(Chalk.cyan('# LICENSING PROCESS : Processing..'));

    if (LICProps.proc.indexOf('lic') > -1) {
      if (LicenseProcess.licensing(LICProps)) {
        console.log(Chalk.green('\n    License File ADDED..\n'));
      } else {
        console.log('\n  - License File ALREADY EXIST..\n');
      }
    } else {
      console.log(Chalk.yellow('\n  - Licensing Process : Skipped!\n'));
    }
  },
  HFLProcess: () => {
    console.log(Chalk.cyan('# HFLICENSING PROCESS : Processing..'));

    if (LICProps.proc.indexOf('file') > -1) {
      const handler = (error, negative, positive) => {
        if (negative) {
          console.log(`    ${negative} - ALREADY EXIST..`);
        } else if (positive) {
          console.log(`    ${positive} - ${Chalk.green('ADDED..')} `);
        }
      };

      HFLicenseProcess.licensing(LICProps, handler);
    } else {
      console.log(Chalk.yellow('\n  - HFLicensing Process : Skipped!\n'));
    }
  }
};

const UnlicensingProcess = {
  LicenseProcess: () => {
    console.log(Chalk.cyan('# UNLICENSING PROCESS : Processing..'));

    if (LICProps.proc.indexOf('lic') > -1) {
      if (LicenseProcess.unlicensing(LICProps)) {
        console.log(Chalk.green('\n    License File REMOVED..\n'));
      } else {
        console.log('\n  - License File NOT EXIST..\n');
      }
    } else {
      console.log(Chalk.yellow('\n  - Unlicensing Process : Skipped!\n'));
    }
  },
  HFLProcess: () => {
    console.log(Chalk.cyan('# UNHFLICENSING PROCESS : Processing..'));

    if (LICProps.proc.indexOf('file') > -1) {
      const handler = (error, negative, positive) => {
        if (negative) {
          console.log(`    ${negative} - NOT EXIST..`);
        } else if (positive) {
          console.log(`    ${positive} - ${Chalk.green('REMOVED..')} `);
        }
      };

      HFLicenseProcess.unlicensing(LICProps, handler);
    } else {
      console.log(Chalk.yellow('\n  - UnHFLicensing Process : Skipped!\n'));
    }
  }
};

const outProps = (_licprops, _props) => console.log(`${Chalk.green('#LIC Properties')}
  license: ${Chalk.yellow(_licprops.license)}
  owner: ${Chalk.green(_licprops.owner)}
  beginYear: ${Chalk.green(_licprops.beginYear)}
  endYear: ${Chalk.green(_licprops.endYear)}
  baseDir: ${Chalk.green(_props.baseDir)}
`);

// ::  CLI Process  ::

console.log(`\n::  ${Chalk.cyan('CIX-LIC')}  ::\n`);
outProps(LICProps, props);

if (LICProps.assert) {
  console.log(Chalk.yellow('::  ASSERT MODE  ::\n'));

  AssertingProcess.LicenseProcess();
  console.log();
  AssertingProcess.HFLProcess();

} else if (LICProps.unlicense) {
  console.log(Chalk.yellow('::  UNLICENSE MODE  ::\n'));

  UnlicensingProcess.LicenseProcess();
  console.log();
  UnlicensingProcess.HFLProcess();

} else {
  console.log(Chalk.yellow('::  PROCESS MODE  ::\n'));

  LicensingProcess.LicenseProcess();
  console.log();
  LicensingProcess.HFLProcess();
}
