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
const translations = {
  ar: {
    'nav-about': 'حول',
    'nav-services': 'خدماتنا',
    'nav-products': 'منتجاتنا',
    'nav-partners': 'الشركاء الرئيسيون',
    'nav-contact': 'اتصل بنا',
    'main-title': 'سمرقند',
    'main-desc': 'شريكك الموثوق في توزيع واستيراد وتصدير الحلوى والشوكولاتة بالجملة.',
    'cta-btn': 'تواصل معنا',
    'about-title': 'من نحن',
    'about-desc': 'سمرقند هي موزع رائد وتاجر جملة للحلويات والشوكولاتة الفاخرة، معروفة بالتميز في الاستيراد والتصدير العالمي. نربط الموردين الدوليين بتجار التجزئة المحليين، ونقدم مجموعة مختارة من أفضل الحلويات. بفضل سمعتنا القوية في الموثوقية وخدمة العملاء، يوفر لنا شبكة التوريد العالمية إمكانية الوصول إلى علامات تجارية مشهورة وحلويات حرفية. سواء كنت تدير سوبر ماركت أو بوتيك أو شركة توزيع، سمرقند هي شريكك الموثوق للحلويات عالية الجودة والأسعار التنافسية والخدمات اللوجستية السلسة.',
    'services-title': 'خدماتنا',
    'service1-title': 'توزيع الجملة',
    'service1-desc': 'توزيع فعال وموثوق للحلويات والشوكولاتة لتجار التجزئة والجملة حول العالم.',
    'service2-title': 'خدمات الاستيراد والتصدير',
    'service2-desc': 'حلول استيراد وتصدير سلسة، تربط الموردين العالميين بالأسواق المحلية للحلويات الفاخرة.',
    'service3-title': 'ضمان الجودة',
    'service3-desc': 'رقابة صارمة على الجودة لضمان أن كل منتج يفي بأعلى معايير الطعم والسلامة.',
    'service4-title': 'شراكات التجزئة',
    'service4-desc': 'بناء علاقات قوية مع تجار التجزئة لتقديم حلول مخصصة ومنتجات حصرية.',
    'products-title': 'منتجاتنا',
    'product1': 'شوكولاتة حليب شوكو بريك',
    'product2': 'شوكولاتة كاكاو شوكو بريك',
    'product3': 'شوكولاتة جوز الهند شوكو بريك',
    'product4': 'شوكولاتة حليب شوكو بريك',
    'product5': 'شوكولاتة كاكاو شوكو بريك',
    'product6': 'شوكولاتة كاكاو شوكو بريك',
    'product7': 'شوكولاتة حليب شوكو بريك',
    'product8': 'شوكولاتة كاكاو شوكو بريك',
    'product9': 'شوكولاتة جوز الهند شوكو بريك',
    'partners-title': 'الشركاء الرئيسيون',
    'contact-title': 'تواصل معنا',
    'contact-desc': 'هل أنت مستعد لبدء رحلتك التجارية الحلوة؟ دعنا نتواصل!',
    'contact-info-title': 'معلومات الاتصال',
    'address-label': 'العنوان',
    'address-value': 'وادي الرمم، عمان، الأردن',
    'email-label': 'البريد الإلكتروني',
    'email-value': 'info@SAMARQAND.com',
    'phone-label': 'الهاتف',
    'phone-value': '+962 79 591 1913',
    'follow-us': 'تابعنا للحصول على التحديثات والعروض الحلوة!',
    'form-title': 'أرسل لنا رسالة',
    'form-desc': 'يسعدنا سماعك! املأ النموذج أدناه وسنعاود الاتصال بك قريبًا.',
    'input-name': '',
    'input-email': '',
    'input-subject': '',
    'message': '',
    'submit-btn-text': 'إرسال الرسالة',
    'footer-text': '© 2025 سمرقند. جميع الحقوق محفوظة.',
    'partner1-desc': 'كرافرز هي شركة أوزبكية رائدة معروفة بإنتاج مجموعة واسعة من الوجبات الخفيفة عالية الجودة والحلويات ومنتجات الطعام اللذيذة الأخرى. تشتهر الشركة بالتزامها بالجودة والابتكار والطعم، مما يجعلها خيارًا شائعًا في أوزبكستان والأسواق الدولية.',
    'partner2-desc': 'كريمبر هي علامة تجارية للحلويات تنتجها مجموعة ألميرو في طشقند، أوزبكستان. تقدم مجموعة متنوعة من الحلويات تشمل البسكويت، والويفر، والكعك، والشوكولاتة، ومعاجين الشوكولاتة.',
    'partner3-desc': 'مجموعة كونتي، التي تأسست عام 1997 ومقرها كوستيانتينيفكا، دونيتسك، هي واحدة من أكبر منتجي الحلويات في أوكرانيا. تقدم حوالي 200 منتج مثل البسكويت، والحلويات، والويفر، والكعك. حاصلة على شهادتي ISO 9001 وISO 22000، وتصدر لأكثر من 20 دولة منها ألمانيا واليونان والعراق وأوزبكستان.',
    'partner4-desc': 'شيرين عسل هي قوة في صناعة الحلويات، تأسست في إيران وتوسعت دوليًا. تقدم مجموعة ضخمة من المنتجات الحلوة والوجبات الخفيفة، مدعومة بجودة تصنيع عالية وشهادات عالمية. تشمل حضورها الدولي عمليات تجارية في الإمارات وقاعدة إنتاج محلية في أوزبكستان.'
  },
  en: {
    'nav-about': 'About',
    'nav-services': 'Our Services',
    'nav-products': 'Our Products',
    'nav-partners': 'Key Partners',
    'nav-contact': 'Contact Us',
    'main-title': 'SAMARQAND',
    'main-desc': 'Your trusted partner in candy & chocolate distribution, wholesale, import, and export.',
    'cta-btn': 'Get in Touch',
    'about-title': 'About Us',
    'about-desc': 'SAMARQAND is a leading distributor and wholesaler of premium candies and chocolates, known for excellence in global import and export. We connect international suppliers with local retailers, offering a curated selection of top-tier confections. With a strong reputation for reliability and customer service, our global sourcing network provides access to renowned brands and artisanal treats. Whether you run a supermarket, boutique, or distribution business, SAMARQAND is your trusted partner for quality sweets, competitive pricing, and smooth logistics.',
    'services-title': 'Our Services',
    'service1-title': 'Wholesale Distribution',
    'service1-desc': 'Efficient and reliable distribution of candies and chocolates to retailers and wholesalers worldwide.',
    'service2-title': 'Import & Export Logistics',
    'service2-desc': 'Seamless import and export solutions, connecting global suppliers with local markets for premium sweets.',
    'service3-title': 'Quality Assurance',
    'service3-desc': 'Strict quality control to ensure every product meets the highest standards of taste and safety.',
    'service4-title': 'Retail Partnerships',
    'service4-desc': 'Building strong relationships with retailers to deliver tailored solutions and exclusive products.',
    'products-title': 'Our Products',
    'product1': 'Choco Break Chocolate Milk',
    'product2': 'Choco Break Chocolate Cacao',
    'product3': 'Choco Break Chocolate Coconut',
    'product4': 'Choco Break Chocolate Milk',
    'product5': 'Choco Break Chocolate Cacao',
    'product6': 'Choco Break Chocolate Cacao',
    'product7': 'Choco Break Chocolate Milk',
    'product8': 'Choco Break Chocolate Cacao',
    'product9': 'Choco Break Chocolate Coconut',
    'partners-title': 'Key Partners',
    'contact-title': 'Get In Touch',
    'contact-desc': 'Ready to start your sweet business journey? Let\'s connect!',
    'contact-info-title': 'Contact Information',
    'address-label': 'Address',
    'address-value': 'Wadi AlRemam, Amman, Jordan',
    'email-label': 'Email',
    'email-value': 'info@SAMARQAND.com',
    'phone-label': 'Phone',
    'phone-value': '+962 79 591 1913',
    'follow-us': 'Follow us for updates and sweet deals!',
    'form-title': 'Send us a Message',
    'form-desc': 'We\'d love to hear from you! Fill out the form below and we\'ll get back to you soon.',
    'input-name': '',
    'input-email': '',
    'input-subject': '',
    'message': '',
    'submit-btn-text': 'Send Message',
    'footer-text': '&copy; 2025 SAMARQAND. All rights reserved.',
    'partner1-desc': 'Crafers is a leading Uzbek manufacturer known for producing a wide range of high-quality snacks, confectionery, and other delicious food products. The company is recognized for its commitment to quality, innovation, and taste, making it a popular choice both in Uzbekistan and in international markets.',
    'partner2-desc': 'Krember is a confectionery brand produced by Almerro Group LLC, based in Tashkent, Uzbekistan. They create a diverse range of sweet treats including cookies, wafers, cakes, chocolates, and chocolate pastes.',
    'partner3-desc': "Konti Group, founded in 1997 and based in Kostiantynivka, Donetsk Oblast, is one of Ukraine's largest confectionery producers. It offers around 200 products like cookies, candies, wafers, and cakes. Certified with ISO 9001 and ISO 22000, the company exports to over 20 countries, including Germany, Greece, Iraq, and Uzbekistan.",
    'partner4-desc': 'Shirin Asal is a powerhouse in confectionery, rooted in Iran and expanded internationally. They offer a massive range of sweet and snack products, backed by high-quality manufacturing and global certifications. Their international presence includes UAE trading operations and a local production base in Uzbekistan.'
  }
};

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
