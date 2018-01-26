const License = (LICProps) => {
  const lic = LICProps.lic;
  const file = `./licenses/${lic.toLowerCase()}.js`;

  return require(file)(LICProps);
};

module.exports = License;
