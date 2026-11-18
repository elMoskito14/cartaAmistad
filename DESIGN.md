---
name: La Carta de la Amistad
description: La mesa del año de la cuadrilla, en naipes de baraja española sobre tapete de mus.
colors:
  tapete: "#1d5a3a"
  tapete-claro: "#23704a"
  tapete-oscuro: "#123b26"
  fieltro-linea: "rgba(255, 255, 255, 0.14)"
  sobre-tapete: "#f3f7f2"
  sobre-tapete-suave: "#b9d3c2"
  naipe: "#ffffff"
  naipe-borde: "#e6e1d6"
  tinta: "#1b1b1b"
  tinta-suave: "#4d4a45"
  oros: "#d9a21b"
  oros-oscuro: "#8f6609"
  copas: "#c0282d"
  copas-oscuro: "#8e1b20"
  espadas: "#2a5aa8"
  espadas-oscuro: "#1b3d75"
  bastos: "#8a5a2b"
  bastos-oscuro: "#5e3c1a"
  dorso: "#b5232a"
  dorso-trama: "#951b21"
  amarraco: "#e8b93b"
  amarraco-sombra: "#9b7514"
  boton: "#e8b93b"
  boton-hover: "#f2c856"
  resalte: "#ffd75e"
  amarraco-brillo: "#fbe39b"
  banda-demo: "rgba(0, 0, 0, 0.22)"
  velo-hoja: "rgba(8, 26, 16, 0.6)"
  campo-fondo: "#fbfaf7"
  campo-borde: "#cfc8b8"
  campo-placeholder: "#6f6a60"
  hoja-hover: "#f5f2ea"
  cerrar-hover: "#f1eee7"
  seleccion-fondo: "#e8f1ea"
  desactivado-fondo: "#cfc6b0"
  desactivado-texto: "#5a5546"
  error-fondo: "#fbe7e7"
  error-texto: "#7d1419"
  estado-fondo: "#eef2ee"
  pendiente-fondo: "#fbf0d2"
  pendiente-texto: "#6b4d06"
  cumplida-fondo: "#dcefe2"
  cumplida-texto: "#124128"
typography:
  display:
    fontFamily: "Bitter, Georgia, serif"
    fontSize: "23px"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.01em"
  display-escritorio:
    fontFamily: "Bitter, Georgia, serif"
    fontSize: "30px"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.01em"
  grito:
    fontFamily: "Bitter, Georgia, serif"
    fontSize: "38px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.01em"
  favor-grande:
    fontFamily: "Bitter, Georgia, serif"
    fontSize: "19px"
    fontWeight: 600
    lineHeight: 1.3
  favor:
    fontFamily: "Bitter, Georgia, serif"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: 1.3
  cuerpo-pequeno:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.4
  mesa-cabecera:
    fontFamily: "Bitter, Georgia, serif"
    fontSize: "12px"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "0.02em"
  mesa-cabecera-densa:
    fontFamily: "Bitter, Georgia, serif"
    fontSize: "10px"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  nota:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.3
  nota-mesa:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.15
  headline:
    fontFamily: "Bitter, Georgia, serif"
    fontSize: "22px"
    fontWeight: 800
    lineHeight: 1.15
  numeral:
    fontFamily: "Bitter, Georgia, serif"
    fontSize: "40px"
    fontWeight: 800
    lineHeight: 1
    fontFeature: "tnum"
  title:
    fontFamily: "Bitter, Georgia, serif"
    fontSize: "20px"
    fontWeight: 800
    lineHeight: 1.1
  button:
    fontFamily: "Bitter, Georgia, serif"
    fontSize: "18px"
    fontWeight: 800
    lineHeight: 1.1
  body:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.2
  caption:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.35
  card-index:
    fontFamily: "Bitter, Georgia, serif"
    fontSize: "9px"
    fontWeight: 800
    lineHeight: 1
    fontFeature: "tnum"
