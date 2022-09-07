const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');

const GamesSchema = new Schema(
  {
    _id: {
      type: String,
      default: function genUUID() {
        return uuidv4();
      },
    },
    id: { type: Number, unique: true },
    game: String,
    price: { type: Number, min: 0, max: 100 },
    releaseData: String,
    image: String,
    titles: [String],
    description: String,
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

module.exports = mongoose.model('games', GamesSchema);
