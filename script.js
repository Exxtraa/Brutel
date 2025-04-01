// Mobile Navigation
const menuOpen = document.getElementById('menuOpen');
const menuClose = document.getElementById('menuClose');
const navLinks = document.getElementById('navLinks');

if (menuOpen) {
    menuOpen.addEventListener('click', () => {
        navLinks.classList.add('active');
    });
}

if (menuClose) {
    menuClose.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
}

// Close menu when a link is clicked
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or use device preference
const savedTheme = localStorage.getItem('theme');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
} else if (prefersDarkScheme.matches) {
    htmlElement.setAttribute('data-theme', 'dark');
    updateThemeIcon('dark');
}

// Toggle theme when button is clicked
themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    updateThemeIcon(newTheme);
    
    // Show feedback
    showAlert(`${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} mode enabled`, 'success');
});

// Update theme icon based on current theme
function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Consultation Modal Functionality
const consultBtn = document.getElementById('consultBtn');
const consultationModal = document.getElementById('consultationModal');
const closeModal = document.getElementById('closeModal');
const cancelConsult = document.getElementById('cancelConsult');
const consultationForm = document.getElementById('consultationForm');

if (consultBtn) {
    consultBtn.addEventListener('click', () => {
        consultationModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        consultationModal.classList.remove('active');
        document.body.style.overflow = ''; // Allow scrolling again
    });
}

if (cancelConsult) {
    cancelConsult.addEventListener('click', () => {
        consultationModal.classList.remove('active');
        document.body.style.overflow = ''; // Allow scrolling again
    });
}

// Close modal when clicking outside the content
window.addEventListener('click', (e) => {
    if (e.target === consultationModal) {
        consultationModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Handle consultation form submission
if (consultationForm) {
    consultationForm.addEventListener('submit', function(e) {
        // We don't prevent default as we want the form to submit to Formspree
        // But we'll show a loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // We'll close the modal after a delay to simulate submission
        setTimeout(() => {
            // This is just for visual feedback
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            consultationModal.classList.remove('active');
            document.body.style.overflow = '';
            showAlert('Consultation request sent! We\'ll get back to you soon.', 'success');
        }, 2000);
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Sticky navigation on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
});

// Form submission handling - we're using Formspree, but we'll still add event listeners for UX
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // We don't prevent default as we want the form to submit to Formspree
        // But we'll show a loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Form will be handled by Formspree
        // This is just for visual feedback
        setTimeout(() => {
            // Reset the button after a delay (form has likely been submitted)
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 4000);
    });
}

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        // We don't prevent default as we want the form to submit to Formspree
        // But we'll show a loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Subscribing...';
        submitBtn.disabled = true;
        
        // Form will be handled by Formspree
        // This is just for visual feedback
        setTimeout(() => {
            // Reset the button after a delay (form has likely been submitted)
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 4000);
    });
}

// Show alert function
function showAlert(message, type) {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${type}`;
    alertDiv.textContent = message;
    
    // Append to body
    document.body.appendChild(alertDiv);
    
    // Style the alert
    alertDiv.style.position = 'fixed';
    alertDiv.style.bottom = '20px';
    alertDiv.style.right = '20px';
    alertDiv.style.padding = '15px 20px';
    alertDiv.style.borderRadius = '5px';
    alertDiv.style.fontWeight = '500';
    alertDiv.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    alertDiv.style.zIndex = '1000';
    alertDiv.style.transition = 'all 0.3s ease';
    
    if (type === 'success') {
        alertDiv.style.backgroundColor = '#4CAF50';
        alertDiv.style.color = 'white';
    } else {
        alertDiv.style.backgroundColor = '#f44336';
        alertDiv.style.color = 'white';
    }
    
    // Remove after 3 seconds
    setTimeout(() => {
        alertDiv.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(alertDiv);
        }, 300);
    }, 3000);
}

// Animation on scroll
window.addEventListener('scroll', revealElements);

function revealElements() {
    const elements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .about-content, .contact-container, .pricing-card, .custom-quote');
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('revealed');
        }
    });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .service-card, .portfolio-item, .testimonial-card, .about-content, .contact-container, .pricing-card, .custom-quote {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .revealed {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Call reveal function once on page load
document.addEventListener('DOMContentLoaded', () => {
    revealElements();
}); 