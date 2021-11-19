"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_config_1 = __importDefault(require("../../config/pg_config"));
class AdminModel {
    static async getAppointmentByStatus(status) {
        try {
            const client = await pg_config_1.default.connect();
            const sql_status = `SELECT * FROM appointment where status = '${status}'`;
            const { rows } = await client.query(sql_status);
            client.release();
            return { success: true, payload: rows };
        }
        catch (error) {
            return { success: false, payload: error.message };
        }
    }
    static async getAllPatients() {
        try {
            const client = await pg_config_1.default.connect();
            const sql_status = `SELECT * FROM appointment where status = '${status}'`;
            const { rows } = await client.query(sql_status);
            client.release();
            return { success: true, payload: rows };
        }
        catch (error) {
            return { success: false, payload: [], message: error.message };
        }
    }
    static async deleteAppointmentById(id) {
        try {
            const client = await pg_config_1.default.connect();
            const sql_status = `DELETE FROM appointment WHERE appointmentid = ${id};`;
            await client.query(sql_status);
            client.release();
            return {
                success: true,
                payload: { appointmentid: id },
                message: `Appointment id ${id} succesfully deleted`,
            };
        }
        catch (error) {
            return {
                success: false,
                payload: { appointmentid: id },
                message: `Internal Server Error`,
            };
        }
    }
    static async updateAppointmentById(id) {
        try {
            const client = await pg_config_1.default.connect();
            const sql = `UPDATE appointment SET status = 'approve' WHERE appointmentid = ${id};`;
            await client.query(sql);
            client.release();
            return {
                success: true,
                payload: { appointmentid: id },
                message: `Appointment id ${id} succesfully approve`,
            };
        }
        catch (error) {
            return {
                success: false,
                payload: { appointmentid: id },
                message: `Internal Server Error`,
            };
        }
    }
}
exports.default = AdminModel;
