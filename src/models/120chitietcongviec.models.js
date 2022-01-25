const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const chiTietCongViecSchema = mongoose.Schema(
  {
    idDanhSachThoiQuen: { type: String, trim: true },
    tienDo: { type: Number },
    nhiemVu: { type: Number },
    tongSoNgay: { type: Number },
    soNgayLienTuc: { type: Number },
    soNgayLienTucDaiNhat: { type: Number },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
chiTietCongViecSchema.plugin(toJSON);
chiTietCongViecSchema.plugin(paginate);

/**
 * @typedef ChiTietCongViec
 */
const ChiTietCongViec = mongoose.model('ChiTietCongViec', chiTietCongViecSchema);

module.exports = ChiTietCongViec;
