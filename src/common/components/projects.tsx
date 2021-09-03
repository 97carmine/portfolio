import { FormattedMessage } from "react-intl";

const Projects = (): JSX.Element => (
	<main className="container is-fluid">
		<div className="container">
			<h1 className="title">
				<FormattedMessage id="54e1d" defaultMessage="Projects" />
			</h1>
			<hr />
		</div>
		<article className="container content">
			<h4 className="title">CV-AR</h4>
			<FormattedMessage
				tagName="p"
				id="6cdb1"
				defaultMessage="This project was the final degree project that I presented together with my partner. It is a web service with the objective of generating a resume in augmented reality through a web form."
			/>
			<FormattedMessage
				tagName="p"
				id="0d01b"
				defaultMessage="Through a brand where you point a camera (such as a smartphone) you can view the data that was provided in augmented reality."
			/>
			<FormattedMessage
				tagName="p"
				id="e868e"
				defaultMessage="More information <a>here</a>."
				values={{
					// eslint-disable-next-line react/display-name
					a: (chunks: string) => (
						<a href="https://github.com/97carmine/CV-AR" target="blank">
							{chunks}
						</a>
					),
				}}
			/>
		</article>
	</main>
);

export default Projects;
