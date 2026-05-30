/* ============================================================
   main.js — JavaScript del proyecto GTA VI Landing Page
   Proyecto: gta-vi-gt
   Autor: Cristian Ixjotop
   Universidad: UMG Santiago Sacatepéquez
   ============================================================ */


/* ══════════════════════════════════════════════════════════════
   1. LOADER
   Oculta la pantalla de carga 2 segundos después de que
   la página termina de cargar completamente.
══════════════════════════════════════════════════════════════ */

window.addEventListener('load', function () {
  var loader = document.getElementById('loader');

  if (loader) {
    setTimeout(function () {
      // Agrega la clase que hace el loader invisible (definida en style.css)
      loader.classList.add('loader-hidden');
    }, 2000); // 2000 milisegundos = 2 segundos
  }
});


/* ══════════════════════════════════════════════════════════════
   2. COUNTDOWN — Cuenta regresiva al lanzamiento
   Calcula la diferencia entre hoy y el 19 de noviembre de 2026
   y actualiza los elementos HTML cada segundo.
══════════════════════════════════════════════════════════════ */

// Fecha objetivo en milisegundos (desde el 1 de enero de 1970)
var targetDate = new Date('November 19, 2026 00:00:00').getTime();

function updateCountdown() {
  var now = Date.now();          // Tiempo actual en milisegundos
  var gap = targetDate - now;    // Diferencia = tiempo que falta

  // Si ya pasó la fecha, muestra ceros
  if (gap <= 0) {
    document.getElementById('days').innerText    = '00';
    document.getElementById('hours').innerText   = '00';
    document.getElementById('minutes').innerText = '00';
    document.getElementById('seconds').innerText = '00';
    return;
  }

  // Cuántos milisegundos tiene cada unidad de tiempo
  var ONE_SECOND = 1000;
  var ONE_MINUTE = ONE_SECOND * 60;
  var ONE_HOUR   = ONE_MINUTE * 60;
  var ONE_DAY    = ONE_HOUR   * 24;

  // Calcula cada unidad usando división y módulo (%)
  var days    = Math.floor(gap / ONE_DAY);
  var hours   = Math.floor((gap % ONE_DAY)    / ONE_HOUR);
  var minutes = Math.floor((gap % ONE_HOUR)   / ONE_MINUTE);
  var seconds = Math.floor((gap % ONE_MINUTE) / ONE_SECOND);

  // padStart(2, '0') convierte "7" en "07" para mejor visual
  document.getElementById('days').innerText    = String(days).padStart(2, '0');
  document.getElementById('hours').innerText   = String(hours).padStart(2, '0');
  document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
  document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
}

// Ejecutar inmediatamente para no mostrar "00" el primer segundo
updateCountdown();

// Repetir cada 1 segundo
setInterval(updateCountdown, 1000);


/* ══════════════════════════════════════════════════════════════
   3. MODAL DEL MAPA
   Al hacer clic en una zona del mapa, abre un modal con la
   imagen y descripción de esa zona.
   Al hacer clic en la X o fuera del modal, lo cierra.
══════════════════════════════════════════════════════════════ */

var modal      = document.getElementById('mapModal');
var modalImg   = document.getElementById('imgExpanded');
var captionEl  = document.getElementById('modalCaption');
var closeBtn   = document.querySelector('.close-modal');

// Agrega un listener de clic a cada zona del mapa
var zoneItems = document.querySelectorAll('.zone-item');

zoneItems.forEach(function (item) {
  item.addEventListener('click', function () {
    // Lee los atributos personalizados data-img y data-title
    var imgSrc  = item.getAttribute('data-img');
    var title   = item.getAttribute('data-title');

    modal.style.display    = 'block';  // Muestra el modal
    modalImg.src           = imgSrc;   // Carga la imagen correcta
    captionEl.innerText    = title;    // Muestra la descripción
  });
});

// Cierra el modal al hacer clic en la X
if (closeBtn) {
  closeBtn.addEventListener('click', function () {
    modal.style.display = 'none';
  });
}

// Cierra el modal al hacer clic en el fondo oscuro
window.addEventListener('click', function (event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});


/* ══════════════════════════════════════════════════════════════
   4. PARALLAX FADE — El fondo del hero se desvanece al bajar
   Mientras el usuario baja, la imagen de fondo se vuelve
   transparente gradualmente hasta desaparecer.
══════════════════════════════════════════════════════════════ */

window.addEventListener('scroll', function () {
  var fadeBg = document.getElementById('fade-bg');

  if (!fadeBg) return;

  // window.scrollY = cuántos píxeles bajó el usuario
  // Fórmula: a 0px de scroll → opacidad 1 (visible)
  //          a 800px de scroll → opacidad 0 (invisible)
  var opacity = 1 - (window.scrollY / 800);

  // Math.max evita que la opacidad sea negativa
  fadeBg.style.opacity = Math.max(0, opacity);
});
