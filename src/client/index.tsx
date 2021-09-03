import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "../common/components/app";

if (process.env.NODE_ENV !== "production") {
	import("@axe-core/react")
		.then((axe) => axe.default(React, hydrate, 1000))
		.catch((error: Error) => console.log(`Error importing module @axe-core/react: ${error.message}`));
}

hydrate(
	<BrowserRouter>
		<App intl={undefined} />
	</BrowserRouter>,
	document.getElementById("root")
);
