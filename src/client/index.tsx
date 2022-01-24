import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { MessageFormatElement } from "react-intl";
import LanguageProvider from "../common/providers/languageProvider";
import App from "../common/components/app";
import { obtainLanguage } from "../common/languages/utils";

if (process.env.NODE_ENV !== "production") {
	import("@axe-core/react")
		.then((axe) => axe.default(React, hydrate, 1000))
		.catch((error: Error) => console.log(`Error importing module @axe-core/react: ${error.message}`));
}

const loadMessages = async (language: string): Promise<Record<string, MessageFormatElement[]>> => {
	switch (language) {
		case "es":
			return import("../common/languages/messages/es.json").then((data) => data.default);
		default:
			return import("../common/languages/messages/en.json").then((data) => data.default);
	}
};

(async () => {
	const langOpt1 = document.documentElement.lang;
	const langOpt2 = navigator.languages;
	const language = obtainLanguage(langOpt1 ? [langOpt1] : langOpt2);
	const messages = await loadMessages(language);

	hydrate(
		<BrowserRouter>
			<LanguageProvider intl={language} messages={messages}>
				<App />
			</LanguageProvider>
		</BrowserRouter>,
		document.getElementById("root")
	);
})().catch((error: Error) => console.log(`Error loading interface: ${error.message}`));
