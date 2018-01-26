const AppEnv = require('archappenv').AppEnv;
const FS = require('fs');

const ConfigLoader = {
  load: (file = './cix-lic.json', argv = {}) => {
    const configFile = AppEnv.Util.resolveFile(file);

    if (FS.existsSync(configFile)) {
      const config = require(configFile);

      if (argv.assert) {
        config.assert = argv.assert;
      }

      if (argv.assertAll) {
        config.assertAll = argv.assertAll;
      }

      if (argv.strict) {
        config.strict = argv.strict;
      }

      return config;
    } else {
      throw new Error(`NO CONFIG FILES FOUND: ${configFile}`);
    }
  }
};

module.exports = ConfigLoader;
