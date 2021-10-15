import { Router } from "express";
import { renderToString } from "react-dom/server";
import { matchPath } from "react-router";
import { minify } from "html-minifier-terser";
import { extname } from "path";
import { obtainAssetManifest } from "../../utils/file";
import app from "../components/app";
import routes from "../../../common/routes";

const publicRoute = Router();

publicRoute.get("/*", (req, res) => {
	const activeRoute = routes.find((route) => matchPath(req.path, route));

	res.render(
		"public",
		{
			assets: obtainAssetManifest(([key]) => /^.(js|css)$/.test(extname(key)) || key === "favicon.png"),
			language: req.language.locale,
			canonical_URL: req.fullURL.toString(),
			component: renderToString(app(req.path, req.language)),
			description: req.language.formatMessage(
				{ id: "1cf05", defaultMessage: "{name}'s portfolio" },
				{ name: "Axel Gabriel Calle Granda" }
			),
			extname: extname,
			humans_URL: new URL(`humans.txt`, req.fullURL.origin).toString(),
			keywords: req.language.formatMessage(
				{ id: "fad58", defaultMessage: "Portfolio, {name}, Resume, Personal website" },
				{ name: "Axel Gabriel Calle Granda" }
			),
			noJS: req.language.formatMessage({
				id: "2ce4c",
				defaultMessage: "You need to activate JavaScript for full functionality",
			}),
		},
		(error, html) => {
			if (error) {
				res.status(500).render("500", {
					language: req.language.locale,
					message: req.language.formatMessage({
						id: "1a303",
						defaultMessage: "Wow, something's broken, I recommend you come back later.",
					}),
				});
			} else {
				minify(html, {
					collapseWhitespace: true,
					removeRedundantAttributes: true,
					removeScriptTypeAttributes: true,
					removeStyleLinkTypeAttributes: true,
					removeAttributeQuotes: true,
					removeComments: true,
					sortAttributes: true,
					sortClassName: true,
					useShortDoctype: true,
					minifyJS: true,
					minifyCSS: true,
					minifyURLs: true,
				})
					.then((data) => {
						activeRoute ? res.send(data) : res.status(404).send(data);
					})
					.catch((error: Error) => console.log(error.message));
			}
		}
	);
});

export default publicRoute;