rounded:
  filete: "2px"
  naipe: "4px"
  celda-cabecera: "6px"
  naipe-vuelo: "7px"
  selector: "8px"
  campo: "10px"
  boton: "12px"
  hoja: "18px"
  control: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "20px"
  xl: "32px"
  xxl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.boton}"
    textColor: "{colors.tinta}"
    typography: "{typography.button}"
    rounded: "{rounded.boton}"
    padding: "12px 22px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.boton-hover}"
    textColor: "{colors.tinta}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.tinta}"
    rounded: "{rounded.boton}"
    padding: "10px 18px"
    height: "44px"
  tab-pill:
    backgroundColor: "transparent"
    textColor: "{colors.sobre-tapete}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    height: "40px"
  tab-pill-active:
    backgroundColor: "{colors.naipe}"
    textColor: "{colors.tapete-oscuro}"
  year-pill:
    backgroundColor: "{colors.amarraco}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.control}"
    padding: "6px 12px 6px 14px"
  input-field:
    backgroundColor: "#fbfaf7"
    textColor: "{colors.tinta}"
    rounded: "{rounded.campo}"
    padding: "10px 12px"
    height: "46px"
  sheet:
    backgroundColor: "{colors.naipe}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.hoja}"
    width: "560px"
  naipe-dorso:
    backgroundColor: "{colors.dorso}"
    rounded: "{rounded.naipe}"
  naipe-cara:
    backgroundColor: "{colors.naipe}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.naipe}"
---

# Design System: La Carta de la Amistad

## Overview

**Creative North Star: "El Tapete del Mus"**

Toda la app es una mesa de mus: un tapete de fieltro verde con viñeta y grano, y encima naipes de baraja española. La información no vive en barras ni en avatares, vive en la carta: boca abajo está por usar, boca abajo con un amarraco encima espera respuesta, boca arriba ya se ha jugado. El estado se lee por la marca física (dorso, ficha, cara, pip hueco o lleno, filete), nunca solo por el color.

La densidad es la de una mesa de juego: la matriz entera de la cuadrilla cabe en el móvil sin scroll, con naipes pequeños y números de esquina diminutos. El oro del amarraco es la única voz cálida sobre el verde; los cuatro palos son la identidad de cada persona. Lo que sale del tapete y pide atención (una hoja, un aviso) es papel blanco de naipe, en modo claro.

El movimiento es gesto de jugador: el naipe sale de la mano, cruza en arco, golpea la mesa con «¡Órdago!», se da la vuelta y le cae el amarraco. Todo con una única curva de salida rápida y frenada larga.

**Key Characteristics:**
- Fondo único de fieltro verde con viñeta radial y grano de ruido fijo.
- Naipe 2:3 con esquinas de 4px como unidad de información; cuatro estados legibles sin color.
- Palos dibujados a mano en SVG como color de identidad por persona.
- Amarraco dorado como ficha de conteo, siempre con el mismo degradado de relieve.
- Bitter 800 para títulos, números y botones; Barlow para todo lo demás.
- Controles estándar (píldoras, botón, campos) teñidos con el mundo, no inventados.

## Colors

Verde de tapete como suelo, blanco de naipe como superficie, oro de amarraco como acento único y cuatro colores de palo como identidad.

### Primary
- **Oro de Amarraco** (amarraco / boton): las fichas de conteo, la píldora del año, el botón principal «Echar carta», las cifras de los premios y la selección de texto. Es el único acento cálido sobre el verde.
- **Oro Encendido** (boton-hover): estado hover del botón principal.
- **Oro de Foco** (resalte): anillo de foco global (2px, desfase 2px), contorno de naipe nuevo y nombre propio («yo») en la mesa.

### Secondary
- **Rojo de Dorso** (dorso) con **Trama de Dorso** (dorso-trama): el reverso de todos los naipes, con trama diagonal cruzada a 45° y −45°.

### Tertiary: los cuatro palos
- **Oros** (oros / oros-oscuro), **Copas** (copas / copas-oscuro), **Espadas** (espadas / espadas-oscuro), **Bastos** (bastos / bastos-oscuro). Cada persona tiene un palo; el claro rellena el pip y el oscuro lo perfila. El palo también tiñe el filete de la carta cumplida. Copas presta además su rojo al contador de la pestaña y al trazo de «¡Órdago!».

