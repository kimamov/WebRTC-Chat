import { createConnection } from "typeorm";
import { User } from "./entity/User";

createConnection()
  .then(async (connection) => {
    // setup server once connection to the database is created
    const express = require("express");
    const session = require("express-session");
    const cors = require("cors");
    const auth = require("./util/auth");
    const passport = require("passport");
    const routes = require("./routes/routes");
    const initSocketServer = require("./socket/socket");
    const PORT = 5000;

    const app = express();

    // setup express middlewares
    app.use(
      session({
        secret: "nyana",
        resave: true,
        saveUninitialized: true,
      })
    );
    app.use(
      cors({
        origin: ["http://localhost:3000", "localhost:3000"],
      })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.json());
    app.use(express.urlencoded());
    //setup passport middlewares
    passport.use(auth);
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });
    passport.deserializeUser((userId, done) => {
      const user = connection.getRepository(User);
      user
        .findOne(userId)
        .then((data) => done(null, data))
        .catch((error) => done(error));
    });
    //setup routes
    app.use(routes);

    // express server listen on PORT
    const server = app.listen(PORT, (e: Error) => {
      if (e) return console.log(e);
      console.log(`server listening on port ${PORT}`);
    });

    // create websocket server
    const ws = initSocketServer(server);
  })
  .catch((error) => console.log(error));
