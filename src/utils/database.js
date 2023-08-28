const mongoose = require("mongoose");

var database_connected = false;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	database_connected = true;
	console.log("MongoDB database connected!");
});

module.exports.database = db;

function run(){
	mongoose.connect('mongodb://127.0.0.1:27017/drinkshop', {useNewUrlParser: true, useUnifiedTopology: true});
}

module.exports.run = run;