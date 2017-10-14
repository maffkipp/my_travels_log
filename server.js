
//DEPENDENCIES
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

//MONGOOSE CONNECTION
   //Now handled by models/index.js via the routes/route.js (jesse)

//app setup
const app = express();
const port = process.env.PORT || 3000;


//enable views with ejs engine
app.set('views', './views');
app.set('view engine', 'ejs');

//enable bodyparser for html or forms responses
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//Routes and link to route CRUD functions in routes/routes.js
const appRoutes  = require('./routes/routes'); //link up routes file
app.get('/', appRoutes.returnHomePage);
app.get('/', appRoutes.returnDashboardPage);
app.post('/api/newloc', appRoutes.createNewLocation);

app.get('/', function(req,res){
	res.render('index');
});

app.get('/dashboard', function(req,res){
  res.render('dashboard');
});


app.listen(port,function(){
	console.log(`Server listening on port ${port}`);
});
