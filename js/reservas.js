/* ============================================
   RESERVAS — Multi-step form logic
   ============================================ */

const WHATSAPP_NUMBER = '573022713343'; // <-- Cambia este número

const state = {
  step: 1,
  totalSteps: 5, // pasos visibles (la pantalla de exito es aparte)
  comensales: null,
  fecha: null,
  hora: null,
  nombre: '',
  telefono: '',
  email: '',
  ocasion: '',
  notas: '',
  calendarMonth: new Date().getMonth(),
  calendarYear: new Date().getFullYear(),
};

const MONTH_NAMES = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
];

const DAY_NAMES = ['Do','Lu','Ma','Mi','Ju','Vi','Sá'];

// ---- Step navigation ----

function showStep(n) {
  const panels = document.querySelectorAll('.step-panel');
  panels.forEach((p, i) => {
    p.classList.toggle('active', i + 1 === n);
  });

  // Hide progress UI on success screen
  const progressEl = document.querySelector('.reservas-progress');
  const indicatorEl = document.querySelector('.step-indicator');
  if (n > state.totalSteps) {
    if (progressEl) progressEl.style.display = 'none';
    if (indicatorEl) indicatorEl.style.display = 'none';
  } else {
    if (progressEl) progressEl.style.display = '';
    if (indicatorEl) indicatorEl.style.display = '';
    const steps = document.querySelectorAll('.progress-step');
    steps.forEach((s, i) => {
      s.classList.remove('done', 'active');
      if (i + 1 < n) s.classList.add('done');
      else if (i + 1 === n) s.classList.add('active');
    });
    const indicator = document.querySelector('.step-number');
    if (indicator) {
      indicator.innerHTML = `<span class="current">0${n}</span> de 0${state.totalSteps}`;
    }
  }

  state.step = n;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextStep() {
  if (!validateStep(state.step)) return;
  if (state.step < state.totalSteps) showStep(state.step + 1);
}

function prevStep() {
  if (state.step > 1) showStep(state.step - 1);
}

function validateStep(step) {
  if (step === 1 && !state.comensales) {
    alert('Por favor selecciona el número de personas.');
    return false;
  }
  if (step === 2 && !state.fecha) {
    alert('Por favor selecciona una fecha.');
    return false;
  }
  if (step === 3 && !state.hora) {
    alert('Por favor selecciona una hora.');
    return false;
  }
  if (step === 4) {
    const nombre = document.getElementById('r-nombre')?.value?.trim();
    const tel = document.getElementById('r-telefono')?.value?.trim();
    if (!nombre || !tel) {
      alert('Por favor completa tu nombre y teléfono.');
      return false;
    }
    state.nombre = nombre;
    state.telefono = tel;
    state.email = document.getElementById('r-email')?.value?.trim() || '';
    state.notas = document.getElementById('r-notas')?.value?.trim() || '';
    buildSummary();
  }
  return true;
}

// ---- Step 1: Comensales ----

function initComensales() {
  const btns = document.querySelectorAll('.comensal-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.comensales = parseInt(btn.dataset.value);
      document.getElementById('counter-value').textContent = state.comensales;
    });
  });

  document.getElementById('counter-minus')?.addEventListener('click', () => {
    if (state.comensales > 1) {
      state.comensales--;
      document.getElementById('counter-value').textContent = state.comensales;
      btns.forEach(b => b.classList.toggle('selected', parseInt(b.dataset.value) === state.comensales));
    }
  });

  document.getElementById('counter-plus')?.addEventListener('click', () => {
    if (!state.comensales) state.comensales = 1;
    state.comensales++;
    document.getElementById('counter-value').textContent = state.comensales;
    btns.forEach(b => b.classList.toggle('selected', parseInt(b.dataset.value) === state.comensales));
  });
}

// ---- Step 2: Calendar ----

