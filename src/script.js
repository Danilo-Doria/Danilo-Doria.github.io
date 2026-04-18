const button = document.getElementById("menuToggle");
const menu = document.getElementById("navMenu");

button.addEventListener("click", () => {
    menu.classList.toggle("active");
});