'use strict';

var mongoose  = require('mongoose'),
    Bike      = mongoose.model('Bikes'),
    Owner     = mongoose.model('Owners'),
    async     = require('async'),
    allImages = [];

exports.create_a_bike = function(req, res) {

  console.log(req.body);
  var owner_id = req.body.owner;
  var newBike = new Bike(req.body);

  var throwErrors = []

  newBike.save(function(err, bike) {
    if (err) {
      console.log(err);
      var errors = err.errors
      for (var key in errors) {
        if (errors.hasOwnProperty(key)) {
          throwErrors.push(errors[key].message);
          console.log(errors[key].message);
        }
      }
      return res.status(400).json({message: throwErrors});
    }

    Owner.update(
       { "_id": owner_id},
       { "$push": { "bikes": bike._id } },
       function (err, raw) {
           if (err) return handleError(err);
           console.log('The raw response from Mongo was ', raw);
       }
    );

    res.status(201).json({bike: bike});
  });
};

exports.list_all_bikes = function(req, res) {
  console.log(req.params.id)

  var owner_id = req.params.id;

  Bike.find({owner: owner_id}, function(err, bikes){
    if (err) {
      res.status(400).json({ Errors: err.errors });
    }
    res.status(200).json({ bikes: bikes });
  });
};

exports.edit_a_bike = function(req, res) {
  console.log(req.params.id)

  var owner_id = req.params.id,
      bike_id  = req.params.bike_id;

  Bike.findOneAndUpdate({_id: bike_id , owner: owner_id}, {$set: req.body}, {new: true}, function(err, bike){
    if (err) {
      res.status(400).json({ Errors: err.errors });
    }
    res.status(200).json({ results: bike });
  });
};


exports.update_cords_to_bike = function(req, res) {

  var owner_id = req.params.id,
      bike_id  = req.params.bike_id;

  Bike.findOneAndUpdate({_id: bike_id , owner: owner_id}, {$set: req.body}, {new: true}, function(err, bike){
    if (err) { res.status(400).json({ ErrorFound: err.errors }); }
    console.log(bike);
    res.status(201).json({ cord_update: "done" });
  });
};
