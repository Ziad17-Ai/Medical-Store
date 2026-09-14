// Help Center JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('h4');
        
        question.addEventListener('click', function() {
            // Toggle active class
            item.classList.toggle('active');
            
            // Toggle icon
            const icon = this.querySelector('i');
            if (icon) {
                if (item.classList.contains('active')) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                } else {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
            }
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.help-search input');
    const searchButton = document.querySelector('.help-search button');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        function performSearch() {
            const searchTerm = searchInput.value.trim().toLowerCase();
            
            if (!searchTerm) {
                // Show all FAQ items
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.style.display = 'block';
                });
                return;
            }
            
            // Search in FAQ items
            let foundResults = false;
            document.querySelectorAll('.faq-item').forEach(item => {
                const question = item.querySelector('h4').textContent.toLowerCase();
                const answer = item.querySelector('p').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                    foundResults = true;
                    
                    // Highlight search term
                    highlightText(item, searchTerm);
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Show no results message
            if (!foundResults) {
                showNotification('No results found for "' + searchTerm + '"', 'info');
            }
        }
        
        function highlightText(element, searchTerm) {
            const question = element.querySelector('h4');
            const answer = element.querySelector('p');
            
            [question, answer].forEach(el => {
                const text = el.textContent;
                const regex = new RegExp(`(${searchTerm})`, 'gi');
                const highlighted = text.replace(regex, '<mark>$1</mark>');
                el.innerHTML = highlighted;
            });
        }
    }
    
    // Smooth scroll to sections
    const categoryLinks = document.querySelectorAll('.category-card');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Live chat button
    const liveChatBtn = document.querySelector('.contact-option .btn');
    if (liveChatBtn) {
        liveChatBtn.addEventListener('click', function() {
            showNotification('Live chat is currently offline. Please call or email for immediate assistance.', 'info');
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
    
    // Add help-specific styles
    const style = document.createElement('style');
    style.textContent = `
        .help-hero {
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
            color: white;
            padding: 4rem 0;
            text-align: center;
        }
        
        .help-hero h1 {
            color: white;
            margin-bottom: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
        }
        
        .help-search {
            max-width: 600px;
            margin: 0 auto;
        }
        
        .help-search input {
            flex: 1;
            padding: 15px 20px;
            font-size: 1.1rem;
            border: none;
            border-radius: var(--radius) 0 0 var(--radius);
        }
        
        .help-search button {
            padding: 15px 30px;
            background-color: var(--secondary);
            color: white;
            border: none;
            border-radius: 0 var(--radius) var(--radius) 0;
            font-size: 1.1rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .help-categories {
            padding: 4rem 0;
            background-color: var(--light);
        }
        
        .categories-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }
        
        .categories-grid .category-card {
            background-color: white;
            padding: 2rem;
            border-radius: var(--radius);
            box-shadow: var(--shadow);
            text-decoration: none;
            color: inherit;
            text-align: center;
            transition: transform 0.3s ease;
        }
        
        .categories-grid .category-card:hover {
            transform: translateY(-5px);
        }
        
        .categories-grid .category-card i {
            font-size: 2.5rem;
            color: var(--primary);
            margin-bottom: 1rem;
        }
        
        .categories-grid .category-card h3 {
            margin-bottom: 1rem;
            color: var(--primary);
        }
        
        .faq-sections {
            padding: 4rem 0;
        }
        
        .faq-section {
            margin-bottom: 4rem;
        }
        
        .faq-section h2 {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 2rem;
            color: var(--primary);
            padding-bottom: 1rem;
            border-bottom: 2px solid var(--border);
        }
        
        .faq-items {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }
        
        .faq-item {
            background-color: white;
            padding: 1.5rem;
            border-radius: var(--radius);
            box-shadow: var(--shadow);
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .faq-item:hover {
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
        }
        
        .faq-item h4 {
            margin-bottom: 1rem;
            color: var(--dark);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .faq-item h4 i {
            color: var(--primary);
            font-size: 0.9rem;
        }
        
        .faq-item p {
            margin: 0;
            line-height: 1.6;
            color: var(--gray);
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }
        
        .faq-item.active p {
            max-height: 500px;
            margin-top: 1rem;
        }
        
        mark {
            background-color: #fff3cd;
            color: var(--dark);
            padding: 2px 5px;
            border-radius: 3px;
        }
        
        .contact-support {
            background-color: var(--light);
            padding: 4rem;
            border-radius: var(--radius);
            text-align: center;
            margin-top: 4rem;
        }
        
        .contact-support h2 {
            margin-bottom: 1rem;
            color: var(--primary);
        }
        
        .contact-support p {
            margin-bottom: 3rem;
            color: var(--gray);
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .contact-options {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
        }
        
        .contact-option {
            background-color: white;
            padding: 2rem;
            border-radius: var(--radius);
            box-shadow: var(--shadow);
            text-align: center;
        }
        
        .contact-option i {
            font-size: 2.5rem;
            color: var(--primary);
            margin-bottom: 1rem;
        }
        
        .contact-option h4 {
            margin-bottom: 0.5rem;
            color: var(--dark);
        }
        
        .contact-option p {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: var(--primary);
        }
        
        .contact-option span {
            display: block;
            color: var(--gray);
            font-size: 0.9rem;
            margin-bottom: 1rem;
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
            .help-search {
                flex-direction: column;
            }
            
            .help-search input,
            .help-search button {
                width: 100%;
                border-radius: var(--radius);
                margin-bottom: 10px;
            }
            
            .contact-support {
                padding: 2rem;
            }
        }
    `;
    document.head.appendChild(style);
});