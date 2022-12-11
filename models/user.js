const mongoose = require('mongoose')
const Schema = mongoose.Schema
// address schema model
const userSchemaModel = new Schema({
    userid: {
        type: String,
        require: true
    },
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    emailid: {
        type: String
    },
    password: {
        type: String
    },
    challengeids: {
        type: Array,
        default: []
    },
    phonenumber: {
        type: String,
        default: ''
    },
    dateofbirth: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        default: ''
    },
    street: {
        type: String,
        default: ''
    },
    zipcode: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    state: {
        type: String,
        default: ''
    },
    profilepicture: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    }
});
module.exports = mongoose.model('users', userSchemaModel, 'users')