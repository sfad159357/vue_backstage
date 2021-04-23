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
        required: true
    },
    avatar: {
        type: String
    },
    create_at: {
        type: Date,
        // 由於存到遠端mongoDB會將我們本地時間轉換成UTF+0時間，所以timestamp要多加8小時給他扣
        default: new Date(Date.now()+ 8*3600000)
    }
})

// 名為users的model
module.exports = User = mongoose.model("users", UserSchema)