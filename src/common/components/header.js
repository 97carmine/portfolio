import { FormattedMessage } from "react-intl";
import { NavLink, Link } from "react-router-dom";

const Header = () => (
	<nav className="navbar" aria-label="main navigation">
		<div className="navbar-brand">
			<Link to="/" className="navbar-item">
				<img width="27" height="27" loading="lazy" src={require("../assets/images/logo.png").default} alt="Logo" />
			</Link>
			<NavLink exact activeClassName="is-active" to="/projects" className="navbar-item">
				<FormattedMessage id="54e1d" defaultMessage="Projects" />
			</NavLink>
			<NavLink exact activeClassName="is-active" to="/resume" className="navbar-item">
				<FormattedMessage id="f1cef" defaultMessage="Resume" />
			</NavLink>
			<NavLink exact activeClassName="is-active" to="/contact" className="navbar-item">
				<FormattedMessage id="bbaff" defaultMessage="Contact" />
			</NavLink>
		</div>
	</nav>
);

export default Header;
