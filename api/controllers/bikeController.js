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


    // add images for bikes
    allImages = newImageParams.map( function (image) {
      // console.log(Object.assign(image, {bike: bike._id}));
      var newImage = new Image(Object.assign(image, {bike: bike._id}));
      newImage.save(function(err, image){
        console.log(image);
        return image;
        // console.log(image);
        // allImages.push(image);
        // console.log(allImages);
      });
    });

    res.json({bike: bike, images: allImages });
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
  });
};
