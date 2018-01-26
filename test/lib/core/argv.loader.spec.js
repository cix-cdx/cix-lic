'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const AppEnv = require('archappenv').AppEnv;
const ArgvLoader = require('../../../lib/core/argv.loader');

describe('argv.loader.js tests', () => {
  describe('#load()', () => {
    it('expect to ', () => {
      // arranges
      process.argv = ['', '', '-l', 'mit', '--baseDir', './'];
      const expected = {
        lic: 'mit',
        baseDir: './'
      };

      // acts
      const result = ArgvLoader.load();

      // asserts
      expect(result).to.deep.equal(expected);
    });
  });
});
