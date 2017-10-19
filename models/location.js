const mongoose = require('mongoose');  

const LocationSchema = new mongoose.Schema({
    long: Number,
    lat: Number,
    city: String,
    country: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    visitDate: Date
});

const Location = mongoose.model('Location', LocationSchema);
 
module.exports = {  
  Location: Location
}
