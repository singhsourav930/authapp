const Joi = require("joi");

/**
 * Register validation
 */
const register_schema = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
}).unknown(true);

exports.validateRegister = (req, res, next) => {
  const { error } = register_schema.validate(req.body);
  if (error) {
    res.status(400).send({ error: error.details[0].message });
    return;
  }
  next();
};

/**
 * Signin  validation
 */
const signin_schema = Joi.object({
  email: Joi.string().max(225).required().email(),
  password: Joi.string().max(1024).required(),
});

exports.validateSignin = (req, res, next) => {
  const { error } = signin_schema.validate(req.body);
  if (error) {
    res.status(400).send({ error: error.details[0].message });
    return;
  }
  next();
};
