import { FormattedMessage } from "react-intl";
import { NavLink, Link } from "react-router-dom";

const Header = (): JSX.Element => (
	<nav className="navbar" aria-label="main navigation">
		<div className="navbar-brand">
			<Link to="/" className="navbar-item">
				<img
					width="27"
					height="27"
					loading="lazy"
					//eslint-disable-next-line @typescript-eslint/no-var-requires
					src={String(require("../assets/images/logo.png"))}
					alt="Logo"
				/>
			</Link>
			<NavLink end to="/projects" className="navbar-item">
				<FormattedMessage id="54e1d" defaultMessage="Projects" />
			</NavLink>
			<NavLink end to="/resume" className="navbar-item">
				<FormattedMessage id="f1cef" defaultMessage="Resume" />
			</NavLink>
			<NavLink end to="/contact" className="navbar-item">
				<FormattedMessage id="bbaff" defaultMessage="Contact" />
			</NavLink>
		</div>
	</nav>
);

export default Header;
