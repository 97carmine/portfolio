document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(
    "nav.navbar a.navbar-item, footer.footer a"
  );
  const currentPath = document.location.pathname + document.location.search;

  console.log(items)

  items.forEach((item) => {
    if (currentPath === item.pathname + item.search) {
      
      item.addEventListener("click", (event) => event.preventDefault(), false);
    }
  });
});