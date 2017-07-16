'use strict';
var mongoose         = require('mongoose'),
    Schema           = mongoose.Schema;


var imageSchema = new Schema({
  image_string: {
    type: String
  },
  bike: {
    type: Schema.ObjectId,
    ref: 'Bikes'
  },
  type: {
    type: String,
    enum: ['COVER', 'NORMAL'],
    default: 'NORMAL'
  }
});

module.exports = mongoose.model('Images', imageSchema);
