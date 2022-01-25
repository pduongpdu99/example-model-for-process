/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

// const { Schema } = mongoose;
// const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const diemTichLuySchema = mongoose.Schema(
  {
    idUser: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    diem: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
diemTichLuySchema.plugin(toJSON);
diemTichLuySchema.plugin(paginate);

/**
 * @typedef DiemTichLuy
 */
const DiemTichLuy = mongoose.model('DiemTichLuy', diemTichLuySchema);

module.exports = DiemTichLuy;
