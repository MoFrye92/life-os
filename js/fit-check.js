/* MO OS v1.0 — Fit Check only. No other module uses this file. */
(() => {
  'use strict';
  if (document.body.dataset.module !== 'outfit') return;

  const root = document.getElementById('module-root');
  const data = window.MO_FIT_CHECK_DATA;
  const images = window.MO_FIT_CHECK_IMAGES || {};
  if (!root) return;
  if (!data || !Array.isArray(data.looks)) {
    root.innerHTML = '<p class="empty">Fit Check could not load its outfit data. Check js/fit-check-data.js.</p>';
    return;
  }

  const escapeHTML = input => String(input ?? '').replace(/[&<>"']/g, char => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
  })[char]);
  const options = (items, selected) => items.map(item => `<option value="${escapeHTML(item)}" ${item === selected ? 'selected' : ''}>${escapeHTML(item)}</option>`).join('');

  // Photos are trusted, hardcoded external https links from fit-check-images.js.
  // Never accept script:, data:, embedded markup or whitespace in src values.
  const safePhoto = value => typeof value === 'string' && /^https:\/\/[^\s<>"']+$/i.test(value) ? value : '';
  const getImage = look => safePhoto(images[look.id] || look.image || '');
  const pinterestSearch = look => 'https://www.pinterest.com/search/pins/?q=' + encodeURIComponent(
    `${look.occasion} ${look.weather} mens style ${look.title} ${look.top} ${look.bottom}`
  );
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
      <p class="note">Pick a vibe and temperature. These are outfit ideas, not a record of what you own. Hot / Warm / Cold describe what to wear, not the live forecast.</p>
    </section>
    <section class="panel panel-glow fit-feature-panel">
      <div id="fit-result" aria-live="polite"></div>
      <div class="button-row fit-actions">
        <button id="fit-roll" class="btn primary" type="button">🎲 Another look</button>
      </div>
    </section>
    <div class="section-heading fit-heading"><h2>Pick a look.</h2><span id="fit-count" class="muted small"></span></div>
    <div id="fit-grid" class="card-grid fit-grid"></div>
    <p class="note fit-footer-note">75 different visual references for 75 outfit ideas. Photos show the styling direction, not an exact guarantee of every listed item. Images load from external sites and some may be unavailable.</p>`;

  function filtered() {
    return data.looks.filter(look => look.occasion === $('fit-occasion').value && look.weather === $('fit-weather').value);
  }

  function mediaHTML(look) {
    const image = getImage(look);
    const pinterest = pinterestSearch(look);
    const imageHTML = image
      ? `<img class="fit-photo" src="${escapeHTML(image)}" alt="Outfit photo inspiration for ${escapeHTML(look.title)}" loading="eager" decoding="async" onerror="this.hidden=true;this.nextElementSibling.hidden=false">
         <div class="fit-image-fallback" hidden><span>📌</span><strong>Photo unavailable</strong><small>See similar outfit inspiration on Pinterest below.</small></div>`
      : `<div class="fit-image-fallback"><span>📌</span><strong>Photo not set</strong><small>Try Pinterest inspiration below.</small></div>`;
    return `<div class="fit-media">${imageHTML}
      <div class="fit-media-caption"><span>LOOK INSPIRATION · ${escapeHTML(look.occasion.toUpperCase())} / ${escapeHTML(look.weather.toUpperCase())}</span>
      <span class="fit-caption-links">${image ? `<a href="${escapeHTML(image)}" target="_blank" rel="noopener noreferrer" aria-label="Open original outfit image">Photo ↗</a>` : ''}
      <a href="${escapeHTML(pinterest)}" target="_blank" rel="noopener noreferrer" aria-label="Find similar outfits on Pinterest">Pinterest ↗</a></span>
      </div></div>`;
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
    if (scroll) $('fit-result').scrollIntoView({
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start'
    });
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
