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

// Interacción del showcase de proyectos (vista previa a la izquierda, listado a la derecha)
const previewImg = document.getElementById("project-preview-img");
const previewTitle = document.getElementById("project-preview-title");
const previewDesc = document.getElementById("project-preview-desc");
const previewTags = document.getElementById("project-preview-tags");
const previewLink = document.getElementById("project-preview-link");
const projectItems = document.querySelectorAll(".project-item");

if (previewImg && projectItems.length > 0) {
  const setActiveProject = (item) => {
    const img = item.getAttribute("data-img");
    const title = item.getAttribute("data-title");
    const desc = item.getAttribute("data-desc");
    const tags = item.getAttribute("data-tags");
    const url = item.getAttribute("data-url");

    projectItems.forEach((p) => {
      p.classList.remove("border-2", "border-span", "bg-bg2/90", "active");
      p.classList.add("border", "border-border", "bg-bg-card");
      p.setAttribute("aria-selected", "false");

      const num = p.querySelector(".project-item-number");
      const ttl = p.querySelector(".project-item-title");
      const icon = p.querySelector("svg");
      if (num) {
        num.classList.remove("text-span");
        num.classList.add("text-text-muted");
      }
      if (ttl) {
        ttl.classList.remove("text-span", "font-semibold");
        ttl.classList.add("text-text1", "font-medium");
      }
      if (icon) {
        icon.classList.remove("text-span");
        icon.classList.add("text-text-muted");
      }
    });

    item.classList.remove("border", "border-border", "bg-bg-card");
    item.classList.add("border-2", "border-span", "bg-bg2/90", "active");
    item.setAttribute("aria-selected", "true");

    const activeNum = item.querySelector(".project-item-number");
    const activeTtl = item.querySelector(".project-item-title");
    const activeIcon = item.querySelector("svg");
    if (activeNum) {
      activeNum.classList.remove("text-text-muted");
      activeNum.classList.add("text-span");
    }
    if (activeTtl) {
      activeTtl.classList.remove("text-text1", "font-medium");
      activeTtl.classList.add("text-span", "font-semibold");
    }
    if (activeIcon) {
      activeIcon.classList.remove("text-text-muted");
      activeIcon.classList.add("text-span");
    }

    if (previewImg && img && !previewImg.src.endsWith(img)) {
      previewImg.style.opacity = "0.2";
      setTimeout(() => {
        previewImg.src = img;
        previewImg.alt = `${title} preview`;
        previewImg.style.opacity = "1";
      }, 120);
    }

    if (previewTitle && title) previewTitle.textContent = title;
    if (previewDesc && desc) previewDesc.textContent = desc;

    if (previewTags && tags) {
      previewTags.innerHTML = "";
      const tagList = tags.split(",").map((t) => t.trim()).filter(Boolean);
      tagList.forEach((tag) => {
        const span = document.createElement("span");
        span.className = "inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-bg1 border border-border/80 text-xs font-mono text-text1";
        span.textContent = tag;
        previewTags.appendChild(span);
      });
    }

    if (previewLink && url) {
      previewLink.href = url;
      previewLink.setAttribute("aria-label", `View ${title} repository on GitHub (opens in a new tab)`);
    }
  };

  projectItems.forEach((item) => {
    item.addEventListener("mouseenter", () => setActiveProject(item));
    item.addEventListener("focusin", () => setActiveProject(item));
    item.addEventListener("click", () => {
      setActiveProject(item);
      if (window.innerWidth < 1024) {
        const previewCard = document.getElementById("project-preview-card");
        if (previewCard) {
          const rect = previewCard.getBoundingClientRect();
          if (rect.top < 60) {
            previewCard.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      }
    });
  });
}

