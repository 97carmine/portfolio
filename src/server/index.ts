import express from "express";
import { AddressInfo } from "net";
import api_v1 from "./api/v1";
import web from "./web";
import "../common/utils/dotenv";

// Main
const app = express();

// Proxy
app.enable("trust proxy");

// Sub-apps
app.use("/api/v1", api_v1);
app.use("/", web);

const server = app.listen(3000, () => {
	const { address, family, port } = server.address() as AddressInfo;

	console.log(`Listening in the URL http://${family === `IPv6` ? `[${address}]` : address}:${port}`);
});
