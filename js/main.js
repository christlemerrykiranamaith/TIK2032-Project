// Enhanced main.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
    
    // Page loader with improved functionality
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

    // Mobile navigation toggle with improved UX
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            nav.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Change hamburger icon when menu is active
            if (hamburger.classList.contains('active')) {
                hamburger.innerHTML = '&times;';
            } else {
                hamburger.innerHTML = '☰';
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !nav.contains(event.target) && nav.classList.contains('active')) {
                nav.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.innerHTML = '☰';
            }
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

    // Testimonial slider functionality
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const sliderDots = document.querySelectorAll('.slider-dot');
    
    if (testimonialSlides.length > 0 && sliderDots.length > 0) {
        let currentSlide = 0;
        
        // Function to change slide
        function changeSlide(index) {
            testimonialSlides.forEach(slide => slide.classList.remove('active'));
            sliderDots.forEach(dot => dot.classList.remove('active'));
            
            testimonialSlides[index].classList.add('active');
            sliderDots[index].classList.add('active');
            currentSlide = index;
        }
        
        // Set up click handlers for dots
        sliderDots.forEach((dot, index) => {
            dot.addEventListener('click', () => changeSlide(index));
        });
        
        // Auto-advance slides
        setInterval(() => {
            let nextSlide = (currentSlide + 1) % testimonialSlides.length;
            changeSlide(nextSlide);
        }, 5000);
    }

    // Add newsletter form submission with AJAX
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Simulate AJAX request with a timeout
            const button = this.querySelector('button');
            const originalText = button.textContent;
            
            button.textContent = 'Submitting...';
            button.disabled = true;
            
            setTimeout(() => {
                // Display success message
                emailInput.value = '';
                button.textContent = 'Success!';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                }, 2000);
                
                // Create and show a notification
                const notification = document.createElement('div');
                notification.className = 'notification';
                notification.innerHTML = `
                    <p>Thank you for subscribing!</p>
                    <span class="close-notification">&times;</span>
                `;
                
                document.body.appendChild(notification);
                
                // Style the notification
                Object.assign(notification.style, {
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    backgroundColor: 'var(--accent-color)',
                    color: 'white',
                    padding: '15px 20px',
                    borderRadius: '5px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    zIndex: '1000',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    minWidth: '250px',
                    transform: 'translateY(100px)',
                    opacity: '0',
                    transition: 'all 0.3s ease'
                });
                
                // Show notification with animation
                setTimeout(() => {
                    notification.style.transform = 'translateY(0)';
                    notification.style.opacity = '1';
                }, 10);
                
                // Remove notification after 5 seconds
                setTimeout(() => {
                    notification.style.transform = 'translateY(100px)';
                    notification.style.opacity = '0';
                    
                    setTimeout(() => {
                        notification.remove();
                    }, 300);
                }, 5000);
                
                // Close notification when clicking X
                notification.querySelector('.close-notification').addEventListener('click', () => {
                    notification.style.transform = 'translateY(100px)';
                    notification.style.opacity = '0';
                    
                    setTimeout(() => {
                        notification.remove();
                    }, 300);
                });
            }, 1500);
        });
    }
});