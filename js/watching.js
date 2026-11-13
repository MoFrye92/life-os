/* =============================================
   MO OS | WHAT WE WATCHING? | v0.7
   Zero dependencies. Works on GitHub Pages.
   Saved favorites are local to this device.
============================================= */

const STORAGE_KEY = "mo-os-watching-v1";
const POSTER_KEY = "mo-os-watching-posters-v1";
const PAGE_SIZE = 12;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const ui = {
  grid: $("#poster-grid"),
  heading: $("#list-heading"),
  eyebrow: $("#section-eyebrow"),
  description: $("#list-description"),
  count: $("#result-count"),
  showMore: $("#show-more"),
  controls: $("#discover-controls"),
  safeActions: $("#safe-actions"),
  genre: $("#genre-filter"),
  search: $("#title-search"),
  hideWatched: $("#hide-watched"),
  details: $("#detail-dialog"),
  detailContent: $("#detail-content"),
  addDialog: $("#add-dialog"),
  addForm: $("#add-form")
};

function readJSON(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value && typeof value === "object" ? value : fallback;
  } catch { return fallback; }
}

const saved = readJSON(STORAGE_KEY, {});
const state = {
  view: "discover",
  kind: "all",
  visible: PAGE_SIZE,
  lastPick: null,
  safeMovies: Array.isArray(saved.safeMovies) ? saved.safeMovies : [],
  safeShows: Array.isArray(saved.safeShows) ? saved.safeShows : [],
  watched: Array.isArray(saved.watched) ? saved.watched : [],
  custom: Array.isArray(saved.custom) ? saved.custom : []
};

let posters = readJSON(POSTER_KEY, {});
if (Array.isArray(posters)) posters = {};

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      safeMovies: state.safeMovies,
      safeShows: state.safeShows,
      watched: state.watched,
      custom: state.custom
    }));
  } catch {
    // Browser storage may be disabled. The UI still works for this visit.
  }
}

function el(tag, className = "", text = "") {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== "") node.textContent = text;
  return node;
}

function allTitles() { return [...watchCatalog, ...state.custom]; }
function byId(id) { return allTitles().find((item) => item.id === id); }
function isSafe(item) {
  const shelf = item.type === "movie" ? state.safeMovies : state.safeShows;
  return shelf.includes(item.id);
}
function isWatched(item) { return state.watched.includes(item.id); }

function toggleSafe(item) {
  const key = item.type === "movie" ? "safeMovies" : "safeShows";
  state[key] = state[key].includes(item.id)
    ? state[key].filter((id) => id !== item.id)
    : [...state[key], item.id];
  persist();
  render();
  refreshOpenDetail(item);
}

function toggleWatched(item) {
  state.watched = isWatched(item)
    ? state.watched.filter((id) => id !== item.id)
    : [...state.watched, item.id];
  persist();
  render();
  refreshOpenDetail(item);
}

