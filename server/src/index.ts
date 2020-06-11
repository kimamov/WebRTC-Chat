import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import * as bcrypt from 'bcrypt';


createConnection().then(async connection => {
    const saltRounds = 10;
    console.log("Inserting a new user into the database...");
    const user = new User();
    user.username = "Timber";
    user.password = await bcrypt.hash('kantemir', saltRounds);
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    // setup server once connection to the database is created
    const express = require('express');
    const session = require('express-session');
    const auth = require('./util/auth');
    const passport = require('passport');
    const routes = require('./routes/routes');
    const initSocketServer = require('./socket/socket');
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

    // express server listen on PORT
    const server = app.listen(PORT, (e: Error) => {
        if (e) return console.log(e)
        console.log(`server listening on port ${PORT}`)
    });

    // create websocket server
    const ws = initSocketServer(server);

}).catch(error => console.log(error));
