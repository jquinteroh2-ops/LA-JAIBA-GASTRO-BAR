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
  requestAnimationFrame(animParticles);
}
animParticles();

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

// TABS
function showTab(name, e) {
  document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + name).classList.add('active');
  e.target.classList.add('active');
}

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
  const isEspecial = mode === 'especial';
  document.getElementById('form-normal').classList.toggle('hidden', isEspecial);
  document.getElementById('form-especial').classList.toggle('hidden', !isEspecial);
  document.getElementById('info-normal').classList.toggle('hidden', isEspecial);
  document.getElementById('info-especial').classList.toggle('hidden', !isEspecial);
  document.getElementById('btn-normal').className = 'res-toggle-btn' + (isEspecial ? '' : ' active-normal');
  document.getElementById('btn-especial').className = 'res-toggle-btn' + (isEspecial ? ' active-especial' : '');
}

// SEND NORMAL RESERVATION
function sendReservation() {
  const name = document.getElementById('res-nombre').value.trim();
  const phone = document.getElementById('res-telefono').value.trim();
  const date = document.getElementById('res-fecha').value;
  const time = document.getElementById('res-hora').value;
  const persons = document.getElementById('res-personas').value;
  const msg = document.getElementById('res-mensaje').value.trim();

  if (!name) { showToast('⚠️ Por favor ingresa tu nombre.'); document.getElementById('res-nombre').focus(); return; }
  if (!phone) { showToast('⚠️ Por favor ingresa tu teléfono.'); document.getElementById('res-telefono').focus(); return; }
  if (!date) { showToast('⚠️ Por favor selecciona una fecha.'); document.getElementById('res-fecha').focus(); return; }

  const text = `Hola La Jaiba Gastrobar! 🦀\n\nQuiero hacer una reserva:\n👤 Nombre: ${name}\n📱 Teléfono: ${phone}\n📅 Fecha: ${date}\n🕐 Hora: ${time}\n👥 Personas: ${persons}${msg ? '\n💬 Mensaje: ' + msg : ''}\n\n¡Gracias!`;
  window.open(`https://api.whatsapp.com/send?phone=573022713343&text=${encodeURIComponent(text)}`, '_blank');
  showToast('✅ ¡Reserva enviada por WhatsApp!');
}

// SEND SPECIAL RESERVATION
function sendSpecialReservation() {
  const name = document.getElementById('ev-nombre').value.trim();
  const phone = document.getElementById('ev-telefono').value.trim();
  const tipo = document.getElementById('ev-tipo').value;
  const asistentes = document.getElementById('ev-asistentes').value;
  const date = document.getElementById('ev-fecha').value;
  const horaInicio = document.getElementById('ev-hora-inicio').value;
  const horaFin = document.getElementById('ev-hora-fin').value;
  const servicios = document.getElementById('ev-servicios').value.trim();

  if (!name) { showToast('⚠️ Por favor ingresa tu nombre.'); document.getElementById('ev-nombre').focus(); return; }
  if (!phone) { showToast('⚠️ Por favor ingresa tu teléfono.'); document.getElementById('ev-telefono').focus(); return; }
  if (!tipo) { showToast('⚠️ Por favor selecciona el tipo de evento.'); document.getElementById('ev-tipo').focus(); return; }
  if (!asistentes) { showToast('⚠️ Por favor selecciona el número de asistentes.'); document.getElementById('ev-asistentes').focus(); return; }
  if (!date) { showToast('⚠️ Por favor selecciona la fecha del evento.'); document.getElementById('ev-fecha').focus(); return; }

  const text = `Hola La Jaiba Gastrobar! 🎉\n\nConsulta de *Reserva Especial — Salón de Eventos*:\n\n👤 Nombre: ${name}\n📱 Teléfono: ${phone}\n🎊 Tipo de evento: ${tipo}\n👥 Asistentes: ${asistentes}\n📅 Fecha: ${date}\n🕐 Horario: ${horaInicio} — ${horaFin}${servicios ? '\n✨ Servicios requeridos: ' + servicios : ''}\n\n¡Quedo atento a su respuesta!`;
  window.open(`https://api.whatsapp.com/send?phone=573022713343&text=${encodeURIComponent(text)}`, '_blank');
  showToast('🎉 ¡Consulta de evento enviada por WhatsApp!');
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