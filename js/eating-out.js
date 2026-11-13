
/* ==========================================
   MO OS | WHERE WE EATING?
   Application Logic v0.5
========================================== */


// ==========================================
// ELEMENTS
// ==========================================

const diningButtons = document.querySelectorAll(
  ".dining-option"
);

const cuisineGrid = document.querySelector(
  "#cuisine-grid"
);

const cuisineCount = document.querySelector(
  "#cuisine-count"
);

const resultIcon = document.querySelector(
  "#result-icon"
);

const resultTitle = document.querySelector(
  "#result-title"
);

const resultDescription = document.querySelector(
  "#result-description"
);

const rollButton = document.querySelector(
  "#roll-button"
);

const findSpots = document.querySelector(
  "#find-spots"
);


// ==========================================
// STATE
// ==========================================

let currentMode = "sit-down";
let selectedCuisine = null;


// ==========================================
// ACTIVE CUISINES
// ==========================================

const availableCuisines = activeCuisineIds
  .map(id => cuisineLibrary.find(c => c.id === id))
  .filter(Boolean);


// ==========================================
// HELPERS
// ==========================================

function makeElement(tag, className, text) {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (text) {
    element.textContent = text;
  }

  return element;
}


// ==========================================
// SEARCH FOR RESTAURANTS
// ==========================================

function updateSearchLink() {

  if (!selectedCuisine) {
    findSpots.hidden = true;
    return;
  }

  const searchTypes = {
    "sit-down": "restaurants near me",
    "takeout": "takeout near me",
    "delivery": "delivery near me"
  };

  const searchText =
    `${selectedCuisine.search} ${searchTypes[currentMode]}`;

  const searchUrl =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(searchText);

  findSpots.href = searchUrl;
  findSpots.hidden = false;

  const labels = {
    "sit-down": "Find restaurants ↗",
    "takeout": "Find takeout ↗",
    "delivery": "Find delivery ↗"
  };

  findSpots.textContent = labels[currentMode];
}


// ==========================================
// SELECT CUISINE
// ==========================================

function chooseCuisine(cuisine) {

  selectedCuisine = cuisine;

  // Update the suggestion card
  resultIcon.textContent = cuisine.icon;
  resultTitle.textContent = cuisine.name;
  resultDescription.textContent = cuisine.craving;

  rollButton.textContent = "🎲 Try another";

  // Highlight the selected cuisine card
  document.querySelectorAll(".cuisine-card")
    .forEach(card => {

      const isSelected =
        card.dataset.cuisine === cuisine.id;

      card.classList.toggle(
        "is-selected",
        isSelected
      );

      card.setAttribute(
        "aria-pressed",
        String(isSelected)
      );
    });

  updateSearchLink();
}


// ==========================================
// RANDOM CUISINE
// ==========================================

function randomCuisine() {

  if (availableCuisines.length === 0) {
    resultTitle.textContent = "No cuisines available";
    resultDescription.textContent =
      "Add some cuisines to eating-out-data.js.";
    return;
  }

  // Exclude current choice if possible
  const newOptions = availableCuisines.filter(
    cuisine => cuisine.id !== selectedCuisine?.id
  );

  const pool = newOptions.length > 0
    ? newOptions
    : availableCuisines;

  const randomIndex = Math.floor(
    Math.random() * pool.length
  );

  chooseCuisine(pool[randomIndex]);
}


// ==========================================
// BUILD CUISINE CARDS
// ==========================================

function renderCuisines() {

  cuisineGrid.replaceChildren();

  cuisineCount.textContent =
    `${availableCuisines.length} choices`;

  if (availableCuisines.length === 0) {

    cuisineGrid.append(
      makeElement(
        "p",
        "empty-message",
        "Your cuisine list is empty."
      )
    );

    rollButton.disabled = true;
    return;
  }

  availableCuisines.forEach(cuisine => {

    const card = makeElement(
      "button",
      "cuisine-card"
    );

    card.type = "button";
    card.dataset.cuisine = cuisine.id;
    card.setAttribute("aria-pressed", "false");

    card.style.setProperty(
      "--accent-color",
      cuisine.color || "#657554"
    );

    // Visual section
    const visual = makeElement(
      "span",
      "cuisine-visual"
    );

    const emoji = makeElement(
      "span",
      "cuisine-emoji",
      cuisine.icon
    );

    visual.append(emoji);

    // Optional personal photo
    if (cuisine.image) {

      const photo = document.createElement("img");

      photo.src = cuisine.image;
      photo.alt = "";
      photo.loading = "lazy";

      photo.addEventListener("error", () => {
        photo.remove();
      });

      visual.append(photo);
    }

    // Cuisine name
    const name = makeElement(
      "span",
      "cuisine-name",
      cuisine.name
    );

    card.append(visual, name);

    // Manual selection
    card.addEventListener("click", () => {
      chooseCuisine(cuisine);

      // Return to result on small screens
      document.querySelector(".result-card")
        .scrollIntoView({
          behavior: "auto",
          block: "start"
        });
    });

    cuisineGrid.append(card);
  });
}


// ==========================================
// DINING STYLE SELECTION
// ==========================================

diningButtons.forEach(button => {

  button.addEventListener("click", () => {

    currentMode = button.dataset.mode;

    diningButtons.forEach(other => {

      const active = other === button;

      other.classList.toggle("is-active", active);

      other.setAttribute(
        "aria-pressed",
        String(active)
      );
    });

    // Update restaurant search for new mode
    updateSearchLink();
  });
});


// ==========================================
// REROLL
// ==========================================

rollButton.addEventListener("click", () => {
  randomCuisine();
});


// ==========================================
// START
// ==========================================

renderCuisines();
updateSearchLink();

