document.activeElement.addEventListener('keydown', handleKeydown);

function handleKeydown(e) {
  switch(e.key) {
    case 'ArrowUp':
      nav(-1);
      break;
    case 'ArrowDown':
      nav(1);
      break;
    case 'ArrowRight':
      nav(1);
      break;
    case 'ArrowLeft':
      nav(-1);
      break;
  }
}

function nav (move) {
  const currentIndex = document.activeElement.tabIndex;
  const next = currentIndex + move;
  const items = document.querySelectorAll('.items');
  const targetElement = items[next];
  targetElement.focus();
}