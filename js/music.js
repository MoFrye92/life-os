/* ==========================================
   MO OS | SET THE MOOD — v0.6
========================================== */

const questionsContainer = document.querySelector("#music-questions");
const suggestButton = document.querySelector("#suggest-music");
const quizHint = document.querySelector("#quiz-hint");
const musicResult = document.querySelector("#music-result");
const resultTitle = document.querySelector("#result-title");
const resultTagline = document.querySelector("#result-tagline");
const resultWhy = document.querySelector("#result-why");
const resultArt = document.querySelector("#result-art");
const listenLink = document.querySelector("#listen-link");
const anotherButton = document.querySelector("#try-another");
const genreGrid = document.querySelector("#genre-grid");

// Only the genres listed in activeMusicGenres can be recommended or browsed.
const availableGenres = activeMusicGenres
  .map(id => musicGenres.find(genre => genre.id === id))
  .filter(Boolean);

const answers = {};
let lastSuggestedGenre = null;

// Standard Apple Music search link. iOS may open the Music app;
// if not, it opens Apple Music on the web.
function appleMusicUrl(genre) {
  return "https://music.apple.com/us/search?term=" +
    encodeURIComponent(genre.searchQuery);
}

function element(tag, className = "", content = "") {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (content) node.textContent = content;
  return node;
}

function quizComplete() {
  return musicQuestions.every(question => Boolean(answers[question.id]));
}

// ==========================================
// BUILD QUESTIONS
// ==========================================
function renderQuestions() {
  questionsContainer.replaceChildren();

  musicQuestions.forEach((question, index) => {
    const card = element("section", "question-card");
    const counter = element("p", "question-count", `0${index + 1} / 03`);
    const heading = element("h3", "question-title", question.title);
    heading.id = `question-${question.id}`;
    const note = element("p", "question-note", question.subtitle);
    const options = element("div", "option-grid");
    options.setAttribute("role", "group");
    options.setAttribute("aria-labelledby", heading.id);

    question.options.forEach(option => {
      const button = element("button", "option-button");
      button.type = "button";
      button.dataset.question = question.id;
      button.dataset.answer = option.id;
      button.setAttribute("aria-pressed", "false");
      button.append(
        element("span", "option-icon", option.icon),
        element("span", "option-label", option.label)
      );

      button.addEventListener("click", () => {
        answers[question.id] = option.id;
        options.querySelectorAll(".option-button").forEach(other => {
          const selected = other === button;
          other.classList.toggle("is-selected", selected);
          other.setAttribute("aria-pressed", String(selected));
        });
        suggestButton.disabled = !quizComplete() || availableGenres.length === 0;
        quizHint.textContent = quizComplete()
          ? "Ready when you are. ✨"
          : "Answer all three to get your pick.";
        // Hide stale recommendation when the answers change.
        musicResult.hidden = true;
        lastSuggestedGenre = null;
      });
      options.append(button);
    });
    card.append(counter, heading, note, options);
    questionsContainer.append(card);
  });
}

// ==========================================
// MATCH THE ANSWERS TO GENRES
// ==========================================
function genreScore(genre) {
  let score = 0;
  if (genre.moods.includes(answers.mood)) score += 5;
  if (genre.activities.includes(answers.activity)) score += 3;
  if (genre.energies.includes(answers.energy)) score += 2;
  return score;
}

function recommendGenre() {
  if (!quizComplete() || availableGenres.length === 0) return;

  const ranked = availableGenres
    .map(genre => ({ genre, score: genreScore(genre) }))
    .sort((a, b) => b.score - a.score);

  const bestScore = ranked[0].score;
  // Favor close matches, but avoid an immediate repeat if alternatives exist.
  let candidates = ranked.filter(item => item.score >= bestScore - 2);
  if (lastSuggestedGenre && availableGenres.length > 1) {
    const notPrevious = candidates.filter(item => item.genre.id !== lastSuggestedGenre);
    candidates = notPrevious.length > 0
      ? notPrevious
      : ranked.filter(item => item.genre.id !== lastSuggestedGenre).slice(0, 3);
  }

  const choice = candidates[Math.floor(Math.random() * candidates.length)].genre;
  lastSuggestedGenre = choice.id;

  resultArt.textContent = choice.icon;
  resultArt.style.setProperty("--result-color", choice.color);
  resultTitle.textContent = choice.name;
  resultTagline.textContent = choice.tagline;
  resultWhy.textContent = "Picked for your mood, your plans, and your energy.";
  listenLink.href = appleMusicUrl(choice);
  listenLink.setAttribute("aria-label", `Search for ${choice.name} in Apple Music`);

  musicResult.hidden = false;
  musicResult.scrollIntoView({ behavior: "auto", block: "start" });
}

// ==========================================
// BROWSE GENRES (DIRECT APPLE MUSIC LINKS)
// ==========================================
function renderGenreGrid() {
  genreGrid.replaceChildren();

  if (availableGenres.length === 0) {
    genreGrid.append(element("p", "empty-state", "Add genres to activeMusicGenres in js/music-data.js."));
    suggestButton.disabled = true;
    return;
  }

  availableGenres.forEach(genre => {
    const card = element("a", "genre-card");
    card.href = appleMusicUrl(genre);
    card.setAttribute("aria-label", `Open ${genre.name} search in Apple Music`);

    const art = element("span", "genre-art", genre.icon);
    art.style.setProperty("--genre-color", genre.color);
    art.setAttribute("aria-hidden", "true");

    card.append(
      art,
      element("span", "genre-name", genre.name),
      element("span", "genre-action", "Open Apple Music ↗")
    );
    genreGrid.append(card);
  });
}

suggestButton.addEventListener("click", recommendGenre);
anotherButton.addEventListener("click", recommendGenre);

renderQuestions();
renderGenreGrid();
