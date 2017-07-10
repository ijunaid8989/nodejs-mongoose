'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ownerSchema = new Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  is_owner: {
    type: Boolean,
    default: true
  },
  bank_details: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  auth_type: {
    type: String,
    default: "local"
  }
});

module.exports = mongoose.model('Owners', ownerSchema);
