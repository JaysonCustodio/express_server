import AuthController from "../controller/auth";
import PatientController from "../controller/patient";
import interceptor from "../service/interceptor";
import express from "express";
import AdminController from "../controller/admin";

const dental = express.Router();

dental.post("/register", AuthController.siginUp);
dental.post("/login", AuthController.login);
dental.post("/patient/book", interceptor, PatientController.bookAppoitment);
dental.get("/admin/patients", interceptor, PatientController.getAllPatient);
dental.get(
  "/admin/appointment/:status",
  interceptor,
  AdminController.getAllAppointmentByStatus
);
dental.delete(
  "/admin/appointment/:id",
  interceptor,
  AdminController.deletAppointmentById
);
dental.put(
  "/admin/appointment/:id",
  interceptor,
  AdminController.updateAppointmentById
);

export default dental;
