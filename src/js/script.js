// add the id "menu-toggle" in a constant called button
const button = document.getElementById("menu-toggle");

// add the id "mav-menu" in a constant called menu
const menu = document.getElementById("nav-menu");

// Whe the burger button is clicked
// toggle the "active" class on the menu to show or hide it
button.addEventListener("click", () => {
    menu.classList.toggle("active");
});

const saludo = document.getElementById("message");

saludo.addEventListener("click", () => {
    alert("Hola Bienvenido!!")
})