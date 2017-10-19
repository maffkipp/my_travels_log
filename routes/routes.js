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
      res.status(500).send('Internal Server Error.');
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
      var userStats={
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
  var obj = [];

  db.User.findById(userId).populate('locations').exec(function(err, user){
    return user;
    user.locations.forEach(el =>{
        obj.push(el);
    })
  });
}

/* EXPORT FUNCTIONS
********************************/
module.exports = {
  returnHomePage: returnHomePage,
  returnDashboardPage: returnDashboardPage,
  createNewLocation: createNewLocation,
  getUserLocations: getUserLocations,
  deleteUserLocation: deleteUserLocation,
  patchUserLocations: patchUserLocations,
  getStats: getStats,
  getLocation: getLocation
}
