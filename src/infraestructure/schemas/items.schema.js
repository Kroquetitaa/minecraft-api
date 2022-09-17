const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const DATAVALUE = require('../../utils/constants/DATAVALUE.js');
const { Schema } = mongoose;

const ItemSchema = new Schema(
  {
    _id: {
      type: String,
      default: function genUUID() {
        return uuidv4();
      },
    },
    id: Number,
    item: String,
    minecraftIDName: { type: String, unique: true },
    minecraftID: { type: Number, unique: true },
    minecraftDataValue: { type: Number, enum: DATAVALUE },
    flamableItem: Boolean,
    rarityColor: { rarityColorSpanish: String, rarityColorEnglish: String },
    imageItem: String,
    nameItem: { nameItemSpanish: String, nameItemEnglish: String },
  },
    {
      toJSON: {
        virtuals: false,
        versionKey: false,
        transform: function (doc, ret) {
          delete ret._id;
        },
      },
    },
);

module.exports = mongoose.model('items', ItemSchema);
