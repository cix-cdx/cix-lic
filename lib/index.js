/*
 *  Copyright (c) 2018 - present, Architecode Corporation. All Rights Reserved.
 *
 *  This source code is licensed under the MIT License.
 *  The LICENSE file can be found in the root directory.
 *
 *  @cix-lic
*/


module.exports = {
  CIXLIC: {
    HFLicenseProcess: require('./HFLicense.process'),
    LicenseProcess: require('./license.process'),
    LICPropsBuilder: require('./LICPropsBuilder'),
    Core: {
      ArgvLoader: require('./core/argv.loader'),
      ConfigLoader: require('./core/config.loader'),
      FilesResolver: require('./core/files.resolver'),
      LicenseMap: require('./core/license.map'),
    },
    Licensors: {
      HFLicensor: require('./licensors/HFLicensor'),
      Licensor: require('./licensors/licensor'),
    }
  }
};
