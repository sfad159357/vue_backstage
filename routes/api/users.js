// @login & register
const express = require('express')
const router = express.Router()
const User = require("../../models/User")

// $route GET api/users/test
// @desc 返回請求的json數據
// @access public 任何人都可存取他
router.get("/test", (req, res) =>
    res.json(
        { msg: "login works" }
    )
)

router.post("/register", (req, res) => {
    console.log(req.body)

    // 透過User的table中找尋email欄位
    User.findOne({ email: req.body.email })
        // 如果查到有此email存在，會返回一個user
        .then((user) => {
            // 如果user存在
            if (user) {
                return res.status(400).json({ email: "郵箱已被註冊" }) // 請求失敗，並返回json訊息
            }
            // 沒有相對應email的user，就新增user
            else {
                const newUser = new User ({
                    name: req.body.name,
                    email: req.body.email,
                    avatar, // avatar:avatar
                    password: req.body.password
                })
            }
        })
})

module.exports = router;