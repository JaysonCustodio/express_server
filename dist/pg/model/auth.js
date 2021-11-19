"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_config_1 = __importDefault(require("../../config/pg_config"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthModel {
    static async signUp(person) {
        try {
            const { firstname, lastname, middlename, occupation, sex, mobileno, address, religion, telnumber, email, nationality, dateofbirth, password, username, } = person;
            //create connection
            const client = await pg_config_1.default.connect();
            const where_email = `SELECT personid  FROM public.person where email = '${email}';`;
            const { rows } = await client.query(where_email);
            //check email if already taken
            if (rows.length)
                return { message: "email is already taken" };
            //encrpyt password
            const encrpyt_password = await bcryptjs_1.default.hash(password, 10);
            const sql = `INSERT INTO person (dateofbirth, address, email, firstname, lastname, middlename, mobileno, nationality, occupation, religion, sex, telnumber)
                    VALUES ('${dateofbirth}', '${address}', 
                    '${email}', '${firstname}', 
                    '${lastname}', '${middlename}', 
                    '${mobileno}', '${nationality}', 
                    '${occupation}', '${religion}', 
                    '${sex}', '${telnumber}');`;
            //insert person
            await client.query(sql);
            //get personid of inserted person
            const { rows: rows_person = [] } = await client.query(where_email);
            const person_id = rows_person[0].personid;
            const sql_inser_user = `INSERT INTO users(password, username, personid, in_active) VALUES 
      ('${encrpyt_password}', '${username}', ${parseInt(person_id)}, false);`;
            //insert to user table
            await client.query(sql_inser_user);
            const sql_where_username = `select * from users where username = '${username}'`;
            //get user_id
            const { rows: user = [] } = await client.query(sql_where_username);
            const user_id = user[0].id;
            const sql_insert_user_role = `INSERT INTO user_roles(user_id, role_id) VALUES (${user_id}, ${1});`;
            //insert to user_role
            await client.query(sql_insert_user_role);
            const token = jsonwebtoken_1.default.sign({ username, user_id }, process.env.TOKEN_KEY, {
                expiresIn: "3h",
            });
            client.release();
            return {
                success: true,
                payload: { username, user_id, token },
                message: "succesfully registered",
            };
        }
        catch (error) {
            return error;
        }
    }
    static async signIn({ username, password }) {
        try {
            if (!(username && password)) {
                return { success: false, message: "all inputs are required" };
            }
            const sql_where_username = `SELECT * from users WHERE username='${username}'`;
            const client = await pg_config_1.default.connect();
            const { rows = [] } = await client.query(sql_where_username);
            if (!rows.length)
                return { success: false, message: "invalid username" };
            const user = rows[0];
            const valid = await bcryptjs_1.default.compare(password, user.password);
            if (!valid)
                return { success: false, message: "invalid password" };
            const token = jsonwebtoken_1.default.sign({ username, user_id: user.id }, process.env.TOKEN_KEY, {
                expiresIn: "3h",
            });
            const sql_role = `SELECT * FROM user_roles u INNER JOIN roles r ON u.role_id = r.id  WHERE u.user_id = ${user.id}`;
            const { rows: role = [] } = await client.query(sql_role);
            return {
                success: true,
                payload: { username, user_id: user.id, role: role[0].name, token },
                message: "successfully login",
            };
        }
        catch (error) {
            return error;
        }
    }
}
exports.default = AuthModel;
