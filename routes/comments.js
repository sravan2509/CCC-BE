const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const commentsModel = require('../models/comments');
const challengeModel = require('../models/challenges');
router.post('/add-comment', async function (req, res) {
    let userid = req.body['userid'];
    // userid = userid.substring(1, userid.length - 1);
    var newComment = new commentsModel({
        commentid: uuidv4(),
        challengeid: req.body.challengeid,
        userid: userid,
        description: req.body.description,
        username:req.body.username
    });
    newComment.save(async function (err, dbresp) {
        if (err) {
            res.json({
                status: false,
                message: 'error in db',
                response: ''
            });
        }
        else {
            await challengeModel.findOneAndUpdate({ challengeid: req.body.challengeid }, {
                $push: {
                    commentids: newComment['commentid']
                }
            });
            res.json({
                status: true,
                message: '',
                response: ''
            });
        }
    })

});
router.put('/edit-comment', function (req, res) {
    commentsModel.findOneAndUpdate({ commentid: req.body.commentid }, { $set: { description: req.body.description } }, function (err, dbresp) {
        if (err) {
            res.json({
                status: false,
                message: 'error in db',
                response: ''
            });
        }
        else {
            res.json({
                status: true,
                message: '',
                response: ''
            });
        }
    })
});
router.delete('/delete-comment/:challengeid/:commentid', async function (req, res) {
    await commentsModel.findOneAndDelete({ commentid: req.params['commentid'] });
    await challengeModel.findOneAndUpdate({ challengeid: req.params.challengeid }, { $pull: { commentids: req.params.commentid } });
    res.json({
        status: true,
        message: '',
        response: ''
    });
});
router.get('/get-comment/:commentid', function (req, res) {
    commentsModel.findOne({ commentid: req.params.commentid }, function (err, dbresp) {
        if (err) {
            res.json({
                status: false,
                message: 'error in db',
                response: ''
            });
        }
        else {
            res.json({
                status: true,
                message: '',
                response: dbresp
            })
        }
    })
});
router.get('/get-all-comments', function (req, res) {
    console.log("getALl");
    commentsModel.find({}, function (err, dbresp) {
        if (err) {
            res.json({
                status: false,
                message: 'error in db',
                response: ''
            });
        }
        else {
            res.json({
                status: true,
                message: '',
                response: dbresp
            })
        }
    })
});
module.exports = router;
