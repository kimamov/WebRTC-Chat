const http = require('http');
const WebSocket = require('ws');
const url = require('url');
const express = require('express');
const session = require('express-session');
const auth = require('./util/auth');
const passport = require('passport');
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

function getDataAsync(request) {
    return new Promise((resolve, reject) => setTimeout(() => {
        nameFromQuery(request) === "kantemir" ? resolve("succesfully connected") : reject("failed")
    }, 500));
}

const wss = new WebSocket.Server({
    noServer: true,
    clientTracking: true
});
wss.on('connection', (ws, request, data) => {
    const userName = nameFromQuery(request);
    ws.userName = userName;
    ws.send(data);
    ws.on('message', data => {
        console.log(data);
        ws.send(data);
    })
});

function nameFromQuery(request) {
    const myUrl = url.parse(request.url);
    const params = new URLSearchParams(myUrl.search);
    return params.get("username")
}

const server = app.listen(PORT, e => {
    if (e) return console.log(e)
    console.log(`server listening on port ${PORT}`)
});

server.on('upgrade', async (request, socket, head) => {
    let data;

    try {
        data = await getDataAsync(request);
    } catch (error) {
        const res = new http.ServerResponse({
            httpVersionMajor: 1,
            httpVersionMinor: 1
        });

        res.assignSocket(socket);
        res.shouldKeepAlive = false;

        res.on('finish', () => {
            res.detachSocket(socket); // Not strictly needed.
            socket.destroySoon();
        });

        res.writeHead(500, 'internal server error');
        res.end();
        return;
    }

    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request, data);
    });
});


app.get(
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