const fs = require('fs');

const license = (props = {}) => {
  if (props.licensePath) {
    if (fs.existsSync(props.licensePath)) {
      return require(props.licensePath);
    } else {
      throw new Error(`LICENSE FILE NOT FOUND: ${props.licensePath}`);
    }
  } else if (props.lic) {
    const filename = `./common/${props.lic.toLowerCase()}.js`;
    try {
      return require(filename)(props);
    } catch (ex) {
      console.log(ex);
      return '';
    }
  }
};

module.exports = license;
