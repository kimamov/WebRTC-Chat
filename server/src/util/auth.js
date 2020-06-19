const passport = require("passport");
const LocalStrategy = require("passport-local");
import { User } from "../entity/User";
import { getRepository } from "typeorm";
import bcrypt from "bcrypt";

module.exports = new LocalStrategy(async (username, password, done) => {
  try {
    const userRepo = getRepository(User);
    const user = await userRepo.findOne({ username: username });
    await bcrypt.compare(password, user.password);
    return done(null, user);
  } catch (e) {
    console.log(e);
    return done(null, false, {
      message: "invalid credentials",
    });
  }
});
