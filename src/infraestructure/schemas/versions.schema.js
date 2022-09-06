const mongoose = require('mongoose');
const { Schema } = mongoose;

const VersionSchema = new Schema({
  version: String,
  items: [{ type: Schema.ObjectId, ref: 'items' }],
});

module.exports = mongoose.model('versions', VersionSchema);
