import { createIntl, createIntlCache } from "react-intl";
import languages from "./messages";

/**
 * @param {*} acceptedLangs Array of languages, example: [ "es-ES", "en-US" ]
 */
const obtainLanguage = (acceptedLangs) => {
	const acceptedLangCodes = acceptedLangs.map((lang) => lang.trim().replace(`_`, `-`).split(`-`)[0]);
	const supportedLangCodes = Object.keys(languages);
	const matchingLangCode = acceptedLangCodes.find((code) => supportedLangCodes.includes(code));

	return matchingLangCode;
};

const generateIntlObject = (language) =>
	createIntl(
		{
			locale: language,
			messages: languages[language].messages,
		},
		createIntlCache()
	);

export { obtainLanguage, generateIntlObject };
