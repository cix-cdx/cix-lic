'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const AppEnv = require('archappenv').AppEnv;
const ArgvLoader = require('../../../lib/core/argv.loader');

describe('argv.loader.js tests', () => {
  describe('#load()', () => {
    it('expect to load an empty argument values from process', () => {
      // arranges
      process.argv = ['', ''];
      const expected = {};

      // acts
      const result = ArgvLoader.load();

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it('expect to load argument values from process, #1', () => {
      // arranges
      process.argv = [
        '', '',
        '-l', 'mit',
        '-o', 'Panit Tuangsuwan',
        '-b', '2017',
        '-e', 'now',
        '-p', 'file',
        '-d', './',
        '-f', '*.ts',
        '-h', './.head',
        '-c', './.license',
      ];

      const expected = {
        lic: 'mit',
        owner: 'Panit Tuangsuwan',
        beginYear: '2017',
        endYear: 'now',
        proc: 'file',
        baseDir: './',
        filter: '*.ts',
        HFLcontent: './.head',
        licenseContent: './.license',
      };

      // acts
      const result = ArgvLoader.load();

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it('expect to load argument values from process, #2', () => {
      // arranges
      process.argv = [
        '', '',
        '--lic', 'mit',
        '--owner', 'Panit Tuangsuwan',
        '--beginYear', '2017',
        '--endYear', 'now',
        '--proc', 'file',
        '--baseDir', './',
        '--filter', '*.ts',
        '--HFLcontent', './.head',
        '--licenseContent', './.license',
        '--strict'
      ];

      const expected = {
        lic: 'mit',
        owner: 'Panit Tuangsuwan',
        beginYear: '2017',
        endYear: 'now',
        proc: 'file',
        baseDir: './',
        filter: '*.ts',
        HFLcontent: './.head',
        licenseContent: './.license',
        strict: true
      };

      // acts
      const result = ArgvLoader.load();

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it('expect to load argument values from process, #3', () => {
      // arranges
      process.argv = [
        '', '',
        '--licenseFile', './license.md',
        '--conf',
        '--strict',
        '--assert', 'all'
      ];

      const expected = {
        licenseFile: './license.md',
        conf: undefined,
        strict: true,
        assert: true,
        assertAll: true,
      };

      // acts
      const result = ArgvLoader.load();

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it('expect to load argument values from process, #3', () => {
      // arranges
      process.argv = [
        '', '',
        '--assert', 'one'
      ];

      const expected = {
        assert: true,
      };

      // acts
      const result = ArgvLoader.load();

      // asserts
      expect(result).to.deep.equal(expected);
    });
  });
});
