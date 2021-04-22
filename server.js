const express = require("express")
const mongoose = require("mongoose") // 連接mongoDB
const bodyParser =require("body-parser")
const users = require("./routes/api/users.js")
require('dotenv').config() // 導入環境變數配置
const app = express() 


// 連線mongoDB altas
mongoose.
connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).
then(() => {
    console.log("順利連線mongoDB")
}).
catch((err) => console.log(err))


const port = process.env.PORT || 5000 // 本地開發port為5000

// app監聽port:5000
app.listen(port, () => {
    console.log(`Server running on the ${port}`)
})

// 首頁'/'
app.get("/", (req, res) => {
    res.send("安安，你好")
})

// bodyParser之方法要在導入users api之前執行完成
// 使用body中間件，x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// 將傳送的body json化
app.use(bodyParser.json())

// /api/users，會導入users的api
app.use("/api/users", users)
