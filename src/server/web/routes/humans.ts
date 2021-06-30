import { Request, Response, Router } from "express";

const humansRoute: Router = Router();

humansRoute.get("/", async (req: Request, res: Response): Promise<void> => {
	res.type("text/plain");

	res.render("humans", {
		developer: "Axel Gabriel Calle Granda",
		contact: req.language.formatMessage(
			{ id: "99650", defaultMessage: "{email} or {url}" },
			{ email: "axel.c.granda@gmail.com", url: new URL(`contact`, `${req.protocol}://${req.get("host")}`).toString() }
		),
		last_update: req.language.formatDate(new Date("2021/06/20")),
		location: req.language.formatMessage({ id: "816a1", defaultMessage: "{city}, Spain" }, { city: "Madrid" }),
	});
});

export default humansRoute;
