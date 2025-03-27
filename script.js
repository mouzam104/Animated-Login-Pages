// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            // Create mobile menu if it doesn't exist
            if (!document.querySelector('.mobile-menu')) {
                const mobileMenu = document.createElement('div');
                mobileMenu.className = 'mobile-menu';
                
                // Clone the navigation links
                const navLinksClone = navLinks.cloneNode(true);
                
                // Clone the contact button
                const contactBtnClone = document.querySelector('.contact-btn').cloneNode(true);
                
                // Create close button
                const closeBtn = document.createElement('div');
                closeBtn.className = 'close-btn';
                closeBtn.innerHTML = '<i class="fas fa-times"></i>';
                
                // Append elements to mobile menu
                mobileMenu.appendChild(closeBtn);
                mobileMenu.appendChild(navLinksClone);
                mobileMenu.appendChild(contactBtnClone);
                
                // Append mobile menu to body
                document.body.appendChild(mobileMenu);
                
                // Add event listener to close button
                closeBtn.addEventListener('click', function() {
                    mobileMenu.classList.remove('active');
                    setTimeout(() => {
                        mobileMenu.remove();
                    }, 300);
                });
                
                // Add event listeners to mobile menu links
                const mobileMenuLinks = mobileMenu.querySelectorAll('a');
                mobileMenuLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        mobileMenu.classList.remove('active');
                        setTimeout(() => {
                            mobileMenu.remove();
                        }, 300);
                    });
                });
                
                // Show mobile menu with animation
                setTimeout(() => {
                    mobileMenu.classList.add('active');
                }, 10);
            } else {
                // Toggle mobile menu if it already exists
                const mobileMenu = document.querySelector('.mobile-menu');
                mobileMenu.classList.toggle('active');
            }
        });
    }
    
    // Smooth scrolling for navigation links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default anchor click behavior
            e.preventDefault();
            
            // Get the target element
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Scroll to the target element
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Play button for video
    const playBtn = document.querySelector('.play-btn');
    
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            // In a real implementation, this would play a video
            // For this example, we'll just show an alert
            alert('Video would play here in a real implementation!');
            
            // Alternatively, you could replace the image with an iframe for YouTube or other video platforms
            // const videoContainer = document.querySelector('.video-container');
            // const videoId = 'your-youtube-video-id';
            // videoContainer.innerHTML = `<iframe width="100%" height="450" src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        });
    }
    
    // Animation for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Simple animation on hover
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // 3D tilt effect for hero image
    const heroImage = document.querySelector('.image-wrapper');
    
    if (heroImage) {
        heroImage.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = (x / rect.width - 0.5) * 2; // -1 to 1
            const yPercent = (y / rect.height - 0.5) * 2; // -1 to 1
            
            // Apply the rotation based on mouse position
            this.style.transform = `perspective(1000px) rotateY(${xPercent * 5}deg) rotateX(${-yPercent * 5}deg)`;
            
            // Move the shapes for parallax effect
            const shapes = document.querySelectorAll('.shape');
            shapes.forEach((shape, index) => {
                const factor = (index + 1) * 0.1;
                shape.style.transform = `translate(${xPercent * 20 * factor}px, ${yPercent * 20 * factor}px)`;
            });
        });
        
        heroImage.addEventListener('mouseleave', function() {
            // Reset the rotation when mouse leaves
            this.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(5deg)';
            
            // Reset the shapes position
            const shapes = document.querySelectorAll('.shape');
            shapes.forEach(shape => {
                shape.style.transform = 'translate(0, 0)';
            });
        });
    }

    // Parallax scrolling effect
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Parallax for hero section
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const heroElements = heroSection.querySelectorAll('.bg-element');
            heroElements.forEach((element, index) => {
                const speed = 0.1 + (index * 0.05);
                element.style.transform = `translateY(${scrollPosition * speed}px)`;
            });
        }
        
        // Fade in elements on scroll
        const fadeElements = document.querySelectorAll('.service-card, .project-card, .section-header');
        fadeElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('visible');
            }
        });
    });

    // Create animated background particles
    createParticles();

    // Function to create animated background particles
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        document.body.appendChild(particlesContainer);
        
        // Create particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Random size
            const size = Math.random() * 5 + 1;
            
            // Random opacity
            const opacity = Math.random() * 0.5 + 0.1;
            
            // Random animation duration
            const duration = Math.random() * 20 + 10;
            
            // Random delay
            const delay = Math.random() * 10;
            
            // Apply styles
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.opacity = opacity;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            particlesContainer.appendChild(particle);
        }
    }

    // Add CSS for mobile menu and animations
    document.head.insertAdjacentHTML('beforeend', `
<style>
    .mobile-menu {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--bg-color);
        z-index: 2000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .mobile-menu.active {
        opacity: 1;
        visibility: visible;
    }
    
    .mobile-menu .nav-links ul {
        flex-direction: column;
        text-align: center;
    }
    
    .mobile-menu .nav-links ul li {
        margin: 15px 0;
    }
    
    .mobile-menu .nav-links ul li a {
        font-size: 1.5rem;
    }
    
    .mobile-menu .contact-btn {
        margin-top: 20px;
    }
    
    .close-btn {
        position: absolute;
        top: 20px;
        right: 20px;
        font-size: 1.8rem;
        cursor: pointer;
    }
    
    header.scrolled {
        background-color: rgba(25, 25, 27, 0.95);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    /* Fade in animation for elements */
    .service-card, .project-card, .section-header {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .service-card.visible, .project-card.visible, .section-header.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Add delay for each service card */
    .service-card:nth-child(1) { transition-delay: 0.1s; }
    .service-card:nth-child(2) { transition-delay: 0.2s; }
    .service-card:nth-child(3) { transition-delay: 0.3s; }
    .service-card:nth-child(4) { transition-delay: 0.4s; }
    .service-card:nth-child(5) { transition-delay: 0.5s; }
    .service-card:nth-child(6) { transition-delay: 0.6s; }

    /* Particle animation */
    .particles-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        overflow: hidden;
        pointer-events: none;
    }
    
    .particle {
        position: absolute;
        background-color: var(--primary-color);
        border-radius: 50%;
        animation: float-particle infinite linear;
    }
    
    @keyframes float-particle {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(100px);
            opacity: 0;
        }
    }
</style>
`);
});
