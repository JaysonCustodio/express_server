import PatientModel from "../model/patient";

const PatientController = {
  getAllPatient: async (req: any, res: any) => {
    const result = await PatientModel.getAllPatient();
    res.json(result);
  },
  bookAppoitment: async (req: any, res: any) => {
    const result = await PatientModel.bookAppoitment(req.body);
    res.json(result);
  },
};

export default PatientController;
