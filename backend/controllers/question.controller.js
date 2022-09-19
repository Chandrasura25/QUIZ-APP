const historyModel = require('../models/history.model');
const questionModel = require('../models/question.model');
const userModel = require('../models/user.model');

const addQuest = (req, res) => {
    let id = (req.body.userId);
    questionModel.find({ question: req.body.question }, (err, result) => {
        if (result.length > 0) {
            console.log(result);
            res.send({ message: "Question already exist", status: false })
        }
        else {
            let form = new questionModel(req.body);
            form.save((err, result) => {
                if (err) {
                    res.send({ message: "operation failed, please try again later", status: false })
                }
                else {
                    console.log(result);
                    const history = "Question added successfully with twenty points"
                    var hist = new historyModel({ id: id, message: history })
                    hist.save((err, saved) => {
                        if (err) {
                            res.send({ message: "history can not be added", status: false })
                        }
                        else {
                            userModel.find({ _id: id }, (err, user) => {
                                if (err) {
                                    console.log(err);
                                    res.send({ message: "user can not be found", status: false })
                                }
                                else {
                                    userModel.findByIdAndUpdate({ _id: id }, { points: (user[0].points + (req.body.point)) }, (err, addedP) => {
                                        if (err) {
                                            res.send({ message: "points can not be added", status: false })

                                        }
                                        else {
                                            res.send({ message: 'operation successful', status: true, result })
                                            console.log(addedP);
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })

        }
    })

}
module.exports = { addQuest }
