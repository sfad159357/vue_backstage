// @login & register
const express = require('express')
const router = express.Router()
const User = require("../../models/User")
const bcrypt = require("bcrypt")
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')


// $route GET api/users/test
// @desc 返回請求的json數據
// @access public 任何人都可存取他
router.get("/test", (req, res) =>
    res.json(
        { msg: "login works" }
    )
)

// 密碼未被加密
// router.post("/register1", async (req, res) => {
//     try {
//         const user = await User.create(req.body)
//         res.status(201).send({user})
//     } catch (err) {
//         res.status(400).send(err)
//     }
// })

router.post("/register",  (req, res) => {
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
                // 產生大頭照，若沒有註冊會自動產生空的頭像
                const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' })

                const newUser = new User ({
                    name: req.body.name,
                    email: req.body.email,
                    avatar, // avatar:avatar
                    password: req.body.password,
                  
                })

                // 將密碼進行雜湊化
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newUser.password, salt, function (err, hash) {
                        // store hash in your password DB
                        if (err) throw err;

                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user)) // 儲存成功返回user
                            .catch(err => console.log(err))
                    })
                })
                return res.status(201).json({msg:"註冊成功"})
            }
        })
})

router.post('/login', (req, res) => {
    const loginEmail = req.body.email
    const loginPassword = req.body.password

    User.findOne({ email: loginEmail}) // ES6 {email:email}
        .then(user => {
            if (!user) return res.status(404).json({msg:'帳戶不存在'})
            

            // 參1為登入密碼，參2為數據庫密碼
            bcrypt.compare(loginPassword, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({msg: '密碼錯誤'})

                    // jwt.sign() 參1"payload", 參2"加密名字", 參3"過期時間{秒}", "箭頭函式"
                    const payload = {id: user.id, name:user.name} // 將DB內建的id最為id
                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            return res.json({
                                msg:'登入成功',
                                success: true,
                                token: "Bearer " + token
                            })
                        })
                })
        })
})

router.get("/current",
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json(req.user)
    }
)



module.exports = router;