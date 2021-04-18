import express from "express";
import api_v1 from "./api/v1";
import web from "./web";
import logger from "./logger";
import "../common/utils/dotenv";

// Main
const app = express();

// Proxy
app.enable("trust proxy");

app.use("/api/v1", api_v1);
app.use("/", web);

const server = app.listen(3000, async (error) =>
	error
		? logger.error(`Error starting ExpressJS: ${error}`)
		: logger.info(`Listening to the port http://${server.address().address}:${server.address().port}`)
);
