/*
 *  Copyright (c) 2018 - present, Architecode Corporation. All Rights Reserved.
 *
 *  This source code is licensed under the MIT License.
 *  The LICENSE file can be found in the root directory.
 *
 *  @cix-lic
*/


const LicenseName = require('../data/common/license.name.json');
const HeadFileLicense = require('../data/headfile.license');
const License = require('../data/license');

const LicenseMap = {
  resolveLicense: (LICProps) => LicenseName[LICProps.lic.toUpperCase()] || LICProps.lic,
  resolveHFLcontent: (LICProps) => HeadFileLicense(LICProps),
  resolveLicenseContent: (LICProps) => License(LICProps),
};

module.exports = LicenseMap;
