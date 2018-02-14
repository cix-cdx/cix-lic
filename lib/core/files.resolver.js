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
const Path = require('path');

const DefaultFilter = /\.js$/;

const FilesResolver = {
  resolve: (baseDir, filter) => {
    const resolved = AppEnv.Util.resolvePath(baseDir);
    const subpaths = AppEnv.Util.subpathsSync(resolved);
    const Filter = FilesResolver.toFilter(filter);

    return subpaths.map(basepath =>
      FS.readdirSync(basepath)
        .map(name => ({ name, basepath }))
        .filter(each => Filter.test(each.name))
        .map(each => Path.join(each.basepath, each.name)))
      .reduce((result, each) => result.concat(each), []);
  },
  toFilter: (filter) => {
    if (typeof filter === 'string') {
      filter = filter[0] === '*' ? filter.slice(1) : filter;
      return new RegExp(`${filter}$`);
    } else if (filter && typeof filter.test === 'function') {
      return filter;
    } else {
      return DefaultFilter;
    }
  }
};

module.exports = FilesResolver;
