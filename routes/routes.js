const db = require('../models');


/* WEB PAGE ROUTING
*********************/
function returnHomePage (req, res) {
 res.render('index');
}

function returnDashboardPage (req, res) {
  res.render('dashboard');
}

//Francisco todo: On server.js add logic if user is not logged in by oAuth, call returnHomePage, else call returnDashboard

/* USER CRUD ROUTE FUNCTIONS
********************************/
  //TODO: Francisco, this may be needing to run in a config folder and config file for passport-facebook.
  // I've added the following user cruds just to test connection on the db with postman
  // I'm not sure crud here is what's needed compared to crud in config folder for passport? something to consider. -Jesse
  // we do need a crud to update the users with a newly added location.
  // once we have oAuth functioning we can experiment more with linking User CRUDs. - Jesse(sat morning)

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
  const newLocation = db.Location({
    long: req.body.long,
    lat: req.body.lat,
    city: req.body.city,
    country: req.body.country,
    createdBy: req.body.createdBy,
    visitDate: req.body.visitDate
  });

  newLocation.save(function(err, data) {
    if (err) {
      console.log('Error saving location item to DB.', err);
      res.status(500).send('Internal server error');
    } else {
      res.status(201).json(data);
    }
  });
}

// Get all user's locations
// TODO Jesse: add a query string in server.js and handle getting _id of user record
// This should get all created locations related to the user.
function getUserLocations(req, res) {
  db.Location.find({}, function(err, data) {
    if(err) {
      console.log('Error retrieving locations');
      res.status(500).send('Internal Server Error');
    } else {
      res.json(data);
    }
  });
}

// TODO: Update/Put a user's location record

// TODO: delete a user's location record.


/* EXPORT FUNCTIONS
********************************/
module.exports = {
  returnHomePage: returnHomePage,
  returnDashboardPage: returnDashboardPage,
  createNewLocation: createNewLocation,
  getUserLocations: getUserLocations,
  createNewUser: createNewUser,
  getUsers: getUsers,
  updateUser: updateUser
}
