const URLS = {
  ANDROID_MANAGMENT: {
    ENROLLMENT_TOKENS: `https://androidmanagement.googleapis.com/v1/enterprises/${process.env.AMA_ENTERPRISE_NAME}/enrollmentTokens/`,
    DEVICES: `https://androidmanagement.googleapis.com/v1/enterprises/$S{process.env.AMA_ENTERPRISE_NAME}/devices/`,
  },
};

module.exports = URLS;
