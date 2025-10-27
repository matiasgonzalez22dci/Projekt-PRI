# 🌐 Proyecto Web — HTML · JavaScript · SASS

Este proyecto es una **plataforma web modular y dinámica** desarrollada con **HTML, JavaScript y SASS**, que integra funcionalidades reales como **internacionalización (i18n)**, **lectura dinámica de archivos Markdown**, **login con JSON**, **temas personalizables**, **control de versiones con Git y GitHub**, y **persistencia local de datos**.  
El objetivo fue crear una aplicación funcional y escalable que combine código limpio, diseño moderno y buenas prácticas de desarrollo web.

---

## 🧭 Estructura General

La aplicación está dividida en varias secciones:

- **🏠 Home:** contiene un hero animado y un sistema de pestañas con contenido dinámico.  
- **💼 Servicios:** muestra tarjetas interactivas cargadas desde archivos `.md`, con soporte para imágenes, precios y descripciones detalladas.  
- **👤 About Me:** sección personal generada dinámicamente desde archivos Markdown en varios idiomas.  
- **📝 Editor:** herramienta funcional para abrir, editar y guardar archivos `.md`, con sistema de **login**, validación desde un JSON y **áreas restringidas** para usuarios autenticados.  
- **📨 Aside de contacto:** formulario flotante desplegable con animación y almacenamiento de respuestas en `localStorage`.  
- **💬 Botón de WhatsApp flotante:** creado con un **ícono SVG inline**, enlaza directamente con el chat del autor.

---

## 💡 Estrategias de Desarrollo

Durante el desarrollo, se priorizó la **modularidad, la claridad del código y la interacción fluida con el DOM**, aplicando un enfoque de programación nativa sin frameworks.

### Principales estrategias aplicadas:
- **Lectura asíncrona (`async/await`)** para cargar archivos Markdown y JSON de manera fluida.  
- **Login y autenticación simulada** leyendo un archivo `users.json`, validando credenciales y controlando acceso a secciones restringidas.  
- **Persistencia de sesión**: almacenamiento del usuario activo y su historial mediante `localStorage`.  
- **Internacionalización (i18n)** con *i18next*, conmutando entre español e inglés en tiempo real.  
- **Diseño modular con SASS**, uso de **variables CSS globales** y **modo claro/oscuro** conmutado desde JavaScript.  
- **DOM dinámico:** carga y renderización de contenido según la sección activa.  
- **Uso de SVG inline** para íconos accesibles y escalables.  
- **Control de versiones con Git y GitHub**, incluyendo subida del proyecto a **GitHub Pages** para su despliegue público.  
- **Accesibilidad y UX:** estructura semántica, colores contrastantes y animaciones suaves controladas por CSS.

---

## ⚙️ Tecnologías Principales

| Categoría | Tecnología | Propósito |
|------------|-------------|------------|
| **Lenguajes base** | HTML5, JavaScript (ES6+), SASS | Estructura, lógica y estilos |
| **Internacionalización** | i18next | Traducción dinámica (ES/EN) |
| **Datos dinámicos** | Markdown (`.md`) y JSON (`users.json`) | Contenido y validación de usuarios |
| **Almacenamiento local** | localStorage | Persistencia de usuarios y formularios |
| **Diseño adaptable** | SASS + variables CSS + transitions | Temas claro/oscuro y animaciones suaves |
| **Accesibilidad visual** | SVG inline | Íconos ligeros y escalables |
| **Asincronía** | async/await + fetch | Carga eficiente de datos sin recargar la página |
| **Control de versiones** | Git + GitHub | Historial, colaboración y despliegue en GitHub Pages |

---

## 🚀 Enfoque y Aprendizaje

El desarrollo de este proyecto buscó **reflejar un flujo de trabajo real**, integrando diseño, contenido y lógica en una misma aplicación.  
Más que solo cumplir requisitos, el objetivo fue **comprender cómo se conectan las distintas capas del front-end moderno**.

### Hitos de aprendizaje:
- Comprender el flujo del DOM sin frameworks.  
- Integrar i18n y contenido dinámico con Markdown.  
- Simular un backend real mediante archivos locales (`.md`, `.json`).  
- Diseñar una UI consistente con temas personalizables.  
- Aplicar control de versiones con **Git y GitHub** para mantener un flujo de desarrollo ordenado.  
- Implementar componentes reutilizables y persistentes.  

El resultado es una aplicación **bilingüe, accesible y completamente modular**, con una arquitectura limpia que puede escalarse fácilmente a un entorno profesional.

---

## 📁 Estructura de Archivos

/assets
├── hero/
├── icons/
└── services/
/js
├── i18n/
├── editor/
├── home/
└── theme.js
/styles
├── scss/style.scss (_aside, _home, _editor)
└── css/style.css
/access
├── access.json
datos.es.md
datos.en.md
editor.html
home.html


---

© 2025 · Proyecto educativo desarrollado por **Matías**