const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const userSchema = mongoose.Schema({
    fullname:{type:String,required:true},
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    imageUrl:String,
    points:Number,
    status:Boolean
},{ timestamps: true })
let saltRound = 10;
userSchema.pre('save',function(next){
 bcrypt.hash(this.password,saltRound,(err,result)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log(result);
        this.password = result;
        next()
    }
 })
})
userSchema.methods.validatePassword = function(password,callback){
    bcrypt.compare(password,this.password,(err,same)=>{
        if(!err){
          callback(err,same);
        }
        else{
            next()
        }
    })
}
const userModel = mongoose.model("users",userSchema)
module.exports=userModel    