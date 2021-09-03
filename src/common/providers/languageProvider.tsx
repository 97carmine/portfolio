import { ReactNode } from "react";
import { IntlShape } from "react-intl";
import { RawIntlProvider, IntlProvider } from "react-intl";
import languages from "../languages/messages";

interface IProps {
	intl: IntlShape | undefined;
	children: ReactNode;
}

const LanguageProvider = ({ intl, children }: IProps): JSX.Element => {
	const language: string = (__IS_CLIENT__ && document.documentElement.lang) || `en`;

	return intl === undefined ? (
		<IntlProvider locale={language} key={language} messages={languages[language]}>
			{children}
		</IntlProvider>
	) : (
		<RawIntlProvider value={intl}>{children}</RawIntlProvider>
	);
};

export default LanguageProvider;
