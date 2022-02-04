"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../config/client"));
class AdminModel {
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
            await client_1.default.table("toothrecord").get(trecords[0].id).update(Object.assign(Object.assign({}, trecords[0]), tooth)).run();
            return {
                success: true
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
            if (personId) {
                await client_1.default
                    .table("notification")
                    .insert({
                    personId,
                    message: "Thank you for booking, Your appointment has been approved",
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
