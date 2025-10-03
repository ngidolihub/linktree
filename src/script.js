// NgidoliHub - Simple & Clean JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initNgidoliHub();
});

function initNgidoliHub() {
    // Add simple fade-in animation
    addSimpleFadeIn();
    
    // Handle link clicks
    handleSimpleLinks();
    
    // Add simple counter animation for stats
    animateStats();
    
    // Add subtle hover effects
    addHoverEffects();
}

function addSimpleFadeIn() {
    const elements = document.querySelectorAll('.profile-section, .link-item, .stats-section');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.5s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function handleSimpleLinks() {
    const linkItems = document.querySelectorAll('.link-item');
    
    linkItems.forEach(item => {
        item.addEventListener('click', function() {
            const link = this.getAttribute('data-link');
            
            // Simple click feedback
            this.style.transform = 'scale(0.98)';
            this.style.opacity = '0.8';
            
            setTimeout(() => {
                this.style.transform = '';
                this.style.opacity = '';
            }, 150);
            
            // Add loading state
            this.classList.add('loading');
            
            // Track analytics (optional)
            trackLinkClick(this.querySelector('h3').textContent);
            
            // Open link
            setTimeout(() => {
                window.open(link, '_blank');
                this.classList.remove('loading');
            }, 200);
        });
    });
}

function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/[^\d]/g, ''));
        const suffix = stat.textContent.replace(/[\d]/g, '');
        
        animateNumber(stat, 0, target, 1500, suffix);
    });
}

function animateNumber(element, start, end, duration, suffix) {
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);
        
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

function addHoverEffects() {
    const linkItems = document.querySelectorAll('.link-item');
    
    linkItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Subtle glow effect
            this.style.boxShadow = '0 6px 25px rgba(233, 30, 99, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 2px 12px rgba(233, 30, 99, 0.08)';
        });
    });
}

// Simple analytics tracking
function trackLinkClick(platform) {
    console.log(`NgidoliHub: User clicked on ${platform}`);
    
    // You can add Google Analytics or other tracking here
    if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
            event_category: 'Social Links',
            event_label: platform,
            value: 1
        });
    }
}

// Add simple loading screen
function addSimpleLoader() {
    const loader = document.createElement('div');
    loader.id = 'simple-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="ngidoli-logo">❤️</div>
            <p>NgidoliHub Loading...</p>
        </div>
    `;
    
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #e91e63;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    const loaderStyle = document.createElement('style');
    loaderStyle.textContent = `
        .ngidoli-logo {
            font-size: 3rem;
            margin-bottom: 20px;
            animation: heartbeat 1.5s ease-in-out infinite;
        }
        
        @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        
        .loader-content {
            text-align: center;
            color: white;
        }
        
        .loader-content p {
            font-family: 'Inter', sans-serif;
            font-size: 1.1rem;
            font-weight: 500;
        }
    `;
    
    document.head.appendChild(loaderStyle);
    document.body.appendChild(loader);
    
    // Remove loader after content loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 800);
    });
}

// Keyboard navigation
function addKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        const linkItems = document.querySelectorAll('.link-item');
        
        if (e.key === 'Enter' && e.target.classList.contains('link-item')) {
            e.target.click();
        }
        
        // Arrow key navigation
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            
            const current = document.activeElement;
            const links = Array.from(linkItems);
            const currentIndex = links.indexOf(current);
            
            let nextIndex;
            if (e.key === 'ArrowDown') {
                nextIndex = currentIndex < links.length - 1 ? currentIndex + 1 : 0;
            } else {
                nextIndex = currentIndex > 0 ? currentIndex - 1 : links.length - 1;
            }
            
            links[nextIndex].focus();
        }
    });
}

// Initialize additional features
addSimpleLoader();
addKeyboardNavigation();

// Add touch support for mobile
function addTouchSupport() {
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > swipeThreshold) {
            // Add subtle feedback for swipe gestures
            document.body.style.transform = diff > 0 ? 'translateY(-2px)' : 'translateY(2px)';
            
            setTimeout(() => {
                document.body.style.transform = '';
            }, 150);
        }
    }
}

addTouchSupport();

// Simple theme toggle (optional)
function addThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '🌙';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: rgba(255, 255, 255, 0.9);
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
    `;
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            themeToggle.innerHTML = '☀️';
            themeToggle.style.background = 'rgba(51, 51, 51, 0.9)';
            themeToggle.style.color = 'white';
        } else {
            themeToggle.innerHTML = '🌙';
            themeToggle.style.background = 'rgba(255, 255, 255, 0.9)';
            themeToggle.style.color = 'black';
        }
    });
    
    document.body.appendChild(themeToggle);
}

// Optional theme toggle
// addThemeToggle();

// Performance monitoring
function monitorPerformance() {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`NgidoliHub loaded in ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
        }, 0);
    });
}

monitorPerformance();

// Easter egg - JKT48 themed
function addEasterEgg() {
    let clickCount = 0;
    const profileImage = document.querySelector('.profile-image img');
    
    if (profileImage) {
        profileImage.addEventListener('click', function() {
            clickCount++;
            
            if (clickCount === 5) {
                // JKT48 Easter egg animation
                this.style.animation = 'spin 1s ease-in-out 3';
                setTimeout(() => {
                    alert('🎉 Kokoro no Placard! Terima kasih telah menjadi bagian dari NgidoliHub! 🎉');
                    clickCount = 0;
                }, 3500);
            }
        });
    }
}

addEasterEgg();