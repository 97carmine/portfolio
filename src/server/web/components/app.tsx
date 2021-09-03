import { IntlShape } from "react-intl";
import { StaticRouter } from "react-router";
import App from "../../../common/components/app";

const app = (path: string, intl: IntlShape): JSX.Element => (
	<StaticRouter location={path}>
		<App intl={intl} />
	</StaticRouter>
);

export default app;
