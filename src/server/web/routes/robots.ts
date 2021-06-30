import { Request, Response, Router } from "express";

const robotsRoute: Router = Router();

robotsRoute.get("/", async (req: Request, res: Response): Promise<void> => {
	res.type("text/plain");

	res.render("robots", {
		robots_URL: new URL(`sitemap.xml`, `${req.protocol}://${req.get("host")}`).toString(),
	});
});

export default robotsRoute;
