const express = require('express');
const router = express.Router();
const signupcontroller = require('../auth/signup');
const logincontroller = require('../auth/login')
router.post('/signup', function (req, res) {
    signupcontroller.signup(req.body).then((resp) => {
        console.log(resp)
        res.send(resp);
    })
        .catch((err) => {
            res.send(err);
        })
});
router.post('/login', function (req, res) {
    console.log("This is called")
    logincontroller.login(req.body).then((resp) => {
        res.send(resp);
    })
        .catch((err) => {
            res.send(err);
        })
});
module.exports = router;