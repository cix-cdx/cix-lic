'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const AppEnv = require('archappenv').AppEnv;
const FilesResolver = require('../../../lib/core/files.resolver');

describe('files.resolver.js tests', () => {
  describe('#load()', () => {
    it('expect to resolve files, #1', () => {
      // arranges
      const baseDir = './test/resources/files';
      const expected = [
        AppEnv.Util.resolveFile('./test/resources/files/a.js'),
        AppEnv.Util.resolveFile('./test/resources/files/b.js'),
      ];

      // acts
      const result = FilesResolver.resolve(baseDir);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it('expect to resolve files, #2', () => {
      // arranges
      const baseDir = './test/resources/files';
      const filter = '.ts';
      const expected = [
        AppEnv.Util.resolveFile('./test/resources/files/a.ts'),
        AppEnv.Util.resolveFile('./test/resources/files/b.ts'),
      ];

      // acts
      const result = FilesResolver.resolve(baseDir, filter);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it('expect to resolve files, #3', () => {
      // arranges
      const baseDir = './test/resources/files';
      const filter = '*.ts';
      const expected = [
        AppEnv.Util.resolveFile('./test/resources/files/a.ts'),
        AppEnv.Util.resolveFile('./test/resources/files/b.ts'),
      ];

      // acts
      const result = FilesResolver.resolve(baseDir, filter);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it('expect to resolve files, #4', () => {
      // arranges
      const baseDir = './test/resources/files';
      const filter = { test: () => true };
      const expected = [
        AppEnv.Util.resolveFile('./test/resources/files/a.js'),
        AppEnv.Util.resolveFile('./test/resources/files/a.ts'),
        AppEnv.Util.resolveFile('./test/resources/files/b.js'),
        AppEnv.Util.resolveFile('./test/resources/files/b.ts'),
      ];

      // acts
      const result = FilesResolver.resolve(baseDir, filter);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it('expect to resolve files, #5', () => {
      // arranges
      const baseDir = AppEnv.Util.resolveFile('./test/resources/files');
      const filter = { test: () => true };
      const expected = [
        AppEnv.Util.resolveFile('./test/resources/files/a.js'),
        AppEnv.Util.resolveFile('./test/resources/files/a.ts'),
        AppEnv.Util.resolveFile('./test/resources/files/b.js'),
        AppEnv.Util.resolveFile('./test/resources/files/b.ts'),
      ];

      // acts
      const result = FilesResolver.resolve(baseDir, filter);

      // asserts
      expect(result).to.deep.equal(expected);
    });
  });
});
