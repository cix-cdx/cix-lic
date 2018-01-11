'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const LICMap = require('../../../lib/lic/licmap');

describe('licmap.js tests', () => {
  describe('#LICMap()', () => {
    it('expect to map a license', () => {
      // arranges

      // acts
      const apache_1_0 = LICMap('apache-1.0');
      const apache_1_1 = LICMap('Apache-1.1');
      const apache_2_0 = LICMap('APACHE-2.0');
      const mit = LICMap('miT');
      const test = LICMap('Test License');
      const defaultLIC = LICMap();

      // asserts
      expect(apache_1_0).to.equal('Apache License 1.0');
      expect(apache_1_1).to.equal('Apache License 1.1');
      expect(apache_2_0).to.equal('Apache License 2.0');
      expect(mit).to.equal('MIT License');
      expect(test).to.equal('Test License');
      expect(defaultLIC).to.equal('License');
    });
  });
});
