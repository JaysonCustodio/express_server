import AdminModel from "../model/admin";

const AdminController = {  
  getAllTreatmentRecord:async (_ : any, res : any) => {
    const result = await AdminModel.getAllTreatmentRecord()
    res.json(result)
  },
  getTreatmentRecord:async ({params} : any, res : any) => {
    const result = await AdminModel.getTreatmentRecord(params.id)
    res.json(result)
  },
  addTreatmentRecord: async ({ body }: any, res: any) => {
    const result = await AdminModel.addTreatment(body)
    res.json(result);
  },
  addPatientMedicalRecord: async ({ body }: any, res: any) => {
    const result = await AdminModel.addPatientRecord(body.patient, body.medical)
    res.json(result);
  },
  deletePatient: async ({ params }: any, res: any) => {
    const result = await AdminModel.deletePatient(params.id)    
    res.json(result);
  },
  deleteAccount: async ({ params }: any, res: any) => {
    const result = await AdminModel.deleteAccount(params.id)    
    res.json(result);
  },
  updateToothRecord: async ({ body }: any, res: any) => {
    const result = await AdminModel.updatePatientTooth(body)    
    res.json(result);
  },
  addtAccount: async ({ body }: any, res: any) => {
    const result = await AdminModel.addAccounts(body)
    res.json(result);
  },
  getAccounts: async (_: any, res: any) => {
    const result = await AdminModel.getAccounts()
    res.json(result);
  },
  getToothRecord: async ({ params }: any, res: any) => {
    const result = await AdminModel.getToothRecord(params.personId);    
    res.json(result);
  },
  getAllAppointmentByStatus: async ({ params }: any, res: any) => {
    const result = await AdminModel.getAppointmentByStatus(params.status);
    res.json(result);
  },
  deletAppointmentById: async ({ params }: any, res: any) => {
    const result = await AdminModel.deleteAppointmentById(params.id);
    res.json(result);
  },
  updateAppointmentById: async ({ params }: any, res: any) => {
    const result = await AdminModel.updateAppointmentById(params.id, params.personId);
    res.json(result);
  },
  getAllPatients:async (req: any, res: any) => {
    const result = await AdminModel.getAllPatients()
    res.json(result)
  },
  getMedicalRecord:async ({params} : any, res: any) => {    
    const result = await AdminModel.getMedicatlRecords(params.personId)    
    res.json(result)
  },
  sendMessage:async ({ body }: any, res: any) => {
    const result = await AdminModel.sendTextMessage(body)
    res.json(result)
  }
};

export default AdminController;
