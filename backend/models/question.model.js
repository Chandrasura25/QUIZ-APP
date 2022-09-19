const mongoose = require('mongoose')
const questionSchema = mongoose.Schema({
    question:{type:String,required:true},
    optA:{type:String,required:true},
    optB:{type:String,required:true},
    optC:{type:String,required:true},
    optD:{type:String,required:true},
    answer:{type:String,required:true},
    userId:{type:String,required:true}
},{ timestamps: true })
const questionModel = mongoose.model("questions",questionSchema)
module.exports=questionModel   