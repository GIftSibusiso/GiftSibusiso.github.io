document.getElementById("loadingSkipBtn").addEventListener("click", () => {
    document.getElementsByClassName("loading-container")[0].style.display = "none";
})


function randomValues () {
    const values = []
    let tot = 0
    while (tot < screen.width) {
        let value = Math.floor(Math.random() * 200) + 50;
        tot += value;
        values.push(value);
    }

    return values;
}


function shuffleSectionBackground () {
    document.querySelectorAll(".first-section-background div").forEach( (div) => {
        let values = randomValues()
        div.innerHTML = "";
    
        for (let i=0; i<values.length; i++) {
            let childDiv = document.createElement("div");
            childDiv.className = "first-section-background-child";
            childDiv.style.width = `${values[i]}px`;
            div.appendChild(childDiv);
        }
    });
}

setInterval(shuffleSectionBackground, 3000);
