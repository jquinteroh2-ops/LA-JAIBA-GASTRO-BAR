
// DATE CONSTRAINTS — reserva normal solo desde hoy en adelante
(function setDateMin() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm   = String(d.getMonth() + 1).padStart(2, '0');
  const dd   = String(d.getDate()).padStart(2, '0');
  const fechaInput = document.getElementById('res-fecha');
  if (fechaInput) fechaInput.min = `${yyyy}-${mm}-${dd}`;
})();


// NAVBAR SCROLL
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});

// HAMBURGER MENU
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  document.getElementById('navbar').classList.toggle('menu-open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

function closeNav() {
  navLinks.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.getElementById('navbar').classList.remove('menu-open');
  document.body.style.overflow = '';
}

document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
    closeNav();
  }
});



// TOAST
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// RESERVATION TOGGLE
function toggleReservaMode(mode) {
  ['normal', 'mesa6', 'especial'].forEach(m => {
    document.getElementById('form-' + m).classList.toggle('hidden', m !== mode);
    document.getElementById('info-' + m).classList.toggle('hidden', m !== mode);
    document.getElementById('btn-' + m).className = 'res-toggle-btn' + (m === mode ? ' active-' + m : '');
  });
}

// SEND MESA 6 RESERVATION
function sendMesa6Reservation() {
  const name   = document.getElementById('m6-nombre').value.trim();
  const phone  = document.getElementById('m6-telefono').value.trim();
  const evento = document.getElementById('m6-evento').value;
  const date   = document.getElementById('m6-fecha').value;
  const time   = document.getElementById('m6-hora').value;
  const msg    = document.getElementById('m6-mensaje').value.trim();

  if (!name)  { showToast('Por favor ingresa tu nombre.');   document.getElementById('m6-nombre').focus();   return; }
  if (!phone) { showToast('Por favor ingresa tu teléfono.'); document.getElementById('m6-telefono').focus(); return; }
  if (!date)  { showToast('Por favor selecciona una fecha.'); document.getElementById('m6-fecha').focus();   return; }
  if (time < '11:00' || time > '21:30') { showToast('El horario de atención es de 11:00 AM a 9:30 PM.'); document.getElementById('m6-hora').focus(); return; }

  const lines = [
    'Hola, La Jaiba Gastrobar.',
    '',
    'Solicitud de reserva — Mesa para 6 personas:',
    'Nombre: '   + name,
    'Telefono: ' + phone,
    evento ? 'Tipo de evento: ' + evento : '',
    'Fecha: '    + date,
    'Hora: '     + time,
    'Personas: 6',
  ].filter(Boolean);
  if (msg) lines.push('Mensaje: ' + msg);
  lines.push('', 'Quedo atento. Gracias.');

  window.open('https://api.whatsapp.com/send?phone=573022713343&text=' + encodeURIComponent(lines.join('\n')), '_blank');
  showToast('Reserva enviada por WhatsApp.');
}

// TOGGLE VIP ZONE
function toggleVipZone(zone) {
  document.getElementById('vip-zone-1').classList.toggle('hidden', zone !== 'vip1');
  document.getElementById('vip-zone-2').classList.toggle('hidden', zone !== 'vip2');
  document.getElementById('btn-vip1').classList.toggle('active', zone === 'vip1');
  document.getElementById('btn-vip2').classList.toggle('active', zone === 'vip2');
}

// SEND NORMAL RESERVATION
function sendReservation() {
  const name    = document.getElementById('res-nombre').value.trim();
  const phone   = document.getElementById('res-telefono').value.trim();
  const date    = document.getElementById('res-fecha').value;
  const time    = document.getElementById('res-hora').value;
  const persons = document.getElementById('res-personas').value;
  const msg     = document.getElementById('res-mensaje').value.trim();

  if (!name)  { showToast('Por favor ingresa tu nombre.');    document.getElementById('res-nombre').focus();   return; }
  if (!phone) { showToast('Por favor ingresa tu teléfono.');  document.getElementById('res-telefono').focus(); return; }
  if (!date)  { showToast('Por favor selecciona una fecha.');  document.getElementById('res-fecha').focus();   return; }
  if (time < '11:00' || time > '21:30') { showToast('El horario de atención es de 11:00 AM a 9:30 PM.'); document.getElementById('res-hora').focus(); return; }

  const lines = [
    'Hola, La Jaiba Gastrobar.',
    '',
    'Solicitud de reserva:',
    'Nombre: '    + name,
    'Telefono: '  + phone,
    'Fecha: '     + date,
    'Hora: '      + time,
    'Personas: '  + persons,
  ];
  if (msg) lines.push('Mensaje: ' + msg);
  lines.push('', 'Quedo atento. Gracias.');

  const text = lines.join('\n');
  window.open('https://api.whatsapp.com/send?phone=573022713343&text=' + encodeURIComponent(text), '_blank');
  showToast('Reserva enviada por WhatsApp.');
}

