# Diseño — Rediseño visual "HOJA DE ESPECIFICACIÓN" · Portafolio de Nicolás Espitia

> Iteración 1 (no existe `design-review.json` en la carpeta de la tarea al momento de escribir este documento).

## 1. Visión general

El rediseño convierte el portafolio en una **hoja de especificación técnica navegable**: una lámina de ingeniería con retícula visible, líneas de cota, numeración de secciones, etiquetas de notación y lectura de datos en monoespaciada. El sitio actual comunica "producto digital oscuro y pulido" mediante superficies con radios grandes, orbes difuminados, degradados mint y mockups ilustrativos. El sitio rediseñado comunica "instrumento de precisión": fondo grafito-azulado casi plano, cero desenfoques, esquinas rectas, jerarquía construida con filetes de 1 px y espacio en blanco, un único color de señal ámbar usado como marcador y no como decoración, y visuales de proyecto que son **esquemas técnicos cotados** en lugar de maquetas ilustradas. El movimiento se mantiene al mismo nivel de acabado pero cambia de registro: en vez de inclinación 3D y botones magnéticos, el sistema usa barridos de instrumento, trazado de reglas por escala, revelados escalonados y un cursor de retícula (crosshair) sobre las láminas.

La dirección es realizable íntegramente en HTML/CSS/JS vanilla, sin dependencias ni pasos de build, y reduce el CSS (objetivo ≤ 55 KB frente a ≈95 KB actuales) porque los cuatro mockups bespoke se sustituyen por un único componente de lámina con cuatro esquemas SVG inline.

Todo el contenido del inventario de requisitos sobrevive literalmente y en español; `server.js`, `package.json` y el contrato `POST /api/contact` no se tocan.

---

## 2. Decisiones cerradas (preguntas abiertas de los requisitos)

| # | Pregunta | Decisión | Razón |
|---|---|---|---|
| 1 | Metáfora visual rectora | **Hoja de especificación / plano cotado** (datasheet + acotación). Se descartan "terminal/consola" y "brutalismo editorial". | El contenido ya está estructurado como una ficha técnica (índices `01 / PERFIL`, cifras, listas de stack, numeración de proyectos). La metáfora de plano cotado explota esa estructura sin inventar nada, es poco común en portafolios (frente a la estética terminal, que es un cliché saturado) y da un repertorio gráfico propio: filetes, topes de cota, marcas de esquina, notación de sección. "Brutalismo editorial" chocaría con el requisito de registro profesional y acabado alto. |
| 2 | Paleta | Oscuro de **temperatura fría (grafito-azul)** casi monocromo + **un único acento señalizador ámbar `#FFB54A`**. El mint `#67f5d2` se **retira por completo**. | Cambiar la temperatura del oscuro produce el salto perceptivo que pide RF-1 sin abandonar el tema oscuro (supuesto 4). Un acento ámbar de instrumento (lámpara de estado, anotación de plano) contrasta 11,08:1 sobre el fondo y no se parece al mint neón actual. Degradar el mint a secundario dejaría el rediseño leyéndose como "variante" del anterior. |
| 3 | Tipografía | **Archivo** (variable, 400–700) para display/UI + **JetBrains Mono** (400–700) para datos, etiquetas y notación. Se retiran Space Grotesk e IBM Plex Mono. | Archivo es una grotesca técnica de caja alta estrecha: a igual tamaño ocupa menos ancho que Space Grotesk (resuelve los desbordes de `h1` que hoy exigen tres media queries correctivas) y no tiene los rasgos geométricos "simpáticos" de Space Grotesk. JetBrains Mono tiene una voz de instrumento más marcada que IBM Plex Mono y distingue el registro de dato del de prosa. Ambas son variables en Google Fonts: 2 familias, 1 petición CSS, menos bytes que la carga actual de 7 pesos estáticos. |
| 4 | Retícula y composición | Retícula de **12 columnas con líneas de columna visibles** (filetes a 0,10 de alfa) + **carril de índice fijo a la izquierda** de 120 px en ≥1120 px. `--shell` pasa de 1220 px a **1320 px**. | La retícula expuesta es el núcleo del lenguaje de plano y es el cambio de composición más legible frente al actual contenedor centrado sin estructura visible. El carril de índice aporta la numeración de lámina y el indicador de progreso sin ocupar espacio de lectura. |
| 5 | Mockups de proyecto | **Sustituidos** por un sistema único de **lámina técnica**: marco cotado + esquema SVG inline abstracto por proyecto (4 variantes sobre el mismo esqueleto). Se conservan los textos de leyenda `Vista conceptual · …`. | Los cuatro mockups ilustrativos (teléfono, órbitas, agujero negro, navegador con sofá) son el elemento más "decorativo" del sitio actual y consumen la mayor parte de los ≈95 KB de CSS. Los esquemas cotados son coherentes con la metáfora, pesan una fracción y mantienen el mensaje "vista conceptual del producto" que los requisitos marcan como contenido. |
| 6 | Sistema de movimiento | Catálogo cerrado en §8: revelados `up`/`rule`/`wipe`/`rows`, barrido de instrumento continuo, latido de estado, cursor de retícula. **Tilt e imanes se retiran**. Sin contadores numéricos, sin `stroke-dashoffset`. | Tilt y magnetismo son firmas de la dirección anterior (y el tilt 3D riñe con la lectura de plano, que es ortogonal). El crosshair es la interacción de puntero equivalente en el nuevo lenguaje. Se descartan contadores porque mutarían contenido real (`SQL`, `COP`, `320+`, `7°` no son numéricos) y se descarta `stroke-dashoffset` para no animar propiedades de pintado (CA-13). |
| 7 | Navegación | Header fijo horizontal (misma mecánica que hoy) que **cambia de superficie al hacer scroll sin cambiar de altura**, + carril lateral de índice con barra de progreso. La píldora "Disponible para colaborar" se mantiene en el header en escritorio y pasa al panel móvil. | Conserva RF-4/RF-5 sin reescribir la mecánica probada. Animar la altura del header sería animar layout (prohibido por RNF-2); el cambio de estado se hace con color, filete y opacidad. |
| 8 | Jerarquía de Capacidades | **Matriz / tabla de especificaciones** de 4 filas (ref · dominio · descripción · stack) construida con CSS Grid y `<article>` + `<h3>`, no con `<table>`. | Una tabla visual es la expresión natural de "capacidades" en una hoja de especificación y rompe con la retícula de 4 tarjetas actual. Se evita `<table>` real porque el contenido no es tabular con cabeceras de datos, y el apilado responsive de una tabla real empeora la semántica para lectores de pantalla. |
| 9 | Modo claro | **Descartado.** El sitio permanece oscuro (`color-scheme: dark`). | No es requisito (supuesto 4), duplicaría el set de tokens y el trabajo de verificación de contraste, y la metáfora elegida está calibrada para fondo oscuro. |
| 10 | Captura `preview.png` | **Fuera de alcance**, como fijan los requisitos. | Se deja para un paso posterior si el usuario lo pide. |

---

## 3. Stack técnico (bloqueado al aprobar este diseño)

- **Lenguajes:** HTML5, CSS3 (CSS custom properties, Grid, Flexbox), JavaScript ES2020 en un único IIFE con `'use strict'`.
- **Fuentes:** Google Fonts, dos familias variables, una sola petición CSS verificada (HTTP 200, incluye subsets `latin` y `latin-ext`, necesarios para `á é í ó ú ñ`):
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100,400..700&family=JetBrains+Mono:wght@400..700&display=swap" rel="stylesheet">
  ```
- **Gráficos:** SVG inline (esquemas de lámina, flechas) y CSS (filetes, retícula, topes de cota). Sin imágenes rasterizadas nuevas, sin iconos de librería.
- **Servidor:** Express tal cual (`server.js` intacto). Sin bundler, sin preprocesador, sin paquetes npm nuevos, sin linter, sin runner de pruebas.
- **Características CSS/JS prohibidas en esta implementación** (por RNF-6, para no depender de degradaciones frágiles): `subgrid`, `@container`, animaciones dirigidas por scroll (`animation-timeline`), `view-transition`, `:has()`, `inert`, `clip-path` animado, `filter`/`backdrop-filter` en bucles. Permitidas y usadas: `:focus-visible`, `aspect-ratio`, `clamp()`, `min()`, `AbortController` en `fetch` y en `addEventListener({ signal })`, `IntersectionObserver` con detección de soporte.
- **Archivos tocados:** `public/index.html`, `public/style.css`, `public/script.js`, `public/favicon.svg`. Nada más.

---

## 4. Sistema de color

Escala de tinta fría (grafito-azul) + papel + un acento. Todos los valores van en `:root` de `style.css`.

```css
:root {
    /* Tinta: fondos y superficies */
    --ink-900: #0A0D12;   /* fondo base del documento */
    --ink-850: #0E131A;   /* franja de sección alterna */
    --ink-800: #121821;   /* superficie de panel/lámina */
    --ink-750: #18202B;   /* superficie elevada (hover de fila, campo enfocado) */
    --ink-700: #1F2935;   /* superficie de chip/tag */

    /* Papel: texto */
    --paper:      #EAF0F7;  /* texto principal, títulos */
    --paper-dim:  #B7C3D1;  /* prosa secundaria, descripciones */
    --paper-mute: #8A97A7;  /* metadatos, etiquetas mono, trazos de esquema */

    /* Filetes (no texto) */
    --rule-1: rgba(197, 214, 235, 0.10);  /* retícula de columnas, grid de lámina */
    --rule-2: rgba(197, 214, 235, 0.18);  /* separadores de sección y de fila */
    --rule-3: rgba(197, 214, 235, 0.46);  /* bordes de control (inputs, botones) */

    /* Señal: único acento */
    --signal:      #FFB54A;
    --signal-soft: rgba(255, 181, 74, 0.38);  /* topes de cota, marcas; nunca texto */
    --signal-wash: rgba(255, 181, 74, 0.08);  /* relleno de estado activo */

    /* Estados de formulario */
    --ok:    #6FDCA4;
    --alert: #FF7B7B;
}
```

### 4.1 Contrastes verificados (ratio WCAG calculado, no estimado)

| Par | Ratio | Uso | Cumple |
|---|---|---|---|
| `--paper` sobre `--ink-900` | **16,96:1** | Títulos, prosa principal | AAA |
| `--paper` sobre `--ink-800` | **15,54:1** | Texto en panel | AAA |
| `--paper` sobre `--ink-750` | **14,30:1** | Texto en fila hover / campo | AAA |
| `--paper-dim` sobre `--ink-900` | **10,88:1** | Prosa secundaria | AAA |
| `--paper-dim` sobre `--ink-800` | **9,96:1** | Descripciones en lámina/panel | AAA |
| `--paper-mute` sobre `--ink-900` | **6,55:1** | Metadatos mono 11–12 px | AA (texto normal) |
| `--paper-mute` sobre `--ink-800` | **6,00:1** | Etiquetas mono en panel | AA |
| `--paper-mute` sobre `--ink-750` | **5,52:1** | Etiquetas mono en superficie elevada | AA |
| `--signal` sobre `--ink-900` | **11,08:1** | `que conectan.`, números activos, anillo de foco | AAA |
| `--signal` sobre `--ink-800` | **10,15:1** | Marcadores en panel | AAA |
| `--ink-900` sobre `--signal` | **11,08:1** | Texto del botón primario (tinta sobre ámbar) | AAA |
| `--ok` sobre `--ink-800` | **10,57:1** | Mensaje de éxito del formulario | AAA |
| `--alert` sobre `--ink-800` | **7,10:1** | Mensaje de error del formulario | AA+ |
| `--rule-3` compuesto sobre `--ink-800` (= `#646F7E`) | **3,49:1** | Borde de input/botón secundario (componente no textual) | AA 1.4.11 (≥3:1) |
| `--rule-2` compuesto sobre `--ink-900` (= `#2C3139`) | 1,49:1 | Separadores **decorativos** únicamente | No aplica (no transmite información) |
| `--rule-1` compuesto sobre `--ink-900` (= `#1D2128`) | 1,20:1 | Retícula **decorativa** | No aplica |

