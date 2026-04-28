/* =============================================
   XRAYXWX — Racing Club
   Interactive JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    // --- Preloader ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = '';
            initScrollReveal();
        }, 2200);
    });

    // Block scroll during preloader
    document.body.style.overflow = 'hidden';

    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // --- Active nav link on scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // --- Mobile menu toggle ---
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');

        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Scroll Reveal Animation ---
    function initScrollReveal() {
        const revealElements = document.querySelectorAll(
            '.section-header, .drop-card, .join-left, .join-right, .footer-top'
        );

        revealElements.forEach(el => {
            el.classList.add('reveal');
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    }

    // --- Drop cards stagger animation ---
    const cards = document.querySelectorAll('.drop-card');
    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });

    // --- Parallax on hero image ---
    const heroBgImg = document.querySelector('.hero-bg-img');
    if (heroBgImg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroBgImg.style.transform = `scale(${1.05 + scrolled * 0.0003}) translateY(${scrolled * 0.15}px)`;
            }
        });
    }

    // --- Form submission ---
    const joinForm = document.getElementById('joinForm');
    if (joinForm) {
        joinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('emailInput').value;
            const checkbox = document.getElementById('subscribeCheck').checked;

            if (email) {
                // Show success state
                const btn = joinForm.querySelector('.join-btn');
                btn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>`;
                btn.style.background = '#22c55e';

                const input = document.getElementById('emailInput');
                input.value = '';
                input.placeholder = 'You\'re in! 🎉';
                input.disabled = true;

                setTimeout(() => {
                    btn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
                    btn.style.background = '';
                    input.placeholder = 'Enter your email';
                    input.disabled = false;
                }, 3000);
            }
        });
    }

    // --- Mouse cursor glow effect on cards ---
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(230, 57, 70, 0.06), var(--bg-card) 70%)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.background = '';
        });
    });

});
