const express = require('express');
const router = express.Router();
const user = require('../models/user');
const challenge = require('../models/challenges');
// const calendar = require('../models/calendar');
const multer = require('multer')
router.put('/edit-user-details', function (req, res) {
    let userid = req.body['userid'];
    // userid = userid.substring(1, userid.length - 1);
    user.findOneAndUpdate({ emailid: userid }, {
        $set: {
            phonenumber: req.body.phonenumber,
            dateofbirth: req.body.dateofbirth,
            gender: req.body.gender,
            street: req.body.street,
            zipcode: req.body.zipcode,
            city: req.body.city,
            state: req.body.state
        }
    }).then((resp) => {
        res.json({
            status: true,
            message: '',
            response: ''
        })
    }).catch((err) => {
        res.json({
            status: false,
            message: 'error in db',
            response: ''
        })
    })
});

router.get('/get-user-details/:userid', function (req, res) {
    let userid = req.params['userid'];
    // userid = userid.substring(1, userid.length - 1);
    user.findOne({ emailid: userid }).then((resp) => {
        res.json({
            status: true,
            message: '',
            response: resp
        })
    })
        .catch((err) => {
            res.json({
                status: false,
                message: 'error in db',
                response: ''
            })
        })
});

router.delete('/delete-account/:userid', async function (req, res) {
    let userid = req.params['userid'];
    // userid = userid.substring(1, userid.length - 1);
    var userobj = await user.findOne({ emailid: userid });
    for (let id of userobj['challengeids'])
        await challenge.findOneAndUpdate({ challengeid: id }, { $pull: { userids: userid } });
    await user.findOneAndDelete({ emailid: userid });
    res.json({
        status: true,
        message: '',
        response: ''
    })

});

router.get('/get-users/:userid', function (req, res) {
    let userid = req.params['userid'];
    // userid = userid.substring(1, userid.length - 1);
    user.find({ emailid: { $ne: userid } }).then((resp) => {
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

var store = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './routes/uploads')
    },
    filename: function (req, file, cb) {
        function makeString() {
            let outString = '';
            let inOptions = 'abcdefghijklmnopqrstuvwxyz';

            for (let i = 0; i < 26; i++) {

                outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));

            }

            return outString;
        }
        const rand = () => {
            d = makeString() + ".jpg"
            // console.log("d",d)
        }
        rand()
        cb(null, d)
    }
});
var upload = multer({ storage: store })
router.post('/image-upload', upload.single('file'), async function (req, res) {
    req.body['userid'] = req.body['userid'].substring(3, req.body['userid'].length - 3);
    await user.findOneAndUpdate({ emailid: req.body.userid }, { $set: { profilepicture: req.file.filename } });
    res.json({
        status: true,
        message: '',
        response: req.file.filename
    })
});
// router.post('/calendar', function (req, res) {
//     let userid = req.body['userid'];
//     userid = userid.substring(1, userid.length - 1);
//     var newCal = new calendar({
//         userid: userid,
//         // challengeids: req.body.challengeids,
//         date: req.body.date
//     });
//     newCal.save(function (err, dbresp) {
//         if (err) {
//             res.json({
//                 status: false,
//                 message: 'error in db',
//                 response: ''
//             })
//         }
//         else {
//             res.json({
//                 status: true,
//                 message: 'saved',
//                 response: ''
//             })
//         }
//     })
// });
router.get('/get-image', function (req, res) {
    res.sendFile(__dirname + '/uploads/' + req.query['name']);
});
router.get('/user-details/:userid', function (req, res) {
    user.findOne({ emailid: req.params['userid'] }).then((resp) => {
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




module.exports = router;