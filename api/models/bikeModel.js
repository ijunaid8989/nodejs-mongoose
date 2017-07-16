'use strict';
var mongoose         = require('mongoose'),
    Schema           = mongoose.Schema;

var bikeSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Bike name cannot be blank.']
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Owners',
    required: [true, 'Owner cannot be blank.']
  },
  rent_per_day: {
    type: Number,
    required: [true, 'Rent Per Day cannot be blank.']
  },
  insurance_per_day: {
    type: Number,
    required: [true, 'Insurance Per Day cannot be blank.']
  },
  model: {
    type: String,
    required: [true, 'Model cannot be blank.']
  },
  licence_number: {
    type: String,
    required: [true, 'Licence Number cannot be blank.']
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Bikes', bikeSchema);
