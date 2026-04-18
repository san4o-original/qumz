/* ═══════════════════════════════════════════
   QUMZ  —  Landing Page Scripts
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ── Navbar scroll effect ───────────── */
    const navbar = document.getElementById('navbar');
    const onScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ── Burger menu (mobile) ───────────── */
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('nav-links');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        burger.classList.toggle('active');
    });

    // close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            burger.classList.remove('active');
        });
    });

    /* ── Scroll-reveal ──────────────────── */
    const revealEls = document.querySelectorAll(
        '.service-card, .about-text, .about-visual, .contact-info, .contact-form, .section-tag, .section-title, .stack-marquee'
    );

    revealEls.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(el => revealObserver.observe(el));

    /* ── Counter animation ──────────────── */
    const statNumbers = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target, 10);
                animateCounter(el, target);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    function animateCounter(el, target) {
        const duration = 1800;
        const start = performance.now();

        function tick(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const ease = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * ease);
            if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
    }

    /* ── Smooth anchor scrolling ────────── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (!targetEl) return;

            e.preventDefault();
            const top = targetEl.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    /* ── Contact form (FormSubmit.co) ──── */
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('form-submit');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const origText = submitBtn.textContent;
        submitBtn.textContent = 'Отправка…';
        submitBtn.disabled = true;

        try {
            const formData = new FormData(form);
            const res = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (res.ok) {
                submitBtn.textContent = 'Отправлено ✓';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';
                form.reset();
                setTimeout(() => {
                    submitBtn.textContent = origText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            } else {
                throw new Error('Server error');
            }
        } catch (err) {
            submitBtn.textContent = 'Ошибка — попробуйте ещё раз';
            submitBtn.style.background = 'linear-gradient(135deg, #ef4444, #f97316)';
            setTimeout(() => {
                submitBtn.textContent = origText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }
    });

    /* ── Parallax on hero bg ────────────── */
    const heroBg = document.querySelector('.hero-bg-img');
    if (heroBg && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY < window.innerHeight) {
                heroBg.style.transform = `translateY(${scrollY * 0.25}px) scale(1.05)`;
            }
        }, { passive: true });
    }

});
