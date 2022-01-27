/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

// const { Schema } = mongoose;
// const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const thoiQuenCoSanSchema = mongoose.Schema(
  {
    idDanhMucDeXuat: { type: mongoose.Schema.Types.ObjectId, ref: 'DanhMucDeXuat' },
    idNguoiDung: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ten: { type: String, required: true, },
    mota: { type: String, },
    donVi: { type: mongoose.SchemaTypes.ObjectId, ref: 'NhacChuong', },
    nhiemVu: { type: Number },
    ngay: [Number],
    thoiGianNhacNhos: [String],
    loaiThoiQuen: { type: Number },
    nhiemVu: { type: Number },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
thoiQuenCoSanSchema.plugin(toJSON);
thoiQuenCoSanSchema.plugin(paginate);

/**
 * @typedef ThoiQuen
 */
const ThoiQuen = mongoose.model('ThoiQuenCoSan', thoiQuenCoSanSchema);

module.exports = ThoiQuen;
