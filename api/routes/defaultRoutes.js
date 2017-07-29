'use strict';
module.exports = function(app) {
 var defaultCtrl = require('../controllers/defaultController');

  app
    .route('/')
    .get(defaultCtrl.its_working);
};