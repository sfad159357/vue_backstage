// @login & register

const express = require('express')
const router = express.Router()

// $route GET api/users/test
// @desc 返回請求的json數據
// @access public 任何人都可存取他
router.get("/test", (req, res) =>
    res.json(
        { msg: "login works" }
    )
)

module.exports = router;