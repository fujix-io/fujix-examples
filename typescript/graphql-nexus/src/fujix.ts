import FujiX from '../generated/fujix';

const fujix = new FujiX({
  url: process.env.FUJIX_PROJECT_URL,
  apiKey: process.env.FUJIX_API_KEY,
});

export default fujix;
