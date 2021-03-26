import { createLogger, transports, format } from "winston";
const { combine, timestamp, printf } = format;

const logger = createLogger({
	level: process.env.NODE_ENV === "production" ? "info" : "debug",
	format: combine(
		timestamp(),
		printf(({ level, message, timestamp }) => `${timestamp} - ${level}: ${message}`)
	),
	transports: [
		new transports.Console({ handleExceptions: true }),
		new transports.File({ filename: "build/logs/log.log", maxFiles: 5, handleExceptions: true }),
	],
});

export default logger;
