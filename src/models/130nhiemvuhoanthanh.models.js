const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const nhiemVuHoanThanhSchema = mongoose.Schema(
  {
    idChiTietCongViec: { type: String, trim: true },
    ten: { type: String, trim: true },
    thoiGianThucHien: { type: Date, trim: true },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
nhiemVuHoanThanhSchema.plugin(toJSON);
nhiemVuHoanThanhSchema.plugin(paginate);

/**
 * @typedef NhiemVuHoanThanh
 */
const NhiemVuHoanThanh = mongoose.model('NhiemVuHoanThanh', nhiemVuHoanThanhSchema);

module.exports = NhiemVuHoanThanh;
