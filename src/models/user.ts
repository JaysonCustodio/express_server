import IUser from "../schemas/user";
import client from "../config/client";
const { RETHINKDB_DB }: any = process.env;

export default class UserModel {
  static createUser(user: IUser) {
    return client
      .table("users")
      .insert({
        ...user,
        created_date: new Date().toISOString(),
        updated_date: new Date().toISOString(),
      })
      .run();
  }

  static loginUser(loginCredentials: any) {
    return client.table("logins").filter(loginCredentials).run();
  }

  static getUser(id: string) {
    return client.table("users").get(id).run();
  }

  static getAllUsers() {
    return client.db(RETHINKDB_DB).table("users").run();
  }

  static updateUser(id: string, new_user: IUser) {
    return client
      .table("users")
      .get(id)
      .update({
        ...new_user,
        updated_date: new Date().toISOString(),
      })
      .run();
  }
  static deleteUser(id: string) {
    return client.table("users").get(id).delete().run();
  }
}
