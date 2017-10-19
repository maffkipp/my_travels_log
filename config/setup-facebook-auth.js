const db = require('../models/index');
const user = require('../models/user');
const FacebookStrategy = require('passport-facebook').Strategy;

function setupFacebookAuthStrategy(passport){
	passport.serializeUser(function(user,done){
		done(null,user._id);
	});

	passport.deserializeUser(function(id,done){
		db.User.findById(id, function(err,user){
			done(err,user);
		});
	});

	console.log('Setting up Facebook auth strategy');

	//Obj sent into  passport.use, part of fb API, sets the callback and our app id's
	const strategyObj = {
		clientID: process.env.FACEBOOK_APP_ID,
		clientSecret: process.env.FACEBOOK_APP_SECRET,
		callbackURL: 'http://localhost:3000/auth/facebook/callback',
		enableProof: true,
		profileFields: ['name','emails','photos'],
	};

	/*Uses passport, finds users in our database by a
	facebook id (first findOne), then if that user exists, it finds the user by its id on
	our mongoDB database(second findOne) to avoid duplicates. If mongo user is not found, it takes
	the facebook profile info and makes new mongo user and saves it, else if user is found
	it simply continues with that user */

	passport.use('facebook', new FacebookStrategy(strategyObj,
		function(access_token, refresh_token,profile,done){
			db.User.findOne({'fb.Id': profile.id}, function(err,user){
				if(err){
					done(err);
				}else{
					db.User.findOne({'id': profile.id}, function(err,user){
						if(!user){
							const newUser = new db.User({
								id: profile.id,
								access_token: access_token,
								firstName: profile.name.givenName,
								lastName: profile.name.familyName,
								email: profile.emails[0].value,
								profilePhoto: profile.photos[0].value,
							});

							newUser.save(function(err){
								if(err){
									done(err);
								}else{
									done(null, newUser);
								}
							});
						}else if(user){
							done(null, user);
						}
					})
				}
			});
	}));
}

module.exports = setupFacebookAuthStrategy;
