document.addEventListener('DOMContentLoaded', function() {
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

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('nav a[href*="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').split('#')[1];
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = 70; // Use the scrolled header height for offset
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active Navigation Link Highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavLink() {
        const headerHeight = 70; // Adjust if your header height changes
        const scrollPosition = window.pageYOffset + headerHeight + 1;

        let currentSectionId = null;
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            // If we're at least 60% through the previous section, highlight the next
            if (i < sections.length - 1) {
                const nextSection = sections[i + 1];
                const nextSectionTop = nextSection.offsetTop;
                if (scrollPosition >= sectionTop + sectionHeight * 0.6 && scrollPosition < nextSectionTop + sectionHeight * 0.6) {
                    currentSectionId = nextSection.getAttribute('id');
                }
            }
            // Otherwise, highlight the current section as fallback
            if (!currentSectionId && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        }

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.includes('#')) {
                const id = href.split('#')[1];
                if (id === currentSectionId) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initial call

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

    const grid = document.getElementById('productsGrid');
    const wrapper = document.querySelector('.scrolling-wrapper');
    const productCards = Array.from(grid.children);

    // Set grid width to fit all cards in a row
    grid.style.width = (productCards[0].offsetWidth + 24) * productCards.length + 'px';

    // Infinite scroll logic
    wrapper.addEventListener('scroll', function() {
        // If scrolled near the end, append more cards
        if (wrapper.scrollLeft + wrapper.offsetWidth >= grid.scrollWidth - 10) {
            productCards.forEach(card => {
                grid.appendChild(card.cloneNode(true));
            });
            // Update grid width
            grid.style.width = (productCards[0].offsetWidth + 24) * grid.children.length + 'px';
        }
        // Optional: If scrolled too far, reset to avoid infinite DOM growth
        if (wrapper.scrollLeft < 10 && grid.children.length > productCards.length * 2) {
            // Remove the first set of cards
            for (let i = 0; i < productCards.length; i++) {
                grid.removeChild(grid.firstChild);
            }
            // Reset scroll position
            wrapper.scrollLeft = wrapper.scrollLeft - (productCards[0].offsetWidth + 24) * productCards.length;
        }
    });
}); 

const form = document.getElementById('form1');
const msg  = document.getElementById('message');

form.addEventListener('submit', async e => {
  e.preventDefault();                
  const data = new FormData(form);

  const res = await fetch(form.action, {
    method: form.method,
    body:   data,
    headers:{ 'Accept': 'application/json' }
  });

  if (res.ok) {
    msg.textContent = '✅ Thanks for your message!';
    form.reset();
  } else {
    msg.textContent = '❌ Oops! Something went wrong.';
  }
});

document.addEventListener("DOMContentLoaded", function() {
    const grid = document.querySelector('.products-grid');
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
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const headerOffset = document.querySelector('header').offsetHeight;
      const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  });
});

// Language toggle for Arabic/English

let currentLang = 'en';
const langBtn = document.getElementById('lang-toggle');
if (langBtn) {
  langBtn.addEventListener('click', function() {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    for (const [id, text] of Object.entries(translations[currentLang])) {
      const el = document.getElementById(id);
      if (el) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = text;
        } else {
          el.innerHTML = text;
        }
      }
    }
    // Toggle button text
    this.textContent = currentLang === 'en' ? 'العربية' : 'English';
  });
}
