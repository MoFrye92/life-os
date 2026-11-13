/* ==========================================
	 MO OS | FOOD MENU LOGIC
========================================== */


// ==========================================
// ELEMENTS
// ==========================================

const mealTabs = document.querySelectorAll(".meal-tab");

const foodGrid = document.querySelector("#food-grid");
const mealHeading = document.querySelector("#meal-heading");
const mealCount = document.querySelector("#meal-count");
const timeFilter = document.querySelector("#time-filter");

const recipeDialog = document.querySelector("#recipe-dialog");
const recipeContent = document.querySelector("#recipe-content");
const closeRecipeButton = document.querySelector("#close-recipe");


// ==========================================
// STATE
// ==========================================

let selectedMeal = "breakfast";


// ==========================================
// HELPERS
// ==========================================

// Create an HTML element with optional text
function createElement(tag, className = "", text = "") {
	const element = document.createElement(tag);

	if (className) {
		element.className = className;
	}

	if (text) {
		element.textContent = text;
	}

	return element;
}


// Format time in a readable way
function formatTime(minutes) {
	if (minutes < 60) {
		return `${minutes} min`;
	}

	const hours = Math.floor(minutes / 60);
	const remaining = minutes % 60;

	if (remaining === 0) {
		return `${hours} hr`;
	}

	return `${hours} hr ${remaining} min`;
}


// Create a food photo with an emoji fallback
function createFoodPhoto(meal) {
	const container = createElement("div", "food-photo");

	const fallback = createElement(
		"span",
		"photo-fallback",
		meal.icon
	);

	container.append(fallback);

	if (meal.image) {
		const image = document.createElement("img");

		image.src = meal.image;
		image.alt = meal.name;
		image.loading = "lazy";

		// Show emoji instead if image is unavailable
		image.addEventListener("error", () => {
			image.remove();
		});

		container.append(image);
	}

	return container;
}


// ==========================================
// GET THIS WEEK'S AVAILABLE MEALS
// ==========================================

function getWeeklyMeals() {
	return weeklyMenu
		.map((id) => {
			return mealLibrary.find((meal) => meal.id === id);
		})
		.filter(Boolean);
}


// ==========================================
// DISPLAY FOOD MENU
// ==========================================

function renderFoodMenu() {

	const maxTime = Number(timeFilter.value);

	// Start with meals selected for this week
	let meals = getWeeklyMeals();

	// Filter by breakfast, lunch, or dinner
	meals = meals.filter((meal) => {
		return meal.category === selectedMeal;
	});

	// Filter by total cooking time
	if (maxTime > 0) {
		meals = meals.filter((meal) => {
			return meal.timeMinutes <= maxTime;
		});
	}

	// Update heading and count
	mealHeading.textContent =
		selectedMeal.charAt(0).toUpperCase() +
		selectedMeal.slice(1) +
		" Menu";

	mealCount.textContent =
		`${meals.length} ${meals.length === 1 ? "choice" : "choices"}`;

	// Clear previous cards
	foodGrid.replaceChildren();

	// Empty menu message
	if (meals.length === 0) {
		const empty = createElement(
			"p",
			"empty-state",
			"Nothing matches right now. Try changing the cooking time, or add more meals to your weekly menu."
		);

		foodGrid.append(empty);
		return;
	}

	// Build a card for every available meal
	meals.forEach((meal) => {

		const card = createElement("button", "food-card");
		card.type = "button";

		const photo = createFoodPhoto(meal);
		const details = createElement("div", "food-card-copy");

		const name = createElement(
			"h3",
			"food-name",
			meal.name
		);

		const timeText = meal.note
			? `⏱ ${formatTime(meal.timeMinutes)} · ${meal.note}`
			: `⏱ ${formatTime(meal.timeMinutes)}`;

		const time = createElement(
			"p",
			"food-time",
			timeText
		);

		const ingredients = createElement(
			"p",
			"food-ingredients",
			meal.ingredients.join(" · ")
		);

		details.append(name, time, ingredients);

		card.append(photo, details);

		// Open recipe when selected
		card.addEventListener("click", () => {
			openRecipe(meal);
		});

		foodGrid.append(card);
	});
}


// ==========================================
// OPEN FULL RECIPE
// ==========================================

function openRecipe(meal) {

	recipeContent.replaceChildren();

	// Food photo
	const photo = createFoodPhoto(meal);

	// Meal title
	const title = createElement(
		"h2",
		"",
		meal.name
	);

	title.id = "recipe-title";

	// Cooking time
	const time = createElement(
		"p",
		"recipe-meta",
		`⏱ ${formatTime(meal.timeMinutes)}${meal.note ? " · " + meal.note : ""}`
	);

	recipeContent.append(photo, title, time);

	// INGREDIENTS

	const ingredientsHeading = createElement(
		"h3",
		"",
		"What you'll need"
	);

	const ingredientList = document.createElement("ul");

	meal.ingredients.forEach((ingredient) => {
		const item = createElement("li", "", ingredient);
		ingredientList.append(item);
	});

	recipeContent.append(
		ingredientsHeading,
		ingredientList
	);

	// INSTRUCTIONS
	// Simple meals with steps: [] won't show this section.

	if (meal.steps && meal.steps.length > 0) {

		const instructionsHeading = createElement(
			"h3",
			"",
			"Let's make it"
		);

		const instructionsList = document.createElement("ol");

		meal.steps.forEach((step) => {
			const item = createElement("li", "", step);
			instructionsList.append(item);
		});

		recipeContent.append(
			instructionsHeading,
			instructionsList
		);
	}

	// Photo credit when using an Unsplash picture
	if (meal.photoPage) {

		const creditContainer = createElement(
			"p",
			"photo-credit"
		);

		const creditLink = document.createElement("a");

		creditLink.href = meal.photoPage;
		creditLink.target = "_blank";
		creditLink.rel = "noopener noreferrer";

		creditLink.textContent =
			`Photo by ${meal.photoBy || "a contributor"} on Unsplash`;

		creditContainer.append(creditLink);
		recipeContent.append(creditContainer);
	}

	// Show recipe panel
	recipeDialog.showModal();

	// Reset panel scroll position
	recipeDialog.scrollTop = 0;
}


// ==========================================
// MEAL CATEGORY SELECTION
// ==========================================

mealTabs.forEach((tab) => {

	tab.addEventListener("click", () => {

		selectedMeal = tab.dataset.category;

		// Highlight the active tab
		mealTabs.forEach((otherTab) => {

			const isActive = otherTab === tab;

			otherTab.classList.toggle(
				"is-active",
				isActive
			);

			otherTab.setAttribute(
				"aria-pressed",
				String(isActive)
			);

		});

		renderFoodMenu();
	});
});


// ==========================================
// COOKING TIME FILTER
// ==========================================

timeFilter.addEventListener("change", () => {
	renderFoodMenu();
});


// ==========================================
// CLOSE RECIPE
// ==========================================

closeRecipeButton.addEventListener("click", () => {
	recipeDialog.close();
});

// Also close when tapping the dark backdrop
recipeDialog.addEventListener("click", (event) => {
	if (event.target === recipeDialog) {
		recipeDialog.close();
	}
});


// ==========================================
// INITIALIZE
// ==========================================

renderFoodMenu();
