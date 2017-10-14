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

//TODO: Francisco





/* LOCATION CRUD ROUTE FUNCTIONS
********************************/

// //Create location
// function createNewLocation (req, res) {
//   const newLocation = db.Student({
//     long: req.body.long,
//     lat: req.body.lat,
//     city: req.body.city,
//     country: req.body.country,
//     createdBy: req.body.createdBy,
//     visitDate: req.body.visitDate
//   });

//   newLocation.save(function(err, data) {
//     if (err) {
//       console.log('Error saving location item to DB.', err);
//       res.status(500).send('Internal server error');
//     } else {
//       res.status(201).json(data);
//     }
//   });
// }

// TODO:  Get all user's locations

// TODO: Update/Put user's location record

// Todo


/* EXPORT FUNCTIONS
********************************/
module.exports = {
  returnHomePage: returnHomePage,
  returnDashboardPage: returnDashboardPage,

}
