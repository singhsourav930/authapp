const jwt = require('jsonwebtoken');
const { MESSAGES } = require('../app/configs/constants');

/**
 * Token verification
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.tokenVerification = (req, res, next) => {
  let token = req.headers['authorization'];

  if (!token) {
    return res.status(401).send({
      error: MESSAGES.ACCESS_DENIED,
    });
  }

  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);

    if (!verified && !verified.id) {
      res.status(401).send({ error: MESSAGES.ACCESS_DENIED });
    }

    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send({ error: MESSAGES.INVALID_TOKEN });
  }
};
