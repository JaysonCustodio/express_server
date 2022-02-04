import { IToothRecord } from "./../schema/interfaces";
import client from "../../config/client";

export default class AdminModel {
  static async getToothRecord(personId: string) {
    try {
      const records = await client
        .table("toothrecord")
        .filter({ personId: personId })
        .run();
      return records;
    } catch (error) {
      console.log("@error medicalrecords", error);
    }
  }
  static async getAccounts() {
    try {
      const accounts = await client.table("user").run()
      return accounts
    } catch (error) {
      console.log("@error get all accounts", error);
    }
  }

  static async getMedicatlRecords(personId: string) {
    try {
      const records = await client
        .table("medical")
        .filter({ personId: personId })
        .run();
      return records;
    } catch (error) {
      console.log("@error medicalrecords", error);
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
      const patients = await client
        .table("person")
        .filter({ type: "patient" })
        .run();
      return { success: true, payload: patients };
    } catch (error: any) {
      return { success: false, payload: [], message: error.message };
    }
  }
  static async deleteAppointmentById(id: number) {
    try {
      await client.table("appointment").get(id).delete().run();
      return {
        message: "succesfully deleted",
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        payload: { appointmentid: id },
        message: `Internal Server Error`,
      };
    }
  }
  static async updatePatientTooth(tooth: IToothRecord) {
    try {
      const trecords: any = await client
        .table("toothrecord")
        .filter({ personId: tooth.personId, toothNo: tooth.toothNo })
        .run();
            
        if (!trecords.length) {
        await client.table("toothrecord").insert(tooth).run();
        return {
          success: true,
        };
      }
      await client.table("toothrecord").get(trecords[0].id).update({
        ...trecords[0],
        ...tooth
      }).run()
      return {
        success: true
      }

    } catch (error) {
      console.log("@@@error : ", error);
      return {
        success: false,
      };
    }
  }
  static async updateAppointmentById(id: number, personId?: string) {
    try {
      await client
        .table("appointment")
        .get(id)
        .update({ status: "approve" })
        .run();
      if (personId) {
        await client
          .table("notification")
          .insert({
            personId,
            message:
              "Thank you for booking, Your appointment has been approved",
          })
          .run();
      }
      return {
        success: true,
        message: "good",
      };
    } catch (error) {
      return {
        success: false,
        payload: { appointmentid: id },
        message: `Internal Server Error`,
      };
    }
  }
}
