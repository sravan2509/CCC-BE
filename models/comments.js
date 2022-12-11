const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentsSchemaModel = new Schema({
    commentid: {
        type: String
    },
    challengeid: {
        type: String
    },
    userid: {
        type: String
    },
    username:{
        type:String
    },
    likes: {
        type: Array,
        default: []
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('comments', commentsSchemaModel,'comments')