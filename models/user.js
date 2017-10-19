const mongoose = require('mongoose');

const FacebookUserInfoSchema = new mongoose.Schema({
  id: String,
  access_token: String,
  firstName: String,
  lastName: String,
  email: String,
  profilePhoto: String,
  locations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }]
});

const User = mongoose.model('User', FacebookUserInfoSchema);

module.exports = {
  User: User
}