### Neutral
- **Fieltro** (tapete), **Fieltro Iluminado** (tapete-claro), **Fieltro Hondo** (tapete-oscuro): las tres paradas de la viñeta del fondo; el hondo también es el texto de la pestaña activa y el degradado del pie fijo.
- **Costura de Fieltro** (fieltro-linea): blanco al 14% para divisores y el hueco discontinuo de la casilla propia.
- **Tiza** (sobre-tapete) y **Tiza Gastada** (sobre-tapete-suave): texto principal y secundario sobre el verde.
- **Naipe** (naipe) y **Canto de Naipe** (naipe-borde): cara de la carta, hojas, avisos y pestaña activa.
- **Tinta** (tinta) y **Tinta Suave** (tinta-suave): texto sobre papel y sobre oro.
- **Brillo de Amarraco** (amarraco-brillo): la luz del degradado de cada ficha; nunca se usa sola.
- **Sombra de Banda** (banda-demo) y **Velo de Mesa** (velo-hoja): oscurecen el fieltro bajo la banda demo y detrás de una hoja abierta.
- **Papeles de la hoja**: Papel de Campo (campo-fondo), Canto de Campo (campo-borde), Lápiz (campo-placeholder), Papel Tocado (hoja-hover), Papel Pulsado (cerrar-hover) y Fieltro Lavado (seleccion-fondo) para la persona elegida.
- **Estados en papel**: Oro Apagado y Tinta Apagada para el botón desactivado; Copa Lavada y Copa Honda para errores; y las etiquetas del detalle, Gris Fieltro (aceptada), Oro Lavado con Oro Hondo (pendiente) y Fieltro Claro con Fieltro Profundo (cumplida).

### Named Rules
**La Regla del Oro Único.** El oro es el único acento sobre el tapete: fichas, año, botón principal, cifras. No se introduce un segundo acento.

**La Regla del Palo es Persona.** Los colores de palo identifican personas y nada más. No se usan para estados, categorías ni decoración.

**La Regla de la Marca antes que el Color.** Todo estado tiene una marca física (dorso, ficha, cara, pip hueco o lleno, filete cortado). El color la refuerza, nunca la sustituye.

## Typography

**Display Font:** Bitter (con Georgia, serif), pesos 600 y 800 cargados; en uso, 800.
**Body Font:** Barlow (con system-ui, sans-serif), pesos 400, 500, 600 y 700.

**Character:** Bitter 800 es la tinta impresa del naipe y del cartel de la partida: pesada, con remates cortos, para nombres de premio, números y botones. Barlow es la voz llana de la mesa, estrecha y legible a 11–15px en la matriz densa.

### Hierarchy
- **Display** (Bitter 800, 23px móvil / 30px desde 1024px, interlineado 1.02, −0.01em): la marca «La Carta de la Amistad», en dos líneas.
- **Headline** (Bitter 800, 22px, 1.15): títulos de sección y de hoja, con `text-wrap: balance`.
- **Numeral** (Bitter 800, 40px, 1, cifras tabulares): el valor de cada premio, en oro.
- **Title** (Bitter 800, 20px, 1.1): nombre de premio; en la Bandeja, 17px.
- **Button** (Bitter 800, 18px, 1.1): el botón principal; la línea secundaria del botón vuelve a Barlow 500 13px.
- **Body** (Barlow 400, 16px, 1.45): texto base.
- **Label** (Barlow 600, 14–15px): pestañas, nombres de fila, etiquetas de campo, ganadores.
- **Caption** (Barlow 500, 11–13px, Tiza Gastada): leyendas, cabeceras de la matriz, ayudas.
- **Card index** (Bitter 800, 9px en la mesa, 18px en el naipe grande, 15px en vuelo; tabulares): el número de carta en la esquina del naipe. En la mesa densa no se pinta: queda en el detalle.
- **Grito** (Bitter 800, 38px, letra blanca con trazo copas de 7px): «¡Órdago!», solo en el vuelo.
- **Favor** (Bitter 600, 17px en la Bandeja, 19px en el detalle, 1.3): el texto del favor, entre comillas latinas.
- **Cuerpo pequeño** (Barlow 500, 14px): subtítulos de sección, metadatos de una petición y opciones de la hoja.
- **Cabecera de mesa** (Bitter 800, 12px; 10px y −0.03em en la mesa densa): abreviaturas de columna, dos letras sin repetirse (Gomez y Gorka: GZ y GK).
- **Nota** (Barlow 600, 12px) y **Nota de mesa** (Barlow 500, 11px): leyenda de estados, contadores, «Pide a quién» y «Echa».

