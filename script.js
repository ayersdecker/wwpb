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

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const configCode = document.getElementById('config-code').value;
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

        // Build success message
        let successMessage = `Thank you, ${name}! Your message has been received. We'll get back to you soon at ${email}.`;
        
        if (configCode && configCode.trim()) {
            successMessage += '\n\nWe received your configuration code.';
        }

        // Since this is a static site, show a success message
        // In a real implementation, this would send data to a server
        alert(successMessage);
        
        // Reset form
        contactForm.reset();
    });
}

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

// ===================================
// Customization Page Functionality
// ===================================
(function() {
    // Only run on customize page
    if (!document.getElementById('customize')) {
        return;
    }

    // Store selected options
    const selections = {
        theme: null,
        background: null,
        props: ['classic'],
        layout: null,
        eventName: '',
        eventDate: '',
        customMessage: ''
    };

    // Wait for DOM to be ready
    function init() {
        console.log('Initializing customization page...');
        
        // Option card selection
        const optionCards = document.querySelectorAll('.option-card');
        console.log('Found option cards:', optionCards.length);
        
        optionCards.forEach(card => {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                const option = this.dataset.option;
                const value = this.dataset.value;
                
                console.log('Clicked card:', option, value);

                // Remove selected class from siblings
                const siblings = this.parentElement.querySelectorAll('.option-card');
                siblings.forEach(sibling => sibling.classList.remove('selected'));

                // Add selected class to this card
                this.classList.add('selected');

                // Update selections
                selections[option] = value;
                console.log('Updated selections:', selections);

                // Update preview
                updatePreview();
            });
        });

        // Props checkbox handling
        const propCheckboxes = document.querySelectorAll('.prop-checkbox input[type="checkbox"]');
        console.log('Found prop checkboxes:', propCheckboxes.length);
        
        propCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const value = this.value;
                if (this.checked) {
                    if (!selections.props.includes(value)) {
                        selections.props.push(value);
                    }
                } else {
                    const index = selections.props.indexOf(value);
                    if (index > -1) {
                        selections.props.splice(index, 1);
                    }
                }
                updatePreview();
            });
        });

        // Text input handling
        const eventNameInput = document.getElementById('event-name');
        const eventDateInput = document.getElementById('event-date');
        const customMessageInput = document.getElementById('custom-message');

        if (eventNameInput) {
            eventNameInput.addEventListener('input', function() {
                selections.eventName = this.value;
                updatePreview();
            });
        }

        if (eventDateInput) {
            eventDateInput.addEventListener('change', function() {
                selections.eventDate = this.value;
                updatePreview();
            });
        }

        if (customMessageInput) {
            customMessageInput.addEventListener('input', function() {
                selections.customMessage = this.value;
                updateCharCount(this);
                updatePreview();
            });
        }

        // Character count for custom message
        function updateCharCount(textarea) {
            const charCount = textarea.parentElement.querySelector('.char-count');
            if (charCount) {
                const currentLength = textarea.value.length;
                const maxLength = textarea.getAttribute('maxlength');
                charCount.textContent = `${currentLength} / ${maxLength}`;
            }
        }

        // Update preview section
        function updatePreview() {
            const themeDisplay = document.getElementById('selected-theme');
            const backgroundDisplay = document.getElementById('selected-background');
            const propsDisplay = document.getElementById('selected-props');
            const layoutDisplay = document.getElementById('selected-layout');
            const eventNameDisplay = document.getElementById('preview-event-name');

            if (themeDisplay) {
                themeDisplay.textContent = selections.theme ? 
                    selections.theme.charAt(0).toUpperCase() + selections.theme.slice(1) : 
                    'Not selected';
            }

            if (backgroundDisplay) {
                backgroundDisplay.textContent = selections.background ? 
                    selections.background.charAt(0).toUpperCase() + selections.background.slice(1) : 
                    'Not selected';
            }

            if (propsDisplay) {
                propsDisplay.textContent = selections.props.length > 0 ? 
                    selections.props.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(', ') : 
                    'None selected';
            }

            if (layoutDisplay) {
                layoutDisplay.textContent = selections.layout ? 
                    selections.layout.charAt(0).toUpperCase() + selections.layout.slice(1) : 
                    'Not selected';
            }

            if (eventNameDisplay) {
                eventNameDisplay.textContent = selections.eventName || '-';
            }
        }

        // Reset button
        const resetBtn = document.getElementById('reset-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                // Reset selections
                selections.theme = null;
                selections.background = null;
                selections.props = ['classic'];
                selections.layout = null;
                selections.eventName = '';
                selections.eventDate = '';
                selections.customMessage = '';

                // Reset UI
                optionCards.forEach(card => card.classList.remove('selected'));
                
                propCheckboxes.forEach(checkbox => {
                    checkbox.checked = checkbox.value === 'classic';
                });

                if (eventNameInput) eventNameInput.value = '';
                if (eventDateInput) eventDateInput.value = '';
                if (customMessageInput) {
                    customMessageInput.value = '';
                    updateCharCount(customMessageInput);
                }

                // Hide config code section
                const configBox = document.getElementById('config-code-box');
                if (configBox) {
                    configBox.style.display = 'none';
                }

                updatePreview();

                // Show feedback
                alert('All selections have been reset!');
            });
        }

        // Generate Config Code button
        const generateCodeBtn = document.getElementById('generate-code-btn');
        console.log('Generate button found:', !!generateCodeBtn);
        
        if (generateCodeBtn) {
            generateCodeBtn.addEventListener('click', function() {
                console.log('Generate button clicked!');
                // No validation - allow partial selections
                // Generate config code with whatever is selected
                const configCode = generateConfigCode(selections);
                console.log('Generated code:', configCode);

                // Display config code
                const configCodeText = document.getElementById('config-code-text');
                const configBox = document.getElementById('config-code-box');
                
                console.log('Config elements:', !!configCodeText, !!configBox);
                
                if (configCodeText && configBox) {
                    configCodeText.textContent = configCode;
                    configBox.style.display = 'block';
                    
                    // Smooth animation
                    configBox.style.animation = 'slideIn 0.5s ease-out';
                    console.log('Config code displayed!');
                }
            });
        }

        // Copy config code button
        const copyCodeBtn = document.getElementById('copy-code-btn');
        if (copyCodeBtn) {
            copyCodeBtn.addEventListener('click', function() {
                const configCodeText = document.getElementById('config-code-text');
                const copyIcon = document.getElementById('copy-icon');
                
                if (configCodeText) {
                    // Copy to clipboard
                    navigator.clipboard.writeText(configCodeText.textContent).then(() => {
                        // Update button to show success
                        const originalText = copyCodeBtn.innerHTML;
                        copyCodeBtn.innerHTML = '<span>✅</span> Copied!';
                        copyCodeBtn.style.backgroundColor = '#4CAF50';
                        
                        // Reset button after 2 seconds
                        setTimeout(() => {
                            copyCodeBtn.innerHTML = originalText;
                            copyCodeBtn.style.backgroundColor = '';
                        }, 2000);
                    }).catch(err => {
                        alert('Failed to copy code. Please select and copy it manually.');
                    });
                }
            });
        }

        // Generate a configuration code from selections
        function generateConfigCode(selections) {
            console.log('Generating code from:', selections);
            // Create a compact code format
            const parts = [];
        
        // Theme code (first letter uppercase)
        if (selections.theme) {
            parts.push(`T:${selections.theme.charAt(0).toUpperCase()}`);
        }
        
        // Background code (first letter uppercase)
        if (selections.background) {
            parts.push(`B:${selections.background.charAt(0).toUpperCase()}`);
        }
        
        // Props codes (first letters)
        if (selections.props && selections.props.length > 0) {
            const propCodes = selections.props.map(p => p.charAt(0).toUpperCase()).join('');
            parts.push(`P:${propCodes}`);
        }
        
        // Layout code (first letter uppercase)
        if (selections.layout) {
            parts.push(`L:${selections.layout.charAt(0).toUpperCase()}`);
        }
        
        // Event name (if provided)
        if (selections.eventName && selections.eventName.trim()) {
            parts.push(`E:${selections.eventName.trim()}`);
        }
        
        // Event date (if provided)
        if (selections.eventDate) {
            parts.push(`D:${selections.eventDate}`);
        }
        
        // Custom message (if provided)
        if (selections.customMessage && selections.customMessage.trim()) {
            parts.push(`M:${selections.customMessage.trim()}`);
        }
        
        // Create human-readable version - handle empty selections
        if (parts.length === 0) {
            return 'WWPB-NONE (No selections made yet)';
        }
        
        const code = `WWPB-${parts.join('|')}`;
        
        console.log('Generated code:', code);
        return code;
        }

        // Initialize preview
        updatePreview();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

