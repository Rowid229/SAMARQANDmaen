// Simple function to scroll to sections
function scrollToSection(sectionId) {
    console.log('scrollToSection called with:', sectionId);
    const targetSection = document.getElementById(sectionId);
    
    if (targetSection) {
        const headerHeight = 70;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        console.log('Scrolled to section:', sectionId);
    } else {
        console.error('Section not found:', sectionId);
        alert('Section not found: ' + sectionId);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Debug: Check if navigation elements exist
    console.log('DOM loaded, checking navigation elements...');
    console.log('Hamburger:', document.getElementById('hamburger'));
    console.log('Nav menu:', document.getElementById('nav-menu'));
    console.log('Nav links:', document.querySelectorAll('nav a'));
    
    // Hamburger menu functionality
    const hamburger = document.getElementById('hamburger');
    const navOverlay = document.getElementById('nav-overlay');
    
    if (hamburger && navOverlay) {
        hamburger.addEventListener('click', function(e) {
            console.log('Hamburger clicked!');
            hamburger.classList.toggle('active');
            navOverlay.classList.toggle('active');
            console.log('Menu active:', hamburger.classList.contains('active'));
        });
        
        navOverlay.addEventListener('click', function() {
            // Commented out for testing - menu stays open
            // hamburger.classList.remove('active');
            // navOverlay.classList.remove('active');
        });
    } else {
        console.error('Hamburger or navOverlay not found!');
    }
    
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            formMessage.textContent = 'Thank you for contacting us! We will get back to you soon.';
            form.reset();
        });
    }

    // Handle social media links explicitly
    const whatsappLink = document.getElementById('whatsapp-link');
    const facebookLink = document.getElementById('facebook-link');
    const instagramLink = document.getElementById('instagram-link');

    if (whatsappLink) {
        whatsappLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            window.open('https://wa.me/962795911913', '_blank', 'noopener,noreferrer');
        });
    }

    if (facebookLink) {
        facebookLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            window.open('https://www.facebook.com/SAMARQAND', '_blank', 'noopener,noreferrer');
        });
    }

    if (instagramLink) {
        instagramLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            window.open('https://www.instagram.com/SAMARQAND', '_blank', 'noopener,noreferrer');
        });
    }

    // Sticky Navigation with Scroll Effect
    const header = document.querySelector('header');
    const logo = document.querySelector('.site-logo');
    
    window.addEventListener('scroll', function() {
        const windowTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (windowTop > 100) {
            header.classList.add('navShadow');
        } else {
            header.classList.remove('navShadow');
        }
    });

    // Click Logo to Scroll to Top
    if (logo) {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    

    



    // Enhanced Scroll-triggered animations
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .slide-up, .scale-in, .rotate-in, .bounce-in, .service-card, .product-card, .Partners-grid img');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { 
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));

    // Parallax Effect for Background Elements
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Smooth reveal animation for sections
    const allSections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            } else {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
            }
        });
    }, { threshold: 0.1 });

    allSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        sectionObserver.observe(section);
    });

    // Typewriter animation trigger
    const typewriterElement = document.querySelector('.typewriter-multi');
    if (typewriterElement) {
        const typewriterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Reset animation
                    typewriterElement.style.animation = 'none';
                    typewriterElement.offsetHeight; // Trigger reflow
                    typewriterElement.style.animation = 'typing-multi 4s steps(80) forwards, blink 0.7s infinite';
                }
            });
        }, { threshold: 0.3 });

        typewriterObserver.observe(typewriterElement);
    }

    // Counter animation for About Us section (all at once, Arabic page)
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerHTML = end + '+';
            }
        };
        window.requestAnimationFrame(step);
    }

    const aboutSection = document.getElementById('about');
    const productCounter = document.getElementById('product-counter');
    const countriesCounter = document.getElementById('countries-counter');
    const yearsCounter = document.getElementById('years-counter');
    const employeesCounter = document.getElementById('employees-counter');
    let aboutCountersAnimated = false;
    if (aboutSection && productCounter && countriesCounter && yearsCounter && employeesCounter) {
        const aboutCounterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !aboutCountersAnimated) {
                    animateValue(productCounter, 0, 500, 2000);
                    animateValue(countriesCounter, 0, 40, 1500);
                    animateValue(yearsCounter, 0, 20, 1500);
                    animateValue(employeesCounter, 0, 200, 2000);
                    aboutCountersAnimated = true;
                    observer.unobserve(aboutSection);
                }
            });
        }, { threshold: 0.4 });
        aboutCounterObserver.observe(aboutSection);
    }

    // Counter animation for Products section
    const productsSection = document.getElementById('products');
    let productsCountersAnimated = false;
    if (productsSection) {
        const productsCounterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !productsCountersAnimated) {
                    productsCountersAnimated = true;
                    observer.unobserve(productsSection);
                }
            });
        }, { threshold: 0.4 });
        productsCounterObserver.observe(productsSection);
    }

    // Products grid animation (only if elements exist)
    const grid = document.querySelector('.products-grid');
    if (grid) {
        const clone = grid.cloneNode(true);
        clone.classList.add('products-grid-clone');
        grid.parentNode.appendChild(clone);

        // Set widths for seamless scroll
        const totalWidth = grid.scrollWidth;
        grid.style.width = totalWidth + "px";
        clone.style.width = totalWidth + "px";

        // Animate both grids together
        grid.parentNode.style.display = "flex";
        grid.parentNode.style.flexWrap = "nowrap";
        grid.parentNode.style.overflow = "hidden";

        // Animation using JS for seamless effect
        let pos = 0;
        function animate() {
            pos -= 1; // speed
            if (Math.abs(pos) >= totalWidth) pos = 0;
            grid.style.transform = `translateX(${pos}px)`;
            clone.style.transform = `translateX(${pos + totalWidth}px)`;
            requestAnimationFrame(animate);
        }
        animate();
    }

    // Contact form handling (only if form exists)
    const contactForm = document.getElementById('form1');
    const contactMsg = document.getElementById('message');
    if (contactForm && contactMsg) {
        contactForm.addEventListener('submit', async e => {
            e.preventDefault();                
            const data = new FormData(contactForm);

            const res = await fetch(contactForm.action, {
                method: contactForm.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (res.ok) {
                contactMsg.textContent = '✅ Thanks for your message!';
                contactForm.reset();
            } else {
                contactMsg.textContent = '❌ Oops! Something went wrong.';
            }
        });
    }
});
