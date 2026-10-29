/*==================================================
  DOK'S OFF SALES - Part 2 interaction layer
==================================================*/

const qs = (selector, parent = document) => parent.querySelector(selector);
const qsa = (selector, parent = document) => [...parent.querySelectorAll(selector)];

/* Page loader - do not wait for third-party iframes such as Google Maps. */
function hideLoader() {
    const loader = qs('.loader');
    if (!loader) return;
    loader.classList.add('is-hidden');
    setTimeout(() => loader.remove(), 500);
}
document.addEventListener('DOMContentLoaded', hideLoader, { once: true });
window.setTimeout(hideLoader, 1800);

/* Scroll progress */
const progressBar = qs('.progress-bar');
window.addEventListener('scroll', () => {
    if (!progressBar) return;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = total > 0 ? `${(window.scrollY / total) * 100}%` : '0%';
}, { passive: true });

/* Sticky header */
const header = qs('header');
window.addEventListener('scroll', () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* Mobile navigation */
const menuToggle = qs('.menu-toggle');
const navLinks = qs('.nav-links');
if (menuToggle && navLinks) {
    menuToggle.setAttribute('role', 'button');
    menuToggle.setAttribute('tabindex', '0');
    menuToggle.setAttribute('aria-expanded', 'false');

    const toggleMenu = () => {
        const open = navLinks.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', String(open));
    };

    menuToggle.addEventListener('click', toggleMenu);
    menuToggle.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleMenu();
        }
    });

    qsa('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

/* Reveal-on-scroll */
const revealElements = qsa('.reveal');
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealElements.forEach(element => observer.observe(element));
} else {
    revealElements.forEach(element => element.classList.add('active'));
}

/* Hero slider */
qsa('.hero').forEach(hero => {
    const slides = qsa('.hero-slider .slide', hero);
    const dots = qsa('.slider-dots .dot', hero);
    if (slides.length < 2) return;

    let current = Math.max(0, slides.findIndex(slide => slide.classList.contains('active')));
    let timer;

    const showSlide = index => {
        current = (index + slides.length) % slides.length;
        slides.forEach((slide, i) => slide.classList.toggle('active', i === current));
        dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
    };

    const start = () => {
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            timer = setInterval(() => showSlide(current + 1), 5000);
        }
    };
    const stop = () => clearInterval(timer);

    dots.forEach((dot, i) => dot.addEventListener('click', () => {
        showSlide(i);
        stop();
        start();
    }));

    hero.addEventListener('mouseenter', stop);
    hero.addEventListener('mouseleave', start);
    showSlide(current);
    start();
});

/* Product category filter */
const categoryButtons = qsa('.category-btn');
const productCards = qsa('.product-card');
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        categoryButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
        button.classList.add('active');
        button.setAttribute('aria-pressed', 'true');

        const category = button.textContent.trim().toLowerCase();
        productCards.forEach(card => {
            const categoryElement = qs('.product-category', card);
            const productCategory = categoryElement ? categoryElement.textContent.trim().toLowerCase() : '';
            const visible = category === 'all' || productCategory.includes(category) ||
                (category === 'premium spirits' && /brandy|tequila|gin|spirit/i.test(productCategory)) ||
                (category === 'mixers & soft drinks' && /mixer|soft|energy/i.test(productCategory));
            card.hidden = !visible;
        });
    });
});
categoryButtons.forEach((button, index) => button.setAttribute('aria-pressed', index === 0 ? 'true' : 'false'));

/* Part 3: accessible form validation and email-client submission.
   Static hosting cannot send email by itself. A valid form opens a prefilled
   email draft so the visitor can review and send it from their email client. */
