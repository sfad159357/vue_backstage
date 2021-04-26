const express = require('express')
const router = express.Router()
const Profile = require("../../models/Profile")

const passport = require('passport')


// $route GET api/users/test
// @desc 返回請求的json數據
// @access public 任何人都可存取他
router.get("/test", (req, res) =>
    res.json({
        msg: "profile works"
    })
)


// @ access private
// 取得所有profiles資訊
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.find().then(profile => {
        if (!profile) {
            return res.status(404).json("找不到你要的內容")
        }
        res.json(profile)
    })
    .catch(err => res.status(404).json(err))
})

// @ access private
// 取得單一profiles資訊
router.get('/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
        Profile.findOne({_id: req.params.id}).then(profile => {
            if (!profile) {
                return res.status(404).json("找不到你要的內容")
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json(err))
})

// @ access private
router.post("/add", passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const profileFields = {}

        if (req.body.type) profileFields.type = req.body.type;
        if (req.body.describe) profileFields.describe = req.body.describe;
        if (req.body.income) profileFields.income = req.body.income;
        if (req.body.expand) profileFields.expand = req.body.expand;
        if (req.body.cash) profileFields.cash = req.body.cash;
        if (req.body.remark) profileFields.remark = req.body.remark;
       
        new Profile(profileFields).save().then(profile => {
                res.json(profile)
            }
        )
    } 
)

// @access private
// @desc 編輯訊息接口
// PUT api/profiles/edit
router.put("/edit/:id", passport.authenticate('jwt',
    {session: false}),
    (req, res) => {
        const profileFields = {}

        if (req.body.type) profileFields.type = req.body.type;
        if (req.body.describe) profileFields.describe = req.body.describe;
        if (req.body.income) profileFields.income = req.body.income;
        if (req.body.expand) profileFields.expand = req.body.expand;
        if (req.body.cash) profileFields.cash = req.body.cash;
        if (req.body.remark) profileFields.remark = req.body.remark;

        Profile.findOneAndUpdate(
            // 透過id來尋找對應的_id
            { _id: req.params.id },
            // $set,所要更新資訊
            { $set: profileFields },
            // update後要多加的option
            {new: true}
        ).then(profile => {
            res.json(profile)
        })
    }
)

// @access private
// @desc 編輯訊息接口
// DELETE api/profiles/edit
router.delete("/delete/:id", passport.authenticate('jwt', {
        session: false
    }),
    (req, res) => {
        Profile.findOneAndRemove(
            // 透過id來尋找對應的_id
            {_id: req.params.id}
        ).then(profile => {
            profile.save()
            .then(profile => res.json(profile))
        }).catch(err => res.status(404).json(err))
    }
)





module.exports = router;