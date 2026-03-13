const mongoose = require("mongoose");

const LostItemSchema = new mongoose.Schema({

  itemName:String,
  description:String,
  location:String,
  image:String,
  lat:Number,
  lng:Number,
  userEmail:String,

  type:{
    type:String,
    enum:["lost","found"]
  },

  createdAt:{
    type:Date,
    default:Date.now
  }

});

module.exports = mongoose.model("LostItem",LostItemSchema);