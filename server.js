const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./app/config/db');

var app = express();
app.use(bodyParser.urlencoded({extended:true}));
//now we are first going to connect to mongo and then start the app
MongoClient.connect(db.url,(err,database)=>{
    if(err) return console.log(err);
    var db = database.db('notes_api');
    require('./app/routes')(app,db); //by default it looks for index.js
    app.listen(8081,()=>{
        console.log("Server listening on port 8081");
    });
}) //db url is from config db

//now we are going to deal with database Mongo. Install it first
//after done with installing, lets get the request integrated with it