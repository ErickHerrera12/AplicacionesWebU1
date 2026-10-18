# Centro de Tutorías Académicas - Área de Computación

Este repositorio contiene el desarrollo del sitio web para un centro de tutorías académicas especializadas en computación.
## Estado actual (Etapa 1)

En esta primera fase se ha estructurado la página principal (`index.html`) bajo rigurosos estándares semánticos, de accesibilidad (WCAG) y con un enfoque comercial centrado en beneficios:

- **Estructura semántica limpia:** Uso de etiquetas nativas como `<header>`, `<main>`, `<section>`, `<article>`, `<nav>` y `<footer>` sin contenedores `<div>` innecesarios.
- **Jerarquía estricta de encabezados:** Un único `<h1>` principal, un `<h2>` por cada una de las 4 secciones lógicas y `<h3>` para subsecciones.
- **Enfoque comercial y directo:** Textos persuasivos orientados a beneficios del estudiante, con tarifas claras por plan (sesión individual, paquete semanal y asesoría grupal) y sin menciones a instituciones específicas ni nombres de tutores particulares.
- **Formulario accesible de solicitud:** Cada campo cuenta con su etiqueta `<label for>`, atributos de validación (`required`, `inputmode`), agrupación por `fieldset`/`legend` y textos de ayuda vinculados mediante `aria-describedby`.
- **Validación oficial:** Código verificado con el validador oficial del W3C (Nu HTML Checker) con resultado impecable de 0 errores y 0 avisos.

## Archivos del proyecto

- `index.html`: Estructura HTML5 base de la aplicación web.

## Siguientes pasos

- **Etapa 2:** Creación de la hoja de estilos base (`styles.css`) con enfoque *Mobile First*, variables CSS y estados de foco accesibles.
- **Etapa 3:** Incorporación de Flexbox, CSS Grid y adaptaciones responsivas mediante breakpoints.
- **Etapa 4:** Interactividad con JavaScript vainilla para menú móvil y validación en tiempo real.