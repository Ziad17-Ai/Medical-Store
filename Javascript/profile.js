// Profile Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Menu navigation
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.profile-section-content');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (this.classList.contains('logout')) return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Update active menu item
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });
            
            // Load section content if needed
            loadSectionContent(targetId);
        });
    });
    
    // Form submission
    const settingsForm = document.querySelector('.settings-form');
    const passwordForm = document.querySelector('.password-form');
    
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                profession: document.getElementById('profession').value,
                license: document.getElementById('license').value,
                institution: document.getElementById('institution').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                zip: document.getElementById('zip').value
            };
            
            // Save to localStorage (in real app, send to server)
            localStorage.setItem('userProfile', JSON.stringify(formData));
            
            showNotification('Profile updated successfully!', 'success');
        });
    }
    
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Validation
            if (newPassword !== confirmPassword) {
                showNotification('New passwords do not match', 'error');
                return;
            }
            
            if (newPassword.length < 8) {
                showNotification('Password must be at least 8 characters long', 'error');
                return;
            }
            
            // In real app, verify current password with server
            showNotification('Password updated successfully!', 'success');
            passwordForm.reset();
        });
    }
    
    // Reorder button
    const reorderButtons = document.querySelectorAll('.btn-primary:contains("Reorder")');
    reorderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const orderRow = this.closest('.order-row');
            const orderItems = orderRow.querySelector('.order-items').textContent;
            
            showNotification(`Adding ${orderItems} to cart...`, 'info');
            
            // Simulate adding to cart
            setTimeout(() => {
                showNotification('Items added to cart successfully!', 'success');
            }, 1000);
        });
    });
    
    // Load section content
    function loadSectionContent(sectionId) {
        // This function would load content dynamically from server
        // For now, we'll just show placeholders
        
        const section = document.getElementById(sectionId);
        if (!section) return;
        
        // Only load if empty
        if (section.children.length > 2) return;
        
        switch(sectionId) {
            case 'orders':
                loadOrdersContent(section);
                break;
            case 'prescriptions':
                loadPrescriptionsContent(section);
                break;
            case 'wishlist':
                loadWishlistContent(section);
                break;
        }
    }
    
    function loadOrdersContent(section) {
        // Sample orders data
        const orders = [
            {
                id: 'MED20250012',
                date: 'Dec 18, 2025',
                items: ['Digital Blood Pressure Monitor', 'Infrared Thermometer'],
                status: 'delivered',
                total: 1749,
                tracking: 'TRK123456789'
            },
            {
                id: 'MED20250011',
                date: 'Dec 10, 2025',
                items: ['Surgical Gloves (Box of 100)', 'Face Masks (50 pcs)'],
                status: 'delivered',
                total: 850,
                tracking: 'TRK123456788'
            },
            {
                id: 'MED20250010',
                date: 'Dec 5, 2025',
                items: ['Medical Examination Light'],
                status: 'delivered',
                total: 3500,
                tracking: 'TRK123456787'
            }
        ];
        
        let ordersHTML = `
            <div class="orders-table">
                ${orders.map(order => `
                    <div class="order-row">
                        <div class="order-info">
                            <span class="order-id">#${order.id}</span>
                            <span class="order-date">${order.date}</span>
                        </div>
                        <div class="order-items">
                            ${order.items.join(', ')}
                        </div>
                        <div class="order-status">
                            <span class="status ${order.status}">
                                ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                        </div>
                        <div class="order-total">
                            EGP ${order.total.toLocaleString()}
                        </div>
                        <div class="order-actions">
                            <button class="btn btn-sm btn-outline view-order" data-id="${order.id}">View</button>
                            <button class="btn btn-sm btn-primary reorder-btn" data-id="${order.id}">Reorder</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        section.insertAdjacentHTML('beforeend', ordersHTML);
        
        // Add event listeners to new buttons
        document.querySelectorAll('.view-order').forEach(btn => {
            btn.addEventListener('click', function() {
                const orderId = this.dataset.id;
                showNotification(`Viewing order ${orderId}`, 'info');
            });
        });
        
        document.querySelectorAll('.reorder-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const orderId = this.dataset.id;
                showNotification(`Adding order ${orderId} to cart...`, 'info');
                
                setTimeout(() => {
                    showNotification('Items added to cart successfully!', 'success');
                }, 1000);
            });
        });
    }
    
    function loadPrescriptionsContent(section) {
        const prescriptions = [
            {
                id: 'RX-2025-001',
                doctor: 'Dr. Ahmed Mahmoud',
                date: 'Nov 15, 2025',
                items: ['Portable Oxygen Concentrator'],
                status: 'approved',
                expiry: 'May 15, 2026'
            },
            {
                id: 'RX-2025-002',
                doctor: 'Dr. Sara Hassan',
                date: 'Dec 10, 2025',
                items: ['CPAP Machine', 'Oxygen Masks'],
                status: 'pending',
                expiry: 'Jun 10, 2026'
            }
        ];
        
        let prescriptionsHTML = `
            <div class="prescriptions-grid">
                ${prescriptions.map(prescription => `
                    <div class="prescription-card">
                        <div class="prescription-header">
                            <div>
                                <h4>Prescription #${prescription.id}</h4>
                                <p>Issued by ${prescription.doctor}</p>
                            </div>
                            <span class="status ${prescription.status}">
                                ${prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                            </span>
                        </div>
                        <div class="prescription-body">
                            <p><strong>Prescribed Items:</strong> ${prescription.items.join(', ')}</p>
                            <div class="prescription-details">
                                <div class="detail">
                                    <span>Issue Date:</span>
                                    <span>${prescription.date}</span>
                                </div>
                                <div class="detail">
                                    <span>Expiry Date:</span>
                                    <span>${prescription.expiry}</span>
                                </div>
                            </div>
                        </div>
                        <div class="prescription-actions">
                            <button class="btn btn-sm btn-outline">View</button>
                            <button class="btn btn-sm btn-primary">Use for Order</button>
                        </div>
                    </div>
                `).join('')}
                
                <div class="upload-prescription-card">
                    <i class="fas fa-file-upload"></i>
                    <h4>Upload New Prescription</h4>
                    <p>Upload a doctor's prescription for medical equipment</p>
                    <button class="btn btn-primary upload-btn">
                        <i class="fas fa-upload"></i> Upload Prescription
                    </button>
                </div>
            </div>
        `;
        
        section.insertAdjacentHTML('beforeend', prescriptionsHTML);
        
        // Upload prescription button
        const uploadBtn = section.querySelector('.upload-btn');
        if (uploadBtn) {
            uploadBtn.addEventListener('click', function() {
                // In real app, this would open a file upload dialog
                showNotification('Please upload prescription during checkout for prescription-required items', 'info');
            });
        }
    }
    
    function loadWishlistContent(section) {
        const wishlistItems = [
            {
                id: 1,
                name: 'Portable Ultrasound Scanner',
                price: 125000,
                image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
                category: 'Diagnostic Equipment'
            },
            {
                id: 2,
                name: 'ECG Machine 12-Lead',
                price: 45000,
                image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w-300&q=80',
                category: 'Diagnostic Equipment'
            },
            {
                id: 3,
                name: 'Hospital Ventilator ICU',
                price: 250000,
                image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
                category: 'Respiratory Care'
            }
        ];
        
        let wishlistHTML = `
            <div class="wishlist-grid">
                ${wishlistItems.map(item => `
                    <div class="wishlist-item">
                        <div class="item-image">
                            <img src="${item.image}" alt="${item.name}">
                            <button class="remove-wishlist" data-id="${item.id}">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="item-info">
                            <span class="item-category">${item.category}</span>
                            <h4 class="item-title">${item.name}</h4>
                            <div class="item-price">EGP ${item.price.toLocaleString()}</div>
                        </div>
                        <div class="item-actions">
                            <button class="btn btn-sm btn-outline add-to-cart" data-id="${item.id}">
                                <i class="fas fa-cart-plus"></i> Add to Cart
                            </button>
                            <a href="product-detail.html?id=${item.id}" class="btn btn-sm btn-secondary">View Details</a>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        section.insertAdjacentHTML('beforeend', wishlistHTML);
        
        // Add event listeners
        document.querySelectorAll('.remove-wishlist').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = this.dataset.id;
                const itemCard = this.closest('.wishlist-item');
                
                itemCard.style.opacity = '0.5';
                setTimeout(() => {
                    itemCard.remove();
                    showNotification('Item removed from wishlist', 'info');
                }, 300);
            });
        });
        
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = parseInt(this.dataset.id);
                const item = wishlistItems.find(i => i.id === itemId);
                
                if (item) {
                    // Add to cart (using the function from app.js)
                    if (window.addToCart) {
                        window.addToCart(itemId, item.name, item.price, item.image, 1);
                    }
                    showNotification(`Added ${item.name} to cart!`, 'success');
                }
            });
        });
    }
    
    // Load user data from localStorage
    function loadUserData() {
        const userData = JSON.parse(localStorage.getItem('user')) || {
            firstName: 'Mohamed',
            lastName: 'Ahmed',
            email: 'mohamed@example.com',
            userType: 'doctor'
        };
        
        const profileData = JSON.parse(localStorage.getItem('userProfile')) || {};
        
        // Update form fields if they exist
        if (document.getElementById('firstName')) {
            document.getElementById('firstName').value = userData.firstName || profileData.firstName || '';
        }
        if (document.getElementById('lastName')) {
            document.getElementById('lastName').value = userData.lastName || profileData.lastName || '';
        }
        if (document.getElementById('email')) {
            document.getElementById('email').value = userData.email || profileData.email || '';
        }
        if (document.getElementById('phone')) {
            document.getElementById('phone').value = profileData.phone || '+20 123 456 7890';
        }
    }
    
    // Show notification
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
    
    // Initialize
    loadUserData();
    
    // Add profile-specific styles
    const style = document.createElement('style');
    style.textContent = `
        .prescriptions-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
        }
        
        .prescription-card {
            background-color: white;
            border-radius: var(--radius);
            box-shadow: var(--shadow);
            padding: 1.5rem;
        }
        
        .prescription-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 1rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid var(--border);
        }
        
        .prescription-header h4 {
            margin-bottom: 0.5rem;
            color: var(--primary);
        }
        
        .prescription-header p {
            color: var(--gray);
            font-size: 0.9rem;
        }
        
        .prescription-body {
            margin-bottom: 1.5rem;
        }
        
        .prescription-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-top: 1rem;
        }
        
        .detail {
            display: flex;
            flex-direction: column;
        }
        
        .detail span:first-child {
            font-size: 0.9rem;
            color: var(--gray);
        }
        
        .detail span:last-child {
            font-weight: 600;
            color: var(--dark);
        }
        
        .prescription-actions {
            display: flex;
            gap: 1rem;
        }
        
        .upload-prescription-card {
            background-color: var(--light);
            border: 2px dashed var(--border);
            border-radius: var(--radius);
            padding: 3rem 2rem;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        
        .upload-prescription-card i {
            font-size: 3rem;
            color: var(--primary);
            margin-bottom: 1rem;
        }
        
        .upload-prescription-card h4 {
            margin-bottom: 0.5rem;
            color: var(--primary);
        }
        
        .upload-prescription-card p {
            color: var(--gray);
            margin-bottom: 1.5rem;
        }
        
        .wishlist-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
        }
        
        .wishlist-item {
            background-color: white;
            border-radius: var(--radius);
            box-shadow: var(--shadow);
            overflow: hidden;
        }
        
        .item-image {
            position: relative;
            height: 200px;
            overflow: hidden;
        }
        
        .item-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .remove-wishlist {
            position: absolute;
            top: 10px;
            right: 10px;
            width: 30px;
            height: 30px;
            background-color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--accent);
        }
        
        .item-info {
            padding: 1.5rem;
        }
        
        .item-category {
            display: block;
            color: var(--primary);
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
        }
        
        .item-title {
            margin-bottom: 0.5rem;
            font-size: 1.1rem;
        }
        
        .item-price {
            font-size: 1.3rem;
            font-weight: 700;
            color: var(--primary);
        }
        
        .item-actions {
            padding: 1rem 1.5rem;
            border-top: 1px solid var(--border);
            display: flex;
            gap: 1rem;
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
});