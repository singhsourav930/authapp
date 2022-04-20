const mongoose = require('mongoose');
const { IdentityCommonModel } = require('./CommonModel');

const identity_schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  name: {
    type: String,
    min: 2,
    max: 1024,
  },
  designation: {
    type: String,
    min: 2,
  },
  ...IdentityCommonModel,
});

module.exports = mongoose.model('identities', identity_schema);
