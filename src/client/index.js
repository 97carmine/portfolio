import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "../common/components/app";

if (process.env.NODE_ENV !== "production") {
	import("@axe-core/react").then((axe) => {
		axe.default(React, hydrate, 1000);
		hydrate(
			<BrowserRouter>
				<App />
			</BrowserRouter>,
			document.getElementById("root")
		);
	});
} else {
	hydrate(
		<BrowserRouter>
			<App />
		</BrowserRouter>,
		document.getElementById("root")
	);
}
