// app/models/wodlog.js
// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('WodLog', {
	wodId : {type : String },
    wodName : {type : String, default: ''},
    timeCompleted: {type : Date}
});