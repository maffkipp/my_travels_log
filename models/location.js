const mongoose = require('mongoose');  //dependency does the heavier lifting to do the stuff on this page
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyBV06Rqe2o_LP8qqrSeusRqs2VSNxAFMrU'
});

const LocationSchema = new mongoose.Schema({
    long: String,
    lat: String,
    city: String,
    country: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    visitDate: Date
});

LocationSchema.methods.findLatLong = function findLatLong() {
  googleMapsClient.geocode({
    address: `${this.city} ${this.country}`
  }, (err, response) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
      this.lat = response.json.results[0].geometry.location.lat.toString();
      this.long = response.json.results[0].geometry.location.lng.toString();
    }
  });
}

const Location = mongoose.model('Location', LocationSchema); // lets make a model a thing

module.exports = {  // lets export that model
  Location: Location
}
