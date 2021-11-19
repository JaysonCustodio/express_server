import Pool from "../../config/pg_config";

export default class PatientModel {
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
  static async bookAppoitment(appointment: any) {
    try {
      const {
        appointmentDate,
        patientid,
        procedureName,
        session,
        status,
        isAdmin,
      } = appointment;
      const client = await Pool.connect();
      const sql = `INSERT INTO appointment(appointmentdate, patientid, procedurename, session, status, is_admin, notification_flag )
                   VALUES ('${appointmentDate}', ${patientid}, '${procedureName}', '${session}', '${status}', ${isAdmin}, '${1}')`;
      const { command } = await client.query(sql);
      client.release();
      return { success: true, payload: { command, status: "good" } };
    } catch (error) {
      console.log("@@@error : ", error);
    }
  }
}
