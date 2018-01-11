'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const API = () => require('../../lib/index');

describe('index.js tests', () => {
  describe('#API access', () => {
    it('expect to access API', () => {
      // arranges

      // acts
      const result = API();

      // asserts
      expect(result.argvQuerier).not.to.be.undefined;
      expect(result.assertFilesLicensing).not.to.be.undefined;
      expect(result.filesLicensing).not.to.be.undefined;
      expect(result.pkgLicensing).not.to.be.undefined;
    });
  });
});
