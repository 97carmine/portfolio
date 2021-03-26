import { Router } from "express";

const securityRoute = Router();

securityRoute.get("/security.txt", async (req, res) => {
	res.type("text/plain");

	const intl = req.language;
	const expireDate = new Date("2021, 09, 21 03:30:00");

	res.send(
		`Contact: mailto:axel.c.granda@gmail.com\nPreferred-Languages: en, es\nExpires: ${intl.formatDate(
			expireDate
		)} ${intl.formatTime(expireDate)}`
	);
});

export default securityRoute;
