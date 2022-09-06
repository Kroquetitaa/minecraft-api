const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const DATAVALUE = require('../../utils/constants/DATAVALUE.js');
const { Schema } = mongoose;

const ItemSchema = new Schema({
  _id: {
    type: String,
    default: function genUUID() {
      return uuidv4();
    },
  },
  item: Number,
  minecraftIDName: {type: String, unique: true},
  minecraftID: { type: Number, unique: true },
  minecraftDataValue: { type: Number, enum: DATAVALUE },
  flamableItem: Boolean,
  rarityColor: [
    { type: Schema.Types.Mixed, ref: 'rarityColor', required: false },
  ],
  imageItem: String,
  craftingImage: String,
  nameItem: [{ type: Schema.Types.Mixed, ref: 'nameItem', required: false }],
});

module.exports = mongoose.model('items', ItemSchema);
