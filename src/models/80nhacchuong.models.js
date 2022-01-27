const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const nhacChuongSchema = mongoose.Schema(
  {
    ten: { type: String, trim: true },
    theLoai: { type: String, trim: true },
    baiNhac: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
nhacChuongSchema.plugin(toJSON);
nhacChuongSchema.plugin(paginate);

/**
 * @typedef NhacChuong
 */
const NhacChuong = mongoose.model('NhacChuong', nhacChuongSchema);

module.exports = NhacChuong;
