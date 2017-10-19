# MyTravels App
MyTravels is a simple app that allows user to signup and login simply with their Facebook account and then build a list of cities they have been to in the world that also creates a google map with map markers of each for their amusement. 

### Live Demo
[View our live demo](https://my-travels-log.herokuapp.com/)



## Technologies Used

* Heroku for domain host
* MongoDB via Mlab for our NoSQL database
* Google Places API feed via JSON for building a map and displaying markers on it.
* Mongoose npm package for managing our data connection and CRUD functions/calls
* Facebook Developer App for our connection to Facebook profile and signup/login data
* Node.js and Express 4 for our base app
* Passport and Passport-Facebook for our express configuration and strategy for oAuth
* Express-Session and to manage our session cookies
* Node-Sass package to help maanage and update our SASS scss to css conversions
* Dotenv to manage our custom app data connections privately
* EJS (embedded javascript) templating package for node to manage our front end 
* JQuery for use of jquery calls on our front end



## Existing Features

*Here are our current supported features*

* Users can reach a homepage and signup / login using facebook (oAuth))
* Users can view their dashboard page
* Dashboard page has a google api map and a display of all locations they have entered
* Users can add locations they've visited with a locations form
* Users can view basic stats of the number of cities and countries they've been to. 
* Users locations display a pin on the google api map
* Users can view all locations they've added
* Users can update/delete locations they've added. 
* User can logout
* Users can delete locations they've added 
  (which also deletes the reference to that location in their user table on MongoDB) 
* Returning users with an active session cookie can auto login.



## Planned Features

*Here are user stories we would like to add if we can allocate more time to this project.*

* users can log the dates.
* users can add comments about their visit.
* photos of city displayed in list from google api call
* User can signup/login without facebook (local auth)
* Users can share their map on facebook.
* users can upload photo. 
* nearby attractions fed about that location. 
* App figures out if local auth and facebook are same user and routes either to the ssame acct
* user clicks map to have geo coordinates add a location info to the create form as values so when they click add a location, it's all ready for them or they can then click somewhere new to populate the default form values. 

---

