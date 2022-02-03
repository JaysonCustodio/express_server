"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patient_1 = __importDefault(require("../model/patient"));
const PatientController = {
    getAllPatient: async (req, res) => {
        const result = await patient_1.default.getAllPatient();
        res.json(result);
    },
    getAllAppointment: async ({ params }, res) => {
        const result = await patient_1.default.getAllApointment(params.id);
        res.json(result);
    },
    addAppointment: async ({ body }, res) => {
        const result = await patient_1.default.bookAppoitment(body);
        res.json(result);
    },
    getNotification: async ({ params }, res) => {
        const result = await patient_1.default.getNotification(params.id);
        res.json(result);
    },
    deleteNotification: async ({ params }, res) => {
        const result = await patient_1.default.deleteNotification(params.id);
        res.json(result);
    }
};
exports.default = PatientController;
