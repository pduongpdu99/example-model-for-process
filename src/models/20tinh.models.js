/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

// const { Schema } = mongoose;
// const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const tinhSchema = mongoose.Schema(
  {
    ten: {
      type: String,
      required: true,
    },
    vungMien: {
      type: Number,
      required: true,
      min: 1,
      max: 3,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
tinhSchema.plugin(toJSON);
tinhSchema.plugin(paginate);

/**
 * @typedef Tinh
 */
const Tinh = mongoose.model('Tinh', tinhSchema);

module.exports = Tinh;
