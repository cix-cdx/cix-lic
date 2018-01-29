const Licensor = require('./licensors/licensor');

const LicenseProcess = {
  assert: (LICProps) => Licensor.assert(LICProps.licenseFile),
  licensing: (LICProps, callback) => Licensor.process(LICProps.licenseContent, LICProps.licenseFile, callback),
  unlicensing: (LICProps, callback) => Licensor.unlicense(LICProps.licenseFile, callback),
};

module.exports = LicenseProcess;
