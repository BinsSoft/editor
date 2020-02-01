const express 		= require('express');
global.app 			= express();
const http 			= require('http').Server(global.app);
global.mongo 		= require('mongodb');
global.mongoose 	= require('mongoose');
const  cors = require('cors')

global.fs 			= require("fs");

require('dotenv').config();

global.app.use(cors());
global.systems = require('./systems');

global.app.set('port', (process.env.PORT || 3000));
http.listen(global.app.get('port'), function(){
  console.log("1) Api App Server starts");
  console.log("2) It is running with port " + global.app.get('port'));
});
