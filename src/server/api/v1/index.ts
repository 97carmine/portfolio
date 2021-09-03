import express from "express";
import { json, urlencoded } from "body-parser";
import * as routes from "./routes";

// API
const api_v1 = express();

api_v1.use(json());
api_v1.use(urlencoded({ extended: false }));
api_v1.use("/", routes.emailRoute);

export default api_v1;
