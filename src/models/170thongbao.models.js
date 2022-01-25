const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const thongBaoSchema = mongoose.Schema(
  {
    tieuDe: { type: String, trim: true },
    noiDung: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
thongBaoSchema.plugin(toJSON);
thongBaoSchema.plugin(paginate);

/**
 * @typedef ThongBao
 */
const ThongBao = mongoose.model('ThongBao', thongBaoSchema);

module.exports = ThongBao;
