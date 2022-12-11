const express = require('express');
const router = express.Router();
const challenge = require('../models/challenges');

const user = require('../models/user');
router.get('/challenges/:userid', function (req, res) {
    let userid = req.params['userid'];
    challenge.find({ userids: { $nin: [userid] } }).then((resp) => {
        res.json({
            status: true,
            message: '',
            response: resp
        })
    }).
        catch((err) => {
            res.json({
                status: false,
                message: 'error in db',
                response: ''
            });
        })
});

router.post('/user-challenges', async function (req, res) {
    let userid = req.body['userid'];
    // userid = userid.substring(1, userid.length - 1);
    let userdoc = await user.findOne({ emailid: userid });
    var userarr = []
    for (let id of userdoc['challengeids']) {
        userarr.push(await challenge.findOne({ challengeid: id }))
    }
    res.json({
        status: true,
        message: '',
        response: userarr
    })
});

router.post('/register-user-challenge', async function (req, res) {
    let userid = req.body['userid'];
    // userid = userid.substring(1, userid.length - 1);
    console.log(req.body, userid)
    await user.findOneAndUpdate({ emailid: userid }, { $push: { challengeids: req.body['challengeid'] } });
    await challenge.findOneAndUpdate({ challengeid: req.body['challengeid'] }, { $push: { userids: userid } });
    res.json({
        status: true,
        message: '',
        response: ''
    })
});

router.delete('/unsubscribe/:userid/:challengeid', async function (req, res) {
    let userid = req.params['userid'];
    // userid = userid.substring(1, userid.length - 1);
    console.log(userid, req.params)
    await user.findOneAndUpdate({ emailid: userid }, { $pull: { challengeids: req.params['challengeid'] } });
    await challenge.findOneAndUpdate({ challengeid: req.params['challengeid'] }, { $pull: { userids: userid } });
    res.json({
        status: true,
        message: '',
        response: ''
    })
});

router.get('/get-details/:challengeid', function (req, res) {
    challenge.findOne({ challengeid: req.params['challengeid'] }).then((resp) => {
        res.json({
            status: true,
            message: '',
            response: resp
        })
    }).catch((err) => {
        res.json({
            status: false,
            message: 'error in db',
            response: ''
        })
    })
});
router.post('/create-challenge', async function (req, res) {
    console.log("create is called");
    // req.body['creatorid'] = req.body['creatorid'].substring(1, req.body['creatorid'].length - 1);
    req.body['userids'] = [req.body['creatorid']];
    let r = (Math.random() + 1).toString(36).substring(7);
    req.body['challengeid'] = r;
    await user.findOneAndUpdate({ emailid: req.body['creatorid'] }, { $push: { challengeids: r } });
    let newchallenge = new challenge(req.body);
    console.log(req.body)
    newchallenge.save().then((resp) => {
        res.json({
            status: true,
            message: '',
            response: resp
        })
    }).catch((err) => {
        res.json({
            status: false,
            message: 'error in db',
            response: ''
        })

    })
})
router.put('/update-challenge', function (req, res) {
    // req.body['creatorid'] = req.body['creatorid'].substring(1, req.body['creatorid'].length - 1);
    console.log(req.body);
    challenge.findOneAndUpdate({ challengeid: req.body['challengeId'] }, {
        $set: {
            "title": req.body.title,
            "description": req.body.description,
            "sampleInput": req.body.sampleInput,
            "sampleOutput": req.body.sampleOutput,
            "testcases": req.body.testcases
            
        }
    })
        .then((resp) => {
            res.json({
                status: true,
                message: '',
                response: resp
            })
        }).catch((err) => {
            res.json({
                status: false,
                message: 'error in db',
                response: ''
            })

        })
});
router.delete('/delete-challenge/:challengeid', async function (req, res) {
    let challengeobj = await challenge.findOne({ challengeid: req.params['challengeid'] });
    for (let id of challengeobj['userids'])
        await user.findOneAndUpdate({ emailid: id }, { $pull: { challengeids: req.params['challengeid'] } });
    await challenge.deleteOne({ challengeid: req.params['challengeid'] });
    res.json({
        status: true,
        message: '',
        response: ''
    })


})
module.exports = router;


