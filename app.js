var mongoose = require('mongoose');
var express=require('express')();
var movie=require("./modules/movies");
var contact=require("./modules/contact");

mongoose.connect("mongodb://localhost/elaichi",{ useNewUrlParser: true ,useUnifiedTopology: true });

var createMovie=()=>{
    var h=10,w=10;
    var seats=new Array(h);
    for(var i=0;i<h;++i){
        seats[i]=new Array(w);
        for(var j=0;j<w;++j){
            seats[i][j]=0;
        }
    }

    movie.create({
            title:"New Movie",
            date:Date.now(),
            seats:seats
    },(err,contact)=>{
            if(err){
                        console.log(err);
                    }else{
                            console.log("Created successfully");
                        }
    })
}


// createMovie();

express.get("/",(req,res)=>{
    movie.find({},(err,data)=>{
        if(err){
            console.log(err);
        }else{            
            res.send(JSON.stringify(data));
        }
    })
})

express.get("/:id",(req,res)=>{
    movie.findById(req.params.id,(err,data)=>{
        if(err){
            console.log(err);
        }else{            
            res.send(JSON.stringify(data));
        }
    })
})

express.listen(80,()=>{
    console.log("server started");
})
