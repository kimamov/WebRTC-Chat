import * as bcrypt from "bcrypt";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

export async function createUser(userName: string, password: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const repo = getRepository(User);
      // check if user with that name already exists
      const foundUser = await repo.findOne({ where: { username: userName } });
      console.dir(foundUser);
      // if so you are done here
      if (foundUser) throw new Error("user already exists");
      // create password hash
      const hash = await bcrypt.hash(password, 10); // hash password for user
      // create new user
      const user = new User();
      user.username = userName;
      user.password = hash;
      // save user into the database
      await repo.save(user);
      resolve(userName);
    } catch (e) {
      // if anything fails dont give too much info
      console.log(e);
      reject("could not create user. Most likely the user already exists.");
    }
  });
}

export default createUser;
