
document.addEventListener('DOMContentLoaded', () => {
    console.log('Original 16 Loaded.');

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
        });
    }
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const catalogItems = document.querySelectorAll('.catalog-item');
    catalogItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease-out';
        item.style.transitionDelay = `${index * 100}ms`;
        observer.observe(item);
    });

    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseover', () => {
            const colors = ['#D9381E', '#F2A900', '#4B6B8C', '#1A1A1A'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            logo.style.color = randomColor;
        });
    }

    const specItems = document.querySelectorAll('#specs .border-l-2');
    specItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.borderColor = '#F2A900';
            item.style.paddingLeft = '2rem';
            item.style.transition = 'all 0.3s ease';
        });
        item.addEventListener('mouseleave', () => {
            item.style.borderColor = '#F2F0E9';
            item.style.paddingLeft = '1.5rem';
        });
    });

    const toggleBtn = document.getElementById('toggle-catalog');
    const extraCards = document.getElementById('extra-cards');
    const toggleText = document.getElementById('toggle-text');
    const counterSpan = document.querySelector('#catalog .font-space.font-bold');
    let isExpanded = false;

    if (toggleBtn && extraCards) {
        toggleBtn.addEventListener('click', () => {
            isExpanded = !isExpanded;
            extraCards.classList.toggle('expanded', isExpanded);
            toggleText.textContent = isExpanded ? '← LOCK IT BACK' : 'UNLOCK THE REST →';
            if (counterSpan) {
                counterSpan.textContent = isExpanded ? 'NO. 1-8' : 'NO. 1-4';
            }
        });
    }

    const acquireBtn = document.getElementById('acquire-btn');
    const emailModal = document.getElementById('email-modal');
    const modalClose = document.getElementById('modal-close');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const emailForm = document.getElementById('email-form');

    function openModal() {
        emailModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        emailModal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    if (acquireBtn) {
        acquireBtn.addEventListener('click', openModal);
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeModal);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !emailModal.classList.contains('hidden')) {
            closeModal();
        }
    });

    if (emailForm) {
        emailForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email-input').value;
            alert(`Thanks! ${email} has been added to the waitlist.`);
            closeModal();
            emailForm.reset();
        });
    }
});
