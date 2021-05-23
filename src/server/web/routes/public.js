import { Router } from "express";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath } from "react-router";
import { minify } from "html-minifier-terser";
import { StrictMode } from "react";
import { readFile } from "fs";
import App from "../../../common/components/app";
import routes from "../../../common/routes";
import logger from "../../logger";

const publicRoute = Router();

publicRoute.get("/*", async (req, res) => {
	const activeRoute = routes.find((route) => matchPath(req.path, route));

	readFile("build/static/index.html", "utf-8", (error, data) => {
		const intl = req.language;

		if (error) {
			logger.error(error);

			res.status(500).send(`<!DOCTYPE html>
				<html lang="${intl.locale}">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
					<title>Error 500</title>
				</head>
				<body>
					<main>
						<h1>Error 500</h1>
						<h3>¯\\_(ツ)_/¯</h3>
						<p>${intl.formatMessage({
							id: "1a303",
							defaultMessage: "Wow, something's broken, I recommend you come back later.",
						})}</p>
					</main>
				</body>
				</html>`);
		} else {
			data = data.replace(`<html>`, `<html lang=${intl.locale}>`);
			data = data.replace(
				`<noscript></noscript>`,
				`<noscript><div class="noJS">${intl.formatMessage({
					id: "2ce4c",
					defaultMessage: "You need to activate JavaScript for full functionality",
				})}</div></noscript>`
			);
			data = data.replace(
				`<meta name="description"/>`,
				`<meta name="description" content="${intl.formatMessage(
					{ id: "1cf05", defaultMessage: "{name}'s portfolio" },
					{ name: "Axel Gabriel Calle Granda" }
				)}" />`
			);
			data = data.replace(`<link rel="canonical"/>`, `<link rel="canonical" href="${req.fullURL}" />`);
			data = data.replace(
				`<div id="root"></div>`,
				`<div id="root">${renderToString(
					<StrictMode>
						<StaticRouter location={req.path}>
							<App intl={intl} />
						</StaticRouter>
					</StrictMode>
				)}</div>`
			);

			const html = minify(data, {
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
			});

			activeRoute.path === "*" ? res.status(404).send(html) : res.send(html);
		}
	});
});

export default publicRoute;
