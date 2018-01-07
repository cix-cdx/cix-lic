const fs = require('fs');
const license = require('../lic/license');

const licenseWriter = (filepath, props) => {
  try {
    const fd = fs.openSync(filepath, 'wx');
    const content = license(props);
    fs.writeSync(fd, content);
    fs.closeSync(fd);
  } catch (ex) {
    if (ex.code == 'EEXIST') {
      console.log('LICENSE already exists.');
    } else {
      throw ex;
    }
  }
};

module.exports = licenseWriter;
