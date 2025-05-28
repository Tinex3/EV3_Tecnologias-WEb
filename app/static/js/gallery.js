
        // Función para cargar datos en el modal
        function setModalData(title, imageSrc, description, price) {
            document.getElementById('modalArtTitle').textContent = title;
            document.getElementById('modalArtImage').src = imageSrc;
            document.getElementById('modalArtImage').alt = title;
            document.getElementById('modalArtDescription').textContent = description;
            document.getElementById('modalArtPrice').textContent = price;
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
        