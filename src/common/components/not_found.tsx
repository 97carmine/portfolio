import { Link, useLocation, useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { setHeader } from "../utils/hooks";

const NotFound = (): JSX.Element => {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	setHeader(pathname);

	return (
		<main className="container is-fluid">
			<div className="container">
				<section className="container content">
					<h1 className="title">
						<FormattedMessage defaultMessage="The page you are looking for does not exist." id="b321d" />
					</h1>
					<FormattedMessage
						tagName="p"
						defaultMessage="Fortunately, it has an easy solution. This is your chance. After this, there is no going back."
						id="6e9e6"
					/>
					<div className="buttons">
						<Link to="/" className="button is-danger is-light">
							<FormattedMessage defaultMessage="Red pill: Go to homepage" id="137ac" />
						</Link>
						<button type="button" className="button is-info is-light" onClick={() => navigate(-1)}>
							<FormattedMessage defaultMessage="Blue pill: Go back" id="6132b" />
						</button>
					</div>
				</section>
			</div>
		</main>
	);
};

export default NotFound;
