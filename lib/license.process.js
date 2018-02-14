/*
 *  Copyright (c) 2018 - present, Architecode Corporation. All Rights Reserved.
 *
 *  This source code is licensed under the MIT License.
 *  The LICENSE file can be found in the root directory.
 *
 *  @cix-lic
*/


const Licensor = require('./licensors/licensor');

const LicenseProcess = {
  assert: (LICProps) => Licensor.assert(LICProps.licenseFile),
  licensing: (LICProps, callback) => Licensor.process(LICProps.licenseContent, LICProps.licenseFile, callback),
  unlicensing: (LICProps, callback) => Licensor.unlicense(LICProps.licenseFile, callback),
};

module.exports = LicenseProcess;
