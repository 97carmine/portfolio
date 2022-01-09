import { request } from "http";
import { exit } from "process";

const options = {
	host: "localhost",
	port: 3000,
	method: "HEAD",
};

request(options, ({ statusCode }) => {
	console.log(`STATUS: ${statusCode}`);
	statusCode === 200 ? exit(0) : exit(1);
})
	.on("error", ({ message }) => {
		console.log(`ERROR: ${message}`);
		exit(1);
	})
	.end();