### Named Rules
**La Regla de la Tinta de Naipe.** Todo número que cuenta algo (número de carta, cifra de premio, año, iniciales de columna) va en Bitter 800 con cifras tabulares.

**La Regla Sin Versalitas.** No hay texto en mayúsculas espaciadas ni etiquetas sobre los títulos; la jerarquía la hacen el peso y el tamaño. El único tracking es el −0.01em de la marca y del grito y el +0.02em de las iniciales de columna.

## Layout

Una sola columna centrada de hasta 1180px con 12px de margen lateral en móvil. El contenido se apila con 32px de separación.

**La mesa** es una tabla de rejilla fija: columna de nombres de 64px (96px desde 720px), una columna por persona con su inicial y su palo, y una columna final de tanteo de 34px (52px desde 720px). Separación entre naipes de 4px × 6px en móvil y 8px × 8px desde 720px. La diagonal (tu propia casilla) es un hueco discontinuo, no un naipe.

**Móvil (hasta 1023px):** pestañas en píldora a todo el ancho (Mesa / Ranking / Bandeja con contador); la mesa entera cabe en 390px sin scroll; el botón «Echar carta» queda fijo abajo, sobre un degradado de Fieltro Hondo al 55% hacia transparente, con el área segura respetada. El contenido reserva 120px abajo para no quedar tapado.

**Escritorio (desde 1024px):** dos columnas, mesa a 1.6fr y aside de ranking a mínimo 320px, separadas 64px. La pestaña Ranking desaparece (las pestañas se limitan a 420px). La mesa se dimensiona por el alto de la ventana para que se vean las ocho filas: `clamp(520px, min(52vw, (100vh − 364px) × 0.6667 + 220px), 760px)`, centrada. El botón fijo desaparece y pasa a la cabeza del aside, a todo su ancho, con 28px debajo.

**Hojas:** en móvil suben desde abajo a todo el ancho (máx. 560px, alto máx. min(88dvh, 760px)); desde 720px se centran.

### Named Rules
**La Regla de la Mesa Entera.** La matriz completa de la cuadrilla se ve sin scroll: en móvil por densidad, en escritorio por el alto de la ventana. Ninguna acción tapa la mesa en escritorio.

## Elevation & Depth

Profundidad física, como objetos sobre una mesa: los naipes proyectan una sombra corta y doble sobre el fieltro, lo que se levanta proyecta más y lo que vuela proyecta mucho. El fondo no tiene capas: es un solo tapete con viñeta radial (elipse 120% × 80% centrada al 30% de alto, de Fieltro Iluminado a Fieltro a Fieltro Hondo, fijada al viewport) y un grano de ruido fractal SVG de 160px al 18% de opacidad, fijo y sin eventos.

### Shadow Vocabulary
- **Naipe en mesa** (`0 1px 2px rgba(0,0,0,0.35), 0 3px 8px rgba(0,0,0,0.18)`): todo naipe y mininaipe en reposo, y las tarjetas de la Bandeja.
- **Levantado** (`0 6px 14px rgba(0,0,0,0.35), 0 2px 4px rgba(0,0,0,0.25)`): naipes de la fila y columna enfocadas (con −3px de altura) y el aviso flotante.
- **Botón** (`0 4px 14px rgba(0,0,0,0.28), 0 1px 3px rgba(0,0,0,0.2)`; al pulsar, `0 2px 6px rgba(0,0,0,0.25)` y 1px abajo).
- **Hoja** (`0 -10px 40px rgba(0,0,0,0.35)`): la hoja proyecta hacia arriba sobre un velo `rgba(8,26,16,0.6)`.
- **En vuelo** (`0 14px 30px rgba(0,0,0,0.4), 0 3px 6px rgba(0,0,0,0.3)`): solo el naipe del vuelo.
- **Ficha** (`0 2px 3px rgba(0,0,0,0.45)`, 1px en el tanteo): el amarraco siempre se apoya.

