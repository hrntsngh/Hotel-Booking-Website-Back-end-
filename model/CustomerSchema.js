const mongoose=require('mongoose');

const CustomerReviewSchema=new mongoose.Schema({
            user : {
                type : mongoose.Schema.ObjectId,
                ref: "UserSchema"
            },
            Date:{
                type:String
            },
            review:{
                type:String
            }
})

const review=mongoose.model("review",CustomerReviewSchema);

module.exports=review;