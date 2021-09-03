import { createIntl, createIntlCache, IntlShape } from "react-intl";
import languages from "./messages";

/**
 * @param {*} acceptedLangs Array of languages, example: [ "es-ES", "en-US" ]
 * @returns The language found, otherwise, is returned "en"
 */
const obtainLanguage = (acceptedLangs: string[]): string => {
	const acceptedLangCodes = acceptedLangs.map((lang) => lang.trim().replace(`_`, `-`).split(`-`)[0]);
	const supportedLangCodes = Object.keys(languages);
	const matchingLangCode = acceptedLangCodes.find((code) => supportedLangCodes.includes(code)) || `en`;

	return matchingLangCode;
};

const generateIntlObject = (language: string): IntlShape =>
	createIntl(
		{
			locale: language,
			messages: languages[language],
		},
		createIntlCache()
	);

export { obtainLanguage, generateIntlObject };
