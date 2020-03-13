var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const cors = require("cors");
var indexRouter = require('./server/routes/index');
const path = require('path');
var mongo = require("mongodb");


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url,{ useUnifiedTopology: true } ,function(err, db) {
  if (err) throw err;
  var dbo = db.db("chatapp");
  dbo.createCollection("chats", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
  dbo.collection('chats').insertOne({
      sender: "",
      sessionID: "",
      response_type: "",
      userID: "",
      text: "Hey! How can I help you?",
      
    })
    console.log("Record inserted!"); 
});


app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(bodyParser.json());
app.use(cors());

app.use(function (req, res, next) {        
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');    
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');      
  res.setHeader('Access-Control-Allow-Credentials', true);       
  next();  
});  

// var Schema = mongo.Schema;

// var ChatSchema = new Schema({      
// userchat: { type: String   },       
// sentiment: { type: String   },   
// },{ versionKey: false }); 
  
// var model = mongo.model('chats', ChatSchema, 'chats');

app.use( "/api",indexRouter);
app.listen(3000, () => console.log('app listening on port 3000!'));