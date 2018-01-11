const AppEnv = require('archappenv').AppEnv;
const path = require('path');
const fs = require('fs');

const configName = './cix-lic.json';

const configLoader = (file) => {
  if (file) {
    const configFile = AppEnv.Util.resolveFile(file);
    return require(configFile);
  } else {
    const pkgpath = AppEnv.Util.packagePath();
    const configFile = path.join(pkgpath, configName);

    if (fs.existsSync(configFile)) {
      return require(configFile);
    } else {
      throw new Error(`NO CONFIG FILES FOUND: ${configFile}`);
    }
  }
};

module.exports = configLoader;
module.exports.defaultConfig = 'cix-lic.json';