import { PageProps } from "$fresh/server.ts";
import Header from "~/components/header.tsx";
import Footer from "~/components/footer.tsx";
import Navbar from "~/components/navbar.tsx";

export default ({ Component }: PageProps) => (
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
