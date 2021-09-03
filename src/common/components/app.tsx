import { StrictMode } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";
import { IntlShape } from "react-intl";
import LanguageProvider from "../providers/languageProvider";
import Header from "./header";
import Footer from "./footer";
import NotFound from "./not_found";
import routes from "../routes";
import "../assets/styles/app.scss";

interface IProps {
	intl: IntlShape | undefined;
}

const App = ({ intl }: IProps): JSX.Element => {
	const location = useLocation();

	return (
		<StrictMode>
			<LanguageProvider intl={intl}>
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
			</LanguageProvider>
		</StrictMode>
	);
};

export default App;
