const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const danhSachHinhAnhSchema = mongoose.Schema(
  {
    hinhAnh: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
danhSachHinhAnhSchema.plugin(toJSON);
danhSachHinhAnhSchema.plugin(paginate);

/**
 * @typedef DanhSachHinhAnh
 */
const DanhSachHinhAnh = mongoose.model('DanhSachHinhAnh', danhSachHinhAnhSchema);

module.exports = DanhSachHinhAnh;
