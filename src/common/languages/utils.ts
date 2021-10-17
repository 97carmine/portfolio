/**
 * @param {*} acceptedLangs Array of languages, example: [ "es-ES", "en-US" ]
 * @returns The language found, otherwise, is returned "en"
 */
const obtainLanguage = (acceptedLangs: string[] | readonly string[]): string => {
	const acceptedLangCodes = acceptedLangs.map((lang) => lang.trim().replace(`_`, `-`).split(`-`)[0]);
	const supportedLangCodes = ["es", "en"];
	const matchingLangCode = acceptedLangCodes.find((code) => supportedLangCodes.includes(code)) || `en`;

	return matchingLangCode;
};

export { obtainLanguage };
