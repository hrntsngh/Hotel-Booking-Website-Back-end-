const express=require('express');
const dotenv=require('dotenv');
const app=express();
const cors=require("cors");
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser');

dotenv.config({path:'./config.env'});

const DB=process.env.DataBase;

mongoose.connect(DB,{useNewUrlParser:true,useUnifiedTopology:true
}).then(()=>{
    console.log('connection successful');
}).catch((err)=>console.log(err));


app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use(express.json());


app.use(require('./router/auth'));
app.use(require('./router/hosting'));
app.use('/', express.static('uploads'));


app.get("/",(req,res)=>{
    res.send("Hello");
})
app.listen(process.env.PORT,()=>{
    console.log("Server started at port 5000");
})