import express from "express";
import helmet from "helmet";
import { join } from "path";
import { renderFile } from "eta";
import { obtainLanguage, generateIntlObject } from "../../common/languages/utils";
import * as routes from "./routes";

const web = express();

// Templates
web.engine("eta", renderFile);
web.set("view engine", "eta");
web.set("views", join(__dirname, "views"));

// Static
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

web.all("*", (req, _res, next) => {
	const langOpt1 = req.query.language as string | undefined;
	const langOpt2 = req.acceptsLanguages();
	const language = langOpt1 === undefined ? obtainLanguage(langOpt2) : obtainLanguage([langOpt1]);

	req.fullURL = new URL(req.originalUrl, `${req.protocol}://${req.get("host") as string}`);
	req.language = generateIntlObject(language);

	next();
});

web.use("/humans.txt", routes.humansRoute);
web.use("/robots.txt", routes.robotsRoute);
web.use("/sitemap.xml", routes.sitemapRoute);
web.use("/.well-known", routes.securityRoute);
web.use("/", routes.publicRoute);

export default web;