Reglas derivadas, obligatorias en implementación:

1. **Nunca** se usa `--paper-mute` por debajo de 11 px ni sobre `--ink-700`.
2. Todo borde que delimite un control interactivo usa `--rule-3` (≥3:1). `--rule-1` y `--rule-2` solo decoran; si un filete comunica un estado (p. ej. campo enfocado), pasa a `--signal`.
3. **Presupuesto de acento:** el ámbar no supera ~2 % del área visible en ningún viewport. Usos permitidos y cerrados: (a) el span `que conectan.` del `h1`; (b) el marcador del enlace de navegación activo; (c) el relleno del botón primario y del botón de envío; (d) puntos de estado (`Disponible para colaborar`, `online`); (e) anillo de `:focus-visible`; (f) filete del campo de formulario enfocado; (g) la barra de progreso del carril; (h) exactamente un elemento por esquema SVG de lámina; (i) el número de referencia de la fila de capacidades en hover/foco. Cualquier otro uso se rechaza en revisión.
4. `meta theme-color` = `#0A0D12`; `meta color-scheme` = `dark`. `::selection` = fondo `--signal`, texto `--ink-900`.
5. El mint no aparece en ningún archivo del front. (Sigue existiendo en la plantilla de correo de `server.js`, que no se modifica: es un canal distinto y está fuera de alcance.)

---

## 5. Sistema tipográfico

```css
:root {
    --font-sans: "Archivo", "Segoe UI", system-ui, Arial, sans-serif;
    --font-mono: "JetBrains Mono", "Cascadia Mono", Consolas, monospace;
}
```

### 5.1 Escala

| Token | Valor | Familia / peso | Uso |
|---|---|---|---|
| `--t-h1` | `clamp(2.5rem, 1.4rem + 5.2vw, 5.25rem)`, lh `0.98`, ls `-0.03em` | Sans 600 | `h1` del hero (único) |
| `--t-h2` | `clamp(1.95rem, 1.35rem + 2.4vw, 3rem)`, lh `1.05`, ls `-0.02em` | Sans 600 | Títulos de sección |
| `--t-h3` | `clamp(1.2rem, 1.05rem + 0.55vw, 1.5rem)`, lh `1.18`, ls `-0.01em` | Sans 600 | Títulos de proyecto, fila de capacidad, etapas |
| `--t-lead` | `clamp(1.0625rem, 1rem + 0.45vw, 1.3rem)`, lh `1.55` | Sans 400 | Bajadas (`profile-lead`, descripciones de sección, `hero-intro`) |
| `--t-body` | `1rem`, lh `1.65` | Sans 400 | Prosa |
| `--t-body-sm` | `0.9375rem`, lh `1.6` | Sans 400 | Viñetas de proyecto, nota del formulario |
| `--t-data` | `clamp(1.5rem, 1.2rem + 1.4vw, 2.25rem)`, lh `1`, `tabular-nums` | Mono 500 | Cifras (`7°`, `04`, `SQL`, `03`, `2.5`, `COP`, `320+`, `Live`, `LTS`, `WA`, `08`, `02`, `07`) |
| `--t-meta` | `0.75rem`, lh `1.45`, ls `0.14em`, `uppercase` | Mono 500 | Índices de sección, etiquetas de campo, leyendas, chips de stack |
| `--t-micro` | `0.6875rem`, lh `1.4`, ls `0.18em`, `uppercase` | Mono 400 | Notación de lámina, numeración del carril, lecturas del crosshair |

Reglas tipográficas:

- **Prosa en sans, datos y etiquetas en mono.** Ningún párrafo va en monoespaciada; ninguna cifra ni etiqueta de notación va en sans. Esta separación es la que produce la lectura de "ficha técnica".
- `h1`/`h2` llevan `text-wrap: balance` (no-op donde no se soporta) y `overflow-wrap: break-word` como red de seguridad.
- A 360 px el `h1` resuelve a ≈41 px; la palabra más larga (`Ingeniería`, 10 caracteres) ocupa ≈218 px dentro de los 320 px disponibles. No se necesitan media queries correctivas de tamaño de `h1` (hoy hacen falta tres).
- Mono siempre con `font-variant-numeric: tabular-nums` y `font-feature-settings: "liga" 0` en las lecturas de datos para que los dígitos no salten durante los cambios de estado.
- `letter-spacing` positivo solo en mayúsculas mono; nunca en prosa.
- Pesos cargados: 400, 500, 600, 700 en ambos ejes variables (`wght 400..700`). No se usan 800/900: la jerarquía viene del tamaño y del color, no del grosor.

---

## 6. Espaciado, retícula y geometría

```css
:root {
    --s-1: 4px;  --s-2: 8px;  --s-3: 12px; --s-4: 16px; --s-5: 24px;
    --s-6: 32px; --s-7: 48px; --s-8: 64px; --s-9: 96px; --s-10: 128px;

    --shell: 1320px;            /* antes 1220px */
    --gutter: clamp(20px, 4vw, 56px);
    --gap: 24px;                /* 20px ≤900px, 16px ≤680px */
    --rail: 120px;              /* 0 por debajo de 1120px */
    --header-h: 72px;           /* 60px ≤900px */
    --section-y: clamp(72px, 9vw, 136px);

    --r-0: 0;    /* láminas, filas, chips: esquina recta */
    --r-1: 2px;  /* inputs, botones */
}
```

- **Escala base 4 px.** Todo margen, relleno y separación usa un token; nada de valores sueltos.
- **Contenedor:** `.sheet { width: min(100% - 2 * var(--gutter), var(--shell)); margin-inline: auto; }`.
- **Retícula:** `.sheet--grid { display: grid; grid-template-columns: var(--rail) repeat(12, minmax(0, 1fr)); column-gap: var(--gap); }`. Los contenedores anidados que necesiten alinearse repiten literalmente ese `grid-template-columns` (no se usa `subgrid`). Todo hijo de rejilla lleva `min-width: 0` para que ninguna palabra larga ensanche una pista.
- **Retícula visible:** capa fija `.blueprint-field[aria-hidden="true"]`, `position: fixed; inset: 0; z-index: -1; pointer-events: none`, con dos fondos: (a) líneas verticales de columna, `background-image: linear-gradient(90deg, var(--rule-1) 0 1px, transparent 1px)` con `background-size: calc(100% / 12) 100%`, limitada al ancho del shell y centrada; (b) sin rejilla horizontal (los horizontales los dan los separadores reales). `mask-image: linear-gradient(to bottom, #000 0%, #000 72%, transparent 100%)`. Reemplaza a `.page-atmosphere` con sus dos orbes `filter: blur(100px)` y el halo que seguía al puntero: se eliminan los tres (ganancia de pintado y coherencia conceptual).
- **Ritmo vertical:** cada sección lleva `padding-block: var(--section-y)` y un separador superior a sangre (`border-top: 1px solid var(--rule-2)`) con dos topes de cota de 6 px en los extremos del shell. Las secciones alternan `--ink-900` / `--ink-850`.
- **Geometría:** esquinas rectas en láminas, filas, chips y paneles; `--r-1` (2 px) solo en controles de formulario y botones. Sin sombras de elevación; la única sombra permitida es estática y nunca animada: `--shadow-panel: 0 24px 48px -32px rgba(0,0,0,.9)` en el panel del formulario.
- **Objetivos táctiles:** mínimo 44 × 44 px en ≤900 px para enlaces de navegación, botón de menú, CTAs, enlaces de contacto y de repositorio (se garantiza con `min-height: 44px` y relleno, no con `line-height`).
- **Anclas:** `html { scroll-padding-top: calc(var(--header-h) + var(--s-6)); scroll-behavior: smooth; }`.
- **Breakpoints:** 1120 px (colapsa el carril), 900 px (navegación móvil, una columna), 680 px (láminas compactas), 430 px (ajustes finos). Se mantienen los mismos umbrales que el sitio actual para no reintroducir regresiones ya resueltas.

