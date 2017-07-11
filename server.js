var express    = require('express'),
    app        = express(),
    port       = process.env.PORT || 3000,
    mongoose   = require('mongoose'),
    Owner      = require('./api/models/ownerModel'),
    bodyParser = require('body-parser');
  
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/invisionapp'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/ownerRoutes');
routes(app);


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);
