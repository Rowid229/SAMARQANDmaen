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

    // Scroll-triggered fade-in animations
    const fadeEls = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    fadeEls.forEach(el => observer.observe(el));
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
