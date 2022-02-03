import { IAppointment } from './../schema/interfaces';
import client from "../../config/client";
import Pool from "../../config/pg_config";

export default class PatientModel {

  static async getAllApointment(id: string) {
    try {
      const appointments = await client.table("appointment").filter({personId : id}).run()      
      return appointments      
    } catch (error) {
      console.log('@error', error);
    }
  }

  static async getAllAppointmentByStatus(status: string){
    try {
      
    } catch (error) {
      console.log('@error', error);
    }
  }

  static async getNotification(id: string) {
    try {
      const notis = await client.table("notification").filter({personId: id }).run()
      return notis
    } catch (error) {
      
    }
  }

  static async getAllPatient() {
    try {
      const client = await Pool.connect();
      const sql =
        "SELECT * FROM person INNER JOIN patient ON person.personid = patient.personid";
      const { rows } = await client.query(sql);
      client.release();
      return { success: true, payload: rows };
    } catch (error) {
      console.log("@@@error : ", error);
    }
  }
  static async bookAppoitment(appointment: IAppointment) {
    try {
      const date = new Date(appointment.appointmentDate)
      const curr = new Date()
      if(date < curr) return { status : "invalid date" }
      await client.table("appointment").insert(appointment).run()
      return { status: "okay"}
    } catch (error) {
      console.log("@@@error : ", error);
    }
  }
  static async deleteNotification(id: string) {
    try {
      await client.table("notification").get(id).delete().run()
      return {
        success: true,
        message: "successfully deleted!"
      }
    } catch (error) {
        console.log("@@@error del notification :", error);
        return {
          success: false,
          message: "server error!"
        }
    }
  }
}
