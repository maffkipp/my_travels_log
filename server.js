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

//enable views with ejs engine
app.set('views', './views');
app.set('view engine', 'ejs');

//enable bodyparser for html or forms responses
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Use public directory to serve static files
app.use(express.static('public'));

//FACEBOOK ROUTES
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

// --APP ROUTES--
//Routes and link to route CRUD functions in routes/routes.js
const appRoutes  = require('./routes/routes'); //link up routes file
app.post('/users/:userid/location', appRoutes.createNewLocation); //creating a location to a specific user
app.patch('/users/:userid/:locationid', appRoutes.patchUserLocations); //removing a location key reference to a specific user
app.delete('/users/:userid/:locationid', appRoutes.deleteUserLocation); //removing a location record to a specific user

app.get('/locations/:userid', appRoutes.getUserLocations);
app.get('/locations/:locationid', appRoutes.getLocation);
app.get('/users/:id/stats', appRoutes.getStats);
// Basic Page Routing
app.get('/', appRoutes.returnHomePage);
app.get('/dashboard', appRoutes.returnDashboardPage);


// RUN SERVER
app.listen(port,function(){
	console.log(`Server listening on port ${port}`);
});
