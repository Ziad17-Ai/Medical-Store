// Authentication JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    // User type selection for registration
    const userTypeSelect = document.getElementById('userType');
    const medicalLicenseGroup = document.getElementById('medicalLicenseGroup');
    
    if (userTypeSelect && medicalLicenseGroup) {
        userTypeSelect.addEventListener('change', function() {
            const isMedicalProfessional = this.value === 'doctor' || this.value === 'hospital';
            medicalLicenseGroup.style.display = isMedicalProfessional ? 'block' : 'none';
            
            if (isMedicalProfessional) {
                document.getElementById('medicalLicense').required = true;
            } else {
                document.getElementById('medicalLicense').required = false;
            }
        });
    }
    
    // Password strength checker
    const passwordInput = document.getElementById('password');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    if (passwordInput && strengthBar && strengthText) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            
            // Length check
            if (password.length >= 8) strength++;
            
            // Lowercase check
            if (/[a-z]/.test(password)) strength++;
            
            // Uppercase check
            if (/[A-Z]/.test(password)) strength++;
            
            // Number check
            if (/[0-9]/.test(password)) strength++;
            
            // Special character check
            if (/[^A-Za-z0-9]/.test(password)) strength++;
            
            // Update strength bar
            const width = (strength / 5) * 100;
            strengthBar.style.width = `${width}%`;
            
            // Update colors and text
            let color, text;
            if (strength <= 2) {
                color = '#dc3545';
                text = 'Weak';
            } else if (strength <= 3) {
                color = '#ffc107';
                text = 'Medium';
            } else {
                color = '#28a745';
                text = 'Strong';
            }
            
            strengthBar.style.backgroundColor = color;
            strengthText.textContent = `Password strength: ${text}`;
            strengthText.style.color = color;
        });
    }
    
    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simple validation
            if (!email || !password) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Simulate API call
            simulateLogin(email, password);
        });
    }
    
    // Registration form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const userType = document.getElementById('userType').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const terms = document.getElementById('terms').checked;
            
            // Validation
            if (!firstName || !lastName || !email || !phone || !userType || !password || !confirmPassword) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            if (!terms) {
                showNotification('Please accept the terms and conditions', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showNotification('Passwords do not match', 'error');
                return;
            }
            
            if (password.length < 8) {
                showNotification('Password must be at least 8 characters long', 'error');
                return;
            }
            
            // Simulate registration
            simulateRegistration({
                firstName,
                lastName,
                email,
                phone,
                userType,
                password
            });
        });
    }
    
    // Simulate login
    function simulateLogin(email, password) {
        // Show loading state
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
        submitBtn.disabled = true;
        
        // Simulate API delay
        setTimeout(() => {
            // In a real app, this would be an API call
            
            // For demo purposes, check if it's the demo account
            if (email === 'demo@medicalstore.com' && password === 'demo123') {
                // Save user session
                const user = {
                    firstName: 'Mohamed',
                    lastName: 'Ahmed',
                    email: email,
                    userType: 'doctor',
                    isVerified: true
                };
                
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('isLoggedIn', 'true');
                
                showNotification('Login successful!', 'success');
                
                // Redirect to home page after delay
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                // For any other credentials, show demo message
                showNotification('Use demo@medicalstore.com / demo123 for demo login', 'info');
                
                // Still log them in for demo purposes
                const user = {
                    firstName: 'Demo',
                    lastName: 'User',
                    email: email,
                    userType: 'individual',
                    isVerified: true
                };
                
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('isLoggedIn', 'true');
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            }
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }
    
    // Simulate registration
    function simulateRegistration(userData) {
        // Show loading state
        const submitBtn = registerForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
        submitBtn.disabled = true;
        
        // Simulate API delay
        setTimeout(() => {
            // Save user to localStorage
            const user = {
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                phone: userData.phone,
                userType: userData.userType,
                isVerified: userData.userType === 'individual', // Medical professionals need verification
                createdAt: new Date().toISOString()
            };
            
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('isLoggedIn', 'true');
            
            // Show success modal
            const modal = document.getElementById('registrationSuccess');
            const modalOverlay = document.querySelector('.modal-overlay');
            
            if (modal && modalOverlay) {
                modal.classList.add('active');
                modalOverlay.classList.add('active');
                
                // Close modal when clicking overlay
                modalOverlay.addEventListener('click', () => {
                    modal.classList.remove('active');
                    modalOverlay.classList.remove('active');
                    window.location.href = 'index.html';
                });
            } else {
                // If no modal, redirect directly
                showNotification('Account created successfully!', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            }
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
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
    
    // Add auth-specific styles
    const style = document.createElement('style');
    style.textContent = `
        .auth-section {
            padding: 4rem 0;
            min-height: calc(100vh - 200px);
            display: flex;
            align-items: center;
        }
        
        .auth-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: start;
        }
        
        .auth-card {
            background-color: white;
            padding: 2.5rem;
            border-radius: var(--radius);
            box-shadow: var(--shadow);
        }
        
        .auth-header {
            text-align: center;
            margin-bottom: 2rem;
        }
        
        .auth-header h1 {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin-bottom: 0.5rem;
            color: var(--primary);
        }
        
        .auth-header p {
            color: var(--gray);
        }
        
        .auth-form {
            margin-top: 2rem;
        }
        
        .input-with-icon {
            position: relative;
        }
        
        .input-with-icon i {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--gray);
        }
        
        .input-with-icon input {
            padding-left: 45px;
            padding-right: 45px;
        }
        
        .toggle-password {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: var(--gray);
            cursor: pointer;
        }
        
        .form-options {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 1rem 0;
        }
        
        .forgot-password {
            color: var(--primary);
            text-decoration: none;
            font-size: 0.9rem;
        }
        
        .auth-divider {
            display: flex;
            align-items: center;
            margin: 2rem 0;
            color: var(--gray);
        }
        
        .auth-divider::before,
        .auth-divider::after {
            content: '';
            flex: 1;
            height: 1px;
            background-color: var(--border);
        }
        
        .auth-divider span {
            padding: 0 1rem;
            font-size: 0.9rem;
        }
        
        .social-login {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-bottom: 2rem;
        }
        
        .btn-social {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }
        
        .auth-footer {
            text-align: center;
            margin-top: 2rem;
            padding-top: 2rem;
            border-top: 1px solid var(--border);
        }
        
        .auth-footer a {
            color: var(--primary);
            text-decoration: none;
            font-weight: 600;
        }
        
        .auth-info {
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }
        
        .info-card {
            background-color: white;
            padding: 2rem;
            border-radius: var(--radius);
            box-shadow: var(--shadow);
            text-align: center;
        }
        
        .info-card i {
            font-size: 2.5rem;
            color: var(--primary);
            margin-bottom: 1rem;
        }
        
        .info-card h3 {
            margin-bottom: 1rem;
        }
        
        .info-card p {
            margin-bottom: 1.5rem;
            color: var(--gray);
        }
        
        .phone-link {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            color: var(--primary);
            text-decoration: none;
            font-weight: 600;
        }
        
        .auth-benefits {
            background-color: white;
            padding: 2.5rem;
            border-radius: var(--radius);
            box-shadow: var(--shadow);
        }
        
        .auth-benefits h2 {
            text-align: center;
            margin-bottom: 2rem;
            color: var(--primary);
        }
        
        .benefits-list {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }
        
        .benefit-item {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
        }
        
        .benefit-item i {
            font-size: 1.5rem;
            color: var(--primary);
            margin-top: 5px;
        }
        
        .benefit-item h3 {
            margin-bottom: 0.5rem;
            font-size: 1.1rem;
        }
        
        .benefit-item p {
            color: var(--gray);
            font-size: 0.9rem;
        }
        
        .password-strength {
            margin-top: 0.5rem;
        }
        
        .strength-bar {
            height: 5px;
            background-color: var(--light-gray);
            border-radius: 3px;
            margin-bottom: 5px;
            transition: all 0.3s ease;
        }
        
        .strength-text {
            font-size: 0.8rem;
            color: var(--gray);
        }
        
        .success-content {
            text-align: center;
            padding: 2rem;
        }
        
        .success-icon {
            font-size: 4rem;
            color: var(--secondary);
            margin-bottom: 1.5rem;
        }
        
        .success-content h3 {
            margin-bottom: 1rem;
            color: var(--primary);
        }
        
        .success-content p {
            margin-bottom: 2rem;
            color: var(--gray);
        }
        
        .success-details {
            background-color: var(--light);
            padding: 1.5rem;
            border-radius: var(--radius);
            margin-bottom: 2rem;
            text-align: left;
        }
        
        .success-details p {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 1rem;
            font-size: 0.9rem;
        }
        
        .success-details i {
            color: var(--primary);
        }
        
        .success-actions {
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
        
        @media (max-width: 992px) {
            .auth-container {
                grid-template-columns: 1fr;
            }
            
            .social-login {
                grid-template-columns: 1fr;
            }
            
            .success-actions {
                flex-direction: column;
            }
        }
    `;
    document.head.appendChild(style);
});