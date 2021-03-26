import { Router } from "express";
import routes from "../../../common/routes";

const sitemapRoute = Router();

sitemapRoute.get("/", async (req, res) => {
	res.type("text/xml");

	res.send(
		`<?xml version="1.0" encoding="UTF-8"?>\n
    	<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="https://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="https://www.sitemaps.org/schemas/sitemap/0.9 https://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n
    	${routes
				.map(({ path }) => {
					if (path !== `*`) {
						return `<url>\n<loc>\n${new URL(`${req.protocol}://${req.get("host")}${path}`).toString()}</loc>\n</url>\n`;
					}
				})
				.join("")}
    	</urlset>`
	);
});

export default sitemapRoute;
