'use strict';
module.exports = function(app) {
 var bikeCtrl = require('../controllers/bikeController');

  app
    .route('/owner/bikes')
    .post(bikeCtrl.create_a_bike);

  app
    .route('/owner/:id/bikes')
    .get(bikeCtrl.list_all_bikes);
};