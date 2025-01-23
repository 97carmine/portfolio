import { RouteConfig, RouteContext } from "$fresh/server.ts";
import { asset, Head } from "$fresh/runtime.ts";
import AboutMe from "~/components/index/about_me.tsx";
import Resume from "~/components/index/resume.tsx";
import Contact from "~/components/index/contact.tsx";

export default (_req: Request, _ctx: RouteContext) => (
  <>
    <Head>
      <title>Index</title>
      <meta
        name="description"
        content="I am Axel Gabriel Calle Granda, I am a web programmer and system administrator. I create things, repair and destroy things for hobby and for self-learning."
      />
      <link rel="stylesheet" href={asset("/styles/index.css")} />
    </Head>
    <section class="section">
      <AboutMe />
      <Resume />
      <Contact />
    </section>
  </>
);

export const config: RouteConfig = { csp: false };
