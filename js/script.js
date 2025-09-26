document.addEventListener("DOMContentLoaded", function () {
  // Cargar el header
  fetch("../templates/header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("main-header").innerHTML = data;
      // Marcar el enlace activo en el menú de navegación después de cargar el header
      const currentUrl = window.location.pathname
        ? window.location.pathname
        : "/index.html";
      const navLinks = document.querySelectorAll("nav a");

      navLinks.forEach((link) => {
        if (link.getAttribute("href") === currentUrl) {
          link.setAttribute("aria-current", "active");
          link.classList.add("active");
        } else {
          link.removeAttribute("aria-current");
          link.classList.remove("active");
        }
      });
    });

  // Cargar el footer
  fetch("/templates/footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("main-footer").innerHTML = data;
    });
});
