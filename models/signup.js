const mongoose = require('mongoose');

const signUpFormDataSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password:{
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Data', signUpFormDataSchema)