// VisionSphere Website JavaScript
// Handles navigation, animations, and interactivity

document.addEventListener(‘DOMContentLoaded’, function() {

```
// ============================================
// Navigation Menu Toggle (Mobile)
// ============================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking nav links
    const navLinks = navMenu.querySelectorAll('.nav-link, .nav-cta');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// Navbar Scroll Effect
// ============================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class when not at top
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// Scroll Reveal Animations
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optionally unobserve after animation
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with card-reveal class
const revealElements = document.querySelectorAll('.card-reveal');
revealElements.forEach(element => {
    observer.observe(element);
});

// ============================================
// Smooth Scrolling for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if href is just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const navbarHeight = navbar ? navbar.offsetHeight : 60;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Form Submission Handlers
// ============================================

// Coaching Form
const coachingForm = document.getElementById('coachingForm');
if (coachingForm) {
    coachingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission(this, 'coaching');
    });
}

// Corporate Form
const corporateForm = document.getElementById('corporateForm');
if (corporateForm) {
    corporateForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission(this, 'corporate');
    });
}

// General Contact Form
const generalForm = document.getElementById('generalForm');
if (generalForm) {
    generalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission(this, 'general');
    });
}

// Form Submission Handler
function handleFormSubmission(form, formType) {
    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Here you would normally send the data to your backend
    // For now, we'll simulate a successful submission
    
    // Simulate API call
    setTimeout(function() {
        // Success message
        showFormMessage(form, 'success', 'Thank you! We\'ll respond within 24 hours.');
        
        // Reset form
        form.reset();
        
        // Reset button
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        
        // Log form data (remove in production)
        console.log('Form Type:', formType);
        console.log('Form Data:', data);
        
    }, 1000);
}

// Show Form Message
function showFormMessage(form, type, message) {
    // Remove existing messages
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.textContent = message;
    
    // Add styles
    messageDiv.style.padding = '1rem';
    messageDiv.style.marginTop = '1rem';
    messageDiv.style.borderRadius = '0.5rem';
    messageDiv.style.textAlign = 'center';
    messageDiv.style.fontWeight = '600';
    
    if (type === 'success') {
        messageDiv.style.backgroundColor = '#D1FAE5';
        messageDiv.style.color = '#065F46';
        messageDiv.style.border = '1px solid #10B981';
    } else if (type === 'error') {
        messageDiv.style.backgroundColor = '#FEE2E2';
        messageDiv.style.color = '#991B1B';
        messageDiv.style.border = '1px solid #EF4444';
    }
    
    // Insert message
    form.appendChild(messageDiv);
    
    // Remove message after 5 seconds
    setTimeout(function() {
        messageDiv.style.opacity = '0';
        messageDiv.style.transition = 'opacity 0.3s ease';
        setTimeout(function() {
            messageDiv.remove();
        }, 300);
    }, 5000);
}

// ============================================
// Active Navigation Link Highlighting
// ============================================
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    const linkPage = link.getAttribute('href').split('#')[0];
    if (linkPage === currentPage) {
        link.classList.add('active');
    }
});

// ============================================
// Journey Chapter Active State (About Page)
// ============================================
const journeyNavLinks = document.querySelectorAll('.journey-nav-link');

if (journeyNavLinks.length > 0) {
    // Highlight active chapter based on scroll position
    const journeyChapters = document.querySelectorAll('.journey-chapter');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPos = window.pageYOffset + 150;
        
        journeyChapters.forEach(chapter => {
            const chapterTop = chapter.offsetTop;
            const chapterHeight = chapter.offsetHeight;
            
            if (scrollPos >= chapterTop && scrollPos < chapterTop + chapterHeight) {
                current = chapter.getAttribute('id');
            }
        });
        
        journeyNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// ============================================
// Parallax Effect for Hero Background
// ============================================
const heroBg = document.querySelector('.hero-bg');

if (heroBg) {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        heroBg.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
}

// ============================================
// Add Animation Delay to Card Reveals
// ============================================
const cardGroups = document.querySelectorAll('.services-grid, .goals-grid, .tiers-grid');

cardGroups.forEach(group => {
    const cards = group.querySelectorAll('.card-reveal');
    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
});

// ============================================
// Update Current Year in Footer
// ============================================
const currentYear = new Date().getFullYear();
const yearElements = document.querySelectorAll('.current-year');
yearElements.forEach(element => {
    element.textContent = currentYear;
});

// ============================================
// WhatsApp Float Button Analytics (Optional)
// ============================================
const whatsappFloat = document.querySelector('.whatsapp-float');

if (whatsappFloat) {
    whatsappFloat.addEventListener('click', function() {
        // Track WhatsApp click (integrate with your analytics)
        console.log('WhatsApp button clicked');
    });
}

// ============================================
// Calendly Embed Loading (if using Calendly)
// ============================================
// Note: Replace the placeholder with actual Calendly embed code
// The Calendly script should be loaded in the HTML

// ============================================
// Initialize Tooltips (if needed)
// ============================================
const tooltipElements = document.querySelectorAll('[data-tooltip]');

tooltipElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
        const tooltipText = this.getAttribute('data-tooltip');
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipText;
        tooltip.style.cssText = `
            position: absolute;
            background: #111827;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 0.375rem;
            font-size: 0.875rem;
            white-space: nowrap;
            z-index: 1000;
            pointer-events: none;
        `;
        
        document.body.appendChild(tooltip);
        
        const rect = this.getBoundingClientRect();
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 8}px`;
        tooltip.style.left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2}px`;
        
        this._tooltip = tooltip;
    });
    
    element.addEventListener('mouseleave', function() {
        if (this._tooltip) {
            this._tooltip.remove();
            delete this._tooltip;
        }
    });
});

// ============================================
// Print Styles Handler
// ============================================
window.addEventListener('beforeprint', function() {
    // Expand all collapsed sections before printing
    const collapsedElements = document.querySelectorAll('[data-collapsed="true"]');
    collapsedElements.forEach(element => {
        element.setAttribute('data-collapsed', 'false');
    });
});

// ============================================
// Performance: Lazy Load Images (if needed)
// ============================================
const lazyImages = document.querySelectorAll('img[data-src]');

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
} else {
    // Fallback for browsers without IntersectionObserver
    lazyImages.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
    });
}

// ============================================
// Console Welcome Message
// ============================================
console.log(
    '%cVisionSphere',
    'color: #2563EB; font-size: 24px; font-weight: bold; font-family: Montserrat, sans-serif;'
);
console.log(
    '%cThink Deeper. Rise Higher. Lead the Future.',
    'color: #6B7280; font-size: 14px; font-family: Roboto, sans-serif;'
);
console.log(
    '%cWebsite loaded successfully! 🚀',
    'color: #10B981; font-size: 12px; font-family: Roboto, sans-serif;'
);
```

});

