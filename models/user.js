const mongoose = require('mongoose');  //dependency does the heavier lifting to do the stuff on this page

const UserSchema = new mongoose.Schema({
    //Todo Francisco
});

const User = mongoose.model('User', UserSchema); // lets make a model a thing

module.exports = {  // lets export that model
  User: User
}
