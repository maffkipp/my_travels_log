const mongoose = require('mongoose');  //dependency does the heavier lifting to do the stuff on this page

const LocationSchema = new mongoose.Schema({
    long: String,
    lat: String,
    city: String,
    country: String,
    // todo: createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: '' },
    visitDate: Date
});

const Location = mongoose.model('Location', LocationSchema); // lets make a model a thing

module.exports = {  // lets export that model
  Location: Location
}