// ============================================
// Utility Functions
// ============================================

// Debounce function for scroll events
function debounce(func, wait) {
let timeout;
return function executedFunction(…args) {
const later = () => {
clearTimeout(timeout);
func(…args);
};
clearTimeout(timeout);
timeout = setTimeout(later, wait);
};
}

// Throttle function for scroll events
function throttle(func, limit) {
let inThrottle;
return function(…args) {
if (!inThrottle) {
func.apply(this, args);
inThrottle = true;
setTimeout(() => inThrottle = false, limit);
}
};
}

// Get element offset from top
function getOffsetTop(element) {
let offsetTop = 0;
while (element) {
offsetTop += element.offsetTop;
element = element.offsetParent;
}
return offsetTop;
}

// Check if element is in viewport
function isInViewport(element) {
const rect = element.getBoundingClientRect();
return (
rect.top >= 0 &&
rect.left >= 0 &&
rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
rect.right <= (window.innerWidth || document.documentElement.clientWidth)
);
}

// Add class on scroll into view
function animateOnScroll(elements, className = ‘animate-in’) {
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add(className);
}
});
}, {
threshold: 0.1
});

```
elements.forEach(element => observer.observe(element));
```

}

// Export functions for use in inline scripts if needed
window.VisionSphereUtils = {
debounce,
throttle,
getOffsetTop,
isInViewport,
animateOnScroll
};