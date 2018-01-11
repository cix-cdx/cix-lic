const fs = require('fs');

const fileLICExists = (filepath, LICContent) => {
  const validated = 'cix-lic';
  const encoding = 'utf8';

  const length = LICContent.length;
  const fd = fs.openSync(filepath, 'r');
  const data = Buffer.alloc(length);
  fs.readSync(fd, data, 0, length);
  const test = data.toString(encoding);

  return test == LICContent || test.toLowerCase().indexOf(validated) > -1;
};

module.exports = fileLICExists;