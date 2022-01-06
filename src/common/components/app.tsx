import { StrictMode } from "react";
import { useRoutes } from "react-router";
import Layout from "./layout";
import { routes } from "../routes";
import "../assets/styles/app.scss";

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
