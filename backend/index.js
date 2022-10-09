const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors())
const mongoose = require('mongoose')
app.use(express.urlencoded({extended:true,limit:'50mb'})) 
app.use(express.json({limit:'50mb'})) 
require('dotenv').config()
const PORT = process.env.PORT||2030
const URI = process.env.MONGO_URI
const userRouter = require('./routes/user.route.js')
app.use('/',userRouter)
app.use(express.static(__dirname+'/build'))
app.get("/*",(req,res)=>{
  res.sendFile(__dirname+'/build/index.html')
})
mongoose.connect(URI,(err)=>{
    if(err){
        console.log(err)
        console.log(`mongoose isn't connected`) 
    }
    else{
        console.log(`moogoose is connected`)
    }
})
 app.listen(PORT,()=>{
  console.log(`App is running on port: ${PORT}`);
})  