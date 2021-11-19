import Pool from "../../config/pg_config";

export default class AdminModel {
  static async getAppointmentByStatus(status: string) {
    try {
      const client = await Pool.connect();
      const sql_status = `SELECT * FROM appointment where status = '${status}'`;
      const { rows } = await client.query(sql_status);
      client.release();
      return { success: true, payload: rows };
    } catch (error: any) {
      return { success: false, payload: error.message };
    }
  }
  static async getAllPatients() {
    try {
      const client = await Pool.connect();
      const sql_status = `SELECT * FROM appointment where status = '${status}'`;
      const { rows } = await client.query(sql_status);
      client.release();
      return { success: true, payload: rows };
    } catch (error: any) {
      return { success: false, payload: [], message: error.message };
    }
  }
  static async deleteAppointmentById(id: number) {
    try {
      const client = await Pool.connect();
      const sql_status = `DELETE FROM appointment WHERE appointmentid = ${id};`;
      await client.query(sql_status);
      client.release();
      return {
        success: true,
        payload: { appointmentid: id },
        message: `Appointment id ${id} succesfully deleted`,
      };
    } catch (error) {
      return {
        success: false,
        payload: { appointmentid: id },
        message: `Internal Server Error`,
      };
    }
  }
  static async updateAppointmentById(id: number) {
    try {
      const client = await Pool.connect();
      const sql = `UPDATE appointment SET status = 'approve' WHERE appointmentid = ${id};`;
      await client.query(sql);
      client.release();
      return {
        success: true,
        payload: { appointmentid: id },
        message: `Appointment id ${id} succesfully approve`,
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
