let i = 1;
document.querySelector(".slide-" + i).style.display = "block"

function nextSlide() {
    document.querySelector(".slide-" + i).style.display = "none"
    i++;

    if (i > 3) {
        i = 1;
    }

    document.querySelector(".slide-" + i).style.display = "block"
}

function previousSlide() {
    document.querySelector(".slide-" + i).style.display = "none"
    i--;

    if (i < 1) {
        i = 3;
    }

    document.querySelector(".slide-" + i).style.display = "block"
}

document.querySelector(".next").addEventListener("click", () => {
    nextSlide();
})

document.querySelector(".prev").addEventListener("click", () => {
    previousSlide()
})