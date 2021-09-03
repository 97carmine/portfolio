import { Router } from "express";

const robotsRoute = Router();

robotsRoute.get("/", (req, res) => {
	res.type("text/plain");

	res.render("robots", {
		robots_URL: new URL(`sitemap.xml`, `${req.protocol}://${req.get("host") as string}`).toString(),
	});
});

export default robotsRoute;
