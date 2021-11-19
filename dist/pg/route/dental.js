"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("../controller/auth"));
const patient_1 = __importDefault(require("../controller/patient"));
const interceptor_1 = __importDefault(require("../service/interceptor"));
const express_1 = __importDefault(require("express"));
const admin_1 = __importDefault(require("../controller/admin"));
const dental = express_1.default.Router();
dental.post("/register", auth_1.default.siginUp);
dental.post("/login", auth_1.default.login);
dental.post("/patient/book", interceptor_1.default, patient_1.default.bookAppoitment);
dental.get("/admin/patients", interceptor_1.default, patient_1.default.getAllPatient);
dental.get("/admin/appointment/:status", interceptor_1.default, admin_1.default.getAllAppointmentByStatus);
dental.delete("/admin/appointment/:id", interceptor_1.default, admin_1.default.deletAppointmentById);
dental.put("/admin/appointment/:id", interceptor_1.default, admin_1.default.updateAppointmentById);
exports.default = dental;
