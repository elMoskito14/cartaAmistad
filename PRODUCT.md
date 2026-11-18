# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) + TypeScript + Supabase (Postgres, auth por enlace mágico, Realtime). Despliegue en Vercel, plan gratuito. Elegido por el usuario en el brief.

## Users

Los miembros de una cuadrilla de amigos. Abren la web casi siempre desde el móvil, normalmente desde un enlace en el grupo de WhatsApp, para cotillear el tablero o para gastar una carta. Uno de ellos hace de administrador y da de alta a los miembros.

## Product Purpose

Digitalizar la tradición de "la carta de la amistad": llevar la cuenta de quién ha gastado su carta con quién, pedir favores desde la web y darle a la tradición un escenario divertido. Éxito: la cuadrilla la usa como fuente de verdad del año y se pica con la clasificación.

## Positioning

No es un gestor de favores genérico: es el registro de un ritual concreto de una cuadrilla concreta, con sus reglas (una carta por pareja y dirección al año) y su humor.

## Operating Context

- Ritual anual: el contador se reinicia el 1 de enero.
- Uso social: se mira en grupo, se comenta en WhatsApp, se presume de la clasificación.

## Capabilities and Constraints

- Cada persona tiene, por año, una carta con cada otro miembro. La carta es direccional: que A use su carta con B no gasta la de B con A. N personas → N×(N−1) cartas por año.
- Las cartas no usadas caducan el 1 de enero; no se acumulan.
- Estados de una carta: disponible, pendiente (pedida, sin respuesta), aceptada, cumplida. Si el destinatario rechaza el favor, la carta vuelve a estar disponible.
- El texto del favor es visible para toda la cuadrilla.
- Regla en base de datos: una única carta por (de, para, año), con RLS para que solo puedas gastar tus propias cartas.
- Vistas: tablero N×N (filas quien pide, columnas a quien), clasificación con histórico por años, pedir favor, bandeja del destinatario.
- Idioma: solo castellano.
- La cuadrilla son 12 personas: David (admin), Fran, Gomez, Gorka, Igor, Motx, Murua, Olaf, Sein, Jon, Omar y Urko. El seed usa sus nombres con dos años de favores y fechas inventados, solo para ver la mesa llena. Con más de 9 personas la mesa pasa a modo denso.

## Brand Commitments

- Nombre: "La Carta de la Amistad". La cuadrilla no tiene otro nombre ni mote que usar.
- Tono cálido y con humor, nada corporativo.
- Mundo elegido por el usuario: la mesa de mus con la baraja española («El Tapete del Mus»). Cada carta de la amistad es un naipe; gastarla es «echar carta» y el grito es «¡Órdago!». (La idea inicial de hundir la flota quedó descartada.)

## Evidence on Hand

No hay fotos, avatares ni historial real de cartas. No inventar historial presentado como real: el seed es de ejemplo.

## Product Principles

1. La regla manda: lo que la tradición no permite, la web no lo permite (y la base de datos tampoco).
2. Cotilleable de un vistazo: en el móvil, en segundos, se ve quién ha gastado qué.
3. Gastar una carta es un momento: tiene que sentirse como un acontecimiento.
4. Humor de cuadrilla, nunca humillación: los rankings pican, no señalan.

## Accessibility & Inclusion

Respetar `prefers-reduced-motion`: cada animación tiene versión sin movimiento. Estados del tablero distinguibles sin depender solo del color.
