import { Request, Response, Router } from "express";
import routes from "../../../common/routes";

const sitemapRoute: Router = Router();

sitemapRoute.get("/", async (req: Request, res: Response): Promise<void> => {
	res.type("text/xml");

	res.render("sitemap", {
		routes: routes,
		protocol: req.protocol,
		host: req.get("host"),
	});
});

export default sitemapRoute;
