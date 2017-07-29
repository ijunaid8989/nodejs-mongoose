var express    = require('express'),
    app        = express(),
    port       = process.env.PORT || 3000,
    mongoose   = require('mongoose'),
    Owner      = require('./api/models/ownerModel'),
    Bike      = require('./api/models/bikeModel'),
    bodyParser = require('body-parser');
  
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DBURL || 'mongodb://localhost/invisionapp'); 


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var ownerRoutes   = require('./api/routes/ownerRoutes')(app);
var bikeRoutes    = require('./api/routes/bikeRoutes')(app);
var defaultRoutes = require('./api/routes/defaultRoutes')(app);

app.listen(port);


console.log('RESTful API server started on: ' + port);
