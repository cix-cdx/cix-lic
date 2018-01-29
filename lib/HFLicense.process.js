const HFLicensor = require('./licensors/HFLicensor');

const HFLicenseProcess = {
  assert: (LICProps, callback) => HFLicensor.assert(LICProps.HFLcontent, LICProps.HFLqueries, callback, LICProps.assertAll),
  licensing: (LICProps, callback) => HFLicensor.process(LICProps.HFLcontent, LICProps.HFLqueries, callback),
  unlicensing: (LICProps, callback) => HFLicensor.unlicense(LICProps.HFLcontent, LICProps.HFLqueries, callback),
};

module.exports = HFLicenseProcess;
