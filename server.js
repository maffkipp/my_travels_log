
//DEPENDENCIES
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

//MONGOOSE CONNECTION
mongoose.connection.openUri(process.env.DB_CONN, function(err,conn){
	if(err){
		console.log('Error connecting to Mongo DB');
	}else{
		console.log('Successfully connected to Mongo DB');
	}
})
//app setup
const app = express();
const port = process.env.PORT || 3000;

//enable views with ejs engine
app.set('views', './views');
app.set('view engine', 'ejs');


//enable bodyparser for html or forms responses
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', function(req,res){
	res.render('index');
});

app.get('/dashboard', function(req,res){
  res.render('dashboard');
});


app.listen(port,function(){
	console.log(`Server listening on port ${port}`);
});