function posterImage(item) {
  const container = el("div", "poster");
  const fallback = el("span", "poster-fallback", item.title);
  container.append(fallback);
  const source = item.image || (item.wiki && posters[item.wiki]);
  if (source && (/^https:\/\//.test(source) || /^\.\.\//.test(source))) {
    const img = document.createElement("img");
    img.src = source;
    img.alt = `Artwork for ${item.title}`;
    img.loading = "lazy";
    img.addEventListener("error", () => img.remove());
    container.append(img);
  }
  if (item.tags && item.tags.includes("Cult Favorite")) {
    container.append(el("span", "poster-badge", "CULT PICK"));
  }
  return container;
}

function createCard(item) {
  const card = el("article", `title-card${isWatched(item) ? " is-watched" : ""}`);
  const open = el("button", "poster-button");
  open.type = "button";
  open.setAttribute("aria-label", `Details for ${item.title}`);
  open.append(posterImage(item));
  open.addEventListener("click", () => openDetail(item));

  const content = el("div", "card-content");
  content.append(el("h3", "card-title", item.title));
  content.append(el("p", "card-meta", `${item.type === "movie" ? "Movie" : "TV show"} · ${item.year || "Year unknown"}`));
  content.append(el("p", "card-why", item.why || "One to keep on your radar."));

  const actions = el("div", "card-actions");
  const safe = el("button", `small-action${isSafe(item) ? " is-on" : ""}`, `${isSafe(item) ? "♥" : "♡"} Safe`);
  safe.type = "button";
  safe.setAttribute("aria-pressed", String(isSafe(item)));
  safe.setAttribute("aria-label", `${isSafe(item) ? "Remove" : "Add"} ${item.title} ${isSafe(item) ? "from" : "to"} safe ${item.type}s`);
  safe.addEventListener("click", () => toggleSafe(item));
  const watched = el("button", `small-action watched${isWatched(item) ? " is-on" : ""}`, `${isWatched(item) ? "✓" : "○"} Watched`);
  watched.type = "button";
  watched.setAttribute("aria-pressed", String(isWatched(item)));
  watched.addEventListener("click", () => toggleWatched(item));
  actions.append(safe, watched);
  card.append(open, content, actions);
  return card;
}

function filteredDiscoveries() {
  const term = ui.search.value.trim().toLocaleLowerCase();
  const genre = ui.genre.value;
  return watchCatalog.filter((item) => {
    if (state.kind !== "all" && item.type !== state.kind) return false;
    if (genre !== "all" && !item.tags.includes(genre)) return false;
    if (ui.hideWatched.checked && isWatched(item)) return false;
    if (term && !(`${item.title} ${item.why} ${item.tags.join(" ")}`.toLocaleLowerCase().includes(term))) return false;
    return true;
  });
}

function displayedTitles() {
  if (state.view === "safe-movies") return state.safeMovies.map(byId).filter((x) => x && x.type === "movie");
  if (state.view === "safe-shows") return state.safeShows.map(byId).filter((x) => x && x.type === "show");
  return filteredDiscoveries();
}

function render() {
  const isDiscover = state.view === "discover";
  ui.controls.hidden = !isDiscover;
  ui.safeActions.hidden = isDiscover;
  $("#safe-movie-count").textContent = state.safeMovies.length;
  $("#safe-show-count").textContent = state.safeShows.length;

  if (isDiscover) {
    ui.eyebrow.textContent = "CURATED FOR YOU";
    ui.heading.textContent = "50 things worth watching";
    ui.description.textContent = "Suggestions inspired by Marvel, Black stories, sapphic romance, anime, thrillers, creative reality, and cult favorites.";
  } else {
    const movie = state.view === "safe-movies";
    ui.eyebrow.textContent = "YOUR COMFORT SHELF";
    ui.heading.textContent = movie ? "My Safe Movies" : "My Safe Shows";
    ui.description.textContent = "Your personal rewatch collection. Save favorites from Discover or add your own title.";
  }

  const titles = displayedTitles();
  ui.count.textContent = `${titles.length} ${titles.length === 1 ? "title" : "titles"}${isDiscover ? " matching" : " saved"}`;
  ui.grid.replaceChildren();
  const visible = isDiscover ? titles.slice(0, state.visible) : titles;

  if (!visible.length) {
    const empty = el("div", "empty-state");
    empty.append(el("strong", "", isDiscover ? "No matches this time." : "Your safe shelf starts here."));
    empty.append(el("span", "", isDiscover
      ? "Try another genre, title, or turn off Hide watched."
      : "Add a title you love rewatching, or tap ♡ Safe on a discovery."));
    if (!isDiscover) {
      const add = el("button", "outlined-button", "+ Add my favorite");
      add.type = "button";
      add.addEventListener("click", openAddDialog);
      empty.append(add);
    }
    ui.grid.append(empty);
  } else {
    const fragment = document.createDocumentFragment();
    visible.forEach((item) => fragment.append(createCard(item)));
    ui.grid.append(fragment);
  }
  ui.showMore.hidden = !isDiscover || titles.length <= state.visible;
}

function setView(view) {
  state.view = view;
  state.visible = PAGE_SIZE;
  $$(".main-tab").forEach((tab) => {
    const active = tab.dataset.view === view;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-pressed", String(active));
  });
  render();
}

function watchLink(item) {
  // JustWatch lets you check real current service availability;
  // this app does NOT claim specific streaming rights.
  return `https://www.justwatch.com/us/search?q=${encodeURIComponent(item.title)}`;
}

let openItemId = null;
function openDetail(item) {
  openItemId = item.id;
  renderDetail(item);
  if (!ui.details.open) ui.details.showModal();
  ui.details.scrollTop = 0;
}
function refreshOpenDetail(item) {
  if (ui.details.open && openItemId === item.id) renderDetail(item);
}
function renderDetail(item) {
  ui.detailContent.replaceChildren();
  const hero = el("div", "detail-hero");
  hero.append(posterImage(item));
  const info = el("div");
  const title = el("h2", "", item.title);
  title.id = "detail-title";
  info.append(title, el("p", "", `${item.type === "movie" ? "Movie" : "TV show"} · ${item.year || "Year unknown"}`));
  hero.append(info);
  const blurb = el("p", "detail-blurb", item.why || "A personal favorite.");
  const tags = el("div", "tag-list");
  (item.tags || []).forEach((tag) => tags.append(el("span", "tag", tag)));

  const actions = el("div", "detail-actions");
  const save = el("button", `small-action${isSafe(item) ? " is-on" : ""}`, isSafe(item) ? "♥ In my safe shelf" : "♡ Add to safe shelf");
  save.type = "button";
  save.addEventListener("click", () => toggleSafe(item));
  const watched = el("button", `small-action watched${isWatched(item) ? " is-on" : ""}`, isWatched(item) ? "✓ Watched" : "○ Mark watched");
  watched.type = "button";
  watched.addEventListener("click", () => toggleWatched(item));
  actions.append(save, watched);

  const link = el("a", "watch-link", "Where to watch ↗");
  link.href = watchLink(item);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  const note = el("p", "fine-print", "Opens JustWatch to check Netflix, Hulu, Prime Video, Disney+, or other current options. Availability is not verified by MO OS.");
  ui.detailContent.append(hero, blurb, tags, actions, link, note);
}

function pickForMe() {
  const pool = filteredDiscoveries().filter((x) => !isWatched(x));
  if (!pool.length) {
    ui.count.textContent = "No unwatched matches. Change a filter to pick again.";
    return;
  }
  const withoutLast = pool.filter((x) => x.id !== state.lastPick);
  const candidates = withoutLast.length ? withoutLast : pool;
  const pick = candidates[Math.floor(Math.random() * candidates.length)];
  state.lastPick = pick.id;
  openDetail(pick);
}

function openAddDialog() {
  ui.addForm.reset();
  $("#custom-type").value = state.view === "safe-shows" ? "show" : "movie";
  ui.addDialog.showModal();
}

function addCustom(event) {
  event.preventDefault();
  const title = $("#custom-name").value.trim();
  const type = $("#custom-type").value;
  const year = Number($("#custom-year").value) || null;
  if (!title || !["movie", "show"].includes(type)) return;
  const duplicate = allTitles().find((item) => item.type === type && item.title.toLowerCase() === title.toLowerCase());
  if (duplicate) {
    const key = type === "movie" ? "safeMovies" : "safeShows";
    if (!state[key].includes(duplicate.id)) state[key].push(duplicate.id);
  } else {
    const item = {
      id: `mine-${Date.now().toString(36)}-${Math.floor(Math.random() * 1000)}`,
      title, type, year,
      tags: [], why: "One of my personal comfort watches.", wiki: ""
    };
    state.custom.push(item);
    state[type === "movie" ? "safeMovies" : "safeShows"].push(item.id);
  }
  persist();
  ui.addDialog.close();
  setView(type === "movie" ? "safe-movies" : "safe-shows");
}

// ---- Wikipedia posters: optional, no API key, graceful fallback ----
function normalized(title) { return title.replace(/_/g, " ").trim().toLowerCase(); }
async function loadPosters() {
  const wanted = [...new Set(watchCatalog.map((item) => item.wiki).filter(Boolean))];
  const missing = wanted.filter((title) => !Object.prototype.hasOwnProperty.call(posters, title));
  for (let offset = 0; offset < missing.length; offset += 20) {
    const batch = missing.slice(offset, offset + 20);
    const params = new URLSearchParams({
      action: "query", format: "json", formatversion: "2", prop: "pageimages",
      piprop: "thumbnail", pithumbsize: "420", pilicense: "any",
      redirects: "1", origin: "*", titles: batch.join("|")
    });
    try {
      const response = await fetch(`https://en.wikipedia.org/w/api.php?${params.toString()}`);
      if (!response.ok) continue;
      const data = await response.json();
      if (!data.query || !Array.isArray(data.query.pages)) continue;
      const aliases = new Map();
      [...(data.query.normalized || []), ...(data.query.redirects || [])].forEach(({from, to}) => aliases.set(normalized(from), normalized(to)));
      function resolved(title) {
        let key = normalized(title);
        for (let i = 0; i < 5 && aliases.has(key); i++) key = aliases.get(key);
        return key;
      }
      const pages = new Map(data.query.pages.map((page) => [normalized(page.title), page]));
      batch.forEach((title) => {
        const thumb = pages.get(resolved(title))?.thumbnail?.source || "";
        posters[title] = /^https:\/\/upload\.wikimedia\.org\//.test(thumb) ? thumb : "";
      });
      try { localStorage.setItem(POSTER_KEY, JSON.stringify(posters)); } catch {}
      render();
    } catch {
      // Wikipedia may be unreachable; designed poster placeholders remain.
    }
  }
}

// ---- Navigation and filter events ----
$$(".main-tab").forEach((tab) => tab.addEventListener("click", () => setView(tab.dataset.view)));
$$(".type-tab").forEach((tab) => tab.addEventListener("click", () => {
  state.kind = tab.dataset.kind;
  state.visible = PAGE_SIZE;
  $$(".type-tab").forEach((other) => {
    const active = other === tab;
    other.classList.toggle("is-active", active);
    other.setAttribute("aria-pressed", String(active));
  });
  render();
}));

WATCH_TAGS.forEach((tag) => {
  const option = document.createElement("option");
  option.value = tag;
  option.textContent = tag;
  ui.genre.append(option);
});
ui.genre.addEventListener("change", () => { state.visible = PAGE_SIZE; render(); });
ui.search.addEventListener("input", () => { state.visible = PAGE_SIZE; render(); });
ui.hideWatched.addEventListener("change", () => { state.visible = PAGE_SIZE; render(); });
$("#surprise-me").addEventListener("click", pickForMe);
ui.showMore.addEventListener("click", () => { state.visible += PAGE_SIZE; render(); });
$("#close-detail").addEventListener("click", () => ui.details.close());
$("#close-add").addEventListener("click", () => ui.addDialog.close());
$("#add-favorite").addEventListener("click", openAddDialog);
ui.addForm.addEventListener("submit", addCustom);
[ui.details, ui.addDialog].forEach((dialog) => {
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
});

render();
loadPosters();
