// Medical Store Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('🛒 app.js loaded');
    
    // Cart functionality
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartOverlay = document.querySelector('.cart-overlay');
    const closeCartBtn = document.querySelector('.close-cart');
    
    // Toggle cart sidebar
    function toggleCart() {
        cartSidebar.classList.toggle('active');
        cartOverlay.classList.toggle('active');
        updateCartCount();
        loadCartItems();
    }
    
    // Update cart count in header
    function updateCartCount() {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        
        document.querySelectorAll('.cart-count').forEach(count => {
            count.textContent = totalItems || '0';
        });
        console.log('Cart count updated:', totalItems);
    }
    
    // Load cart items into sidebar
    function loadCartItems() {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItemsContainer = document.querySelector('.cart-items');
        const totalPriceElement = document.querySelector('.total-price');
        
        if (!cartItemsContainer) return;
        
        cartItemsContainer.innerHTML = '';
        
        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                    <a href="products.html" class="btn btn-primary">Start Shopping</a>
                </div>
            `;
            if (totalPriceElement) totalPriceElement.textContent = 'EGP 0.00';
            return;
        }
        
        let total = 0;
        
        cartItems.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <div class="cart-item-price">EGP ${item.price.toFixed(2)}</div>
                    <div class="cart-item-actions">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                        <button class="remove-item" data-id="${item.id}">Remove</button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        
        if (totalPriceElement) totalPriceElement.textContent = `EGP ${total.toFixed(2)}`;
        
        // Add event listeners to new buttons
        document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
            btn.addEventListener('click', function(e) {
                const productId = parseInt(e.target.dataset.id);
                updateCartItemQuantity(productId, -1);
            });
        });
        
        document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
            btn.addEventListener('click', function(e) {
                const productId = parseInt(e.target.dataset.id);
                updateCartItemQuantity(productId, 1);
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function(e) {
                const productId = parseInt(e.target.dataset.id);
                removeCartItem(productId);
            });
        });
    }
    
    // Add to cart functionality
    function addToCart(productId, productData = null) {
        console.log('Adding product to cart:', productId, productData);
        
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Use provided product data or fallback
        if (productData && productData.name) {
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    name: productData.name,
                    price: productData.price || 0,
                    image: productData.image || 'https://via.placeholder.com/150',
                    category: productData.category || 'General',
                    quantity: 1
                });
            }
        } else {
            // Fallback to sample data
            const products = {
                1: { 
                    name: 'Digital Blood Pressure Monitor', 
                    price: 1299, 
                    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80', 
                    category: 'Monitoring Devices' 
                },
                2: { 
                    name: 'Portable Oxygen Concentrator', 
                    price: 18500, 
                    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80', 
                    category: 'Respiratory Care' 
                },
                3: { 
                    name: 'Infrared Digital Thermometer', 
                    price: 450, 
                    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80', 
                    category: 'Diagnostic Tools' 
                },
                4: { 
                    name: 'Electric Adjustable Hospital Bed', 
                    price: 32000, 
                    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80', 
                    category: 'Hospital Furniture' 
                }
            };
            
            const product = products[productId] || { 
                name: `Product ${productId}`, 
                price: 1000, 
                image: 'https://via.placeholder.com/150', 
                category: 'General' 
            };
            
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    category: product.category,
                    quantity: 1
                });
            }
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Show success notification
        showNotification('Product added to cart!', 'success');
        updateCartCount();
        
        // Auto-open cart on mobile
        if (window.innerWidth < 768) {
            toggleCart();
        }
    }
    
    // Update cart item quantity
    function updateCartItemQuantity(productId, change) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemIndex = cart.findIndex(item => item.id === productId);
        
        if (itemIndex !== -1) {
            cart[itemIndex].quantity += change;
            if (cart[itemIndex].quantity <= 0) {
                cart.splice(itemIndex, 1);
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCartItems();
            updateCartCount();
        }
    }
    
    // Remove cart item
    function removeCartItem(productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.id !== productId);
        
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems();
        updateCartCount();
        showNotification('Item removed from cart', 'info');
    }
    
    // Show notification
    function showNotification(message, type = 'info') {
        // Remove any existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <p>${message}</p>
            <button class="close-notification">&times;</button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
        
        // Close button
        notification.querySelector('.close-notification').addEventListener('click', () => {
            notification.remove();
        });
    }
    
    // Add event listener for dynamically created buttons
    document.addEventListener('click', function(e) {
        // If click is on an "Add to Cart" button or its child
        if (e.target.closest('.add-to-cart')) {
            const button = e.target.closest('.add-to-cart');
            const productId = parseInt(button.dataset.id);
            
            // Get product data from the button or nearby elements
            const productCard = button.closest('.product-card');
            const productName = productCard?.querySelector('.product-title')?.textContent || 'Product';
            const priceText = productCard?.querySelector('.current-price')?.textContent || 'EGP 0';
            const productPrice = parseFloat(priceText.replace('EGP ', '').replace(',', '')) || 0;
            const productImage = productCard?.querySelector('img')?.src || 'https://via.placeholder.com/150';
            const productCategory = productCard?.querySelector('.product-category')?.textContent || 'General';
            
            // Add to cart with product data
            addToCart(productId, {
                name: productName,
                price: productPrice,
                image: productImage,
                category: productCategory
            });
        }
        
        // If click is on cart icon
        if (e.target.closest('.cart-icon')) {
            toggleCart();
        }
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            navMenu.classList.toggle('active');
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // In a real app, you would send this to your server
            showNotification('Thank you for subscribing!', 'success');
            this.reset();
        });
    }
    
    // Cart sidebar event listeners
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', toggleCart);
    }
    
    if (cartOverlay) {
        cartOverlay.addEventListener('click', toggleCart);
    }
    
    // Prescription modal
    const prescriptionModal = document.getElementById('prescriptionModal');
    const prescriptionOverlay = document.querySelector('.modal-overlay');
    const uploadPrescriptionBtns = document.querySelectorAll('.upload-btn');
    const closeModalBtns = document.querySelectorAll('.close-modal, .cancel-upload');
    
    if (prescriptionModal) {
        uploadPrescriptionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                prescriptionModal.classList.add('active');
                prescriptionOverlay.classList.add('active');
            });
        });
        
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                prescriptionModal.classList.remove('active');
                prescriptionOverlay.classList.remove('active');
            });
        });
        
        if (prescriptionOverlay) {
            prescriptionOverlay.addEventListener('click', () => {
                prescriptionModal.classList.remove('active');
                prescriptionOverlay.classList.remove('active');
            });
        }
        
        // File upload handling
        const uploadArea = document.querySelector('.upload-area');
        const fileInput = document.getElementById('prescriptionFile');
        const uploadSubmitBtn = document.querySelector('.upload-submit');
        
        if (uploadArea && fileInput) {
            uploadArea.addEventListener('click', () => fileInput.click());
            
            fileInput.addEventListener('change', function() {
                if (this.files.length > 0) {
                    const fileName = this.files[0].name;
                    uploadArea.innerHTML = `
                        <i class="fas fa-check-circle"></i>
                        <h4>File Selected</h4>
                        <p>${fileName}</p>
                        <button class="btn btn-sm btn-outline change-file">Change File</button>
                    `;
                    
                    // Add change file button listener
                    document.querySelector('.change-file')?.addEventListener('click', (e) => {
                        e.stopPropagation();
                        fileInput.click();
                    });
                }
            });
        }
        
        if (uploadSubmitBtn) {
            uploadSubmitBtn.addEventListener('click', () => {
                if (!fileInput?.files?.length) {
                    showNotification('Please select a prescription file', 'error');
                    return;
                }
                
                // In real app, upload to server here
                showNotification('Prescription uploaded successfully! Our team will review it shortly.', 'success');
                prescriptionModal.classList.remove('active');
                prescriptionOverlay.classList.remove('active');
            });
        }
    }
    
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
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
        
        .empty-cart {
            text-align: center;
            padding: 3rem 1rem;
        }
        
        .empty-cart i {
            font-size: 3rem;
            color: #e9ecef;
            margin-bottom: 1rem;
        }
        
        .empty-cart p {
            margin-bottom: 1.5rem;
            color: #6c757d;
        }
    `;
    document.head.appendChild(style);
    
    // Make addToCart available globally
    window.addToCart = addToCart;
    window.updateCartCount = updateCartCount;
    window.showNotification = showNotification;
    
    // Initialize cart count on page load
    updateCartCount();
    
    console.log('✅ app.js initialized successfully');
});