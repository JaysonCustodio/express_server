"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuidv4_1 = require("uuidv4");
const client_1 = __importDefault(require("../../config/client"));
const twilio_1 = __importDefault(require("../../config/twilio"));
const { TWILLIO_NUMBER = "+18593747403" } = process.env;
class AdminModel {
    static async sendTextMessage({ personId, message }) {
        try {
            const person = await client_1.default.table("person").get(personId).run();
            const objmessage = {
                from: TWILLIO_NUMBER,
                to: person.mobileno,
                body: message
            };
            await twilio_1.default.messages.create(objmessage);
            return {
                success: true
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }
    static async addTreatment(treatment) {
        try {
            await client_1.default.table("treatmentrecord").insert(treatment).run();
            return {
                success: true
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }
    static async getAllTreatmentRecord() {
        try {
            const treatments = await client_1.default.table('treatmentrecord').run();
            return treatments;
        }
        catch (error) {
            console.log('@error', error);
        }
    }
    static async getTreatmentRecord(personId) {
        try {
            const treatments = await client_1.default.table('treatmentrecord').filter({ personId: personId }).run();
            return treatments;
        }
        catch (error) {
            console.log('@error', error);
        }
    }
    static async deletePatient(id) {
        try {
            await client_1.default.table("person").get(id).delete().run();
            return {
                success: true,
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
    static async deleteAccount(id) {
        try {
            await client_1.default.table("user").get(id).delete().run();
            return {
                success: true,
                message: "succesfully deleted!",
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
    static async addPatientRecord(patient, medical) {
        try {
            const id = uuidv4_1.uuid();
            const type = "patient";
            await client_1.default
                .table("person")
                .insert(Object.assign(Object.assign({}, patient), { id, type }))
                .run();
            await client_1.default
                .table("medical")
                .insert(Object.assign(Object.assign({}, medical), { personId: id }))
                .run();
            return {
                success: true,
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
    static async addAccounts(account) {
        try {
            await client_1.default.table("user").insert(account).run();
            return {
                success: true,
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
    static async getToothRecord(personId) {
        try {
            const records = await client_1.default
                .table("toothrecord")
                .filter({ personId: personId })
                .run();
            return records;
        }
        catch (error) {
            console.log("@error medicalrecords", error);
        }
    }
    static async getAccounts() {
        try {
            const accounts = await client_1.default.table("user").run();
            return accounts;
        }
        catch (error) {
            console.log("@error get all accounts", error);
        }
    }
    static async getMedicatlRecords(personId) {
        try {
            const records = await client_1.default
                .table("medical")
                .filter({ personId: personId })
                .run();
            return records;
        }
        catch (error) {
            console.log("@error medicalrecords", error);
        }
    }
    static async getAppointmentByStatus(status) {
        try {
            const apps = await client_1.default
                .table("appointment")
                .filter({ status: status })
                .run();
            return apps;
        }
        catch (error) {
            return { success: false, payload: error.message };
        }
    }
    static async getAllPatients() {
        try {
            const patients = await client_1.default
                .table("person")
                .filter({ type: "patient" })
                .run();
            return { success: true, payload: patients };
        }
        catch (error) {
            return { success: false, payload: [], message: error.message };
        }
    }
    static async deleteAppointmentById(id) {
        try {
            await client_1.default.table("appointment").get(id).delete().run();
            return {
                message: "succesfully deleted",
                success: true,
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
    static async updatePatientTooth(tooth) {
        try {
            const trecords = await client_1.default
                .table("toothrecord")
                .filter({ personId: tooth.personId, toothNo: tooth.toothNo })
                .run();
            if (!trecords.length) {
                await client_1.default.table("toothrecord").insert(tooth).run();
                return {
                    success: true,
                };
            }
            await client_1.default
                .table("toothrecord")
                .get(trecords[0].id)
                .update(Object.assign(Object.assign({}, trecords[0]), tooth))
                .run();
            return {
                success: true,
            };
        }
        catch (error) {
            console.log("@@@error : ", error);
            return {
                success: false,
            };
        }
    }
    static async updateAppointmentById(id, personId) {
        try {
            await client_1.default
                .table("appointment")
                .get(id)
                .update({ status: "approve" })
                .run();
            const app = await client_1.default.table("appointment").get(id).run();
            if (personId) {
                const person = await client_1.default.table("person").get(personId).run();
                await client_1.default
                    .table("notification")
                    .insert({
                    personId,
                    message: `Hi ${person.firstname} ${person.lastname}, 
            Your appointment on ${app.appointmentDate} at ${app.session} has been approved, please come on time, Thank you!`,
                })
                    .run();
            }
            return {
                success: true,
                message: "good",
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
