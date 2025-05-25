let lastFocused;
export function openModal(modal) {
  if (!modal) return;
  lastFocused = document.activeElement;
  modal.setAttribute('aria-hidden', 'false');
  modal.tabIndex = -1;
  modal.focus();
  document.body.style.overflow = 'hidden';
}
export function closeModal(modal) {
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lastFocused) lastFocused.focus();
}
// Focus trap and ESC
export function setupModal(modal) {
  if (!modal) return;
  modal.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal(modal);
    // Focus trap
    if (e.key === 'Tab') {
      const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
  modal.querySelector('.close-modal').addEventListener('click', () => closeModal(modal));
} 