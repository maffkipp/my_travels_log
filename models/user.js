/*
For oAuth we will be using passport, passport-facebook.
This user model is ready to go to work with it.
It looks like we will need a config folder to place the config files for passport
then we'll need to config the server.js to use that config folder
and thats where our enduser crud will come from
you can use the solution folder in w05/d04 class folder
for a refresher on all of this
in the meantime I have the user model established here with a one to many to
our locations table.   there are no crud functions established to make users yet
so i'll just be rocking the crud for locations with their reference as a default for now.
- francisco feel free to delete this comment after reading.  cheers, Jesse.
*/

const mongoose = require('mongoose');

const FacebookUserInfoSchema = new mongoose.Schema({
  id: String,
  access_token: String,
  firstName: String,
  lastName: String,
  email: String,
  profilePhoto: String,
  locations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location', default: '' }]
});

// const UserSchema = new mongoose.Schema({
//   fb: FacebookUserInfoSchema
// });

const User = mongoose.model('User', FacebookUserInfoSchema);

module.exports = User;