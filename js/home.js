document.addEventListener('DOMContentLoaded', function() {
    // Typing effect
    const typedTextElement = document.getElementById('typed-text');
    const textsToType = [
        "Fashion Designer",
        "IT Enthusiast",
        "Business Developer",
        "Creative Thinker"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;
    let erasingDelay = 50;
    let newTextDelay = 2000;

    function typeText() {
        const currentText = textsToType[textIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = erasingDelay;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingDelay = newTextDelay;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textsToType.length;
        }
        
        setTimeout(typeText, typingDelay);
    }
    
    if (typedTextElement) {
        setTimeout(typeText, newTextDelay);
    }
    
    // Image carousel
    const carouselImages = document.querySelectorAll('.carousel-container img');
    const dots = document.querySelectorAll('.dot');
    const prevSlide = document.querySelector('.prev-slide');
    const nextSlide = document.querySelector('.next-slide');
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
        carouselImages.forEach(img => img.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (index + carouselImages.length) % carouselImages.length;
        
        carouselImages[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    function nextSlideShow() {
        showSlide(currentSlide + 1);
    }
    
    function startSlideShow() {
        if (!slideInterval) {
            slideInterval = setInterval(nextSlideShow, 5000);
        }
    }
    
    function stopSlideShow() {
        clearInterval(slideInterval);
        slideInterval = null;
    }
    
    if (carouselImages.length > 0) {
        startSlideShow();
        
        if (prevSlide && nextSlide) {
            prevSlide.addEventListener('click', function() {
                showSlide(currentSlide - 1);
                stopSlideShow();
                startSlideShow();
            });
            
            nextSlide.addEventListener('click', function() {
                showSlide(currentSlide + 1);
                stopSlideShow();
                startSlideShow();
            });
        }
        
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const slideIndex = parseInt(this.getAttribute('data-index'));
                showSlide(slideIndex);
                stopSlideShow();
                startSlideShow();
            });
        });
    }
    
    // Animate skill bars
    const skillLevels = document.querySelectorAll('.skill-level');
    const animateSkillBars = () => {
        skillLevels.forEach(skill => {
            const skillPosition = skill.getBoundingClientRect().top;
            if (skillPosition < window.innerHeight - 100) {
                skill.style.transform = 'scaleX(1)';
            }
        });
    };
    
    // Check for skills when scrolling
    window.addEventListener('scroll', animateSkillBars);
    
    // Initialize animations
    animateSkillBars();
    
    // Enhanced theme switch with localStorage
    const themeSwitch = document.querySelector('.theme-switch');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeSwitch.textContent = '☀️';
    }
    
    if (themeSwitch) {
        themeSwitch.addEventListener('click', function() {
            body.classList.toggle('dark-theme');
            
            if (body.classList.contains('dark-theme')) {
                themeSwitch.textContent = '☀️';
                localStorage.setItem('theme', 'dark');
            } else {
                themeSwitch.textContent = '🌙';
                localStorage.setItem('theme', 'light');
            }
        });
    }
    
    // Weather widget with mock data (since we're not using real API)
    function showMockWeather() {
        const weatherContainer = document.createElement('div');
        weatherContainer.className = 'weather-widget';
        weatherContainer.innerHTML = `
            <div class="weather-info">
                <div class="weather-icon">⛅</div>
                <div class="weather-details">
                    <span class="weather-temp">27°C</span>
                    <span class="weather-location">Jakarta, ID</span>
                </div>
                <div class="weather-close">×</div>
            </div>
        `;
        
        document.body.appendChild(weatherContainer);
        
        setTimeout(() => {
            weatherContainer.classList.add('visible');
        }, 1000);
        
        const closeButton = weatherContainer.querySelector('.weather-close');
        closeButton.addEventListener('click', () => {
            weatherContainer.classList.remove('visible');
            setTimeout(() => {
                weatherContainer.remove();
            }, 500);
        });
    }
    
    // Show mock weather after 3 seconds
    setTimeout(showMockWeather, 3000);
});