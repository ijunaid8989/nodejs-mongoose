'use strict';

var mongoose  = require('mongoose'),
    Bike      = mongoose.model('Bikes'),
    Image     = mongoose.model('Images'),
    allImages = [];

exports.create_a_bike = function(req, res) {

  console.log(req.body);

  var newBike = new Bike(req.body);
  // var newImages = new Image({ image_string: "Hello", });
  var newImageParams = [
    {
      image_string: "hello",
      _type: "NORMAL"
    },
    {
      image_string: "hello",
      _type: "NORMAL"
    }
  ]
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

    if (newImageParams) {
      for (var i = newImageParams.length - 1; i >= 0; i--) {
        const image = Object.assign(newImageParams[i], {bike: bike._id});
        var newImage = new Image(image);
        allImages.push(image);
        newImage.save(function(err, image){
          console.log(image);
          console.log(allImages);
        });
      }
    }

    res.json({bike: bike, images: allImages});
  });
};

function appendObjTo(thatArray, objToAppend) {
    return Object.freeze(thatArray.concat(objToAppend));
}

exports.list_all_bikes = function(req, res) {
  console.log(req.params.id)

  var owner_id = req.params.id;

  Bike.find({owner: owner_id}, function(err, bikes){
    console.log(bikes);
    res.json({ results: bikes });
  });
};

exports.edit_a_bike = function(req, res) {
  console.log(req.params.id)

  var owner_id = req.params.id,
      bike_id  = req.params.bike_id;

  Bike.findOneAndUpdate({_id: bike_id , owner: owner_id}, {$set: req.body}, {new: true}, function(err, bike){
    console.log(bike);
    res.json({ results: bike });
  });
};
