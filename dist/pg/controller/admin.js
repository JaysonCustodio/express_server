"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_1 = __importDefault(require("../model/admin"));
const AdminController = {
    getAllTreatmentRecord: async (_, res) => {
        const result = await admin_1.default.getAllTreatmentRecord();
        res.json(result);
    },
    getTreatmentRecord: async ({ params }, res) => {
        const result = await admin_1.default.getTreatmentRecord(params.id);
        res.json(result);
    },
    addTreatmentRecord: async ({ body }, res) => {
        const result = await admin_1.default.addTreatment(body);
        res.json(result);
    },
    addPatientMedicalRecord: async ({ body }, res) => {
        const result = await admin_1.default.addPatientRecord(body.patient, body.medical);
        res.json(result);
    },
    deletePatient: async ({ params }, res) => {
        const result = await admin_1.default.deletePatient(params.id);
        res.json(result);
    },
    deleteAccount: async ({ params }, res) => {
        const result = await admin_1.default.deleteAccount(params.id);
        res.json(result);
    },
    updateToothRecord: async ({ body }, res) => {
        const result = await admin_1.default.updatePatientTooth(body);
        res.json(result);
    },
    addtAccount: async ({ body }, res) => {
        const result = await admin_1.default.addAccounts(body);
        res.json(result);
    },
    getAccounts: async (_, res) => {
        const result = await admin_1.default.getAccounts();
        res.json(result);
    },
    getToothRecord: async ({ params }, res) => {
        const result = await admin_1.default.getToothRecord(params.personId);
        res.json(result);
    },
    getAllAppointmentByStatus: async ({ params }, res) => {
        const result = await admin_1.default.getAppointmentByStatus(params.status);
        res.json(result);
    },
    deletAppointmentById: async ({ params }, res) => {
        const result = await admin_1.default.deleteAppointmentById(params.id);
        res.json(result);
    },
    updateAppointmentById: async ({ params }, res) => {
        const result = await admin_1.default.updateAppointmentById(params.id, params.personId);
        res.json(result);
    },
    getAllPatients: async (req, res) => {
        const result = await admin_1.default.getAllPatients();
        res.json(result);
    },
    getMedicalRecord: async ({ params }, res) => {
        const result = await admin_1.default.getMedicatlRecords(params.personId);
        res.json(result);
    },
    sendMessage: async ({ body }, res) => {
        const result = await admin_1.default.sendTextMessage(body);
        res.json(result);
    }
};
exports.default = AdminController;