### 6.1 Primitivas de lámina (componentes de notación)

Cinco primitivas CSS reutilizables; son la gramática del lenguaje visual y deben definirse una sola vez:

| Primitiva | Clase | Construcción | Uso |
|---|---|---|---|
| Filete | `.rule` | `height: 1px; background: var(--rule-2)` | Separadores dentro de bloques |
| Cota | `.cota` | Flex: tope 1px×6px + filete 1px flexible + tope; etiqueta mono `--t-micro` opcional al inicio | Encabeza títulos de sección, enmarca láminas por abajo |
| Marcas de esquina | `.plate` | 4 esquinas en L vía `background-image` con cuatro `linear-gradient` posicionados (`background-size: 10px 1px, 1px 10px, …`), `background-repeat: no-repeat` | Láminas (hero y proyectos), panel del formulario |
| Referencia | `.ref` | Mono `--t-meta`, `color: var(--paper-mute)` | Índices `01 / PERFIL`, números de proyecto, leyendas |
| Lectura | `.readout` | Mono `--t-micro`, `tabular-nums`, ancho fijo en `ch`, `contain: layout style` | Estado `online`, coordenadas del crosshair, progreso |

**Regla de honestidad de la notación:** la notación técnica solo puede mostrar (a) valores que ya existen en el contenido real (`01`–`04`, `7°`, `04`, `network_overview`, `online`, nombres de stack) o (b) métricas reales de la propia retícula o de la interacción (índice de columna, coordenada del puntero, porcentaje de progreso de scroll). Está **prohibido** inventar números con apariencia de dato del perfil (revisiones, versiones, fechas, tolerancias). Esto protege RF-3 y el criterio de aceptación 3.

---

## 7. Estructura de `index.html`

Orden y anclas sin cambios: `#inicio` → `#perfil` → `#capacidades` → `#proyectos` → especialización (sin id, `aria-labelledby="specialization-title"`) → `#contacto` → footer. Se conservan `main#main-content`, el skip link, `data-nav-section` en las cinco secciones ancladas, `lang="es"`, los metadatos, Open Graph, el `<title>` y el JSON-LD **sin un solo carácter de cambio**.

### 7.1 `head`

Sin cambios salvo: `theme-color` → `#0A0D12`; el `<link>` de fuentes → la URL de §3; y **un único script inline síncrono** antes de `</head>`:

```html
<script>
    // Habilita el estado inicial oculto de los revelados solo si hay movimiento permitido.
    // Síncrono y previo al primer pintado para evitar destellos.
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.classList.add('motion-ready');
    }
</script>
```

Motivo: el CSS mantiene el **estado final visible como valor por defecto** y solo oculta bajo `html.motion-ready` (invariante I-5, §12). Si esa clase la añadiera `script.js` (`defer`), existiría una ventana de un cuadro con el contenido ya visible que luego se oculta para animarse. `server.js` no envía cabecera `Content-Security-Policy`, por lo que el inline no requiere ajustes de servidor. Es el único script inline del documento.

### 7.2 Header (`#site-header`)

Rejilla de tres zonas: marca · navegación · estado.

- **Marca:** `a.brand[href="#inicio"]` con `aria-label` actual; `span.brand-mark` "NE" en mono 600 dentro de un cuadro de 1 px con marcas de esquina; `span.brand-pulse` se conserva como elemento y se reestiliza a punto cuadrado ámbar de 4 px.
- **Navegación:** `ul.nav-list` con los cinco enlaces y textos actuales (Inicio, Perfil, Stack, Proyectos, Contacto). Cada enlace lleva delante un `<span class="nav-index" aria-hidden="true">01</span>`…`05` en mono `--t-micro` (notación derivada del orden, no contenido nuevo), el rótulo en sans 500 y, debajo, un filete de 2 px que es el marcador de estado activo (ámbar, `scaleX`). `aria-current="location"` en el activo.
- **Estado:** `a.availability[href="#contacto"]` conserva el texto "Disponible para colaborar" y el punto `.availability-dot`; se reestiliza como chip mono de esquina recta con borde `--rule-3`. A la derecha, una `.readout` `aria-hidden="true"` muestra el índice de la sección visible (`§ 02 / CAPACIDADES`) solo en ≥1120 px; es cromo decorativo que reutiliza los rótulos ya existentes y la actualiza el mismo observador de secciones.
- **Estado al hacer scroll:** `header.is-scrolled` (ya implementado) cambia `background` de `transparent` a `rgba(10,13,18,0.92)`, aparece `border-bottom: 1px solid var(--rule-2)` y la `.readout` entra con opacidad. **La altura no cambia** (RNF-2: nada de animar layout).
- **Progreso:** `div.scroll-progress` de 1 px pegado al borde inferior del header, `transform: scaleX(var(--scroll-progress, 0)); transform-origin: left; background: var(--signal)`, `aria-hidden="true"`.
- **Botón de menú:** `#menu-toggle` con sus dos `<span>`; se reestiliza a dos filetes de 1 px dentro de un cuadro de 44 × 44 px; al abrir, los filetes rotan a cruz (`transform`, 240 ms).

### 7.3 Panel de navegación móvil (≤900 px)

`nav#primary-navigation` pasa a panel a pantalla completa bajo el header: `transform: translateY(-8px)` + `opacity 0` → `translateY(0)` + `opacity 1` en 240 ms; lista con filetes separadores, cada fila con su índice mono y 56 px de altura; la píldora de disponibilidad va al final. Mecánica de RF-5 conservada íntegra (`aria-expanded`, `aria-controls`, `aria-label` conmutado, cierre al pulsar enlace, cierre con `Escape`, cierre al superar 900 px al redimensionar, `body.menu-open { overflow: hidden }`). Añadidos de accesibilidad: al abrir, el foco pasa al primer enlace; al cerrar, vuelve al `#menu-toggle`. No se implementa trampa de foco (no lo pide RF-5 y una trampa parcial sería peor que ninguna); el panel está en orden de DOM inmediatamente después del botón, de modo que el recorrido con `Tab` es natural.

### 7.4 Hero `#inicio` — "LÁMINA 00 / CAJETÍN"

Composición en la rejilla de 12: carril con la notación `00`, copia en columnas 1–7, lámina en columnas 8–12, y un **cajetín** (bloque de rótulos de plano) a sangre del shell en la parte baja.

| Contenido real | Destino |
|---|---|
| Eyebrow "Ingeniería de Sistemas · 7° semestre · Colombia" | Fila superior de la lámina: filete + etiqueta mono `--t-meta`. El `span.eyebrow-line` se conserva como el filete. |
| `h1` "Ingeniería para sistemas **que conectan.**" | Display 600; `span.hero-highlight` ("que conectan.") en `--signal` con un filete ámbar de 2 px por debajo que se traza al cargar. |
| `p.hero-intro` (texto literal, `<strong>` incluidos) | Columnas 1–6, `--t-lead`, color `--paper-dim`; los `<strong>` en `--paper` 500. |
| CTAs "Explorar proyectos" / "Escribirme" | Botón primario (ámbar sólido, tinta) + botón secundario (borde `--rule-3`). Se elimina el atributo `data-magnetic`. |
| `dl.hero-facts` (Formación/7° semestre · Experiencia/Software + redes · Interés/Seguridad + cloud) con `aria-label="Resumen profesional"` | **Cajetín**: tres celdas separadas por filetes verticales, `dt` en mono `--t-meta` sobre `dd` en sans 500. Es la pieza que ancla la metáfora: un cajetín de plano con sus campos rotulados. |
| Lámina `figure.network-stage` | Ver 7.4.1 |
| `a.scroll-cue` "Descubrir" → `#perfil` | Esquina inferior derecha del cajetín, como cota con flecha: etiqueta mono + filete + punta. |

Se retiran `data-tilt` y `data-tilt-strength`.

#### 7.4.1 Lámina del hero

Se conserva todo el contenido declarado en el inventario y se rehace su ejecución:

- Cabecera de lámina en lugar de barra de ventana: se **elimina** `span.stage-window-dots` (los tres puntos tipo macOS son un cliché ajeno a la metáfora) y quedan `network_overview` (mono, izquierda) y `.stage-live` con el punto de estado + `online` (derecha).
- `svg.topology` (`role="img"` y su `aria-label` actual, literal): se redibuja en lenguaje de plano, mismo `viewBox` de 600 × 540:
  - **Trazado ortogonal**: los ocho enlaces curvos (`Q`) se sustituyen por polilíneas en ángulo recto con punto de unión de 2 px en cada codo. Es el cambio que convierte la "red orgánica" en un diagrama de instalación.
  - **Nodos rectangulares**: APP, WEB, DATA, SEC pasan de círculos con halo a cuadros de 1 px (64 × 28) con el rótulo mono centrado. Se eliminan `node-pulse`, `node-radar`, `node-halo` y el filtro `feGaussianBlur` (`#network-glow`) y el `linearGradient` — sin desenfoques ni degradados.
  - **Nodo central**: cuadro de 96 × 96 con marcas de esquina, `NE` en mono 600 y la leyenda `SYSTEMS` bajo una cota.
  - **Cotas**: dos líneas de cota con topes en los bordes izquierdo e inferior del dibujo (solo geometría, sin números inventados).
  - **Paquetes**: los cuatro `circle.topology-packets` se conservan como cuadros de 4 px que recorren los tramos rectos con `translate` (§8, A3).
- Las dos `div.stage-card` dejan de flotar como tarjetas de vidrio y se convierten en dos filas de lectura ancladas al pie de la lámina, con sus textos literales: `Proyectos seleccionados / 04 / ai · mobile · web · game` y `Enfoque profesional / Redes & seguridad` (el `span.stage-card-icon` "↗" se conserva).
- `figcaption.sr-only` literal, sin cambios.

