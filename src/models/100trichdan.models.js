const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const trichDanSchema = mongoose.Schema(
  {
    idNguoiDung: { type: String, trim: true },
    idDanhSachHinhAnh: { type: String, trim: true },
    hinhAnh: { type: String, trim: true },
    noiDungTrichDan: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
trichDanSchema.plugin(toJSON);
trichDanSchema.plugin(paginate);

/**
 * @typedef TrichDan
 */
const TrichDan = mongoose.model('TrichDan', trichDanSchema);

module.exports = TrichDan;
