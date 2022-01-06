import express from "express";
import helmet from "helmet";
import { extname, resolve } from "path";
import { renderFile } from "eta";
import { obtainLanguage } from "../../common/languages/utils";
import { createIntl, createIntlCache, MessageFormatElement } from "react-intl";
import { obtainAssetManifest } from "../utils/file";
import { asyncMiddleware } from "../utils/middleware";
import * as routes from "./routes";

const web = express();

// Templates
web.engine("eta", renderFile);
web.set("view engine", "eta");
web.set("views", resolve(__dirname, "views"));

if (process.env.NODE_ENV === "production") {
	web.use(
		helmet({
			contentSecurityPolicy: {
				directives: {
					"default-src": ["'none'"],
					"base-uri": ["'none'"],
					"connect-src": ["'self'"],
					"font-src": ["'none'"],
					"form-action": ["'none'"],
					"frame-ancestors": ["'none'"],
					"img-src": ["'self'"],
					"upgrade-insecure-requests": [],
					"object-src": ["'none'"],
					"script-src": [
						obtainAssetManifest(([key]) => /^.js$/.test(extname(key)))
							.map((data) => typeof data[1] !== "string" && `'${data[1].integrity}'`)
							.join(" "),
						"'unsafe-inline'",
						"'strict-dynamic'",
						"https:",
						"http:",
					],
					"style-src": [
						obtainAssetManifest(([key]) => /^.css$/.test(extname(key)))
							.map((data) => typeof data[1] !== "string" && `'${data[1].integrity}'`)
							.join(" "),
						"'unsafe-inline'",
						"'strict-dynamic'",
						"https:",
						"http:",
					],
					"require-trusted-types-for": ["'script'"],
				},
			},
			hsts: { maxAge: 63072000, preload: true },
			frameguard: { action: "deny" },
		})
	);
}

// Static
web.use(express.static("build/static", { index: false }));

web.all(
	"*",
	asyncMiddleware(async (req, res, next) => {
		const loadMessages = async (language: string): Promise<Record<string, MessageFormatElement[]>> => {
			switch (language) {
				case "es":
					return import("../../common/languages/messages/es.json").then((data) => data.default);
				default:
					return import("../../common/languages/messages/en.json").then((data) => data.default);
			}
		};

		const langOpt1 = req.query.language;
		const langOpt2 = req.acceptsLanguages();
		const language = obtainLanguage(typeof langOpt1 === "string" ? [langOpt1] : langOpt2);
		const host = req.headers.host;

		// Create a custom req object that you will store a URL object
		if (typeof host === "string") {
			req.fullURL = new URL(req.originalUrl, `${req.protocol}://${host}`);
		} else {
			res.status(500).end();
		}

		// Create a custom req object that you will store a IntlShap object
		await loadMessages(language)
			.then((messages) => {
				req.language = createIntl({ locale: language, messages: messages }, createIntlCache());
			})
			.catch((error: Error) => {
				console.log(`Error generating the intl object: ${error.message}`);
				res.status(500).end();
			});

		next();
	})
);

web.use("/humans.txt", routes.humansRoute);
web.use("/robots.txt", routes.robotsRoute);
web.use("/sitemap.xml", routes.sitemapRoute);
web.use("/.well-known", routes.securityRoute);
web.use("/", routes.publicRoute);

export default web;
