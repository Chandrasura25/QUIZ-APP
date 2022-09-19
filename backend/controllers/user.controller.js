let cloudinary = require('cloudinary');
const jwt = require('jsonwebtoken');
const historyModel = require('../models/history.model');
const userModel = require('../models/user.model');
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});
const registerUser = (req, res) => {
    console.log(req.body);
    userModel.find({ email: req.body.email }, (err, result) => {
        if (result.length > 0) {
            console.log(result);
            res.send({ message: "Email already exist", status: false })
        }
        else {
            let form = new userModel(req.body);
            form.save((err, result) => {
                if (err) {
                    res.send({ message: "operation failed, please try again later", status: false })
                }
                else {
                    res.send({ message: 'operation successful', status: true, result })
                    console.log(result.id);
                }
            })

        }
    })
}
const uploadFile = (req, res) => {
    let myFile = req.body.myFile
    cloudinary.v2.uploader.upload(myFile,
        (error, result) => {
            if (error) {
                res.send({ messaage: "Failed to upload to the server", status: false })
                console.log(error);
            }
            else {
                let id = req.body.userId;
                let url = (result.secure_url); 
                console.log(url);
                userModel.findOneAndUpdate({ _id: id }, { imageUrl: url }, (err, result) => {
                    if (err) {
                        res.send({ messaage: "Failed to update profile", status: false })
                    }
                    else {
                        console.log(result);
                        res.send({ messaage: "Image Uploaded Successfully", status: true, image: result.secure_url })
                    }
                })
            }
        });
}
const signInUser = (req, res) => {
    console.log(req.body);
    let { password, email } = req.body;
    userModel.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            res.send({ message: "Internal Server Error", status: false })
        }
        else {
            if (!user) {
                res.send({ message: "email is not found", status: false })
            }
            else {
                user.validatePassword(password, (err, result) => {
                    if (!result) {
                        res.send({ message: "password is incorrect", status: false })
                    }
                    else {
                        let secret = process.env.SECRET
                        let myToken = jwt.sign({ email }, secret, { expiresIn: "7h" })
                        console.log(myToken);
                        res.send({ message: "welcome you people", status: true, myToken })
                    }
                })
            }
        }
    })
}
const getDashboard = (req, res) => {
    console.log(req.body);
    let token = (req.headers.authorization.split(' ')[1]);
    let secret = process.env.SECRET
    jwt.verify(token, secret, (err, result) => {
        if (err) {
            res.send({ message: 'error', status: false, err })
        }
        else {
            let email = result.email
            userModel.find({ email: email }, (err, result) => {
                if (result.length > 0) {
                    console.log(result);
                    res.send({ status: true, messaage: "user authenticated", result, status: true })
                    console.log(result);
                }
                else {
                    console.log(err)
                }
            })

        }
    })
}
const addPoints = (req, res) => {
    console.log(req.body);
    let id = req.body.userId;
    userModel.find({ _id: id }, (err, user) => {
        if (err) {
            console.log(err);
            res.send({ message: "user can not be found", status: false })
        }
        else {
            userModel.findByIdAndUpdate({ _id: id }, {points: (user[0].points + Number(req.body.points)),status:req.body.status }, (err, result) => {
                if(err){
                    console.log(err);
                   res.send({ message: "Point can not be added", status: false })
                }
                else{
                    console.log(result);
                    const history = "Points added successfully for the day's challenge"
                    var form = new historyModel({id:id,message:history})
                    form.save((err,saved)=>{
                    if(err){
                      res.send({ message: "history can not be added", status: false })
                    }
                    else{
                        res.send({ message: "Congratulations, You have successfully broken the day's challenge", status: true,saved })
                    }
                   })
                }
            })
        }
    })

}
module.exports = { registerUser, uploadFile, signInUser, getDashboard, addPoints }