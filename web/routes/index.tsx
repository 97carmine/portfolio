import { PageProps } from "$fresh/server.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";
import Page from "~/components/page.tsx";
import AboutMe from "~/components/index/about_me.tsx";
import Resume from "~/components/index/resume.tsx";
import Contact from "~/components/index/contact.tsx";

export default (props: PageProps) => {
  const meta = {
    title: "Index",
    canonical: IS_BROWSER ? document.location.href : props.url.href,
    description:
      "I am Axel Gabriel Calle Granda, I am a web programmer and system administrator. I create things, repair and destroy things for hobby and for self-learning.",
    styles: ["index.css"],
  };

  return (
    <Page {...meta}>
      <section class="section">
        <AboutMe />
        <Resume />
        <Contact />
      </section>
    </Page>
  );
};
