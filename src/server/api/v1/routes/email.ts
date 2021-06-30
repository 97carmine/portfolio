import { NextFunction, Request, Response, Router } from "express";
import Ajv, { JSONSchemaType, ValidateFunction } from "ajv";
import { createTransport, SentMessageInfo } from "nodemailer";
import { IEmail } from "../../../../common/utils/interfaces";

const emailRoute: Router = Router();

const validator = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const ajv = new Ajv();

	ajv.addKeyword({
		keyword: "isNotEmpty",
		async: true,
		type: "string",
		validate: async (_schema: JSONSchemaType<IEmail>, data: string): Promise<boolean> =>
			typeof data === "string" && data.trim() !== "",
		errors: false,
	});

	const schema: JSONSchemaType<IEmail> = {
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

	const validate: ValidateFunction = ajv.compile(schema);

	Promise.resolve(validate(req.body))
		.then((): void => next())
		.catch((error: Error): void => {
			if (!(error instanceof Ajv.ValidationError)) console.log(`Error validating schema: ${error.message}`);
			res.status(400).end();
		});
};

emailRoute.post("/sendmail", validator, async (req: Request, res: Response): Promise<void> => {
	if (req.accepts("application/json")) {
		const { full_name, email, data } = req.body as IEmail;

		const transporter = createTransport({
			service: "gmail",
			auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
		});

		await transporter
			.verify()
			.then(
				(): Promise<void> =>
					transporter
						.sendMail({
							from: `${full_name} <${email}>`,
							to: `axel.c.granda@gmail.com`,
							subject: `Correo electrónico enviado desde la página web`,
							text: `${data}`,
						})
						.then((info: SentMessageInfo): void => {
							console.log(`Email sent: ${info.response}`);
							res.end();
						})
						.catch((error: Error): void => {
							console.log(`Error sending email: ${error.message}`);
							res.status(500).end();
						})
			)
			.catch((error: Error): void => {
				console.log(`Failed to verify SMTP connection settings: ${error.message}`);
				res.status(500).end();
			});
	} else {
		res.status(406).end();
	}
});

export default emailRoute;
