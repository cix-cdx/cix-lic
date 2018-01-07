const LICMap = require('../lic/licmap');

const LICContent = (license, owner, beginYear = (new Date()).getFullYear().toString(), endYear = "present") =>
  `/**
 * Copyright (c) ${beginYear} - ${endYear.toString().toLowerCase()}, ${owner}. All Rights Reserved.
 *
 * This source code is licensed under the ${license}.
 * The LICENSE file can be found in the root directory.
 * 
 * @cix-lic
 */

`;

module.exports = LICContent;
