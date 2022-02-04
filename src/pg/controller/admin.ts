import AdminModel from "../model/admin";

const AdminController = {  
  updateToothRecord: async ({ body }: any, res: any) => {
    const result = await AdminModel.updatePatientTooth(body)    
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
  }
};

export default AdminController;
