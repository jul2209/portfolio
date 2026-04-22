// ===== CLOCK =====
function updateClock() {
    const pad = n => String(n).padStart(2, '0');
    const now = new Date();
    const localEl = document.getElementById('local-time');
    if (localEl) localEl.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
}
updateClock();
setInterval(updateClock, 1000);

// ===== TYPED TEXT =====
const roles = ['Web Developer.', 'App Developer.', 'Flutter Developer.', 'React Developer.', 'UI/UX Designer.'];
let roleIndex = 0, charIndex = 0, deleting = false;
const typedEl = document.getElementById('typed');

function typeLoop() {
    if (!typedEl) return;
    const current = roles[roleIndex];
    if (!deleting) {
        typedEl.textContent = current.slice(0, ++charIndex);
        if (charIndex === current.length) {
            deleting = true;
            setTimeout(typeLoop, 1800);
            return;
        }
    } else {
        typedEl.textContent = current.slice(0, --charIndex);
        if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }
    setTimeout(typeLoop, deleting ? 55 : 85);
}
typeLoop();

// set home overlay state on load
document.querySelector('.main-content').classList.add('home-active');

// ===== PAGE NAVIGATION =====
const navBtns = document.querySelectorAll('.nav-btn');
const overlay = document.getElementById('page-overlay');
const overlayText = document.getElementById('overlay-text');
const loadingMessages = ['LOADING...', 'DECRYPTING...', 'RENDERING...', 'ACCESSING...'];
let isTransitioning = false;

function switchPage(targetId) {
    if (isTransitioning) return;
    const currentPage = document.querySelector('.page.active');
    const nextPage = document.getElementById(targetId);
    if (!nextPage || currentPage === nextPage) return;

    isTransitioning = true;

    navBtns.forEach(b => b.classList.remove('active'));
    const targetBtn = document.querySelector(`.nav-btn[data-target="${targetId}"]`);
    if (targetBtn) targetBtn.classList.add('active');

    currentPage.classList.add('exit');
    currentPage.classList.remove('active');

    // toggle overlay based on page
    const mainContent = document.querySelector('.main-content');
    if (targetId === 'home') {
        mainContent.classList.add('home-active');
    } else {
        mainContent.classList.remove('home-active');
    }

    if (overlayText) overlayText.textContent = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
    setTimeout(() => overlay && overlay.classList.add('active'), 100);

    setTimeout(() => {
        overlay && overlay.classList.remove('active');
        nextPage.classList.add('active');
        nextPage.scrollTop = 0;
    }, 480);

    setTimeout(() => {
        currentPage.classList.remove('exit');
        isTransitioning = false;
    }, 680);
}

// nav buttons
navBtns.forEach(btn => btn.addEventListener('click', () => switchPage(btn.dataset.target)));

// hero buttons
document.querySelectorAll('.hero-btn').forEach(btn => {
    btn.addEventListener('click', () => switchPage(btn.dataset.target));
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('form-name').value.trim();
        const message = document.getElementById('form-message').value.trim();
        const text = encodeURIComponent(`Hi John Paul! I'm ${name}. ${message}`);
        window.open(`https://m.me/johnpaul.ocampo09?text=${text}`, '_blank');
    });
}

// ===== ACHIEVEMENT FILTER =====
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        document.querySelectorAll('.ach-card').forEach(card => {
            card.classList.toggle('hidden', filter !== 'all' && card.dataset.status !== filter);
        });
    });
});