### Named Rules
**La Regla de la Sombra Blanda.** Las sombras son difusas y verticales, como luz cenital sobre un tapete. No hay sombras desplazadas duras ni bordes de color en lugar de sombra.

## Shapes

El naipe manda: rectángulo 2:3 con esquinas de 4px y un filete interior a 3px del borde con esquinas de 2px. El dorso lleva canto blanco de 2px, un marco interior blanco al 50% y un medallón oval central. El amarraco es una elipse de proporción 1.35 con degradado radial desde `#fbe39b` al 35%/30%. Los controles que no son naipe son redondeados y blandos: píldoras de 999px para pestañas, año y botones de cabecera; 12px para botones; 10px para campos y avisos internos; 18px para hojas (solo arriba en móvil). Radios menores, con nombre: filete (2px), celda de cabecera de la mesa (6px), naipe en vuelo (7px, el naipe grande de 96px) y selector de la banda demo (8px).

## Components

### El naipe (componente firma)
Una carta por pareja «quién pide a quién». Cuatro estados, todos legibles sin color:
- **Sin echar:** dorso rojo con trama diagonal, canto blanco y medallón.
- **Pedida:** dorso con un amarraco centrado encima (46% del ancho), elevado con su sombra de ficha.
- **Aceptada:** boca arriba; pip del palo hueco (solo contorno oscuro) al 56% del ancho y filete interior en tinta al 18%.
- **Cumplida:** boca arriba; pip lleno, filete de 1.5px en el color del palo a opacidad plena, cortado arriba y abajo en el tercio central (las pintas), y el número de esquina abre su propio hueco en el filete.
- **Propia:** la diagonal es un hueco de 1.5px discontinuo en Costura de Fieltro.
- **Nuevo:** contorno Oro de Foco de 2px que se asienta dos veces (1.6s) hasta verse.
- **Foco de persona:** al tocar un nombre, su fila y su columna se levantan 3px con sombra Levantado y el resto baja a opacidad 0.3 con saturación 0.5.
El volteo es 3D real: cara y dorso superpuestos con `backface-visibility: hidden`.

### Palos
Cuatro pictogramas propios en SVG de 24×24 (oro con dos anillos y punto, copa, espada con guarnición y pomo, basto nudoso), relleno del tono claro y trazo de 1.4px del tono oscuro. Variante hueca sin relleno para «aceptada». Acompañan siempre al nombre de cada persona.

### Tanteo de amarracos
Contador de cada fila: un amarraco por carta echada, en rejilla de dos columnas (11×8px, 13×10px desde 1024px, 3px de separación), como se cuentan de dos en dos en la mesa de mus. En el ranking, fichas de 16×12px llenas para cartas echadas y huecas (contorno 1.5px Tiza Gastada) para recibidas.

### Buttons
- **Shape:** esquinas suaves (12px), alto mínimo 48px.
- **Primary:** Oro de Amarraco con Tinta, Bitter 800 18px, sombra Botón. Puede llevar una segunda línea en Barlow 500 13px («Te quedan 5 de 7»).
- **Hover / Active:** hover a Oro Encendido; al pulsar baja 1px y la sombra se acorta. Transiciones de 0.2s con la curva de salida.
- **Disabled:** `#cfc6b0` con texto `#5a5546`, sin sombra.
- **Secondary:** contorno de 1.5px en `currentColor`, transparente, Barlow 600 15px, alto 44px; hover con velo negro al 5%.
- **Botón de cabecera:** píldora con borde blanco al 35%, Barlow 600 14px, hover blanco al 10%.

