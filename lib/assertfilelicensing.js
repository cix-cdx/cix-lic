const fs = require('fs');
const existsFileLIC = require('./util/existsfilelic');
const LICContent = require('./util/liccontent');
const resolveFiles = require('./util/resolvefiles');

const assertFilesLicensing = (props) => {
  const filepaths = resolveFiles(props.baseDir, props.filter);
  let content;

  if (props.licFile) {
    if (fs.existsSync(props.licFile)) {
      content = fs.readFileSync(props.licFile);
    } else {
      throw new Error(`LIC FILE NOT FOUND: ${props.licFile}`);
    }
  } else {
    content = LICContent(props.license, props.owner, props.beginYear, props.endYear);
  }

  for (let i = 0; i < filepaths.length; i++) {
    if (!existsFileLIC(filepaths, content)) {
      return false;
    }
  }

  return true;
};

module.exports = assertFilesLicensing;
