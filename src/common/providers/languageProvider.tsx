import { ReactElement, ReactNode } from "react";
import { IntlShape } from "react-intl";
import { RawIntlProvider, IntlProvider } from "react-intl";
import languages from "../languages/messages";
import { isRunningOnClientSide } from "../utils/checkClientServer";

interface IProps {
	intl: IntlShape | undefined;
	children: ReactNode;
}

const LanguageProvider = ({ intl, children }: IProps): ReactElement => {
	const language: string = (isRunningOnClientSide && document.documentElement.lang) || `en`;

	return intl === undefined ? (
		<IntlProvider locale={language} key={language} messages={languages[language].messages}>
			{children}
		</IntlProvider>
	) : (
		<RawIntlProvider value={intl}>{children}</RawIntlProvider>
	);
};

export default LanguageProvider;
