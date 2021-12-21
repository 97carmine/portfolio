import { IntlShape } from "react-intl";
import { StaticRouter } from "react-router-dom/server";
import App from "../../../common/components/app";
import LanguageProvider from "../../../common/providers/languageProvider";

const app = (path: string, intl: IntlShape): JSX.Element => (
	<StaticRouter location={path}>
		<LanguageProvider intl={intl}>
			<App />
		</LanguageProvider>
	</StaticRouter>
);

export default app;
