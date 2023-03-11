// Task1: initiate app and run server at 3000
const express= require("express");
const Mongoose= require("mongoose");
const BodyParser = require("body-parser");
const Cors = require("cors")
const EmployeeModel = require("./model/Employee")
var app = express()
app.use(BodyParser.json())
app.use(BodyParser.urlencoded({extended:true}))
const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

// Task2: create mongoDB connection 
Mongoose.connect("mongodb+srv://anujithanil24:anujith123@cluster0.kxr97zm.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true})

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below







//TODO: get data from db  using api '/api/employeelist'
app.get("/api/employeelist",(req,res)=>{
    try {
        var post = EmployeeModel.find()
        res.send(post)
      } catch (error) {
        res.status(500).send(error)
      }
})




//TODO: get single data from db  using api '/api/employeelist/:id'
app.get("/api/employeelist/:id",async(req,res)=>{
    try {
        var post = await EmployeeModel.findOne({_id:req.body._id})
        res.send(post)
      } catch (error) {
        res.status(500).send(error)
      }
})






//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.post('/api/employeelist',async (req,res)=>{
    
    var data =new EmployeeModel({
        name:req.body.name,
        location:req.body.location,
        position:req.body.position,
        salary:req.body.salary
    })
    data.save((err,data)=>{
        if (data) {
            res.json({ status: "success", data: data})
        } else {
            res.json({ status: "filed"})
        }
    })
    })







//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete('/api/employeelist/:id',(req,res)=>{

    EmployeeModel.findByIdAndDelete({_id:req.body._id},(err,data)=>{
        if (data) {
            res.json({ status: "deleted"})
        } else {
            res.json({ status: "filed"}) 
        }
    })
    
    })




//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/api/employeelist',(req,res)=>{
    var _id=req.body.id
    var data={
        name:req.body.name,
        location:req.body.location,
        position:req.body.position,
        salary:req.body.salary
    }
    EmployeeModel.findOneAndUpdate(_id,data,(err,data)=>{
         if (data) {
           res.json({ status: "success", data: data });
           } else {
             res.json({ status: "Error", Error: err });
           }
         });
 });
 


//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});


app.listen(3000,()=>{
    console.log("port is listeneing...")
})


