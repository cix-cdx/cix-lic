/*
 *  Copyright (c) 2018 - present, Architecode Corporation. All Rights Reserved.
 *
 *  This source code is licensed under the MIT License.
 *  The LICENSE file can be found in the root directory.
 *
 *  @cix-lic
*/


module.exports = (LICProps) =>
`/*
 *  Copyright (c) ${LICProps.beginYear} - ${LICProps.endYear.toLowerCase()}, ${LICProps.owner}. All Rights Reserved.
 *
 *  This source code is licensed under the ${LICProps.license}.
 *  The LICENSE file can be found in the root directory.
 *
 *  @cix-lic
*/


`;
