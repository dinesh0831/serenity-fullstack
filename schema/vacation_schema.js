const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = new Schema({
    id:{
        type:Number
    },
    
    name:{
         type:String,
         required: true
    },
    hiredDate:{
        type:String,
        required: true
    },
    usedVacation:{
        type:Number,
        
    },
    role:{
        type:String,
        required: true
    },




})
const User = mongoose.model("Post",Post, "Post");
module.exports = User
