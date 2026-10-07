# Descargas de la copa

En cada edición abre **Descargas** y elige la categoría/rama o todas las de esa edición. Puedes descargar PDF o CSV de calendario, resultados con hojas individuales, equipos con rosters e historial, standing por grupo, líderes, rankings y llaves. El informe de edición reúne calendario, posiciones, líderes y rendimiento.

También hay botones directos: **Descargar resultado (PDF)** en cada juego y su hoja; **Exportar equipo a PDF** en cada equipo y roster; **Descargar jugador (PDF)** en el perfil. Comparar equipos tiene su propio PDF. Los líderes y rankings exportados desde esa vista respetan sus filtros de grupo y fase.

Los PDF son archivos reales, con páginas numeradas, tablas con encabezados repetidos, colores institucionales y logo/foto cuando está disponible. No es necesario usar el diálogo de impresión. CSV incluye UTF-8 para Excel y protección frente a fórmulas en nombres. La generación ocurre en el navegador y no escribe ni envía los datos a un servicio externo.

Los informes mantienen las estadísticas aisladas por edición/categoría/rama, distinguen capturas pendientes y marcan los datos de simulación. Los resultados y el standing conservan los forfeits; los rankings y promedios de rendimiento los excluyen.

Motor PDF: jsPDF 4.2.1, distribución UMD oficial de https://github.com/parallax/jsPDF/tree/v4.2.1/dist, licencia MIT incluida en `js/vendor/jspdf-LICENSE.txt`. Se sirve desde este repositorio y se carga únicamente al pedir un PDF. Las ediciones ocultas siguen requiriendo administración para abrir sus reportes.
