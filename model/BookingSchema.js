const mongoose=require('mongoose');

const BookoingSchema=new mongoose.Schema({
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
    }
})

const MyBooking=mongoose.model("MyBooking",BookingSchema);

module.exports=MyBooking;
