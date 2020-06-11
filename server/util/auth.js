const passport = require('passport');
const LocalStrategy = require('passport-local');

module.exports = new LocalStrategy(
    (username, password, done) => {
        if (username === "kantemir" && password === "kantemir") {
            return done(null, {
                id: '111351351',
                username: "kantemir",
                data: "test"
            })
        }
        return done(null, false, {
            message: "invalid credentials"
        })
    }
)