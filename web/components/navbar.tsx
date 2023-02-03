import { asset } from "$fresh/runtime.ts";
import NavbarBurger from "~/islands/navbar_burger.tsx";

export default () => (
  <nav
    class="navbar"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <a class="navbar-item image" href="/">
        <img
          width="27"
          height="27"
          src={asset("/images/logo.png")}
          alt="Logo"
        />
      </a>
      <NavbarBurger />
    </div>
    <div class="navbar-menu" id="menu">
      <div class="navbar-start">
        <a class="navbar-item" href="/projects" rel="nav">
          Projects
        </a>
        <a class="navbar-item" href="/resume" rel="nav">
          Resume
        </a>
      </div>
    </div>
  </nav>
);
