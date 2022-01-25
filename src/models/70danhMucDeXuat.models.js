/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

// const { Schema } = mongoose;
// const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const danhMucDeXuatSchema = mongoose.Schema(
  {
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
danhMucDeXuatSchema.plugin(toJSON);
danhMucDeXuatSchema.plugin(paginate);

/**
 * @typedef DanhMucDeXuat
 */
const DanhMucDeXuat = mongoose.model('DanhMucDeXuat', danhMucDeXuatSchema);

module.exports = DanhMucDeXuat;
