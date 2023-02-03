import { PageProps } from "$fresh/server.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";
import Page from "~/components/page.tsx";
import Button from "~/islands/button.tsx";

export default (props: PageProps) => {
  const meta = {
    title: "Error 404",
    canonical: IS_BROWSER ? document.location.href : props.url.href,
    description: "Page not found",
  };

  return (
    <Page {...meta}>
      <section class="section">
        <div class="container">
          <article>
            <h1 class="title is-spaced">
              The page you are looking for does not exist.
            </h1>
            <p class="subtitle">
              Fortunately, it has an easy solution. This is your chance. After
              this, there is no going back.
            </p>
            <div class="content">
              <div class="buttons">
                <a href="/" class="button is-danger is-light">
                  Red pill: Go to homepage
                </a>
                <Button class="button is-info is-light">
                  Blue pill: Go back
                </Button>
              </div>
            </div>
          </article>
        </div>
      </section>
    </Page>
  );
};
