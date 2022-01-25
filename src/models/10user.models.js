/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

// const { Schema } = mongoose;
// const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');

const userSchema = mongoose.Schema(
  {
    idPartner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    idDanhSachHinhAnh: { type: mongoose.Schema.Types.ObjectId, ref: 'DanhSachHinhAnh' },
    idTinh: { type: mongoose.Schema.Types.ObjectId, ref: 'Tinh' },
    idHuyen: { type: mongoose.Schema.Types.ObjectId, ref: 'Huyen' },
    hoTen: {
      type: String,
      required: true,
    },
    ngaySinh: {
      type: Date,
    },
    gioiTinh: {
      type: Number,
    },
    soDienThoai: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    hinhDaiDien: {
      type: String,
    },
    matKhau: {
      type: String,
      required: true,
      minLength: 8,
    },
    chieuCao: {
      type: Number,
    },
    canNang: {
      type: Number,
    },
    banBes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    hinhNen: {
      type: String,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
