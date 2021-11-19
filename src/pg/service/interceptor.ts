import jwt from "jsonwebtoken";
const interceptor = (req: any, res: any, next: any) => {
  const token = req?.headers["access-token"];

  if (!token) return res.send({ message: "token is required", success: false });
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY as string);
    req.user = decoded;
  } catch (error) {
    return res.send({ message: "Invalid Token", success: false });
  }
  return next();
};

export default interceptor;
