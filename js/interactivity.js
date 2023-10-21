const menuBtn = document.querySelector(".mobile-menu"),
      nav = document.querySelector("nav"),
      closeBtn = document.querySelector(".close-menu");


menuBtn.addEventListener("click", () => {
    nav.classList.add("menu-btn");
})

closeBtn.addEventListener("click", () => {
    nav.classList.remove("menu-btn");
})