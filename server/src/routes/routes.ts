const router = require("express").Router();
const passport = require("passport");
import { createUser } from "../controllers/userController";

router.get(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/asd",
    session: false,
  }),
  async (req, res) => {
    req.session.myUser = "hello world";
    console.log(req.session);
    console.log("login hit");
    res.send("you logged in succesfully");
  }
);

router.post("/signup", async (req, res) => {
  try {
    const { userName, password } = req.body;
    console.log(req.body);
    if (!userName || !password) {
      return res.status(500).send("no username or password found");
    }
    const user = await createUser(userName, password);
    return res.send("succesfully created user: " + user);
  } catch (e) {
    res.status(409).send(e);
  }
});

module.exports = router;
