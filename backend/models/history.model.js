const mongoose = require('mongoose')
const historySchema = mongoose.Schema({
    id:{type:String,required:true},
    message:{type:String,required:true},
},{ timestamps: true })
const historyModel = mongoose.model("history",historySchema)
module.exports=historyModel