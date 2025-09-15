// Loading Screen
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const skipBtn = document.getElementById('loadingSkipBtn');
    
    // Show loading screen for at least 5 seconds
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
    }, 5000);
    
    skipBtn.addEventListener('click', () => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
    });
    
    // Mobile Navigation
    const menuBtn = document.getElementById('menuBtn');
    const closeBtn = document.getElementById('closeBtn');
    const mobileNav = document.getElementById('mobileNav');
    const overlay = document.getElementById('overlay');
    
    menuBtn.addEventListener('click', () => {
        mobileNav.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    closeBtn.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    overlay.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            mobileNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            await postData('portfolio-submissions', {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            });

            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
});

// Typewriter effect for code editor
const codeContent = document.getElementById('codeContent');
if (codeContent) {
    const codeLines = [
        '<span class="comment">// Welcome to my portfolio</span>',
        'const developer = {',
        '  name: "Sibusiso Nkabinde",',
        '  role: "Full-Stack Developer",',
        '  skills: ["JavaScript", "Python", "Flutter", "Django"],',
        '  passion: "Building impactful software solutions"',
        '};',
        '',
        '<span class="keyword">function</span> <span class="function">createProject</span>(idea) {',
        '  <span class="keyword">return</span> idea + <span class="string">" brought to life with clean code!"</span>;',
        '}'
    ];
    
    let currentLine = 0;
    let currentChar = 0;
    let typingInterval;
    
    function typeWriter() {
        if (currentLine < codeLines.length) {
            if (currentChar < codeLines[currentLine].length) {
                codeContent.innerHTML += codeLines[currentLine].charAt(currentChar);
                currentChar++;
            } else {
                codeContent.innerHTML += '<br>';
                currentLine++;
                currentChar = 0;
            }
        } else {
            clearInterval(typingInterval);
        }
    }
    
    typingInterval = setInterval(typeWriter, 50);
}


async function postData(subpath, payload) {
  try {
    const response = await fetch(`https://form-submissions-five.vercel.app/api/v1/submit/${subpath}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: payload
    });

    const data = await response.json();
    console.log("POST response:", data);
  } catch (error) {
    console.error("POST error:", error);
  }
}