### 7.5 `#perfil` — `01 / PERFIL`

Carril: `p.section-index` "01 / PERFIL" (texto literal) + filete vertical que recorre la sección y aloja la barra de progreso de la sección.

- `h2` "Base técnica.<br><span>Visión integral.</span>" literal; el `span` en `--paper-dim`.
- `p.profile-lead` literal con sus `<em>`; los `<em>` se marcan con `--paper` 500 + un subrayado de 1 px `--rule-3` (no cursiva pintada de color).
- `div.profile-copy`: los dos párrafos literales, columnas 1–7, medida máxima 68 caracteres.
- `div.profile-stats` (7° / Semestre actual · 04 / Proyectos destacados · SQL / + NoSQL & cloud) → tres **cotas de dato**: cifra en mono `--t-data`, filete con topes, etiqueta en mono `--t-meta`. Ocupan las columnas 1–7 por debajo de la prosa.
- `aside.path-card` (PERFIL / 2026, "Séptimo semestre", `h3#path-title` "Ingeniería aplicada", `ol.path-list` con las tres etapas y sus textos literales) → **tabla de etapas** en columnas 8–12: encabezado con los rótulos existentes, filas con filete superior, marcador cuadrado (`span.path-marker`) y la jerarquía `small` → `strong` → `p`. La etapa `is-current` lleva marcador ámbar relleno y se añade `<span class="sr-only">Etapa actual</span>` (mejora de accesibilidad: hoy el estado solo existe en color/forma). `aria-labelledby="path-title"` se conserva.

### 7.6 `#capacidades` — `02 / CAPACIDADES`

- `header.section-heading--split`: índice literal, `h2` "Capacidades para<br><span>soluciones conectadas.</span>" en columnas 1–7, bajada literal en columnas 9–12.
- **Matriz de especificaciones**: `div.spec-table` con una fila de cabecera visual `aria-hidden="true"` (`REF · DOMINIO · DESCRIPCIÓN · STACK`, rótulos de UI nuevos y mínimos, admitidos por RF-3) y cuatro `article.spec-row` en rejilla `1fr` partida en `[72px] [3fr] [4fr] [4fr]` en ≥1120 px.
  - Cada fila: `span.capability-number` (`01`–`04`, mono `--t-data` a tamaño reducido) · `h3` literal · `p` literal · `ul.tag-list` con su `aria-label` literal y todos los chips de stack literales.
  - La fila 04 conserva `span.learning-label` "SISTEMAS INTELIGENTES E INTERACTIVOS" como etiqueta mono sobre el `h3`.
  - Se **eliminan** los glifos decorativos `⌘ ⌁ ◎ AI` (`span.capability-symbol`, hoy `aria-hidden`): son iconografía genérica de plantilla y el criterio de aceptación 2 la prohíbe explícitamente. La referencia numérica cumple su función.
- ≤900 px: cada fila se apila en bloque (ref + título en una línea, descripción, chips), separada por filetes. Sin scroll horizontal.

### 7.7 `#proyectos` — `03 / PROYECTOS`

- Encabezado con índice, `h2` y bajada literales.
- Cuatro `article.project-case` como **láminas numeradas**, alternando lado (`--reverse` solo en ≥1120 px vía `order`; en móvil el orden visual es el orden del DOM: lámina → ficha).
- Columna de ficha, con todo el contenido literal:
  - `project-number` (`01`–`04`) y `project-status` con su punto y su texto (`IA multimodal · Android`, `Aplicación móvil · Académico`, `Proyecto de grado · En desarrollo`, `Catálogo digital · Comercial`).
  - `h3` con el nombre **sin `<br>`**: `MotoCheck`, `Neogranada Conecta`, `Black Hole Immersive`, `Web Logika` (los `<br>` actuales son presentacionales; eliminarlos exige reinsertar el espacio en los nombres de dos palabras, que es exactamente como figuran en el inventario).
  - `p.project-summary` literal.
  - `dl.project-facts` → tres cotas de dato (igual que en perfil), con sus valores y etiquetas literales.
  - `ul.project-points` → tres viñetas con marcador cuadrado de 4 px `--signal-soft` y texto literal.
  - `ul.project-stack` con su `aria-label` literal → chips mono en `--ink-700`, borde `--rule-2`, esquina recta, precedidos por una etiqueta `STACK` mono.
  - `a.project-link` íntegro: texto "Explorar repositorio", su `svg` de flecha, `target="_blank" rel="noopener noreferrer"` y el `span.sr-only` "(abre en una pestaña nueva)". Las cuatro URL se mantienen exactas.
- Se retiran `data-tilt` y `data-tilt-strength` de las cuatro figuras.

#### 7.7.1 Láminas de proyecto (sustitución de los mockups)

Un único componente `figure.plate.project-plate[aria-hidden="true"]`, idéntico para los cuatro, con tres zonas:

1. **Cabecera:** `span.visual-caption` con su texto literal (`Vista conceptual · Diagnóstico IA`, `Vista conceptual · Mobile`, `Vista conceptual · Experiencia 3D`, `Vista conceptual · Web`) + referencia mono a la derecha (`01/04`…`04/04`).
2. **Cuerpo:** `aspect-ratio: 4 / 3`, fondo `--ink-800`, rejilla de 24 px con `--rule-1`, y un **SVG inline** `viewBox="0 0 480 360"`, `preserveAspectRatio="xMidYMid meet"`, trazo `1.25` en `--paper-mute`, rótulos mono de 11 unidades, y **exactamente un elemento en ámbar**.
3. **Pie:** una `.cota` de geometría pura (sin texto).

Esqueleto compartido (mismas clases CSS para los cuatro): `.pl-grid` (rejilla interna), `.pl-block` (rect de 1 px), `.pl-trace` (polilínea ortogonal con codos), `.pl-node` (cuadro 4 px), `.pl-label` (texto mono), `.pl-dim` (cota con topes), `.pl-accent` (único trazo ámbar).

Esquemas (abstractos, decorativos, ≈45–70 nodos SVG cada uno; reutilizan únicamente cadenas que ya existen en el documento actual):

- **01 MotoCheck** — *flujo de diagnóstico multimodal*: tres bloques de entrada rotulados `IMAGEN` / `AUDIO` / `CHAT` convergen por trazos ortogonales en un bloque `GEMINI 2.5` y de ahí a un bloque `INFORME` con una barra de severidad segmentada (el segmento activo es el acento). Cota inferior.
- **02 Neogranada Conecta** — *esquema de reserva*: dos bloques de actor (`ESTUDIANTE`, `ADMIN`) → nodo `RESERVA` → matriz 4 × 2 de recursos (`AULAS`, `LABORATORIOS`, `DEPORTES`, `INSTRUMENTOS`, y cuatro celdas sin rótulo que completan los ocho tipos). Un trazo de sincronización `FIRESTORE` en ámbar.
- **03 Black Hole Immersive** — *corte radial cotado*: circunferencias concéntricas (singularidad, anillo de fotones, horizonte) + elipse del disco de acreción en proyección, con cuatro ticks de cuadrante y tres cotas radiales rotuladas `SINGULARIDAD`, `HORIZONTE`, `DISCO`. El horizonte es el trazo ámbar. Tira de lectura con `0.72 c` · `12.4 km` · `ESTABLE` (valores ya presentes hoy en el mockup).
- **04 Web Logika** — *planta de catálogo*: wireframe de página con bloque de cabecera, retícula de 7 celdas de categoría y un trazo de salida a un nodo `WA` (el nodo es el acento). Cotas de ancho arriba y de alto a la izquierda.

Beneficio medible: desaparecen los bloques CSS de `moto-*`, `neo-*`, `black-hole`/`star-field`/`accretion-*`, `logika-*`/`sofa-*`/`room-scene` (≈1 400 líneas, más de la mitad del `style.css` actual) y toda la profundidad de DOM asociada.

### 7.8 Especialización

Sin id (igual que hoy), `aria-labelledby="specialization-title"`. Índice literal `ENFOQUE PROFESIONAL / EVOLUCIÓN`, `h2#specialization-title` literal con su `span`, párrafo literal. Las dos etapas (`01 BASE TÉCNICA / Redes & servicios cloud`, `02 PROYECCIÓN / Ciberseguridad`) con sus `h3` y `p` literales se disponen como **diagrama de flujo de dos bloques** con el `div.path-connector` convertido en trazo ortogonal con punta de flecha ámbar; en ≤900 px el flujo gira a vertical.

### 7.9 `#contacto` — `04 / CONTACTO`

- Columna izquierda (columnas 1–6): índice, `h2` literal, párrafo literal y `div.contact-links` como **tabla de tres filas** con filete superior: etiqueta mono (`EMAIL`, `TELÉFONO`, `GITHUB`), valor en mono `--t-meta`/`--t-body-sm` y el tick `↗`. Valores literales (`espitiasuareznicolas@gmail.com`, `+57 304 672 1626`, `@Nick3030w`), `mailto:`, `tel:+573046721626`, la URL de GitHub con `target="_blank" rel="noopener noreferrer"` y su `span.sr-only`. El correo lleva `overflow-wrap: anywhere` y baja a `--t-micro` en ≤430 px para no desbordar.
- Columna derecha (columnas 8–12): `form#contact-form` como **panel de lámina** (marcas de esquina, borde `--rule-2`, fondo `--ink-800`, `--shadow-panel`). Detalle completo en §10.

### 7.10 Footer

Filete superior a sangre; cuatro celdas en la rejilla: marca `NE` (`a.brand--footer` con su `aria-label` "Volver al inicio" y su `brand-pulse`), `Nicolás Espitia · Ingeniería de Sistemas`, `Colombia / <span id="current-year">2026</span>` y `a.back-to-top` "Volver arriba ↑". Todo literal.

---

## 8. Catálogo de animaciones

### 8.1 Tokens de movimiento

