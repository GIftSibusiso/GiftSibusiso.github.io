document.getElementById("loadingSkipBtn").addEventListener("click", () => {
    document.getElementsByClassName("loading-container")[0].style.display = "none";
})

document.getElementById("menuBtn").addEventListener("click", () => {
    document.getElementsByClassName("nav-popup")[0].style.display = "block";
    document.getElementById("menuBtn").style.display = "none";
    document.getElementsByClassName("close-menu")[0].style.display = "block";
})

document.getElementsByClassName("close-menu")[0].addEventListener("click", () => {
    hideNav()
})

document.getElementsByClassName("popup-shade")[0].addEventListener("click", () => {
    hideNav();
})

function hideNav() {
    document.getElementsByClassName("nav-popup")[0].style.display = "none";
    document.getElementsByClassName("close-menu")[0].style.display = "none";
    document.getElementById("menuBtn").style.display = "block";
}


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

for (let i=0; i<46; i++) {
    let bluredDiv = document.createElement("div");
    document.querySelector(".first-section-background").appendChild(bluredDiv);
}


setInterval(shuffleSectionBackground, 2000);

async function sendForm(fullname, email, message) {
    const url = "https://email-automation-ten.vercel.app/v1/send-email";
    const key = "SibusisoNkabindeAPIKEYYoullneverget";
    const headers = {
        "Content-Type": "application/json",
        "X-API-Key": key
    };


    const response = await fetch(url, {
        "headers": headers,
        "method": "POST",
        "body": JSON.stringify({
            "recipient-email": "nkabinde17sibusiso@gmail.com",
            "display-name": "Portfolio form submission",
            "subject":  "You have someone interested in you!!",
            "content": `
Hello Sibusiso,

From: ${fullname}
Email: ${email}
Message: ${message}
            `,
            "html-content": false
        })
    })

    if (!response.ok) {
        alert("Couldn't submit the form, please use email or mobile numbers to contact Sibusiso")
    } else {
        alert("Form submitted successfully!!")
    }
}


document.getElementById("myForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    sendForm(formData.get("name"), formData.get("email"), formData.get("message"))
})

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }