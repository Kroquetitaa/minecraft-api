const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');

const VersionSchema = new Schema(
  {
    _id: {
      type: String,
      default: function genUUID() {
        return uuidv4();
      },

    },
    version: String,
    items: [{ type: Schema.Types.Mixed, ref: 'items' }],
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

function autopopulate(next) {
  this.populate({ path: 'items' });
  next();
}

VersionSchema.pre('find', autopopulate);

module.exports = mongoose.model('versions', VersionSchema);
