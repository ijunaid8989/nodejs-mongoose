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

exports.sign_owner_in = function(req, res) {

  var email = req.body.email;
  var password = req.body.password;

  Owner.findOne({email: email}, function(err, owner) {

    if (!owner) { return res.json({message: "Please enter correct Email."});}

    owner.comparePassword(password, function(err, isMatch) {
        if(err) return next(err);

        if (isMatch) {
          return res.json({message: true});
        } else {
          return res.json({message: "Please enter correct Password."});
        }
    });
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