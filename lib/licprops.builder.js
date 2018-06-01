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
const FilesResolver = require('./core/files.resolver');
const LicenseMap = require('./core/license.map');

const Defined = {
  lic: 'NoLicenses',
  owner: 'Unknown'
};

const LICPropsBuilder = {
  build: (props) => {
    let base = LICPropsBuilder.buildBaseData(props);
    base = LICPropsBuilder.buildLicenseProcess(base, props);
    base = LICPropsBuilder.buildHFLProcess(base, props);

    return base;
  },
  buildBaseData: (props = {}) => {
    const LICProps = {};

    if (props.lic && props.owner) {
      LICProps.lic = props.lic;
      LICProps.owner = props.owner;
    } else {
      const json = AppEnv.Util.packageJSON();
      const pkgjson = require(json);
      LICProps.lic = props.lic || pkgjson.license;
      LICProps.owner = props.owner ? props.owner :
        pkgjson.author && typeof pkgjson.author == 'string' ? pkgjson.author :
          pkgjson.author && pkgjson.author.name && typeof pkgjson.author.name == 'string' ? pkgjson.author.name :
            undefined;
    }

    if (!LICProps.lic || !LICProps.owner) {
      if (props.strict) {
        throw new Error('NOT DEFINED: Neither [lic] nor [owner] properties defined');
      } else {
        LICProps.lic = LICProps.lic || Defined.lic;
        LICProps.owner = LICProps.owner || Defined.owner;
      }
    }

    LICProps.beginYear = (props.beginYear || (new Date()).getFullYear()).toString();
    LICProps.endYear = (props.endYear || 'Present').toString();

    LICProps.license = LicenseMap.resolveLicense(LICProps);

    if (Array.isArray(props.proc)) {
      LICProps.proc = props.proc.map(each => each.toLowerCase());
    } else if (props.proc) {
      LICProps.proc = [props.proc.toLowerCase()];
    } else {
      LICProps.proc = ['lic', 'file'];
    }

    if (props.assert) {
      LICProps.assert = true;
    }

    if (props.assertAll) {
      LICProps.assertAll = true;
    }

    if (props.unlicense) {
      LICProps.unlicense = true;
    }

    return LICProps;
  },
  buildLicenseProcess: (base, props = {}) => {
    const result = {};

    if (base.proc.indexOf('lic') > -1) {
      if (props.licenseFile) {
        const file = AppEnv.Util.resolveFile(props.licenseFile);
        result.licenseFile = file;
      }

      if (props.licenseContent) {
        const content = AppEnv.Util.resolveFile(props.licenseContent);
        result.licenseContent = FS.readFileSync(content);
      } else {
        result.licenseContent = LicenseMap.resolveLicenseContent(base);
      }
    }

    return Object.assign(result, base);
  },
  buildHFLProcess: (base, props = {}) => {
    const result = {};

    if (base.proc.indexOf('file') > -1) {
      const baseDir = props.baseDir || './';
      result.HFLqueries = FilesResolver.resolve(baseDir, props.filter)

      if (props.HFLcontent) {
        const content = AppEnv.Util.resolveFile(props.HFLcontent);
        result.HFLcontent = FS.readFileSync(content);
      } else {
        result.HFLcontent = LicenseMap.resolveHFLcontent(base);
      }
    }

    return Object.assign(result, base);
  }
}

module.exports = LICPropsBuilder;
