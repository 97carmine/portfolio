import { Router } from "express";
import Ajv, { DefinedError } from "ajv";
import { createTransport } from "nodemailer";
import { IEmail } from "../../../../common/utils/interfaces";

const emailRoute = Router();

emailRoute.post(
	"/sendmail",
	(req, res, next) => {
		const ajv = new Ajv();

		ajv.addKeyword({
			keyword: "isNotEmpty",
			async: true,
			type: "string",
			validate: (_schema: JSON, data: string) => typeof data === "string" && data.trim() !== "",
			errors: false,
		});

		const schema = {
			$async: true,
			type: "object",
			required: ["full_name", "email", "data"],
			properties: {
				full_name: { type: "string", isNotEmpty: true },
				email: { type: "string", isNotEmpty: true },
				data: { type: "string", isNotEmpty: true },
			},
			additionalProperties: false,
		};

		const validate = ajv.compile(schema);

		if (validate(req.body)) {
			next();
		} else {
			for (const error of validate.errors as DefinedError[]) {
				switch (error.keyword) {
					case "type":
						console.log(error.params.type);
						break;
					case "pattern":
						console.log(error.params.pattern);
						break;
					case "required":
						console.log(error.params.missingProperty);
				}
			}
			res.status(400).end();
		}
	},
	(req, res) => {
		if (req.accepts("application/json")) {
			const { full_name, email, data } = req.body as IEmail;

			const transporter = createTransport({
				service: "gmail",
				auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
			});

			transporter
				.verify()
				.then(() =>
					transporter
						.sendMail({
							from: `${full_name} <${email}>`,
							to: `axel.c.granda@gmail.com`,
							subject: `Correo electrónico enviado desde la página web`,
							text: `${data}`,
						})
						.then((info) => {
							console.log(`Email sent: ${info.response}`);
							res.end();
						})
						.catch((error: Error) => {
							console.log(`Error sending email: ${error.message}`);
							res.status(500).end();
						})
				)
				.catch((error: Error) => {
					console.log(`Failed to verify SMTP connection settings: ${error.message}`);
					res.status(500).end();
				});
		} else {
			res.status(406).end();
		}
	}
);

export default emailRoute;
