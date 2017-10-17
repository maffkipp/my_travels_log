const mongoose = require('mongoose');  //dependency does the heavier lifting to do the stuff on this page


const LocationSchema = new mongoose.Schema({
    long: Number,
    lat: Number,
    city: String,
    country: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    visitDate: Date
});



const Location = mongoose.model('Location', LocationSchema); // lets make a model a thing

module.exports = {  // lets export that model
  Location: Location
}
