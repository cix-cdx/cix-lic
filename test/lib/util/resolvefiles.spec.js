'use strict';

const fs = require('fs');
const path = require('path');
const AppEnv = require('archappenv').AppEnv;
const expect = require('chai').expect;
const sinon = require('sinon');
const resolveFiles = require('../../../lib/util/resolvefiles');

describe('resolvefiles.js tests', () => {
  const files = (vals, filter) =>
    vals.map(basepath =>
      fs.readdirSync(basepath)
        .map(name => ({ name, basepath }))
        .filter(each => filter.test(each.name))
        .map(each => path.join(each.basepath, each.name)))
      .reduce((result, each) => result.concat(each), []);

  describe('#resolveFiles()', () => {
    it('expect to resolve files', () => {
      // arranges
      const baseDir = AppEnv.Util.resolvePath();
      const subpaths = AppEnv.Util.subpathsSync(baseDir);
      const filter = /\.js$/;
      const expected = files(subpaths, filter);

      // acts
      const result = resolveFiles();

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it('expect to resolve files with specified baseDir', () => {
      // arranges
      const baseDir = './lib';
      const base = AppEnv.Util.resolvePath(baseDir);
      const subpaths = AppEnv.Util.subpathsSync(base);
      const filter = /\.js$/;
      const expected = files(subpaths, filter);

      // acts
      const result = resolveFiles(baseDir);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it('expect to resolve files with specified baseDir and filter', () => {
      // arranges
      const baseDir = './lib';
      const base = AppEnv.Util.resolvePath(baseDir);
      const subpaths = AppEnv.Util.subpathsSync(base);
      const filter = { test: () => true };
      const expected = files(subpaths, filter);

      // acts
      const result = resolveFiles(baseDir, filter);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it('expect to resolve files with specified baseDir and file-ext filter (*.spec.js)', () => {
      // arranges
      const base = AppEnv.Util.resolvePath();
      const subpaths = AppEnv.Util.subpathsSync(base);
      const filter = /\.spec.js$/;
      const expected = files(subpaths, filter);

      // acts
      const result = resolveFiles(undefined, '*.spec.js');

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it('expect to resolve files with specified baseDir and file-ext filter (.js)', () => {
      // arranges
      const baseDir = './lib';
      const base = AppEnv.Util.resolvePath(baseDir);
      const subpaths = AppEnv.Util.subpathsSync(base);
      const filter = /\.js$/;
      const expected = files(subpaths, filter);

      // acts
      const result = resolveFiles(baseDir, '.js');

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it('expect to resolve the regular expression', () => {
      // arranges
      const filter = new RegExp('.spec.js$');

      // acts
      const result1 = filter.test('a.spec.js');
      const result2 = filter.test('a.b.spec.js');
      const result3 = filter.test('a.spec.js.b.c');
      const result4 = filter.test('spec.js');
      const result5 = filter.test('spec.js.b');
      const result6 = filter.test('spec.js.b.c');

      // asserts
      expect(result1).to.be.true;
      expect(result2).to.be.true;
      expect(result3).to.be.false;
      expect(result4).to.be.false;
      expect(result5).to.be.false;
      expect(result6).to.be.false;
    });
  });
});
