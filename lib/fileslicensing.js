const AppEnv = require('archappenv').AppEnv;
const fs = require('fs');
const filesLICWriter = require('./util/fileslicwriter');
const LICContent = require('./util/liccontent');
const resolveFiles = require('./util/resolvefiles');

const filesLicensing = (props) => {
  const filepaths = resolveFiles(props.baseDir, props.filter);
  let content;

  if (props.licFile) {
    if (fsexistsSync(props.licFile)) {
      content = fs.readFileSync(props.licFile);
    } else {
      throw new Error(`LIC FILE NOT FOUND: ${props.licFile}`);
    }
  } else {
    content = LICContent(props.license, props.owner, props.beginYear, props.endYear);
  }

  filesLICWriter(filepaths, content);
};

module.exports = filesLicensing;
