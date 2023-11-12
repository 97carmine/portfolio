import { asset } from "$fresh/runtime.ts";

export default () => (
  <div class="container">
    <div class="columns is-vcentered">
      <div class="column">
        <div class="image">
          <img
            class="is-rounded profile-photo"
            width="400"
            height="400"
            src={asset("/images/personal.webp")}
            alt="Axel Gabriel Calle Granda"
          />
        </div>
      </div>
      <div class="column has-text-centered-mobile">
        <h1 class="title is-1 is-spaced">I'm Axel Calle</h1>
        <h2 class="subtitle is-3">
          A web developer and system administrator
        </h2>
      </div>
    </div>
    <article id="about_me" class="column">
      <h3 class="title is-3">Who I am?</h3>
      <hr />
      <div class="content">
        <p>
          I started in the computer world thanks to a game called 102
          Dalmatians: Puppies to the Rescue. It was love at first sight. I felt
          involved with their stories, characters, and soundtrack. It was like
          being in another world. At first everything was buttons, interfaces...
          I wanted to know the 'magic' and to be able to create my own ideas.
          Since then I have come a long way.
        </p>
        <p>
          I like to program, I dedicate myself to web programming. I love Linux
          systems, especially Debian-based ones. I have used virtualization
          tools like VMware Workstation and VirtualBox and containerization
          tools like Docker.
        </p>
      </div>
    </article>
  </div>
);
