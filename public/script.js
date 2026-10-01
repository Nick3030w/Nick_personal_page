(() => {
    'use strict';

    const root = document.documentElement;
    const body = document.body;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

    // -------------------------------------------------------------
    // Navegación móvil
    // -------------------------------------------------------------
    const header = document.getElementById('site-header');
    const menuToggle = document.getElementById('menu-toggle');
    const navigation = document.getElementById('primary-navigation');
    const navLinks = [...document.querySelectorAll('.nav-link')];

    const setMenuState = (isOpen) => {
        body.classList.toggle('menu-open', isOpen);
        menuToggle?.setAttribute('aria-expanded', String(isOpen));
        menuToggle?.setAttribute('aria-label', isOpen
            ? 'Cerrar menú de navegación'
            : 'Abrir menú de navegación');
    };

    menuToggle?.addEventListener('click', () => {
        setMenuState(menuToggle.getAttribute('aria-expanded') !== 'true');
    });

    navigation?.addEventListener('click', (event) => {
        if (event.target.closest('a')) setMenuState(false);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') setMenuState(false);
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) setMenuState(false);
    }, { passive: true });

    // -------------------------------------------------------------
    // Estado del encabezado y sección activa
    // -------------------------------------------------------------
    let scrollFrame = null;

    const updateHeader = () => {
        header?.classList.toggle('is-scrolled', window.scrollY > 24);
        scrollFrame = null;
    };

    window.addEventListener('scroll', () => {
        if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateHeader);
    }, { passive: true });

    updateHeader();

    const setActiveNavigation = (sectionId) => {
        navLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${sectionId}`;
            link.classList.toggle('is-active', isActive);
            if (isActive) {
                link.setAttribute('aria-current', 'location');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };

    const trackedSections = document.querySelectorAll('[data-nav-section]');

    if ('IntersectionObserver' in window && trackedSections.length) {
        const sectionObserver = new IntersectionObserver((entries) => {
            const visibleSections = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

            if (visibleSections[0]) setActiveNavigation(visibleSections[0].target.id);
        }, {
            rootMargin: '-28% 0px -58% 0px',
            threshold: [0, 0.1, 0.35],
        });

        trackedSections.forEach((section) => sectionObserver.observe(section));
    }

    // -------------------------------------------------------------
    // Revelado progresivo y accesible
    // -------------------------------------------------------------
    const revealItems = [...document.querySelectorAll('.reveal')];

    if (!reducedMotion.matches && 'IntersectionObserver' in window && revealItems.length) {
        root.classList.add('motion-ready');

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, {
            rootMargin: '0px 0px -8% 0px',
            threshold: 0.08,
        });

        revealItems.forEach((item, index) => {
            item.style.setProperty('--reveal-delay', `${(index % 3) * 70}ms`);
            revealObserver.observe(item);
        });
    } else {
        revealItems.forEach((item) => item.classList.add('is-visible'));
    }

    reducedMotion.addEventListener?.('change', (event) => {
        if (!event.matches) return;
        root.classList.remove('motion-ready');
        revealItems.forEach((item) => item.classList.add('is-visible'));
        document.querySelectorAll('[data-tilt]').forEach((element) => {
            element.style.removeProperty('--rotate-x');
            element.style.removeProperty('--rotate-y');
        });
    });

    // -------------------------------------------------------------
    // Luz ambiental, inclinación y botones magnéticos
    // Solo se habilitan con puntero preciso y movimiento permitido.
    // -------------------------------------------------------------
    if (finePointer.matches && !reducedMotion.matches) {
        let pointerFrame = null;
        let latestPointer = { x: window.innerWidth / 2, y: window.innerHeight / 3 };

        document.addEventListener('pointermove', (event) => {
            latestPointer = { x: event.clientX, y: event.clientY };
            if (pointerFrame) return;

            pointerFrame = window.requestAnimationFrame(() => {
                root.style.setProperty('--pointer-x', `${latestPointer.x}px`);
                root.style.setProperty('--pointer-y', `${latestPointer.y}px`);
                pointerFrame = null;
            });
        }, { passive: true });

        document.querySelectorAll('[data-tilt]').forEach((element) => {
            const strength = Number(element.dataset.tiltStrength || 3);

            element.addEventListener('pointermove', (event) => {
                const bounds = element.getBoundingClientRect();
                const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
                const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;

                element.style.setProperty('--rotate-x', `${vertical * -strength}deg`);
                element.style.setProperty('--rotate-y', `${horizontal * strength}deg`);
            });

            element.addEventListener('pointerleave', () => {
                element.style.setProperty('--rotate-x', '0deg');
                element.style.setProperty('--rotate-y', '0deg');
            });
        });

        document.querySelectorAll('[data-magnetic]').forEach((element) => {
            element.addEventListener('pointermove', (event) => {
                const bounds = element.getBoundingClientRect();
                const x = (event.clientX - bounds.left - bounds.width / 2) * 0.11;
                const y = (event.clientY - bounds.top - bounds.height / 2) * 0.16;
                element.style.setProperty('--mag-x', `${x}px`);
                element.style.setProperty('--mag-y', `${y}px`);
            });

            element.addEventListener('pointerleave', () => {
                element.style.setProperty('--mag-x', '0px');
                element.style.setProperty('--mag-y', '0px');
            });
        });
    }

    // -------------------------------------------------------------
    // Formulario de contacto
    // -------------------------------------------------------------
    const form = document.getElementById('contact-form');
    const submitButton = document.getElementById('submit-btn');
    const buttonText = document.getElementById('btn-text');
    const feedback = document.getElementById('form-feedback');

    const showFeedback = (type, message, focus = false) => {
        if (!feedback) return;
        feedback.textContent = message;
        feedback.className = `form-feedback ${type}`;
        if (focus) feedback.focus({ preventScroll: true });
    };

    const setSubmitting = (isSubmitting) => {
        if (!submitButton || !buttonText) return;
        submitButton.disabled = isSubmitting;
        submitButton.classList.toggle('is-loading', isSubmitting);
        submitButton.setAttribute('aria-busy', String(isSubmitting));
        buttonText.textContent = isSubmitting ? 'Enviando…' : 'Enviar mensaje';
    };

    form?.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            showFeedback('error', 'Revisa los campos indicados antes de enviar el mensaje.');
            return;
        }

        const formData = new FormData(form);
        const payload = {
            name: String(formData.get('name') || '').trim(),
            email: String(formData.get('email') || '').trim(),
            message: String(formData.get('message') || '').trim(),
            website: String(formData.get('website') || '').trim(),
        };

        setSubmitting(true);
        if (feedback) feedback.className = 'form-feedback';

        const controller = new AbortController();
        const timeout = window.setTimeout(() => controller.abort(), 12000);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(payload),
                signal: controller.signal,
            });

            const result = await response.json().catch(() => ({}));

            if (!response.ok || !result.success) {
                throw new Error(result.error || 'No fue posible enviar el mensaje. Intenta nuevamente.');
            }

            form.reset();
            showFeedback('success', '✓ Mensaje enviado. Gracias por escribirme; te responderé pronto.', true);
        } catch (error) {
            const message = error.name === 'AbortError'
                ? 'La solicitud tardó demasiado. Revisa tu conexión e intenta nuevamente.'
                : error.message || 'Ocurrió un error de conexión. Intenta nuevamente.';
            showFeedback('error', `✕ ${message}`, true);
        } finally {
            window.clearTimeout(timeout);
            setSubmitting(false);
        }
    });

    const currentYear = document.getElementById('current-year');
    if (currentYear) currentYear.textContent = String(new Date().getFullYear());
})();
