const router = require('express').Router();
const passport = require('passport');


router.get(
    '/login',
    passport.authenticate('local', {
        failureRedirect: '/asd',
        session: false
    }),
    async (req, res) => {
        req.session.myUser = "hello world";
        console.log(req.session);
        console.log("login hit");
        res.send('you logged in succesfully')
    })



module.exports = router;