const router = require("express").Router();
const passport = require("passport");
import { createUser } from "../controllers/userController";

// checkAuth middleware checks if the current requests is authenticated
function checkAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  next("request not authenticated");
}

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/asd",
  }),
  async (req, res) => {
    req.session.myUser = "hello world";
    console.log(req.session);
    console.log("login hit");
    res.send("you logged in successfully");
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("successfully logged out");
});

router.get("/testuser", (req, res) => {
  console.log(req.session);
  console.log(req.isAuthenticated());
  res.send("got user");
});

router.post("/signup", async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      // if no user / password found dont bother trying to signup
      return res.status(500).send("no username or password found");
    }
    const user = await createUser(userName, password);
    return res.status(201).send("succesfully created user: " + user);
  } catch (e) {
    // status conflict most likely user with that name already exists
    res.status(409).send(e);
  }
});

module.exports = router;
