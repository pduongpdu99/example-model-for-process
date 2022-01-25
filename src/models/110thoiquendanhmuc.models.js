const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const thoiQuenDanhMucSchema = mongoose.Schema(
  {
    idDanhMucDeXuat: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'DanhMucDeXuat',
      required: true,
    },
    ten: { type: String, trim: true },
    mota: { type: String, trim: true },
    daTao: { type: Boolean, trim: true, default: false },
    hoanThanh: { type: Boolean, trim: true, default: false },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
thoiQuenDanhMucSchema.plugin(toJSON);
thoiQuenDanhMucSchema.plugin(paginate);

/**
 * @typedef ThoiQuenDanhMuc
 */
const ThoiQuenDanhMuc = mongoose.model('ThoiQuenDanhMuc', thoiQuenDanhMucSchema);

module.exports = ThoiQuenDanhMuc;
