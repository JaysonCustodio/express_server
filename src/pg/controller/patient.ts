import PatientModel from "../model/patient";

const PatientController = {
  getAllPatient: async (req: any, res: any) => {
    const result = await PatientModel.getAllPatient();
    res.json(result);
  },
  getAllAppointment: async ({ params }: any, res: any) => {
    const result = await PatientModel.getAllApointment(params.id);
    res.json(result);
  },
  addAppointment: async ({ body }: any, res: any) => {
    const result = await PatientModel.bookAppoitment(body);
    res.json(result);
  },
  getNotification:async ({ params }: any, res:any) => {
    const result = await PatientModel.getNotification(params.id)
    res.json(result)
  },
  deleteNotification:async ({params} : any, res: any) => {
    const result = await PatientModel.deleteNotification(params.id)
    res.json(result)
  }
};

export default PatientController;
