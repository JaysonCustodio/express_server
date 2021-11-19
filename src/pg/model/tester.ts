import Pool from "../../config/pg_config";

const main = async () => {
  try {
    const client = await Pool.connect();
    const { rows: roles } = await client.query("select * from roles");
    const { rows: user_roles } = await client.query("select * from user_roles");
    const { rows: users } = await client.query("select * from users");
    console.log("@@@ roles ", roles);
    console.log("@@@ user_roles", user_roles);
    console.log("@@@ users ", users);
    client.release();
  } catch (error) {
    console.log("@@@ error : ", error);
  }
};

export default main;
