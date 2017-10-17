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

	const strategyObj = {
		clientID: process.env.FACEBOOK_APP_ID,
		clientSecret: process.env.FACEBOOK_APP_SECRET,
		callbackURL: 'http://localhost:3000/auth/facebook/callback',
		enableProof: true,
		profileFields: ['name','emails','photos'],
	};

	passport.use('facebook', new FacebookStrategy(strategyObj,
		function(access_token, refresh_token,profile,done){
			db.User.findOne({'fb.Id': profile.id}, function(err,user){
				if(err){
					done(err);
				}else if(user){
					done(null,user);
				}else{
					db.User.findOne({'id': profile.id}, function(err,user){
						if(user){
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
						}
					})
				}
			});
	}));
}

module.exports = setupFacebookAuthStrategy;
