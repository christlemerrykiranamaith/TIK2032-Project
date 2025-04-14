// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Page loader - Fixed version that won't hang
    const loader = document.querySelector('.loader');
    if (loader) {
        // Add backup timeout to hide loader in case of load event failure
        setTimeout(function() {
            loader.classList.add('fade-out');
            setTimeout(function() {
                loader.style.display = 'none';
            }, 500);
        }, 1500);
        
        // Normal load event handling
        window.addEventListener('load', function() {
            loader.classList.add('fade-out');
            setTimeout(function() {
                loader.style.display = 'none';
            }, 500);
        });
    }

    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            nav.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    

    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect();
            
            // If element is in viewport
            if (elementPosition.top < window.innerHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    // Run animation check on page load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});