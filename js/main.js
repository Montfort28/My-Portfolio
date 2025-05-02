// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate hamburger to X
    const bars = document.querySelectorAll('.bar');
    bars[0].style.transform = bars[0].style.transform === 'rotate(45deg) translate(8px, 6px)' 
        ? '' 
        : 'rotate(45deg) translate(8px, 6px)';
    
    bars[1].style.opacity = bars[1].style.opacity === '0' ? '1' : '0';
    
    bars[2].style.transform = bars[2].style.transform === 'rotate(-45deg) translate(7px, -5px)' 
        ? '' 
        : 'rotate(-45deg) translate(7px, -5px)';
});

// Close menu when clicking on a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        
        // Reset hamburger animation
        const bars = document.querySelectorAll('.bar');
        bars[0].style.transform = '';
        bars[1].style.opacity = '1';
        bars[2].style.transform = '';
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});

// Form Validation
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

// Validation functions
function validateName() {
    if (nameInput.value.trim() === '') {
        nameError.textContent = 'Name is required';
        return false;
    } else if (nameInput.value.trim().length < 2) {
        nameError.textContent = 'Name must be at least 2 characters';
        return false;
    } else {
        nameError.textContent = '';
        return true;
    }
}

function validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailInput.value.trim() === '') {
        emailError.textContent = 'Email is required';
        return false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address';
        return false;
    } else {
        emailError.textContent = '';
        return true;
    }
}

function validateMessage() {
    if (messageInput.value.trim() === '') {
        messageError.textContent = 'Message is required';
        return false;
    } else if (messageInput.value.trim().length < 10) {
        messageError.textContent = 'Message must be at least 10 characters';
        return false;
    } else {
        messageError.textContent = '';
        return true;
    }
}

// Add event listeners for real-time validation
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
messageInput.addEventListener('input', validateMessage);

// Handle form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();
    
    if (isNameValid && isEmailValid && isMessageValid) {
        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        
        // Create a success message element
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Message sent successfully!';
        successMessage.style.color = '#0CBFAE';
        successMessage.style.padding = '10px';
        successMessage.style.marginTop = '10px';
        successMessage.style.backgroundColor = 'rgba(12, 191, 174, 0.1)';
        successMessage.style.borderRadius = '5px';
        
        // Insert success message after the form
        contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
        
        // Clear form
        contactForm.reset();
        
        // Remove success message after 3 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    }
});

// Add animations on scroll
document.addEventListener('DOMContentLoaded', function() {
    // Detect when elements come into view
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Elements to animate
    const sections = document.querySelectorAll('section');
    
    // Function to add animation classes when elements are in viewport
    function handleScroll() {
        sections.forEach(section => {
            if (isInViewport(section) && !section.classList.contains('animated')) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
                section.classList.add('animated');
            }
        });
    }
    
    // Set initial styles for animation
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Check on initial load
    handleScroll();
});