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

    // Carousel/Product Slider Logic
    const carousel = document.querySelector('.products-grid');
    const cards = document.querySelectorAll('.product-card');
    let index = 0;

    if (carousel && cards.length > 0) {
        const nextBtn = document.querySelector('.next');
        const prevBtn = document.querySelector('.prev');
        
        if (nextBtn && prevBtn) {
            nextBtn.onclick = () => {
                index = (index + 1) % cards.length;
                carousel.style.transform = `translateX(-${index * 100}%)`;
            };

            prevBtn.onclick = () => {
                index = (index - 1 + cards.length) % cards.length;
                carousel.style.transform = `translateX(-${index * 100}%)`;
            };

            setInterval(() => {
                nextBtn.click();
            }, 3000);
        }
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
