document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const loading = document.getElementById('loading');
    const successMessage = document.getElementById('successMessage');
    
    // Campos del formulario
    const fields = {
        nombre: document.getElementById('nombre'),
        email: document.getElementById('email'),
        asunto: document.getElementById('asunto'),
        mensaje: document.getElementById('mensaje')
    };
    
    // Mensajes de error
    const errorMessages = {
        nombre: document.getElementById('nombreError'),
        email: document.getElementById('emailError'),
        asunto: document.getElementById('asuntoError'),
        mensaje: document.getElementById('mensajeError')
    };

    // Función para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Función para limpiar espacios en blanco
    function cleanValue(value) {
        return value.trim();
    }

    // Función para mostrar error
    function showError(fieldName, message) {
        fields[fieldName].classList.add('error');
        errorMessages[fieldName].textContent = message;
        errorMessages[fieldName].style.display = 'block';
    }

    // Función para ocultar error
    function hideError(fieldName) {
        fields[fieldName].classList.remove('error');
        errorMessages[fieldName].style.display = 'none';
    }

    // Función para validar un campo individual
    function validateField(fieldName) {
        const value = cleanValue(fields[fieldName].value);
        let isValid = true;

        // Ocultar error previo
        hideError(fieldName);

        if (!value) {
            showError(fieldName, `Por favor, ${getFieldLabel(fieldName)}`);
            isValid = false;
        } else if (fieldName === 'email' && !isValidEmail(value)) {
            showError(fieldName, 'Por favor, ingresa un email válido');
            isValid = false;
        } else if (fieldName === 'nombre' && value.length < 2) {
            showError(fieldName, 'El nombre debe tener al menos 2 caracteres');
            isValid = false;
        } else if (fieldName === 'asunto' && value.length < 3) {
            showError(fieldName, 'El asunto debe tener al menos 3 caracteres');
            isValid = false;
        } else if (fieldName === 'mensaje' && value.length < 10) {
            showError(fieldName, 'El mensaje debe tener al menos 10 caracteres');
            isValid = false;
        }

        return isValid;
    }

    // Función para obtener etiquetas de campos
    function getFieldLabel(fieldName) {
        const labels = {
            nombre: 'ingresa tu nombre',
            email: 'ingresa tu email',
            asunto: 'ingresa el asunto',
            mensaje: 'escribe tu mensaje'
        };
        return labels[fieldName];
    }

    // Validación en tiempo real
    Object.keys(fields).forEach(fieldName => {
        // Validar cuando el usuario sale del campo
        fields[fieldName].addEventListener('blur', () => {
            validateField(fieldName);
        });

        // Validar mientras escribe si ya hay un error
        fields[fieldName].addEventListener('input', () => {
            if (fields[fieldName].classList.contains('error')) {
                validateField(fieldName);
            }
        });
    });

    // Manejar envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar todos los campos
        let isFormValid = true;
        Object.keys(fields).forEach(fieldName => {
            if (!validateField(fieldName)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            // Scroll al primer campo con error
            const firstError = form.querySelector('.form-control.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
            return;
        }

        // Simular envío del formulario
        submitBtn.disabled = true;
        loading.style.display = 'block';
        
        // Aquí puedes agregar tu lógica real de envío
        // Por ejemplo: enviar datos a tu servidor
        
        setTimeout(() => {
            loading.style.display = 'none';
            successMessage.style.display = 'block';
            form.reset();
            submitBtn.disabled = false;
            
            // Limpiar todos los errores al resetear
            Object.keys(fields).forEach(fieldName => {
                hideError(fieldName);
            });
            
            // Ocultar mensaje de éxito después de 5 segundos
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000)
            alert("Correo Enviado");
        }, 2000);
    });

    // Limpiar mensajes de error al resetear el formulario
    form.addEventListener('reset', function() {
        Object.keys(fields).forEach(fieldName => {
            hideError(fieldName);
        });
        successMessage.style.display = 'none';
    });

    // Función adicional para validar formulario externamente (opcional)
    window.validateContactForm = function() {
        let isFormValid = true;
        Object.keys(fields).forEach(fieldName => {
            if (!validateField(fieldName)) {
                isFormValid = false;
            }
        });
        return isFormValid;
    };

    // Función para obtener datos del formulario (opcional)
    window.getFormData = function() {
        return {
            nombre: cleanValue(fields.nombre.value),
            email: cleanValue(fields.email.value),
            asunto: cleanValue(fields.asunto.value),
            mensaje: cleanValue(fields.mensaje.value)
        };
    };
});