'use strict';
var mongoose         = require('mongoose'),
    Schema           = mongoose.Schema;


var imageSchema = new Schema({
  image_string: {
    type: String
  },
  bike: {
    type: Schema.Types.ObjectId,
    ref: 'Bikes'
  },
  _type: {
    type: String,
    enum: ['COVER', 'NORMAL'],
    default: 'NORMAL'
  }
});

module.exports = mongoose.model('Images', imageSchema);
