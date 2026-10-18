import "../styles/global.css"

const menuButton = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const navbar = document.getElementById("navbar");
const mobileNavbar = document.getElementById("navbar-mobile");

document.getElementById("year").textContent = new Date().getFullYear();

navbar.classList.remove("opacity-0", "-translate-x-10");
navbar.classList.add("opacity-100", "translate-x-0");

document.querySelectorAll("#left-bar, #right-bar").forEach((bar) => {
  bar.classList.remove("opacity-0", "translate-y-10");
  bar.classList.add("opacity-100", "translate-y-0");
});

const openMenu = () => {
  sidebar.inert = false;
  sidebar.classList.remove("invisible", "translate-x-full");
  overlay.classList.remove("invisible");
  menuButton.classList.add("open");
  menuButton.setAttribute("aria-expanded", "true");
  menuButton.setAttribute("aria-label", "Close menu");
  document.body.classList.add("overflow-hidden");
  sidebar.querySelector("a")?.focus();
};

const closeMenu = ({ restoreFocus = false } = {}) => {
  if (sidebar.inert) return;

  sidebar.inert = true;
  sidebar.classList.add("invisible", "translate-x-full");
  overlay.classList.add("invisible");
  menuButton.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open menu");
  document.body.classList.remove("overflow-hidden");

  if (restoreFocus) menuButton.focus();
};

menuButton.addEventListener("click", () => {
  if (menuButton.getAttribute("aria-expanded") === "true") {
    closeMenu();
  } else {
    openMenu();
  }
});

overlay.addEventListener("click", () => closeMenu({ restoreFocus: true }));

sidebar.addEventListener("click", (event) => {
  if (event.target.closest("a[href^='#']")) closeMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !sidebar.inert) {
    closeMenu({ restoreFocus: true });
  }
});

let lastScroll = window.scrollY;
let scrollTicking = false;

window.addEventListener("scroll", () => {
  if (scrollTicking) return;
  scrollTicking = true;

  window.requestAnimationFrame(() => {
    const currentScroll = window.scrollY;
    const scrollingDown = currentScroll > lastScroll && currentScroll > 50;

    navbar.classList.toggle("-translate-y-full", scrollingDown);
    navbar.classList.toggle("translate-y-0", !scrollingDown);
    mobileNavbar.classList.toggle("-translate-y-full", scrollingDown);
    mobileNavbar.classList.toggle("translate-y-0", !scrollingDown || !sidebar.inert);

    lastScroll = currentScroll;
    scrollTicking = false;
  });
}, { passive: true });
