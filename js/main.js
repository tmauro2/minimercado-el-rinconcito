'use strict';

// Ajusta estos valores cuando cambie el horario real del minimercado.
const STORE_HOURS = {
  0: { open: '08:00', close: '21:00', label: '8:00 a. m. – 9:00 p. m.' }, // Domingo
  1: { open: '07:00', close: '22:00', label: '7:00 a. m. – 10:00 p. m.' },
  2: { open: '07:00', close: '22:00', label: '7:00 a. m. – 10:00 p. m.' },
  3: { open: '07:00', close: '22:00', label: '7:00 a. m. – 10:00 p. m.' },
  4: { open: '07:00', close: '22:00', label: '7:00 a. m. – 10:00 p. m.' },
  5: { open: '07:00', close: '22:00', label: '7:00 a. m. – 10:00 p. m.' },
  6: { open: '07:00', close: '22:00', label: '7:00 a. m. – 10:00 p. m.' }
};
const TIME_ZONE = 'America/Bogota';
// Reemplaza por el número real, con indicativo de país y sin espacios. Ejemplo: 573001234567
const WHATSAPP_NUMBER = '573194467295';

function getBogotaNow() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: TIME_ZONE, weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map(part => [part.type, part.value]));
  const dayIndex = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'].indexOf(values.weekday);
  return { dayIndex, hour: Number(values.hour), minute: Number(values.minute), weekday: values.weekday };
}
function formatClockTime(value) {
  const [hour, minute] = value.split(':').map(Number);
  const suffix = hour >= 12 ? 'p. m.' : 'a. m.';
  const h = hour % 12 || 12;
  return `${h}:${String(minute).padStart(2, '0')} ${suffix}`;
}
function updateStoreStatus() {
  const now = getBogotaNow();
  const schedule = STORE_HOURS[now.dayIndex];
  const dayName = new Intl.DateTimeFormat('es-CO', { timeZone: TIME_ZONE, weekday: 'long' }).format(new Date());
  const todayName = document.getElementById('todayName');
  const todayHours = document.getElementById('todayHours');
  const openStatus = document.getElementById('openStatus');
  const faqOpen = document.getElementById('faqOpen');
  const [openHour, openMinute] = schedule.open.split(':').map(Number);
  const [closeHour, closeMinute] = schedule.close.split(':').map(Number);
  const current = now.hour * 60 + now.minute;
  const opening = openHour * 60 + openMinute;
  const closing = closeHour * 60 + closeMinute;
  const isOpen = current >= opening && current < closing;
  const day = dayName.charAt(0).toLocaleUpperCase('es-CO') + dayName.slice(1);
  const range = schedule.label;
  if (todayName) todayName.textContent = `Hoy es ${day}`;
  if (todayHours) todayHours.textContent = range;
  if (openStatus) {
    openStatus.textContent = isOpen ? '● Estamos abiertos ahora' : '● En este momento estamos cerrados';
    openStatus.classList.toggle('closed', !isOpen);
  }
  if (faqOpen) faqOpen.textContent = `Hoy es ${day}. Nuestro horario es ${range}. ${isOpen ? '¡Sí, estamos abiertos! Te esperamos.' : 'En este momento estamos cerrados.'}`;
}

document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const menu = document.getElementById('menu');
  if (burger && menu) burger.addEventListener('click', () => {
    const expanded = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('open', !expanded);
  });

  // Filtrado del catálogo: cada botón muestra únicamente los productos elegidos.
  const filterButtons = document.querySelectorAll('[data-filter]');
  const productCards = document.querySelectorAll('.item-card[data-category]');
  const feedback = document.getElementById('categoryFeedback');
  filterButtons.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    let visible = 0;
    filterButtons.forEach(item => {
      const selected = item === button;
      item.classList.toggle('selected', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    productCards.forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.hidden = !show;
      if (show) visible++;
    });
    if (feedback) feedback.textContent = filter === 'all' ? `Mostrando todos los productos (${visible}).` : `Encontramos ${visible} productos en esta categoría.`;
  }));

  updateStoreStatus();
  // Actualiza el estado por si la página permanece abierta mientras cambia la hora.
  window.setInterval(updateStoreStatus, 60000);

  if (WHATSAPP_NUMBER) {
    document.querySelectorAll('a[href="contacto.html"]').forEach(link => {
      if (link.classList.contains('fab') || link.classList.contains('nav-cta') || link.textContent.toLowerCase().includes('escríbenos')) {
        link.href = `https://wa.me/${WHATSAPP_NUMBER}`;
        link.target = '_blank';
        link.rel = 'noopener';
      }
    });
  }

  const topButton = document.querySelector('.top');
  if (topButton) {
    window.addEventListener('scroll', () => { topButton.hidden = window.scrollY < 400; }, { passive: true });
    topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
});
