import { createIntl, createIntlCache, IntlShape } from "react-intl";
import languages from "./messages";

/**
 * @param {*} acceptedLangs Array of languages, example: [ "es-ES", "en-US" ]
 * @returns The language found, otherwise, is returned "en"
 */
const obtainLanguage = (acceptedLangs: string[]): string => {
	const acceptedLangCodes: string[] = acceptedLangs.map((lang): string => lang.trim().replace(`_`, `-`).split(`-`)[0]);
	const supportedLangCodes: string[] = Object.keys(languages);
	const matchingLangCode: string = acceptedLangCodes.find((code): boolean => supportedLangCodes.includes(code)) || `en`;

	return matchingLangCode;
};

const generateIntlObject = (language: string): IntlShape =>
	createIntl(
		{
			locale: language,
			messages: languages[language].messages,
		},
		createIntlCache()
	);

export { obtainLanguage, generateIntlObject };
