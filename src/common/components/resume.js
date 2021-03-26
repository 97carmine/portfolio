import { FormattedMessage, FormattedDate } from "react-intl";

const Resume = () => (
	<main className="container is-fluid">
		<div className="container">
			<h1 className="title">
				<FormattedMessage id="f1cef" defaultMessage="Resume" />
			</h1>
			<hr />
		</div>
		<section className="container content">
			<h4 className="title">
				<FormattedMessage id="dad95" defaultMessage="Work experience" />
			</h4>
			<FormattedMessage
				tagName="p"
				id="1d441"
				defaultMessage="{dateStart} - {dateEnd} | Web development in {company}."
				values={{
					dateStart: <FormattedDate value={new Date(2020, 6)} year="numeric" month="long" />,
					dateEnd: <FormattedDate value={new Date(2020, 11)} year="numeric" month="long" />,
					company: (
						<a href="https://www.aerin.es/" target="blank">
							Aerín Sistemas
						</a>
					),
				}}
			/>
			<FormattedMessage
				tagName="p"
				id="e1ce9"
				defaultMessage="Front-end development with ReactJS and back-end development with Django, also keeping these full-stack systems in production."
			/>
			<FormattedMessage
				tagName="p"
				id="20492"
				defaultMessage="{dateStart} - {dateEnd} | Technical tests and analysis in {company}."
				values={{
					dateStart: <FormattedDate value={new Date(2017, 6)} year="numeric" month="long" />,
					dateEnd: <FormattedDate value={new Date(2018, 3)} year="numeric" month="long" />,
					company: (
						<a href="https://www.cgmtelecomunicaciones.es/" target="blank">
							CGM Telecomunicaciones y acústica
						</a>
					),
				}}
			/>
			<FormattedMessage
				tagName="p"
				id="2a7cc"
				defaultMessage="Customer service, inventory management of equipment belonging to Orange and documentation management."
			/>
		</section>
		<section className="container content">
			<h4 className="title">
				<FormattedMessage id="16f3f" defaultMessage="Studies" />
			</h4>
			<FormattedMessage
				tagName="p"
				id="7593e"
				defaultMessage="{dateStart} - {dateEnd} | Técnico Superior en Desarrollo de Aplicaciones Web en {center}."
				values={{
					dateStart: <FormattedDate value={new Date(2019, 9)} year="numeric" month="long" />,
					dateEnd: <FormattedDate value={new Date(2020, 6)} year="numeric" month="long" />,
					center: (
						<a href="https://www.jrotero.com/nuestro-centro/" target="blank">
							Centro de Formación Profesional Cooperativa José Ramón Otero
						</a>
					),
				}}
			/>
			<FormattedMessage
				tagName="p"
				id="eb760"
				defaultMessage="{dateStart} - {dateEnd} | Técnico Superior en Sistemas Microinformáticos en Red en {center}."
				values={{
					dateStart: <FormattedDate value={new Date(2017, 9)} year="numeric" month="long" />,
					dateEnd: <FormattedDate value={new Date(2019, 6)} year="numeric" month="long" />,
					center: (
						<a href="https://www.jrotero.com/nuestro-centro/" target="blank">
							Centro de Formación Profesional Cooperativa José Ramón Otero
						</a>
					),
				}}
			/>
		</section>
		<section className="container content">
			<article className="container">
				<FormattedMessage
					tagName="p"
					id="43108"
					defaultMessage="PDF version available <a>here</a>."
					values={{
						// eslint-disable-next-line react/display-name
						a: (chunks) => (
							<a href={require("../assets/documents/CV.pdf").default} target="blank">
								{chunks}
							</a>
						),
					}}
				/>
			</article>
		</section>
	</main>
);

export default Resume;
