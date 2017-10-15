//DEPENDENCIES
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();


//MONGOOSE CONNECTION
//Now handled by models/index.js via the routes/route.js (jesse)


//APP SETUP
const app = express();
const port = process.env.PORT || 3000;

//enable views with ejs engine
app.set('views', './views');
app.set('view engine', 'ejs');

//enable bodyparser for html or forms responses
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Use public directory to serve static files
app.use(express.static('public'));

// APP ROUTES
//Routes and link to route CRUD functions in routes/routes.js
const appRoutes  = require('./routes/routes'); //link up routes file
// app.get('/', appRoutes.returnHomePage); //serve up home page (should be done if no oAuth success)
// app.get('/', appRoutes.returnDashboardPage); //serve up dashboard (should be done on oAuth success)
app.post('/locations/:userid', appRoutes.createNewLocation); //creating a location to a specific user
app.get('/locations/:userid', appRoutes.getUserLocations); //getting all locations for a specific user

app.get('/', appRoutes.returnHomePage);
app.get('/dashboard', appRoutes.returnDashboardPage);

 // temporary user routes for postman relationship testing.
app.post('/users', appRoutes.createNewUser); //populate new user in account
app.get('/users', appRoutes.getUsers); //get all users
app.put('/users/:id', appRoutes.updateUser)//add location key to existing user


// RUN SERVER
app.listen(port,function(){
	console.log(`Server listening on port ${port}`);
});
