document.addEventListener('DOMContentLoaded', function() {
    // Contact form validation
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form inputs
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Simple validation
            let isValid = true;
            
            // Validate name
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Name is required');
                isValid = false;
            } else {
                removeError(nameInput);
            }
            
            // Validate email
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email');
                isValid = false;
            } else {
                removeError(emailInput);
            }
            
            // Validate message
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Message is required');
                isValid = false;
            } else {
                removeError(messageInput);
            }
            
            // If form is valid, submit
            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Your message has been sent successfully!';
                
                // Insert success message after form
                contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
                
                // Reset form
                contactForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(function() {
                    successMessage.remove();
                }, 5000);
                
                // In a real application, you would handle form submission here
                // For example, using fetch API to send data to a server
                // fetch('/submit-form', {
                //     method: 'POST',
                //     body: new FormData(contactForm)
                // })
                // .then(response => response.json())
                // .then(data => {
                //     console.log('Success:', data);
                // })
                // .catch(error => {
                //     console.error('Error:', error);
                // });
            }
        });
    }
    
    // Helper functions for form validation
    function showError(input, message) {
        // Remove any existing error message
        removeError(input);
        
        // Create error message element
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        
        // Add red border to input
        input.style.borderColor = '#ff4d4d';
        
        // Insert error message after input
        input.parentNode.insertBefore(errorMessage, input.nextSibling);
    }
    
    function removeError(input) {
        // Remove red border
        input.style.borderColor = '';
        
        // Find and remove error message if it exists
        const errorMessage = input.nextSibling;
        if (errorMessage && errorMessage.className === 'error-message') {
            errorMessage.remove();
        }
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});

// Animation script for blog and contact pages
document.addEventListener('DOMContentLoaded', function() {
    // Handle animations for elements with animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Function to handle scroll animation
    function handleScrollAnimation() {
        animatedElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('active');
            }
        });
    }
    
    // Initial check for elements in viewport
    handleScrollAnimation();
    
    // Listen for scroll events
    window.addEventListener('scroll', handleScrollAnimation);
});