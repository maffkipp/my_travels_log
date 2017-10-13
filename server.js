
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

app.use(bodyParser.json());

app.get('/', function(req,res){
	res.send('test');
});

app.listen(port,function(){
	console.log(`Server listening on port ${port}`);
});
>>>>>>> upstream/master
