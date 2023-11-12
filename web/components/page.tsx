import { ComponentChildren } from "preact";
import Header from "~/components/header.tsx";
import Footer from "~/components/footer.tsx";
import Navbar from "~/components/navbar.tsx";

export default ({ children, ...meta }: { children: ComponentChildren }) => (
  <>
    <Header {...meta} />
    <noscript>
      <div class="has-background-danger-dark has-text-white has-text-centered p-2">
        You need to activate JavaScript for full functionality
      </div>
    </noscript>
    <Navbar {...meta} />
    <main>{children}</main>
    <Footer />
  </>
);