```css
:root {
    --dur-1: 120ms;   /* cambio de color/borde */
    --dur-2: 200ms;   /* desplazamiento corto, subrayados */
    --dur-3: 320ms;   /* estados de componente, panel móvil */
    --dur-4: 560ms;   /* revelado principal */
    --dur-5: 820ms;   /* trazado de reglas y cotas */
    --ease-out: cubic-bezier(0.16, 1, 0.3, 1);     /* entradas y revelados */
    --ease-std: cubic-bezier(0.4, 0, 0.2, 1);      /* cambios de estado */
    --ease-inout: cubic-bezier(0.65, 0, 0.35, 1);  /* panel, botón de menú */
    --stagger: 60ms;                               /* paso de escalonado */
}
```

Reglas transversales: **solo `transform` y `opacity`** en todo lo disparado por scroll y en todo lo continuo; cero animación de `width`/`height`/`top`/`left`/`margin`/`box-shadow`/`filter`; `will-change: transform` únicamente en los tres elementos continuos de §8.3; listeners de `scroll` y `pointermove` con `{ passive: true }` y agrupados en un solo `requestAnimationFrame` por tipo.

### 8.2 Revelados al scroll (`IntersectionObserver`)

Marcado: `class="reveal"` (lo lee el JS) + `data-reveal="<variante>"`. Observador único: `{ rootMargin: '0px 0px -10% 0px', threshold: 0.1 }`; al intersecar se añade `.is-revealed` y se hace `unobserve` del elemento (CA-13). Escalonado: el JS calcula `--reveal-delay = min(i, 4) * var(--stagger)` donde `i` es el índice **dentro de la sección contenedora** (mejora sobre el `index % 3` global actual, que descoordina el escalonado entre secciones). Tope: 240 ms.

| Variante | Estado inicial (solo bajo `html.motion-ready`) | Estado final | Duración / curva | Dónde |
|---|---|---|---|---|
| `up` | `opacity: 0; transform: translate3d(0, 18px, 0)` | `opacity: 1; transform: none` | `--dur-4` / `--ease-out` | Encabezados, prosa, cotas de dato, fichas de proyecto, panel de contacto |
| `rule` | `transform: scaleX(0)`, `transform-origin: left center` | `scaleX(1)` | `--dur-5` / `--ease-out` | Filetes de sección, cotas, subrayado del `h1`, conector de especialización |
| `tick` | `transform: scaleY(0)`, `transform-origin: bottom` | `scaleY(1)` | `--dur-3` / `--ease-out` | Topes de cota, marcadores de etapa, marcas de esquina |
| `wipe` | Hijo `::after` opaco (`--ink-900`) en `transform: translateX(0)`; el contenido ya está pintado debajo | `::after { transform: translateX(101%) }` | `--dur-5` / `--ease-out` | Las cinco láminas (hero + 4 proyectos) |
| `rows` | `opacity: 0; transform: translate3d(0, 12px, 0)` por fila | `opacity: 1; transform: none` | `--dur-3` / `--ease-out`, escalonado 50 ms | Filas de la matriz de capacidades, filas de contacto, etapas del perfil |
| `digits` | Contenedor `overflow: hidden`; `span` interno en `transform: translate3d(0, 100%, 0)` | `translate3d(0, 0, 0)` | `--dur-4` / `--ease-out` | Cifras (`--t-data`) en perfil y proyectos |

Notas de decisión:

- `wipe` se implementa con un panel que **se traslada** (no con `clip-path` ni `mask` animados) para quedar íntegramente en el compositor y no depender de soporte desigual.
- `digits` sustituye a cualquier contador numérico: el texto real está en el DOM desde el inicio (nunca se muta), lo que evita anuncios espurios en lectores de pantalla y funciona con valores no numéricos (`SQL`, `COP`, `LTS`, `WA`, `Live`, `7°`, `320+`).
- No se usa `stroke-dashoffset` en ninguna animación: es una propiedad de pintado y el criterio 13 exige `transform`/`opacity` en lo disparado por scroll. El "trazado" de plano se consigue con `rule`/`tick` sobre filetes HTML y con grupos SVG que entran con `opacity` + `translate`.
- Secuencia de entrada del hero (sin `IntersectionObserver`, con `animation` CSS y retardos fijos, solo bajo `html.motion-ready`): filete del eyebrow `rule` 0 ms → `h1` `up` 80 ms → subrayado ámbar `rule` 420 ms → `hero-intro` `up` 160 ms → CTAs `up` 240 ms → lámina `wipe` 200 ms → celdas del cajetín `up` escalonadas 320/380/440 ms → `scroll-cue` `up` 560 ms. Total ≤ 1,25 s.

### 8.3 Movimiento continuo (ambiente) — exactamente tres elementos

| Id | Elemento | Animación | Parámetros |
|---|---|---|---|
| A1 | `.plate-sweep` dentro de la lámina del hero: una capa de altura 100 % con un degradado que contiene una sola línea de 1 px (`--rule-2`) a mitad de altura | `transform: translateY(-50%) → translateY(50%)` | `7s linear infinite alternate`; es el "barrido de instrumento". Un único elemento en toda la página. |
| A2 | `.availability-dot` y el punto de `.stage-live` | `opacity: 1 → 0.25 → 1` | `2.4s var(--ease-std) infinite`; latido de estado. Solo opacidad. |
| A3 | Los cuatro cuadros `.topology-packets` de la lámina del hero | `transform: translate3d()` sobre tramos rectos, con `opacity` de entrada/salida en los extremos | `4.8s linear infinite`, desfases de 0/1.2/2.4/3.6 s |

Todas gateadas por `html.motion-ready` **además** de la media query, para que el JS pueda detenerlas en caliente (§8.6). Sin bucles de `filter`, sin `box-shadow` animado.

### 8.4 Microinteracciones de hover y foco

| Componente | Hover | Foco (`:focus-visible`) | Duración / curva |
|---|---|---|---|
| Enlace de navegación | Filete inferior `scaleX(0 → 1)` desde la izquierda; rótulo a `--paper` | Anillo ámbar 2 px, `outline-offset: 3px` | `--dur-2` / `--ease-std` |
| Enlace activo | Filete ámbar permanente + índice mono en `--signal` | igual | — |
| Botón primario | `translateY(-1px)`; la flecha interna `translateX(3px)` | Anillo ámbar | `--dur-2` |
| Botón secundario | Borde `--rule-3` → `--signal`; fondo → `--signal-wash` | Anillo ámbar | `--dur-1` color, `--dur-2` transform |
| Pulsación (`:active`) de ambos botones | `transform: translateY(0) scale(0.99)` | — | `--dur-1` |
| Fila de capacidad | Fondo → `--ink-750`; número de ref → `--signal`; tick izquierdo `scaleY(0 → 1)` | Anillo ámbar en la fila completa | `--dur-2` |
| Fila de contacto | Valor a `--paper`; tick `↗` `translate(2px, -2px)`; filete inferior `scaleX` | Anillo ámbar | `--dur-2` |
| `project-link` | Flecha `translate(3px, -3px)`; filete inferior `scaleX(0 → 1)` | Anillo ámbar | `--dur-2` |
| Chip de stack | Borde `--rule-2` → `--rule-3` | — (no focalizable) | `--dur-1` |
| Campo de formulario | Borde → `--rule-3` pleno | Borde → `--signal` + filete inferior de 1 px `scaleX(0 → 1)`; etiqueta mono a `--paper` | `--dur-2` |
| Botón de menú | — | Anillo ámbar | `--dur-3` / `--ease-inout` |
| Marca `NE` | Marcas de esquina `scale(1 → 1.08)` desde el centro | Anillo ámbar | `--dur-2` |

`:focus-visible` global: `outline: 2px solid var(--signal); outline-offset: 3px`. Contraste del anillo ≥ 9,3:1 contra cualquier superficie del sistema (§4.1), muy por encima del 3:1 exigido.

### 8.5 Interacción de puntero fino: "cursor de instrumento"

Sustituye a `data-tilt` y `data-magnetic` (ambos eliminados del HTML y del JS).

- Marcado: `data-crosshair` en las cinco láminas y en el panel del formulario.
- Al entrar el puntero, el elemento muestra dos filetes de 1 px (`--signal-soft`), uno horizontal y uno vertical, que siguen al cursor **dentro** de los límites del elemento, más una `.readout` `aria-hidden="true"` en la esquina con la coordenada normalizada (`X:0.42 Y:0.68`).
- Implementación: un solo listener `pointermove` por elemento, `{ passive: true }`; se guarda la última posición y se aplica en un único `requestAnimationFrame` compartido escribiendo dos custom properties (`--cx`, `--cy`) que los filetes consumen vía `transform: translate3d(var(--cx), 0, 0)` / `translate3d(0, var(--cy), 0)`. El texto de la coordenada se reescribe **como máximo cada 100 ms** (comprobación de marca de tiempo dentro del rAF) y su `span` tiene ancho fijo en `ch` + `contain: layout style`, de modo que el cambio de texto no provoca reflujo fuera del elemento.
- `pointerleave`: los filetes se desvanecen (`opacity`, `--dur-2`) y las custom properties se restablecen.
- Puertas: `window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reducedMotion.matches`. En táctil y en movimiento reducido los listeners **no se registran** y el CSS oculta los filetes y la lectura (`@media (hover: none), (pointer: coarse)` y el bloque de movimiento reducido). La página se ve y funciona completa sin ellos (RF-8).
- Todos los listeners de esta sección se registran con un `AbortController` compartido (`{ signal: motionController.signal }`) para poder retirarlos de golpe si cambia la preferencia de movimiento.

### 8.6 `prefers-reduced-motion: reduce` — comportamiento explícito

En carga, con la preferencia activa:

