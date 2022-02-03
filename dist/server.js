"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const dental_1 = __importDefault(require("./pg/route/dental"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const allowedOrigins = ["http://localhost:4200"];
const options = {
    origin: allowedOrigins,
};
const app = express_1.default();
app.use(cors_1.default(options));
app.use(express_1.default.json());
app.use("/", dental_1.default);
dotenv_1.default.config();
const { TESTIYFY_PORT = 3000 } = process.env;
app.listen(TESTIYFY_PORT, async () => {
    console.log(`Express server listening at port ${TESTIYFY_PORT}`);
});
