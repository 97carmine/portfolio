import { Router } from "express";

const securityRoute = Router();

securityRoute.get("/security.txt", (req, res) => {
	res.type("text/plain");

	res.render("security", {
		email: `axel.c.granda@gmail.com`,
		languages: `en, es`,
		expireDate: req.language.formatDate(new Date("2022, 09, 21 03:30:00")),
		expireHour: req.language.formatTime(new Date("2022, 09, 21 03:30:00")),
	});
});

export default securityRoute;
