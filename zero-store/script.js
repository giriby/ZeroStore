// Intro ve site geçiş
window.addEventListener('DOMContentLoaded', () => {
  const intro = document.getElementById('intro');
  const site = document.getElementById('site');

  setTimeout(() => {
    intro.style.opacity = '0';

    setTimeout(() => {
      intro.style.display = 'none';
      site.classList.remove('hidden');
      site.style.opacity = '1';
      startRain(); // yağmur animasyonu başlat
    }, 1000);

  }, 3500);
});

// Yağmur animasyonu - basit ve hafif
function startRain() {
  const canvas = document.getElementById('rain');
  const ctx = canvas.getContext('2d');
  let width, height;
  let drops = [];

  function init() {
    resize();
    for(let i = 0; i < 200; i++) {
      drops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 15 + 10,
        velocity: Math.random() * 4 + 2,
        opacity: Math.random() * 0.3 + 0.1
      });
    }
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  window.addEventListener('resize', () => {
    drops = [];
    init();
  });

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = 'rgba(0,255,255,0.3)';
    ctx.lineWidth = 1;

    for(let drop of drops) {
      ctx.beginPath();
      ctx.moveTo(drop.x, drop.y);
      ctx.lineTo(drop.x, drop.y + drop.length);
      ctx.stroke();

      drop.y += drop.velocity;
      if(drop.y > height) {
        drop.y = -drop.length;
        drop.x = Math.random() * width;
      }
    }
    requestAnimationFrame(draw);
  }

  init();
  draw();
}
