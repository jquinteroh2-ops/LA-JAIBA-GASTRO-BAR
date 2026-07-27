/* ============================================================
   MODO MANTENIMIENTO — BOTONES SIN FUNCIONALIDAD
   ------------------------------------------------------------
   Deja todos los botones del sitio inertes: se ven igual pero
   no ejecutan ninguna accion (no abren modales, no filtran,
   no envian nada por WhatsApp, no abren el lightbox...).

   Los enlaces con destino real (index.html, menu.html, #seccion)
   SI siguen navegando, para poder recorrer el sitio mientras
   trabajas. Si tambien los quieres muertos, mira el paso 3.

   PARA REACTIVAR LOS BOTONES:
     1) Pon aqui abajo:  const BOTONES_ACTIVOS = true;
        (o borra el <script> de este archivo en los HTML)
   ============================================================ */

const BOTONES_ACTIVOS = false;

(function desactivarBotones() {
  if (BOTONES_ACTIVOS) return;

  /* Todo lo que se comporta como boton */
  var SELECTOR_BOTON = [
    'button',
    'input[type="button"]',
    'input[type="submit"]',
    'input[type="reset"]',
    '[role="button"]',
    '[onclick]',
    'summary'
  ].join(',');

  /* true = es un enlace que debe seguir navegando normalmente */
  function esEnlaceNavegable(el) {
    if (el.tagName !== 'A') return false;
    var href = el.getAttribute('href');
    if (!href || href === '#') return false;
    if (/^javascript:/i.test(href)) return false;
    return true;
  }

  /* ---- 1. Corta la accion antes de que llegue a cualquier handler ---- */
  function bloquear(e) {
    var el = e.target && e.target.closest ? e.target.closest(SELECTOR_BOTON) : null;
    if (!el) return;
    if (esEnlaceNavegable(el)) return;   // el enlace navega, pero sin su onclick (paso 2)
    e.preventDefault();
    e.stopPropagation();
  }

  /* Fase de captura: se ejecuta antes que los onclick del HTML
     y antes que los addEventListener de script.js / menu.js / reservas.js */
  ['click', 'submit'].forEach(function (evento) {
    document.addEventListener(evento, bloquear, true);
  });

  /* ---- 2. Marca los botones y quita los onclick de los enlaces ---- */
  function prepararDOM() {
    document.querySelectorAll(SELECTOR_BOTON).forEach(function (el) {
      if (esEnlaceNavegable(el)) {
        el.removeAttribute('onclick');   // navega, pero no ejecuta su funcion
      } else {
        el.setAttribute('aria-disabled', 'true');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', prepararDOM);
  } else {
    prepararDOM();
  }

  /* ---- 3. (opcional) Matar TAMBIEN la navegacion entre paginas ----
     Descomenta este bloque si no quieres que ningun enlace funcione:

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a');
    if (a) { e.preventDefault(); e.stopPropagation(); }
  }, true);
  */
})();
