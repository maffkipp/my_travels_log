# MyTravels  User Story Tracksheet

## Trello Tracksheet
https://trello.com/b/pAkx1HId/mytravels-board



## MVP Features

* Users can reach a homepage and signup
* Users can reach a homepage and login
* Users can signup or login with facebook (OAuth)
* Users can view their dashboard page
* Dashboard page has a google api map 
* Users can add locations they've visited with a locations form
* Users locations display a pin on the google api map
* Users can view all locations they've added
* Users can update/delete locations they've added. 
* User can logout


Sprint 0 [Fri Oct 13 Morning] 
    Project Documentation 


Sprint 1: [Fri Oct 13th Afternoon]
    Node and all dependencies installed 
      -express, mongoose, body-parser, dotenv, passport, passport-facebook, ejs
      -Wes: heroku acct established
      -Jesse: mlab-db with user for each proj member 

      team: server.js -view handler, ejs templates / basic routes to each index page on the userdashboard. 


Sprint 2: [Weekend 13-15]
    
    Front-End
        Wes - basic layouts setup on front end, google api map


    Back-End
        Jesse - Models and Mlab db  and basic location crud routes
        Francisco - oAuth Facebook/Login basic impletmantion and user crud routes
        - Server.js file established (dependencies, appsetup, basic routes)


* Users can reach a homepage and signup
* Users can reach a homepage and login
* Users can signup or login with facebook (OAuth)
* Users can logout. 

* Users can view their dashboard page
 Dashboard page has a google api map 
* Users can add locations they've visited with a locations form

Sprint 3: [Mon Oct 16]
    reviewing what's accomplished. rescope

* Users locations display a pin on the google api map
* Users can view all locations they've added
* Users can update/delete locations they've added. 
* Returning users with session cookie auto login.

Sprint 4: [Tues Oct 17]

MVP finished by midday 12pm
Sprint 5: [Wed Oct 18]

Final Sprint: [Thurs Oct 19]


## Post MVP Wishlist

### high priority
* Wes - main.js and possibly routes.js 
   delete doesnt remove map marker
   deleting or adding a location recalls the AJAX get function that builds all tables? 
* fran - users can view a stats table that counts how many places, how many cities, how many countries.   dashboard
* deleteing ref in user db with populate.

###possible
* users can log the dates.
* users can add comments about their visit.
* photos of city displayed from api? 

###not possible w 1 day/low priority
* User can signup/login without facebook (local auth)
* Users can share their map on facebook.
* users can upload photo. 
* nearby attractions fed about that location. 
* App figures out if local auth and facebook are same user and routes either to the ssame acct
* user clicks map to have geo coordinates add a location info to the create form as values so when they click add a location, it's all ready for them or they can then click somewhere new to populate the default form values. 

