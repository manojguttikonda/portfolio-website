document.addEventListener('DOMContentLoaded', () => {

    // ─── Footer Year ──────────────────────────────────────────
    const footerYear = document.getElementById('footer-year');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

    // ─── Cursor Glow Effect (desktop only) ───────────────────
    const cursorGlow = document.querySelector('.cursor-glow');
    const isTouchDevice = () => window.matchMedia('(hover: none)').matches;

    if (cursorGlow) {
        if (isTouchDevice()) {
            cursorGlow.style.display = 'none';
        } else {
            document.addEventListener('mousemove', (e) => {
                cursorGlow.style.left = e.clientX + 'px';
                cursorGlow.style.top = e.clientY + 'px';
            });

            document.addEventListener('mouseleave', () => {
                cursorGlow.style.opacity = '0';
            });

            document.addEventListener('mouseenter', () => {
                cursorGlow.style.opacity = '1';
            });
        }
    }

    // ─── Mobile Menu Toggle ───────────────────────────────────
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
        burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        burger.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            burger.setAttribute('aria-expanded', 'false');
            burger.setAttribute('aria-label', 'Open navigation menu');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('nav-active') && !nav.contains(e.target) && !burger.contains(e.target)) {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            burger.setAttribute('aria-expanded', 'false');
            burger.setAttribute('aria-label', 'Open navigation menu');
        }
    });

    // ─── Dark Mode Toggle ─────────────────────────────────────
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Restore saved preference (dark is default — no class needed)
    if (localStorage.getItem('theme') === 'light') {
        enableLightMode();
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            disableLightMode();
        } else {
            enableLightMode();
        }
    });

    function enableLightMode() {
        body.classList.add('light-mode');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }

    function disableLightMode() {
        body.classList.remove('light-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    }

    // ─── Typewriter Effect ────────────────────────────────────
    const typingText = document.getElementById('typing-text');
    const phrases = ['Full Stack Developer', 'Cloud Engineer', 'Java Specialist', 'DevOps Enthusiast'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(type, typeSpeed);
    }

    type();

    // ─── Scroll Animations (Intersection Observer) ────────────
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Expanded to include stat-cards, skill-category, section-title
    const animatedElements = document.querySelectorAll(
        '.timeline-item, .stat-card, .skill-category, .section-title, .info-item, .pipeline-step'
    );
    animatedElements.forEach(el => observer.observe(el));

    // ─── Active Nav Link (Scroll Spy) ─────────────────────────
    const sections = document.querySelectorAll('main section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navAnchors.forEach(a => {
                    a.classList.remove('active');
                    if (a.getAttribute('href') === `#${id}`) {
                        a.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.4
    });

    sections.forEach(section => spyObserver.observe(section));

    // ─── Header Scroll Effect ─────────────────────────────────
    const header = document.querySelector('.glass-header');
    const isLightMode = () => body.classList.contains('light-mode');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.padding = '0.5rem 5%';
            header.style.background = isLightMode()
                ? 'rgba(255, 255, 255, 0.97)'
                : 'rgba(5, 5, 17, 0.97)';
        } else {
            header.style.padding = '1rem 5%';
            header.style.background = isLightMode()
                ? 'rgba(255, 255, 255, 0.9)'
                : 'rgba(5, 5, 17, 0.8)';
        }
    });

    // ─── Contact Form ─────────────────────────────────────────
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        // Insert success message element into form
        const successMsg = document.createElement('div');
        successMsg.className = 'form-success';
        successMsg.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <strong>Message Sent!</strong><br>
            Thank you for reaching out. I'll get back to you soon.
        `;
        contactForm.appendChild(successMsg);

        const submitBtn = contactForm.querySelector('.submit-btn');

        contactForm.addEventListener('submit', (e) => {
            // Personalise auto-response
            const nameInput = document.getElementById('name');
            const autoresponseInput = document.getElementById('autoresponse');
            if (nameInput && autoresponseInput) {
                const name = nameInput.value;
                autoresponseInput.value = `Hello ${name},\n\nThank you for your message. I will get back to you as soon as possible.\n\nBest regards,\nManoj Guttikonda`;
            }

            // Show loading state
            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            }
        });
    }

});
