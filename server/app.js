const express= require('express');
const app= express();
const mongoose = require('mongoose');
const chartSchema = require('./model/chartSchema')
const path = require('path');
const mongodb = require('mongodb');

var MongoClient = require('mongodb').MongoClient;

var cors = require('cors');
//


//app.use(express.bodyParser());
const bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/static', express.static('public'))
app.use('/static', express.static(path.join(__dirname, 'public')))
// var dbObject;
// var mongodb = require("mongodb");

// //MongoDB connection URL - mongodb://host:port/dbName
// var dbHost = "mongodb://localhost:27017/userdb";

// //DB Object
// var dbObject;

// //get instance of MongoClient to establish connection
// var MongoClient = mongodb.MongoClient;

// //Connecting to the Mongodb instance.
// MongoClient.connect(dbHost, function(err, db){
//   if ( err ) throw err;
//   dbObject = db;
//  // console.log(dbObject.collection('charts').find())
// });


const db = mongoose.connect('mongodb://localhost:27017/userdb',(err,database)=>{
  if(err){
    console.log("Not Able to connect to Database");
  }else {
    console.log("connection to database was sucessful");
  }
// console.log(db);
})

// var user = mongoose.model('charts', chartSchema);



// function getData(responseObj){

//  user.find({}).toArray(function(err, docs){
//     if ( err ) throw err;
//     var yearArray = [];
//     var populationArray = [];
//    // var dieselPrices = [];

//     for ( index in docs){
//       var doc = docs[index];
//       //category array
//       var year = doc['year'];
//       //series 1 values array
//       var population = doc['population'];
//       //series 2 values array
//      //var diesel = doc['diesel'];
//       yearArray.push({"label": year});
//       populationArray.push({"value" : population});
//      // dieselPrices.push({"value" : diesel});
//     }

//     var dataset = [
//       {
//         "seriesname" : "population",
//         "data" : populationArray
//       }
//       // {
//       //   "seriesname" : "Diesel Price",
//       //   "data": dieselPrices
//       // }
//     ];

//     var response = {
//       "dataset" : dataset,
//       "categories" : yearArray
//     };
//     responseObj.json(response);
//   });
// }
// var exphbs  = require('express-handlebars');

// /*Declaring Express to use Handlerbars template engine with main.handlebars as
// the default layout*/
// app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// app.set('view engine', 'handlebars');

// //Defining middleware to serve static files
// // app.use('/public', express.static('public'));
// app.get("/fuelPrices", function(req, res, next){
//   getData(res);
// });
// app.get("/", function(req, res){
//   res.render("chart");
// });
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });





//
var dbo;
MongoClient.connect("mongodb://localhost:27017/userdb", function(err, database) {
  if(err) throw err;
  else console.log('connected!!!!!!!!!!!!!!!!!!!!!!!!')

  dbo = database;

  // Start the application after the database connection is ready
  app.listen(3000);
  console.log("Listening on port 3000");
});
//

// function getData(responseObj){
//   //use the find() API and pass an empty query object to retrieve all records
//   dbo.collection('charts').find({}).toArray(function(err, docs){
//    // console.log(docs);
//     if ( err ) throw err;
//     var yearArray = [];
//     var populationArray = [];
//    // var dieselPrices = [];

//     for ( index in docs){
//       var doc = docs[index];
//       //console.log(doc['year'])
//       //category array
//       var year = doc['year'];
//       //console.log(year);
//       //series 1 values array
//       var population = doc['population'];
//      // console.log(population)
//       //series 2 values array
//      //var diesel = doc['diesel'];
//       yearArray.push(year);
//       populationArray.push(population);
//      // dieselPrices.push({"value" : diesel});
//     }


//     var dataset = [
//       {
//         "seriesname" : "population",
//         "data" : populationArray
//       }
//       // {
//       //   "seriesname" : "Diesel Price",
//       //   "data": dieselPrices
//       // }
//     ];
//     //console.log(dataset)
//     var response = {
//       "dataset" : dataset,
//       "categories" : yearArray
//     };
//     responseObj.json(response);
//    // responseObj.json(response);  
//   });
// }
var exphbs  = require('express-handlebars');

/*Declaring Express to use Handlerbars template engine with main.handlebars as
the default layout*/
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Defining middleware to serve static files
// app.use('/public', express.static('public'));
app.get("/fuelPrices", function(req, responseObj){
  //getData(res)
  dbo.collection('charts').find({}).toArray(function(err, docs){
   // console.log(docs);
    if ( err ) throw err;
    var yearArray = [];
    var populationArray = [];
   // var dieselPrices = [];

    for ( index in docs){
      var doc = docs[index];
      //console.log(doc['year'])
      //category array
      var year = doc['year'];
      //console.log(year);
      //series 1 values array
      var population = doc['population'];
     // console.log(population)
      //series 2 values array
     //var diesel = doc['diesel'];
      yearArray.push(year);
      populationArray.push(population);
     // dieselPrices.push({"value" : diesel});
    }
    console.log('inside fuell prices')


    var dataset = [
      {
        "seriesname" : "population",
        "data" : populationArray
      }
      // {
      //   "seriesname" : "Diesel Price",
      //   "data": dieselPrices
      // }
    ];
    //console.log(dataset)
    var response = {
      "dataset" : dataset,
      "categories" : yearArray
    };
    responseObj.json(response);
   // responseObj.json(response);  
  });
});

app.get("/", function(req, res){
  res.render("chart");
});
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//




//
//app.get('/fileUpload', (req,res)=> res.send('Hello'));
app.post('/fileUpload', function (req, res) {
  var chartcol = new chartSchema(req.body);
  console.log(req.body);
 chartcol.save()
 .then(item => {
 res.send("item saved to database");
 })
 .catch(err => {
 res.status(400).send("unable to save to database");
 });
 
});
app.get('/showData', function(req,res,next){
   dbo.collection('charts').find({}).toArray(function(err, docs){
   // console.log(docs);
    if ( err ) throw err;
      res.json(docs)
    })
});
app.delete('/delete', function(req,res){
  var delid= req.body
  chartSchema.remove({ _id: req.body.id }, function(err) {  
            if(err){  
                res.send(err);  
            }  
            else{    
                   res.send(true);             
               }  
        }); 
         })
app.post("/editData",function(req,res){   
 chartSchema.findByIdAndUpdate(req.body.obj.id, { 'year':  req.body.obj.year, 'population': req.body.obj.population },   
function(err) {  
  console.log(req.body)
 if (err) {  
  console.log('erorrrrrrrrrr' + err)
 res.send(err);  
 return;  
 }  
 res.send({data:"Record has been Updated..!!"});  
 console.log('edited')
 });  
 // dbo.collection("charts").remove({'_id': req.body.obj.id}, function(err, obj) {
 //  console.log(req.body.obj.id + 'is is shia')
 //    if(err) {
 //      console.log("errrrrrrrrrrrr" + err);
 //      res.send(false)
 //    }
 //    else {
 //        dbo.collection("charts").insert(req.body.obj)
 //        res.send(true)
 //          }
 //       });

})   


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// app.listen(3000, ()=> console.log('at 3000'))

// var express = require('express');
// var app     = express();
// var port    =   process.env.PORT || 3000;
// var router = express.Router();
// router.use(function(req, res, next) {

//     // log each request to the console
//     console.log(req.method, req.url);

//     // continue doing what we were doing and go to the route
//     next(); 
// });



// router.get('/', function(req, res) {
//     res.send('im the home page!');  
// });

//   app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });



// app.listen(port);
// console.log('Magic happens on port ' + port);
