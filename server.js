
//required modules
var fs = require('fs');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


//bodyparser stuff
app.use(bodyParser.json()); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/', express.static(__dirname + '/public'));
require('./routes')(app);
exports = app;

//constants
const PORT=8080;
const settings = 'settings.json'; 

//read config. values from settings.json configuration file
var configuration = JSON.parse(
	fs.readFileSync(settings)
);

if (!configuration.mongoUrl) {
  throw new Error("You must have a database string in the Settings.json file or this app will not work!");
}

mongoose.Promise = global.Promise;
mongoose.connect(configuration.mongoUrl, { useMongoClient: true });

//misc variables
var logging = true;

app.listen(PORT);

function handleResponse(error, response, body) {
  if (!error && response.statusCode == 200 && logging) {
    console.log(body);
    return true;
  }
}
