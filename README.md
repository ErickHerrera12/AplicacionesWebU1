# Centro de Tutorías Académicas - Área de Computación

Sitio web de un servicio de tutorías particulares para estudiantes universitarios: asesorías en materias de computación coordinadas por Zoom, con planes por hora, semanal o grupal.

## Qué hay hasta ahora

- **Estructura HTML5 semántica y accesible:** un solo `h1`, un `h2` por sección, navegación interna por anclas, skip link y etiquetas de formulario vinculadas con `label for` y `aria-describedby`.
- **Cinco secciones:** presentación con beneficios, planes y tarifas, catálogo de materias con tarjetas, metodología de coordinación por Zoom en 3 pasos, y formulario de solicitud.
- **Identidad visual completa en CSS:** tipografía Inter, paleta azul medianoche con acento universitario, tarjetas con sombras y estados hover, botones de llamada a la acción y un formulario con selectores de paquete tipo tarjeta que resaltan la opción elegida.
- **Diseño base Mobile First** con las primeras adaptaciones responsivas (columnas dobles en formularios y grillas a partir de pantallas medianas).
- **Imágenes reales** servidas desde Unsplash con `alt` descriptivos y carga diferida.

## Estado de validación

El HTML pasa el validador oficial del W3C (Nu HTML Checker) con 0 errores y 0 avisos.

## Archivos

- `index.html`: estructura y contenido del sitio.
- `styles.css`: estilos, variables de diseño y responsividad.

## Pendiente

- Consolidar los breakpoints a 768px y 1024px en el CSS.
- JavaScript vanilla: menú móvil accesible y validación del formulario con avisos `aria-live`.
