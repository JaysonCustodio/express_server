import AuthModel from "../model/auth";

const AuthController = {
  siginUp: async ({ body }: any, res: any) => {
    const result = await AuthModel.signUp(body);
    res.json(result);
  },
  login: async ({ body }: any, res: any) => {
    const result = await AuthModel.signIn(body);
    res.json(result);
  },
};

export default AuthController;
