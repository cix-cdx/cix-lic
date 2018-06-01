/*
 *  Copyright (c) 2018 - present, Architecode Corporation. All Rights Reserved.
 *
 *  This source code is licensed under the MIT License.
 *  The LICENSE file can be found in the root directory.
 *
 *  @cix-lic
*/


const AppEnv = require('archappenv').AppEnv;
const FS = require('fs');

const ConfigLoader = {
  load: (file, argv = {}) => {
    const _file = file || './cix-lic.json';
    const configFile = AppEnv.Util.resolveFile(_file);
    let config;

    if (FS.existsSync(configFile)) {
      config = require(configFile);
    } else if (!file) {
      const pkgJSONFile = AppEnv.Util.packageJSON();
      const pkgJSON = require(pkgJSONFile);
      config = pkgJSON['cix-lic'];
    }

    if (config) {
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
