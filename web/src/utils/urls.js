const DOMAIN = process.env.REACT_APP_DOMAIN_URL;
const VERSION = "v1";

const BASE_URL = `${DOMAIN}/api/${VERSION}`;

export const URLS = {
  AUTH: {
    REGISTER: `${BASE_URL}/auth/register`,
    SIGN_IN: `${BASE_URL}/auth/signin`,
  },
};
