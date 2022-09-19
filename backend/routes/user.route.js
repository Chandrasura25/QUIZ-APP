const express = require("express")
require('dotenv').config()
const router = express.Router()
const userController = require('../controllers/user.controller')
const questionController = require('../controllers/question.controller')
router.post('/login',userController.signInUser)
router.get('/dashboard',userController.getDashboard)
router.post('/signup',userController.registerUser);
router.post('/upload',userController.uploadFile)
router.post('/point',userController.addPoints)
router.post('/addquest',questionController.addQuest)
module.exports = router;