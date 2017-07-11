'use strict';

var mongoose = require('mongoose'),
    Owner    = mongoose.model('Owners');

exports.create_an_owner = function(req, res) {

  console.log(req.body);

  var newOwner = new Owner(req.body);
  newOwner.save(function(err, owner) {
    console.log(req.body);
    if (err)
      res.send(err);
    res.json(owner);
  });
};

exports.delete_an_owner = function(req, res) {

  Owner.remove({
    _id: req.params.ownerId
  }, function(err, owner) {
    if (err)
      res.send(err);
    res.json({ message: 'Onwer successfully deleted' });
  });
};