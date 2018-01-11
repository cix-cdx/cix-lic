const AppEnv = require('archappenv').AppEnv;
const LICMap = require('../lic/licmap');

const LICProps = (v = {}) => {
  const resolveFile = (v) => {
    if (typeof v == 'string') {
      return AppEnv.Util.resolveFile(props.licFile);
    } else if (v && v.type) {
      return AppEnv.Util.resolveFilePath(v.type, v.filepath, v.base);
    } else {
      return undefined;
    }
  };

  const props = {
    baseDir: v.baseDir || v.d,
    filter: v.filter || v.f,
    lic: v.lic || v.l,
    licFile: v.licFile || v.i,
    licenseFile: v.licenseFile || v.c,
    owner: v.owner || v.o,
    beginYear: (v.beginYear || v.b || (new Date()).getFullYear()).toString(),
    endYear: (v.endYear || v.e || 'Present').toString(),
    proc: v.proc || v.p || ['pkg', 'file']
  };

  if (!props.lic || !props.owner) {
    const unknown = 'Unknown';
    const license = 'License';
    const json = AppEnv.Util.packageJSON();

    if (json) {
      const pkgjson = require(json);
      props.lic = props.lic || pkgjson.license || license;
      props.owner = props.owner ? props.owner :
        pkgjson.author && typeof pkgjson.author == 'string' ? pkgjson.author :
          pkgjson.author && pkgjson.author.name && typeof pkgjson.author.name == 'string' ? pkgjson.author.name :
            unknown;
    } else {
      props.lic = license;
      props.owner = unknown;
    }
  }

  props.baseDir = props.baseDir ? AppEnv.Util.resolvePath(props.baseDir) : AppEnv.Util.packagePath();
  props.license = LICMap(props.lic);
  props.licFile = resolveFile(props.licFile);
  props.licenseFile = resolveFile(props.licenseFile);

  if (Array.isArray(props.proc)) {
    props.proc = props.proc.map(each => each.toLowerCase());
  } else {
    props.proc = [props.proc.toLowerCase()];
  }
  return props;
};

module.exports = LICProps;
