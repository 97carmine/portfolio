import { Head } from "$fresh/runtime.ts";
import Button from "~/islands/button.tsx";

export default () => (
  <>
    <Head>
      <title>Error 404</title>
      <meta name="description" content="Page not found" />
    </Head>
    <section class="section">
      <div class="container">
        <article>
          <h1 class="title is-spaced">
            The page you are looking for does not exist, for now.
          </h1>
          <h2 class="subtitle">
            Fortunately, it has an easy solution. This is your chance. After
            this, there is no going back.
          </h2>
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
  </>
);