// SEND SPECIAL RESERVATION
function sendSpecialReservation() {
  const name       = document.getElementById('ev-nombre').value.trim();
  const phone      = document.getElementById('ev-telefono').value.trim();
  const zona       = document.getElementById('ev-zona').value;
  const tipo       = document.getElementById('ev-tipo').value;
  const date       = document.getElementById('ev-fecha').value;
  const horaInicio = document.getElementById('ev-hora-inicio').value;
  const horaFin    = document.getElementById('ev-hora-fin').value;
  const servicios  = document.getElementById('ev-servicios').value.trim();

  if (!name)  { showToast('Por favor ingresa tu nombre.');            document.getElementById('ev-nombre').focus();   return; }
  if (!phone) { showToast('Por favor ingresa tu teléfono.');          document.getElementById('ev-telefono').focus(); return; }
  if (!zona)  { showToast('Por favor selecciona la zona VIP.');       document.getElementById('ev-zona').focus();     return; }
  if (!tipo)  { showToast('Por favor selecciona el tipo de evento.'); document.getElementById('ev-tipo').focus();     return; }
  if (!date)  { showToast('Por favor selecciona la fecha del evento.'); document.getElementById('ev-fecha').focus(); return; }

  const lines = [
    'Hola, La Jaiba Gastrobar.',
    '',
    'Consulta de Reserva — Zonas VIP:',
    '',
    'Nombre: '         + name,
    'Telefono: '       + phone,
    'Zona solicitada: '+ zona,
    'Tipo de evento: ' + tipo,
    'Fecha: '          + date,
    'Horario: '        + horaInicio + ' - ' + horaFin,
  ];
  if (servicios) lines.push('Servicios requeridos: ' + servicios);
  lines.push('', 'Quedo atento. Gracias.');

  const text = lines.join('\n');
  window.open('https://api.whatsapp.com/send?phone=573022713343&text=' + encodeURIComponent(text), '_blank');
  showToast('Consulta de evento enviada por WhatsApp.');
}


// Ticker duplicate for seamless loop
const ticker = document.getElementById('ticker');
ticker.innerHTML += ticker.innerHTML;

// GALLERY FILTER
function filterGallery(cat, btn) {
  document.querySelectorAll('.gallery-filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#galleryGrid .gallery-item').forEach(item => {
    item.classList.toggle('gallery-hidden', cat !== 'all' && item.dataset.cat !== cat);
  });
}

// LIGHTBOX
const lbItems = [];
let lbIdx = 0;

(function initLightbox() {
  document.querySelectorAll('#galleryGrid .gallery-item').forEach(item => {
    const img = item.querySelector('img');
    if (!img) return;
    item.dataset.lbIdx = lbItems.length;
    lbItems.push({
      src: img.src,
      alt: img.alt,
      title: item.dataset.title || '',
      sub: item.dataset.sub || ''
    });
  });
})();

function openLightbox(el) {
  const idx = parseInt(el.dataset.lbIdx);
  if (isNaN(idx)) return;
  lbIdx = idx;
  renderLightbox();
  document.getElementById('lightboxOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function renderLightbox() {
  const it = lbItems[lbIdx];
  const img = document.getElementById('lightboxImg');
  img.src = it.src;
  img.alt = it.alt;
  document.getElementById('lightboxTitle').textContent = it.title;
  document.getElementById('lightboxSub').textContent = it.sub;
  document.querySelectorAll('.lightbox-nav').forEach(n => {
    n.style.visibility = lbItems.length <= 1 ? 'hidden' : 'visible';
  });
}

function closeLightbox() {
  document.getElementById('lightboxOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function lightboxNav(dir) {
  lbIdx = (lbIdx + dir + lbItems.length) % lbItems.length;
  const img = document.getElementById('lightboxImg');
  img.style.opacity = '0';
  setTimeout(() => {
    renderLightbox();
    img.style.opacity = '1';
  }, 180);
}

document.addEventListener('keydown', e => {
  const overlay = document.getElementById('lightboxOverlay');
  if (!overlay || !overlay.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lightboxNav(-1);
  if (e.key === 'ArrowRight') lightboxNav(1);
});

// Touch swipe for lightbox on mobile
// MODAL MENÚ COMPLETO
function openMenuModal() {
  const modal = document.getElementById('menuModal');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  modal.scrollTop = 0;
}

function closeMenuModal(e) {
  if (e instanceof MouseEvent && e.target !== document.getElementById('menuModal')) return;
  document.getElementById('menuModal').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const modal = document.getElementById('menuModal');
    if (modal && modal.classList.contains('open')) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }
});

(function initLightboxSwipe() {
  const overlay = document.getElementById('lightboxOverlay');
  let touchStartX = 0;
  overlay.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  overlay.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) < 40) return;
    lightboxNav(dx < 0 ? 1 : -1);
  }, { passive: true });
})();