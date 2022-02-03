import AdminModel from "../model/admin";

const AdminController = {  
  getToothRecord: async ({ params }: any, res: any) => {
    const result = await AdminModel.getToothRecord(params.personId);
    console.log("@result", result);
    
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
