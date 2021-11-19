"use-strict";
import dotenv from "dotenv";
import client from "./client";

dotenv.config();
const { RETHINKDB_DB }: any = process.env;

const initializer = async () => {
  //get all existing db
  const dblist = await client.dbList().run();

  //create jaydb if not exist
  if (!dblist.includes(RETHINKDB_DB)) await client.dbCreate(RETHINKDB_DB).run();

  //get all existing tables
  const tablelist = await client.tableList().run();

  //create users table if not exist
  if (!tablelist.includes("users")) await client.tableCreate("users").run();
  if (!tablelist.includes("logins")) await client.tableCreate("logins").run();

  //create posts table if not exist
  // if (!tablelist.includes("posts")) await client.tableCreate("posts").run();

  //get all index of posts
  // const post_indexes = await client.table("posts").indexList().run();

  //create index user_id if not exist
  // if (!post_indexes.includes("user_id"))
  // await client.table("posts").indexCreate("user_id").run();
};
export default initializer;
