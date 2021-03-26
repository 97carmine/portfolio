import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

const initialState = { name: "", surname: "", email: "", data: "" };

const Contact = () => {
	const [{ name, surname, email, data }, setEmailData] = useState(initialState);
	const [isLoading, setLoading] = useState(false);
	const [isAccepted, setAccepted] = useState(false);
	const [{ isShowing, alertStatus }, setShowAlert] = useState({ isShowing: false, alertStatus: false });

	const handleInputChange = async (event) =>
		setEmailData((prevState) => ({ ...prevState, [event.target.id]: event.target.value }));

	const submitRequest = async (event) => {
		event.preventDefault();
		setLoading(true);

		const response = await fetch(`/api/v1/sendmail`, {
			method: "POST",
			headers: { Accept: "application/json", "Content-Type": "application/json" },
			body: JSON.stringify({ name, surname, email, data }),
		})
			.then((response) => response.ok)
			.catch((error) => console.log(`There has been a problem with your fetch operation: ${error}`));

		setLoading(false);
		setShowAlert({ isShowing: true, alertStatus: response });
		response && event.target.reset();
	};

	const Alert = (
		<div className={`container notification ${alertStatus ? `is-success` : `is-danger`}`}>
			<button type="button" className="delete" onClick={() => setShowAlert({ isShowing: false, alertStatus: false })} />
			{alertStatus ? (
				<FormattedMessage id="d8368" defaultMessage="E-mail send" />
			) : (
				<FormattedMessage id="cdbd4" defaultMessage="Failed to send email" />
			)}
		</div>
	);

	return (
		<main className="container is-fluid">
			<div className="container">
				<h1 className="title">
					<FormattedMessage id="bbaff" defaultMessage="Contact" />
				</h1>
				<hr />
			</div>
			<form
				className="container content"
				onInvalid={(event) => event.currentTarget.classList.add("is-validated")}
				onSubmit={isLoading === false ? submitRequest : undefined}
				onReset={(event) => {
					setEmailData({ ...initialState });
					setAccepted(false);
					event.currentTarget.classList.remove("is-validated");
				}}
			>
				<h4 className="title">
					<FormattedMessage id="414cf" defaultMessage="Feel free to send me an email" />
				</h4>
				<div className="field">
					<label className="label" htmlFor="name">
						<FormattedMessage id="49ee3" defaultMessage="Name" />
					</label>
					<div className="control">
						<input className="input" type="text" value={name} id="name" onChange={handleInputChange} required />
						<p className="help">
							<FormattedMessage id="fd2f8" defaultMessage="Enter your name" />
						</p>
					</div>
				</div>
				<div className="field">
					<label className="label is-required" htmlFor="surname">
						<FormattedMessage id="8e555" defaultMessage="Surname" />
					</label>
					<div className="control">
						<input className="input" type="text" value={surname} id="surname" onChange={handleInputChange} required />
						<p className="help">
							<FormattedMessage id="c9121" defaultMessage="Enter your surname" />
						</p>
					</div>
				</div>
				<div className="field">
					<label className="label" htmlFor="email">
						<FormattedMessage id="b357b" defaultMessage="Email address" />
					</label>
					<div className="control">
						<input className="input" type="email" value={email} id="email" onChange={handleInputChange} required />
						<p className="help">
							<FormattedMessage id="6832a" defaultMessage="Enter your email address" />
						</p>
					</div>
				</div>
				<div className="field">
					<label className="label" htmlFor="data">
						<FormattedMessage id="4c2a8" defaultMessage="Message" />
					</label>
					<div className="control">
						<input className="input" type="text" value={data} id="data" onChange={handleInputChange} required />
						<p className="help">
							<FormattedMessage id="68d39" defaultMessage="Enter your message" />
						</p>
					</div>
				</div>
				<div className="field">
					<div className="control">
						<label className="checkbox">
							<input
								type="checkbox"
								checked={isAccepted}
								onChange={(event) => setAccepted(event.currentTarget.checked)}
							/>
							{` `}
							<FormattedMessage
								id="b7a2a"
								defaultMessage="I have read and accept the <Link>privacy policy</Link>."
								values={{
									// eslint-disable-next-line react/display-name
									Link: (chunks) => <Link to="/privacy_policy">{chunks}</Link>,
								}}
							/>
						</label>
					</div>
				</div>
				<div className="field is-grouped">
					<div className="control">
						<button type="submit" className="button" formMethod="post" disabled={isAccepted === false || isLoading}>
							{isLoading ? (
								<FormattedMessage id="7b0fe" defaultMessage="Sending..." />
							) : (
								<FormattedMessage id="94966" defaultMessage="Send" />
							)}
						</button>
					</div>
					<div className="control">
						<button type="reset" className="button">
							<FormattedMessage id="9dbc2" defaultMessage="Clean form" />
						</button>
					</div>
				</div>
			</form>
			{isShowing && setTimeout(() => setShowAlert({ isShowing: false, alertStatus: false }), 5000) && Alert}
		</main>
	);
};

export default Contact;
