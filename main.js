const config = window.siteConfig;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Populate dynamic brand data
    document.querySelectorAll('.brand-name').forEach(el => el.textContent = config.companyName);
    document.querySelectorAll('.brand-tagline').forEach(el => el.textContent = config.tagline);
    document.querySelectorAll('.company-address').forEach(el => el.textContent = config.address);
    document.querySelectorAll('.company-phone').forEach(el => el.textContent = config.phone);
    document.querySelectorAll('.company-email').forEach(el => el.textContent = config.email);

    // 2. Populate Services
    const servicesGrid = document.getElementById('services-grid');
    if (servicesGrid) {
        config.services.forEach(service => {
            const card = document.createElement('div');
            card.className = "bg-white p-8 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-slate-100 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-300 reveal group";
            card.innerHTML = `
                <div class="h-16 w-16 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-3xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-inner">
                    <i class="${service.icon}"></i>
                </div>
                <h3 class="text-xl font-bold text-slate-800 mb-3 font-sans">${service.title}</h3>
                <p class="text-slate-600 mb-6 leading-relaxed">${service.description}</p>
                <a href="#contact" class="text-blue-600 font-semibold inline-flex items-center group-hover:text-blue-800 transition-colors">
                    Learn More <i class="fa-solid fa-arrow-right ml-2 text-sm transform group-hover:translate-x-1 transition-transform"></i>
                </a>
            `;
            servicesGrid.appendChild(card);
        });
    }

    // 3. Populate Legacy Data
    const legacyGrid = document.getElementById('legacy-grid');
    if (legacyGrid) {
        config.legacy.forEach((item, index) => {
            const stat = document.createElement('div');
            stat.className = `text-center p-6 reveal transition-all duration-700 delay-${index * 100}`;
            stat.innerHTML = `
                <div class="text-4xl md:text-6xl font-extrabold text-blue-600 mb-3 tracking-tight">${item.value}</div>
                <div class="text-slate-600 font-bold tracking-wider uppercase text-xs md:text-sm">${item.label}</div>
            `;
            legacyGrid.appendChild(stat);
        });
    }

    // 4. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = mobileMenuBtn?.querySelector('i');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            if (mobileMenu.classList.contains('hidden')) {
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            } else {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-xmark');
            }
        });
        
        // Toggle submenus inside mobile menu
        const mobileSubBtn = mobileMenu.querySelectorAll('.mobile-sub-btn');
        mobileSubBtn.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const subMenu = e.currentTarget.nextElementSibling;
                const icon = e.currentTarget.querySelector('.caret');
                subMenu.classList.toggle('hidden');
                icon.classList.toggle('rotate-180');
            });
        });
    }

    // 5. Mega Menu Toggle (Desktop)
    const megaMenuBtns = document.querySelectorAll('.has-mega-menu');
    megaMenuBtns.forEach(btn => {
        btn.addEventListener('mouseenter', (e) => {
            const menu = e.currentTarget.querySelector('.mega-menu-content');
            if(menu) {
                menu.classList.remove('hidden');
                // slight delay for animation effect setup
                setTimeout(() => {
                    menu.classList.remove('opacity-0', 'translate-y-2');
                    menu.classList.add('opacity-100', 'translate-y-0');
                }, 10);
            }
        });
        btn.addEventListener('mouseleave', (e) => {
            const menu = e.currentTarget.querySelector('.mega-menu-content');
            if(menu) {
                menu.classList.remove('opacity-100', 'translate-y-0');
                menu.classList.add('opacity-0', 'translate-y-2');
                setTimeout(() => {
                    menu.classList.add('hidden');
                }, 200); // match duration
            }
        });
    });

    // 6. Scroll Reveal Animation Setup
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});
