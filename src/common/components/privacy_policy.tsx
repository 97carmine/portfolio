import { FC, ReactElement } from "react";
import { FormattedMessage } from "react-intl";

const PrivacyPolicy: FC = (): ReactElement => (
	<main className="container is-fluid">
		<div className="container">
			<h1 className="title">
				<FormattedMessage id="56c34" defaultMessage="Privacy policy" />
			</h1>
			<hr />
		</div>
		<div className="container content">
			<h4 className="title">
				<FormattedMessage id="20c75" defaultMessage="Responsible identity" />
			</h4>
			<FormattedMessage
				tagName="p"
				id="f7c82"
				defaultMessage="In compliance with Organic Law 3/2018, of December 5, on the Protection of Personal Data and Guarantee of Digital Rights (LOPD GDD) and Regulation (EU) 2016/679 of the European Parliament and of the Council of April 27, 2016 on the protection of natural persons (RGPD). The owner exposes his identifying data."
			/>
			<ul>
				<FormattedMessage
					tagName="li"
					id="17851"
					defaultMessage="Owner: {owner}"
					values={{ owner: "Axel Gabriel Calle Granda" }}
				/>
				<FormattedMessage
					tagName="li"
					id="ed25e"
					defaultMessage="NIF: {identification}"
					values={{ identification: "51230177T" }}
				/>
				<FormattedMessage
					tagName="li"
					id="6eb38"
					defaultMessage="Home: Street {street_name}, 23, 28041, Community of Madrid, Spain"
					values={{
						street_name: `Oligisto`,
					}}
				/>
				<FormattedMessage
					tagName="li"
					id="c46bb"
					defaultMessage="Email: {email}"
					values={{
						email: (
							<a href="mailto:axel.c.granda@gmail.com" target="blank">
								axel.c.granda@gmail.com
							</a>
						),
					}}
				/>
			</ul>
		</div>
		<div className="container content">
			<h4 className="title">
				<FormattedMessage id="ddbcb" defaultMessage="Purpose of personal data processing" />
			</h4>
			<FormattedMessage
				tagName="p"
				id="ac4b1"
				defaultMessage="When you connect to the website to send an email to the owner or use the contact form, you are facilitating personal information from which the person responsible is the owner. This information may include personal data such as your name and surname, email address, and other data that can not be used to identify yourself as the IP address, geolocation, a record of how services and sites are used. By facilitating this information, give your consent to make your information compiled, used, managed and stored by the owner, only as described in the Legal Notice and in this Privacy Policy."
			/>
			<FormattedMessage
				tagName="p"
				id="0534e"
				defaultMessage="There are other purposes by which the owner treats your personal data: "
			/>
			<ul>
				<FormattedMessage
					tagName="li"
					id="346ff"
					defaultMessage="To guarantee compliance with the conditions collected in the legal notice and in the applicable law. This may include the development of tools and algorithms that help this website guarantee the confidentiality of the personal data it collects."
				/>
				<FormattedMessage
					tagName="li"
					id="fc09c"
					defaultMessage="To support and improve the services offered by this website."
				/>
				<FormattedMessage
					tagName="li"
					id="f6e4a"
					defaultMessage="To obtain statistical data, analyze the navigation, manage the site, the navigation patterns of the study, detect and mitigate possible hostile actions towards the website and the services offered and collect demographic information."
				/>
				<FormattedMessage
					tagName="li"
					id="55528"
					defaultMessage="To manage social networks. The owner has a presence in social networks. The owner will treat your personal data in order to correctly manage your presence in the social network, inform you of your activities, products or services, as well as for any other purpose that the regulations of social networks allow. In no case will the owner use the profiles of followers on social networks to send advertising."
				/>
			</ul>
		</div>
		<div className="container content">
			<h4 className="title">
				<FormattedMessage id="5959c" defaultMessage="Recipients" />
			</h4>
			<FormattedMessage
				tagName="p"
				id="49770"
				defaultMessage="The data will not be communicated to any third party, except legal obligation or provide us with your informed, free, specific and unequivocal consent for this purpose."
			/>
		</div>
		<div className="container content">
			<h4 className="title">
				<FormattedMessage id="c5a2b" defaultMessage="Accuracy and veracity of personal data" />
			</h4>
			<FormattedMessage
				tagName="p"
				id="1d5a6"
				defaultMessage="As a user of the website you commit and you are solely responsible for the data provided to the owner are true, complete, accurate and in force exnerating the owner of any responsibility in this regard."
			/>
		</div>
		<div className="container content">
			<h4 className="title">
				<FormattedMessage id="95082" defaultMessage="Acceptance and consent" />
			</h4>
			<FormattedMessage
				tagName="p"
				id="a0cb0"
				defaultMessage="As a user of the website, you have been informed of the conditions on personal data protection, accept and aware of the treatment thereof by the owner in the form and for the purposes indicated in this Privacy Policy."
			/>
		</div>
		<div className="container content">
			<h4 className="title">
				<FormattedMessage id="5ab8c" defaultMessage="Security and update of your personal data" />
			</h4>
			<FormattedMessage
				tagName="p"
				id="fdab8"
				defaultMessage="With the aim of safeguarding the security of your personal data, we inform you that all technical and organizational nature measures have been adopted to ensure the security of the personal data provided. All this to avoid its alteration, loss, and/or unauthorized treatments or accesses, as required by regulations, although absolute safety does not exist."
			/>
		</div>
		<div className="container content">
			<h4 className="title">
				<FormattedMessage id="7a317" defaultMessage="Your rights" />
			</h4>
			<FormattedMessage
				tagName="p"
				id="ae2de"
				defaultMessage="You can request your ARCO rights (right to access, rectification, cancellation and opposition of your data) in the information sent through the form. You can send an email with your request to {email} together with the proof valid in Law as a photocopy of D.N.I. or the equivalent indicating the purpose of your request."
				values={{
					email: (
						<a href="mailto:axel.c.granda@gmail.com" target="blank">
							axel.c.granda@gmail.com
						</a>
					),
				}}
			/>
		</div>
	</main>
);

export default PrivacyPolicy;
