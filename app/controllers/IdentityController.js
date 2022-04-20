const IdentityModel = require('../models/IdentityModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { getCurrentDate } = require('../utils/helpers');

/**
 *  Get users list
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.getUsersList = async (req, res) => {
  try {
    const users = await IdentityModel.find();
    res.send({ data: users, status: 200 });
  } catch (err) {
    res.status(500).send({ error: err.message, status: 500 });
  }
};

/**
 *  Register
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.register = async (req, res) => {
  try {
    const user = await IdentityModel.findOne({ email: req.body.email });

    if (user) {
      return res
        .status(400)
        .send({ error: 'Email already exists.', status: 400 });
    }

    const salt = await bcrypt.genSalt(10);

    const hash_password = await bcrypt.hash(req.body.password, salt);
    const identity = new IdentityModel({
      name: req.body.name,
      email: req.body.email,
      password: hash_password,
      created_at: getCurrentDate(),
    });

    const get_user = await identity.save();

    if (get_user) {
      // get user token and data
      const user_token_and_data = await getUserTokenAndData(get_user);
      res.send({ data: user_token_and_data, status: 200 });
    }
  } catch (err) {
    res.status(500).send({ error: err.message, status: 500 });
  }
};

/**
 *  Sign in
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.signin = async (req, res) => {
  try {
    const user = await IdentityModel.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(400)
        .send({ error: 'Incorrect email or password.', status: 400 });
    }

    // compare password
    const valid_password = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!valid_password) {
      return res
        .status(400)
        .send({ error: 'Incorrect email or password.', status: 400 });
    }
    // get user token and data
    const user_token_and_data = await getUserTokenAndData(user);

    res.send({ data: user_token_and_data, status: 200 });
  } catch (err) {
    res.status(500).send({ error: err.message, status: 500 });
  }
};

/**
 *  Edit password
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.editPassword = async (req, res) => {
  try {
    const user_condition = { _id: req.user.id };
    const user = await IdentityModel.findOne(user_condition);
    if (!user) {
      res.status(400).send({ error: 'User not found', status: 400 });
      return;
    }

    // compare password
    const valid_password = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!valid_password) {
      res
        .status(400)
        .send({ error: 'Incorrect current password.', status: 400 });
      return;
    }
    const salt = await bcrypt.genSalt(10);

    const hash_password = await bcrypt.hash(req.body.new_password, salt);

    const user_fields = {
      password: hash_password,
      modified_at: getCurrentDate(),
      modified_by: req.user.id,
    };

    await IdentityModel.findOneAndUpdate(user_condition, user_fields, {
      returnOriginal: false,
    });
    res.send({ message: 'Password updated successfully', status: 200 });
  } catch (err) {
    res.status(500).send({ error: err.message, status: 500 });
  }
};

/**
 *  Get token and data
 *
 * @param {Object} user
 */
const getUserTokenAndData = async (user) => {
  // generate token
  const user_detail = {
    id: user._id,
    email: user.email,
  };
  return {
    token: jwt.sign(user_detail, process.env.SECRET_KEY, {
      algorithm: 'HS256',
      // expiresIn: 86400, // 24 hours
    }),
    user_detail,
  };
};

/**
 *  Get profile
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.getProfile = async (req, res) => {
  try {
    const user_condition = { _id: req.user.id };
    const user = await IdentityModel.findOne(user_condition);
    if (!user) {
      res.status(400).send({ error: 'User not found', status: 400 });
      return;
    }
    const user_data = {
      name: user.name,
      designation: user.designation,
      email: user.email,
      _id: user._id,
    };
    res.send({ data: user_data, status: 200 });
  } catch (err) {
    res.status(500).send({ error: err.message, status: 500 });
  }
};

/**
 *  Edit profile
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.editProfile = async (req, res) => {
  try {
    const user_condition = { _id: req.user.id };
    const is_user = await IdentityModel.findOne(user_condition);

    if (!is_user) {
      res.status(400).send({ error: 'User not found', status: 400 });
      return;
    }

    const user_fields = {
      name: req.body.name,
      designation: req.body.designation,
      modified_at: getCurrentDate(),
      modified_by: req.user.id,
    };

    const user = await IdentityModel.findOneAndUpdate(
      user_condition,
      user_fields,
      {
        returnOriginal: false,
      }
    );
    const user_data = {
      name: user.name,
      designation: user.designation,
      email: user.email,
      _id: user._id,
    };
    res.send({ data: user_data, status: 200 });
  } catch (err) {
    res.status(500).send({ error: err.message, status: 500 });
  }
};
