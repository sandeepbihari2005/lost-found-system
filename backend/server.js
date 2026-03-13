const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const User = require("./models/User");
const LostItem = require("./models/LostItem");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

/* -------------------------
   MongoDB Connection
------------------------- */

mongoose.connect("mongodb://127.0.0.1:27017/lostfoundDB")
.then(()=>{
  console.log("MongoDB Connected");
})
.catch((err)=>{
  console.log(err);
});

/* -------------------------
   EMAIL TRANSPORTER
------------------------- */

const transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:"sandeepbihari2020@gmail.com",
    pass:"ziklfyvieryvzgvp"
  }
});

/* -------------------------
   ROOT
------------------------- */

app.get("/",(req,res)=>{
  res.send("Backend running 🚀");
});

/* -------------------------
   SIGNUP
------------------------- */

app.post("/api/signup",async(req,res)=>{

  const {name,email,password} = req.body;

  try{

    const existingUser = await User.findOne({email});

    if(existingUser){
      return res.status(400).json({
        message:"User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = new User({
      name,
      email,
      password:hashedPassword
    });

    await user.save();

    res.json({
      message:"Signup successful"
    });

  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

});

/* -------------------------
   LOGIN
------------------------- */

app.post("/api/login",async(req,res)=>{

  const {email,password} = req.body;

  try{

    const user = await User.findOne({email});

    if(!user){
      return res.status(400).json({
        message:"User not found"
      });
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
      return res.status(400).json({
        message:"Incorrect password"
      });
    }

    const token = jwt.sign(
      {id:user._id},
      "secretkey",
      {expiresIn:"1d"}
    );

    res.json({
      message:"Login successful",
      token,
      user:{
        name:user.name,
        email:user.email
      }
    });

  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

});

/* -------------------------
   FORGOT PASSWORD (SEND OTP)
------------------------- */

app.post("/api/forgot-password",async(req,res)=>{

  const {email} = req.body;

  try{

    const user = await User.findOne({email});

    if(!user){
      return res.status(400).json({
        message:"Email not found"
      });
    }

    const otp = Math.floor(100000 + Math.random()*900000).toString();

    user.resetOTP = otp;
    user.otpExpire = Date.now() + 5*60*1000;

    await user.save();

    await transporter.sendMail({
      from:"sandeepbihari2020@gmail.com",
      to:email,
      subject:"Password Reset OTP",
      text:`Your password reset OTP is ${otp}`
    });

    res.json({
      message:"OTP sent to your email"
    });

  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

});

/* -------------------------
   RESET PASSWORD
------------------------- */

app.post("/api/reset-password", async (req,res)=>{

  const { email,otp,password } = req.body;

  try{

    const user = await User.findOne({ email });

    if(!user){
      return res.status(400).json({
        message:"User not found"
      });
    }

    if(user.resetOTP !== otp){
      return res.status(400).json({
        message:"Invalid OTP"
      });
    }

    if(user.otpExpire < Date.now()){
      return res.status(400).json({
        message:"OTP expired"
      });
    }

    const hashedPassword = await bcrypt.hash(password,10);

    user.password = hashedPassword;
    user.resetOTP = null;
    user.otpExpire = null;

    await user.save();

    res.json({
      message:"Password reset successful"
    });

  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

});

/* -------------------------
   ADD LOST ITEM
------------------------- */

app.post("/api/lost",async(req,res)=>{

  try{

    const newItem = new LostItem({
      ...req.body,
      type:"lost"
    });

    await newItem.save();

    res.json({
      message:"Lost item saved successfully"
    });

  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

});

/* -------------------------
   ADD FOUND ITEM
------------------------- */

app.post("/api/found",async(req,res)=>{

  try{

    const newItem = new LostItem({
      ...req.body,
      type:"found"
    });

    await newItem.save();

    res.json({
      message:"Found item saved successfully"
    });

  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

});

/* -------------------------
   GET LOST ITEMS
------------------------- */

app.get("/api/lost",async(req,res)=>{

  try{

    const items = await LostItem.find({type:"lost"});

    res.json(items);

  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

});

/* -------------------------
   GET FOUND ITEMS
------------------------- */

app.get("/api/found",async(req,res)=>{

  try{

    const items = await LostItem.find({type:"found"});

    res.json(items);

  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

});

/* -------------------------
   DASHBOARD STATS
------------------------- */

app.get("/api/stats",async(req,res)=>{

  try{

    const email = req.query.email;
    const query = email ? { userEmail: email } : {};

    const lost = await LostItem.countDocuments({...query, type:"lost"});
    const found = await LostItem.countDocuments({...query, type:"found"});

    res.json({
      lost,
      found
    });

  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

});

/* -------------------------
   MATCH LOST & FOUND ITEMS
------------------------- */

app.get("/api/matches",async(req,res)=>{

  try{
    
    const email = req.query.email;
    const lostQuery = { type: "lost" };
    if (email) lostQuery.userEmail = email;

    const lostItems = await LostItem.find(lostQuery);
    const foundItems = await LostItem.find({type:"found"});

    const matches = [];

    lostItems.forEach(lost => {

      foundItems.forEach(found => {

        if(
          found.itemName.toLowerCase() ===
          lost.itemName.toLowerCase()
        ){
          matches.push({
            lost,
            found
          });
        }

      });

    });

    res.json(matches);

  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

});

/* -------------------------
   SERVER
------------------------- */

app.listen(5000,()=>{
  console.log("Server running on port 5000");
});