import { Router } from "express";
import { routesWithoutPath } from "../../../common/routes";

const sitemapRoute = Router();

sitemapRoute.get("/", (req, res) => {
	res.type("text/xml");

	res.render("sitemap", {
		routes: routesWithoutPath("*"),
		origin: req.fullURL.origin,
	});
});

export default sitemapRoute;
