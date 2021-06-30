import { Request, Response, Router } from "express";

const securityRoute: Router = Router();

securityRoute.get("/security.txt", async (req: Request, res: Response): Promise<void> => {
	res.type("text/plain");

	res.render("security", {
		email: `axel.c.granda@gmail.com`,
		languages: `en, es`,
		expireDate: req.language.formatDate(new Date("2021, 09, 21 03:30:00")),
		expireHour: req.language.formatTime(new Date("2021, 09, 21 03:30:00")),
	});
});

export default securityRoute;
