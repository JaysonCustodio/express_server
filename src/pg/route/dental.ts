import AuthController from "../controller/auth";
import PatientController from "../controller/patient";
import interceptor from "../service/interceptor";
import express from "express";
import AdminController from "../controller/admin";

const dental = express.Router();

dental.post("/register", AuthController.siginUp);
dental.post("/login", AuthController.login);
dental.post("/patient/book", interceptor, PatientController.addAppointment);
dental.get("/patient/appointments/:id", interceptor, PatientController.getAllAppointment)   
dental.get("/patient/notifications/:id", interceptor, PatientController.getNotification)
dental.delete("/patient/appointment/:id",interceptor,AdminController.deletAppointmentById);
dental.delete("/patient/notifications/:id", interceptor, PatientController.deleteNotification)

dental.delete("/admin/patient/:id", interceptor, AdminController.deletePatient)
dental.delete("/admin/accounts/:id", interceptor, AdminController.deleteAccount)
dental.post("/admin/accounts", interceptor, AdminController.addtAccount)
dental.post("/admin/patientrecord", interceptor, AdminController.addPatientMedicalRecord)
dental.post("/admin/api/sms", interceptor, AdminController.sendMessage)
dental.post("/admin/treatmentrecord", interceptor, AdminController.addTreatmentRecord)
dental.put("/admin/tooth", interceptor, AdminController.updateToothRecord)
dental.put("/admin/appointment/:id/:personId",interceptor,AdminController.updateAppointmentById);
dental.get("/admin/accounts", interceptor, AdminController.getAccounts)
dental.get("/admin/billing", interceptor, AdminController.getAllTreatmentRecord)
dental.get("/admin/treatmentrecord/:id", interceptor, AdminController.getTreatmentRecord)
dental.get("/admin/patients", interceptor, AdminController.getAllPatients);
dental.get("/admin/appointments/:status",interceptor,AdminController.getAllAppointmentByStatus);
dental.get("/admin/medicalrecords/:personId", interceptor, AdminController.getMedicalRecord)
dental.get("/admin/tooth/:personId", interceptor, AdminController.getToothRecord)

export default dental;
