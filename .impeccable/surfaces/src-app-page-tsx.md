---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: []
---

# Surface brief: La Carta de la Amistad (app completa)

Scope: toda la app web (tablero/mesa, ranking, pedir favor, bandeja, admin). Visitor mode: Operate.
Audience: la cuadrilla, en el móvil, desde WhatsApp. Job: ver de un vistazo quién ha gastado qué carta y gastar la suya con ceremonia.
Constraints: móvil primero, prefers-reduced-motion, estados legibles sin color, castellano.
Memorable moment: echar carta, el naipe se reparte desde tu mano, cruza el tapete en arco, cae boca arriba en su casilla con «¡Órdago!», se da la vuelta y recibe el amarraco (queda pendiente). Rechazo: el naipe se va de la casilla de vuelta al mazo.
Unresolved: nada de producto. Cuadrilla de 12 (mesa densa a partir de 10 personas).

## Direction contract

THESIS: Cada carta de la amistad es un naipe de baraja española sobre el tapete de mus de la cuadrilla. Rechaza el dashboard de avatares con barras de progreso: aquí la matriz es una mesa de naipes boca abajo (por usar) y boca arriba (gastados).

OWN-WORLD: Tapete de fieltro verde (#1d5a3a con viñeta más oscura) como fondo de toda la app; naipes blancos con borde blanco y esquinas de 4px; dorso de naipe rojo con trama diagonal; los cuatro palos como colores de identidad de cada persona (oros #d9a21b, copas #c0282d, espadas #2a5aa8, bastos #8a5a2b); amarracos dorados como fichas de conteo. Bitter 800 para títulos y números, Barlow para el resto. Controles estándar (pestañas en píldora, botones, selects) teñidos con el mundo.

STORY: Entras, ves la mesa del año y sabes quién ha echado cartas y a quién; tocas una persona y se iluminan su fila y su columna; pulsas «Echar carta», eliges a quién, escribes el favor y la carta vuela a su sitio. El destinatario lo ve en su bandeja y responde.

FIRST VIEWPORT: (390px) Cabecera con «La Carta de la Amistad» en dos líneas y la píldora del año en oro; pestañas en píldora Mesa / Ranking / Bandeja con contador; nota breve de leyenda; la matriz 8×7 de naipes con nombre a la izquierda y amarracos de gastadas a la derecha, entera sin scroll; botón oro «Echar carta» fijo abajo. En escritorio la mesa crece centrada y el ranking se pone al lado.

FORM: El Tapete del Mus, IMPECCABLE'S PICK (puesto 1 de mi lista; la tirada asignó el 6). seed:2401a6eefa59353d. Raises traídos de los descartados: foco de fila y columna atenuando el resto; cada carta numerada («2026 · Nº 17/56»); estado por la marca (dorso, ficha encima, cara), nunca solo por color; cambios en tiempo real que se mueven en su sitio y quedan resaltados hasta verlos; densidad: la mesa entera cabe en el móvil. Signature move: el reparto del naipe (sale de la mano, cruza en arco, cae boca arriba con golpe y «¡Órdago!», se da la vuelta y le cae el amarraco). Contador de cada fila: amarracos de dos en dos. Cumplida: filete del color del palo cortado por las pintas. Pendiente = naipe boca abajo con un amarraco encima. Rechazo = el naipe vuelve deslizándose al mazo. Cumplido = lluvia breve de amarracos.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
