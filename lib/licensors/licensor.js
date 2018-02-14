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

const DefaultLicenseFile = AppEnv.Util.resolveFile('./LICENSE');

const Licensor = {
  process: (licenseContent, filepath, callback) => {
    filepath = filepath || DefaultLicenseFile;
    try {
      const fd = FS.openSync(filepath, 'wx');
      FS.writeSync(fd, licenseContent);
      FS.closeSync(fd);

      if (callback) {
        callback(undefined, undefined, filepath);
      } else {
        return true;
      }
    } catch (error) {
      if (error.code == 'EEXIST') {
        if (callback) {
          callback(undefined, filepath);
        } else {
          return false;
        }
      } else {
        if (callback) {
          callback(error);
        } else {
          throw error;
        }
      }
    }
  },
  assert: (filepath) => {
    filepath = filepath || DefaultLicenseFile;

    return FS.existsSync(filepath);
  },
  unlicense: (filepath, callback) => {
    filepath = filepath || DefaultLicenseFile;

    if (FS.existsSync(filepath)) {
      FS.unlinkSync(filepath);

      if (callback) {
        callback(undefined, undefined, filepath);
      } else {
        return true;
      }
    } else {
      if (callback) {
        callback(undefined, filepath);
      } else {
        return false;
      }
    }
  }
};

module.exports = Licensor;
