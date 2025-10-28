// Menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !phone || !message) {
                alert('Por favor, preencha todos os campos.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um email válido.');
                return;
            }
            
            // Simulate form submission
            const sendButton = this.querySelector('.send-button');
            const originalText = sendButton.textContent;
            
            sendButton.textContent = 'ENVIANDO...';
            sendButton.disabled = true;
            
            setTimeout(() => {
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                this.reset();
                sendButton.textContent = originalText;
                sendButton.disabled = false;
            }, 2000);
        });
    }
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.practice-item, .achievement-item, .about-column');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Removed parallax effect to prevent text interference
    
    // Counter animation for achievements
    function animateCounters() {
        const counters = document.querySelectorAll('.achievement-number');
        
        counters.forEach(counter => {
            const target = counter.textContent;
            const isPercentage = target.includes('%');
            const isPlus = target.includes('+');
            const isMlns = target.includes('mlns');
            
            let numericValue;
            if (isMlns) {
                numericValue = parseFloat(target.replace('mlns', '').trim());
            } else {
                numericValue = parseFloat(target.replace(/[^\d.]/g, ''));
            }
            
            let current = 0;
            const increment = numericValue / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    current = numericValue;
                    clearInterval(timer);
                }
                
                let displayValue = Math.floor(current);
                if (isPercentage) {
                    displayValue += '%';
                } else if (isPlus) {
                    displayValue += '+';
                } else if (isMlns) {
                    displayValue += ' mlns';
                }
                
                counter.textContent = displayValue;
            }, 20);
        });
    }
    
    // Trigger counter animation when achievements section is visible
    const achievementsSection = document.querySelector('.achievements');
    if (achievementsSection) {
        const achievementsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    achievementsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        achievementsObserver.observe(achievementsSection);
    }
    
    // Mobile menu functionality
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            // This would typically toggle a mobile menu
            // For now, we'll just add a visual feedback
            this.style.color = '#d4af37';
            setTimeout(() => {
                this.style.color = '#ffffff';
            }, 200);
        });
    }
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });
    
    // Set initial body opacity for fade-in effect
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    // Handle image loading errors
    const lawyerPhoto = document.querySelector('.lawyer-photo');
    const imagePlaceholder = document.querySelector('.image-placeholder');
    
    if (lawyerPhoto) {
        lawyerPhoto.addEventListener('error', function() {
            console.log('Erro ao carregar imagem, mostrando placeholder');
            this.style.display = 'none';
            if (imagePlaceholder) {
                imagePlaceholder.style.display = 'flex';
            }
        });
        
        lawyerPhoto.addEventListener('load', function() {
            console.log('Imagem carregada com sucesso');
            if (imagePlaceholder) {
                imagePlaceholder.style.display = 'none';
            }
        });
        
        // Timeout para mostrar placeholder se a imagem demorar muito para carregar
        setTimeout(() => {
            if (lawyerPhoto.complete && lawyerPhoto.naturalHeight === 0) {
                console.log('Timeout: imagem não carregou, mostrando placeholder');
                lawyerPhoto.style.display = 'none';
                if (imagePlaceholder) {
                    imagePlaceholder.style.display = 'flex';
                }
            }
        }, 5000);
    }
});

// Utility function for smooth scrolling
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Practice items hover effect
    const practiceItems = document.querySelectorAll('.practice-item');
    practiceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Social icons hover effect
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Add transition to all hover effects
    const style = document.createElement('style');
    style.textContent = `
        .practice-item,
        .social-icon {
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});
