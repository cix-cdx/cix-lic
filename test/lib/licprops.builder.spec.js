'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const fs = require('fs');
const AppEnv = require('archappenv').AppEnv;
const mock_require = require('mock-require');
const LICPropsBuilder = require('../../lib/licprops.builder');
const FilesResolver = require('../../lib/core/files.resolver');
const LicenseMap = require('../../lib/core/license.map');

describe('licprops.builder.js tests', () => {
  describe('#build()', () => {
    it('expect to build data from props', () => {
      // arranges
      const mockBase = { val: 0 };
      const props = {};
      const buildBaseDataStub = sinon.stub(LICPropsBuilder, 'buildBaseData').returns(mockBase);
      const buildLicenseProcessStub = sinon.stub(LICPropsBuilder, 'buildLicenseProcess').returns(mockBase);
      const buildHFLProcessStub = sinon.stub(LICPropsBuilder, 'buildHFLProcess').returns(mockBase);

      // acts
      const result = LICPropsBuilder.build(props);

      // asserts
      expect(result).to.deep.equal(mockBase);
      expect(buildBaseDataStub.calledWithExactly(props)).to.be.true;
      expect(buildLicenseProcessStub.calledWithExactly(mockBase, props)).to.be.true;
      expect(buildHFLProcessStub.calledWithExactly(mockBase, props)).to.be.true;

      buildBaseDataStub.restore();
      buildLicenseProcessStub.restore();
      buildHFLProcessStub.restore();
    });
  });

  describe('#buildBaseData()', () => {
    it('expect to build data from default', () => {
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

    it('expect to build data from specified license', () => {
      // arranges
      const props = {
        lic: 'AOSS-1.0',
        proc: ['lic', 'file']
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

    it('expect to build data from props, #1', () => {
      // arranges
      const props = {
        lic: 'MIT',
        owner: 'Panit Tuangsuwan',
        proc: ['lic', 'file']
      };
      const expected = {
        lic: 'MIT',
        license: 'MIT License',
        owner: 'Panit Tuangsuwan',
        beginYear: '2018',
        endYear: 'Present',
        proc: ['lic', 'file']
      };

      // acts
      const result = LICPropsBuilder.buildBaseData(props);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it('expect to build data from props, #2', () => {
      // arranges
      const json = AppEnv.Util.packageJSON();
      mock_require(json, {});
      const props = {
        assert: true,
        assertAll: true,
        proc: 'lic'
      };
      const expected = {
        lic: 'NoLicenses',
        license: 'NoLicenses',
        owner: 'Unknown',
        beginYear: '2018',
        endYear: 'Present',
        proc: ['lic'],
        assert: true,
        assertAll: true,
      };

      // acts
      const result = LICPropsBuilder.buildBaseData(props);

      // asserts
      expect(result).to.deep.equal(expected);
      mock_require.stopAll();
    });

    it('expect to build data from props, #3', () => {
      // arranges
      const json = AppEnv.Util.packageJSON();
      mock_require(json, { author: { name: 'Panit Tuangsuwan' } });
      const props = {
        lic: 'MIT',
        proc: ['lic', 'file']
      };
      const expected = {
        lic: 'MIT',
        license: 'MIT License',
        owner: 'Panit Tuangsuwan',
        beginYear: '2018',
        endYear: 'Present',
        proc: ['lic', 'file']
      };

      // acts
      const result = LICPropsBuilder.buildBaseData(props);

      // asserts
      expect(result).to.deep.equal(expected);
      mock_require.stopAll();
    });

    it('expect to build data from props, #4', () => {
      // arranges
      const json = AppEnv.Util.packageJSON();
      const props = {
        owner: 'Panit Tuangsuwan',
        proc: ['lic', 'file']
      };
      const expected = {
        lic: 'MIT',
        license: 'MIT License',
        owner: 'Panit Tuangsuwan',
        beginYear: '2018',
        endYear: 'Present',
        proc: ['lic', 'file']
      };

      // acts
      const result = LICPropsBuilder.buildBaseData(props);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it('expect to throw an error on strict mode', () => {
      // arranges
      const json = AppEnv.Util.packageJSON();
      mock_require(json, {});

      const props = {
        strict: true
      };

      // acts
      const act = () => LICPropsBuilder.buildBaseData(props);

      // asserts
      expect(act).to.throw(Error);
      mock_require.stopAll();
    });
  });

  describe('#buildLicenseProcess()', () => {
    it('expect to build license process from empty props', () => {
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

    it('expect to build license process from props, #1', () => {
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

    it('expect to build license process from props, #2', () => {
      // arranges
      const props = {
        licenseContent: './test/resources/license/license.txt',
        licenseFile: './license.md'
      };
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
      const licenseFile = AppEnv.Util.resolveFile(props.licenseFile);
      const expected = Object.assign({ licenseContent, licenseFile }, base);

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
    it('expect to build head-file license process from props, #1', () => {
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

    it('expect to build head-file license process from props, #2', () => {
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