1. El script inline del `head` **no** añade `html.motion-ready`; por tanto ningún estado inicial oculto se aplica y **todo el contenido es visible sin depender del JS de animación**.
2. CSS:
   ```css
   @media (prefers-reduced-motion: reduce) {
       html { scroll-behavior: auto; }
       *, *::before, *::after {
           animation-duration: 0.01ms !important;
           animation-iteration-count: 1 !important;
           transition-duration: 0.01ms !important;
           transition-delay: 0ms !important;
       }
       .plate-sweep, .scroll-progress, .crosshair-x, .crosshair-y, .crosshair-readout { display: none; }
       .availability-dot, .stage-live i { opacity: 1; animation: none; }
       .topology-packets { opacity: 0.55; transform: none; }
   }
   ```
   La barra de progreso se oculta porque es un elemento en movimiento continuo que no aporta información esencial (la navegación activa ya indica la posición).
3. JS: no se registran los listeners de crosshair ni el actualizador de progreso; el observador de revelados no se crea y, en su lugar, se añade `.is-revealed` a todos los `.reveal` (coherente con el patrón actual).

Cambio **en caliente** (evento `change` del media query): si pasa a `reduce`, el handler (a) quita `html.motion-ready` —lo que revela de inmediato todo lo pendiente y detiene las tres animaciones continuas, porque están gateadas por esa clase—, (b) añade `.is-revealed` a todos los `.reveal` restantes, (c) llama `motionController.abort()` para retirar los listeners de crosshair y de progreso, y (d) limpia `--cx`, `--cy` y `--scroll-progress`. Si la preferencia pasa de `reduce` a permitido en caliente, no se activan animaciones (el contenido ya está revelado); es un estado aceptado y declarado.

### 8.7 `forced-colors: active`

```css
@media (forced-colors: active) {
    .blueprint-field, .plate-sweep, .scroll-progress { display: none; }
    .availability-dot, .stage-live i, .path-marker.is-current, .nav-link.is-active::after {
        forced-color-adjust: none;
        background: Highlight;
    }
    .hero-highlight { color: LinkText; }
    .plate, .spec-row, .contact-links a, input, textarea, .button { border-color: CanvasText; }
}
```
Los esquemas SVG usan `stroke="currentColor"` en todos los trazos, de modo que en modo de colores forzados se dibujan con el color de texto del sistema y no desaparecen.

---

## 9. Arquitectura de archivos

### 9.1 `public/style.css` — un archivo, secciones comentadas en español

Orden fijo (el implementador no debe reordenar; el CSS depende de la cascada en los estados de revelado):

1. `TOKENS` (`:root`: color, tipografía, espacio, retícula, movimiento)
2. `RESET Y BASE` (box-sizing, `html`/`body`, enlaces, `::selection`, `.sr-only`, `.skip-link`, `:focus-visible`)
3. `RETÍCULA Y CONTENEDORES` (`.sheet`, `.sheet--grid`, `.blueprint-field`, ritmo de sección)
4. `PRIMITIVAS DE LÁMINA` (`.rule`, `.cota`, `.plate`, `.ref`, `.readout`)
5. `MOVIMIENTO` (variantes `data-reveal`, `@keyframes`, secuencia del hero)
6. `HEADER Y NAVEGACIÓN` (incluye panel móvil y progreso)
7. `BOTONES Y CHIPS`
8. `HERO`
9. `PERFIL`
10. `CAPACIDADES`
11. `PROYECTOS` (ficha + componente de lámina + clases `.pl-*` compartidas por los cuatro SVG)
12. `ESPECIALIZACIÓN`
13. `CONTACTO Y FORMULARIO`
14. `FOOTER`
15. `RESPONSIVE` (1120 → 900 → 680 → 430)
16. `PREFERENCIAS DEL SISTEMA` (`hover: none`, `prefers-reduced-motion`, `forced-colors`)

Se **elimina** por completo el bloque heredado `PROFESSIONAL EDITION — calm palette and restrained motion` (líneas ≈3669–4500 del archivo actual): el nuevo CSS se escribe desde cero con un único set de tokens, sin capas de sobrescritura.

### 9.2 `public/script.js` — un IIFE, módulos en orden

```
(() => { 'use strict';
    // 0. Referencias, media queries y AbortController de movimiento
    // 1. Navegación móvil  (setMenuState: único escritor de body.menu-open)
    // 2. Estado del header, progreso de scroll y lectura de sección
    // 3. Sección activa     (setActiveNavigation: único escritor de .is-active/aria-current)
    // 4. Revelados          (IntersectionObserver + escalonado por sección)
    // 5. Cursor de instrumento (solo puntero fino + movimiento permitido)
    // 6. Formulario de contacto
    // 7. Año dinámico
    // 8. Reacción a cambios de prefers-reduced-motion
})();
```

Se conservan sin cambios de comportamiento los módulos 1, 3, 6 y 7 (están probados y cubren RF-4/RF-5/RF-6/RF-9). Se elimina el módulo de luz ambiental/tilt/imanes. Se añaden: progreso de scroll + lectura de sección (dentro del rAF de scroll ya existente) y cursor de instrumento.

Funciones puras extraídas y nombradas (facilitan la inspección y serían las primeras candidatas a prueba unitaria si algún día se añadiera un runner): `buildPayload(formData)`, `clamp01(value)`, `revealDelay(index)`, `pickVisibleSection(entries)`.

Sin globales filtradas, sin `console.*` en la ruta normal (CA-14 exige consola limpia; los errores se comunican solo en la UI).

### 9.3 `public/favicon.svg`

Marca de lámina: cuadro de tinta con esquina mínima, "N" trazada con topes rectos y un cuadro ámbar de cota. Legible a 16 px porque solo tiene tres elementos y ningún trazo por debajo de 6 unidades en un `viewBox` de 64.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="2" fill="#0A0D12"/>
  <path d="M17 46V18l30 28V18" fill="none" stroke="#EAF0F7" stroke-width="6"
        stroke-linecap="square" stroke-linejoin="miter"/>
  <rect x="42" y="13" width="9" height="9" fill="#FFB54A"/>
</svg>
```

Diferencias con el actual: `rx` 14 → 2 (esquina técnica), terminaciones redondeadas → rectas, punto circular verde-gris `#87aa9e` → cuadro ámbar `#FFB54A`, fondo `#111416` → `#0A0D12` (coincide con `theme-color` y con el fondo real, CA-17).

### 9.4 Presupuesto de peso (RNF-5)

| Archivo | Hoy | Objetivo | Palanca |
|---|---|---|---|
| `index.html` | ≈50 KB | **≤ 44 KB** | Desaparecen los árboles DOM de los cuatro mockups (cientos de nodos); entran 5 SVG de esquema (~1,2 KB cada uno) y el cajetín |
| `style.css` | ≈95 KB | **≤ 55 KB** | Un solo set de tokens (se borra la capa de sobrescritura), un componente de lámina compartido en vez de cuatro mockups bespoke, cero degradados/desenfoques complejos |
| `script.js` | ≈11 KB | **≤ 13 KB** | Se retira tilt/imanes/luz ambiental; se añaden progreso, lectura de sección y crosshair |
| `favicon.svg` | 0,3 KB | ≤ 0,4 KB | — |

Carga de fuentes: 2 familias variables en 1 petición CSS frente a 7 instancias estáticas hoy; `preconnect` y `display=swap` se mantienen. Sin imágenes rasterizadas nuevas.

---

## 10. Formulario de contacto: cómo queda intacto contra `POST /api/contact`

El rediseño del formulario es **exclusivamente visual**. El contrato con el backend y el contrato DOM↔JS se congelan.

### 10.1 Contrato DOM que el JS consume (prohibido renombrar)

| Selector | Tipo | Quién lo usa |
|---|---|---|
| `#contact-form` | `form` con `novalidate` | `submit` handler |
| `#name`, `name="name"` | `input[type=text]` | `FormData` → `payload.name` |
| `#email`, `name="email"` | `input[type=email]` | `FormData` → `payload.email` |
| `#message`, `name="message"` | `textarea` | `FormData` → `payload.message` |
| `#website`, `name="website"` | `input[type=text]`, `tabindex="-1"`, `autocomplete="off"`, en `.form-trap[aria-hidden="true"]` | `FormData` → `payload.website` |
| `#submit-btn` | `button[type=submit]` | `disabled`, `aria-busy`, clase `is-loading` |
| `#btn-text` | `span` | texto "Enviar mensaje" ⇄ "Enviando…" |
| `#btn-loader`, `.button-loader` | `span[aria-hidden]` | indicador de carga |
| `#form-feedback`, clase base `form-feedback` | `div[role="status"][aria-live="polite"][tabindex="-1"]` | `showFeedback` reescribe `className` con la plantilla `form-feedback <tipo>`, donde `<tipo>` ∈ {`success`, `error`}, más `textContent`; recibe foco con `{ preventScroll: true }` |
| `label[for]` de los cuatro campos | `label` | asociación accesible (incluida la etiqueta "No completar este campo" del honeypot) |

Como `showFeedback` reescribe `className` por completo, las clases `.form-feedback`, `.form-feedback.success` y `.form-feedback.error` deben existir con esos nombres exactos en el CSS nuevo (`.success` → texto `--ok`, filete izquierdo `--ok`; `.error` → texto `--alert`, filete izquierdo `--alert`; base → sin filete y sin altura reservada vacía).

### 10.2 Contrato de red (idéntico al actual)

- `fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify({ name, email, message, website }), signal })`.
- Una sola petición por envío; `AbortController` con `setTimeout` de **12 000 ms** y `clearTimeout` en `finally`.
- Éxito = `response.ok && result.success === true` → `form.reset()` + mensaje de éxito + foco en la región de estado.
- El honeypot viaja **siempre** en el payload, incluso vacío (el servidor responde `{success:true}` sin enviar correo si llega relleno; comportamiento del servidor, fuera de alcance).

### 10.3 Reglas de validación de cada entrada externa

El formulario es la **única** entrada externa del front. Principio de autoridad: **el servidor es la autoridad de validación; la comprobación del cliente es una conveniencia de UX y nunca puede ser más estricta que la del servidor** (de lo contrario rechazaríamos mensajes que el backend aceptaría).

