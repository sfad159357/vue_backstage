const express = require("express")
const app = express()
const mongoose = require("mongoose") // 連接mongoDB
const bodyParser = require("body-parser")
const users = require("./routes/api/users.js")
const profiles = require('./routes/api/profiles')
require('dotenv').config() // 導入環境變數配置
const passport = require('passport')
const passportConfig = require('./config/passport')

// 連線mongoDB altas
mongoose.
connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).
then(() => {
    console.log("順利連線mongoDB")
}).
catch((err) => console.log(err))

// 要先初始化，然後到config進行配置
app.use(passport.initialize())
passportConfig(passport)


const port = process.env.PORT || 5000 // 本地開發port為5000

// app監聽port:5000
app.listen(port, () => {
    console.log(`Server running on the ${port}`)
})

// 首頁'/'
app.get("/", (req, res) => {
    res.send(new Date(1619100704563))
})

// bodyParser之方法要在導入users api之前執行完成
// 使用body中間件，x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// 將傳送的body json化
app.use(bodyParser.json())


// routes
app.use("/api/users", users)
app.use("/api/profiles", profiles)
