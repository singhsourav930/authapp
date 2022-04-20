const CommonModelForAll = {
  created_at: {
    type: Date,
    required: true,
  },
  created_by: {
    type: String,
    required: true,
  },
  modified_at: {
    type: Date,
  },
  modified_by: {
    type: String,
  },
  deleted_at: {
    type: Date,
  },
  deleted_by: {
    type: Number,
  },
  is_deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
};

const IdentityCommonModel = {
  ...CommonModelForAll,
  created_by: {
    type: String,
  },
};

module.exports = {
  CommonModelForAll,
  IdentityCommonModel,
};
