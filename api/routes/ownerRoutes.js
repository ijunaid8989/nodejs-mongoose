'use strict';
module.exports = function(app) {
 var ownerCtrl = require('../controllers/ownerController');

  app
    .route('/owner/signup')
    .post(ownerCtrl.create_an_owner);

  app
    .route('/owner/signin')
    .post(ownerCtrl.sign_owner_in)
};