function renderCalendar() {
  const container = document.getElementById('calendar-days');
  const monthLabel = document.getElementById('calendar-month');
  if (!container || !monthLabel) return;

  monthLabel.textContent = `${MONTH_NAMES[state.calendarMonth]} ${state.calendarYear}`;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const firstDay = new Date(state.calendarYear, state.calendarMonth, 1).getDay();
  const daysInMonth = new Date(state.calendarYear, state.calendarMonth + 1, 0).getDate();

  let html = '';

  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    html += '<div class="cal-day empty"></div>';
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(state.calendarYear, state.calendarMonth, d);
    const isPast = date < today;
    const isSunday = date.getDay() === 0;
    const isToday = date.toDateString() === today.toDateString();
    const dateStr = `${d} de ${MONTH_NAMES[state.calendarMonth]} de ${state.calendarYear}`;
    const isSelected = state.fecha === dateStr;

    let cls = 'cal-day';
    if (isPast || isSunday) cls += ' disabled';
    if (isToday) cls += ' today';
    if (isSelected) cls += ' selected';

    const disabled = isPast || isSunday;
    html += `<div class="${cls}" ${disabled ? '' : `data-date="${dateStr}"`}>${d}</div>`;
  }

  container.innerHTML = html;

  container.querySelectorAll('.cal-day:not(.disabled):not(.empty)').forEach(el => {
    el.addEventListener('click', () => {
      state.fecha = el.dataset.date;
      container.querySelectorAll('.cal-day').forEach(d => d.classList.remove('selected'));
      el.classList.add('selected');
    });
  });
}

function initCalendar() {
  renderCalendar();

  document.getElementById('cal-prev')?.addEventListener('click', () => {
    if (state.calendarMonth === 0) {
      state.calendarMonth = 11;
      state.calendarYear--;
    } else {
      state.calendarMonth--;
    }
    renderCalendar();
  });

  document.getElementById('cal-next')?.addEventListener('click', () => {
    if (state.calendarMonth === 11) {
      state.calendarMonth = 0;
      state.calendarYear++;
    } else {
      state.calendarMonth++;
    }
    renderCalendar();
  });
}

// ---- Step 3: Time ----

function initTime() {
  const btns = document.querySelectorAll('.time-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.hora = btn.dataset.time;
    });
  });
}

// ---- Step 4: Ocasion chips ----

function initOcasion() {
  const chips = document.querySelectorAll('.chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      state.ocasion = chip.dataset.value;
    });
  });
}

// ---- Step 5: Summary ----

function buildSummary() {
  const fields = {
    's-personas': state.comensales + ' personas',
    's-fecha': state.fecha || '-',
    's-hora': state.hora || '-',
    's-nombre': state.nombre,
    's-telefono': state.telefono,
    's-ocasion': state.ocasion || 'Sin especificar',
  };

  for (const [id, val] of Object.entries(fields)) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }
}

// ---- WhatsApp confirm ----

function confirmWhatsApp() {
  const msg = encodeURIComponent(
    `Hola! Quiero reservar una mesa:\n` +
    `👥 Personas: ${state.comensales}\n` +
    `📅 Fecha: ${state.fecha}\n` +
    `🕐 Hora: ${state.hora}\n` +
    `👤 Nombre: ${state.nombre}\n` +
    `📱 Teléfono: ${state.telefono}\n` +
    (state.ocasion ? `🎉 Ocasión: ${state.ocasion}\n` : '') +
    (state.notas ? `📝 Notas: ${state.notas}` : '')
  );
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  showStep(6); // Pantalla de exito
}

// ---- Init ----

document.addEventListener('DOMContentLoaded', () => {
  showStep(1);
  initComensales();
  initCalendar();
  initTime();
  initOcasion();

  // Next buttons
  document.querySelectorAll('[data-next]').forEach(btn => {
    btn.addEventListener('click', nextStep);
  });

  // Prev buttons
  document.querySelectorAll('[data-prev]').forEach(btn => {
    btn.addEventListener('click', prevStep);
  });

  // Confirm (WhatsApp)
  document.getElementById('btn-confirm')?.addEventListener('click', confirmWhatsApp);

  // New reservation
  document.getElementById('btn-new')?.addEventListener('click', () => {
    Object.assign(state, {
      step: 1, comensales: null, fecha: null, hora: null,
      nombre: '', telefono: '', email: '', ocasion: '', notas: ''
    });
    showStep(1);
    document.querySelectorAll('.comensal-btn, .time-btn, .chip').forEach(el => el.classList.remove('selected'));
    renderCalendar();
  });
});
