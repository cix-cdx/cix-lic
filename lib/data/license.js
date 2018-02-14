/*
 *  Copyright (c) 2018 - present, Architecode Corporation. All Rights Reserved.
 *
 *  This source code is licensed under the MIT License.
 *  The LICENSE file can be found in the root directory.
 *
 *  @cix-lic
*/


const License = (LICProps) => {
  const lic = LICProps.lic;
  const file = `./licenses/${lic.toLowerCase()}.js`;

  return require(file)(LICProps);
};

module.exports = License;
