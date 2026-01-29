// ===================================
// Mobile Navigation Toggle
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Function to toggle hamburger animation
    function toggleHamburgerAnimation(isActive) {
        const spans = hamburger.querySelectorAll('span');
        if (isActive) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            hamburger.setAttribute('aria-expanded', 'true');
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
            hamburger.setAttribute('aria-expanded', 'false');
        }
    }

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        toggleHamburgerAnimation(navMenu.classList.contains('active'));
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            toggleHamburgerAnimation(false);
        });
    });

    // Observe elements for animation on scroll
    const animateElements = document.querySelectorAll('.feature, .service-card, .gallery-item');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // ===================================
    // Interactive Floating Props
    // ===================================
    const props = document.querySelectorAll('.prop');
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;

        props.forEach((prop, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * 50 * speed;
            const y = (mouseY - 0.5) * 50 * speed;
            
            prop.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // ===================================
    // Scroll-based Parallax for Props
    // ===================================
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        props.forEach((prop, index) => {
            const speed = (index % 3 + 1) * 0.2;
            const yPos = -(scrolled * speed);
            const currentTransform = prop.style.transform || '';
            const translateMatch = currentTransform.match(/translate\(([^,]+),\s*([^)]+)\)/);
            if (translateMatch) {
                prop.style.transform = `translate(${translateMatch[1]}, calc(${translateMatch[2]} + ${yPos}px))`;
            }
        });
    });

    // ===================================
    // Enhanced Scroll Reveal Animations
    // ===================================
    const scrollElements = {
        '.section-header': 'scroll-reveal',
        '.feature': 'scroll-scale',
        '.service-card': 'scroll-fade-left',
        '.gallery-item': 'scroll-fade-right',
        '.about-text': 'scroll-fade-left',
        '.contact-info': 'scroll-fade-left',
        '.contact-form': 'scroll-fade-right'
    };

    Object.keys(scrollElements).forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.classList.add(scrollElements[selector]);
            el.style.transitionDelay = `${index * 0.1}s`;
        });
    });

    const scrollObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    document.querySelectorAll('.scroll-reveal, .scroll-fade-left, .scroll-fade-right, .scroll-scale').forEach(el => {
        scrollObserver.observe(el);
    });

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===================================
// Smooth Scrolling
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Contact Form Handling
// ===================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Since this is a static site, show a success message
    // In a real implementation, this would send data to a server
    alert(`Thank you, ${name}! Your message has been received. We'll get back to you soon at ${email}.`);
    
    // Reset form
    contactForm.reset();
});

// ===================================
// Active Navigation Link with Throttle
// ===================================
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(function() {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-menu a');
            
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
            
            scrollTimeout = null;
        }, 100);
    }
});
