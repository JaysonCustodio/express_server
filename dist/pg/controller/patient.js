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
    bookAppoitment: async (req, res) => {
        const result = await patient_1.default.bookAppoitment(req.body);
        res.json(result);
    },
};
exports.default = PatientController;
