const FujiX = require('../generated/fujix').default;

const fujix = new FujiX({
  url: 'https://SLUG.fujix.io',
  apiKey: 'TOKEN',
});

function createContext() {
  return { fujix };
};

module.exports = {
  createContext,
};
