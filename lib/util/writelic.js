const fs = require('fs');

const writeLIC = (filepath, LICContent) => {
  const rfname = filepath + '.lictmp';
  const wfname = filepath;
  fs.renameSync(filepath, rfname);

  const rs = fs.createReadStream(rfname);
  const ws = fs.createWriteStream(wfname);

  ws.write(LICContent, 'utf8', (err, res) => {
    if (err) {
      throw (err);
    }

    try {
      rs.pipe(ws);
      fs.unlinkSync(rfname);
    } catch (ex) {
      ws.end();
      fs.unlinkSync(wfname);
      fs.renameSync(rfname, wfname);
      throw ex;
    }
  });
};

module.exports = writeLIC;
