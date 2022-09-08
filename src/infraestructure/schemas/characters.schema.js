const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const { Schema } = mongoose;

const CharactersSchema = Schema(
  {
    _id: {
      type: String,
      default: function genUUID() {
        return uuidv4();
      },
    },
    name: { type: String, unique: true },
    healthPoints: Number,
    image: String,
    attackStrength: Number,
    hitboxSize: [
      {
        mode: String,
        hitboxHeight: { hitboxSpanish: String, hitboxEnglish: String },
        hitboxWidth: { hitboxSpanish: String, hitboxEnglish: String },
      },
      {
        mode: String,
        hitboxHeight: { hitboxSpanish: String, hitboxEnglish: String },
        hitboxWidth: { hitboxSpanish: String, hitboxEnglish: String },
      },
      {
        mode: String,
        hitboxHeight: { hitboxSpanish: String, hitboxEnglish: String },
        hitboxWidth: { hitboxSpanish: String, hitboxEnglish: String },
      },
      {
        mode: String,
        hitboxHeight: { hitboxSpanish: String, hitboxEnglish: String },
        hitboxWidth: { hitboxSpanish: String, hitboxEnglish: String },
      },
      {
        mode: String,
        hitboxHeight: { hitboxSpanish: String, hitboxEnglish: String },
        hitboxWidth: { hitboxSpanish: String, hitboxEnglish: String },
      },
    ],
  },
  // {
  //   toJSON: {
  //     virtuals: false,
  //     versionKey: false,
  //     transform: function (doc, ret) {
  //       delete ret._id;
  //     },
  //   },
  // },
);

module.exports = mongoose.model('characters', CharactersSchema);
