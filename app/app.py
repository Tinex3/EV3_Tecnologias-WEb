from flask import Flask, render_template

# Crear la aplicación Flask
app = Flask(__name__)

# Ruta para la página principal
@app.route('/')
def index():
    return render_template('index.html')

# Ruta para la página de contacto
@app.route('/contact')
def contact():
    return render_template('contact.html')

# Ruta para la galería
@app.route('/gallery')
def gallery():
    return render_template('gallery.html')

# Rutas adicionales para compatibilidad con enlaces .html
@app.route('/index.html')
def index_html():
    return render_template('index.html')

@app.route('/contact.html')
def contact_html():
    return render_template('contact.html')

@app.route('/gallery.html')
def gallery_html():
    return render_template('gallery.html')

# Manejo de errores 404
@app.errorhandler(404)
def page_not_found(e):
    return render_template('index.html'), 404

# Configuración para ejecutar la aplicación
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)