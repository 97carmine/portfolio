import { FormattedMessage } from "react-intl";

const Home = (): JSX.Element => (
	<main className="container is-fluid">
		<div className="container block">
			<div className="columns is-vcentered">
				<div className="column">
					<figure className="image">
						<img
							width="600"
							height="450"
							loading="lazy"
							// eslint-disable-next-line @typescript-eslint/no-var-requires
							src={String(require("../assets/images/personal.webp"))}
							alt="Axel Gabriel Calle Granda"
						/>
					</figure>
				</div>
				<div className="column">
					<h1 className="title is-spaced">
						<FormattedMessage id="1c652" defaultMessage="Hello, I'm {name}" values={{ name: "Axel Calle" }} />
					</h1>
					<h2 className="subtitle">
						<FormattedMessage id="8bf5b" defaultMessage="A web developer and system administrator" />
					</h2>
				</div>
			</div>
		</div>
		<section className="container content">
			<h4 className="title">
				<FormattedMessage id="97fb0" defaultMessage="Who I am?" />
			</h4>
			<FormattedMessage
				tagName="p"
				id="511a3"
				defaultMessage="I started in the computer world thanks to a game called 102 Dalmatians: Puppies to the Rescue. It was love at first sight. I felt involved with their stories, characters, and soundtrack. It was like being in another world. At first everything was buttons, interfaces... I wanted to know the 'magic' and to be able to create my own ideas. Since then I have come a long way."
			/>
			<FormattedMessage
				tagName="p"
				id="1ad59"
				defaultMessage="I like to program, I dedicate myself to web programming. I love {tool_1} systems, especially {tool_2}-based ones. I have used virtualization tools like {tool_3} and {tool_4} and containerization tools like {tool_5}."
				values={{
					tool_1: `Linux`,
					tool_2: `Debian`,
					tool_3: `VMware Workstation`,
					tool_4: `VirtualBox`,
					tool_5: `Docker`,
				}}
			/>
		</section>
		<section className="container content">
			<h4 className="title">
				<FormattedMessage id="6a040" defaultMessage="Hobbies" />
			</h4>
			<ul>
				<FormattedMessage
					tagName="li"
					id="49432"
					defaultMessage="Play video games, current games rarely fascinate me, as long as I can play games like the {game_1} saga or {game_2}, I will have guaranteed enjoyment."
					values={{
						game_1: `Bioshock`,
						game_2: `Beyond Good & Evil`,
					}}
				/>
				<FormattedMessage
					tagName="li"
					id="ed443"
					defaultMessage="Listen to music, but I am one of those who listens to the same songs during a good season."
				/>
				<FormattedMessage
					tagName="li"
					id="28f0e"
					defaultMessage="Read? I'm not passionate about reading, but there are books or graphic novels like {book_1}, Gulliver's Travels or Injustice: Gods Among Us saga that have given me a lot to think about."
					values={{ book_1: `Momo` }}
				/>
			</ul>
		</section>
	</main>
);

export default Home;
