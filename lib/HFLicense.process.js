/*
 *  Copyright (c) 2018 - present, Architecode Corporation. All Rights Reserved.
 *
 *  This source code is licensed under the MIT License.
 *  The LICENSE file can be found in the root directory.
 *
 *  @cix-lic
*/


const HFLicensor = require('./licensors/HFLicensor');

const HFLicenseProcess = {
  assert: (LICProps, callback) => HFLicensor.assert(LICProps.HFLcontent, LICProps.HFLqueries, callback, LICProps.assertAll),
  licensing: (LICProps, callback) => HFLicensor.process(LICProps.HFLcontent, LICProps.HFLqueries, callback),
  unlicensing: (LICProps, callback) => HFLicensor.unlicense(LICProps.HFLcontent, LICProps.HFLqueries, callback),
};

module.exports = HFLicenseProcess;
