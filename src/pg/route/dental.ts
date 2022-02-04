import AuthController from "../controller/auth";
import PatientController from "../controller/patient";
import interceptor from "../service/interceptor";
import express from "express";
import AdminController from "../controller/admin";

const dental = express.Router();

dental.post("/register", AuthController.siginUp);
dental.post("/login", AuthController.login);
dental.post("/patient/book", interceptor, PatientController.addAppointment);
dental.delete("/patient/appointment/:id",interceptor,AdminController.deletAppointmentById);
dental.get("/patient/appointments/:id", interceptor, PatientController.getAllAppointment)
dental.get("/patient/notifications/:id", interceptor, PatientController.getNotification)
dental.delete("/patient/notifications/:id", interceptor, PatientController.deleteNotification)

dental.get("/admin/accounts", interceptor, AdminController.getAccounts)
dental.put("/admin/tooth", interceptor, AdminController.updateToothRecord)
dental.get("/admin/patients", interceptor, AdminController.getAllPatients);
dental.get("/admin/appointments/:status",interceptor,AdminController.getAllAppointmentByStatus);
dental.put("/admin/appointment/:id/:personId",interceptor,AdminController.updateAppointmentById);
dental.get("/admin/medicalrecords/:personId", interceptor, AdminController.getMedicalRecord)
dental.get("/admin/tooth/:personId", interceptor, AdminController.getToothRecord)

export default dental;
