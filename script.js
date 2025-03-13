document.getElementById("loadingSkipBtn").addEventListener("click", () => {
    document.getElementsByClassName("loading-container")[0].style.display = "none";
})

function showPopup() {
    document.getElementById('popup').style.display = 'block';
}

function hidePopup() {
    document.getElementById('popup').style.display = 'none';
}

const codeContent = document.getElementById('codeContent');
        const codeEditor = document.getElementById('codeEditor');

        const code = `console.log("Hello, World!");\nfunction greet(name) {\n  return "Hello, " + name;\n}\nconsole.log(greet("Sibusiso"));`;
        const emptyCode = "";

        let charIndex = 0;
        let isWriting = true;

        function typeWriter() {
            if (isWriting) {
                if (charIndex < code.length) {
                    codeContent.textContent = code.substring(0, charIndex + 1);
                    charIndex++;
                    setTimeout(typeWriter, 50); // Typing speed
                } else {
                    isWriting = false;
                    setTimeout(typeWriter, 2000); // Pause before erasing
                }
            } else {
                if (charIndex > 0) {
                    codeContent.textContent = code.substring(0, charIndex - 1);
                    charIndex--;
                    setTimeout(typeWriter, 30); // Erasing speed
                } else {
                    isWriting = true;
                    setTimeout(typeWriter, 1000); // Pause before retyping
                }
            }
        }

        typeWriter();


const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    const name = contactForm.querySelector('input[name="name"]').value;
    const email = contactForm.querySelector('input[name="email"]').value;
    const message = contactForm.querySelector('textarea[name="message"]').value;
    
    const data = {
        "recipient-email": "nkabinde17sibusiso@gmail.com",
        "display-name": 'Portfolio lead',
        "subject": "Contact Form Submission from Portfolio",
        "content": `
<html>
<head></head>
<body style="background-color: #fff; color: #333; font-family: Arial, Helvetica, sans-serif;">
    <div style="background-color: #f4f4f4; max-width: 600px; margin: 15px auto; padding: 5px;">

        <!-- subject -->
        <div style="text-align: center;font-size: 20px; font-weight: bold; padding: 8px;">
            Contact Form Submission from Portfolio
        </div>

        <!-- horizontal line -->
        <div style="background-color: #333; height: 2px;"></div>

        <!-- main content -->
        <div>
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Message: ${message}</p>
        </div>

        <!-- Footer -->
        <div style="text-align: center; padding: 15px; font-size: 12px; color: #777; background: #f4f4f4; border-radius: 0 0 8px 8px;">
            &copy; 2025 Lekker Mail. All rights reserved. <br>
            <a href="https://lekkermail.live">lekkermail.live</a>
        </div>
    </div>
</body>
</html>        
`,
        "html-content": true 
    };
    
    const apiKey = "SibusisoNkabindeAPIKEYYoullneverget"; // Replace with your actual API key
    
    fetch('https://lekkermail.live/v1/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': apiKey
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                throw new Error(errorData.error || 'Network response was not ok');
            });
        }
        return response.json();
    })
    .then(data => {
        alert('Message sent successfully!');
        contactForm.reset(); // Clear the form
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error sending the message. Please try again later.');
    });
});

document.getElementById('menuBtn').addEventListener('click', () => {
    toggleMobileNav()
})

document.getElementsByClassName('nav-items')[0].addEventListener('click', () => {
    toggleMobileNav
})

function toggleMobileNav() {
    const menuIcon = document.getElementById('menuIcon');

    if (menuIcon.innerText === 'menu') {
        menuIcon.innerText = 'close';
        menuIcon.style.color = 'red';
        document.getElementsByClassName('nav-items')[0].style.display = 'flex';
    } else {
        menuIcon.innerText = 'menu';
        menuIcon.style.color = '#fff';
        document.getElementsByClassName('nav-items')[0].style.display = 'none';
    }
}

