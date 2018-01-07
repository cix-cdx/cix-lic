const AppEnv = require('archappenv').AppEnv;
const licenseWriter = require('./util/licensewriter')

const pkgLicensing = (props) => licenseWriter(AppEnv.Util.resolveFile('./LICENSE'), props);

module.exports = pkgLicensing;
