'use strict';
module.exports = function(app) {
 var ownerCtrl = require('../controllers/ownerController');

  app
    .route('/owner/signup')
    .post(ownerCtrl.create_an_owner);
};