var express = require('express')                        // Web framework
var bodyParser = require('body-parser')                 // Pulls information from HTML post
var path = require('path');                             // System path
var routes = require('./routes/main')                   // Application routes
var cronJobs = require('./cron-jobs/index')             // Kick off cron jobs
var app = express()
app.set('view engine', 'html')
app.use(bodyParser.urlencoded({'extended': 'true'}))    // parse application/x-www-form-urlencoded
app.use(bodyParser.json())                              // parse application/json
app.use(express.static(path.join(__dirname, 'public'))) // Include static assets. Not advised for production
app.use(function(req, res, next) {                      
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
    });
app.use('/reporting', routes)
app.listen(3000)
module.exports = app
