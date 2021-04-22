const express = require("express")
const mongoose = require("mongoose") // 連接mongoDB
const app = express() 
const users = require("./routes/api/users.js")
require('dotenv').config() // 導入環境變數配置


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

// /api/users，會導入users的api
app.use("/api/users", users)