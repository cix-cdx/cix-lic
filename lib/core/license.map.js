const LicenseName = require('../data/common/license.name.json');
const HeadFileLicense = require('../data/headfile.license');
const License = require('../data/license');

const LicenseMap = {
  resolveLicense: (LICProps) => LicenseName[LICProps.lic.toUpperCase()] || LICProps.lic,
  resolveHFLcontent: (LICProps) => HeadFileLicense(LICProps),
  resolveLicenseContent: (LICProps) => License(LICProps),
};

module.exports = LicenseMap;
