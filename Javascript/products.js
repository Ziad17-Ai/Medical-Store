// Products Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Sample product data
    const products = [
        {
            id: 1,
            name: 'Digital Blood Pressure Monitor',
            category: 'Monitoring Devices',
            price: 1299,
            originalPrice: 1599,
            rating: 4.5,
            ratingCount: 124,
            image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            stock: 25,
            requiresPrescription: false,
            badge: 'Bestseller'
        },
        {
            id: 2,
            name: 'Portable Oxygen Concentrator',
            category: 'Respiratory Care',
            price: 18500,
            originalPrice: null,
            rating: 4,
            ratingCount: 89,
            image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            stock: 3,
            requiresPrescription: true,
            badge: 'Requires Prescription'
        },
        {
            id: 3,
            name: 'Infrared Digital Thermometer',
            category: 'Diagnostic Tools',
            price: 450,
            originalPrice: null,
            rating: 5,
            ratingCount: 256,
            image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            stock: 150,
            requiresPrescription: false,
            badge: 'New Arrival'
        },
        {
            id: 4,
            name: 'Electric Adjustable Hospital Bed',
            category: 'Hospital Furniture',
            price: 32000,
            originalPrice: 35000,
            rating: 4.5,
            ratingCount: 67,
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            stock: 8,
            requiresPrescription: false
        },
        {
            id: 5,
            name: 'ECG Machine 12-Lead',
            category: 'Diagnostic Equipment',
            price: 45000,
            originalPrice: 50000,
            rating: 4.8,
            ratingCount: 45,
            image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            stock: 5,
            requiresPrescription: false,
            badge: '-10%'
        },
        {
            id: 6,
            name: 'Surgical Instrument Set',
            category: 'Surgical Instruments',
            price: 8500,
            originalPrice: null,
            rating: 4.2,
            ratingCount: 78,
            image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            stock: 12,
            requiresPrescription: true
        },
        {
            id: 7,
            name: 'Portable Ultrasound Scanner',
            category: 'Diagnostic Equipment',
            price: 125000,
            originalPrice: 150000,
            rating: 4.9,
            ratingCount: 23,
            image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            stock: 3,
            requiresPrescription: false,
            badge: 'Limited Stock'
        },
        {
            id: 8,
            name: 'Medical Ventilator ICU',
            category: 'Respiratory Care',
            price: 250000,
            originalPrice: null,
            rating: 4.7,
            ratingCount: 34,
            image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            stock: 2,
            requiresPrescription: true,
            badge: 'Requires Prescription'
        }
    ];

    const productsGrid = document.getElementById('productsGrid');
    const productsCount = document.getElementById('productsCount');
    const sortSelect = document.getElementById('sortBy');
    const productSearch = document.getElementById('productSearch');
    const applyFiltersBtn = document.querySelector('.apply-filters');
    const resetFiltersBtn = document.querySelector('.reset-filters');
    
    let filteredProducts = [...products];
    
    // Render products
    function renderProducts(productsToRender) {
        productsGrid.innerHTML = '';
        
        productsToRender.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            let badgeHTML = '';
            if (product.badge) {
                const badgeClass = product.badge.includes('Prescription') ? 'prescription' : '';
                badgeHTML = `<div class="product-badge ${badgeClass}">${product.badge}</div>`;
            }
            
            let priceHTML = `<span class="current-price">EGP ${product.price.toLocaleString()}</span>`;
            if (product.originalPrice) {
                priceHTML += `<span class="original-price">EGP ${product.originalPrice.toLocaleString()}</span>`;
            }
            
            let stockHTML = `<i class="fas fa-check-circle"></i> In Stock: ${product.stock} units`;
            if (product.stock < 5) {
                stockHTML = `<i class="fas fa-clock"></i> Limited Stock: ${product.stock} units`;
            }
            
            const ratingStars = getRatingStars(product.rating);
            
            productCard.innerHTML = `
                ${badgeHTML}
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    <button class="wishlist-btn"><i class="far fa-heart"></i></button>
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-rating">
                        ${ratingStars}
                        <span class="rating-count">(${product.ratingCount})</span>
                    </div>
                    <div class="product-price">
                        ${priceHTML}
                    </div>
                    <div class="product-stock">
                        ${stockHTML}
                    </div>
                    <div class="product-actions">
                        <button class="btn btn-outline add-to-cart" data-id="${product.id}">
                            <i class="fas fa-cart-plus"></i> 
                            ${product.requiresPrescription ? 'Add Prescription' : 'Add to Cart'}
                        </button>
                        <a href="product-detail.html?id=${product.id}" class="btn btn-secondary">View Details</a>
                    </div>
                </div>
            `;
            
            productsGrid.appendChild(productCard);
        });
        
        // Update count
        productsCount.textContent = productsToRender.length;
        
        // Add event listeners to new buttons
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = parseInt(this.dataset.id);
                const product = products.find(p => p.id === productId);
                
                if (product.requiresPrescription) {
                    // Show prescription modal
                    const modal = document.getElementById('prescriptionModal');
                    if (modal) {
                        modal.classList.add('active');
                        document.querySelector('.modal-overlay').classList.add('active');
                    }
                } else {
                    // ADD TO CART - FIXED VERSION
                    addToCart(productId, product);
                }
            });
        });
        
        // Wishlist buttons
        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const icon = this.querySelector('i');
                icon.classList.toggle('far');
                icon.classList.toggle('fas');
                icon.classList.toggle('text-danger');
                
                showNotification('Added to wishlist!', 'success');
            });
        });
    }
    
    // SIMPLE ADD TO CART FUNCTION (if app.js doesn't work)
    function addToCart(productId, product) {
        console.log('Adding product to cart:', productId);
        
        // Try to use window.addToCart from app.js first
        if (window.addToCart && typeof window.addToCart === 'function') {
            window.addToCart(productId);
            return;
        }
        
        // Fallback: Direct localStorage implementation
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Check if product already in cart
        const existingItemIndex = cart.findIndex(item => item.id === productId);
        
        if (existingItemIndex !== -1) {
            // Increase quantity
            cart[existingItemIndex].quantity += 1;
        } else {
            // Add new item
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                category: product.category,
                quantity: 1
            });
        }
        
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Show notification
        showNotification(`${product.name} added to cart!`, 'success');
        
        // Update cart count in header
        updateCartCount();
    }
    
    // Update cart count
    function updateCartCount() {
        // Try to use window.updateCartCount from app.js first
        if (window.updateCartCount && typeof window.updateCartCount === 'function') {
            window.updateCartCount();
            return;
        }
        
        // Fallback: Direct implementation
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        // Update all cart count elements
        document.querySelectorAll('.cart-count').forEach(element => {
            element.textContent = totalItems;
        });
    }
    
    // Show notification
    function showNotification(message, type = 'info') {
        // Try to use window.showNotification from app.js first
        if (window.showNotification && typeof window.showNotification === 'function') {
            window.showNotification(message, type);
            return;
        }
        
        // Fallback: Direct implementation
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <p>${message}</p>
            <button class="close-notification">&times;</button>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
        
        notification.querySelector('.close-notification').addEventListener('click', () => {
            notification.remove();
        });
    }
    
    // Get rating stars HTML
    function getRatingStars(rating) {
        let stars = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars += '<i class="fas fa-star"></i>';
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        
        return stars;
    }
    
    // Filter products
    function filterProducts() {
        const searchTerm = productSearch.value.toLowerCase();
        const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
        const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;
        const selectedCategories = Array.from(document.querySelectorAll('.filter-checkbox input[type="checkbox"]:checked'))
            .map(cb => cb.nextElementSibling.textContent);
        
        filteredProducts = products.filter(product => {
            // Search filter
            const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                                product.category.toLowerCase().includes(searchTerm);
            
            // Price filter
            const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
            
            // Category filter
            const matchesCategory = selectedCategories.length === 0 || 
                                  selectedCategories.includes(product.category);
            
            return matchesSearch && matchesPrice && matchesCategory;
        });
        
        // Apply sorting
        sortProducts();
    }
    
    // Sort products
    function sortProducts() {
        const sortValue = sortSelect.value;
        
        switch(sortValue) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'rating':
                filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                // Assuming newer products have higher IDs
                filteredProducts.sort((a, b) => b.id - a.id);
                break;
            default:
                // Default sorting
                break;
        }
        
        renderProducts(filteredProducts);
    }
    
    // Initialize price slider
    function initPriceSlider() {
        const minSlider = document.getElementById('minSlider');
        const maxSlider = document.getElementById('maxSlider');
        const minPrice = document.getElementById('minPrice');
        const maxPrice = document.getElementById('maxPrice');
        
        function updatePriceInputs() {
            minPrice.value = minSlider.value;
            maxPrice.value = maxSlider.value;
        }
        
        function updateSliders() {
            minSlider.value = minPrice.value;
            maxSlider.value = maxPrice.value;
        }
        
        minSlider.addEventListener('input', updatePriceInputs);
        maxSlider.addEventListener('input', updatePriceInputs);
        minPrice.addEventListener('input', updateSliders);
        maxPrice.addEventListener('input', updateSliders);
        
        updatePriceInputs();
    }
    
    // Initialize
    function init() {
        renderProducts(products);
        initPriceSlider();
        
        // Update cart count on page load
        updateCartCount();
        
        // Event listeners
        sortSelect.addEventListener('change', sortProducts);
        productSearch.addEventListener('input', filterProducts);
        
        if (applyFiltersBtn) {
            applyFiltersBtn.addEventListener('click', filterProducts);
        }
        
        if (resetFiltersBtn) {
            resetFiltersBtn.addEventListener('click', function() {
                productSearch.value = '';
                document.getElementById('minPrice').value = 0;
                document.getElementById('maxPrice').value = 50000;
                document.querySelectorAll('.filter-checkbox input').forEach(cb => cb.checked = false);
                sortSelect.value = 'default';
                filterProducts();
            });
        }
    }
    
    // Add custom CSS for products page
    const style = document.createElement('style');
    style.textContent = `
        .text-danger {
            color: #dc3545 !important;
        }
        
        .btn-sm {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
        }
        
        .nav-menu.active {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            padding: 1rem;
            box-shadow: var(--shadow);
            z-index: 1000;
        }
        
        .nav-menu.active .nav-links {
            flex-direction: column;
            margin-left: 0;
        }
        
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            z-index: 2000;
            animation: slideIn 0.3s ease;
            border-left: 4px solid #2a6e97;
        }
        
        .notification.success {
            border-left-color: #28a745;
        }
        
        .notification.error {
            border-left-color: #ff6b6b;
        }
        
        .notification.info {
            border-left-color: #17a2b8;
        }
        
        .notification p {
            margin: 0;
            color: #343a40;
        }
        
        .close-notification {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #6c757d;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .fade-out {
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    // products.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('Products page loaded');
    
    // Initialize cart count
    if (window.updateCartCount) {
        window.updateCartCount();
    }
    
    // Setup add to cart buttons
    setupAddToCartButtons();
});

function setupAddToCartButtons() {
    console.log('Setting up add to cart buttons');
    
    // Example 1: For product cards
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productCard = this.closest('.product-card');
            if (!productCard) {
                console.error('Product card not found');
                return;
            }
            
            const product = {
                id: parseInt(productCard.dataset.id) || Date.now(), // Use timestamp if no ID
                name: productCard.querySelector('.product-name, .product-title, h3, h4')?.textContent || 'Product',
                category: productCard.querySelector('.product-category, .category')?.textContent || 'General',
                price: parseFloat(productCard.querySelector('.product-price, .price').textContent.replace(/[^0-9.]/g, '')) || 0,
                image: productCard.querySelector('img')?.src || 'https://via.placeholder.com/150',
                sku: productCard.querySelector('.product-sku')?.textContent.replace('SKU: ', '') || `PROD-${Date.now()}`
            };
            
            console.log('Adding product:', product);
            
            // Call the global addToCart function
            if (window.addToCart) {
                window.addToCart(product);
            } else {
                console.error('addToCart function not found!');
                alert('Unable to add to cart. Please try again.');
            }
        });
    });
    
    // Example 2: For "Add to Cart" links
    document.querySelectorAll('a[href*="add-to-cart"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get product data from the link's data attributes
            const product = {
                id: parseInt(this.dataset.id) || Date.now(),
                name: this.dataset.name || 'Product',
                price: parseFloat(this.dataset.price) || 0,
                image: this.dataset.image || 'https://via.placeholder.com/150'
            };
            
            if (window.addToCart) {
                window.addToCart(product);
            }
        });
    });
}

// Quick add function for testing
function quickAddToCart(productId, productName, price) {
    if (window.addToCart) {
        window.addToCart({
            id: productId,
            name: productName,
            price: price,
            image: 'https://via.placeholder.com/150'
        });
    }
}


    // Start the app
    init();
    
});