// Auto-rotate carousel
const carousel = new bootstrap.Carousel(document.querySelector('#artCarousel'), {
    interval: 3000,
    ride: 'carousel'
});

// Precargar y preajustar todas las imágenes
function preloadAndPreadjustImages() {
    const carousel = document.querySelector('#artCarousel');
    const items = document.querySelectorAll('.carousel-item');
    const containerHeight = carousel.offsetHeight;
    const containerWidth = carousel.offsetWidth;

    items.forEach(item => {
        const img = item.querySelector('img');
        if (img) {
            // Forzar el cálculo de dimensiones antes de mostrar
            img.style.opacity = '0';
            img.style.position = 'absolute';
            
            if (img.complete) {
                calculateAndSetDimensions(img, containerWidth, containerHeight);
            } else {
                img.addEventListener('load', function onLoad() {
                    calculateAndSetDimensions(img, containerWidth, containerHeight);
                    img.removeEventListener('load', onLoad);
                });
            }
        }
    });
}

function calculateAndSetDimensions(img, containerWidth, containerHeight) {
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const containerAspect = containerWidth / containerHeight;

    if (imgAspect > containerAspect) {
        img.style.width = '100%';
        img.style.height = 'auto';
    } else {
        img.style.width = 'auto';
        img.style.height = '100%';
    }

    img.style.maxWidth = '100%';
    img.style.maxHeight = '100%';
    img.style.margin = 'auto';
    img.style.display = 'block';
    img.style.position = '';
    img.style.opacity = '1';
}

// Ajustar cuando cambia el slide
carousel._element.addEventListener('slide.bs.carousel', function() {
    const activeItem = this.querySelector('.carousel-item.active');
    const nextItem = this.querySelector('.carousel-item-next, .carousel-item-prev');
    
    if (nextItem) {
        nextItem.style.opacity = '0';
        setTimeout(() => {
            nextItem.style.opacity = '1';
        }, 20);
    }
});

// Inicialización
window.addEventListener('DOMContentLoaded', () => {
    preloadAndPreadjustImages();
    
    // Forzar redimensionamiento después de que todo esté listo
    setTimeout(() => {
        const activeItem = document.querySelector('.carousel-item.active');
        if (activeItem) {
            activeItem.style.opacity = '1';
        }
    }, 300);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section, .hero-section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id') || 'home';
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current || 
            (current === '' && link.getAttribute('href') === '#home')) {
            link.classList.add('active');
        }
    });
});