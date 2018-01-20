// const express = require('express')

// const app = express();
// const employeeSchema = require('./model/employeeSchema')

// app.listen(3000, () => console.log('Example app listening on port 3000!'))



// app.get('/getData',(req,res,next)=>{
// //   db.collection('employee').find({}).toArray(function(err, result) {
// //     if (err) throw err;
// //     res.json(result)
// // })
// console.log('getdata')
// })

// app.post('/fileUpload',  (req, res) => {
//   var sent = true;
//   // req.body.forEach((data,index)=>{
//   //   var employee = new employeeSchema(data);
//   //     if (employee['name'] && employee['employeeId'] ){
//   //         console.log(employee,"my");
//   //         sent = true;
//   //         db.collection('employee').find({employeeId: employee['employeeId']}).toArray(function(err, result) {
//   //           if (err) throw err;
//   //           if(result.length == 0){
//   //               db.collection("employee").insert(employee, {upsert:true})
//   //           }
//   //       })
//   //     }
//   //     else {
//   //       sent= false;
//   //     }
//   // });
//   console.log('sent')
//   // res.send(sent)
// });


// // app.put('/editData',(req,res,next)=>{
// //      db.collection("employee").remove({'employeeId': req.body.obj.employeeId}, function(err, obj) {
// //     if(err) {
// //       res.send(false)
// //     }
// //     else {
// //         db.collection("employee").insert(req.body.obj)
// //         res.send(true)
// //           }
// //        });

// //   })


// // app.delete('/deleteData',(req,res,next)=>{
// //   var myquery = req.body;
// //   db.collection("employee").remove(myquery, function(err, obj) {
// //     if (err) {
// //       console.log("errorr");
// //       res.send(false)
// //       throw err;
// //     }
// //     else{
// //       res.send(true)
// //     }
// //   });
// // })

const express= require('express');
const app= express();
const mongoose = require('mongoose');
const chartSchema = require('./model/chartSchema')
const path = require('path');
var cors = require('cors');
//app.use(express.bodyParser());
const bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/static', express.static('public'))
app.use('/static', express.static(path.join(__dirname, 'public')))

const db = mongoose.connect('mongodb://127.0.0.1/userdb',(err,database)=>{
  if(err){
    console.log("Not Able to connect to Database");
  }else {
    console.log("connection to database was sucessful");
  }
})


app.get('/fileUpload', (req,res)=> res.send('Hello'));
app.post('/fileUpload', function (req, res) {
  var chart = new chartSchema(req.body);
 chart.save()
 .then(item => {
 res.send("item saved to database");
 })
 .catch(err => {
 res.status(400).send("unable to save to database");
 });

  //res.send(req.body.year + 'got')
  //res.send('Got a POST request')
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.listen(3000, ()=> console.log('at 3000'))
