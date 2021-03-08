const { introspectionFromSchema } = require('graphql');
const mongoose = require('mongoose');

const messSchema = new mongoose.Schema({
    commonItem : String,
    selectableItems : [
        {
            item : [String],
            type : Number, // 0-Veg, 1-NonVeg, 2-General Item
        }
    ]
});


// {
//     "commonItem" : "Tea/Milk",
//     "selectableItems" : [
//             { 
//                 "item" : [ "Upma/Idli" , "Ghuguni/Sambar/Chatni"],
//                 "type" : 2,
//             },
//             {
//                 "item" : ["Bread", "Butter/Jam"],
//                 "type" : 2,
//             },
//     ];
// }

// {
//     "commonItem" : "Kabuli Chana masala- Fried Rice - Dal Fry - Raita - Bature - Ice-cream",
//     "selectableItems" : [       
//             {
//                 "item" : ["Paneer Butter Masala"],
//                 "type" : 0,
//             },
//             {
//                 "item" : ["Chicken Fry 1/4 pc"],
//                 "type" : 1,
//             },
//     ];  
// }
// {
//     "commonItem" : "Tea/Milk",
//     "selectableItems" : [
//             { 
//                 "item" : ["Bread/Biscuit"],
//                 "type" : 2,
//             },
//             {
//                 "item" : ["Samosa", "Dal Fry"],
//                 "type" : 2,
//             },
           
//     ];  
// }
// {
//     "commonItem" : "Dal Fry- Alu Dum - Raita -Roti - Pickle",
//     "selectableItems" : [
//             { 
//                 "item" : ["Veg Biryani", "Rasgola"],
//                 "type" : 0,
//             },
//             {
//                 "item" : ["Chicken Biryani"],
//                 "type" : 1,
//             },
//             {
//                 "item" : ["Samosa", "Dal Fry"],
//                 "type" : 2,
//             },
           
//     ];  
// }