/* MO OS v0.9 — Fit Check only. Does not modify other modules. */
(() => {
  'use strict';
  if (document.body.dataset.module !== 'outfit') return;

  const root = document.getElementById('module-root');
  const data = window.MO_FIT_CHECK_DATA;
  if (!root) return;
  if (!data || !Array.isArray(data.looks)) {
    root.innerHTML = '<p class="empty">Fit Check could not load its outfit data. Check js/fit-check-data.js.</p>';
    return;
  }

  const escapeHTML = input => String(input ?? '').replace(/[&<>"']/g, char => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
  })[char]);

  const options = (items, selected) => items.map(item => `<option value="${escapeHTML(item)}" ${item === selected ? 'selected' : ''}>${escapeHTML(item)}</option>`).join('');
  const safePhoto = value => typeof value === 'string' && /^https:\/\/i\.pinimg\.com\/[a-zA-Z0-9/_-]+\.(?:jpg|jpeg|png|webp)(?:\?[^<>"']*)?$/i.test(value) ? value : '';
  const safePin = value => typeof value === 'string' && /^https:\/\/(?:[a-z]{2,3}\.)?pinterest\.com\/pin\/[0-9]+\/?$/i.test(value) ? value : '';
  const getImage = look => data.inspiration[`${look.occasion}|${look.weather}`] || {};
  const $ = id => document.getElementById(id);
  let selected = null;
  let lastId = null;

  root.innerHTML = `
    <section class="panel fit-filter-panel">
      <p class="eyebrow">What's the occasion?</p>
      <div class="control-grid">
        <div class="field"><label for="fit-occasion">Occasion</label><select id="fit-occasion">${options(data.occasions, 'Casual')}</select></div>
        <div class="field"><label for="fit-weather">Dressing for</label><select id="fit-weather">${options(data.weather, 'Warm')}</select></div>
      </div>
      <p class="note">Pick a vibe and temperature. These are outfit ideas, not a record of what you own. Hot / Warm / Cold are clothing choices, not a live forecast.</p>
    </section>
    <section class="panel panel-glow fit-feature-panel">
      <div id="fit-result" aria-live="polite"></div>
      <div class="button-row fit-actions">
        <button id="fit-roll" class="btn primary" type="button">🎲 Another look</button>
      </div>
    </section>
    <div class="section-heading fit-heading"><h2>Pick a look.</h2><span id="fit-count" class="muted small"></span></div>
    <div id="fit-grid" class="card-grid fit-grid"></div>
    <p class="note fit-footer-note">Pinterest photos are inspiration for the selected occasion and temperature. They may not depict every item in the breakdown. Photos load from Pinterest, so an image may occasionally be unavailable.</p>`;

  function filtered() {
    return data.looks.filter(look => look.occasion === $('fit-occasion').value && look.weather === $('fit-weather').value);
  }

  function mediaHTML(look) {
    const inspo = getImage(look);
    const image = safePhoto(look.image || inspo.image);
    const pin = safePin(look.pin || inspo.pin);
    const imageHTML = image
      ? `<img class="fit-photo" src="${escapeHTML(image)}" alt="Pinterest outfit styling inspiration: ${escapeHTML(inspo.description || look.title)}" loading="eager" referrerpolicy="no-referrer" onerror="this.hidden=true;this.nextElementSibling.hidden=false">
         <div class="fit-image-fallback" hidden><span>📌</span><strong>Image unavailable</strong><small>Try the source Pin below.</small></div>`
      : `<div class="fit-image-fallback"><span>📌</span><strong>Image not set</strong></div>`;
    return `<div class="fit-media">${imageHTML}
      <div class="fit-media-caption"><span>PINTEREST INSPO · ${escapeHTML(look.occasion.toUpperCase())} / ${escapeHTML(look.weather.toUpperCase())}</span>
      ${pin ? `<a href="${escapeHTML(pin)}" target="_blank" rel="noopener noreferrer" aria-label="View original Pin on Pinterest">Original Pin ↗</a>` : ''}</div></div>`;
  }

  function select(look, scroll = false) {
    if (!look) return;
    selected = look;
    lastId = look.id;
    const breakdown = [
      ['Top', look.top], ['Bottom', look.bottom], ['Shoes', look.shoes],
      ['Layer', look.layer], ['Accessories', look.extras]
    ].map(([label, value]) => `<dt>${escapeHTML(label)}</dt><dd>${escapeHTML(value)}</dd>`).join('');

    $('fit-result').innerHTML = `<div class="fit-spotlight">
      ${mediaHTML(look)}
      <div class="fit-spotlight-copy">
        <span class="kicker">${escapeHTML(look.occasion)} · ${escapeHTML(look.weather)}</span>
        <h2>${escapeHTML(look.title)}</h2>
        <p class="fit-styling-note">${escapeHTML(look.note)}</p>
        <div class="wardrobe-detail"><dl>${breakdown}</dl></div>
      </div>
    </div>`;
    $('fit-grid').querySelectorAll('[data-look-id]').forEach(button => {
      const isSelected = button.dataset.lookId === look.id;
      button.classList.toggle('selected', isSelected);
      button.setAttribute('aria-pressed', String(isSelected));
    });
    if (scroll) $('fit-result').scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',block:'start'});
  }

  function render() {
    const list = filtered();
    $('fit-count').textContent = `${list.length} looks`;
    $('fit-grid').innerHTML = list.map((look, index) => `
      <button class="item-card fit-choice" type="button" data-look-id="${escapeHTML(look.id)}" aria-pressed="false">
        <span class="fit-choice-top"><span class="fit-choice-number">LOOK ${String(index + 1).padStart(2, '0')}</span><span class="fit-choice-arrow">↗</span></span>
        <span class="copy"><span class="name">${escapeHTML(look.title)}</span>
          <span class="desc">${escapeHTML(look.top)} · ${escapeHTML(look.bottom)}</span>
          <span class="meta">${escapeHTML(look.occasion)} · ${escapeHTML(look.weather)}</span>
        </span>
      </button>`).join('');
    if (!list.length) {
      $('fit-result').innerHTML = '<p class="empty">No outfits for this combination yet.</p>';
      return;
    }
    const next = list.find(look => look.id === selected?.id) || list[Math.floor(Math.random() * list.length)];
    select(next);
  }

  $('fit-occasion').addEventListener('change', render);
  $('fit-weather').addEventListener('change', render);
  $('fit-roll').addEventListener('click', () => {
    const list = filtered();
    const candidates = list.filter(look => look.id !== lastId);
    const nextPool = candidates.length ? candidates : list;
    select(nextPool[Math.floor(Math.random() * nextPool.length)]);
  });
  $('fit-grid').addEventListener('click', e => {
    const button = e.target.closest('button[data-look-id]');
    const look = button && data.looks.find(item => item.id === button.dataset.lookId);
    if (look) select(look, true);
  });

  render();
})();
