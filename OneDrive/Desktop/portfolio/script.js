// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
const successMessage = document.querySelector('.success-message');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        successMessage.classList.add('show');
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
        
        // Reset form
        this.reset();
    });
}

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('nav-open', navLinks.classList.contains('active'));
    });
    // Close menu when a link is clicked (for better UX)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    });
}

// Resume button open and download
const resumeBtn = document.getElementById('resume-btn');
if (resumeBtn) {
    resumeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // Open in new tab
        const win = window.open('./Data/Resume_ParasJoshi.pdf', '_blank');
        // Download automatically
        const link = document.createElement('a');
        link.href = 'Resume_ParasJoshi.pdf';
        link.download = 'Resume_ParasJoshi.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // Remove focus to avoid outline
        resumeBtn.blur();
    });
    // Prevent showing link in status bar on hover
    resumeBtn.addEventListener('mouseover', function() {
        this.style.cursor = 'pointer';
        window.status = '';
    });
    resumeBtn.addEventListener('mouseout', function() {
        window.status = '';
    });
}

// Articles button open Medium blog
const articlesBtn = document.getElementById('articles-btn');
if (articlesBtn) {
    articlesBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.open('https://parasjoshi24.medium.com/', '_blank');
        articlesBtn.blur();
    });
    articlesBtn.addEventListener('mouseover', function() {
        this.style.cursor = 'pointer';
        window.status = '';
    });
    articlesBtn.addEventListener('mouseout', function() {
        window.status = '';
    });
}

// Dark mode toggle
const darkToggle = document.getElementById('dark-mode-toggle');
if (darkToggle) {
    const icon = darkToggle.querySelector('i');
    // Set initial tooltip
    function updateDarkToggleTitle() {
        if (document.body.classList.contains('dark-mode')) {
            darkToggle.title = 'Switch to light mode';
        } else {
            darkToggle.title = 'Switch to dark mode';
        }
    }
    // Load preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    updateDarkToggleTitle();
    darkToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        if (isDark) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
        updateDarkToggleTitle();
    });
}

// Go to Top button functionality and progress circle
const goToTopBtn = document.getElementById('go-to-top');
const progressCircle = document.querySelector('#progress-circle circle');

if (progressCircle) {
    const radius = progressCircle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    progressCircle.style.strokeDasharray = `${circumference}`;
    progressCircle.style.strokeDashoffset = `${circumference}`;

    function updateProgressCircle() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? scrollTop / docHeight : 0;
        const offset = circumference * (1 - progress);
        progressCircle.style.strokeDashoffset = offset;
    }

    // Update on scroll and on load
    window.addEventListener('scroll', updateProgressCircle);
    window.addEventListener('resize', updateProgressCircle);
    document.addEventListener('DOMContentLoaded', updateProgressCircle);
    updateProgressCircle();
}

if (goToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            goToTopBtn.classList.add('show');
        } else {
            goToTopBtn.classList.remove('show');
        }
    });
    goToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
// filepath: c:\Users\91962\OneDrive\Desktop\Portfolio\script.js
// Smooth scrolling for navigation links only
document.querySelectorAll('.nav-link[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
// Simple local visitor counter using localStorage
let count = localStorage.getItem('visitor-count');
if (!count) {
  count = 1;
} else {
  count = parseInt(count, 10) + 1;
}
localStorage.setItem('visitor-count', count);
document.getElementById('visitor-count').textContent = count;

// Set the "Last updated on" date in the footer
const lastUpdatedSpan = document.getElementById('last-updated-date');
if (lastUpdatedSpan) {
  // Use the last modified date of the document
  const lastModified = document.lastModified;
  // Format the date (e.g., "June 7, 2024, 10:23 AM")
  const date = new Date(lastModified);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  lastUpdatedSpan.textContent = date.toLocaleDateString(undefined, options);
}

