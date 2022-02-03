import Pool from "../../config/pg_config";
import { ERole, IPerson } from "../schema/interfaces";
import bycript from "bcryptjs";
import jwt from "jsonwebtoken";
import IUser from "../schema/user";
import client from "../../config/client";

export default class AuthModel {
  static async signUp(person: IPerson) {
    
  }
  static async signIn({ username, password }: IUser) {
    try {
      const user: any = await client.table("user").filter({ username }).run();
      if (!user.length) return "username not exist";
      if (password !== user[0].password) return "invalid password";

      const token = jwt.sign(
        { username, user_id: user[0]?.id },
        "MIKEY",
        {
          expiresIn: "3h",
        }
      );

      const person: any = await client
        .table("person")
        .filter({ id: user[0].personId })
        .run();

      return {
        ...person[0],
        token: token,
        roles: [user[0].role],
      };
    } catch (error) {
      return error;
    }
  }
}
