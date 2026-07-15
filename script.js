// ============================================
// PRODUCT DATA
// ============================================
const products = [
    {
        id: 1,
        name: 'Casio FX-991ES Plus',
        price: 'KES 3,500',
        image: 'https://images.unsplash.com/photo-1587145829266-a32a6ea59f58?w=400&h=400&fit=crop&crop=center',
        category: 'Calculator'
    },
    {
        id: 2,
        name: 'Set Square Set (30cm/60cm)',
        price: 'KES 400',
        image: 'https://images.unsplash.com/photo-1587145829266-a32a6ea59f58?w=400&h=400&fit=crop&crop=center',
        category: 'Drawing'
    },
    {
        id: 3,
        name: 'T-Square 60cm',
        price: 'KES 800',
        image: 'https://images.unsplash.com/photo-1587145829266-a32a6ea59f58?w=400&h=400&fit=crop&crop=center',
        category: 'Drawing'
    },
    {
        id: 4,
        name: 'Scale Ruler (Metric)',
        price: 'KES 350',
        image: 'https://images.unsplash.com/photo-1587145829266-a32a6ea59f58?w=400&h=400&fit=crop&crop=center',
        category: 'Drawing'
    },
    {
        id: 5,
        name: 'Compass Set with Lead',
        price: 'KES 600',
        image: 'https://images.unsplash.com/photo-1587145829266-a32a6ea59f58?w=400&h=400&fit=crop&crop=center',
        category: 'Drawing'
    },
    {
        id: 6,
        name: 'Lab Coat (Student Fit)',
        price: 'KES 1,200',
        image: 'https://images.unsplash.com/photo-1587145829266-a32a6ea59f58?w=400&h=400&fit=crop&crop=center',
        category: 'Lab Safety'
    },
    {
        id: 7,
        name: 'Mechanical Pencil 0.5mm',
        price: 'KES 250',
        image: 'https://images.unsplash.com/photo-1587145829266-a32a6ea59f58?w=400&h=400&fit=crop&crop=center',
        category: 'Stationery'
    },
    {
        id: 8,
        name: 'A1 Drawing Sheets (Pack)',
        price: 'KES 300',
        image: 'https://images.unsplash.com/photo-1587145829266-a32a6ea59f58?w=400&h=400&fit=crop&crop=center',
        category: 'Stationery'
    }
];

// ============================================
// RENDER PRODUCTS
// ============================================
function renderProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy" />
            </div>
            <div class="product-name">${product.name}</div>
            <div class="product-price">${product.price}</div>
            <a href="https://wa.me/254700000000?text=Hello%20Technical%20Drawers%2C%20I%27m%20interested%20in%20the%20${encodeURIComponent(product.name)}" 
               class="product-whatsapp" 
               target="_blank">
                <i class="fab fa-whatsapp"></i> Ask on WhatsApp
            </a>
        </div>
    `).join('');
}

// ============================================
// MOBILE NAV TOGGLE
// ============================================
function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            toggle.classList.toggle('active');
        });

        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                toggle.classList.remove('active');
            });
        });
    }
}

// ============================================
// NEWSLETTER FORM
// ============================================
function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input');
        const email = input.value.trim();

        if (email) {
            const message = `Hi Technical Drawers, I'd like to subscribe to your newsletter. My email is ${email}`;
            const whatsappUrl = `https://wa.me/254700000000?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');

            input.value = '';
            input.placeholder = '✅ Check your WhatsApp!';
            setTimeout(() => {
                input.placeholder = 'Your email address';
            }, 3000);
        }
    });
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const phone = document.getElementById('contactPhone').value.trim();
        const subject = document.getElementById('contactSubject').value;
        const message = document.getElementById('contactMessage').value.trim();

        const subjectLabels = {
            'product': 'Product Inquiry',
            'bulk': 'Bulk Order',
            'advice': 'Buying Advice',
            'institution': 'Institution/University Order',
            'other': 'Other'
        };

        const subjectText = subjectLabels[subject] || 'General Inquiry';

        const whatsappMessage = `Hello Technical Drawers,

Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subjectText}

Message:
${message}`;

        const whatsappUrl = `https://wa.me/254700000000?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');

        // Show success message
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message sent!';
        submitBtn.style.background = '#25D366';

        form.reset();

        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
        }, 5000);
    });
}

// ============================================
// SHOW MORE / SHOW LESS BUTTONS
// ============================================
function initShowMore() {
    const productGrid = document.getElementById('productGrid');
    const articleGrid = document.querySelector('.article-grid');
    const productBtn = document.getElementById('moreProductsBtn');
    const articleBtn = document.getElementById('moreArticlesBtn');

    const mobileQuery = window.matchMedia('(max-width: 768px)');

    function updateShowMoreState() {
        const isMobile = mobileQuery.matches;

        if (productGrid && productBtn) {
            const productCards = productGrid.querySelectorAll('.product-card');
            if (productCards.length <= 4 || !isMobile) {
                productGrid.classList.remove('expanded');
                productBtn.style.display = 'none';
                productBtn.setAttribute('aria-expanded', false);
            } else {
                productBtn.style.display = 'inline-flex';
                const expanded = productGrid.classList.contains('expanded');
                productBtn.textContent = expanded ? 'Show less' : 'View more products';
                productBtn.setAttribute('aria-expanded', expanded);
            }
        }

        if (articleGrid && articleBtn) {
            const articleCards = articleGrid.querySelectorAll('.article-card');
            if (articleCards.length <= 3 || !isMobile) {
                articleGrid.classList.remove('expanded');
                articleBtn.style.display = 'none';
                articleBtn.setAttribute('aria-expanded', false);
            } else {
                articleBtn.style.display = 'inline-flex';
                const expanded = articleGrid.classList.contains('expanded');
                articleBtn.textContent = expanded ? 'Show less' : 'See more guides';
                articleBtn.setAttribute('aria-expanded', expanded);
            }
        }
    }

    if (productBtn && productGrid) {
        productBtn.addEventListener('click', () => {
            productGrid.classList.toggle('expanded');
            const expanded = productGrid.classList.contains('expanded');
            productBtn.textContent = expanded ? 'Show less' : 'View more products';
            productBtn.setAttribute('aria-expanded', expanded);
        });
    }

    if (articleBtn && articleGrid) {
        articleBtn.addEventListener('click', () => {
            articleGrid.classList.toggle('expanded');
            const expanded = articleGrid.classList.contains('expanded');
            articleBtn.textContent = expanded ? 'Show less' : 'See more guides';
            articleBtn.setAttribute('aria-expanded', expanded);
        });
    }

    mobileQuery.addEventListener('change', updateShowMoreState);
    updateShowMoreState();
}

// ============================================
// SMOOTH SCROLL FOR NAV LINKS
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}


// ============================================
// TITLE LINE ANIMATION
// ============================================
function initTitleLine() {
    const lines = document.querySelectorAll('.title-line');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.3 });

    lines.forEach(line => {
        observer.observe(line);
    });
}

// ============================================
// ACTIVE NAV LINK
// ============================================
function initActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else if (currentPage === 'index.html' && href === 'index.html') {
            link.classList.add('active');
        } else if (href && href.includes('#') && currentPage === 'index.html') {
            // Don't mark anchor links as active on other pages
        }
    });
}

// ============================================
// INITIALIZE EVERYTHING
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    initMobileNav();
    initNewsletter();
    initContactForm();
    initShowMore();
    initSmoothScroll();
    initYearPage();
    initTitleLine();
    initActiveNav();
});