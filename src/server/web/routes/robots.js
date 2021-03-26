import { Router } from "express";

const robotsRoute = Router();

robotsRoute.get("/", async (req, res) => {
	res.type("text/plain");

	res.send(
		`User-agent: * \nAllow: /\nSitemap: ${new URL(`${req.protocol}://${req.get("host")}/sitemap.xml`).toString()}`
	);
});

export default robotsRoute;