const forms = qsa('form');
forms.forEach((form, formIndex) => {
    const isContact = /contact/i.test(location.pathname) || form.closest('.contact-grid') !== null && formIndex === 0;
    const recipient = 'doksalesstore@gmail.com';

    form.querySelectorAll('input, textarea, select').forEach((field, index) => {
        if (!field.name) {
            const label = field.labels && field.labels[0] ? field.labels[0].textContent.trim() : '';
            field.name = (label || field.placeholder || `field_${index + 1}`)
                .toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
        }
        if (field.type === 'email') field.autocomplete = 'email';
        if (/phone|tel/i.test(`${field.name} ${field.placeholder}`)) {
            field.inputMode = 'tel';
            field.pattern = '[+0-9()\\s-]{7,20}';
            field.title = 'Enter a valid phone number using 7–20 digits, spaces, +, brackets or hyphens.';
        }
    });

    form.addEventListener('submit', event => {
        event.preventDefault();
        let firstInvalid = null;
        form.querySelectorAll('input, textarea, select').forEach(field => {
            const valid = field.checkValidity() && (!field.required || field.value.trim() !== '');
            field.setAttribute('aria-invalid', String(!valid));
            field.style.borderColor = valid ? '' : '#d62828';
            if (!valid && !firstInvalid) firstInvalid = field;
        });

        if (firstInvalid) {
            firstInvalid.focus();
            firstInvalid.reportValidity();
            showFormMessage(form, 'Please correct the highlighted fields before continuing.', true);
            return;
        }

        const data = new FormData(form);
        const subject = isContact ? 'Website contact message' : 'Product enquiry';
        const body = [...data.entries()].map(([key, value]) => `${key.replace(/_/g, ' ')}: ${value}`).join('\n');
        showFormMessage(form, 'Your details are ready. Your email app will open so you can review and send the message. The message is not sent until you press Send.', false);
        window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
});

function showFormMessage(form, text, isError) {
    let message = qs('.form-feedback', form);
    if (!message) {
        message = document.createElement('p');
        message.className = 'form-feedback';
        message.setAttribute('role', isError ? 'alert' : 'status');
        message.style.cssText = 'margin-top:14px;padding:12px;border-radius:8px;';
        form.appendChild(message);
    }
    message.textContent = text;
    message.style.background = isError ? '#fff0f0' : '#eef8ef';
    message.style.color = isError ? '#9b1c1c' : '#205c2b';
    message.setAttribute('role', isError ? 'alert' : 'status');
}

/* Part 3: live product search works together with category filtering. */
const productSearch = qs('#productSearch');
const searchStatus = qs('#productSearchStatus');
let activeCategory = 'all';
function filterProducts() {
    const term = (productSearch?.value || '').trim().toLowerCase();
    let count = 0;
    productCards.forEach(card => {
        const categoryElement = qs('.product-category', card);
        const categoryText = (categoryElement?.textContent || '').trim().toLowerCase();
        const cardText = card.textContent.toLowerCase();
        const categoryMatch = activeCategory === 'all' || categoryText.includes(activeCategory) ||
            (activeCategory === 'premium spirits' && /brandy|tequila|gin|spirit/i.test(categoryText)) ||
            (activeCategory === 'mixers & soft drinks' && /mixer|soft|energy/i.test(categoryText));
        const visible = categoryMatch && cardText.includes(term);
        card.hidden = !visible;
        if (visible) count++;
    });
    if (searchStatus) searchStatus.textContent = `${count} product${count === 1 ? '' : 's'} found.`;
}
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        categoryButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
        button.classList.add('active');
        button.setAttribute('aria-pressed', 'true');
        activeCategory = button.textContent.trim().toLowerCase();
        filterProducts();
    });
});
productSearch?.addEventListener('input', filterProducts);
if (productSearch) filterProducts();

/* Part 3: image gallery lightbox for the store gallery. */
const galleryImages = qsa('.gallery img');
if (galleryImages.length) {
    const lightbox = document.createElement('div');
    lightbox.className = 'image-lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Enlarged gallery image');
    lightbox.hidden = true;
    lightbox.style.display = 'none';
    lightbox.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.9);align-items:center;justify-content:center;padding:24px;';
    lightbox.innerHTML = '<button type="button" aria-label="Close enlarged image" style="position:absolute;top:18px;right:24px;font-size:2rem;color:white;background:transparent;border:0;cursor:pointer;">&times;</button><img alt="" style="max-width:92vw;max-height:86vh;object-fit:contain;border-radius:8px;">';
    document.body.appendChild(lightbox);
    const enlarged = qs('img', lightbox);
    const closeButton = qs('button', lightbox);
    const closeLightbox = () => {
        lightbox.hidden = true;
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    };
    galleryImages.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.tabIndex = 0;
        img.setAttribute('role', 'button');
        img.setAttribute('aria-label', `Enlarge: ${img.alt || 'store gallery image'}`);
        const openLightbox = () => {
            enlarged.src = img.currentSrc || img.src;
            enlarged.alt = img.alt || 'Enlarged store gallery image';
            lightbox.hidden = false;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            closeButton.focus();
        };
        img.addEventListener('click', openLightbox);
        img.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(); } });
    });
    closeButton.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !lightbox.hidden) closeLightbox(); });
}

/* Back to top */
const backToTop = qs('#backToTop');
window.addEventListener('scroll', () => {
    if (!backToTop) return;
    const visible = window.scrollY > 400;
    backToTop.classList.toggle('show', visible);
}, { passive: true });
backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* Smooth scrolling for same-page anchors */
qsa('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
        const target = qs(anchor.getAttribute('href'));
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
