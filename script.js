const canvas = document.getElementById('scratchCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 150;

// Dibujar la capa gris encima (la que rascas)
ctx.fillStyle = '#BEBEBE';
ctx.fillRect(0, 0, canvas.width, canvas.height);

let isDrawing = false;

function getPosition(e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX || e.touches[0].clientX;
  const y = e.clientY || e.touches[0].clientY;

  return {
    x: x - rect.left,
    y: y - rect.top
  };
}

function scratch(e) {
  if (!isDrawing) return;
  e.preventDefault();

  const pos = getPosition(e);
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(pos.x, pos.y, 15, 0, 2 * Math.PI);
  ctx.fill();
}

// Eventos de ratón
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  scratch(e);
});

canvas.addEventListener('mousemove', scratch);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseleave', () => isDrawing = false);

// Eventos táctiles para móviles
canvas.addEventListener('touchstart', (e) => {
  isDrawing = true;
  scratch(e);
});

canvas.addEventListener('touchmove', scratch);
canvas.addEventListener('touchend', () => isDrawing = false);
