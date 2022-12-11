const mongoose = require('mongoose')
const Schema = mongoose.Schema

const challengeSchemaModel = new Schema({
    challengeid:{
        type: String,
    },
    title:{
        type : String,
    },
    description:{
        type: String,
    },
    sampleInput:{
        type: String,
    },
    sampleOutput:{
        type: String,
    },
    testcases: {
        type: Array,
        default: []
    },
    userids: {
        type: Array,
        default: []
    },
    creatorid: {
        type: String,
        default: ''
    }
});
module.exports = mongoose.model('challenges',challengeSchemaModel,'challenges')