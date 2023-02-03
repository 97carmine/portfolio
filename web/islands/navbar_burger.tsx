export default () => (
  <a
    role="button"
    class="navbar-burger"
    aria-label="menu"
    onClick={(event) => {
      event.currentTarget.classList.toggle("is-active");

      const navbarMenu = document.querySelector("nav.navbar div.navbar-menu");

      navbarMenu?.classList.toggle("is-active");
    }}
    aria-expanded="false"
  >
    <span aria-hidden="true" />
    <span aria-hidden="true" />
    <span aria-hidden="true" />
  </a>
);
