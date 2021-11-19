import client from "../config/client";
import IPost from "../schemas/post";

export default class PostModel {
  static getPost = (post_id: string) =>
    client.table("posts").get(post_id).run();

  static createPost(user_id: string, post: IPost) {
    return client
      .table("posts")
      .insert({
        ...post,
        user_id,
        created_date: new Date().toISOString(),
        updated_date: new Date().toISOString(),
      })
      .run();
  }

  static getAllPosts() {
    return client.table("posts").run();
  }

  static getAllUserPosts(user_id: string) {
    return client.table("posts").getAll(user_id, { index: "user_id" }).run();
  }

  static getUserPost(user_id: string, post_id: string) {
    return client
      .table("posts")
      .getAll(user_id, { index: "user_id" })
      .filter({ id: post_id })
      .run();
  }

  static updateUserPost(user_id: string, post_id: string, post: IPost) {
    return client
      .table("posts")
      .getAll(user_id, { index: "user_id" })
      .filter({ id: post_id })
      .update({
        ...post,
        updated_date: new Date().toISOString(),
      })
      .run();
  }

  static deleteUserPost(user_id: string, post_id: string) {
    return client
      .table("posts")
      .getAll(user_id, { index: "user_id" })
      .filter({ id: post_id })
      .delete()
      .run();
  }
}
