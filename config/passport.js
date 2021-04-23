
// 用來驗證jwt
const JwtStrategy  = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt') // module.ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model("users")
const keys = require("./keys")

// option來控制從request或verified的token該如何被萃取
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
// secretOrKey也是用來驗證jwt signature
opts.secretOrKey = keys.secretOrKey

module.exports = passport => {
    passport.use( new JwtStrategy(opts, (jwt_payload, done) => {
        console.log(jwt_payload);
        User.findById(jwt_payload.id)
            .then(user => {
                if (!user) return done(null, false)
                return done(null,user)
            })
            .catch((err) => console.log(err))
    }))
}