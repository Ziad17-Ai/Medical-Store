// Admin Panel JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Admin menu navigation
    const menuItems = document.querySelectorAll('.admin-menu .menu-item');
    const sections = document.querySelectorAll('.admin-section');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
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
                    loadSectionContent(targetId);
                }
            });
        });
    });
    
    // Add Product Modal
    const addProductBtn = document.getElementById('addProductBtn');
    const addProductModal = document.getElementById('addProductModal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const closeModalBtns = document.querySelectorAll('.close-modal, .cancel-btn');
    
    if (addProductBtn && addProductModal) {
        addProductBtn.addEventListener('click', () => {
            addProductModal.classList.add('active');
            modalOverlay.classList.add('active');
        });
        
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                addProductModal.classList.remove('active');
                modalOverlay.classList.remove('active');
            });
        });
        
        modalOverlay.addEventListener('click', () => {
            addProductModal.classList.remove('active');
            modalOverlay.classList.remove('active');
        });
        
        // Product form submission
        const productForm = document.querySelector('.product-form');
        if (productForm) {
            productForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const productData = {
                    name: document.getElementById('productName').value,
                    category: document.getElementById('productCategory').value,
                    price: parseFloat(document.getElementById('productPrice').value),
                    stock: parseInt(document.getElementById('productStock').value),
                    sku: document.getElementById('productSKU').value,
                    brand: document.getElementById('productBrand').value,
                    description: document.getElementById('productDescription').value,
                    specs: document.getElementById('productSpecs').value,
                    requiresPrescription: document.getElementById('requiresPrescription').checked,
                    isFeatured: document.getElementById('isFeatured').checked
                };
                
                // Validation
                if (!productData.name || !productData.category || !productData.price || !productData.stock || !productData.sku) {
                    showNotification('Please fill all required fields', 'error');
                    return;
                }
                
                // In real app, send to server
                showNotification('Product added successfully!', 'success');
                
                // Close modal
                addProductModal.classList.remove('active');
                modalOverlay.classList.remove('active');
                
                // Reset form
                productForm.reset();
                
                // Reload products if on products page
                if (document.querySelector('#products.active')) {
                    loadProductsContent();
                }
            });
        }
        
        // Image upload
        const uploadArea = document.querySelector('.upload-area');
        const fileInput = uploadArea.querySelector('input');
        
        uploadArea.addEventListener('click', () => fileInput.click());
        
        fileInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                const fileCount = this.files.length;
                uploadArea.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>${fileCount} image${fileCount > 1 ? 's' : ''} selected</p>
                    <button class="btn btn-sm btn-outline change-images">Change Images</button>
                `;
                
                document.querySelector('.change-images').addEventListener('click', (e) => {
                    e.stopPropagation();
                    fileInput.click();
                });
            }
        });
    }
    
    // Load section content
    function loadSectionContent(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section || section.children.length > 2) return;
        
        switch(sectionId) {
            case 'products':
                loadProductsContent();
                break;
            case 'orders':
                loadOrdersContent();
                break;
            case 'customers':
                loadCustomersContent();
                break;
            case 'prescriptions':
                loadPrescriptionsContent();
                break;
        }
    }
    
    function loadProductsContent() {
        const section = document.getElementById('products');
        if (!section) return;
        
        // Clear existing content except header
        const header = section.querySelector('.section-header');
        section.innerHTML = '';
        section.appendChild(header);
        
        // Products toolbar
        const toolbar = document.createElement('div');
        toolbar.className = 'products-toolbar';
        toolbar.innerHTML = `
            <div class="toolbar-actions">
                <div class="search-box">
                    <input type="text" placeholder="Search products...">
                    <button><i class="fas fa-search"></i></button>
                </div>
                <select class="filter-select">
                    <option>All Categories</option>
                    <option>Diagnostic Equipment</option>
                    <option>Surgical Instruments</option>
                    <option>Patient Monitoring</option>
                </select>
                <select class="sort-select">
                    <option>Sort by</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Stock: Low to High</option>
                </select>
            </div>
            <div class="toolbar-stats">
                <span>Total: 324 products</span>
                <span>Low stock: 2 products</span>
            </div>
        `;
        section.appendChild(toolbar);
        
        // Products table
        const productsTable = document.createElement('div');
        productsTable.className = 'table-responsive';
        productsTable.innerHTML = `
            <table class="admin-table">
                <thead>
                    <tr>
                        <th><input type="checkbox" id="selectAll"></th>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>
                            <div class="product-cell">
                                <img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80" alt="BP Monitor">
                                <div>
                                    <strong>Digital Blood Pressure Monitor</strong>
                                    <span>SKU: BP-2023-01</span>
                                </div>
                            </div>
                        </td>
                        <td>Monitoring Devices</td>
                        <td>EGP 1,299</td>
                        <td>
                            <span class="stock-level high">25</span>
                        </td>
                        <td><span class="status active">Active</span></td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn-icon" title="Edit"><i class="fas fa-edit"></i></button>
                                <button class="btn-icon" title="View"><i class="fas fa-eye"></i></button>
                                <button class="btn-icon" title="Delete"><i class="fas fa-trash"></i></button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>
                            <div class="product-cell">
                                <img src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80" alt="Oxygen Concentrator">
                                <div>
                                    <strong>Portable Oxygen Concentrator</strong>
                                    <span>SKU: OX-2023-12</span>
                                </div>
                            </div>
                        </td>
                        <td>Respiratory Care</td>
                        <td>EGP 18,500</td>
                        <td>
                            <span class="stock-level low">3</span>
                        </td>
                        <td><span class="status active">Active</span></td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn-icon" title="Edit"><i class="fas fa-edit"></i></button>
                                <button class="btn-icon" title="View"><i class="fas fa-eye"></i></button>
                                <button class="btn-icon" title="Delete"><i class="fas fa-trash"></i></button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>
                            <div class="product-cell">
                                <img src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80" alt="Thermometer">
                                <div>
                                    <strong>Infrared Digital Thermometer</strong>
                                    <span>SKU: TH-2023-05</span>
                                </div>
                            </div>
                        </td>
                        <td>Diagnostic Tools</td>
                        <td>EGP 450</td>
                        <td>
                            <span class="stock-level high">150</span>
                        </td>
                        <td><span class="status active">Active</span></td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn-icon" title="Edit"><i class="fas fa-edit"></i></button>
                                <button class="btn-icon" title="View"><i class="fas fa-eye"></i></button>
                                <button class="btn-icon" title="Delete"><i class="fas fa-trash"></i></button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        `;
        section.appendChild(productsTable);
        
        // Pagination
        const pagination = document.createElement('div');
        pagination.className = 'pagination';
        pagination.innerHTML = `
            <button class="page-btn" disabled><i class="fas fa-chevron-left"></i></button>
            <button class="page-number active">1</button>
            <button class="page-number">2</button>
            <button class="page-number">3</button>
            <span>...</span>
            <button class="page-number">10</button>
            <button class="page-btn"><i class="fas fa-chevron-right"></i></button>
        `;
        section.appendChild(pagination);
        
        // Add event listeners
        setupProductsTable();
    }
    
    function setupProductsTable() {
        // Select all checkbox
        const selectAll = document.getElementById('selectAll');
        const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
        
        if (selectAll) {
            selectAll.addEventListener('change', function() {
                checkboxes.forEach(checkbox => {
                    checkbox.checked = this.checked;
                });
            });
        }
        
        // Action buttons
        document.querySelectorAll('.btn-icon[title="Edit"]').forEach(btn => {
            btn.addEventListener('click', function() {
                showNotification('Edit product feature would open here', 'info');
            });
        });
        
        document.querySelectorAll('.btn-icon[title="Delete"]').forEach(btn => {
            btn.addEventListener('click', function() {
                const row = this.closest('tr');
                if (confirm('Are you sure you want to delete this product?')) {
                    row.style.opacity = '0.5';
                    setTimeout(() => {
                        row.remove();
                        showNotification('Product deleted successfully', 'success');
                    }, 300);
                }
            });
        });
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
    
    // Add admin-specific styles
    const style = document.createElement('style');
    style.textContent = `
        .products-toolbar {
            background-color: white;
            padding: 1.5rem;
            border-radius: var(--radius);
            box-shadow: var(--shadow);
            margin-bottom: 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
        }
        
        .toolbar-actions {
            display: flex;
            gap: 1rem;
            align-items: center;
            flex-wrap: wrap;
        }
        
        .search-box {
            display: flex;
            align-items: center;
            background-color: var(--light);
            border-radius: var(--radius);
            overflow: hidden;
        }
        
        .search-box input {
            padding: 10px 15px;
            border: none;
            background: none;
            width: 300px;
        }
        
        .search-box button {
            padding: 10px 15px;
            background: none;
            border: none;
            color: var(--gray);
            cursor: pointer;
        }
        
        .filter-select, .sort-select {
            padding: 10px 15px;
            border: 1px solid var(--border);
            border-radius: var(--radius);
            background: none;
            color: var(--dark);
        }
        
        .toolbar-stats {
            display: flex;
            gap: 2rem;
            color: var(--gray);
            font-size: 0.9rem;
        }
        
        .product-cell {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .product-cell img {
            width: 50px;
            height: 50px;
            border-radius: var(--radius);
            object-fit: cover;
        }
        
        .product-cell strong {
            display: block;
            margin-bottom: 5px;
        }
        
        .product-cell span {
            font-size: 0.8rem;
            color: var(--gray);
        }
        
        .stock-level {
            padding: 3px 10px;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 600;
        }
        
        .stock-level.high {
            background-color: #d4edda;
            color: #155724;
        }
        
        .stock-level.low {
            background-color: #f8d7da;
            color: #721c24;
        }
        
        .status.active {
            background-color: #d4edda;
            color: #155724;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.8rem;
        }
        
        .action-buttons {
            display: flex;
            gap: 5px;
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
        
        @media (max-width: 768px) {
            .products-toolbar {
                flex-direction: column;
                align-items: stretch;
            }
            
            .toolbar-actions {
                flex-direction: column;
                align-items: stretch;
            }
            
            .search-box input {
                width: 100%;
            }
            
            .product-cell {
                flex-direction: column;
                align-items: flex-start;
                text-align: left;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize dashboard
    loadSectionContent('dashboard');
});
