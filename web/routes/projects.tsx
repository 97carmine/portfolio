import { PageProps } from "$fresh/server.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";
import Page from "~/components/page.tsx";

export default (props: PageProps) => {
  const meta = {
    title: "Projects",
    canonical: IS_BROWSER ? document.location.href : props.url.href,
    description: "Page not found",
  };

  return (
    <Page {...meta}>
      <section class="section">
        <div class="container">
          <h1 class="title is-1">Projects</h1>
          <hr />
          <article>
            <h2 class="title">CV-AR</h2>
            <div class="content">
              <p>
                This project was the final degree project that I presented
                together with my partner. It is a web service with the objective
                of generating a resume in augmented reality through a web form.
              </p>
              <p>
                Through a brand where you point a camera (such as a smartphone)
                you can view the data that was provided in augmented reality.
                More information{" "}
                <a href="https://github.com/97carmine/CV-AR" target="_blank">
                  here
                </a>
                .
              </p>
            </div>
          </article>
        </div>
      </section>
    </Page>
  );
};
