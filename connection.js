const mongoose=require("mongoose")
exports.connect=()=>{
    try{
         mongoose.connect("mongodb+srv://serenity:serenity123@cluster0.3h6zzll.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true})
        console.log("database successfully connected ")
    }
    catch(err)
    {
        console.log(err) 
    }

}