# Caborca Piensa en Grande

Copa de básquetbol independiente, con varias ediciones anuales y divisiones por categoría y rama.

Entrada principal: **https://caborcavets.online/piensa/**

Administración: **https://caborcavets.online/piensa/?administrar=1**

Este repositorio contiene todo el sistema y todos los datos de la copa. LMBCV contiene únicamente el documento de entrada `/piensa/index.html`, que carga los recursos publicados por GitHub Pages de este repositorio. No se copian ni se escriben registros de liga. También puede abrirse directamente en https://inproneg77.github.io/piensa/.

## Primeros pasos

1. En Administrar copa, conecta un token de GitHub con acceso al repositorio `inproneg77/piensa` y permiso **Contents: lectura y escritura**. Su almacenamiento local es independiente del token de LMBCV; usa Cerrar acceso para retirarlo.
2. Pulsa **Crear edición**. Define su nombre, fechas, estado y logo opcional. PNG, JPG o WebP, hasta 10 MB; se convierte a PNG de máximo 512 px.
3. En **Configurar edición**, crea cada categoría y rama (Femenil / Varonil, nombres libres) y las canchas.
4. En **Equipos y rosters**, crea equipos con logo e inscribe los jugadores. Para un equipo que participa en más categorías, usa Inscribir equipo en esta categoría: su roster y estadísticas se mantienen separados.
5. En **Grupos y standing**, Organizar grupos propone una distribución equilibrada. Puedes cambiar el número, los nombres y la asignación. El rol requiere entre 3 y 6 equipos por grupo; clasifican uno o dos.
6. En **Calendario y resultados**, genera todos contra todos dentro de las fechas de la copa, canchas, horarios y descansos. Revisa la vista previa y aplícala. Se pueden agregar, editar, cancelar y eliminar partidos, con las protecciones de resultados y papelera.
7. Captura resultados y estadísticas. Una vez resueltos los grupos, confirma clasificados y cruces en **Llaves**. Todas las eliminatorias se juegan a un partido; no son series.
8. Para mostrar la edición en el catálogo público, usa estado **Publicado**. **Finalizado** conserva el archivo consultable. Borrador/Archivado solo se ocultan del catálogo: los JSON del repositorio siguen siendo públicos.

## Logo y siguiente año

El logo de cada edición se agrega o cambia en **Configurar edición → Nombre, logo, fechas y estado**. Aparece en su tarjeta, encabezado y título. Hasta entonces se usa una identidad tipográfica provisional, no un logo oficial.

**Preparar siguiente edición** conserva categorías, reglas, canchas y logo, pero comienza sin equipos, rosters ni resultados. La edición anterior permanece intacta. También puedes crear una edición desde cero.

## Arquitectura y publicación

- Motor: `js/torneos-core.js`, derivado del sistema de torneos independiente de LMBCV.
- Interfaz: `js/torneos-ui.js`; identidad y distribución de grupos: `js/copa.js`.
- Escrituras: GitHub API exclusivamente para `inproneg77/piensa`. Documento, catálogo y logos se guardan en un commit; control de SHA para evitar sobrescribir ediciones modificadas por otro usuario.
- Lectura pública: JSON e imágenes desde el contenido público de `piensa/main`; los cambios pueden tardar en propagarse en las cachés de GitHub.
- Credencial en `piensa_gh_token`; borradores en claves `piensa_tor_*`, nunca en las claves de la liga. Los datos de acceso dependen del origen del navegador: conectar en el enlace principal no inicia acceso automáticamente en github.io.
- Datos: `data/torneos/index.json` y `data/torneos/tor-*.json`; imágenes en `img/torneos/tor-*/`.
- GitHub Pages publica la raíz de main. No agregar CNAME en este proyecto: el dominio se mantiene en LMBCV.
- Al cambiar versiones de CSS o JS en index.html, actualizar también el documento de entrada en LMBCV/piensa/index.html con las mismas versiones y URLs absolutas de recursos.

Pruebas: `node --test --test-isolation=none tests/*.test.cjs`.
