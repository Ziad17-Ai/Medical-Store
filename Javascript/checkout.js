// Checkout Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const placeOrderBtn = document.querySelector('.place-order');
    const orderConfirmationModal = document.getElementById('orderConfirmation');
    const modalOverlay = document.querySelector('.modal-overlay');
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    const cardDetails = document.getElementById('cardDetails');
    const termsCheckbox = document.getElementById('terms');
    const privacyCheckbox = document.getElementById('privacy');
    
    // Initialize checkout
    function init() {
        // Load cart data
        loadCartData();
        
        // Setup event listeners
        setupEventListeners();
        
        // Setup form validation
        setupFormValidation();
    }
    
    // Load cart data into summary
    function loadCartData() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const orderItemsContainer = document.querySelector('.order-items');
        
        if (!orderItemsContainer) return;
        
        if (cart.length === 0) {
            orderItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                    <a href="products.html" class="btn btn-primary">Shop Products</a>
                </div>
            `;
            return;
        }
        
        // Calculate totals
        calculateOrderSummary(cart);
    }
    
    // Calculate order summary
    function calculateOrderSummary(cart) {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = 200;
        const tax = subtotal * 0.14;
        const discount = 1000;
        const total = subtotal + shipping + tax - discount;
        
        // Update summary
        document.querySelectorAll('.summary-row:nth-child(1) span:last-child').forEach(el => {
            el.textContent = `EGP ${subtotal.toLocaleString()}`;
        });
        
        document.querySelector('.summary-row:nth-child(2) span:last-child').textContent = `EGP ${shipping.toLocaleString()}`;
        document.querySelector('.summary-row:nth-child(3) span:last-child').textContent = `EGP ${tax.toLocaleString()}`;
        document.querySelector('.summary-row.total span:last-child').textContent = `EGP ${total.toLocaleString()}`;
    }
    
    // Setup event listeners
    function setupEventListeners() {
        // Payment method selection
        paymentOptions.forEach(option => {
            option.addEventListener('change', function() {
                if (this.value === 'card' || this.parentElement.textContent.includes('Card')) {
                    cardDetails.style.display = 'block';
                } else {
                    cardDetails.style.display = 'none';
                }
            });
        });
        
        // Place order button
        if (placeOrderBtn) {
            placeOrderBtn.addEventListener('click', placeOrder);
        }
        
        // Credit card input formatting
        const cardNumberInput = document.getElementById('cardNumber');
        const expiryDateInput = document.getElementById('expiryDate');
        const cvvInput = document.getElementById('cvv');
        
        if (cardNumberInput) {
            cardNumberInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                let formattedValue = '';
                
                for (let i = 0; i < value.length; i++) {
                    if (i > 0 && i % 4 === 0) {
                        formattedValue += ' ';
                    }
                    formattedValue += value[i];
                }
                
                e.target.value = formattedValue.substring(0, 19);
            });
        }
        
        if (expiryDateInput) {
            expiryDateInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/[^0-9]/gi, '');
                
                if (value.length >= 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                
                e.target.value = value.substring(0, 5);
            });
        }
        
        if (cvvInput) {
            cvvInput.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/[^0-9]/gi, '').substring(0, 3);
            });
        }
    }
    
    // Setup form validation
    function setupFormValidation() {
        const form = document.querySelector('.checkout-forms');
        
        if (!form) return;
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm()) {
                showNotification('Please fill all required fields correctly', 'error');
                return;
            }
            
            if (!termsCheckbox.checked || !privacyCheckbox.checked) {
                showNotification('Please accept the terms and conditions', 'error');
                return;
            }
            
            processOrder();
        });
    }
    
    // Validate form
    function validateForm() {
        const requiredFields = [
            'fullName',
            'email',
            'phone',
            'address',
            'city'
        ];
        
        for (const fieldId of requiredFields) {
            const field = document.getElementById(fieldId);
            if (!field || !field.value.trim()) {
                field?.classList.add('error');
                return false;
            }
            field?.classList.remove('error');
        }
        
        // Validate email
        const email = document.getElementById('email').value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.getElementById('email').classList.add('error');
            return false;
        }
        
        // Validate phone
        const phone = document.getElementById('phone').value;
        const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
        if (!phoneRegex.test(phone)) {
            document.getElementById('phone').classList.add('error');
            return false;
        }
        
        // Validate card details if credit card is selected
        const isCardSelected = document.querySelector('input[name="payment"]:checked')?.parentElement.textContent.includes('Card');
        if (isCardSelected) {
            const cardNumber = document.getElementById('cardNumber').value.replace(/\s+/g, '');
            const cardName = document.getElementById('cardName').value;
            const expiryDate = document.getElementById('expiryDate').value;
            const cvv = document.getElementById('cvv').value;
            
            if (cardNumber.length !== 16) {
                document.getElementById('cardNumber').classList.add('error');
                return false;
            }
            
            if (!cardName.trim()) {
                document.getElementById('cardName').classList.add('error');
                return false;
            }
            
            if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
                document.getElementById('expiryDate').classList.add('error');
                return false;
            }
            
            if (cvv.length !== 3) {
                document.getElementById('cvv').classList.add('error');
                return false;
            }
        }
        
        return true;
    }
    
    // Process order
    function processOrder() {
        // Show loading state
        placeOrderBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        placeOrderBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Clear cart
            localStorage.removeItem('cart');
            
            // Generate order number
            const orderNumber = 'MED' + new Date().getFullYear() + 
                              String(new Date().getMonth() + 1).padStart(2, '0') +
                              String(new Date().getDate()).padStart(2, '0') +
                              String(Math.floor(Math.random() * 1000)).padStart(3, '0');
            
            // Save order to localStorage (in real app, send to server)
            const order = {
                orderNumber,
                date: new Date().toLocaleDateString(),
                total: 22795,
                items: JSON.parse(localStorage.getItem('cart')) || [],
                status: 'Processing',
                shippingAddress: document.getElementById('address').value,
                paymentMethod: document.querySelector('input[name="payment"]:checked')?.parentElement.textContent.trim()
            };
            
            // Save order to orders history
            const orders = JSON.parse(localStorage.getItem('orders')) || [];
            orders.unshift(order);
            localStorage.setItem('orders', JSON.stringify(orders));
            
            // Show confirmation modal
            showOrderConfirmation(order);
            
            // Reset button
            placeOrderBtn.innerHTML = '<i class="fas fa-lock"></i> Place Order';
            placeOrderBtn.disabled = false;
        }, 2000);
    }
    
    // Show order confirmation
    function showOrderConfirmation(order) {
        if (!orderConfirmationModal) return;
        
        // Update modal with order details
        const orderNumberElement = orderConfirmationModal.querySelector('.detail-row:nth-child(1) strong');
        const orderDateElement = orderConfirmationModal.querySelector('.detail-row:nth-child(2) strong');
        const totalAmountElement = orderConfirmationModal.querySelector('.detail-row:nth-child(3) strong');
        const paymentMethodElement = orderConfirmationModal.querySelector('.detail-row:nth-child(4) strong');
        
        if (orderNumberElement) orderNumberElement.textContent = `#${order.orderNumber}`;
        if (orderDateElement) orderDateElement.textContent = order.date;
        if (totalAmountElement) totalAmountElement.textContent = `EGP ${order.total.toLocaleString()}`;
        if (paymentMethodElement) paymentMethodElement.textContent = order.paymentMethod;
        
        // Show modal
        orderConfirmationModal.classList.add('active');
        modalOverlay.classList.add('active');
        
        // Close modal when clicking overlay
        modalOverlay.addEventListener('click', () => {
            orderConfirmationModal.classList.remove('active');
            modalOverlay.classList.remove('active');
        });
    }
    
    // Place order handler
    function placeOrder() {
        if (!validateForm()) {
            showNotification('Please fill all required fields correctly', 'error');
            return;
        }
        
        if (!termsCheckbox.checked || !privacyCheckbox.checked) {
            showNotification('Please accept the terms and conditions', 'error');
            return;
        }
        
        processOrder();
    }
    
    // Show notification
    function showNotification(message, type = 'info') {
        // Reuse notification function or create new one
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
    
    // Add custom styles
    const style = document.createElement('style');
    style.textContent = `
        .checkout-progress {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 0.9rem;
        }
        
        .checkout-progress .step {
            padding: 5px 10px;
            border-radius: 4px;
            background-color: var(--light-gray);
            color: var(--gray);
        }
        
        .checkout-progress .step.active {
            background-color: var(--primary);
            color: white;
        }
        
        .checkout-progress i {
            color: var(--gray);
            font-size: 0.8rem;
        }
        
        .page-title {
            text-align: center;
            margin: 2rem 0 3rem;
            color: var(--primary);
        }
        
        .checkout-layout {
            display: grid;
            grid-template-columns: 1fr 400px;
            gap: 3rem;
        }
        
        .checkout-form-section {
            background-color: white;
            padding: 2rem;
            border-radius: var(--radius);
            box-shadow: var(--shadow);
            margin-bottom: 2rem;
        }
        
        .checkout-form-section h2 {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 1.5rem;
            color: var(--primary);
            font-size: 1.3rem;
        }
        
        .form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
        }
        
        .form-group {
            margin-bottom: 1rem;
        }
        
        .form-group.full-width {
            grid-column: 1 / -1;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 500;
            color: var(--dark);
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid var(--border);
            border-radius: var(--radius);
            font-family: inherit;
            font-size: 1rem;
        }
        
        .form-group input.error,
        .form-group select.error,
        .form-group textarea.error {
            border-color: var(--accent);
        }
        
        .form-group textarea {
            resize: vertical;
        }
        
        .help-text {
            display: block;
            margin-top: 5px;
            font-size: 0.8rem;
            color: var(--gray);
        }
        
        .form-check {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-top: 1rem;
        }
        
        .form-check input {
            width: auto;
        }
        
        .delivery-options {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .delivery-option {
            display: flex;
            align-items: center;
            padding: 1rem;
            border: 2px solid var(--border);
            border-radius: var(--radius);
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .delivery-option:hover {
            border-color: var(--primary);
        }
        
        .delivery-option input:checked + .option-content {
            color: var(--primary);
        }
        
        .delivery-option input:checked {
            border-color: var(--primary);
        }
        
        .option-content {
            flex: 1;
            margin-left: 10px;
        }
        
        .option-content h4 {
            margin-bottom: 5px;
        }
        
        .option-content p {
            margin-bottom: 5px;
            font-size: 0.9rem;
            color: var(--gray);
        }
        
        .option-content .price {
            font-weight: 600;
            color: var(--primary);
        }
        
        .payment-options {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-bottom: 2rem;
        }
        
        .payment-option {
            display: flex;
            align-items: center;
            padding: 1rem;
            border: 2px solid var(--border);
            border-radius: var(--radius);
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .payment-option:hover {
            border-color: var(--primary);
        }
        
        .payment-option input:checked {
            border-color: var(--primary);
        }
        
        .payment-option .option-content {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 1.1rem;
        }
        
        .payment-option i {
            font-size: 1.5rem;
            color: var(--primary);
        }
        
        .card-details {
            margin-top: 2rem;
            padding-top: 2rem;
            border-top: 1px solid var(--border);
        }
        
        .order-summary {
            position: sticky;
            top: 20px;
            height: fit-content;
        }
        
        .order-items {
            margin-bottom: 2rem;
        }
        
        .order-item {
            display: flex;
            justify-content: space-between;
            padding: 1rem 0;
            border-bottom: 1px solid var(--border);
        }
        
        .order-item:last-child {
            border-bottom: none;
        }
        
        .item-info h4 {
            margin-bottom: 5px;
            font-size: 0.9rem;
        }
        
        .item-info span {
            font-size: 0.8rem;
            color: var(--gray);
        }
        
        .item-info small {
            color: #856404;
        }
        
        .item-price {
            font-weight: 600;
            color: var(--primary);
        }
        
        .terms {
            margin: 2rem 0;
            padding: 1.5rem;
            background-color: var(--light);
            border-radius: var(--radius);
        }
        
        .terms .form-check {
            margin-bottom: 1rem;
        }
        
        .terms .form-check:last-child {
            margin-bottom: 0;
        }
        
        .terms a {
            color: var(--primary);
            text-decoration: none;
        }
        
        .btn-block {
            width: 100%;
            padding: 15px;
            font-size: 1.1rem;
        }
        
        .security-guarantee {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-top: 1.5rem;
            padding: 1rem;
            background-color: var(--light);
            border-radius: var(--radius);
        }
        
        .security-guarantee i {
            font-size: 2rem;
            color: var(--secondary);
        }
        
        .confirmation-content {
            text-align: center;
            padding: 1rem;
        }
        
        .confirmation-icon {
            font-size: 4rem;
            color: var(--secondary);
            margin-bottom: 1.5rem;
        }
        
        .confirmation-content h4 {
            margin-bottom: 1rem;
            color: var(--primary);
        }
        
        .confirmation-content p {
            margin-bottom: 2rem;
            color: var(--gray);
        }
        
        .order-details {
            background-color: var(--light);
            padding: 1.5rem;
            border-radius: var(--radius);
            margin-bottom: 2rem;
            text-align: left;
        }
        
        .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.75rem;
            padding-bottom: 0.75rem;
            border-bottom: 1px solid var(--border);
        }
        
        .detail-row:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
        }
        
        .confirmation-actions {
            display: flex;
            gap: 1rem;
            margin-bottom: 2rem;
        }
        
        .confirmation-note {
            background-color: var(--light);
            padding: 1rem;
            border-radius: var(--radius);
            font-size: 0.9rem;
        }
        
        .confirmation-note p {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 0.5rem;
        }
        
        .confirmation-note i {
            color: var(--primary);
        }
        
        .empty-cart {
            text-align: center;
            padding: 3rem 1rem;
        }
        
        .empty-cart i {
            font-size: 3rem;
            color: var(--light-gray);
            margin-bottom: 1rem;
        }
        
        .empty-cart p {
            margin-bottom: 1.5rem;
            color: var(--gray);
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
        
        @media (max-width: 992px) {
            .checkout-layout {
                grid-template-columns: 1fr;
            }
            
            .form-grid {
                grid-template-columns: 1fr;
            }
            
            .payment-options {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize checkout
    init();
});