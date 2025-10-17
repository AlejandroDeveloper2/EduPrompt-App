/**
 * Genera una plantilla HTML que permite visualizar un archivo PDF a partir de su contenido en Base64.
 *
 * Esta función retorna un string HTML que incluye la configuración necesaria para renderizar
 * el PDF en un navegador utilizando **PDF.js**. Cada página del documento se dibuja dentro
 * de un elemento `<canvas>` contenido en el div `#pdf-container`.
 *
 * @param {string} base64Content - Contenido del archivo PDF en formato Base64.
 * @returns {string} Cadena HTML lista para ser inyectada en un `WebView` o mostrada en un navegador.
 *
 * @example
 * import { renderHtmlPdf } from "@/utils/renderHtmlPdf";
 * import { WebView } from "react-native-webview";
 *
 * const base64Pdf = "JVBERi0xLjQKJ...."; // PDF en Base64
 *
 * <WebView originWhitelist={['*']} source={{ html: renderHtmlPdf(base64Pdf) }} />;
 *
 * @description
 * La plantilla generada:
 * - Usa la librería **PDF.js** desde un CDN (`cdnjs.cloudflare.com`).
 * - Decodifica el contenido Base64 en binario usando `atob`.
 * - Renderiza cada página del PDF dentro de un `<canvas>` dinámicamente.
 * - Aplica estilos básicos para centrado y sombras en las páginas.
 */

export const renderHtmlPdf = (base64Content: string): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>PDF Viewer</title>
        <meta charset="utf-8" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js"></script>
        <style>
        body, html {
            margin: 0;
            padding: 0;
            background-color: #fff;
        }
        #pdf-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 16px;
        }
        canvas {
            margin-bottom: 16px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            max-width: 100%;
            height: auto;
        }
        </style>
    </head>
    <body>
        <div id="pdf-container"></div>
        <script>
        const pdfData = atob("${base64Content}");
        const loadingTask = pdfjsLib.getDocument({ data: pdfData });
        
        loadingTask.promise.then(function(pdf) {
            const container = document.getElementById('pdf-container');
            const renderPage = (pageNum) => {
            pdf.getPage(pageNum).then(function(page) {
                const scale = 1.5;
                const viewport = page.getViewport({ scale: scale });

                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                container.appendChild(canvas);

                const renderContext = {
                canvasContext: context,
                viewport: viewport
                };

                page.render(renderContext).promise.then(() => {
                if (pageNum < pdf.numPages) {
                    renderPage(pageNum + 1);
                }
                });
            });
            };

            renderPage(1);
        });
        </script>
    </body>
    </html>`;
};
