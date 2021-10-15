import { StrictMode } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";
import Header from "./header";
import Footer from "./footer";
import NotFound from "./not_found";
import routes from "../routes";
import "../assets/styles/app.scss";

const App = (): JSX.Element => {
	const location = useLocation();

	return (
		<StrictMode>
			<Header />
			<TransitionGroup component={null}>
				<CSSTransition key={location.key} classNames="fade" timeout={300}>
					<Switch location={location}>
						{routes.map(({ path, exact, component: C }) => (
							<Route key={path} exact={exact} path={path} render={() => <C />} />
						))}
						<Route path="*" component={NotFound} />
					</Switch>
				</CSSTransition>
			</TransitionGroup>
			<Footer />
		</StrictMode>
	);
};

export default App;
