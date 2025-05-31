function setModalData(title, imageSrc, description, price) {
    document.getElementById('modalArtTitle').textContent = title;
    const modalImage = document.getElementById('modalArtImage');
    modalImage.src = imageSrc;
    modalImage.alt = title;
    document.getElementById('modalArtDescription').textContent = description;
    document.getElementById('modalArtPrice').textContent = price;
    
    // Forzar recarga de la imagen si la ruta es la misma
    if (modalImage.src === imageSrc) {
        modalImage.src = '';
        setTimeout(() => {
            modalImage.src = imageSrc;
        }, 10);
    }
}
        
        // Actualizar el nav link activo
        document.addEventListener('DOMContentLoaded', function() {
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === 'gallery.html' || 
                    link.textContent === 'Gallery') {
                    link.classList.add('active');
                }
            });
        });

// gallery.js - Actualización con funcionalidad de carrito

class Cart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.initElements();
        this.initEvents();
        this.loadCart();
    }

    initElements() {
        this.cartSidebar = document.querySelector('.cart-sidebar');
        this.cartItemsContainer = document.querySelector('.cart-items');
        this.cartToggle = document.querySelector('.cart-toggle');
        this.cartCount = document.querySelector('.cart-count');
        this.cartTotal = document.querySelector('.total-amount');
        this.btnCheckout = document.querySelector('.btn-checkout');
        this.btnCloseCart = document.querySelector('.btn-close-cart');
        this.cartOverlay = document.createElement('div');
        this.cartOverlay.className = 'cart-overlay';
        document.body.appendChild(this.cartOverlay);
    }

    initEvents() {
        this.cartToggle.addEventListener('click', () => this.toggleCart());
        this.btnCloseCart.addEventListener('click', () => this.closeCart());
        this.cartOverlay.addEventListener('click', () => this.closeCart());
        this.btnCheckout.addEventListener('click', () => this.checkout());
        
        // Delegación de eventos para los items del carrito
        this.cartItemsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-item')) {
                const itemId = e.target.closest('.cart-item').dataset.id;
                this.removeItem(itemId);
            } else if (e.target.classList.contains('increase-quantity')) {
                const itemId = e.target.closest('.cart-item').dataset.id;
                this.updateQuantity(itemId, 1);
            } else if (e.target.classList.contains('decrease-quantity')) {
                const itemId = e.target.closest('.cart-item').dataset.id;
                this.updateQuantity(itemId, -1);
            }
        });
    }

    toggleCart() {
        this.cartSidebar.classList.toggle('open');
        this.cartOverlay.classList.toggle('active');
    }

    openCart() {
        this.cartSidebar.classList.add('open');
        this.cartOverlay.classList.add('active');
    }

    closeCart() {
        this.cartSidebar.classList.remove('open');
        this.cartOverlay.classList.remove('active');
    }

    addItem(artwork) {
        const existingItem = this.items.find(item => item.id === artwork.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...artwork,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.render();
        this.openCart();
    }

    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.saveCart();
        this.render();
    }

    updateQuantity(itemId, change) {
        const item = this.items.find(item => item.id === itemId);
        if (item) {
            item.quantity += change;
            
            if (item.quantity <= 0) {
                this.removeItem(itemId);
            } else {
                this.saveCart();
                this.render();
            }
        }
    }

    calculateTotal() {
        this.total = this.items.reduce((sum, item) => {
            const price = Number(item.price.replace('$', ''));
            return sum + (price * item.quantity);
        }, 0);
    }

    render() {
        this.calculateTotal();
        
        // Actualizar contador
        const itemCount = this.items.reduce((count, item) => count + item.quantity, 0);
        this.cartCount.textContent = itemCount;
        
        // Renderizar items
        this.cartItemsContainer.innerHTML = this.items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">${item.price} c/u</div>
                    <div class="cart-item-actions">
                        <button class="decrease-quantity">-</button>
                        <span class="cart-item-quantity">${item.quantity}</span>
                        <button class="increase-quantity">+</button>
                        <button class="remove-item"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Actualizar total
        this.cartTotal.textContent = `$${this.total.toFixed(2)}`;
    }

    saveCart() {
        localStorage.setItem('artCart', JSON.stringify(this.items));
    }

    loadCart() {
        const savedCart = localStorage.getItem('artCart');
        if (savedCart) {
            this.items = JSON.parse(savedCart);
            this.render();
        }
    }

    checkout() {
        if (this.items.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }
        
        // Aquí puedes implementar la lógica de pago
        alert(`Procesando pago por $${this.total.toFixed(2)}`);
        // this.items = [];
        // this.saveCart();
        // this.render();
        // this.closeCart();
    }
}

// Inicializar el carrito
const cart = new Cart();

// Modificar la función setModalData para incluir el botón de compra
function setModalData(title, imageSrc, description, price) {
    document.getElementById('modalArtTitle').textContent = title;
    const modalImage = document.getElementById('modalArtImage');
    modalImage.src = imageSrc;
    modalImage.alt = title;
    document.getElementById('modalArtDescription').textContent = description;
    document.getElementById('modalArtPrice').textContent = price;
    
    // Actualizar el botón de compra
    const buyButton = document.querySelector('.btn-purchase');
    buyButton.onclick = () => {
        cart.addItem({
            id: imageSrc, // Usamos la URL como ID único
            title: title,
            image: imageSrc,
            price: price,
            description: description
        });
    };
    
    // Forzar recarga de la imagen si la ruta es la misma
    if (modalImage.src === imageSrc) {
        modalImage.src = '';
        setTimeout(() => {
            modalImage.src = imageSrc;
        }, 10);
    }
}

// Actualizar el nav link activo
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === 'gallery.html' || 
            link.textContent === 'Gallery') {
            link.classList.add('active');
        }
    });
});
        