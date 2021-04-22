const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// create Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required : true
    },
    avatar: {
        type:String
    },
    at_created: {
        type: Date,
        default: Date.now
    }
})

// 名為users的model
module.exports = User = mongoose.model("users", UserSchema)