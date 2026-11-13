
/* ==========================================
   MO OS | MAIN APPLICATION
   Version 0.4
========================================== */


// ==========================================
// SCREEN ELEMENTS
// ==========================================

const homeScreen = document.querySelector("#home-screen");
const boredScreen = document.querySelector("#bored-screen");
const moduleScreen = document.querySelector("#module-screen");

const backHomeButton = document.querySelector("#back-home");
const moduleBackButton = document.querySelector("#module-back");

const menuContainer = document.querySelector("#extra-menus");

const moduleTitle = document.querySelector("#module-title");
const moduleDescription = document.querySelector("#module-description");
const moduleLabel = document.querySelector("#module-label");


// I'm Bored elements
const energyCards = document.querySelectorAll(".energy-card");
const selectionText = document.querySelector("#selection");
const rerollButton = document.querySelector("#reroll-button");


// ==========================================
// APPLICATION STATE
// ==========================================

let currentEnergy = null;
let currentSuggestion = null;


// ==========================================
// SCREEN NAVIGATION
// ==========================================

function showScreen(screen) {

  homeScreen.hidden = screen !== "home";
  boredScreen.hidden = screen !== "bored";
  moduleScreen.hidden = screen !== "module";

  window.scrollTo(0, 0);
}


// Return from I'm Bored
backHomeButton.addEventListener("click", () => {

  resetBored();
  showScreen("home");

});


// Return from shared menu screen
moduleBackButton.addEventListener("click", () => {

  showScreen("home");

});


// ==========================================
// BUILD MAIN MENU
// ==========================================

const menuGroups = ["EAT", "VIBE", "LIFE"];

menuGroups.forEach((groupName) => {

  const group = document.createElement("section");
  group.className = "mo-menu-group";

  const heading = document.createElement("h3");
  heading.textContent = groupName;

  const grid = document.createElement("div");
  grid.className = "mo-menu-grid";

  const groupMenus = moMenus.filter(
    (menu) => menu.group === groupName
  );

  groupMenus.forEach((menu) => {

    const button = document.createElement("button");

    button.type = "button";
    button.className = "mo-menu-card";

    const icon = document.createElement("span");
    icon.className = "mo-menu-icon";
    icon.textContent = menu.icon;

    const title = document.createElement("span");
    title.className = "mo-menu-title";
    title.textContent = menu.title;

    button.append(icon, title);

    button.addEventListener("click", () => {
      openMenu(menu);
    });

    grid.append(button);

  });

  group.append(heading, grid);
  menuContainer.append(group);

});


// ==========================================
// OPEN MENU
// ==========================================

function openMenu(menu) {

  // I'm Bored uses its existing screen
  if (menu.id === "bored") {

    resetBored();
    showScreen("bored");

    return;
  }

  // Standalone pages open their own HTML
  if (menu.path) {

    window.location.href = menu.path;

    return;
  }

  // All unfinished menus use shared screen
  moduleLabel.textContent = `MO OS / ${menu.group}`;
  moduleTitle.textContent = menu.title;
  moduleDescription.textContent = menu.description;

  showScreen("module");

}


// ==========================================
// I'M BORED - RANDOM ACTIVITY
// ==========================================

function generateSuggestion() {

  if (!currentEnergy) return;

  const options = activities[currentEnergy];

  if (!options || options.length === 0) {

    selectionText.textContent =
      "No activities available yet.";

    rerollButton.hidden = true;

    return;
  }

  // Prevent immediate repeats
  const availableOptions = options.filter(
    (activity) => activity !== currentSuggestion
  );

  const pool = availableOptions.length > 0
    ? availableOptions
    : options;

  const randomIndex = Math.floor(
    Math.random() * pool.length
  );

  currentSuggestion = pool[randomIndex];

  selectionText.textContent = `${currentSuggestion}?`;

  rerollButton.hidden = false;

}


// ==========================================
// ENERGY SELECTION
// ==========================================

energyCards.forEach((card) => {

  card.addEventListener("click", () => {

    currentEnergy = card.dataset.energy;
    currentSuggestion = null;

    energyCards.forEach((otherCard) => {

      const isSelected = otherCard === card;

      otherCard.classList.toggle(
        "is-selected",
        isSelected
      );

      otherCard.setAttribute(
        "aria-pressed",
        String(isSelected)
      );

    });

    generateSuggestion();

  });

});


// ==========================================
// REROLL
// ==========================================

rerollButton.addEventListener("click", () => {
  generateSuggestion();
});


// ==========================================
// RESET I'M BORED
// ==========================================

function resetBored() {

  currentEnergy = null;
  currentSuggestion = null;

  selectionText.textContent =
    "Choose an energy level to begin.";

  rerollButton.hidden = true;

  energyCards.forEach((card) => {

    card.classList.remove("is-selected");

    card.setAttribute(
      "aria-pressed",
      "false"
    );

  });

}


// ==========================================
// START APPLICATION
// ==========================================

showScreen("home");
