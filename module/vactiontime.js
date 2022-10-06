

const vacationSchema = require("../schema/vacation_schema")
const timeSheet=require("../schema/timesheet")
exports.vacationTime=async(req,res)=>{
    const {name,role,hireDate,usedVacation,id}=req.body
    console.log(hireDate)
    try{
    const PostList=new vacationSchema({
        id:id,
       name:name,
       role:role,
       hiredDate:hireDate,
       usedVacation:usedVacation
    }) 
    const response=await PostList.save()
    res.send({response})
    }
    catch(err){
        console.log(err)
    }
}
exports.getVacation=async(req,res)=>{
    const response=await vacationSchema.find()
    res.send(response)

}
exports.timeSheet=async(req,res)=>{
    const {id,fromDate,toDate,days,balanced, availableVac}=req.body
   
    try{
    const PostList=new timeSheet({
        id:id,
        fromDate:fromDate,
        toDate:toDate,
        usedDays:days,
        balanced:balanced,
        availableVac: availableVac
     
    }) 
    const response=await PostList.save()
    res.send({success:"successfully updated"})
    }
    catch(err){
        res.send({error:err})
    }
}
exports.particular=async(req,res)=>{
    const id=req.params.id
    console.log(id)
    const response= await timeSheet.find({id:id})
    res.send(response)
    console.log(response)
}