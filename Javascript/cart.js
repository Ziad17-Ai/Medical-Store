// Cart Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('🛒 cart.js loaded');
    
    // Load cart from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('Cart items from localStorage:', cartItems);
    
    // DOM Elements
    const cartTableContainer = document.getElementById('cart-table-container');
    const cartHeaderCount = document.querySelector('.cart-header h2');
    const clearCartBtn = document.querySelector('.clear-cart');
    const updateCartBtn = document.querySelector('.update-cart');
    const promoInput = document.getElementById('promo-code-input');
    const applyPromoBtn = document.getElementById('apply-promo-btn');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    // Calculate and update totals
    function calculateTotals() {
        const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = 200;
        const tax = subtotal * 0.14;
        const discount = 0; // Will be updated when promo code is applied
        const total = subtotal + shipping + tax - discount;
        
        // Update UI elements
        const cartTotalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        
        // Update summary section
        if (document.getElementById('cart-total-items')) {
            document.getElementById('cart-total-items').textContent = cartTotalItems;
        }
        
        if (document.getElementById('summary-item-count')) {
            document.getElementById('summary-item-count').textContent = cartTotalItems;
        }
        
        if (document.getElementById('summary-subtotal')) {
            document.getElementById('summary-subtotal').textContent = `EGP ${subtotal.toLocaleString()}`;
        }
        
        if (document.getElementById('summary-shipping')) {
            document.getElementById('summary-shipping').textContent = `EGP ${shipping.toLocaleString()}`;
        }
        
        if (document.getElementById('summary-tax')) {
            document.getElementById('summary-tax').textContent = `EGP ${tax.toLocaleString()}`;
        }
        
        if (document.getElementById('summary-total')) {
            document.getElementById('summary-total').textContent = `EGP ${total.toLocaleString()}`;
        }
        
        // Update header
        if (cartHeaderCount) {
            cartHeaderCount.textContent = `Your Cart Items (${cartTotalItems})`;
        }
        
        // Update cart count in header
        if (typeof updateCartCount === 'function') {
            updateCartCount();
        }
        
        return { subtotal, shipping, tax, discount, total };
    }
    
    // Render cart items
    function renderCartItems() {
        if (!cartTableContainer) {
            console.error('❌ cart-table-container not found');
            return;
        }
        
        // Clear container
        cartTableContainer.innerHTML = '';
        
        if (cartItems.length === 0) {
            // Show empty cart message
            cartTableContainer.innerHTML = `
                <div class="empty-cart-message">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Your cart is empty</h3>
                    <p>Add some products to your cart to see them here</p>
                    <a href="products.html" class="btn btn-primary">
                        <i class="fas fa-shopping-bag"></i> Start Shopping
                    </a>
                </div>
            `;
            calculateTotals();
            return;
        }
        
        // Create cart table header
        const header = document.createElement('div');
        header.className = 'cart-table-header';
        header.innerHTML = `
            <div class="cart-col product">Product</div>
            <div class="cart-col price">Price</div>
            <div class="cart-col quantity">Quantity</div>
            <div class="cart-col total">Total</div>
            <div class="cart-col actions">Actions</div>
        `;
        cartTableContainer.appendChild(header);
        
        // Create cart items rows
        cartItems.forEach((item, index) => {
            const row = document.createElement('div');
            row.className = `cart-item-row ${item.requiresPrescription ? 'prescription-item' : ''}`;
            row.innerHTML = `
                <div class="cart-col product">
                    <div class="product-info">
                        <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/150'">
                        <div>
                            <h4>${item.name}</h4>
                            <span class="product-category">${item.category || 'General'}</span>
                            <div class="product-sku">ID: ${item.id}</div>
                            ${item.requiresPrescription ? `
                                <div class="prescription-notice">
                                    <i class="fas fa-exclamation-triangle"></i>
                                    Requires prescription approval
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
                <div class="cart-col price">
                    <div class="price-amount">EGP ${item.price.toLocaleString()}</div>
                </div>
                <div class="cart-col quantity">
                    <div class="quantity-control">
                        <button class="quantity-btn minus" data-index="${index}">-</button>
                        <input type="number" value="${item.quantity}" min="1" max="99" class="quantity-input" data-index="${index}">
                        <button class="quantity-btn plus" data-index="${index}">+</button>
                    </div>
                </div>
                <div class="cart-col total">
                    <div class="total-amount">EGP ${(item.price * item.quantity).toLocaleString()}</div>
                </div>
                <div class="cart-col actions">
                    <button class="btn btn-sm remove-btn" data-index="${index}">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                    ${item.requiresPrescription ? `
                        <button class="btn btn-sm btn-outline upload-btn" data-index="${index}">
                            <i class="fas fa-upload"></i> Prescription
                        </button>
                    ` : `
                        <button class="btn btn-sm btn-outline wishlist-btn" data-index="${index}">
                            <i class="far fa-heart"></i> Save
                        </button>
                    `}
                </div>
            `;
            cartTableContainer.appendChild(row);
        });
        
        // Add event listeners to the new elements
        addCartEventListeners();
        calculateTotals();
    }
    
    // Add event listeners to cart items
    function addCartEventListeners() {
        // Quantity minus buttons
        document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                if (cartItems[index].quantity > 1) {
                    cartItems[index].quantity -= 1;
                    updateCart();
                    showNotification(`Updated ${cartItems[index].name} quantity`, 'info');
                }
            });
        });
        
        // Quantity plus buttons
        document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                if (cartItems[index].quantity < 99) {
                    cartItems[index].quantity += 1;
                    updateCart();
                    showNotification(`Updated ${cartItems[index].name} quantity`, 'info');
                }
            });
        });
        
        // Quantity inputs
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', function() {
                const index = parseInt(this.dataset.index);
                const newQuantity = parseInt(this.value);
                
                if (!isNaN(newQuantity) && newQuantity >= 1 && newQuantity <= 99) {
                    cartItems[index].quantity = newQuantity;
                    updateCart();
                    showNotification(`Updated ${cartItems[index].name} quantity to ${newQuantity}`, 'info');
                } else {
                    this.value = cartItems[index].quantity;
                    showNotification('Quantity must be between 1 and 99', 'error');
                }
            });
        });
        
        // Remove buttons
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                const itemName = cartItems[index].name;
                
                if (confirm(`Remove "${itemName}" from cart?`)) {
                    cartItems.splice(index, 1);
                    updateCart();
                    showNotification(`${itemName} removed from cart`, 'info');
                }
            });
        });
        
        // Wishlist buttons
        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                const item = cartItems[index];
                
                // Add to wishlist
                let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
                const exists = wishlist.some(w => w.id === item.id);
                
                if (!exists) {
                    wishlist.push(item);
                    localStorage.setItem('wishlist', JSON.stringify(wishlist));
                    showNotification(`${item.name} added to wishlist`, 'success');
                    
                    // Change heart icon to solid
                    const icon = this.querySelector('i');
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                } else {
                    showNotification(`${item.name} is already in your wishlist`, 'info');
                }
            });
        });
        
        // Upload prescription buttons
        document.querySelectorAll('.upload-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const modal = document.getElementById('prescriptionModal');
                if (modal) {
                    modal.classList.add('active');
                    document.querySelector('.modal-overlay').classList.add('active');
                }
            });
        });
    }
    
    // Update cart in localStorage and re-render
    function updateCart() {
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cartItems));
        
        // Reload cart items from localStorage (in case other tabs made changes)
        cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Re-render the cart
        renderCartItems();
        
        // Update cart count in header
        if (typeof updateCartCount === 'function') {
            updateCartCount();
        }
    }
    
    // Clear cart function
    function clearCartFunction() {
        if (cartItems.length === 0) {
            showNotification('Your cart is already empty', 'info');
            return;
        }
        
        if (confirm('Are you sure you want to clear your entire cart?')) {
            cartItems = [];
            localStorage.setItem('cart', JSON.stringify(cartItems));
            renderCartItems();
            
            // Update cart count
            if (typeof updateCartCount === 'function') {
                updateCartCount();
            }
            
            showNotification('Cart cleared successfully', 'success');
        }
    }
    
    // Apply promo code
    function applyPromoCode() {
        const code = promoInput?.value?.trim().toUpperCase();
        
        if (!code) {
            showNotification('Please enter a promo code', 'error');
            return;
        }
        
        // Sample valid codes
        const validCodes = {
            'MEDICAL10': 1000,
            'HEALTH15': 1500,
            'NEWCUSTOMER': 500,
            'SAVE20': 2000
        };
        
        if (validCodes[code]) {
            const discount = validCodes[code];
            
            // Update discount display
            if (document.getElementById('summary-discount')) {
                document.getElementById('summary-discount').textContent = `- EGP ${discount}`;
            }
            
            showNotification(`Promo code applied! You saved EGP ${discount}`, 'success');
            
            // Clear input
            if (promoInput) promoInput.value = '';
            
            // Recalculate totals with discount
            calculateTotals();
        } else {
            showNotification('Invalid promo code. Try: MEDICAL10, HEALTH15, NEWCUSTOMER', 'error');
        }
    }
    
    // Proceed to checkout
    function proceedToCheckout() {
        if (cartItems.length === 0) {
            showNotification('Your cart is empty. Add some products first!', 'error');
            return;
        }
        
        // Check if any prescription items have uploaded prescriptions
        const prescriptionItems = cartItems.filter(item => item.requiresPrescription);
        if (prescriptionItems.length > 0) {
            showNotification('Please upload prescriptions for prescription-required items before checkout', 'warning');
            return;
        }
        
        // Save current cart to checkout storage
        localStorage.setItem('checkoutCart', JSON.stringify(cartItems));
        
        // Redirect to checkout page
        window.location.href = 'checkout.html';
    }
    
    // Initialize prescription modal
    function initPrescriptionModal() {
        const modal = document.getElementById('prescriptionModal');
        if (!modal) return;
        
        const closeModalBtns = document.querySelectorAll('.close-modal, .cancel-upload');
        const uploadArea = document.querySelector('.upload-area');
        const fileInput = document.getElementById('prescriptionFile');
        const uploadSubmitBtn = document.querySelector('.upload-submit');
        const modalOverlay = document.querySelector('.modal-overlay');
        
        if (uploadArea && fileInput) {
            uploadArea.addEventListener('click', () => fileInput.click());
            
            fileInput.addEventListener('change', function() {
                if (this.files.length > 0) {
                    const fileName = this.files[0].name;
                    uploadArea.innerHTML = `
                        <i class="fas fa-check-circle" style="color:#28a745;font-size:3rem;"></i>
                        <h4>File Selected</h4>
                        <p>${fileName}</p>
                        <button class="btn btn-sm btn-outline change-file">Change File</button>
                    `;
                    
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
                    showNotification('Please select a prescription file first', 'error');
                    return;
                }
                
                showNotification('Prescription uploaded successfully! Our team will review it shortly.', 'success');
                modal.classList.remove('active');
                modalOverlay.classList.remove('active');
                
                // Clear file input
                if (fileInput) fileInput.value = '';
            });
        }
        
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                modal.classList.remove('active');
                modalOverlay.classList.remove('active');
                
                // Reset upload area
                if (uploadArea) {
                    uploadArea.innerHTML = `
                        <i class="fas fa-cloud-upload-alt"></i>
                        <h4>Drop prescription file here</h4>
                        <p>or click to browse</p>
                        <input type="file" accept="image/*,.pdf,.doc,.docx" id="prescriptionFile">
                    `;
                }
            });
        });
        
        if (modalOverlay) {
            modalOverlay.addEventListener('click', () => {
                modal.classList.remove('active');
                modalOverlay.classList.remove('active');
            });
        }
    }
    
    // Initialize cart page
    function init() {
        console.log('🔄 Initializing cart with', cartItems.length, 'items');
        
        // Initial render
        renderCartItems();
        
        // Event listeners
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', clearCartFunction);
        }
        
        if (updateCartBtn) {
            updateCartBtn.addEventListener('click', () => {
                updateCart();
                showNotification('Cart updated successfully', 'success');
            });
        }
        
        if (applyPromoBtn) {
            applyPromoBtn.addEventListener('click', applyPromoCode);
        }
        
        if (promoInput) {
            promoInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    applyPromoCode();
                }
            });
        }
        
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                proceedToCheckout();
            });
        }
        
        // Initialize modal
        initPrescriptionModal();
    }
    
    // Start the cart
    init();
});