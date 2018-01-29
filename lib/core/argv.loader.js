const AppEnv = require('archappenv').AppEnv;

const ArgvLoader = {
  load: () => {
    const v = AppEnv.Services.processArgv();
    const props = {};

    if (v.lic || v.l) {
      props.lic = v.lic || v.l;
    }

    if (v.owner || v.o) {
      props.owner = v.owner || v.o;
    }

    if (v.beginYear || v.b) {
      props.beginYear = v.beginYear || v.b;
    }

    if (v.endYear || v.e) {
      props.endYear = v.endYear || v.e;
    }

    if (v.proc || v.p) {
      props.proc = v.proc || v.p;
    }

    if (v.baseDir || v.d) {
      props.baseDir = v.baseDir || v.d;
    }

    if (v.filter || v.f) {
      props.filter = v.filter || v.f;
    }

    if (v.HFLcontent || v.h) {
      props.HFLcontent = v.HFLcontent || v.h;
    }

    if (v.licenseFile) {
      props.licenseFile = v.licenseFile;
    }

    if (v.licenseContent || v.c) {
      props.licenseContent = v.licenseContent || v.c;
    }

    if (v.hasOwnProperty('conf')) {
      props.conf = v.conf;
    }

    if (v.hasOwnProperty('strict')) {
      props.strict = true;
    }

    if (v.hasOwnProperty('assert')) {
      props.assert = true;

      if (v.assert != undefined && v.assert.toLowerCase() === 'all') {
        props.assertAll = true;
      }
    }

    if (v.hasOwnProperty('unlicense')) {
      props.unlicense = true;
    }

    return props;
  }
};

module.exports = ArgvLoader;
