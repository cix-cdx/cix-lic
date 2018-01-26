'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const fs = require('fs');
const AppEnv = require('archappenv').AppEnv;
const LICPropsBuilder = require('../../lib/licprops.builder');
const FilesResolver = require('../../lib/core/files.resolver');
const LicenseMap = require('../../lib/core/license.map');

describe('licprops.builder.js tests', () => {
  describe('#buildBaseData()', () => {
    it('expect to ', () => {
      // arranges
      const expected = {
        lic: 'MIT',
        license: 'MIT License',
        owner: 'Architecode Corporation',
        beginYear: '2018',
        endYear: 'Present',
        proc: ['lic', 'file']
      };

      // acts
      const result = LICPropsBuilder.buildBaseData();

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it('expect to ', () => {
      // arranges
      const props = {
        lic: 'AOSS-1.0'
      };
      const expected = {
        lic: 'AOSS-1.0',
        license: 'AOSS-1.0',
        owner: 'Architecode Corporation',
        beginYear: '2018',
        endYear: 'Present',
        proc: ['lic', 'file']
      };

      // acts
      const result = LICPropsBuilder.buildBaseData(props);

      // asserts
      expect(result).to.deep.equal(expected);
    });
  });

  describe('#buildLicenseProcess()', () => {
    it('expect to ', () => {
      // arranges
      const base = {
        lic: 'MIT',
        license: 'MIT License',
        owner: 'Architecode Corporation',
        beginYear: '2018',
        endYear: 'Present',
        proc: ['lic', 'file']
      };
      const licenseContent = LicenseMap.resolveLicenseContent(base);
      const expected = Object.assign({ licenseContent }, base);

      // acts
      const result = LICPropsBuilder.buildLicenseProcess(base);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it('expect to ', () => {
      // arranges
      const props = { licenseContent: './test/resources/license/license.txt' };
      const base = {
        lic: 'MIT',
        license: 'MIT License',
        owner: 'Architecode Corporation',
        beginYear: '2018',
        endYear: 'Present',
        proc: ['lic', 'file']
      };
      const file = AppEnv.Util.resolveFile(props.licenseContent);
      const licenseContent = fs.readFileSync(file);
      const expected = Object.assign({ licenseContent }, base);

      // acts
      const result = LICPropsBuilder.buildLicenseProcess(base, props);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it('expect to skip a process', () => {
      // arranges
      const base = {
        lic: 'MIT',
        license: 'MIT License',
        owner: 'Architecode Corporation',
        beginYear: '2018',
        endYear: 'Present',
        proc: []
      };
      const expected = Object.assign({}, base);

      // acts
      const result = LICPropsBuilder.buildLicenseProcess(base);

      // asserts
      expect(result).to.deep.equal(expected);
    });
  });

  describe('#buildHFLProcess()', () => {
    it('expect to ', () => {
      // arranges
      const props = {};
      const base = {
        lic: 'MIT',
        license: 'MIT License',
        owner: 'Architecode Corporation',
        beginYear: '2018',
        endYear: 'Present',
        proc: ['lic', 'file']
      };
      const HFLcontent = LicenseMap.resolveHFLcontent(base);
      const HFLqueries = FilesResolver.resolve('./');
      const expected = Object.assign({ HFLcontent, HFLqueries }, base);

      // acts
      const result = LICPropsBuilder.buildHFLProcess(base, props);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it('expect to ', () => {
      // arranges
      const props = { baseDir: './lib', HFLcontent: './test/resources/license/headfile.txt' };
      const base = {
        lic: 'MIT',
        license: 'MIT License',
        owner: 'Architecode Corporation',
        beginYear: '2018',
        endYear: 'Present',
        proc: ['lic', 'file']
      };
      const file = AppEnv.Util.resolveFile(props.HFLcontent);
      const HFLcontent = fs.readFileSync(file);
      const HFLqueries = FilesResolver.resolve('./lib');
      const expected = Object.assign({ HFLcontent, HFLqueries }, base);

      // acts
      const result = LICPropsBuilder.buildHFLProcess(base, props);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it('expect to skip a process', () => {
      // arranges
      const base = {
        lic: 'MIT',
        license: 'MIT License',
        owner: 'Architecode Corporation',
        beginYear: '2018',
        endYear: 'Present',
        proc: []
      };
      const expected = Object.assign({}, base);

      // acts
      const result = LICPropsBuilder.buildHFLProcess(base);

      // asserts
      expect(result).to.deep.equal(expected);
    });
  });
});
