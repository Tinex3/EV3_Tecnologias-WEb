# Guía: Proyecto Flask - Instalación y Ejecución en Windows

## Descripción del Proyecto

Este es un proyecto Flask que incluye:
- **Página principal** (`/` o `/index.html`)
- **Página de contacto** (`/contact` o `/contact.html`) 
- **Galería de imágenes** (`/gallery` o `/gallery.html`)
- **Archivos estáticos** (CSS, JavaScript, imágenes)
- **Manejo de errores 404**

## Prerrequisitos

- Python instalado en tu sistema Windows
- Acceso a Command Prompt (CMD) o PowerShell
- Archivo `requirements.txt` en tu proyecto

## Instrucciones de Instalación y Ejecución

### Paso 1: Clonar o Descargar el Proyecto
```cmd
cd C:\ruta\donde\quieres\el\proyecto
```

### Paso 2: Crear el Entorno Virtual
```cmd
python -m venv venv
```

### Paso 3: Activar el Entorno Virtual
```cmd
venv\Scripts\activate
```
✅ Verás `(venv)` al inicio de tu línea de comandos

### Paso 4: Instalar Dependencias
```cmd
pip install -r requirements.txt
```

### Paso 5: Ejecutar la Aplicación
```cmd
python app.py
```

### Paso 6: Abrir en el Navegador
Abre tu navegador y ve a: **http://localhost:5000**

### Paso 7: Navegar por el Sitio
- **Página principal**: `http://localhost:5000/`
- **Contacto**: `http://localhost:5000/contact`
- **Galería**: `http://localhost:5000/gallery`

### Paso 8: Detener la Aplicación
Presiona `Ctrl + C` en la terminal

### Paso 9: Desactivar Entorno Virtual
```cmd
deactivate
```

## Características del Proyecto

### Rutas Disponibles
- `GET /` - Página principal
- `GET /contact` - Página de contacto  
- `GET /gallery` - Galería de imágenes
- `GET /index.html` - Redirige a página principal
- `GET /contact.html` - Redirige a contacto
- `GET /gallery.html` - Redirige a galería

### Configuración de la Aplicación
- **Debug Mode**: Activado (recarga automática)
- **Host**: 0.0.0.0 (accesible desde cualquier IP)
- **Puerto**: 5000
- **Manejo de errores 404**: Redirige a página principal

### Archivos Estáticos
```
app/static/
├── css/           # Hojas de estilo
├── img/           # Imágenes del sitio
└── js/            # Archivos JavaScript
```

### Plantillas HTML
```
app/templates/
├── index.html     # Página principal
├── contact.html   # Página de contacto
└── gallery.html   # Galería de imágenes
```

## Comandos Útiles para Desarrollo

### Gestión del Entorno Virtual
```cmd
# Generar nuevo requirements.txt
pip freeze > requirements.txt

# Ver librerías instaladas
pip list

# Desactivar el entorno virtual
deactivate

# Eliminar el entorno virtual
rmdir /s venv
```

### Desarrollo y Testing
```cmd
# Ejecutar en modo desarrollo
python app.py

# Verificar que Flask esté instalado
pip show flask

# Ver la estructura del proyecto
tree /f
```

### Acceso desde Otros Dispositivos
Si quieres acceder desde otro dispositivo en tu red local:
1. Ejecuta la aplicación: `python app.py`
2. Encuentra tu IP local: `ipconfig`
3. Desde otro dispositivo: `http://TU_IP:5000`

## Flujo de Trabajo Completo (Ejemplo)

```cmd
# 1. Abrir terminal en la carpeta del proyecto
cd C:\ruta\a\tu\proyecto

# 2. Crear entorno virtual (solo la primera vez)
python -m venv venv

# 3. Activar entorno virtual
venv\Scripts\activate

# 4. Instalar dependencias (solo la primera vez o si cambió requirements.txt)
pip install -r requirements.txt

# 5. Ejecutar la aplicación Flask
python app.py

# ✅ La aplicación estará corriendo en http://localhost:5000
# ✅ Puedes hacer cambios en el código y se reflejarán automáticamente
# ✅ Presiona Ctrl+C para detener el servidor

# 6. Desactivar entorno virtual cuando termines
deactivate
```

### Primera Vez vs. Días Siguientes

**Primera vez:**
```cmd
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

**Días siguientes:**
```cmd
venv\Scripts\activate
python app.py
```

## Solución de Problemas Comunes

### Error: "python no se reconoce como comando"
- Asegúrate de que Python esté en tu PATH
- Reinstala Python marcando "Add Python to PATH"

### Error: "No se puede ejecutar scripts"
En PowerShell, ejecuta:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Error: "pip no encontrado"
```cmd
python -m ensurepip --upgrade
```

## Estructura de Archivos de tu Proyecto Flask

```
TuProyecto/
│
├── venv/                 # Entorno virtual (no subir a Git)
│   ├── Scripts/
│   ├── Lib/
│   └── pyvenv.cfg
│
├── app/                  # Carpeta de la aplicación
│   ├── static/           # Archivos estáticos
│   │   ├── css/
│   │   └── img/
│   ├── js/               # Archivos JavaScript
│   └── templates/        # Plantillas HTML
│
├── app.py               # Archivo principal Flask
├── requirements.txt     # Dependencias del proyecto
├── .gitignore          # Incluir 'venv/' aquí
├── LICENSE
└── README.md
```

## Notas Importantes para este Proyecto

- **Modo Debug**: Activado automáticamente - los cambios se reflejan sin reiniciar
- **Acceso en Red**: Configurado para aceptar conexiones desde cualquier IP (0.0.0.0)
- **Compatibilidad**: URLs con y sin `.html` funcionan correctamente
- **Manejo de Errores**: Las páginas no encontradas redirigen a la página principal
- **Archivos Estáticos**: CSS, JS e imágenes se sirven desde `/app/static/`

### Desarrollo Recomendado
1. **Mantén activado** el entorno virtual mientras desarrollas
2. **Los cambios se aplican automáticamente** gracias al modo debug
3. **Usa F5** en el navegador para refrescar después de cambios en CSS/JS
4. **Revisa la consola** para ver mensajes de error o debug

### Estructura Final del Proyecto
```
TuProyecto/
│
├── venv/                    # Entorno virtual (no subir a Git)
├── app/
│   ├── static/
│   │   ├── css/
│   │   │   ├── contact.css
│   │   │   └── styles.css
│   │   ├── img/             # 8 imágenes PNG
│   │   └── js/
│   │       ├── contact.js
│   │       ├── gallery.js
│   │       └── index.js
│   └── templates/
│       ├── contact.html
│       ├── gallery.html
│       └── index.html
│
├── app.py                   # Aplicación principal Flask
├── requirements.txt         # Dependencias
├── .gitignore              # Archivos a ignorar
├── LICENSE                 # Licencia del proyecto
└── README.md              # Esta documentación
```

## .gitignore Recomendado

```gitignore
# Entorno virtual
venv/
env/
ENV/

# Archivos de Python
__pycache__/
*.pyc
*.pyo
*.pyd
.Python
```