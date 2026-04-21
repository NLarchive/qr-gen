# QR Gen

Generador de códigos QR nativo usando HTML, CSS y JavaScript. El proyecto funciona totalmente en el cliente y acepta un logo central opcional.

## Características
- Generación de QR en el navegador sin dependencias externas.
- Carga de logo personalizado para el centro del QR.
- Ajuste de tamaño, color de QR y color de fondo.
- Descarga local directa como `PNG`.
- Preparado para desplegar con GitHub Pages.

## Contenido del proyecto
- `index.html`: interfaz y formulario.
- `styles.css`: estilos responsivos y modernos.
- `script.js`: lógica de generación y descarga.
- `qrcode-lib.js`: librería QR nativa embebida.
- `logo.png`: logo por defecto usado en la vista previa.
- `logo-data.js`: logo en base64 válido.
- `.github/workflows/gh-pages.yml`: despliegue automático en GitHub Pages.

## Uso local
1. Abrir `index.html` en el navegador.
2. Introducir el texto o URL.
3. Subir un logo opcional.
4. Hacer clic en `Generar QR` y luego en `Descargar PNG`.

## GitHub Pages
Este proyecto está listo para desplegarse en GitHub Pages.
Propuesta de URL:

`https://nlarchive.github.io/qr-gen/`

## Licencia
Proyecto bajo licencia MIT.
