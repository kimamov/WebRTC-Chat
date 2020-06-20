import * as bcrypt from "bcrypt";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

export async function createUser(userName: string, password: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = getRepository(User);
      await user.findOneOrFail({ username: userName }); // check if user already exists
      const hash = await bcrypt.hash(password, 10); // hash password for user
      await user.create({
        username: userName,
        password: hash,
      });
      resolve(userName);
    } catch (e) {
      console.log(e);
      reject("could not create user. Most likely the user already exists.");
    }
  });
}

export default {
  createUser,
};
