const express=require('express');
const router=express.Router();
const multer=require('multer');
const Host=require('../model/hostSchema');
const User=require('../model/UserSchema');
const authenticate= require('../middleware/auth_middleware')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null,uniqueSuffix+file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
router.post('/upload', upload.array('photos', 100), async (req,res) => {
    const uploadedFiles=[];
    for(let i=0;i<req.files.length;i++){
        const {path}=req.files[i];
        uploadedFiles.push(path.replace("uploads\\","/"));
    }
    res.json(uploadedFiles);
});


router.post("/host",authenticate,async(req,res)=>{
  const{HotelName,City,Address,Price,Description,From,To,selectedImages}=req.body;
  const host=new Host({
    user:req.user._id,HotelName:HotelName,City:City,Address:Address,Price:Price,Description:Description,From:From,To:To,photos:selectedImages
  });
  await host.save();
  res.status(201).json("Hotel Added");
})



router.get("/hotelData",async(req,res)=>{
  const HotelData= await Host.find();
  // console.log(HotelData);
  res.send(HotelData);
})

router.put("/host",authenticate,async(req,res)=>{
  const {id,content}=req.body;
  const date= new Date();
  if(!id){
    res.json("id not found");
  }
  let data=await Host.findById(id);
  const review = {id,
    date,
    content
  }

  data = await Host.findByIdAndUpdate(id,{$push:{CustomerReviews: {
    user: req.user.name, Date: date , review: content
  }}});
  res.json("Review Added");
})

router.put("/BookHotel",authenticate,async(req,res)=>{
  const {id,Start,End}=req.body;
  let Hoteldata=await Host.findById(id);
  data = await User.findByIdAndUpdate(req.user._id,{$push:{MyBookings: {
   HotelName: Hoteldata.HotelName, City: Hoteldata.City, Address: Hoteldata.Address,Price: Hoteldata.Price,Description: Hoteldata.Description,ProfilePic: Hoteldata.photos[0],From: Start,To:End
  }}});
  let change = await Host.findByIdAndUpdate(id,{From:Start,To: End});
  res.status(200).json(data);
})
module.exports=router;