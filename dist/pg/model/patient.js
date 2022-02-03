"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../config/client"));
const pg_config_1 = __importDefault(require("../../config/pg_config"));
class PatientModel {
    static async getAllApointment(id) {
        try {
            const appointments = await client_1.default.table("appointment").filter({ personId: id }).run();
            return appointments;
        }
        catch (error) {
            console.log('@error', error);
        }
    }
    static async getAllAppointmentByStatus(status) {
        try {
        }
        catch (error) {
            console.log('@error', error);
        }
    }
    static async getNotification(id) {
        try {
            const notis = await client_1.default.table("notification").filter({ personId: id }).run();
            return notis;
        }
        catch (error) {
        }
    }
    static async getAllPatient() {
        try {
            const client = await pg_config_1.default.connect();
            const sql = "SELECT * FROM person INNER JOIN patient ON person.personid = patient.personid";
            const { rows } = await client.query(sql);
            client.release();
            return { success: true, payload: rows };
        }
        catch (error) {
            console.log("@@@error : ", error);
        }
    }
    static async bookAppoitment(appointment) {
        try {
            const date = new Date(appointment.appointmentDate);
            const curr = new Date();
            if (date < curr)
                return { status: "invalid date" };
            await client_1.default.table("appointment").insert(appointment).run();
            return { status: "okay" };
        }
        catch (error) {
            console.log("@@@error : ", error);
        }
    }
    static async deleteNotification(id) {
        try {
            await client_1.default.table("notification").get(id).delete().run();
            return {
                success: true,
                message: "successfully deleted!"
            };
        }
        catch (error) {
            console.log("@@@error del notification :", error);
            return {
                success: false,
                message: "server error!"
            };
        }
    }
}
exports.default = PatientModel;
