const mongoose = require('mongoose')
const historySchema = mongoose.Schema({
    id:{type:String,required:true},
    message:{type:String,required:true},
    date:{type:String},
},{ timestamps: true })
const historyModel = mongoose.model("history",historySchema)
module.exports=historyModel