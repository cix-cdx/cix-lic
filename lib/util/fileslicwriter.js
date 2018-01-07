const writeLIC = require("./writelic");

const filesLICWriter = (filepaths, LICContent) => filepaths.forEach(filepath => writeLIC(filepath, LICContent));

module.exports = filesLICWriter;
