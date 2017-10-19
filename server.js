/**************
 MYTRAVELS APP
**************/

//DEPENDENCIES
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession  = require('express-session');
const passport = require('passport');
const facebook = require('passport-facebook');
require('dotenv').config();

//APP SETUP
const app = express();
const port = process.env.PORT || 3000;
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(expressSession({secret: 'mySecretKey2'}));

//oAuth Setup
app.use(passport.initialize());
app.use(passport.session());
require('./config/setup-facebook-auth')(passport);

//Initial Facebook render routes with oAuth
app.get('/', function(req,res){
	res.render('index', {user:req.user});
});
app.get('/auth/facebook', passport.authenticate('facebook',{scope: 'email'}));
//redirects to homepage on both failure and success, may need ammends - F
app.get('/auth/facebook/callback',
	passport.authenticate('facebook',{
		successRedirect: '/dashboard',
		failureRedirect: '/'
	})
);

app.get('/logout', function(req,res){
	req.logout();
	res.redirect('/');
})
//

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
app.post('/users/:userid/location', appRoutes.createNewLocation); //creating a location to a specific user
app.delete('/users/:userid/:locationid', appRoutes.removeUserLocation); //removing a location to a specific user
app.get('/locations/:userid', appRoutes.getUserLocations);
app.get('/locations/:locationid', appRoutes.getLocation);
app.delete('/locations/:locationid', appRoutes.deleteUserLocation);


// Basic Page Routing
app.get('/', appRoutes.returnHomePage);
app.get('/dashboard', appRoutes.returnDashboardPage);

// temporary user routes for postman relationship testing.
app.post('/users', appRoutes.createNewUser); //populate new user in account
app.get('/users', appRoutes.getUsers); //get all users
app.put('/users/:id', appRoutes.updateUser)//add location key to existing user

//FRAN EXPIRIMENTS
app.get('/users/:id/stats', appRoutes.getStats);

// RUN SERVER
app.listen(port,function(){
	console.log(`Server listening on port ${port}`);
});
