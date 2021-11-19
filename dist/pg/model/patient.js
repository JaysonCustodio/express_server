"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_config_1 = __importDefault(require("../../config/pg_config"));
class PatientModel {
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
            const { appointmentDate, patientid, procedureName, session, status, isAdmin, } = appointment;
            const client = await pg_config_1.default.connect();
            const sql = `INSERT INTO appointment(appointmentdate, patientid, procedurename, session, status, is_admin, notification_flag )
                   VALUES ('${appointmentDate}', ${patientid}, '${procedureName}', '${session}', '${status}', ${isAdmin}, '${1}')`;
            const { command } = await client.query(sql);
            client.release();
            return { success: true, payload: { command, status: "good" } };
        }
        catch (error) {
            console.log("@@@error : ", error);
        }
    }
}
exports.default = PatientModel;
