'use strict';

var mongoose = require('mongoose'),
    Bike     = mongoose.model('Bikes'),
    Image    = mongoose.model('Images');

exports.create_a_bike = function(req, res) {

  console.log(req.body);

  // validation

  var newBike = new Bike(req.body);
  var throwErrors = []

  newBike.save(function(err, bike) {
    if (err) {
      var errors = err.errors
      for (var key in errors) {
        if (errors.hasOwnProperty(key)) {
          throwErrors.push(errors[key].message);
          console.log(errors[key].message);
        }
      }
      return res.json({message: throwErrors});
    }
    res.json(bike);
  });
};
