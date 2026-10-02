# Requisitos — Rediseño visual del portafolio de Nicolás Espitia

## Resumen

El sitio actual (`public/index.html` + `style.css` + `script.js`, servido por `server.js` con Express) es un portafolio oscuro de una sola página, en español, con tipografías Space Grotesk / IBM Plex Mono, acento mint `#67f5d2`, mockups ilustrados en CSS/SVG por proyecto y animaciones basadas en `IntersectionObserver`, tilt con puntero y botones magnéticos.

La petición del usuario, textual y autoritativa: *"Me gusta el diseño que tiene la página pero me gustaría algo diferente, algo más moderno y único, te dejo libertad creativa pero quiero un diseño profesional e ingenieril sin dejar de lado las animaciones profesionales."*

Es decir: **rediseño visual, no reescritura de contenido**. Se busca una dirección de arte claramente distinta de la actual (no un retoque de color), con carácter moderno, único, profesional y de lenguaje ingenieril, conservando animaciones de calidad. Todo el contenido real, la estructura informativa y la funcionalidad existente deben sobrevivir al rediseño. El alcance se limita a los cuatro archivos del front (`index.html`, `style.css`, `script.js`, `favicon.svg`); `server.js` no se modifica.

### Supuestos declarados

1. "Algo diferente" implica un cambio de dirección de arte perceptible a primera vista (retícula, tipografía, paleta, tratamiento de superficies y de los visuales de proyecto), no una variación de tono sobre la misma composición. El usuario dice que le gusta el diseño actual, por lo que el rediseño debe elevarlo, no degradarlo: lo que se conserva es el nivel de acabado y la densidad informativa, lo que cambia es el lenguaje visual.
2. El contenido textual se mantiene en español (es-CO) y se preserva literalmente salvo microajustes de rotulación de UI.
3. El sitio sigue siendo una sola página (SPA estática por anclas) con las mismas secciones y el mismo orden informativo; reordenar o fusionar secciones es admisible solo si la navegación y los anclajes siguen siendo coherentes (ver RF-2).
4. Sigue siendo tema oscuro por defecto. Un modo claro es opcional y no es un requisito.
5. No se introducen frameworks, bundlers ni dependencias de build. Fuentes vía Google Fonts (como hoy) es aceptable; cualquier fuente nueva debe cargarse igual, sin autoalojar binarios nuevos.
6. No hay suite de pruebas automatizadas en el repo (`package.json` solo tiene `start` y `dev`), por lo que la verificación es manual/por inspección.

---

## Inventario de contenido existente (debe preservarse)

### Identidad y metadatos

- Nombre: **Nicolás Espitia**; nombre completo en JSON-LD: **Nicolás Andrey Espitia Suárez**.
- Rol: Estudiante de Ingeniería de Sistemas, **7° semestre**, Colombia.
- `<title>`: "Nicolás Espitia — Ingeniería de Sistemas".
- `meta description`: "Portafolio de Nicolás Espitia, estudiante de séptimo semestre de Ingeniería de Sistemas con experiencia en desarrollo móvil, redes de comunicación, bases de datos y servicios cloud."
- Open Graph: `og:type=website`, `og:locale=es_CO`, `og:title`, `og:description` ("Desarrollo de software, redes, datos e inteligencia artificial con una visión orientada a seguridad.").
- `<html lang="es">`, `meta color-scheme=dark`, `meta theme-color` (actualmente `#111416`; puede cambiar con la paleta nueva).
- JSON-LD `schema.org/Person` con: name, jobTitle, email `mailto:espitiasuareznicolas@gmail.com`, telephone `+57 304 672 1626`, `addressCountry: CO`, `sameAs: https://github.com/Nick3030w`, y `knowsAbout`: Desarrollo de software, Redes de comunicación, Bases de datos SQL y NoSQL, Google Cloud, Aplicaciones móviles Android, Ciberseguridad.
- Monograma de marca: **NE**. Favicon: SVG con "N" trazada sobre fondo oscuro y punto de acento.

### Navegación y marca

- Skip link: "Saltar al contenido principal" → `#main-content`.
- Marca `NE` en header (enlace a `#inicio`, `aria-label` "Nicolás Espitia, ir al inicio") y en footer ("Volver al inicio").
- Enlaces de navegación con sus anclas: Inicio `#inicio`, Perfil `#perfil`, Stack `#capacidades`, Proyectos `#proyectos`, Contacto `#contacto`.
- Píldora de disponibilidad: "Disponible para colaborar" → `#contacto`.

