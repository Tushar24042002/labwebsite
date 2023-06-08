

const express = require("express");
const multer  = require('multer')
const path  =require("path");
const { unlink }  =require('node:fs');
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine",'ejs');

const storage = multer.diskStorage({
  destination : (req,res,cb)=>{
      cb(null,'../Assets/uploaded')
  },
  filename :(req,file,cb)=>{
      cb(null, file.fieldname + "" + Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({
  storage :storage
})



var con = require("./connection");
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/registration.html");
console.log("working");
})

app.post("/register", upload.single("logo"),function(req,res){
  console.log(req.body);
  var name = req.body.name;
  var address = req.body.address;
  var phone = req.body.phone;
  var logo = req.file.filename;
  // var logo = req.body.logo;
  var cost = req.body.cost;
  var mrp = req.body.mrp;
  var collectionType = req.body.collectionType;
  var certified = req.body.certified;
  var days = req.body.days;
  var timing = req.body.timing;

  con.connect(function(error){
    if(error){
      console.log(error);
    }
    var sql = "INSERT INTO `labs`(`name`, `address`, `phone`, `logo`, `cost`, `mrp`, `collectionType`, `certified`, `days`, `timing`) VALUES ?";
    var values =[
      [name, address,phone,logo,cost,mrp,collectionType,certified,days,timing]
    ]
        con.query(sql,[values], function(error, result){
          if(error) throw error;
          console.log(req.file, req.body);
          res.redirect('/data');
          // res.send("Regiatrsation Successfull " + result.insertId );
        })
  });

   
})

app.get("/data", function(req,res){
  con.connect(function(error){
    if(error){
      console.log(error);
    }
    var sql = "SELECT * FROM `labs`";
 
    con.query(sql,function(error, result){
      if(error) throw error;
      console.log(result);
      res.render(__dirname + "/data", {labs:result});
    })
  });
})


app.get("/editlab/:id&:files", function(req,res){
  const {id} = req.params;
  console.log(id);
  con.connect(function(error){
    if(error){
      console.log(error);
    }
    var sql = "SELECT * FROM `labs` WHERE id = ?";
 
    con.query(sql,[id],function(error, result){
      if(error) throw error;
      console.log(result);
      res.render(__dirname + "/edit", {labs:result});
    })
  });
})

app.post('/editlab/:id&:files', upload.single("logo"), function(req, res, next) {
  var id= req.params.id;
  var files= req.params.files;

  if(req.file){
    var updateData = {
       name : req.body.name,
       address : req.body.address,
       phone : req.body.phone,
       logo : req.file.filename,
       cost : req.body.cost,
       mrp : req.body.mrp,
       collectionType : req.body.collectionType,
       certified : req.body.certified,
       days : req.body.days,
       timing : req.body.timing
    }
    unlink(`../Assets/uploaded/${files}`, (err) => {
        if (err) throw err;
        console.log('path/file.txt was deleted');
      });
   }
  else{
    var updateData = {
      name : req.body.name,
      address : req.body.address,
      phone : req.body.phone,
      cost : req.body.cost,
      mrp : req.body.mrp,
      collectionType : req.body.collectionType,
      certified : req.body.certified,
      days : req.body.days,
      timing : req.body.timing
   }
  }
    // var updateData=req.body;
    // console.log(updateData);
    con.connect(function(error){
      if(error){
        console.log(error);
      }
      var sql = `UPDATE labs SET ? WHERE id= ?`;
      con.query(sql, [updateData, id], function (err, data) {
      if (err) throw err;
      console.log(data.affectedRows + " record(s) updated");
    });
    })

   
  res.redirect('/data');
});





app.get('/deletelab/:id&:files', function(req, res, next) {
  const {id,files} = req.params;
  console.log(files);
    // var updateData=req.body;
    con.connect(function(error){
      if(error){
        console.log(error);
      }
      unlink(`../Assets/uploaded/${files}`, (err) => {
        if (err) throw err;
        console.log('path/file.txt was deleted');
      });
      var sql = "DELETE FROM `labs` WHERE id = ?";
      con.query(sql, id, function (err, data) {
      if (err) throw err;
      console.log(data.affectedRows + " record(s) updated");
    })
    })

   
  res.redirect('/data');
});
  // con.connect(function(err) {
  //   if (err) throw err;
  //   console.log("Connected!");
  // });


//   app.delete("/books/delete/:id&:files",(req,res)=>{
//     const {id,files} = req.params;
//     unlink(`../public/assets/images/ncertBooks/${files}`, (err) => {
//         if (err) throw err;
//         console.log('path/file.txt was deleted');
//       });
//     const sqlRemove = "DELETE FROM `books` WHERE id = ?";
//     db.query(sqlRemove,id,(err,result)=>{
//         if(err) return res.json({Message : "Error in connecting database"});
//         return res.json(result);
//     })
// })


  const appPort = 8000;
  app.listen(process.env.PORT || appPort,()=>{
      console.log("listening");
  })