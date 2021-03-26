import { Route, Switch, useLocation } from "react-router-dom";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";
import PropTypes from "prop-types";
import LanguageProvider from "../providers/languageProvider";
import Header from "./header";
import Footer from "./footer";
import routes from "../routes";
import "../assets/styles/app.scss";

const App = ({ intl }) => {
	const location = useLocation();

	return (
		<LanguageProvider intl={intl}>
			<Header />
			<TransitionGroup component={null}>
				<CSSTransition key={location.key} classNames="fade" timeout={300}>
					<Switch location={location}>
						{routes.map(({ path, exact, component: C }) => (
							<Route key={path} exact={exact} path={path} render={() => <C />} />
						))}
					</Switch>
				</CSSTransition>
			</TransitionGroup>
			<Footer />
		</LanguageProvider>
	);
};

App.propTypes = {
	intl: PropTypes.object,
};

export default App;