### Hero (`#inicio`)

- Eyebrow: "Ingeniería de Sistemas · 7° semestre · Colombia".
- H1: "Ingeniería para sistemas **que conectan.**"
- Intro: "Soy **Nicolás Espitia**. Desarrollo aplicaciones móviles y soluciones digitales que integran datos, servicios cloud y experiencias claras, con una base sólida en **redes de comunicación** y orientación hacia la ciberseguridad."
- CTAs: "Explorar proyectos" → `#proyectos`; "Escribirme" → `mailto:espitiasuareznicolas@gmail.com`.
- Hechos (`dl` "Resumen profesional"): Formación / 7° semestre · Experiencia / Software + redes · Interés / Seguridad + cloud.
- Visual: topología SVG `network_overview` con nodo central NE (`SYSTEMS`) y nodos APP, WEB, DATA, SEC; estado "online"; tarjetas "Proyectos seleccionados 04 — ai · mobile · web · game" y "Enfoque profesional — Redes & seguridad"; `figcaption` accesible "Mi perfil integra desarrollo de software, redes, datos cloud y orientación a seguridad."
- Indicio de scroll: "Descubrir" → `#perfil`.

### Perfil (`#perfil`, índice "01 / PERFIL")

- H2: "Base técnica. / Visión integral."
- Lead: "Combino *desarrollo de software*, *redes* y *datos* para diseñar soluciones lógicas, estructuradas y orientadas a la seguridad."
- Párrafo 1: séptimo semestre, conocimientos en redes de comunicación y bases de datos SQL y NoSQL; experiencia académica en apps Android, persistencia no relacional y laboratorios físicos de conectividad.
- Párrafo 2: modelado de sistemas, modelado de redes y datos en la nube con Google Cloud; responsabilidad, aprendizaje autónomo, resolución de problemas, trabajo colaborativo con Scrum.
- Estadísticas: 7° / Semestre actual · 04 / Proyectos destacados · SQL / + NoSQL & cloud.
- Tarjeta "PERFIL / 2026 — Séptimo semestre", título "Ingeniería aplicada", con tres etapas: Desarrollo → "Soluciones web y móviles"; Infraestructura → "Redes, datos y cloud"; Proyección → "Seguridad por diseño" (con sus descripciones y el marcador de etapa actual).

### Capacidades (`#capacidades`, índice "02 / CAPACIDADES")

- H2: "Capacidades para / soluciones conectadas." + bajada descriptiva.
- Cuatro tarjetas numeradas 01–04 con título, descripción y lista de tecnologías:
  1. Software web & móvil — React 18, Angular 20, Ionic 8, TypeScript, Capacitor.
  2. Datos & nube — SQL, NoSQL, Cloud Firestore, Firebase, Google Cloud.
  3. Redes & seguridad — Redes de comunicación, Modelado de redes, Laboratorios físicos, Seguridad por diseño.
  4. IA & experiencias (etiqueta "SISTEMAS INTELIGENTES E INTERACTIVOS") — Gemini 2.5 Flash, IA multimodal, Unity, C#, Framer Motion.

### Proyectos (`#proyectos`, índice "03 / PROYECTOS")

