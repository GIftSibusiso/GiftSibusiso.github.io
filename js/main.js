let darkModeOn = false;
const burgerMenu = document.querySelector(".right-nav"),
       navBar = document.querySelector(".side-bar")
       closeBtn = document.querySelector(".side-bar .material-symbols-outlined"),
       toggle = document.querySelector(".toggle")
       toggleStatus = document.querySelector(".toggle-status")
       body = document.querySelector("body"),
       navigationBar = document.querySelector("nav");

burgerMenu.addEventListener("click", () => {
    navBar.style.cssText = "display: block;";
});

closeBtn.addEventListener("click", () => {
    navBar.style.cssText = "display: none;";
});

function darkMode() {
    toggleStatus.style.cssText = "float: right;";
    body.style.cssText = `
        background-color: #2C2C2C;
        color: #FFFFFF;
    `;
    navigationBar.style.cssText = `
        background-color: #000000;
        color: #FFFFFF;
    `;
}

function normalMode() {
    toggleStatus.style.cssText = "float: left;";
    body.style.cssText = `
        background-color: #FFFFFF;
        color: #000000;
    `;
    navigationBar.style.cssText = `
        background-color: #FFFFFF;
        color: #000000;
    `;
}

toggle.addEventListener("click", () => {
    darkModeOn = !darkModeOn;

    if (darkModeOn) {
        darkMode();
    } else {
        normalMode();
    }
    
});

normalMode();