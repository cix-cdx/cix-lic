const fs = require('fs');
const path = require('path');
const AppEnv = require('archappenv').AppEnv;

const defaultFilter = /\.js$/;

const resolveFiles = (baseDir, filter) => {
  const _baseDir = AppEnv.Util.resolvePath(baseDir);
  const subpaths = AppEnv.Util.subpathsSync(_baseDir);
  const regexFilter = rxfilter(filter);

  return subpaths.map(basepath =>
    fs.readdirSync(basepath)
      .map(name => ({ name, basepath }))
      .filter(each => regexFilter.test(each.name))
      .map(each => path.join(each.basepath, each.name)))
    .reduce((result, each) => result.concat(each), []);
};

const rxfilter = (filter) => {
  if (typeof filter === 'string') {
    filter = filter[0] === '*' ? filter.slice(1) : filter;
    return new RegExp(`${filter}$`);
  } else if (filter && typeof filter.test === 'function') {
    return filter;
  } else {
    return defaultFilter;
  }
};

module.exports = resolveFiles;
