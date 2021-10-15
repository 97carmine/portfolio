import { Router } from "express";
import routes from "../../../common/routes";

const sitemapRoute = Router();

sitemapRoute.get("/", (req, res) => {
	res.type("text/xml");

	res.render("sitemap", {
		routes: routes,
		origin: req.fullURL.origin,
	});
});

export default sitemapRoute;