| Campo | Obligatorio | Tipo | Límites | Atributos HTML | Comportamiento al fallar |
|---|---|---|---|---|---|
| `name` | Sí | texto de una línea | 2–100 caracteres (coincide con el servidor) | `required minlength="2" maxlength="100" autocomplete="name"` | No se envía nada. `form.reportValidity()` enfoca el primer campo inválido y muestra el mensaje nativo; la región de estado muestra "Revisa los campos indicados antes de enviar el mensaje."; el campo recibe `aria-invalid="true"` |
| `email` | Sí | correo | ≤ 254 caracteres, formato validado por el navegador (`type="email"`) y, de forma autoritativa, por el servidor | `required type="email" maxlength="254" autocomplete="email"` | Igual que arriba. **No** se duplica en el cliente la expresión regular del servidor: `type="email"` ya es igual o menos estricto, y una regex propia podría rechazar direcciones válidas para el backend |
| `message` | Sí | texto multilínea | 10–2000 caracteres (coincide con el servidor) | `required minlength="10" maxlength="2000" rows="6"` | Igual que arriba |
| `website` (honeypot) | No | texto | sin límite; debe permanecer vacío | `tabindex="-1" autocomplete="off"`, envoltorio `aria-hidden="true"`, oculto por CSS | Nunca se valida ni bloquea el envío; se envía tal cual |

Añadido respecto al HTML actual: `minlength="2"` en `name` (hoy falta y el servidor ya lo exige) y `aria-invalid` gestionado dinámicamente (se pone al fallar la validación, se quita en el `input` siguiente de ese campo). Ningún otro cambio de comportamiento.

Ocultación del honeypot (CA-9): `.form-trap { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }` — **no** `display: none`, para que siga siendo un campo real del formulario cuyo valor viaja en el payload, y sin posibilidad de alcanzarlo con teclado (`tabindex="-1"`) ni de recibir autocompletado (`autocomplete="off"`).

### 10.4 Manejo de errores, operación por operación

| Operación | Condición de fallo | Severidad | Qué recibe la persona | Estado del botón | Log |
|---|---|---|---|---|---|
| Validación en cliente | Algún campo inválido (`form.checkValidity() === false`) | Recuperable, no es error de sistema | Mensaje nativo del navegador en el primer campo inválido + región de estado: "Revisa los campos indicados antes de enviar el mensaje." Sin petición de red | Nunca se deshabilita | Ninguno |
| Envío duplicado | Segundo `submit` mientras hay una petición en vuelo | Recuperable | Nada: el botón está `disabled` y el handler sale temprano si ya está en vuelo | Sigue deshabilitado | Ninguno |
| `fetch` | Fallo de red / offline (`TypeError`) | Recuperable | "✕ Ocurrió un error de conexión. Intenta nuevamente." en la región de estado, que recibe foco | Se rehabilita en `finally` | Ninguno (consola limpia, CA-14) |
| `fetch` | Timeout de 12 s (`error.name === 'AbortError'`) | Recuperable | "✕ La solicitud tardó demasiado. Revisa tu conexión e intenta nuevamente." | Se rehabilita | Ninguno |
| `response.json()` | Cuerpo no-JSON o vacío | Recuperable | Se degrada a `{}` vía `.catch(() => ({}))` y se usa el mensaje genérico "No fue posible enviar el mensaje. Intenta nuevamente." | Se rehabilita | Ninguno |
| Respuesta HTTP | `400` (validación del servidor) | Recuperable | Se muestra literalmente `result.error` del servidor (p. ej. "El mensaje debe tener entre 10 y 2000 caracteres.") | Se rehabilita | Ninguno |
| Respuesta HTTP | `429` (rate limit, 5 envíos / 15 min) | Recuperable, con espera | `result.error` del servidor: "Has enviado varios mensajes. Espera unos minutos antes de intentar de nuevo." No se reintenta automáticamente ni se lee `Retry-After` | Se rehabilita | Ninguno |
| Respuesta HTTP | `500` (fallo de correo o configuración incompleta) | Recuperable desde el cliente, fatal en esa petición | `result.error` del servidor: "No fue posible enviar el mensaje en este momento. Intenta de nuevo más tarde." | Se rehabilita | El servidor ya registra con `console.error`; el cliente no añade logs |
| Respuesta HTTP | `200` con `success: false` | Recuperable | `result.error` si existe, si no el mensaje genérico | Se rehabilita | Ninguno |
| `feedback.focus()` | Nodo ausente | No fatal | No-op (guardas con `?.`) | — | Ninguno |
| Nodos del formulario ausentes | `#contact-form` no existe | No fatal | El módulo no se inicializa; el resto de la página sigue operativa | — | Ninguno |

Errores fuera del formulario:

| Operación | Fallo | Severidad | Resultado |
|---|---|---|---|
| Carga de Google Fonts | CSS o woff2 no disponible | No fatal | `display=swap` + pila de respaldo (`Segoe UI`/`system-ui`, `Cascadia Mono`/`Consolas`). La maqueta no se rompe: la escala está en `rem`/`clamp`, no en unidades dependientes de la fuente |
| `IntersectionObserver` ausente | Navegador sin soporte | No fatal | (a) Revelados: se añade `.is-revealed` a todos los `.reveal`; (b) sección activa: se mantiene el enlace `Inicio` como activo y además cada clic en un enlace de navegación marca ese enlace como activo, preservando el invariante "exactamente uno activo" |
| `script.js` no carga o lanza | Error de red o excepción temprana | No fatal para el contenido | Todo el contenido es visible (el estado oculto solo existe bajo `html.motion-ready`, que el inline del `head` añade de forma independiente al CSS por defecto visible); navegación por anclas, `mailto:`, `tel:` y enlaces de repositorio siguen funcionando. Se pierden: menú móvil, sección activa, revelados y envío del formulario (el formulario no tiene `action`, igual que hoy; los enlaces directos de correo y teléfono son la vía alternativa). Limitación idéntica a la actual: no es una regresión |
| `requestAnimationFrame` saturado | Pestaña en segundo plano | No fatal | Los handlers de scroll/puntero reutilizan un único cuadro pendiente; al volver al primer plano se recalcula |

---

## 11. Accesibilidad (RNF-3)

- Un único `h1` (hero). Orden de encabezados: `h1` → `h2` por sección → `h3` en filas de capacidad, proyectos, etapas y `#path-title`. Sin saltos de nivel.
- Orden del DOM = orden de lectura en todas las anchuras. Las inversiones de columna de proyectos se hacen con `order` **solo** en ≥1120 px y sobre contenido cuya figura es `aria-hidden`, así que no alteran la lectura asistida.
- `lang="es"`, landmarks `header` / `main#main-content` / `footer` / `nav[aria-label]`, skip link como primer elemento focalizable.
- Toda figura decorativa (`aria-hidden="true"`): las cuatro láminas de proyecto. La lámina del hero no es decorativa: conserva `role="img"` con su `aria-label` y el `figcaption.sr-only`.
- `aria-current="location"` en el enlace activo; `aria-expanded` / `aria-controls` / `aria-label` conmutado en el botón de menú; `aria-busy` en el botón de envío; `role="status"` + `aria-live="polite"` en la región de estado.
- Elementos de notación puramente visuales (`nav-index`, lecturas de crosshair, cabecera de la matriz de capacidades, topes de cota, retícula de fondo, barra de progreso) van `aria-hidden="true"` para no ensuciar el recorrido.
- Foco visible en el 100 % de los elementos interactivos con el anillo ámbar de ≥9,3:1. Nunca `outline: none` sin reemplazo.
- Contrastes: tabla de §4.1. Ningún texto informativo por debajo de 4,5:1; ningún borde de control por debajo de 3:1.
- Zoom de texto al 200 % sin pérdida de contenido: todas las medidas de tipografía en `rem`/`clamp`, contenedores sin alturas fijas, chips y cotas con `flex-wrap`.
- Objetivos táctiles ≥ 44 × 44 px en móvil.

---

## 12. Invariantes y capa responsable

| Id | Invariante | Capa propietaria | Por qué ahí |
|---|---|---|---|
| I-1 | Exactamente un `.nav-link` activo, con `aria-current="location"` y sin que ningún otro lo tenga | `setActiveNavigation()` en `script.js` (único escritor: limpia los cinco y marca uno) | Centralizar la escritura es la única forma de garantizar la unicidad; si el CSS o el HTML también pudieran marcar estado, aparecerían estados dobles (CA-5) |
| I-2 | `body.menu-open` existe si y solo si el menú está abierto, y el bloqueo de scroll va con él | `setMenuState()` en `script.js` (único escritor) | El bloqueo de scroll y los atributos ARIA del botón deben cambiar atómicamente; dos escritores producirían scroll bloqueado con menú cerrado |
| I-3 | El payload es exactamente `{ name, email, message, website }` con esos nombres | HTML (atributos `name`) + `buildPayload()` | El servidor lee esas cuatro claves; cualquier renombrado en el marcado rompería el endpoint sin error visible |
| I-4 | La validación del cliente nunca es más estricta que la del servidor | `script.js` + atributos HTML, con los límites copiados de `server.js` | Si el cliente fuera más estricto, bloquearía mensajes legítimos y el usuario no tendría forma de saberlo |
| I-5 | Todo contenido es visible por defecto; el estado oculto de animación existe solo bajo `html.motion-ready` | CSS (los selectores ocultos van siempre prefijados por `.motion-ready`) | Si el CSS ocultara por defecto y el JS revelara, un fallo del JS dejaría la página en blanco. Con esta inversión, el peor caso es "sin animaciones" (CA-11, RNF-6) |
| I-6 | Todas las animaciones continuas se pueden detener en caliente | CSS (gateadas por `.motion-ready`) + `script.js` (quita la clase) | Permite responder al cambio de `prefers-reduced-motion` sin recargar y sin recorrer elementos uno a uno |
| I-7 | Ningún ancla queda oculta bajo el header fijo | CSS (`scroll-padding-top: calc(var(--header-h) + var(--s-6))`) | Debe vivir donde vive la altura del header; si el JS midiera la altura, cualquier desincronía produciría títulos cortados (CA-4) |
| I-8 | La altura real del header coincide con `--header-h` | CSS exclusivamente (el JS no mide ni escribe esa variable) | Una única fuente de verdad evita la deriva entre medida y token |
| I-9 | Sin scroll horizontal de 360 px a 1440 px+ | CSS (`min-width: 0` en hijos de rejilla, `overflow-wrap`, `body { overflow-x: hidden; min-width: 280px }`, SVG con `viewBox` y `width: 100%`) | El desborde siempre nace de una pista de rejilla o de una palabra larga; es un problema de layout, no de script |
| I-10 | El presupuesto de acento (§4.1, regla 3) | CSS + revisión visual | No es automatizable; se declara explícitamente para que la revisión pueda rechazar usos nuevos del ámbar |
| I-11 | La notación técnica solo muestra datos reales o métricas de la propia interfaz (§6.1) | HTML (quien escribe las etiquetas) | Protege RF-3 y el criterio 3: ningún número inventado puede confundirse con un dato del perfil |

