/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

// const { Schema } = mongoose;
// const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const thoiQuenPartnerSchema = mongoose.Schema(
  {
    idUser: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    idThoiQuen: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'ThoiQuen',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
thoiQuenPartnerSchema.plugin(toJSON);
thoiQuenPartnerSchema.plugin(paginate);

/**
 * @typedef ThoiQuenPartner
 */
const ThoiQuenPartner = mongoose.model('ThoiQuenPartner', thoiQuenPartnerSchema);

module.exports = ThoiQuenPartner;
