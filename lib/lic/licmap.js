const MAP = {
  'APACHE-1.0': 'Apache License 1.0',
  'APACHE-1.1': 'Apache License 1.1',
  'APACHE-2.0': 'Apache License 2.0',
  'MIT': 'MIT License',
};

const LICMap = (lic = 'License') => MAP[lic.toUpperCase()] || lic;

module.exports = LICMap;
