import { PageProps } from "$fresh/server.ts";
import { useCSP } from "$fresh/runtime.ts";
import Header from "~/components/header.tsx";
import Footer from "~/components/footer.tsx";
import Navbar from "~/components/navbar.tsx";
import { applyCSP } from "~/utils/csp.ts";

export default function Layout({ Component, url }: PageProps) {
  const baseUrl = new URL(url.origin);
  useCSP((csp) => applyCSP(csp, baseUrl));

  return (
    <>
      <Header />
      <noscript>
        <div class="has-background-danger-dark has-text-white has-text-centered p-2">
          You need to activate JavaScript for full functionality
        </div>
      </noscript>
      <Navbar />
      <main>
        <Component />
      </main>
      <Footer />
    </>
  );
}
