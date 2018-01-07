'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const LICContent = require('../../../lib/util/liccontent');

describe('liccontent.js tests', () => {
  const format = (lic, owner, beginYear = (new Date()).getFullYear().toString(), endYear = "present") =>
    `/**
 * Copyright (c) ${beginYear} - ${endYear}, ${owner}. All Rights Reserved.
 *
 * This source code is licensed under the ${lic}.
 * The LICENSE file can be found in the root directory.
 * 
 * @cix-lic
 */

`;

  describe('#LICContent()', () => {
    it('expect to create a license content', () => {
      // arranges
      const owner = 'Test Engineer';
      const expected1 = format('mit', owner);
      const expected2 = format('apache-2.0', owner, 2011);
      const expected3 = format('ISL', owner, 2012, 2018);

      // acts
      const content1 = LICContent('mit', owner);
      const content2 = LICContent('apache-2.0', owner, 2011);
      const content3 = LICContent('ISL', owner, 2012, 2018);

      // asserts
      expect(content1).to.equal(expected1);
      expect(content2).to.equal(expected2);
      expect(content3).to.equal(expected3);
    });
  });
});
