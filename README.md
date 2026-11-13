# Minimercado El Rinconcito

Sitio web informativo multipágina para Minimercado El Rinconcito, ubicado en Belén Rincón, Medellín.

## Cómo abrirlo
1. Descomprime la carpeta del proyecto.
2. Abre la carpeta `Minimercado_El_Rinconcito` en Visual Studio Code.
3. Ejecuta `index.html` con Live Server o abre el archivo directamente en el navegador.

## Páginas
- `index.html`: inicio con diseño de portada, navegación, categorías destacadas y presentación del negocio.
- `productos.html`: catálogo filtrable por categorías y cantidades de inventario de demostración.
- `nosotros.html`: historia de origen familiar del minimercado.
- `horarios.html`: horario diario automático según la zona horaria `America/Bogota`, preguntas frecuentes, medios de pago y mapa.
- `contacto.html`: información de contacto.

## Personalización importante
- **Horario:** edita el objeto `STORE_HOURS` al inicio de `js/main.js`. Usa formato de 24 horas (`HH:MM`). El estado de abierto/cerrado se actualiza cada minuto usando la hora de Bogotá.
- **WhatsApp:** asigna el número real a `WHATSAPP_NUMBER` en `js/main.js`, con indicativo de país y sin `+` ni espacios. Ejemplo de formato: `573001234567`.
- **Inventario:** las cantidades mostradas en Productos son datos de ejemplo para demostrar el catálogo; deben reemplazarse por existencias reales y actualizarse manualmente.
- **Dirección:** se configuró `Calle 57B #57-39, Medellín, Antioquia` en la página de horarios, el pie de página y el mapa. Verifica que el pin corresponda exactamente al local antes de publicar.
- **Historia:** el relato de la pareja es una historia de presentación redactada para el sitio; ajusta nombres, fechas o detalles si deseas reflejar hechos familiares específicos.

## Estructura
- `assets/images/`: imágenes del proyecto.
- `css/styles.css`: estilos compartidos y diseño adaptable a celulares.
- `js/main.js`: menú móvil, filtros de productos, horario local y enlaces de contacto.

Las imágenes visuales se prepararon para este proyecto. Antes de un uso comercial, revisa los términos aplicables al servicio con el que se generaron.