---

## 13. Casos límite

1. **360 px.** Carril colapsado a 0; los índices de sección pasan a línea sobre el `h2`. `h1` ≈41 px sin desborde. Chips de stack con `flex-wrap`. Láminas con `aspect-ratio: 4/3` y SVG escalado; se ocultan las cotas y los rótulos de los esquemas por debajo de 680 px (`.pl-dim, .pl-label { display: none }`) porque a ese tamaño el texto SVG caería por debajo de 8 px efectivos: son elementos decorativos dentro de figuras `aria-hidden`, así que no se pierde contenido. La lámina del hero conserva nodos y trazos y agranda sus rótulos vía una variable de tamaño (`--svg-label`).
2. **Cadenas largas.** `espitiasuareznicolas@gmail.com` (30 caracteres) en la fila de contacto: mono `--t-meta` con `overflow-wrap: anywhere` y descenso a `--t-micro` en ≤430 px. `SISTEMAS INTELIGENTES E INTERACTIVOS` con `letter-spacing` reducido a `0.08em` en móvil. `Neogranada Conecta` y `Black Hole Immersive` con `text-wrap: balance` + `hyphens: manual`.
3. **1440 px y más.** El shell se topa en 1320 px; la retícula de columnas visible deja de crecer y el fondo plano se extiende sin orbes ni degradados que se vean "estirados". A ≥1800 px la composición no se reescala: la metáfora de hoja exige márgenes amplios, no medidas de lectura gigantes.
4. **Menú abierto + redimensionado** a ≥900 px: se cierra y se libera el scroll (mecánica actual conservada).
5. **`Escape` con menú cerrado:** `setMenuState(false)` es idempotente, no hay efecto.
6. **Sin `IntersectionObserver` / sin JS:** §10.4.
7. **Movimiento reducido activado a mitad de sesión:** §8.6.
8. **Colores forzados:** §8.7. Los esquemas SVG sobreviven porque usan `currentColor`.
9. **Gestor de contraseñas que rellena el honeypot:** el servidor devuelve `{success:true}` sin enviar correo y la persona ve el mensaje de éxito. Comportamiento preexistente del servidor (fuera de alcance); el cliente lo mitiga con `autocomplete="off"`, `tabindex="-1"` y el nombre `website`, que los gestores rara vez autocompletan.
10. **Doble clic en "Enviar mensaje":** botón `disabled` + salida temprana del handler.
11. **Red muy lenta (> 12 s):** aborta y muestra el mensaje de timeout; la persona puede reintentar (el límite del servidor son 5 envíos por 15 minutos).
12. **Pestaña en segundo plano:** las animaciones continuas las pausa el navegador; el `rAF` de scroll no se acumula (un solo cuadro pendiente).
13. **Fuentes bloqueadas (corporativo/offline):** se usa la pila de respaldo; mono de respaldo (`Consolas`) mantiene el ancho fijo, por lo que las lecturas y cotas no se descolocan.
14. **Impresión:** no es requisito; el CSS no incluye `@media print` y la página se imprime con el fondo del navegador. Se declara explícitamente como no abordado.

---

## 14. Estrategia de verificación

No hay runner de pruebas en el repositorio y RNF-1 prohíbe añadir dependencias, así que **no se introduce ningún framework de test**. La verificación es manual y por inspección, con esta matriz (una fila por criterio de aceptación):

| CA | Cómo se verifica |
|---|---|
| 1, 2 | Comparación visual con `public/screenshots/preview.png` a 1440 px: retícula visible, tipografía Archivo/JetBrains, paleta fría + ámbar, esquinas rectas, láminas cotadas |
| 3 | Búsqueda textual en `public/index.html` de cada cadena del inventario (4 URL de repositorio, correo, teléfono, `@Nick3030w`, los 25 chips de stack, las estadísticas, el JSON-LD completo) contra `.agents/tasks/.../index.original.html` |
| 4 | Clic en los 5 enlaces de navegación + "Descubrir", "Volver arriba", "Disponible para colaborar" y la marca; comprobar que el título de cada sección queda por debajo del header |
| 5 | Scroll completo observando que exactamente un enlace queda marcado y que `aria-current="location"` se mueve (inspector de DOM) |
| 6 | DevTools a 360 px: abrir/cerrar, `aria-expanded`, `aria-label`, `Escape`, clic en enlace, scroll bloqueado, redimensionar a 1000 px |
| 7, 8 | `npm start` + envíos reales: válido (200), nombre de 1 carácter (bloqueo en cliente), mensaje de 5 caracteres (bloqueo en cliente), 6 envíos seguidos (429), servidor sin variables de correo (500), red desconectada (error de conexión), `Network: Offline` y throttling para el timeout. Alternativa de contrato sin UI: `curl -s -X POST http://localhost:3000/api/contact -H "Content-Type: application/json" -d '{"name":"A","email":"a@b.co","message":"hola"}'` debe seguir devolviendo el 400 de nombre |
| 9 | Inspeccionar `#website`: presente, oculto, no alcanzable con `Tab`, y su clave viaja en el payload (pestaña Network → Request) |
| 10 | 360 / 768 / 1440 px: sin scroll horizontal, sin solapes, objetivos táctiles ≥44 px (regla de DevTools) |
| 11 | Activar movimiento reducido en el SO y recargar; luego activarlo en caliente con la página a medio scroll |
| 12 | Recorrido completo con `Tab` comprobando el anillo de foco en cada parada |
| 13 | Grabación del panel Performance durante scroll completo + interacción con la lámina del hero: sin `Layout`/`Paint` recurrentes; comprobar en "Animations" que solo se animan `transform`/`opacity`; confirmar en el inspector que los `.reveal` ya revelados no siguen observados |
| 14 | Consola y Network limpias tras cargar, recorrer, abrir/cerrar menú y enviar el formulario (éxito y error) |
| 15 | Validador del W3C sobre el HTML servido: un solo `h1`, sin ids duplicados, `label` por control |
| 16 | `git diff --stat` debe mostrar únicamente los cuatro archivos de `public/` |
| 17 | Favicon a 16 px en pestaña; `meta theme-color` igual al fondo real (`#0A0D12`) |

Qué sería unitario y qué integración, si en el futuro se añadiera un runner (hoy fuera de alcance): unitario → `buildPayload`, `clamp01`, `revealDelay`, `pickVisibleSection` y la comparación de límites de validación contra los de `server.js`; integración/navegador → revelados por `IntersectionObserver`, menú móvil, estados del formulario, respuestas 400/429/500 y las preferencias del sistema. El diseño favorece esto manteniendo esas cuatro funciones puras y sin efectos secundarios dentro del IIFE.

---

## 15. Trazabilidad

| Requisito | Dónde se resuelve |
|---|---|
| RF-1 dirección nueva | §2, §4, §5, §6, §7 (metáfora, paleta, tipografía, retícula, láminas) |
| RF-2 estructura y anclas | §7 (orden, ids, `data-nav-section`, skip link) |
| RF-3 contenido literal | §7 (tablas de mapeo por sección), §6.1 regla de honestidad, I-11 |
| RF-4 navegación | §7.2, §9.2 módulos 2–3, I-1, I-7 |
| RF-5 menú móvil | §7.3, §9.2 módulo 1, I-2 |
| RF-6 formulario | §10 completo |
| RF-7 animaciones | §8.2 (revelados escalonados), §8.3 (tres continuas), §8.4 |
| RF-8 puntero con degradación | §8.5 (puertas `hover: hover`/`pointer: fine` + movimiento), §8.6 |
| RF-9 año dinámico | §7.10, §9.2 módulo 7 (respaldo `2026` en el HTML) |
| RF-10 favicon y theme-color | §9.3, §4.1 regla 4 |
| RNF-1 sin build | §3 (stack bloqueado), §14 (verificación CA-16) |
| RNF-2 rendimiento de animación | §8.1 reglas transversales, §8.2 notas, §7.2 (header sin cambio de altura) |
| RNF-3 accesibilidad | §11, §4.1, §8.7 |
| RNF-4 responsive | §6 breakpoints, §13 casos 1–3, I-9 |
| RNF-5 peso | §9.4 |
| RNF-6 compatibilidad | §3 lista de características prohibidas, §10.4, I-5 |
| RNF-7 calidad de código | §9.1 orden de secciones, §9.2 estructura del IIFE, comentarios en español |

---

## 16. Fuera de alcance (confirmado)

`server.js`, `/api/contact`, nodemailer, rate limit y cabeceras; `package.json` / `package-lock.json` / dependencias / linters / runner de pruebas; reescritura, traducción o ampliación de contenido; páginas o rutas nuevas, blog, CV, i18n; analítica y terceros; despliegue, Railway, dominio, variables de entorno; `README.md` y la regeneración de `public/screenshots/preview.png`; modo claro; `@media print`.
