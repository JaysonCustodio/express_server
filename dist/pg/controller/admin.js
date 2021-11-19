"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_1 = __importDefault(require("../model/admin"));
const AdminController = {
    getAllAppointmentByStatus: async ({ params }, res) => {
        const result = await admin_1.default.getAppointmentByStatus(params.status);
        res.json(result);
    },
    deletAppointmentById: async ({ params }, res) => {
        const result = await admin_1.default.deleteAppointmentById(params.id);
        res.json(result);
    },
    updateAppointmentById: async ({ params }, res) => {
        console.log("@@params", params);
        const result = await admin_1.default.updateAppointmentById(params.id);
        res.json(result);
    },
};
exports.default = AdminController;
