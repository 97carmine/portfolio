import { PageProps } from "$fresh/server.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";
import Page from "~/components/page.tsx";

export default (props: PageProps) => {
  const meta = {
    title: "Error 500",
    canonical: IS_BROWSER ? document.location.href : props.url.href,
    description: "Error",
  };

  return (
    <Page {...meta}>
      <section class="section">
      </section>
    </Page>
  );
};
