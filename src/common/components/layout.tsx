import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";
import Header from "./header";
import Footer from "./footer";

const Layout = ({ children }: { children: ReactNode }): JSX.Element => {
	const { key } = useLocation();

	return (
		<>
			<Header />
			<TransitionGroup component={null}>
				<CSSTransition key={key} classNames="fade" timeout={300}>
					{children}
				</CSSTransition>
			</TransitionGroup>
			<Footer />
		</>
	);
};

export default Layout;
