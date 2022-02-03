import dotenv from "dotenv";
import dental from "./pg/route/dental";
import express from "express";
import cors from "cors";


const allowedOrigins = ["http://localhost:4200"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();
app.use(cors(options));
app.use(express.json());
app.use("/", dental);

dotenv.config();

const { TESTIYFY_PORT = 3000 }: any = process.env;
app.listen(TESTIYFY_PORT, async () => {
  console.log(`Express server listening at port ${TESTIYFY_PORT}`);
});

