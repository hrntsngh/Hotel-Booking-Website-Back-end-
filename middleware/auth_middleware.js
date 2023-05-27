const jwt=require("jsonwebtoken");
const User=require('../model/UserSchema');

const Authenticate=async(req,res,next)=>{
    const {token}=req.cookies;
    // console.log(token);

    if(!token){
        return res.json({"message":"Token not found"});
    }

    const decodedData=jwt.verify(token,process.env.SECRET_KEY);
    const userData=await User.findById(decodedData.id);
    // console.log(userData);
    req.user=userData;
    next();
}


module.exports=Authenticate;












// try {
//     const token=req.cookies.jwtoken;
//     const verify=jwt.verify(token,process.env.SECRET_KEY);
//     const rootUser = await User.findOne({_id:verify._id,"tokens.token":token});
    
//     if(!rootUser){
//         throw new Error("User Not found");
//     }
//     req.token=token;
//     req.rootUser=rootUser;
//     req.userID=rootUser._id;

//     next();
// } catch (err) {
//     res.status(401).send("UnAuthorized");
//     console.log(err);
// }