const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timeSheet = new Schema({
    id:{
        type:String,
    },
    fromDate:{
        type:String,
        required:true
    },
    toDate:{
        type:String,
        required:true
    },
    usedDays:{
        type:Number,
        required:true
    },
    balanced:{
        type:Number,
        rquired:true
    },
    availableVac:{
        type:Number,
        required:true
    }
    
   


})
const User = mongoose.model("timeSheet",timeSheet, "timeSheet");
module.exports = User
