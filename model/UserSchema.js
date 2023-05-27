const mongoose=require('mongoose');
const jwt=require("jsonwebtoken");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    MyBookings:[{
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
        ProfilePic:{
            type: String,
            required: true
        }
        ,
        From:{
            type:String,
            required:true
        },
        To:{
            type:String,
            required:true
        }
    }],
})


userSchema.methods.generateAuthToken=function (){
    return jwt.sign({id:this._id,name:this.name},process.env.SECRET_KEY);
}



const User=mongoose.model("user",userSchema);

module.exports=User;