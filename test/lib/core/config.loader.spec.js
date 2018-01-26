'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const ConfigLoader = require('../../../lib/core/config.loader');

describe('config.loader.js tests', () => {
  describe('#load()', () => {
    it('expect to ', () => {
      // arranges
      const expected = {
        baseDir: './lib',
        beginYear: '2018',
      };

      // acts
      const config = ConfigLoader.load();

      // asserts
      expect(config).to.deep.equal(expected);
    });

    it('expect to ', () => {
      // arranges
      const file = './test/resources/configs/test.config.json';
      const expected = {
        a: 0,
        b: 1,
        c: 2,
      };

      // acts
      const config = ConfigLoader.load(file);

      // asserts
      expect(config).to.deep.equal(expected);
    });

    it('expect to ', () => {
      // arranges
      const file = './to/not/exist/config.json';

      // acts
      const act = () => ConfigLoader.load(file);

      // asserts
      expect(act).to.throw(Error);
    });
  });
});
