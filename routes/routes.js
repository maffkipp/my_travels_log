const db = require('../models');
const user = require('../models/user');
const location = require('../models/location');
const mongoose = require('mongoose');

/* WEB PAGE ROUTING
*********************/
function returnHomePage (req, res) {
 res.render('index');
}

function returnDashboardPage (req, res) {
  res.render('dashboard', { user: req.user });
}

//Francisco todo: On server.js add logic if user is not logged in by oAuth, call returnHomePage, else call returnDashboard

/* USER CRUD ROUTE FUNCTIONS
********************************/

//temporary to use postman and populate a user record for reference testing
function createNewUser (req,res) {
  const newUser = db.User({
    id: req.body.id,
    access_token: req.body.access_token,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    profilePhoto: req.body.profilePhoto,
    locations: req.body.locations
  });

  newUser.save(function(err,data) {
    if(err) {
      res.status(500).send('internal server error for new user.');
    } else {
      res.status(201).json(data);
    }
  });
}

//temporary get all users
function getUsers(req, res) {
  db.User.find({}, function(err, data) {
    if(err) {
      console.log('Error retrieving locations');
      res.status(500).send('Internal Server Error');
    } else {
      res.json(data);
    }
  })
}

//temporary PUT a specific user so we can add a location after user is created
function updateUser(req, res) {
  db.User.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
    res.json(data);
  });
}



/* LOCATION CRUD ROUTE FUNCTIONS
********************************/
//Create location
function createNewLocation (req, res) {
  var userid = req.params.userid;

  const newLocation = new db.Location({
    long: req.body.long,
    lat: req.body.lat,
    city: req.body.city,
    country: req.body.country,
    visitDate: req.body.visitDate
  })


  //Find the user on the database, populate its locations array
  db.User.findById(userid).populate('locations').exec(function(err,user){
    /*for each obj in locations(after populating),
    check if the city and country names match the 'new' loc
    if they do, dont add, since it already exists*/
    var exist = false; //toggle for when a city is found
    for(let el of user.locations){
        if(el.city === newLocation.city && el.country === newLocation.country){
          console.log('That city already exists!');
          var exist = true;
          break;
        }
     }

    if(!exist){//if city not found
          //add location to user, set the creator to the location
          user.locations.push(newLocation);
          newLocation.createdBy = user;
          //save user and location
          newLocation.save(function(err,data){
            if(err){
              console.log("Could not save location.");
            }else{
              console.log('Location saved!');
            }
          })
          user.save(function(err, savedUser){
            if(err){
              console.log("Could not save user.");
            }else{
              console.log("User Saved!");
            }
          });
    }
     res.render('dashboard',{user: req.user});
  });
}



// Target delete location functionality
function patchUserLocations(req, res) {
  var userIdPut = req.params.userid;
  var locationIdDelete = req.params.locationid;
  console.log('user: ' +userIdPut+ " | location: " + locationIdDelete);

  //next loop through user.locations(elements)
  db.User.findById(userIdPut, function(err, user){

    //if elements !== locationIdDelete variable then push elemet to new array
    if(err){
      console.log(err)
    } else {
      var index = user.locations.indexOf(locationIdDelete);
      user.locations.splice(index,1);
    }

    //save user data
    user.save(function(err, savedUser){
      if(err){
          console.log("Could not save user.");
      }else{
          console.log("User Saved!" + user.locations);
      }
    });
  });

}

// DELETE the actual location record from db.Location
function deleteUserLocation(req, res) {
  console.log('delete loc id requested:' + req.params.locationid);
  var locationId = req.params.locationid;
  db.Location.findOneAndRemove({_id: locationId}, function(err,data) {
    if(err){
      res.status(500).send('Internal Server Error. Totes my bad.');
    } else {
      console.log('Successful Delete');
    }
  });
}



// Get all user's locations
function getUserLocations(req, res) {
  db.Location.find({createdBy: req.params.userid}, function(err, data) {
    if(err) {
      console.log('Error retrieving locations');
      res.status(500).send('Internal Server Error');
    } else {
      res.json(data);
    }
  });
}

//get a specific location
function getLocation(req, res) {
  var locationId = req.params.locationid;
  db.Location.findOne({_id: locationId}, function(err, data) {
    if(err) {
      res.status(500).send('Internal Server Error');
    } else {
      res.json(data);
    }
  });
}
// TODO: Update/Put a user's location record

// TODO: delete a user's location record.

function getStats(req,res){
  var userId = req.params.id;
  var objStuff = getCountriesCount(userId);
  var countries,cities;

  db.User.findById(userId).populate('locations').exec(function(err,user){
    if(err){
      console.log('Could not find user.');
    }else{
      countries = [];
      cities = [];

      for(let el of user.locations){
        countries.includes(el.country) ? el : countries.push(el.country);
        cities.includes(el.city) ? el : cities.push(el.city);
      }

      var userStats ={
        cities: cities,
        countries: countries,
        cityCount: cities.length,
        countryCount: countries.length
      }
      res.json(userStats);
    }
  });
}

function getCountriesCount(userId){

  // return typeof(countries);

  var obj = [];

  db.User.findById(userId).populate('locations').exec(function(err, user){
    return user;
    user.locations.forEach(el =>{
        obj.push(el);
    })
  });
  // return obj;
}

/* EXPORT FUNCTIONS
********************************/
module.exports = {
  returnHomePage: returnHomePage,
  returnDashboardPage: returnDashboardPage,
  createNewLocation: createNewLocation,
  getUserLocations: getUserLocations,
  createNewUser: createNewUser,
  getUsers: getUsers,
  updateUser: updateUser,
  deleteUserLocation: deleteUserLocation,
  patchUserLocations: patchUserLocations,
  getStats: getStats,
  getLocation: getLocation
}
