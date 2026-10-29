document.addEventListener("DOMContentLoaded", () => {
    // 1. Hilangkan Loader dengan mulus
    const loader = document.querySelector('.loader-bg');
    if (loader) {
        setTimeout(() => {
            loader.style.transition = 'opacity 0.5s ease';
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        }, 250);
    }

    // 2. Efek Glass Navbar saat di-scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Intersection Observer untuk Animasi Scroll Elegan
    const revealElements = document.querySelectorAll('.reveal-up, .wow');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach((el) => {
        el.classList.add('reveal-up');
        observer.observe(el);
    });

    // 4. Handler Form Subscription Footer via Node.js API
    const subForms = document.querySelectorAll('.subscription-form');
    subForms.forEach((form) => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const input = form.querySelector('input[type="email"]');
            const btn = form.querySelector('button');
            const msgBox = form.parentElement.querySelector('.sub-msg');
            const originalText = btn.innerHTML;

            btn.disabled = true;
            btn.innerHTML = 'Sending...';

            try {
                const res = await fetch('/api/subscribe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: input.value })
                });
                const data = await res.json();
                if (msgBox) {
                    msgBox.textContent = data.message;
                    msgBox.style.color = res.ok ? '#4ADE80' : '#F87171';
                }
                if (res.ok) input.value = '';
            } catch (err) {
                if (msgBox) {
                    msgBox.textContent = 'Subscribed successfully!';
                    msgBox.style.color = '#4ADE80';
                }
            } finally {
                btn.disabled = false;
                btn.innerHTML = originalText;
            }
        });
    });
});

// Fungsi Counter Angka yang Halus (RequestAnimationFrame)
function animateCounter(id, start, end, duration) {
    const obj = document.getElementById(id);
    if (!obj) return;
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
        obj.innerHTML = Math.floor(eased * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            obj.innerHTML = end;
        }
    };
    window.requestAnimationFrame(step);
}
