import client from "../../config/client";
import Pool from "../../config/pg_config";

export default class AdminModel {
  static async getToothRecord(personId: string) {
    try {
      console.log("personId2@@@@", personId);
      
     const records = await client.table("toothrecord").filter({personId: personId }).run()
     return records
    } catch (error) {
      console.log('@error medicalrecords', error);
    }    
  }

  static async getMedicatlRecords(personId: string) {
    try {
     const records = await client.table("medical").filter({personId: personId }).run()
     return records
    } catch (error) {
      console.log('@error medicalrecords', error);
    }    
  }
  static async getAppointmentByStatus(status: string) {
    try {
      const apps = await client
        .table("appointment")
        .filter({ status: status })
        .run();
      return apps;
    } catch (error: any) {
      return { success: false, payload: error.message };
    }
  }
  static async getAllPatients() {
    try {
      const patients = await client.table("person").filter({type:"patient"}).run()
      return { success: true, payload: patients };
    } catch (error: any) {
      return { success: false, payload: [], message: error.message };
    }
  }
  static async deleteAppointmentById(id: number) {
    try {
      await client.table("appointment").get(id).delete().run()
      return {
        message: "succesfully deleted",
        success: true
      }
    
    } catch (error) {
      return {
        success: false,
        payload: { appointmentid: id },
        message: `Internal Server Error`,
      };
    }
  }
  static async updateAppointmentById(id: number, personId? : string) {
    try {
      
      await client.table("appointment").get(id).update({status: "approve"}).run()
      if(personId){
        await client.table("notification").insert({
          personId,
          message: "Thank you for booking, Your appointment has been approved"
        }).run()
      }
      return {
        success: true,
        message: "good"
      }

    } catch (error) {
      return {
        success: false,
        payload: { appointmentid: id },
        message: `Internal Server Error`,
      };
    }
  }
}
