import { uuid } from "uuidv4";
import { IToothRecord, IUser } from "./../schema/interfaces";
import client from "../../config/client";
import twilioClient from "../../config/twilio";

const { TWILLIO_NUMBER = "+18593747403" } = process.env
export default class AdminModel {
  static async sendTextMessage({ personId, message } : any) {
    try {
      const person : any = await client.table("person").get(personId).run()
      const objmessage = {
        from : TWILLIO_NUMBER,
        to : person.mobileno,
        body : message
      }
      await twilioClient.messages.create(objmessage);
      return {
        success: true
      }
    } catch (error:any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
  static async addTreatment(treatment: IToothRecord) {
    try {
      await client.table("treatmentrecord").insert(treatment).run()
      return {
        success: true
      }
    } catch (error:any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
  static async getAllTreatmentRecord() {
    try {
      const treatments = await client.table('treatmentrecord').run()
      return treatments
    } catch (error) {
      console.log('@error', error);
    }
  }
  static async getTreatmentRecord(personId: string) {
    try {
      const treatments = await client.table('treatmentrecord').filter({personId : personId}).run()
      return treatments
    } catch (error) {
      console.log('@error', error);
    }
  }
  static async deletePatient(id: string) {
    try {
      await client.table("person").get(id).delete().run();
      return {
        success: true,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
  static async deleteAccount(id: string) {
    try {
      await client.table("user").get(id).delete().run();
      return {
        success: true,
        message: "succesfully deleted!",
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
  static async addPatientRecord(patient: any, medical: any) {
    try {
      const id = uuid();
      const type = "patient";
      await client
        .table("person")
        .insert({ ...patient, id, type })
        .run();
      await client
        .table("medical")
        .insert({ ...medical, personId: id })
        .run();
      return {
        success: true,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
  static async addAccounts(account: IUser) {
    try {
      await client.table("user").insert(account).run();
      return {
        success: true,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
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
      const accounts = await client.table("user").run();
      return accounts;
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
      await client
        .table("toothrecord")
        .get(trecords[0].id)
        .update({
          ...trecords[0],
          ...tooth,
        })
        .run();
      return {
        success: true,
      };
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
      const app : any = await client.table("appointment").get(id).run()
      if (personId) {
        const person : any = await client.table("person").get(personId).run()
        await client
          .table("notification")
          .insert({
            personId,
            message: `Hi ${person.firstname} ${person.lastname}, 
            Your appointment on ${app.appointmentDate} at ${app.session} has been approved, please come on time, Thank you!`,
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
