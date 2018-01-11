const fs = require('fs');
const chalk = require('chalk');
const existsFileLIC = require('./util/existsfilelic');
const LICContent = require('./util/liccontent');
const resolveFiles = require('./util/resolvefiles');

const assertFilesLicensing = (props, all = false, assertMode = false) => {
  const filepaths = resolveFiles(props.baseDir, props.filter);
  let content;

  if (props.licFile) {
    if (fs.existsSync(props.licFile)) {
      content = fs.readFileSync(props.licFile);
    } else {
      throw new Error(`LIC FILE NOT FOUND: ${props.licFile}`);
    }
  } else {
    content = LICContent(props.license, props.owner, props.beginYear, props.endYear);
  }

  let result = true;

  if (assertMode) {
    console.log(chalk.cyan('Asserting : File Licensing..'));
  }

  for (let i = 0; i < filepaths.length; i++) {
    const file = filepaths[i];

    if (!existsFileLIC(file, content)) {
      console.log(chalk.red(`  - ${file} - missing File License..`));

      if (!all) {
        if (assertMode) {
          process.exit(1);
        } else {
          return false;
        }
      } else {
        result = false;
      }
    }
  }

  if (assertMode) {
    process.exit(0);
  } else {
    return result;
  }
};

module.exports = assertFilesLicensing;
