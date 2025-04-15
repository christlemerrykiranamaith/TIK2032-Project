// Enhanced gallery.js
document.addEventListener('DOMContentLoaded', function() {
    // Gallery functionality with improved UX and features
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox img');
    const lightboxTitle = document.querySelector('.lightbox-details h2');
    const lightboxDescription = document.querySelector('.lightbox-details p');
    const lightboxTags = document.querySelector('.lightbox-tags');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevItem = document.querySelector('.prev-item');
    const nextItem = document.querySelector('.next-item');
    
    let currentItemIndex = 0;
    
    if (galleryItems.length > 0) {
        // Function to open lightbox with item details
        function openLightbox(index) {
            const item = galleryItems[index];
            const img = item.querySelector('img');
            const title = item.querySelector('.item-overlay h3').textContent;
            const description = item.querySelector('.item-overlay p').textContent;
            const tags = Array.from(item.querySelectorAll('.item-tags span')).map(tag => tag.textContent);
            
            lightboxImg.setAttribute('src', img.getAttribute('src'));
            lightboxTitle.textContent = title;
            lightboxDescription.textContent = description;
            
            // Clear and add tags
            lightboxTags.innerHTML = '';
            tags.forEach(tag => {
                const span = document.createElement('span');
                span.textContent = tag;
                lightboxTags.appendChild(span);
            });
            
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
            currentItemIndex = index;
            
            // Update navigation buttons visibility
            updateNavButtons();
        }
        
        // Update navigation buttons based on current index
        function updateNavButtons() {
            prevItem.style.visibility = currentItemIndex > 0 ? 'visible' : 'hidden';
            nextItem.style.visibility = currentItemIndex < galleryItems.length - 1 ? 'visible' : 'hidden';
        }
        
        // Click on gallery items to open lightbox
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                openLightbox(index);
            });
        });
        
        // Navigation within lightbox
        prevItem.addEventListener('click', function() {
            if (currentItemIndex > 0) {
                openLightbox(currentItemIndex - 1);
            }
        });
        
        nextItem.addEventListener('click', function() {
            if (currentItemIndex < galleryItems.length - 1) {
                openLightbox(currentItemIndex + 1);
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (lightbox.style.display !== 'flex') return;
            
            if (e.key === 'ArrowLeft' && currentItemIndex > 0) {
                openLightbox(currentItemIndex - 1);
            } else if (e.key === 'ArrowRight' && currentItemIndex < galleryItems.length - 1) {
                openLightbox(currentItemIndex + 1);
            } else if (e.key === 'Escape') {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close lightbox when clicking on close button or outside image
        closeLightbox.addEventListener('click', function() {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Gallery filtering and search functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('gallery-search');
    const searchButton = document.getElementById('search-btn');
    const sortSelect = document.getElementById('sort-select');
    
    // Active filter category
    let activeFilter = 'all';
    // Current search query
    let searchQuery = '';
    
    // Function to filter and sort gallery items
    function filterAndSortItems() {
        // Filter items by category and search query
        galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');
            const name = item.getAttribute('data-name').toLowerCase();
            const shouldShowByCategory = activeFilter === 'all' || category === activeFilter;
            const shouldShowBySearch = searchQuery === '' || name.includes(searchQuery.toLowerCase());
            
            if (shouldShowByCategory && shouldShowBySearch) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        
        // Sort visible items
        const visibleItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
        
        sortItems(visibleItems);
    }
    
    // Function to sort gallery items
    function sortItems(items) {
        const sortValue = sortSelect ? sortSelect.value : 'newest';
        const container = document.querySelector('.gallery-container');
        
        items.sort((a, b) => {
            const aName = a.getAttribute('data-name');
            const bName = b.getAttribute('data-name');
            const aDate = new Date(a.getAttribute('data-date'));
            const bDate = new Date(b.getAttribute('data-date'));
            
            switch (sortValue) {
                case 'newest':
                    return bDate - aDate;
                case 'oldest':
                    return aDate - bDate;
                case 'name-asc':
                    return aName.localeCompare(bName);
                case 'name-desc':
                    return bName.localeCompare(aName);
                default:
                    return 0;
            }
        });
        
        // Reorder items in DOM
        items.forEach(item => {
            container.appendChild(item);
        });
    }
    
    // Filter button click handlers
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active filter
                activeFilter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Apply filtering
                filterAndSortItems();
            });
        });
    }
    
    // Search functionality
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', function() {
            searchQuery = searchInput.value.trim();
            filterAndSortItems();
        });
        
        // Search on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchQuery = this.value.trim();
                filterAndSortItems();
            }
        });
    }
    
    // Sort functionality
    if (sortSelect) {
        sortSelect.addEventListener('change', filterAndSortItems);
    }
    
    // Pagination functionality (simplified for demo)
    const pageButtons = document.querySelectorAll('.page-btn');
    
    if (pageButtons.length > 0) {
        pageButtons.forEach(button => {
            button.addEventListener('click', function() {
                if (this.classList.contains('next')) {
                    // Logic for next page button
                    const activePage = document.querySelector('.page-btn.active:not(.next)');
                    const nextPage = activePage.nextElementSibling;
                    
                    if (nextPage && !nextPage.classList.contains('next')) {
                        pageButtons.forEach(btn => btn.classList.remove('active'));
                        nextPage.classList.add('active');
                    }
                } else {
                    // Logic for number page buttons
                    pageButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                }
                
                // Scroll to top of gallery
                document.querySelector('.gallery-container').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }
});