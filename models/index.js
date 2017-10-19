const mongoose = require('mongoose');  //need dependeny mongoose
require('dotenv').config();  //need dot env because we connect db down here

const userModels = require('./user');
const locationModels = require('./location');
//fix promise bug
mongoose.Promise = global.Promise;
// connect to Mongo DB  
mongoose.connection.openUri(process.env.MONGODB_URI || process.env.DB_CONN, {}, function(err, conn) {
  if (err) {
    console.log('Error connecting to Mongo DB.', err);
  } else {
    console.log('Mongoose successfully connected to Mongo DB.');
  }
});

module.exports = {  
  User: userModels.User,
  Location: locationModels.Location
};
