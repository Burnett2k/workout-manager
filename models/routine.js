// app/models/routine.js
// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Routine', {
    name : {type : String, default: ''},
    hour : {type : Number, default: 0},
    minute : {type : Number, default: 0},
    message : {type: String, default: ''},
    dayOfWeek : [Number],
    getWeather : {type: Boolean},
    getQotd : {type: Boolean}
});