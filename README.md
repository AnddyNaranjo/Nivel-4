# CinePlus - Aplicación Web de Películas

## Descripción
CinePlus es una aplicación web para explorar películas en cartelera, con funcionalidades de renta, contacto y detalles de películas. Incluye un diseño moderno con animaciones y validaciones.

## Datos del Estudiante
- **Nombre:** Anddy Naranjo
- **Institución:** Universidad Salesiana
- **Carrera:** Ingeniería en Sistemas / Desarrollo Web
- **Fecha:** Abril 2026

## Funcionalidades Implementadas

### 1. Galería de Películas
- Muestra películas cargadas dinámicamente desde archivos JSON (`peliculas.json`, `generos_pelis.json`).
- Incluye información: título, género, sinopsis, precio (estreno/normal), fecha de estreno.
- Animación fadeIn escalonada al cargar las películas.

### 2. Alerta de Bienvenida
- Aparece solo una vez por sesión usando `localStorage`.
- Mensaje: "¡Bienvenido a CinePlus!"

### 3. Página de Detalles
- Muestra información detallada de una película seleccionada.
- Incluye reseñas con calificaciones en estrellas.

### 4. Página de Renta
- Formulario para seleccionar películas y calcular total.
- Modal de confirmación con resumen de la renta.

### 5. Formulario de Contacto
- Validación personalizada: nombre (mín. 2 chars), correo válido, mensaje (20-50 chars).
- Mensajes de error específicos.
- Alerta de éxito al enviar.

### 6. Tema Visual Personalizado
- Tipografía: Roboto (Google Fonts).
- Colores: Gradientes modernos (azul, púrpura, coral).
- Footer sticky en el borde inferior.
- Navbar con página activa resaltada.
- Efectos hover en cards y botones.

### 7. Navegación
- Navbar presente en todas las páginas.
- Enlaces: Inicio, Renta, Contacto.
- Página actual marcada con clase `active`.

## Tecnologías Usadas
- **HTML5**
- **CSS3** (con Bootstrap 5.3.2)
- **JavaScript** (jQuery 3.6.4)
- **Bootstrap** para componentes UI
- **Google Fonts** para tipografía
- **JSON** para datos

## Instrucciones Básicas de Uso

### Requisitos
- Navegador web moderno (Chrome, Firefox, Edge).
- Conexión a internet para cargar Bootstrap y Google Fonts.

### Instalación y Ejecución
1. Clona o descarga el repositorio.
2. Abre `index.html` en tu navegador.
3. Navega usando la barra de menú:
   - **Inicio:** Galería de películas.
   - **Renta:** Selecciona películas para rentar.
   - **Contacto:** Envía un mensaje.

### Uso Específico
- **Galería:** Espera 5 segundos para ver las películas con animación.
- **Detalles:** Haz clic en "Ver más" en una película.
- **Renta:** Selecciona películas, ajusta cantidades, confirma en modal.
- **Contacto:** Llena el formulario; valida antes de enviar.
- **Alerta:** Aparece solo en la primera visita.

### Estructura de Archivos
```
/
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos personalizados
├── js/
│   └── app.js          # Lógica de la galería
├── data/
│   ├── peliculas.json  # Datos de películas
│   ├── generos_pelis.json # Géneros
│   └── reseñas.json    # Reseñas
├── pages/
│   ├── detalle.html    # Detalles de película
│   ├── renta.html      # Página de renta
│   └── contacto.html   # Formulario de contacto
└── img/                # Imágenes de películas
```

## Notas
- Los datos se cargan desde archivos JSON locales.
- El footer se mantiene siempre visible en la parte inferior.
- Diseño responsivo con Bootstrap.

</content>
