import { StrictMode } from "react";
import Layout from "./layout";
import "../assets/styles/app.scss";
import routes from "../routes";
import { useRoutes } from "react-router";

const App = (): JSX.Element => {
	const Routes = () => useRoutes(routes);

	return (
		<StrictMode>
			<Layout>
				<Routes />
			</Layout>
		</StrictMode>
	);
};

export default App;
