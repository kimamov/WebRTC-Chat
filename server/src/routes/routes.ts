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

    res.send({
      message: "you logged in successfully",
      user: req.user,
    });
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
    const { username, password } = req.body;
    if (!username || !password) {
      // if no user / password found dont bother trying to signup
      return res.status(500).send("no username or password found");
    }
    const user = await createUser(username, password);
    return res.status(201).send("succesfully created user: " + user);
  } catch (e) {
    // status conflict most likely user with that name already exists
    res.status(409).send(e);
  }
});

module.exports = router;
