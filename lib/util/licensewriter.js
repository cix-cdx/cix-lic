const fs = require('fs');
const chalk = require('chalk');
const license = require('../lic/license');

const licenseWriter = (filepath, props) => {
  try {
    const fd = fs.openSync(filepath, 'wx');
    const content = license(props);
    fs.writeSync(fd, content);
    fs.closeSync(fd);
    console.log(chalk.green('  - LICENSE file added.'));
  } catch (ex) {
    if (ex.code == 'EEXIST') {
      console.log(chalk.yellow('  - LICENSE already exists.'));
    } else {
      throw ex;
    }
  }
};

module.exports = licenseWriter;
