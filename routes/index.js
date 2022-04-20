const IdentityController = require("../app/controllers/IdentityController");
const IdentityValidations = require("../app/validations/IdentityValidations");
// const { tokenVerification } = require("../middlewares");
const VERSION = "v1";
const BASE_URL = `api/${VERSION}`;

module.exports = (app) => {
  /**
   * Identity
   */
  // app.get(`/${BASE_URL}/auth/users`, IdentityController.getUsersList);
  app.post(
    `/${BASE_URL}/auth/register`,
    [IdentityValidations.validateRegister],
    IdentityController.register
  );
  app.post(
    `/${BASE_URL}/auth/signin`,
    [IdentityValidations.validateSignin],
    IdentityController.signin
  );
};
