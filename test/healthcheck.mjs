import { request } from "http";

const options = {
	host: "localhost",
	port: "3000",
	method: "GET",
};

request(options, ({ statusCode }) => {
	console.log(`STATUS: ${statusCode}`);
	statusCode === 200 ? process.exit(0) : process.exit(1);
})
	.on("error", (error) => {
		console.log(`ERROR: ${error}`);
		process.exit(1);
	})
	.end();
