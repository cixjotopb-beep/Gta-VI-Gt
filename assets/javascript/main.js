<script>
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
      loader.classList.add('loader-hidden');
    }, 2000);
  });

  const modal = document.getElementById("mapModal");
  const modalImg = document.getElementById("imgExpanded");
  const captionText = document.getElementById("caption");
  
  document.querySelectorAll('.zone-item').forEach(item => {
    item.addEventListener('click', () => {
      modal.style.display = "block";
      modalImg.src = item.getAttribute('data-img');
      captionText.innerText = item.getAttribute('data-title');
    });
  });

  document.querySelector(".close-modal").onclick = () => modal.style.display = "none";
  window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; }

  const targetDate = new Date('November 19, 2026 00:00:00').getTime();
  setInterval(() => {
    const now = new Date().getTime();
    const gap = targetDate - now;
    const second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24;
    
    document.getElementById('days').innerText = Math.floor(gap / day).toString().padStart(2, '0');
    document.getElementById('hours').innerText = Math.floor((gap % day) / hour).toString().padStart(2, '0');
    document.getElementById('minutes').innerText = Math.floor((gap % hour) / minute).toString().padStart(2, '0');
    document.getElementById('seconds').innerText = Math.floor((gap % minute) / second).toString().padStart(2, '0');
  }, 1000);

  window.addEventListener('scroll', () => {
    const fadeBg = document.getElementById('fade-bg');
    const scrollPosition = window.scrollY;
    const opacity = 1 - (scrollPosition / 800);
    
    if (opacity >= 0) {
      fadeBg.style.opacity = opacity;
    } else {
      fadeBg.style.opacity = 0;
    }
  });
</script>