- H2: "Soluciones con / contexto real." + bajada ("Cuatro proyectos que conectan ingeniería, producto y necesidades concretas: movilidad, educación, servicios universitarios y presencia digital.").
- **01 MotoCheck** — "IA multimodal · Android". Resumen, cifras (03 modalidades de análisis, 2.5 Gemini Flash, COP costos localizados), 3 viñetas, stack (React 18, TypeScript 6, Gemini 2.5, Firebase, Capacitor 6, Google Maps, Framer Motion), repo `https://github.com/Nick3030w/MotoCheck`.
- **02 Neogranada Conecta** — "Aplicación móvil · Académico". Resumen (UMNG, préstamo/reserva de recursos), cifras (02 perfiles, 08 tipos de recurso, Live reservas y chat), 3 viñetas, stack (Angular 20, Ionic 8, Capacitor 8, Firebase, TypeScript, RxJS), repo `https://github.com/Nick3030w/Neogranada_Conecta`.
- **03 Black Hole Immersive** — "Proyecto de grado · En desarrollo". Resumen (videojuego educativo), cifras (04 áreas científicas, LTS Unity 2022.3, C# lógica de juego), 3 viñetas, stack (Unity 2022.3, C#, Shader Graph, UI Toolkit, Game Design), repo `https://github.com/Nick3030w/BlackHole-Inmersive`.
- **04 Web Logika** — "Catálogo digital · Comercial". Resumen (Logika Decoración, muebles en Bogotá), cifras (07 categorías, 320+ diseño responsive, WA conversión directa), 3 viñetas, stack (Next.js 14, React, TypeScript, Tailwind CSS, Firebase), repo `https://github.com/Nick3030w/Web-Logika`.
- Cada enlace de repositorio: texto "Explorar repositorio", `target="_blank" rel="noopener noreferrer"` y aviso `sr-only` "(abre en una pestaña nueva)".
- Cada proyecto tiene hoy un mockup conceptual construido en CSS/SVG (teléfono MotoCheck con blueprint de moto y tarjetas flotantes; teléfono Neogranada con órbitas; sistema de agujero negro con disco de acreción y telemetría; navegador Logika con escena de sala). El **mensaje** de cada visual (vista previa conceptual del producto, etiquetada "Vista conceptual · …") es contenido; su **ejecución gráfica** es dirección de arte y puede rediseñarse.

### Especialización

- H2: "Conectar con criterio. / Proteger desde el diseño." con el índice "ENFOQUE PROFESIONAL / EVOLUCIÓN", párrafo de contexto y dos etapas: 01 BASE TÉCNICA "Redes & servicios cloud" → 02 PROYECCIÓN "Ciberseguridad", con sus descripciones y conector.

### Contacto (`#contacto`, índice "04 / CONTACTO")

- H2: "Construyamos el / siguiente sistema." + párrafo invitación.
- Enlaces directos: EMAIL `espitiasuareznicolas@gmail.com` (`mailto:`), TELÉFONO `+57 304 672 1626` (`tel:+573046721626`), GITHUB `@Nick3030w` (`https://github.com/Nick3030w`, nueva pestaña con aviso `sr-only`).
- Formulario "Nuevo mensaje": campos Nombre, Correo, Mensaje; honeypot `website`; botón "Enviar mensaje"; nota "Responderé tan pronto como sea posible."; zona de feedback.

### Footer

- Marca NE, "Nicolás Espitia · Ingeniería de Sistemas", "Colombia / <año actual>" (inyectado por JS en `#current-year`), enlace "Volver arriba ↑" → `#inicio`.

---

## Requisitos funcionales

**RF-1 — Dirección de arte nueva y reconocible.** `index.html`, `style.css`, `script.js` y `favicon.svg` se rediseñan con una dirección visual distinta de la actual, manteniendo un registro profesional e ingenieril (precisión, retícula, datos, notación técnica) y sin recurrir a estética decorativa o "juguetona". La comparación contra `public/screenshots/preview.png` (estado anterior) debe mostrar un cambio evidente de composición, tipografía y tratamiento de superficies, no solo de color.

**RF-2 — Estructura informativa y anclas.** Se conservan las secciones Inicio, Perfil, Capacidades/Stack, Proyectos, Especialización y Contacto con los ids `inicio`, `perfil`, `capacidades`, `proyectos`, `contacto`, el `main#main-content`, el skip link y el atributo `data-nav-section` (o el mecanismo equivalente que el diseño defina) para el resaltado de sección activa.

**RF-3 — Contenido literal preservado.** Todos los textos, cifras, nombres de proyecto, listas de stack, correos, teléfono, URLs de GitHub, JSON-LD y metadatos del inventario anterior se mantienen en español. Si el rediseño exige reformular una etiqueta de UI (p. ej. el rótulo de un índice de sección), el cambio debe ser mínimo y conservar el significado; los textos de contenido (bio, resúmenes de proyecto, viñetas) no se reescriben.

**RF-4 — Navegación.** Enlaces de navegación por anclas con desplazamiento suave, estado activo sincronizado con la sección visible (`IntersectionObserver`), `aria-current="location"` en el enlace activo y estado del header al hacer scroll.

**RF-5 — Menú móvil.** Botón `#menu-toggle` con `aria-expanded`, `aria-controls`, `aria-label` conmutado entre "Abrir/Cerrar menú de navegación", cierre al pulsar un enlace, cierre con `Escape`, cierre al superar el breakpoint de escritorio al redimensionar y bloqueo del scroll del body mientras está abierto.

**RF-6 — Formulario de contacto contra `/api/contact`.** Se preserva íntegra la integración con el backend:
- `POST /api/contact`, `Content-Type: application/json`, cuerpo `{ name, email, message, website }`.
- Campos `name` (2–100), `email` (≤254, formato válido), `message` (10–2000) y honeypot `website` oculto, no enfocable (`tabindex="-1"`, `autocomplete="off"`), nunca completado por el usuario.
- Validación en cliente antes del envío, estado de carga en el botón ("Enviando…" + `aria-busy`), timeout de 12 s vía `AbortController`, reseteo del formulario en éxito.
- Mensajes de éxito/error en una región `role="status" aria-live="polite"`, que recibe foco programático; se muestra `result.error` del servidor cuando llega (incluye 400 de validación y 429 de rate limit).
- `server.js` no se modifica.

**RF-7 — Animaciones profesionales.** El rediseño conserva un sistema de movimiento intencional: revelado progresivo al hacer scroll con `IntersectionObserver` y escalonado, transiciones de estado en elementos interactivos, y al menos un elemento de movimiento ambiental/continuo propio de la nueva dirección. El movimiento refuerza la jerarquía; no hay animaciones puramente decorativas que compitan con la lectura.

**RF-8 — Interacciones de puntero con degradación.** Los efectos que dependan de puntero fino (tilt, magnetismo, luz que sigue al cursor o su equivalente en el nuevo diseño) se activan solo bajo `(hover: hover) and (pointer: fine)` y con movimiento permitido; en táctil y en `prefers-reduced-motion` la página se ve y funciona completa sin ellos.

**RF-9 — Año dinámico.** El footer sigue mostrando el año actual inyectado por JS (`#current-year` o equivalente), con un valor de respaldo en el HTML.

**RF-10 — Favicon coherente.** `favicon.svg` se actualiza para alinearse con la nueva identidad (monograma NE o marca derivada) y `meta theme-color` se ajusta al nuevo fondo.

---

## Requisitos no funcionales

**RNF-1 — Sin dependencias de build.** Cero compiladores, preprocesadores, bundlers o paquetes npm nuevos. Sigue siendo HTML/CSS/JS vanilla servido estáticamente por Express; `package.json` no cambia.

**RNF-2 — Rendimiento de animación.** Toda animación continua o disparada por scroll se expresa con `transform` y `opacity` (propiedades compuestas); se evita animar layout (`width`, `height`, `top`, `left`, `margin`) y se evita `box-shadow`/`filter` en bucles continuos. Los listeners de scroll y `pointermove` van con `{ passive: true }` y agrupados en `requestAnimationFrame`.

**RNF-3 — Accesibilidad.** Contraste AA en texto y controles, foco visible en todos los elementos interactivos, jerarquía de encabezados única y ordenada (un solo `h1`), orden del DOM igual al orden de lectura, etiquetas asociadas a cada campo, `aria-hidden` en elementos puramente decorativos, soporte de `prefers-reduced-motion: reduce` y de `forced-colors: active`.

**RNF-4 — Responsive.** Diseño funcional y pulido de 360 px a 1440 px y por encima, sin scroll horizontal; `body` con `min-width` segura; títulos display con tipografía fluida que no desborde la retícula en pantallas pequeñas.

**RNF-5 — Peso y carga.** El HTML, CSS y JS resultantes no deben crecer de forma desproporcionada respecto del actual (≈50 KB HTML, ≈95 KB CSS, ≈11 KB JS); se prefiere reducir el CSS. Sin imágenes rasterizadas nuevas: los visuales se construyen con CSS/SVG inline, como hoy. Se mantienen `preconnect` a Google Fonts y `display=swap`.

**RNF-6 — Compatibilidad.** Navegadores evergreen (Chrome, Edge, Firefox, Safari). Cualquier característica moderna (`:has()`, `@container`, `scroll-driven animations`, `view-transition`) solo se usa con degradación limpia: la ausencia de soporte no debe dejar contenido invisible ni roto.

**RNF-7 — Calidad de código.** Un solo archivo CSS con secciones comentadas y tokens en `:root`; un solo IIFE en `script.js` con `'use strict'`, sin globales filtradas, sin librerías externas. Comentarios en español, como el código actual.

---

## Criterios de aceptación

1. **Diferenciación visual** — Comparada con `public/screenshots/preview.png`, la página rediseñada presenta distinta retícula de composición, distinto sistema tipográfico o escala, distinta paleta y distinto tratamiento de superficies/bordes. Un revisor que vea ambas capturas las identifica como diseños diferentes, no como variantes del mismo.
2. **Carácter requerido** — La nueva dirección puede justificarse como "profesional e ingenieril": retícula visible o implícita, notación técnica, datos legibles, cero elementos infantiles, cero iconografía genérica de plantilla.
3. **Contenido completo** — Todo elemento del inventario de contenido está presente en el HTML final, en español, con los mismos valores: 4 proyectos con sus 4 URLs de GitHub, correo `espitiasuareznicolas@gmail.com`, teléfono `+57 304 672 1626`, `@Nick3030w`, las 4 tarjetas de capacidades con sus listas de stack completas, las estadísticas de perfil y el JSON-LD íntegro.
4. **Anclas operativas** — Cada enlace de navegación (`#inicio`, `#perfil`, `#capacidades`, `#proyectos`, `#contacto`) y los enlaces "Descubrir", "Volver arriba", "Disponible para colaborar" y la marca llevan a su destino sin dejar el título bajo el header fijo (`scroll-padding-top` suficiente).
5. **Sección activa** — Al desplazarse por la página, exactamente un enlace de navegación queda marcado como activo y expone `aria-current="location"`; el estado cambia al entrar en cada sección.
6. **Menú móvil a 360 px** — El botón abre y cierra el menú, `aria-expanded` refleja el estado, el `aria-label` alterna, `Escape` cierra, pulsar un enlace cierra y navega, el scroll del body queda bloqueado mientras está abierto y el menú se cierra automáticamente al pasar a anchura de escritorio.
7. **Envío exitoso del formulario** — Con nombre ≥2, correo válido y mensaje ≥10 caracteres, se hace un único `POST /api/contact` con JSON `{name,email,message,website}`; durante la espera el botón se deshabilita y muestra "Enviando…"; con `{success:true}` el formulario se limpia y la región de estado anuncia el mensaje de éxito y recibe foco.
8. **Errores del formulario** — Campos inválidos impiden el envío y muestran mensaje de error; una respuesta 400/429/500 muestra el texto `error` del servidor en la región de estado; un fallo de red o un `AbortError` a los 12 s muestra el mensaje correspondiente; en todos los casos el botón vuelve a estado habilitado.
9. **Honeypot intacto** — El campo `website` existe, está oculto visualmente, no es alcanzable con teclado ni por autocompletado, y su valor viaja en el payload.
10. **Responsive 360 / 768 / 1440** — En esas tres anchuras no hay scroll horizontal, ningún texto se desborda ni se solapa, los mockups de proyecto se escalan o simplifican, y todo objetivo táctil mide al menos 44 × 44 px en móvil.
11. **`prefers-reduced-motion: reduce`** — Con la preferencia activa: no hay animaciones continuas ni efectos de tilt/magnetismo, todo el contenido `reveal` es visible sin depender de JS de animación, `scroll-behavior` pasa a `auto`, y activar la preferencia en caliente (evento `change` del media query) revela de inmediato el contenido pendiente.
12. **Foco visible** — Recorrer la página solo con `Tab` permite alcanzar skip link, marca, botón de menú, todos los enlaces de navegación, CTAs, enlaces de proyecto, enlaces de contacto, campos del formulario y botón de envío, cada uno con un indicador de foco claramente visible y con contraste suficiente sobre su fondo.
13. **Rendimiento 60 fps** — Una grabación del panel Performance durante scroll completo e interacción con el hero no muestra animaciones de propiedades que provoquen layout o paint recurrentes; las animaciones de scroll y las continuas usan solo `transform`/`opacity`; el revelado se dispara con `IntersectionObserver` y cada elemento se deja de observar tras revelarse.
14. **Consola limpia** — Cargar la página, desplazarse por todas las secciones, abrir/cerrar el menú móvil y enviar el formulario (éxito y error) no produce ningún error ni advertencia en la consola del navegador, ni peticiones de red 404 (fuentes, favicon, script, estilos incluidos).
15. **HTML válido y semántico** — Un solo `h1`, encabezados en orden, `lang="es"`, landmarks `header`/`main`/`footer`/`nav`, `label` asociado a cada control, sin ids duplicados.
16. **Cero dependencias nuevas** — `git diff` no toca `package.json`, `package-lock.json` ni `server.js`; el sitio arranca con `npm start` y funciona sin pasos de build.
17. **Favicon y theme-color** — El favicon nuevo se renderiza correctamente en pestaña a 16 px y su lenguaje coincide con el del sitio; `meta theme-color` concuerda con el color de fondo real.

---

## Preguntas abiertas de dirección de arte (a resolver en la fase de diseño)

Estas decisiones son deliberadamente abiertas aquí; el documento de diseño debe cerrarlas eligiendo una opción y justificándola, no dejando alternativas:

1. **Metáfora visual rectora.** ¿Qué lenguaje ingenieril articula el rediseño: plano técnico/blueprint cotado, consola o terminal de telemetría, tablero de instrumentación, diagrama de sistemas y trazas, o brutalismo editorial con retícula expuesta? Debe elegirse uno y aplicarse con coherencia a hero, secciones, tarjetas y mockups.
2. **Paleta.** ¿Se conserva la base oscura con un acento nuevo, se pasa a un oscuro con temperatura distinta (azul/grafito/papel invertido), o a un esquema de alto contraste casi monocromo con un único acento señalizador? ¿Qué pasa con el mint `#67f5d2` actual: se retira, se degrada a secundario o se sustituye? Definir tokens exactos y verificar AA.
3. **Tipografía.** ¿Se cambia Space Grotesk por otra display (grotesca técnica, serif ingenieril, variable) y se mantiene IBM Plex Mono como voz de datos, o se adopta un sistema mono-dominante? Definir familias, pesos cargados, escala y el impacto en peso de carga.
4. **Retícula y composición.** ¿Retícula asimétrica con columna de índice fija, retícula de 12 columnas con líneas visibles, layout por franjas a sangre completa, o navegación lateral/vertical? ¿Se conserva el ancho de `--shell` de 1220 px?
5. **Tratamiento de los mockups de proyecto.** ¿Se rediseñan los cuatro visuales CSS/SVG en el nuevo lenguaje, se sustituyen por un sistema más abstracto y ligero (diagramas, fichas técnicas, cortes esquemáticos), o se reduce su protagonismo a favor del dato? Esta decisión gobierna buena parte de los ~95 KB de CSS actuales.
6. **Sistema de movimiento.** ¿Qué repertorio concreto: revelados por máscara/clip, escritura o conteo de datos, trazado de líneas SVG, desplazamiento con parallax contenido, transiciones de estado en tarjetas? ¿Se conservan tilt y botones magnéticos o se reemplazan por otra firma de interacción? Definir duraciones, curvas y escalonado.
7. **Navegación.** ¿Header fijo horizontal (como hoy), header que se contrae, o un indicador de progreso/índice lateral? ¿Se mantiene la píldora "Disponible para colaborar" en el header?
8. **Jerarquía de la sección Capacidades.** ¿Se mantienen cuatro tarjetas en retícula o se reinterpreta como matriz, tabla técnica o lista de especificaciones?
9. **Modo claro.** ¿Se descarta (supuesto por defecto) o se incorpora un toggle? Si se incorpora, hay que especificar persistencia, token set completo y su efecto en los criterios de contraste.
10. **Captura de vista previa.** `README.md` referencia `./screenshots/preview.png`, que muestra el diseño anterior. ¿Se regenera la captura como parte de esta tarea o se deja para un paso posterior? (Fuera de alcance por defecto, ver abajo.)

---

## Fuera de alcance

- Modificar `server.js`, el endpoint `/api/contact`, el envío por nodemailer, el rate limit o las cabeceras de seguridad.
- Cambiar `package.json`, `package-lock.json` o añadir dependencias, herramientas de build, linters o pruebas.
- Reescribir, traducir o ampliar el contenido: no se añaden proyectos, experiencia, certificaciones ni secciones nuevas, ni se cambia el idioma.
- Añadir nuevas páginas o rutas, un blog, descarga de CV o internacionalización.
- Analítica, cookies, consentimiento o integraciones de terceros.
- Cambios de despliegue, configuración de Railway, dominio o variables de entorno.
- Actualizar `README.md` o regenerar `public/screenshots/preview.png` (podrá hacerse en un paso posterior si el usuario lo pide).
