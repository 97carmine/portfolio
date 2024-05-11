import { asset, Head } from "$fresh/runtime.ts";

export default () => (
  <>
    <Head>
      <title>Error 500</title>
      <meta name="description" content="Server error found" />
    </Head>
    <section class="section">
      <div class="container">
        <article>
          <h1 class="title is-spaced">Error 500</h1>
          <h2 class="subtitle">
            Well, this is a bit embarrassing. Something went wrong.
          </h2>
          <div class="content">
            <p>
              It's time to call the cavalry, ladies and gentlemen, in charge of
              solving this problem, Aurora.
            </p>
            <img
              width="200"
              height="200"
              src={asset("/images/support.webp")}
              alt="Cat called Aurora"
            />
          </div>
        </article>
      </div>
    </section>
  </>
);
