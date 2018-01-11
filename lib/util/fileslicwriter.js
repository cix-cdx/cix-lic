const chalk = require('chalk');
const writeLIC = require('./writelic');
const existsFileLIC = require('./existsfilelic');

const filesLICWriter = (filepaths, LICContent) => filepaths.forEach(filepath => {
  if (existsFileLIC(filepath, LICContent)) {
    console.log(chalk.yellow(`  - ${filepath} : File License already exists.`));
  } else {
    writeLIC(filepath, LICContent);
    console.log(chalk.green(`${filepath} : added the File License.`));
  }
});

module.exports = filesLICWriter;
