import { any } from "bluebird";
import AdminModel from "../model/admin";

const AdminController = {
  getAllAppointmentByStatus: async ({ params }: any, res: any) => {
    const result = await AdminModel.getAppointmentByStatus(params.status);
    res.json(result);
  },
  deletAppointmentById: async ({ params }: any, res: any) => {
    const result = await AdminModel.deleteAppointmentById(params.id);
    res.json(result);
  },
  updateAppointmentById: async ({ params }: any, res: any) => {
    console.log("@@params", params);

    const result = await AdminModel.updateAppointmentById(params.id);
    res.json(result);
  },
};

export default AdminController;