### Pestañas en píldora
Píldoras de igual ancho, alto 40px, borde blanco al 32%, Barlow 600 15px. Seleccionada: rellena de Naipe con texto Fieltro Hondo. Hover: blanco al 8%. El contador de pendientes es una cápsula Copas con número blanco 12px.

### Píldora del año
Oro de Amarraco, Bitter 800 15px, con el `select` nativo invisible encima; el foco se dibuja en la píldora entera.

### La hoja (diálogo)
`dialog` nativo en papel de naipe, modo claro dentro del mundo oscuro. Sube 40px con fundido en 0.42s; el velo entra en 0.3s. Cabecera con título Headline y botón cerrar circular de 40px. Cuerpo con 20px de margen y desplazamiento propio.

### Inputs / Fields
- **Style:** fondo `#fbfaf7`, borde 1.5px `#cfc8b8`, esquinas de 10px, alto 46px; cursor de texto en Copas.
- **Focus:** borde Fieltro y halo de 3px `rgba(29,90,58,0.2)`.
- **Error:** caja `#fbe7e7` con texto `#7d1419`.
- **Elegir destinatario:** la mano de mininaipes (44px) en rejilla; la opción elegida se levanta 4px con borde Fieltro y fondo `#e8f1ea`.

### Movimiento
Una curva para todo: salida `cubic-bezier(0.16, 1, 0.3, 1)`.
- **El reparto (vuelo):** el naipe (96×144px) sale de abajo del centro, cruza en arco con giro de −14° a 10° y escala 0.85 a 1.12 a la de la casilla (1.05s); golpe en la mesa (escala ×1.18, 0.22s) a la vez que entra «¡Órdago!» (Bitter 800 38px blanco con contorno Copas de 7px, de escala 1.7 y −14° a −6°, 0.32s); se da la vuelta (rotateY 180°, 0.34s); cae el amarraco desde 36px arriba (0.28s); el grito se desvanece subiendo 12px. Menos de 3s.
- **Rechazo (alMazo):** el naipe pedido se levanta, gira −8° y se desliza al mazo (−60px, −26px, −24°, escala 0.8) hasta desaparecer en 0.9s, tras 0.2s.
- **Cumplido:** lluvia de 12 amarracos que saltan en abanico desde la carta y caen 90px, girando, en 1s.
- **Respuesta en la Bandeja:** la tarjeta sale 120px a la izquierda con −6° en 0.35s.
- **Movimiento reducido:** no hay vuelo (la carta aparece en su sitio y lo confirma un aviso), no hay lluvia, la Bandeja solo funde, y todas las animaciones y transiciones CSS duran 0.01ms. El volteo de estado sigue legible porque la marca no depende del movimiento.

## Do's and Don'ts

### Do:
- **Do** representar cada favor como un naipe 2:3 de 4px de esquina y comunicar su estado con dorso, amarraco, pip hueco o lleno y filete.
- **Do** usar el amarraco con su degradado de relieve (`#fbe39b` → amarraco → amarraco-sombra) y su sombra de apoyo siempre que se cuente algo.
- **Do** acompañar el nombre de cada persona con su palo en SVG.
- **Do** poner sobre el tapete solo Tiza y Tiza Gastada; lo que se lee en papel va en Naipe con Tinta.
- **Do** usar la curva `cubic-bezier(0.16, 1, 0.3, 1)` en todas las transiciones y dar a cada animación su versión quieta.
- **Do** mantener la mesa entera a la vista: CTA fijo abajo en móvil, en la cabeza del aside en escritorio.

### Don't:
- **Don't** usar dashboards de avatares, barras de progreso o anillos para mostrar quién ha usado su carta.
- **Don't** distinguir estados solo por color.
- **Don't** usar los colores de palo para nada que no sea la identidad de una persona.
- **Don't** añadir un segundo acento cálido junto al oro ni teñir botones con colores de palo.
- **Don't** poner etiquetas en mayúsculas espaciadas sobre los títulos.
- **Don't** sustituir los palos dibujados por glifos tipográficos o emojis de baraja francesa.
- **Don't** usar sombras desplazadas duras ni fondos planos sin fieltro.
