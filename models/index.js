const mongoose = require('mongoose');  //need dependeny mongoose
require('dotenv').config();  //need dot env because we connect db down here

//include all model files here (and export models together below)
const userModels = require('./user');
const locationModels = require('./location');
//fix promise bug
mongoose.Promise = global.Promise;
// connect to Mongo DB   // processes from my .env failsafe db (why? just cuz..)
mongoose.connection.openUri(process.env.DB_CONN || process.env.MONGODB_URI, {}, function(err, conn) {
  if (err) {
    console.log('Error connecting to Mongo DB.', err);
  } else {
    console.log('Mongoose successfully connected to Mongo DB.');
  }
});

module.exports = {  // export this stuff so your server.js can see all the models.
  User: userModels.User,
  Location: locationModels.Location
};
