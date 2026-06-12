import "../styles/global.css"

// ELEMENTOS
const btn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const navbar = document.getElementById('navbar');
const navbarMobile = document.getElementById('navbar-mobile');

// AÑO AUTOMÁTICO
document.getElementById("year").innerText = new Date().getFullYear();

// FUNCIONES
const openMenu = () => {
  sidebar.classList.remove('invisible', 'translate-x-full');
  overlay.classList.remove('invisible');
  btn.classList.add('open');
  document.body.classList.add('overflow-hidden');
};

const closeMenu = () => {
  sidebar.classList.add('invisible', 'translate-x-full');
  overlay.classList.add('invisible');
  btn.classList.remove('open');
  document.body.classList.remove('overflow-hidden');
};

const toggleMenu = () => {
  if (sidebar.classList.contains('invisible')) {
    openMenu();
  } else {
    closeMenu();
  }
};

// EVENTOS
btn.addEventListener('click', toggleMenu);
overlay.addEventListener('click', closeMenu);

// NAVBAR SCROLL
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll && currentScroll > 50) {
    navbar.classList.add("-translate-y-full");
    navbar.classList.remove("translate-y-0");

    navbarMobile.classList.add("-translate-y-full");
    navbarMobile.classList.remove("translate-y-0");
  } else {
    navbar.classList.add("translate-y-0");
    navbar.classList.remove("-translate-y-full");

    navbarMobile.classList.add("translate-y-0");
    navbarMobile.classList.remove("-translate-y-full");
  }

  lastScroll = currentScroll;
});

// ANIMACIONES AL CARGAR
window.addEventListener("DOMContentLoaded", () => {
  navbar.classList.remove("opacity-0", "-translate-x-10");
  navbar.classList.add("opacity-100", "translate-x-0");

  const leftBar = document.getElementById("left-bar");
  const rightBar = document.getElementById("right-bar");

  [leftBar, rightBar].forEach(bar => {
    bar.classList.remove("opacity-0", "translate-y-10");
    bar.classList.add("opacity-100", "translate-y-0");
  });
});

// INTERSECTION OBSERVER
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("opacity-0", "translate-y-10");
      entry.target.classList.add("opacity-100", "translate-y-0");

      observer.unobserve(entry.target); // 🔥 solo una vez
    }
  });
});

// CERRAR MENÚ AL HACER CLICK EN UN ENLACE
sections.forEach(section => observer.observe(section));

const links = sidebar.querySelectorAll("a");

links.forEach(link => {
  link.addEventListener("click", closeMenu);
});
