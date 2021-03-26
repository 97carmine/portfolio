import express from "express";
import helmet from "helmet";
import { obtainLanguage, generateIntlObject } from "../../common/languages/utils";
import * as routes from "./routes";

const web = express();

web.use(express.static("build/static", { index: false }));

if (process.env.NODE_ENV === "production") {
	web.use(
		helmet({
			contentSecurityPolicy: {
				directives: {
					defaultSrc: ["'none'"],
					baseUri: ["'none'"],
					connectSrc: ["'self'"],
					fontSrc: ["'self'"],
					formAction: ["'none'"],
					frameAncestors: ["'none'"],
					imgSrc: ["'self'"],
					scriptSrc: ["'self'"],
					styleSrc: ["'self'"],
				},
			},
			hsts: { maxAge: 63072000, preload: true },
			frameguard: { action: "deny" },
		})
	);
}

web.all("*", async (req, _res, next) => {
	req.fullURL = new URL(`${req.protocol}://${req.get("host")}${req.originalUrl}`);

	const language =
		req.query.language !== undefined
			? obtainLanguage([req.query.language]) || `en`
			: obtainLanguage(req.acceptsLanguages()) || `en`;

	req.language = generateIntlObject(language);
	next();
});
web.use("/robots.txt", routes.robotsRoute);
web.use("/sitemap.xml", routes.sitemapRoute);
web.use("/.well-known", routes.securityRoute);
web.use("/", routes.publicRoute);

export default web;
