document.addEventListener('DOMContentLoaded', function() {
    // Gallery lightbox functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox img');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    if (galleryItems.length > 0) {
        // Create lightbox if it doesn't exist
        if (!lightbox) {
            const newLightbox = document.createElement('div');
            newLightbox.className = 'lightbox';
            
            const newImg = document.createElement('img');
            newLightbox.appendChild(newImg);
            
            const closeBtn = document.createElement('span');
            closeBtn.className = 'close-lightbox';
            closeBtn.innerHTML = '&times;';
            newLightbox.appendChild(closeBtn);
            
            document.body.appendChild(newLightbox);
            
            // Update references
            lightboxImg = newImg;
            closeLightbox = closeBtn;
        }
        
        // Open lightbox when clicking on gallery item
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').getAttribute('src');
                lightboxImg.setAttribute('src', imgSrc);
                lightbox.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
            });
        });
        
        // Close lightbox when clicking on close button
        if (closeLightbox) {
            closeLightbox.addEventListener('click', function() {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            });
        }
        
        // Close lightbox when clicking outside of the image
        if (lightbox) {
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    lightbox.style.display = 'none';
                    document.body.style.overflow = 'auto'; // Re-enable scrolling
                }
            });
        }
        
        // Close lightbox when pressing ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.style.display === 'flex') {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            }
        });
    }
    
    // Gallery filtering (if categories are added in the future)
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
});