'use strict';

//get libraries
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path')

//create express web-app
const app = express();
const router = express.Router();

//get the libraries to call
//var network = require('./network/network.js');
//var validate = require('./network/validate.js');
//var analysis = require('./network/analysis.js');

//bootstrap application settings
app.use(express.static('./public'));
app.use('/scripts', express.static(path.join(__dirname, '/public/scripts')));
app.use(bodyParser.json());

//get home page
app.get('/home', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/home.html'));
});
 
//get registerCustomer page
app.get('/registerCustomer', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/registerCustomer.html'));
});

//get registerCustomer page
app.get('/customer', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/member.html'));
});

//get banker page
app.get('/banker', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/banker.html'));
});

//get banker page
app.get('/dashboard', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/dashboard.html'));
});

//get partner page
app.get('/registerPartner', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/registerPartner.html'));
});

//declare port
var port = process.env.PORT || 8000;
if (process.env.VCAP_APPLICATION) {
  port = process.env.PORT;
}

//run app on port
app.listen(port, function() {
  console.log('app running on port: %d', port);
});
