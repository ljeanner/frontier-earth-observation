export function createExplorerPreview(book, { editorial = false } = {}) {
  let active = null;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 801px)');
  const printing = matchMedia('print');

  function isVisible(slot) {
    if (!slot?.isConnected || document.hidden || printing.matches) return false;
    const rect = slot.getBoundingClientRect();
    if (editorial) return rect.width > 0 && rect.right > 0 && rect.left < innerWidth && rect.bottom > 100 && rect.top < innerHeight - 100;
    const bounds = book.querySelector('.flow-window').getBoundingClientRect();
    return rect.width > 0 && rect.left >= bounds.left - 1 && rect.right <= bounds.right + 1 &&
      rect.top >= bounds.top - 1 && rect.bottom <= bounds.bottom + 1;
  }

  function stop() {
    if (!active) return;
    clearTimeout(active.timeout);
    active.frame.remove();
    active.slot.dataset.state = 'idle';
    active.slot.querySelector('[data-explorer-status]').textContent = '';
    active.slot.querySelector('button').textContent = 'Load interactive globe';
    active.slot.querySelector('button').hidden = false;
    active = null;
  }

  function fail(message) {
    if (!active) return;
    const slot = active.slot;
    stop();
    slot.dataset.state = 'error';
    slot.querySelector('[data-explorer-status]').textContent = message;
    slot.querySelector('button').textContent = 'Retry preview';
  }

  function start(slot) {
    if (!isVisible(slot) || active?.slot === slot) return;
    stop();
    const frame = document.createElement('iframe');
    frame.title = 'EO Operator Explorer — simulated satellites and orbital planes';
    frame.src = new URL('./operator-explorer/index.html', location.href).href;
    frame.referrerPolicy = 'no-referrer';
    frame.allow = 'fullscreen';
    slot.dataset.state = 'loading';
    slot.querySelector('[data-explorer-status]').textContent = 'Loading the interactive constellation…';
    slot.querySelector('button').hidden = true;
    active = { slot, frame, timeout: setTimeout(() => fail('The preview did not start. Retry or open the full Explorer.'), 20000) };
    frame.addEventListener('error', () => {
      if (active?.frame === frame) fail('The preview could not be loaded. Open the full Explorer.');
    });
    slot.append(frame);
  }

  function sync() {
    if (active && !isVisible(active.slot)) stop();
    const slot = book.querySelector('.explorer-slot');
    if (slot && slot.dataset.state !== 'error' && isVisible(slot) && desktop.matches && !reducedMotion.matches)
      start(slot);
  }

  book.addEventListener('click', event => {
    const button = event.target instanceof Element && event.target.closest('[data-explorer-start]');
    if (button) start(button.closest('.explorer-slot'));
  });
  window.addEventListener('message', event => {
    if (!active || event.origin !== location.origin || event.source !== active.frame.contentWindow ||
        event.data?.type !== 'eo-explorer-preview') return;
    if (event.data.state === 'ready') {
      clearTimeout(active.timeout);
      active.slot.dataset.state = 'ready';
      active.slot.querySelector('[data-explorer-status]').textContent = 'Interactive constellation loaded.';
    } else if (event.data.state === 'error') {
      fail(typeof event.data.message === 'string' ? event.data.message : 'The preview is unavailable. Open the full Explorer.');
    }
  });
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('beforeprint', stop);
  window.addEventListener('afterprint', () => requestAnimationFrame(sync));
  reducedMotion.addEventListener('change', () => { stop(); sync(); });
  printing.addEventListener('change', sync);
  return { sync, stop };
}
