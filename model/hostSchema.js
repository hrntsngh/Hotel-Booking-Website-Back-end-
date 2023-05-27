const mongoose = require('mongoose');

const hostSchema=new mongoose.Schema({
    user : {
            type : mongoose.Schema.ObjectId,
            ref: "UserSchema"
        },
    HotelName:{
        type:String,
        required:true
    },
    City:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    Price:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    From:{
        type:String,
        required:true
    },
    To:{
        type:String,
        required:true
    },
    photos:[String],
    CustomerReviews:[{
        user : {
            type : String,
        },
        Date:{
            type:Date
        },
        review:{
            type:String
        }}
    ]
})

const Host=mongoose.model("host",hostSchema);

module.exports=Host;
