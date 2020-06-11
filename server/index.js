const express = require('express');
const session = require('express-session');
const auth = require('./util/auth');
const passport = require('passport');
const routes = require('./routes/routes');
const initSocketServer = require('./socket/socket');
const handleUpgrade = require('./socket/handleUpgrade');
const PORT = 5000;


const app = express();

// setup express middlewares
app.use(session({
    secret: "nyan",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
//setup passport middlewares
passport.use(auth)
passport.serializeUser((user, done) => {
    done(null, user.id);
})
//setup routes
app.use(routes);

// create websocket server

const server = app.listen(PORT, e => {
    if (e) return console.log(e)
    console.log(`server listening on port ${PORT}`)
});

const ws = initSocketServer(server);