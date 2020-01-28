var mongoose = require('mongoose');
var express=require('express')();

mongoose.connect("mongodb://localhost/elaichi",{ useNewUrlParser: true ,useUnifiedTopology: true });

var contactSchema = new mongoose.Schema({
    name:String,
    designation:String,
    phone:String
})

var Contact = mongoose.model("Contact",contactSchema);



express.get("/",(req,res)=>{
    Contact.find({},(err,data)=>{
        if(err){
            console.log('Something went wrong');
        }else{
            console.log("saved contact");
            res.send(JSON.stringify(data));
        }
    })
})

express.listen(80,()=>{
    console.log("server started");
})