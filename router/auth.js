const jwt=require("jsonwebtoken");
const express=require('express');
const router=express.Router();
const authenticate= require('../middleware/auth_middleware')
const User=require('../model/UserSchema');
const Host=require('../model/hostSchema');

var bcrypt = require('bcryptjs');
const salt= bcrypt.genSaltSync(8);

router.post("/register",async (req,res)=>{
   const {name,email,password} = req.body;
    if(!name || !email || !password){
        return res.status(422).json({error:"fill details"});
    }
    try{
        const userExist=await User.find({email:email});
        if(userExist.length > 0){
            return res.status(422).json({error:"Email already exist"});
        }
        const user=new User({
                    name:name,
                    email:email,
                    password:bcrypt.hashSync(password,salt)
                })
        await user.save();
        res.status(201).json({message:"user registered"});
    }
    catch(err){
        console.log(err);
    }
});


router.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(422).json({error:"fill details"});
    }

    const userExist=await User.findOne({email:email});

    if(userExist){
        const passCheck=bcrypt.compareSync(password,userExist.password);
        if(passCheck){
           const token=userExist.generateAuthToken();

           res.status(200).cookie("token",token,{
            expires: new Date(Date.now()+ 86400000),
            httpOnly:true
           }).json({
            success:true,
            token,
            userExist
           })
        }
        else{
            res.status(201).json("Check Password")
        }
    }
    else{
        res.status(201).json("User Not found")
    }

});

router.get("/logout", async(req,res)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly:true,
    });
    res.status(200).json({
        success: true,
        message:"Logged Out",
    })
})

router.get("/",authenticate,async(req,res)=>{
    res.send(req.user);
});

router.get('/place/:id',async(req,res)=>{
    const {id}=req.params;
    res.send(await Host.findById(id));
})


module.exports=router;