// ===================================
// Testimonials Slider
// ===================================
(function() {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const dotsContainer = document.querySelector('.testimonial-dots');
    
    if (!testimonialItems.length || !dotsContainer) return;
    
    let currentIndex = 0;
    const slideInterval = 7000; // 7 seconds per testimonial
    let autoSlideTimer;
    
    // Create dots
    testimonialItems.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('testimonial-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.testimonial-dot');
    const prevArrow = document.querySelector('.testimonial-arrow-left');
    const nextArrow = document.querySelector('.testimonial-arrow-right');
    
    function goToSlide(index) {
        // Remove active class from current items
        testimonialItems[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');
        
        // Add active class to new items
        currentIndex = index;
        testimonialItems[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
        
        // Reset auto-slide timer
        clearInterval(autoSlideTimer);
        startAutoSlide();
    }
    
    function nextSlide() {
        const nextIndex = (currentIndex + 1) % testimonialItems.length;
        goToSlide(nextIndex);
    }
    
    function prevSlide() {
        const prevIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
        goToSlide(prevIndex);
    }
    
    function startAutoSlide() {
        autoSlideTimer = setInterval(nextSlide, slideInterval);
    }
    
    // Arrow click handlers
    if (prevArrow) {
        prevArrow.addEventListener('click', prevSlide);
    }
    
    if (nextArrow) {
        nextArrow.addEventListener('click', nextSlide);
    }
    
    // Start auto-sliding
    startAutoSlide();
    
    // Pause on hover
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(autoSlideTimer);
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }
})();

// ===================================
// Gallery Carousel & Lightbox
// ===================================
(function() {
    const track = document.querySelector('.gallery-track');
    const items = document.querySelectorAll('.gallery-item');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const paginationContainer = document.querySelector('.gallery-pagination');
    const currentPageSpan = document.querySelector('.current-page');
    const totalPagesSpan = document.querySelector('.total-pages');
    
    if (!track || items.length === 0) return;
    
    // Carousel settings
    let currentPage = 0;
    const itemsPerPage = 3;
    const totalPages = Math.ceil(items.length / itemsPerPage);
    
    // Initialize
    totalPagesSpan.textContent = totalPages;
    
    // Create pagination dots
    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('div');
        dot.classList.add('pagination-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToPage(i));
        paginationContainer.appendChild(dot);
    }
    
    const dots = document.querySelectorAll('.pagination-dot');
    
    function goToPage(pageIndex) {
        currentPage = pageIndex;
        const offset = -(pageIndex * 100);
        track.style.transform = `translateX(${offset}%)`;
        
        // Update pagination
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === pageIndex);
        });
        
        // Update counter
        currentPageSpan.textContent = pageIndex + 1;
        
        // Re-trigger animations for visible items
        items.forEach((item, index) => {
            const itemPage = Math.floor(index / itemsPerPage);
            if (itemPage === pageIndex) {
                item.style.animation = 'none';
                setTimeout(() => {
                    item.style.animation = `fadeInUp 0.6s ease forwards ${(index % itemsPerPage) * 0.1}s`;
                }, 10);
            }
        });
    }
    
    function nextPage() {
        if (currentPage < totalPages - 1) {
            goToPage(currentPage + 1);
        } else {
            goToPage(0); // Loop back to start
        }
    }
    
    function prevPage() {
        if (currentPage > 0) {
            goToPage(currentPage - 1);
        } else {
            goToPage(totalPages - 1); // Loop to end
        }
    }
    
    // Navigation button handlers
    prevBtn.addEventListener('click', prevPage);
    nextBtn.addEventListener('click', nextPage);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevPage();
        if (e.key === 'ArrowRight') nextPage();
    });
    
    // Auto-advance carousel (optional, uncomment to enable)
    // let autoAdvance = setInterval(nextPage, 5000);
    // track.addEventListener('mouseenter', () => clearInterval(autoAdvance));
    // track.addEventListener('mouseleave', () => autoAdvance = setInterval(nextPage, 5000));
    
    // Lightbox functionality
    const lightbox = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImage');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let currentLightboxIndex = 0;
    
    // Open lightbox on image click
    items.forEach((item, index) => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                currentLightboxIndex = index;
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });
    
    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    lightboxClose.addEventListener('click', closeLightbox);
    
    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Lightbox navigation
    function showLightboxImage(index) {
        if (index >= 0 && index < items.length) {
            currentLightboxIndex = index;
            const img = items[index].querySelector('img');
            if (img) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
            }
        }
    }
    
    lightboxPrev.addEventListener('click', () => {
        const newIndex = (currentLightboxIndex - 1 + items.length) % items.length;
        showLightboxImage(newIndex);
    });
    
    lightboxNext.addEventListener('click', () => {
        const newIndex = (currentLightboxIndex + 1) % items.length;
        showLightboxImage(newIndex);
    });
    
    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') {
                const newIndex = (currentLightboxIndex - 1 + items.length) % items.length;
                showLightboxImage(newIndex);
            }
            if (e.key === 'ArrowRight') {
                const newIndex = (currentLightboxIndex + 1) % items.length;
                showLightboxImage(newIndex);
            }
        }
    });
    
    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextPage();
        }
        if (touchEndX > touchStartX + 50) {
            prevPage();
        }
    }
    
    // Lightbox swipe support
    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                const newIndex = (currentLightboxIndex + 1) % items.length;
                showLightboxImage(newIndex);
            } else {
                const newIndex = (currentLightboxIndex - 1 + items.length) % items.length;
                showLightboxImage(newIndex);
            }
        }
    });
})();
