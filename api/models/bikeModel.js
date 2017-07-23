'use strict';
var mongoose         = require('mongoose'),
    Schema           = mongoose.Schema;

var bikeSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Bike name cannot be blank.']
  },
  loc: {
    type: [Number],  // [<longitude>, <latitude>]
    default: [0, 0]
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Owners',
    required: [true, 'Owner cannot be blank.']
  },
  hidden: {
    type: Boolean,
    default: false
  },
  booked: {
    type: Boolean,
    default: false
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
  },
  images: [{
    image_string: {
      type: String,
      required: [true, 'Image cannot be blank.']
    },
    _type: {
      type: String,
      enum: ['COVER', 'NORMAL'],
      default: 'NORMAL'
    }
  }]
});

module.exports = mongoose.model('Bikes', bikeSchema);
