const mongoose = require('mongoose');
const express=require('express')();
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema'); 

// const movie=require("./models/movies");
const user=require("./models/user");
const event=require("./models/event");
const club=require("./models/club");
const venue=require("./models/venue");

mongoose.connect("mongodb://localhost/elaichi",{ useNewUrlParser: true ,useUnifiedTopology: true });
mongoose.connection.once('open',()=>{
    console.log('connected to the database');
});
express.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}));

var createMovie=()=>{
    var h=10,w=10;
    var seats=new Array(h);
    for(var i=0;i<h;++i){
        seats[i]=new Array(w);
        for(var j=0;j<w;++j){
            seats[i][j]=0;
        }
    }

    // movie.create({
    //         title:"New Movie",
    //         date:Date.now(),
    //         seats:seats
    // },(err,contact)=>{
    //         if(err){
    //                     console.log(err);
    //                 }else{
    //                         console.log("Created successfully");
    //                     }
    // })

    user.create({
        name:"Harish",
        username:"harish",
        gmailAuthMail : "abc@gmail.com",
        // firebaseToken : "token123",
        instituteId : "117cs0176",
        mobile : 9878282989,
        emergencyContact : 9120901290,
        displayPicture : "abc.com",
    });
}


// createMovie();

express.get("/",(req,res)=>{
    user.find({},(err,data)=>{
        if(err){
            console.log(err);
        }else{            
            res.send(JSON.stringify(data));
        }
    })
})

express.get("/user",(req,res)=>{
    user.find({},(err,data)=>{
        if(err){
            console.log(err);
        }else{            
            res.send(JSON.stringify(data));
        }
    })
})

// express.get("/:id",(req,res)=>{
//     movie.findById(req.params.id,(err,data)=>{
//         if(err){
//             console.log(err);
//         }else{            
//             res.send(JSON.stringify(data));
//         }
//     })
// })

express.listen(80,()=>{
    console.log("server started");
})
