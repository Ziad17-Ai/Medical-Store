// Product Detail JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Image gallery functionality
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (thumbnails.length > 0) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                // Update main image
                mainImage.src = this.src;
                
                // Update active thumbnail
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // Quantity selector
    const quantityInput = document.getElementById('quantity');
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    
    if (minusBtn && plusBtn && quantityInput) {
        minusBtn.addEventListener('click', () => {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });
        
        plusBtn.addEventListener('click', () => {
            let value = parseInt(quantityInput.value);
            if (value < 10) {
                quantityInput.value = value + 1;
            }
        });
        
        quantityInput.addEventListener('change', function() {
            let value = parseInt(this.value);
            if (value < 1) this.value = 1;
            if (value > 10) this.value = 10;
        });
    }
    
    // Add to cart button
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const quantity = parseInt(quantityInput.value);
            
            // Get product info from page
            const productId = 1; // This would come from URL parameters in real app
            const productName = document.querySelector('.product-title').textContent;
            const productPrice = parseFloat(document.querySelector('.current-price').textContent.replace('EGP ', '').replace(',', ''));
            const productImage = mainImage.src;
            
            // Add to cart
            addToCart(productId, productName, productPrice, productImage, quantity);
            
            // Show success message
            showNotification(`Added ${quantity} ${productName} to cart!`, 'success');
        });
    }
    
    // Wishlist button
    const wishlistBtn = document.querySelector('.wishlist-btn');
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
            
            if (icon.classList.contains('fas')) {
                showNotification('Added to wishlist!', 'success');
                this.innerHTML = '<i class="fas fa-heart"></i> In Wishlist';
            } else {
                showNotification('Removed from wishlist', 'info');
                this.innerHTML = '<i class="far fa-heart"></i> Add to Wishlist';
            }
        });
    }
    
    // Tab functionality
    const tabHeaders = document.querySelectorAll('.tab-header');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabHeaders.length > 0) {
        tabHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const tabId = this.dataset.tab;
                
                // Update active tab header
                tabHeaders.forEach(h => h.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding tab content
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === tabId) {
                        content.classList.add('active');
                    }
                });
            });
        });
    }
    
    // Star rating for review form
    const starRating = document.querySelector('.star-rating');
    if (starRating) {
        const stars = starRating.querySelectorAll('i');
        
        stars.forEach(star => {
            star.addEventListener('mouseover', function() {
                const rating = parseInt(this.dataset.rating);
                highlightStars(rating);
            });
            
            star.addEventListener('click', function() {
                const rating = parseInt(this.dataset.rating);
                // Store the rating (in real app, you would send to server)
                localStorage.setItem('productRating', rating);
                highlightStars(rating);
            });
        });
        
        starRating.addEventListener('mouseleave', function() {
            const savedRating = localStorage.getItem('productRating') || 0;
            highlightStars(savedRating);
        });
        
        function highlightStars(rating) {
            stars.forEach((star, index) => {
                if (index < rating) {
                    star.classList.remove('far');
                    star.classList.add('fas');
                } else {
                    star.classList.remove('fas');
                    star.classList.add('far');
                }
            });
        }
    }
    
    // Load related products
    loadRelatedProducts();
    
    // Functions
    function addToCart(id, name, price, image, quantity) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: id,
                name: name,
                price: price,
                image: image,
                quantity: quantity
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart count in header
        updateCartCount();
    }
    
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountElements = document.querySelectorAll('.cart-count');
        
        cartCountElements.forEach(element => {
            element.textContent = totalItems > 0 ? totalItems : '';
        });
    }
    
    function loadRelatedProducts() {
        const productsGrid = document.querySelector('.related-products .products-grid');
        if (!productsGrid) return;
        
        // Sample related products
        const relatedProducts = [
            {
                id: 5,
                name: 'ECG Machine 12-Lead',
                price: 45000,
                image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                category: 'Diagnostic Equipment',
                rating: 4.8
            },
            {
                id: 6,
                name: 'Portable Pulse Oximeter',
                price: 850,
                image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                category: 'Monitoring Devices',
                rating: 4.3
            },
            {
                id: 7,
                name: 'Digital Stethoscope',
                price: 2500,
                image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                category: 'Diagnostic Tools',
                rating: 4.6
            },
            {
                id: 8,
                name: 'Medical Examination Light',
                price: 3500,
                image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                category: 'Medical Furniture',
                rating: 4.4
            }
        ];
        
        productsGrid.innerHTML = '';
        
        relatedProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    <button class="wishlist-btn"><i class="far fa-heart"></i></button>
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-rating">
                        ${getRatingStars(product.rating)}
                        <span class="rating-count">(${Math.floor(Math.random() * 100) + 20})</span>
                    </div>
                    <div class="product-price">
                        <span class="current-price">EGP ${product.price.toLocaleString()}</span>
                    </div>
                    <div class="product-stock">
                        <i class="fas fa-check-circle"></i> In Stock
                    </div>
                    <div class="product-actions">
                        <button class="btn btn-outline add-to-cart" data-id="${product.id}">
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                        <a href="product-detail.html?id=${product.id}" class="btn btn-secondary">View Details</a>
                    </div>
                </div>
            `;
            
            productsGrid.appendChild(productCard);
        });
        
        // Add event listeners to new buttons
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = parseInt(this.dataset.id);
                const product = relatedProducts.find(p => p.id === productId);
                
                if (product) {
                    addToCart(product.id, product.name, product.price, product.image, 1);
                    showNotification(`Added ${product.name} to cart!`, 'success');
                }
            });
        });
    }
    
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
    
    function showNotification(message, type = 'info') {
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
    
    // Initialize cart count
    updateCartCount();
});