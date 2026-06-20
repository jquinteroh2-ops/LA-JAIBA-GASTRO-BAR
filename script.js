// LIQUID GLASS BUBBLES
(function initLiquidGlass() {
  const layer = document.getElementById('lgLayer');
  if (!layer) return;
  const count = window.innerWidth < 768 ? 7 : 15;
  for (let i = 0; i < count; i++) {
    const b = document.createElement('div');
    b.className = 'lg-b';
    const size = Math.random() * 140 + 35;           // 35–175 px
    const left = Math.random() * 88 + 4;             // 4–92 %
    const dur  = (Math.random() * 22 + 20).toFixed(1); // 20–42 s
    const del  = (Math.random() * 25).toFixed(1);
    const dx   = ((Math.random() - 0.5) * 90).toFixed(0);
    const dx2  = ((Math.random() - 0.5) * 70).toFixed(0);
    b.style.cssText =
      `width:${size}px;height:${size}px;` +
      `left:${left}%;bottom:${(Math.random() * -15).toFixed(0)}%;` +
      `animation-duration:${dur}s;animation-delay:-${del}s;` +
      `--dx:${dx}px;--dx2:${dx2}px;`;
    layer.appendChild(b);
  }
})();

// PARTICLES
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });

const particles = [];
for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 0.5,
    speedX: (Math.random() - 0.5) * 0.5,
    speedY: (Math.random() - 0.5) * 0.5,
    opacity: Math.random() * 0.6 + 0.1,
    color: Math.random() > 0.5 ? '14,110,140' : '200,151,42'
  });
}

// BUBBLES
const bubbles = [];
const BUBBLE_COUNT = 35;

function createBubble(fromBottom) {
  return {
    x: Math.random() * canvas.width,
    y: fromBottom ? canvas.height + Math.random() * 60 : Math.random() * canvas.height,
    radius: Math.random() * 18 + 4,
    speedY: Math.random() * 0.65 + 0.25,
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: (Math.random() - 0.5) * 0.045,
    opacity: Math.random() * 0.28 + 0.07,
  };
}

for (let i = 0; i < BUBBLE_COUNT; i++) bubbles.push(createBubble(false));

function animParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.speedX; p.y += p.speedY;
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.color},${p.opacity})`;
    ctx.fill();
  });

  bubbles.forEach((b, i) => {
    b.wobble += b.wobbleSpeed;
    b.x += Math.sin(b.wobble) * 0.55;
    b.y -= b.speedY;
    if (b.y + b.radius < 0) bubbles[i] = createBubble(true);

    ctx.save();
    ctx.globalAlpha = b.opacity;

    ctx.beginPath();
    ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(14,200,230,0.85)';
    ctx.lineWidth = 1.3;
    ctx.stroke();
    ctx.fillStyle = 'rgba(14,200,230,0.04)';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(b.x - b.radius * 0.28, b.y - b.radius * 0.3, b.radius * 0.22, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fill();

    ctx.restore();
  });

  requestAnimationFrame(animParticles);
}
animParticles();

// DATE CONSTRAINTS — reserva normal solo desde hoy en adelante
(function setDateMin() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm   = String(d.getMonth() + 1).padStart(2, '0');
  const dd   = String(d.getDate()).padStart(2, '0');
  const fechaInput = document.getElementById('res-fecha');
  if (fechaInput) fechaInput.min = `${yyyy}-${mm}-${dd}`;
})();

// HERO BUBBLES
(function spawnHeroBubbles() {
  const hero = document.getElementById('hero');
  for (let i = 0; i < 28; i++) {
    const b = document.createElement('div');
    b.className = 'hero-bubble';
    const size   = Math.random() * 28 + 6;
    const left   = Math.random() * 100;
    const delay  = Math.random() * 12;
    const dur    = Math.random() * 10 + 8;
    const drift  = ((Math.random() - 0.5) * 80).toFixed(1);
    const bottom = Math.random() * 30;
    b.style.Text =
      `width:${size}px;height:${size}px;` +
      `left:${left}%;bottom:${bottom}%;` +
      `animation-duration:${dur}s;animation-delay:-${delay}s;` +
      `--drift:${drift}px;`;
    hero.appendChild(b);
  }
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

// BOOK MENU
(function () {
  let current = 0;
  const total = 2;
  let flipping = false;
  let touchStartX = 0;

  function update() {
    const card = document.getElementById('bookCard');
    if (!card) return;
    card.classList.toggle('flipped', current === 1);
    document.getElementById('prevPage').disabled = current === 0;
    document.getElementById('nextPage').disabled = current === total - 1;
    for (let i = 0; i < total; i++) {
      const dot = document.getElementById('dot-' + i);
      if (dot) dot.classList.toggle('active', i === current);
    }
    const tip = document.querySelector('.book-tip');
    if (tip) tip.textContent = current === 0
      ? '🤚 Toca el lado derecho o desliza para pasar la página'
      : '🤚 Toca el lado izquierdo o desliza para volver';
  }

  window.flipPage = function (dir) {
    if (flipping) return;
    const next = current + dir;
    if (next < 0 || next >= total) return;
    flipping = true;
    current = next;
    update();
    setTimeout(() => { flipping = false; }, 780);
  };

  document.addEventListener('DOMContentLoaded', function () {
    const stage = document.getElementById('bookStage');
    if (!stage) return;

    stage.addEventListener('click', function (e) {
      const rect = stage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      window.flipPage(x > rect.width / 2 ? 1 : -1);
    });

    stage.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    stage.addEventListener('touchend', function (e) {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) window.flipPage(diff > 0 ? 1 : -1);
    }, { passive: true });

    update();
  });
})();

// ZOOM LIGHTBOX
const menuPages = ['img/menu nuevo 2.jpeg', 'img/menu nuevo 1.jpeg'];
let zoomCurrent = 0;

window.openMenuZoom = function () {
  zoomCurrent = (document.getElementById('bookCard') || {}).classList?.contains('flipped') ? 1 : 0;
  const overlay = document.getElementById('menuZoomOverlay');
  document.getElementById('menuZoomImg').src = menuPages[zoomCurrent];
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeMenuZoom = function (e) {
  if (e && e.target !== document.getElementById('menuZoomOverlay') && !e.target.classList.contains('menu-zoom-close')) return;
  document.getElementById('menuZoomOverlay').classList.remove('open');
  document.body.style.overflow = '';
};

window.zoomFlip = function (dir) {
  zoomCurrent = Math.max(0, Math.min(menuPages.length - 1, zoomCurrent + dir));
  document.getElementById('menuZoomImg').src = menuPages[zoomCurrent];
};

document.addEventListener('keydown', function (e) {
  const overlay = document.getElementById('menuZoomOverlay');
  if (!overlay || !overlay.classList.contains('open')) return;
  if (e.key === 'Escape') { overlay.classList.remove('open'); document.body.style.overflow = ''; }
  if (e.key === 'ArrowRight') window.zoomFlip(1);
  if (e.key === 'ArrowLeft') window.zoomFlip(-1);
});

// SCROLL REVEAL
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObserver.observe(el));

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

// 3D TILT on special cards
document.querySelectorAll('.special-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-8px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  card.addEventListener('touchend',   () => { card.style.transform = ''; });
});

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