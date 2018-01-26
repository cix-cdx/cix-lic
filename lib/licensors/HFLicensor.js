const FS = require('fs');

const DefaultLICbol = 'cix-lic';
const DefaultEncoding = 'utf8';
const DefaultTempExt = '.lictemp';

const HFLicensor = {
  process: (HFLcontent, filepaths, callback) => {
    filepaths.forEach(filepath => {
      if (HFLicensor.hasHFLcontent(filepath, HFLcontent)) {
        if (callback) {
          callback(undefined, filepath);
        }
      } else {
        const rfname = filepath + DefaultTempExt;
        const wfname = filepath;
        FS.renameSync(filepath, rfname);

        const rs = FS.createReadStream(rfname);
        const ws = FS.createWriteStream(wfname);

        ws.write(HFLcontent, DefaultEncoding, (error) => {
          if (error) {
            if (callback) {
              callback(error);
            } else {
              throw (error);
            }
          }

          try {
            rs.pipe(ws);
            FS.unlinkSync(rfname);

            if (callback) {
              callback(undefined, undefined, filepath);
            }
          } catch (ex) {
            ws.end();
            FS.unlinkSync(wfname);
            FS.renameSync(rfname, wfname);

            if (callback) {
              callback(ex);
            } else {
              throw ex;
            }
          }
        });
      }
    });
  },
  assert: (HFLcontent, filepaths, callback, allFiles = false) => {
    let assert = true;
    for (let i = 0; i < filepaths.length; i++) {
      const filepath = filepaths[i];

      if (!HFLicensor.hasHFLcontent(filepath, HFLcontent)) {
        assert = false;

        if (callback) {
          callback(undefined, filepath);
        }

        if (!allFiles) {
          return false;
        }
      } else {
        if (callback) {
          callback(undefined, undefined, filepath);
        }
      }
    }

    return assert;
  },
  hasHFLcontent: (filepath, HFLcontent) => {
    const length = HFLcontent.length;
    const fd = FS.openSync(filepath, 'r');
    const data = Buffer.alloc(length);
    FS.readSync(fd, data, 0, length);
    const content = data.toString(DefaultEncoding);
    FS.closeSync(fd);

    return (content === HFLcontent) || (content.toLowerCase().indexOf(DefaultLICbol) > -1);
  }
};

module.exports = HFLicensor;
