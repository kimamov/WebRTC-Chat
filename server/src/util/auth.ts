const passport = require("passport");
const LocalStrategy = require("passport-local");
import { User } from "../entity/User";
import { getRepository } from "typeorm";
import * as bcrypt from "bcrypt";

module.exports = new LocalStrategy(async (username, password, done) => {
  try {
    const userRepo = getRepository(User);
    const user = await userRepo.findOneOrFail({ username: username });
    if (!(await bcrypt.compare(password, user.password))) {
      throw new Error("password not matching");
    }
    // no need to share the password
    delete user.password;
    return done(null, user);
  } catch (e) {
    console.log(e);
    return done(null, false, {
      message: "invalid credentials",
    });
  }
});
