// ==========================================
// HopeNest Foundation - Main JavaScript
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initIntersectionObserver();
    initPayPal();
});

// ==========================================
// NAVIGATION
// ==========================================

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    const navLinkElements = document.querySelectorAll('.nav-link');
    
    // Sticky navigation on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle icon
            const icon = mobileMenuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking a link
    navLinkElements.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Active link highlighting based on scroll position
    window.addEventListener('scroll', () => {
        updateActiveNavLink();
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 100) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

function initScrollAnimations() {
    // Smooth scroll is handled by CSS, but we can add additional effects here if needed
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// ==========================================
// INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
// ==========================================

function initIntersectionObserver() {
    const fadeElements = document.querySelectorAll('.fade-in-section');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// ==========================================
// PAYPAL INTEGRATION
// ==========================================

function initPayPal() {
    // Check if PayPal credentials are available
    const paypalContainer = document.getElementById('paypal-button-container');
    
    if (!paypalContainer) {
        console.warn('PayPal button container not found');
        return;
    }
    
    // Load PayPal SDK dynamically
    loadPayPalSDK()
        .then(() => {
            renderPayPalButton();
        })
        .catch(error => {
            console.error('Failed to load PayPal SDK:', error);
            showPayPalError();
        });
}

function loadPayPalSDK() {
    return new Promise((resolve, reject) => {
        // Check if PayPal is already loaded
        if (window.paypal) {
            resolve();
            return;
        }
        
        // Fetch client ID from backend
        fetch('/api/paypal/client-id')
            .then(response => {
                if (!response.ok) {
                    throw new Error('PayPal credentials not configured');
                }
                return response.json();
            })
            .then(data => {
                if (!data.clientId) {
                    throw new Error('PayPal client ID not available');
                }
                
                // Load PayPal SDK script
                const script = document.createElement('script');
                script.src = `https://www.paypal.com/sdk/js?client-id=${data.clientId}&currency=USD`;
                script.async = true;
                
                script.onload = () => resolve();
                script.onerror = () => reject(new Error('Failed to load PayPal SDK'));
                
                document.head.appendChild(script);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function renderPayPalButton() {
    if (!window.paypal) {
        console.error('PayPal SDK not loaded');
        return;
    }
    
    const container = document.getElementById('paypal-button-container');
    
    // Clear any existing content
    container.innerHTML = '';
    
    // Render PayPal button
    window.paypal.Buttons({
        style: {
            layout: 'vertical',
            color: 'gold',
            shape: 'rect',
            label: 'donate',
            height: 45
        },
        
        createOrder: function(data, actions) {
            // Get donation amount (you can add an input field for custom amounts)
            const amount = '50.00'; // Default donation amount
            
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: amount,
                        currency_code: 'USD'
                    },
                    description: 'Donation to HopeNest Foundation'
                }]
            });
        },
        
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                // Show success message
                showDonationSuccess(details);
            });
        },
        
        onError: function(err) {
            console.error('PayPal error:', err);
            showPayPalError('An error occurred during the donation process. Please try again.');
        },
        
        onCancel: function(data) {
            console.log('PayPal payment cancelled:', data);
            showPayPalMessage('Donation cancelled. No charges were made.', 'info');
        }
        
    }).render('#paypal-button-container');
}

function showDonationSuccess(details) {
    const container = document.getElementById('paypalContainer');
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'donation-success-message';
    successMessage.innerHTML = `
        <div style="
            background-color: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
            text-align: center;
        ">
            <i class="fas fa-check-circle" style="font-size: 3rem; margin-bottom: 10px;"></i>
            <h3 style="margin: 10px 0;">Thank You for Your Donation!</h3>
            <p>Your generous contribution helps us continue our mission.</p>
            <p style="font-size: 0.875rem; margin-top: 10px;">
                Transaction ID: ${details.id}
            </p>
        </div>
    `;
    
    container.appendChild(successMessage);
    
    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function showPayPalError(message = 'PayPal donation is currently unavailable. Please use alternative donation methods below.') {
    const container = document.getElementById('paypal-button-container');
    
    container.innerHTML = `
        <div style="
            background-color: #f8d7da;
            border: 1px solid #f5c6cb;
            color: #721c24;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            margin: 20px 0;
        ">
            <i class="fas fa-exclamation-triangle" style="margin-right: 8px;"></i>
            ${message}
        </div>
    `;
}

function showPayPalMessage(message, type = 'info') {
    const container = document.getElementById('paypalContainer');
    
    const colors = {
        info: { bg: '#d1ecf1', border: '#bee5eb', text: '#0c5460' },
        success: { bg: '#d4edda', border: '#c3e6cb', text: '#155724' },
        error: { bg: '#f8d7da', border: '#f5c6cb', text: '#721c24' }
    };
    
    const color = colors[type] || colors.info;
    
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        background-color: ${color.bg};
        border: 1px solid ${color.border};
        color: ${color.text};
        padding: 15px;
        border-radius: 8px;
        text-align: center;
        margin-top: 20px;
    `;
    messageDiv.textContent = message;
    
    container.appendChild(messageDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Debounce function for scroll events (if needed for optimization)
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add smooth height to sections for better animations
function addSmoothTransitions() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.transition = 'opacity 0.8s ease-out';
    });
}
