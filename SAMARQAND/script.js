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
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
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
        const scrollPosition = window.pageYOffset + 80; // Use the scrolled header height for offset
        
        // Clear all active states first
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Only highlight if we've scrolled past the hero section
        if (scrollPosition > window.innerHeight * 0.8) {
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                const navLink = document.querySelector(`nav a[href="#${sectionId}"]`);
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    if (navLink) navLink.classList.add('active');
                }
            });
        }
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
