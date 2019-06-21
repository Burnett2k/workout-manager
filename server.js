//required modules
let fs = require("fs");
let express = require("express");
let app = express();
let mongoose = require("mongoose");
let bodyParser = require("body-parser");
let configuration;

//bodyparser stuff
app.use(bodyParser.json());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", express.static(__dirname + "/public"));
require("./routes")(app);
exports = app;

//constants
const PORT = process.env.PORT || 8080;
const settings = "settings.json";
const ERROR_TEXT =
  "You must have a database string in the settings.json file or this app will not work!";

if (fs.existsSync(settings)) {
  //read config. values from settings.json configuration file
  configuration = JSON.parse(fs.readFileSync(settings));
  if (!configuration.mongoUrl) {
    throw new Error(ERROR_TEXT);
  }
} else {
  throw new Error(ERROR_TEXT);
}

mongoose.Promise = global.Promise;
mongoose.connect(configuration.mongoUrl, { useMongoClient: true });

app.listen(PORT, function() {
  console.log(`listening on ${PORT}`);
});
