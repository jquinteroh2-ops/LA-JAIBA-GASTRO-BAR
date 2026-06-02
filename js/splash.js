/* ============================================
   SPLASH SCREEN LOGIC — La Jaiba Gastrobar
   ============================================ */

(function () {
  const splash = document.getElementById('splash-screen');
  if (!splash) return;

  // ---- Generate particles ----
  const particlesContainer = splash.querySelector('.splash-particles');
  if (particlesContainer) {
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.width = (Math.random() * 4 + 2) + 'px';
      p.style.height = p.style.width;
      p.style.animationDuration = (Math.random() * 8 + 6) + 's';
      p.style.animationDelay = (Math.random() * 4) + 's';
      particlesContainer.appendChild(p);
    }
  }

  // ---- Generate bubbles ----
  const bubblesContainer = splash.querySelector('.bubbles-container');
  if (bubblesContainer) {
    createBubbles(bubblesContainer, 28);
  }

  // ---- Hide splash after animation ----
  const duration = 3000;
  setTimeout(() => {
    splash.classList.add('hidden');
    document.body.style.overflow = '';
    setTimeout(() => { splash.style.display = 'none'; }, 800);
  }, duration);

  document.body.style.overflow = 'hidden';
})();

/* Shared bubble creation utility — used by splash and hero */
function createBubbles(container, count) {
  for (let i = 0; i < count; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';

    const size = Math.random() * 50 + 10; // 10px – 60px
    const left = Math.random() * 100;
    const duration = Math.random() * 10 + 8; // 8s – 18s
    const delay = Math.random() * 12;
    const drift = (Math.random() - 0.5) * 80; // drift left/right ±40px
    const endScale = 0.8 + Math.random() * 0.6;

    bubble.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      --drift: ${drift}px;
      --end-scale: ${endScale};
      opacity: 0;
    `;

    container.appendChild(bubble);
  }
}
