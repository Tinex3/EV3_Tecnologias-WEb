// Inicialización del carrusel con configuración mejorada
const carousel = new bootstrap.Carousel(document.querySelector('#artCarousel'), {
    interval: 3000,
    ride: 'carousel',
    wrap: true,
    touch: true,
    pause: 'hover'
});

// Precarga y ajuste de imágenes con optimizaciones
function preloadAndAdjustImages() {
    const carouselElement = document.querySelector('#artCarousel');
    const items = document.querySelectorAll('.carousel-item');
    
    // Mostrar el carrusel después de la precarga
    carouselElement.style.visibility = 'visible';
    
    items.forEach((item, index) => {
        const img = item.querySelector('img');
        if (img) {
            // Configuración para carga óptima
            img.loading = 'eager';
            img.decoding = 'async';
            img.fetchpriority = index === 0 ? 'high' : 'low';
            
            // Estilos iniciales para evitar parpadeo
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            img.style.position = 'absolute';
            
            // Manejar la carga de la imagen
            if (img.complete) {
                adjustImageDimensions(img);
                if (index === 0) {
                    showImage(img);
                }
            } else {
                img.addEventListener('load', function onLoad() {
                    adjustImageDimensions(img);
                    if (index === 0) {
                        showImage(img);
                    }
                    img.removeEventListener('load', onLoad);
                }, { once: true });
                
                // Fallback en caso de error de carga
                img.addEventListener('error', function onError() {
                    console.error('Error loading image:', img.src);
                    img.removeEventListener('error', onError);
                }, { once: true });
            }
        }
    });
}

// Ajustar dimensiones de la imagen manteniendo relación de aspecto
function adjustImageDimensions(img) {
    const container = img.closest('.carousel-item');
    if (!container) return;
    
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const containerAspect = containerWidth / containerHeight;
    
    if (imgAspect > containerAspect) {
        img.style.width = '100%';
        img.style.height = 'auto';
    } else {
        img.style.width = 'auto';
        img.style.height = '100%';
    }
    
    // Estilos finales
    img.style.maxWidth = '100%';
    img.style.maxHeight = '100%';
    img.style.margin = 'auto';
    img.style.display = 'block';
}

// Mostrar imagen con transición suave
function showImage(img) {
    img.style.opacity = '1';
    img.style.position = 'relative';
}

// Manejar eventos del carrusel para transiciones suaves
function setupCarouselEvents() {
    const carouselElement = document.querySelector('#artCarousel');
    
    // Antes de cambiar de slide
    carouselElement.addEventListener('slide.bs.carousel', function(e) {
        const nextItem = e.relatedTarget;
        const nextImg = nextItem.querySelector('img');
        
        if (nextImg) {
            nextImg.style.opacity = '0';
            nextImg.style.position = 'absolute';
        }
    });
    
    // Después de cambiar de slide
    carouselElement.addEventListener('slid.bs.carousel', function(e) {
        const activeItem = e.relatedTarget;
        const activeImg = activeItem.querySelector('img');
        
        if (activeImg) {
            activeImg.style.opacity = '1';
            activeImg.style.position = 'relative';
        }
        
        // Ocultar el slide anterior después de la transición
        const previousItem = document.querySelector('.carousel-item-prev');
        if (previousItem) {
            setTimeout(() => {
                previousItem.style.opacity = '0';
            }, 50);
        }
    });
}

// Scroll suave para enlaces de navegación
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Actualizar URL sin recargar la página
                if (history.pushState) {
                    history.pushState(null, null, this.getAttribute('href'));
                } else {
                    location.hash = this.getAttribute('href');
                }
            }
        });
    });
}

// Actualizar enlace activo en la navegación al hacer scroll
function setupActiveNavHighlight() {
    const sections = document.querySelectorAll('section, .hero-section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - 200)) {
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
    }
    
    // Usar IntersectionObserver para mejor rendimiento
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateActiveNav();
                }
            });
        }, { threshold: 0.5 });
        
        sections.forEach(section => {
            observer.observe(section);
        });
    } else {
        window.addEventListener('scroll', updateActiveNav);
    }
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    // Precargar y ajustar imágenes
    preloadAndAdjustImages();
    
    // Configurar eventos del carrusel
    setupCarouselEvents();
    
    // Configurar scroll suave
    setupSmoothScrolling();
    
    // Configurar resaltado de navegación
    setupActiveNavHighlight();
    
    // Forzar redimensionamiento después de que todo esté listo
    setTimeout(() => {
        const activeItem = document.querySelector('.carousel-item.active');
        if (activeItem) {
            const activeImg = activeItem.querySelector('img');
            if (activeImg) {
                showImage(activeImg);
            }
        }
    }, 300);
});

// Manejar cambios de tamaño de ventana
window.addEventListener('resize', () => {
    const activeItem = document.querySelector('.carousel-item.active');
    if (activeItem) {
        const activeImg = activeItem.querySelector('img');
        if (activeImg) {
            adjustImageDimensions(activeImg);
        }
    }
});