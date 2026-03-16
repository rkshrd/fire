/* ===== BOUGIE DRAGGABLE + DOUBLE CLIC ===== */
const candle = document.getElementById('candle');
if (candle) {
  let dragging = false;
  let offsetX = 0, offsetY = 0;

  candle.addEventListener('mousedown', e => {
    dragging = true;
    offsetX = e.clientX - candle.offsetLeft;
    offsetY = e.clientY - candle.offsetTop;
    candle.style.cursor = 'grabbing';
  });

  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    candle.style.left = e.clientX - offsetX + 'px';
    candle.style.top = e.clientY - offsetY + 'px';
  });

  document.addEventListener('mouseup', () => {
    dragging = false;
    candle.style.cursor = 'grab';
  });

  candle.addEventListener('dblclick', () => {
    window.location.href = 'veille.html';
  });
}
