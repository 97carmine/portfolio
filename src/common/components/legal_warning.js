import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

const LegalWarning = () => (
	<main className="container is-fluid">
		<div className="container">
			<h1 className="title">
				<FormattedMessage id="bb691" defaultMessage="Legal warning" />
			</h1>
			<hr />
			<div className="container content">
				<h4 className="title">
					<FormattedMessage id="df06d" defaultMessage="Identification and Ownership" />
				</h4>
				<FormattedMessage
					tagName="p"
					id="5f55f"
					defaultMessage="In compliance with Regulation (EU) 2016/679 of the European Parliament and of the Council of April 27, 2016 on the protection of natural persons (RGPD) and the LSSI-CE, Law 34/2002, of July 11, on services of the information society and electronic commerce, the owner exposes his identifying data."
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
					<FormattedMessage id="2433d" defaultMessage="Personal information" />
				</h4>
				<FormattedMessage
					tagName="p"
					id="f8fa8"
					defaultMessage="You can consult all the information related to the processing of personal data that the owner collects on the <a>Privacy Policy</a> page."
					values={{
						// eslint-disable-next-line react/display-name
						a: (chunks) => <Link to="/privacy_policy">{chunks}</Link>,
					}}
				/>
			</div>
			<div className="container content">
				<h4 className="title">
					<FormattedMessage id="124ad" defaultMessage="Links of interest to other websites" />
				</h4>
				<FormattedMessage
					tagName="p"
					id="99af1"
					defaultMessage="The owner can provide you with access to third-party websites through links in order to inform about the existence of other sources of information on the Internet in which you can expand the data offered on the website."
				/>
				<FormattedMessage
					tagName="p"
					id="788e2"
					defaultMessage="These links to other websites do not suppose in any case a suggestion or recommendation for you to visit the destination web pages, which are beyond the control of the owner, for which the owner is not responsible for the content of the linked websites or the result you get by following the links."
				/>
				<FormattedMessage
					tagName="p"
					id="06666"
					defaultMessage="Likewise, the owner is not responsible for the links located on the linked websites to which it provides access."
				/>
				<FormattedMessage
					tagName="p"
					id="2a934"
					defaultMessage="The establishment of the link does not imply in any case the existence of relations between the owner and the owner of the site where the link is established, nor the acceptance or approval by the owner of its contents or services."
				/>
				<FormattedMessage
					tagName="p"
					id="1cd74"
					defaultMessage="If you access an external website from a link found on the Website, you should read the privacy policy of the other website, which may be different from that of this website."
				/>
			</div>
			<div className="container content">
				<h4 className="title">
					<FormattedMessage id="d4c77" defaultMessage="Limitation of liability" />
				</h4>
				<FormattedMessage
					tagName="p"
					id="a5362"
					defaultMessage="The information and services included or available through this website may include inaccuracies or typographical errors. Periodically, the owner incorporates improvements and/or changes to the information contained and/or the Services that he can introduce at any time."
				/>
				<FormattedMessage
					tagName="p"
					id="316c3"
					defaultMessage="The owner does not declare or guarantee that the services or contents are interrupted or that they are free of errors, that the defects will be corrected, or that the service or the server that makes it available are free of viruses or other harmful components without prejudice to the fact that The owner makes every effort to avoid this type of incident."
				/>
				<FormattedMessage
					tagName="p"
					id="2b011"
					defaultMessage="The owner declines any responsibility in the event of interruptions or a malfunction of the Services or content offered on the Internet, whatever their cause. Likewise, the owner is not responsible for network outages, business losses as a result of said drops, temporary power outages or any other type of indirect damage that may be caused by causes beyond the control of the owner."
				/>
				<FormattedMessage
					tagName="p"
					id="5e962"
					defaultMessage="Before making decisions and/or actions based on the information included in the website, the owner recommends checking and contrasting the information received with other sources."
				/>
			</div>
			<div className="container content">
				<h4 className="title">
					<FormattedMessage id="90c44" defaultMessage="Intellectual and industrial property" />
				</h4>
				<FormattedMessage
					tagName="p"
					id="38ed2"
					defaultMessage="The source code of the website is under the {license} license and can be found <a>here</a>."
					values={{
						license: (
							<a href="https://opensource.org/licenses/MIT" target="blank">
								MIT
							</a>
						),
						// eslint-disable-next-line react/display-name
						a: (chunks) => (
							<a href="https://github.com/97carmine/portfolio" target="blank">
								{chunks}
							</a>
						),
					}}
				/>
				<FormattedMessage
					tagName="p"
					id="a3ddf"
					defaultMessage="The website content is under the {license} license."
					values={{
						license: (
							<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="blank">
								CC BY-NC-SA 4.0
							</a>
						),
					}}
				/>
				<FormattedMessage
					tagName="p"
					id="3b757"
					defaultMessage="All logos, trademarks and registered trademarks are the property of their respective owners."
				/>
			</div>
			<div className="container content">
				<h4 className="title">
					<FormattedMessage id="6df64" defaultMessage="Modifications" />
				</h4>
				<FormattedMessage
					tagName="p"
					id="5b05e"
					defaultMessage="The owner reserves the right to make the modifications it deems appropriate to the website and the legal notice without prior notice, being able to change, delete or add both the content and services provided through it and the way it these appear."
				/>
			</div>
			<div className="container content">
				<h4 className="title">
					<FormattedMessage id="ea259" defaultMessage="Right of exclusion" />
				</h4>
				<FormattedMessage
					tagName="p"
					id="b47bc"
					defaultMessage="The owner reserves the right to deny or withdraw access to the website and the services offered without prior notice, temporarily or indefinitely, at its own request or by a third party, to those users who breach any of the conditions of this Legal Warning and/or hostile action is taken against the website and the services offered."
				/>
			</div>
			<div className="container content">
				<h4 className="title">
					<FormattedMessage id="bbaff" defaultMessage="Contact" />
				</h4>
				<FormattedMessage
					tagName="p"
					id="76772"
					defaultMessage="In case you have any questions about these Legal Conditions or want to make any comments about this website, you can send an email to the address {email}."
					values={{
						email: (
							<a href="mailto:axel.c.granda@gmail.com" target="blank">
								axel.c.granda@gmail.com
							</a>
						),
					}}
				/>
			</div>
		</div>
	</main>
);

export default LegalWarning;
