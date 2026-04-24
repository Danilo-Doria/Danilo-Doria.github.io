// add the id "menu-toggle" in a constant called button
const button = document.getElementById("menu-toggle");

// add the id "mav-menu" in a constant called menu
const menu = document.getElementById("nav-menu");

// When the burger button is clicked
// toggle the "active" class on the menu to show or hide it
button.addEventListener("click", () => {
    menu.classList.toggle("active");
});

const links = menu.querySelectorAll("#nav-menu a")

links.forEach((link) => {
    link.addEventListener('click', () => {
        menu.classList.toggle("active")
    })
})

// add the id "message" in a constant called greeting
const greeting = document.getElementById("message");

// When the buttom is clicked
greeting.addEventListener("click", () => {
    alert("Hola Bienvenido!!")
})