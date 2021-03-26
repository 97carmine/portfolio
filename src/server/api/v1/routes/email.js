import { Router } from "express";
import Ajv from "ajv";
import { createTransport } from "nodemailer";
import logger from "../../../logger";

const emailRoute = Router();

const validator = async (req, res, next) => {
	const ajv = new Ajv();

	ajv.addKeyword({
		keyword: "isNotEmpty",
		async: true,
		type: "string",
		validate: async (_schema, data) => typeof data === "string" && data.trim() !== "",
		errors: false,
	});

	const schema = {
		$async: true,
		type: "object",
		required: ["name", "surname", "email", "data"],
		properties: {
			name: { type: "string", isNotEmpty: true },
			surname: { type: "string", isNotEmpty: true },
			email: { type: "string", isNotEmpty: true },
			data: { type: "string", isNotEmpty: true },
		},
	};

	const validate = ajv.compile(schema);

	validate(req.body)
		.then(() => next())
		.catch((error) => {
			!(error instanceof Ajv.ValidationError) && logger.error(`Error validating schema: ${error}`);
			res.status(400).end();
		});
};

emailRoute.post("/sendmail", validator, async (req, res) => {
	if (req.accepts("application/json")) {
		const { name, surname, email, data } = req.body;

		const transporter = createTransport({
			service: "gmail",
			auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
		});

		await transporter
			.verify()
			.then(() =>
				transporter
					.sendMail({
						from: `${name} ${surname} <${email}>`,
						to: `axel.c.granda@gmail.com`,
						subject: `Email enviado desde la página web`,
						text: `${data}`,
					})
					.then((info) => logger.info(`Email sent: ${info.response}`) && res.end())
					.catch((error) => logger.error(`Error sending email: ${error}`) && res.status(500).end())
			)
			.catch((error) => logger.error(`Failed to verify SMTP connection settings: ${error}`) && res.status(500).end());
	} else {
		res.status(406).end();
	}
});

export default emailRoute;
