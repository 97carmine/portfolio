import { ReactNode } from "react";
import { IntlProvider, IntlShape, MessageFormatElement, RawIntlProvider } from "react-intl";

interface IProps {
	intl: IntlShape | string;
	messages?: Record<string, MessageFormatElement[]>;
	children: ReactNode;
}

const LanguageProvider = ({ intl, messages, children }: IProps): JSX.Element =>
	typeof intl === "string" ? (
		<IntlProvider locale={intl} key={intl} messages={messages}>
			{children}
		</IntlProvider>
	) : (
		<RawIntlProvider value={intl}>{children}</RawIntlProvider>
	);

export default LanguageProvider;
