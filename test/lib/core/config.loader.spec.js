'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const ConfigLoader = require('../../../lib/core/config.loader');

describe('config.loader.js tests', () => {
  describe('#load()', () => {
    it('expect to load a default config', () => {
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

    it('expect to load a specified config', () => {
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

    it('expect to load a specified config with argv', () => {
      // arranges
      const file = './test/resources/configs/test.config.json';
      const argv = {
        assert: true,
        assertAll: true,
        strict: true
      };
      const expected = {
        a: 0,
        b: 1,
        c: 2,
        assert: true,
        assertAll: true,
        strict: true,
      };

      // acts
      const config = ConfigLoader.load(file, argv);

      // asserts
      expect(config).to.deep.equal(expected);
    });


    it('expect to throw an error when config not exists', () => {
      // arranges
      const file = './to/not/exist/config.json';

      // acts
      const act = () => ConfigLoader.load(file);

      // asserts
      expect(act).to.throw(Error);
    });
  });
});
