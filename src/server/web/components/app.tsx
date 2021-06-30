import { ReactElement } from "react";
import { IntlShape } from "react-intl";
import { StaticRouter } from "react-router";
import App from "../../../common/components/app";

const app = (path: string, intl: IntlShape): ReactElement => (
	<StaticRouter location={path}>
		<App intl={intl} />
	</StaticRouter>
);

export default app;
