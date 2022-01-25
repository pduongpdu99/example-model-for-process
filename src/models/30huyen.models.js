/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

// const { Schema } = mongoose;
// const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const huyenSchema = mongoose.Schema(
  {
    idTinh: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Tinh',
      required: true,
    },
    ten: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
huyenSchema.plugin(toJSON);
huyenSchema.plugin(paginate);

/**
 * @typedef Huyen
 */
const Huyen = mongoose.model('Huyen', huyenSchema);

module.exports = Huyen;
