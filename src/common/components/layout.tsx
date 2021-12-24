import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Header from "./header";
import Footer from "./footer";

const Layout = ({ children }: { children: ReactNode }): JSX.Element => {
	const { key, pathname } = useLocation();

	if (typeof document !== "undefined") {
		const { host, protocol } = document.location;
		const canonical = document.querySelector('link[rel="canonical"]');

		canonical?.setAttribute("href", new URL(pathname, `${protocol}//${host}`).toString());
	}

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
