
/* =========================================
   MO OS | FOOD DATA
   Edit your food options here!
========================================= */


/* =========================================
   1. THIS WEEK'S MENU

   Add or remove meal IDs below.
   Only these meals appear in the app.

   Example:
   Remove "tacos" if tacos aren't on
   your menu this week.

   Keep the quotation marks and commas.
========================================= */

const weeklyMenu = [
  // BREAKFAST
  "egg-sandwich",
  "breakfast-burrito",
  "full-breakfast",
  "waffles",

  // LUNCH
  "turkey-wrap",
  "chicken-salad",
  "leftover-pasta",

  // DINNER
  "tacos",
  "spaghetti",
  "chicken-rice",
  "chicken-potatoes",
  "frozen-pizza"
];


/* =========================================
   2. PERMANENT MEAL LIBRARY

   Each meal has:
   id           - Unique identifier
   name         - Display name
   category     - breakfast / lunch / dinner
   timeMinutes  - Total cooking time
   icon         - Backup when photo unavailable
   image        - Photo URL or local file
   ingredients  - Everything needed
   steps        - Recipe instructions

   For simple foods, use steps: []

   To use your own photo, replace image with:
   "../images/meals/my-food.jpg"

   The starter stock photos are examples.
========================================= */

const mealLibrary = [

  // ======================================
  // BREAKFAST
  // ======================================

  {
    id: "egg-sandwich",
    name: "Egg & Cheese Sandwich",
    category: "breakfast",
    timeMinutes: 10,
    icon: "🥪",

    image: "https://images.unsplash.com/photo-1780130779205-7b809c225a83?auto=format&fit=crop&w=700&q=80",
    photoBy: "MAK",
    photoPage: "https://unsplash.com/photos/jRLzGorL28c",

    ingredients: [
      "1 egg",
      "1 slice cheese",
      "1 English muffin or 2 slices bread",
      "Butter or cooking oil"
    ],

    steps: []
  },

  {
    id: "breakfast-burrito",
    name: "Breakfast Burrito",
    category: "breakfast",
    timeMinutes: 15,
    icon: "🌯",

    image: "https://images.unsplash.com/photo-1662478839359-751ffc3cbbd8?auto=format&fit=crop&w=700&q=80",
    photoBy: "Mikey Frost",
    photoPage: "https://unsplash.com/photos/bmXDqfPf4Vo",

    ingredients: [
      "2 eggs",
      "1 large tortilla",
      "1/4 cup shredded cheese",
      "Cooked sausage or bacon (optional)",
      "Salt and pepper",
      "Butter or cooking oil"
    ],

    steps: [
      "Cook sausage or bacon first if using it.",
      "Scramble eggs in a lightly greased skillet.",
      "Warm the tortilla until flexible.",
      "Add eggs, cheese, and any cooked meat.",
      "Fold the sides inward and roll tightly.",
      "Toast the burrito in the skillet until golden."
    ]
  },

  {
    id: "full-breakfast",
    name: "Full Breakfast",
    category: "breakfast",
    timeMinutes: 30,
    icon: "🍳",

    image: "https://images.unsplash.com/photo-1764607265784-16b612151ee2?auto=format&fit=crop&w=700&q=80",
    photoBy: "Nellie Adamyan",
    photoPage: "https://unsplash.com/photos/1vjUlJxEQ-0",

    ingredients: [
      "2 eggs",
      "1 medium potato",
      "2 slices bacon or 2 sausage links",
      "2 slices bread",
      "Butter or cooking oil",
      "Salt, pepper, paprika"
    ],

    steps: [
      "Dice the potato into small pieces.",
      "Season and cook in an oiled skillet until tender and golden, about 15–20 minutes.",
      "Cook bacon or sausage thoroughly.",
      "Prepare eggs however you like.",
      "Toast the bread.",
      "Plate everything together."
    ]
  },

  {
    id: "waffles",
    name: "Toaster Waffles",
    category: "breakfast",
    timeMinutes: 5,
    icon: "🧇",

    image: "https://images.unsplash.com/photo-1641924675534-bec33d867137?auto=format&fit=crop&w=700&q=80",
    photoBy: "Cory Bjork",
    photoPage: "https://unsplash.com/photos/pXm-fZzRBSY",

    ingredients: [
      "Frozen toaster waffles",
      "Butter",
      "Maple syrup"
    ],

    steps: []
  },


  // ======================================
  // LUNCH
  // ======================================

  {
    id: "turkey-wrap",
    name: "Turkey & Cheese Wrap",
    category: "lunch",
    timeMinutes: 10,
    icon: "🌯",

    // Temporary representative sandwich photo
    image: "https://images.unsplash.com/photo-1754652327590-634bfebc7cf0?auto=format&fit=crop&w=700&q=80",
    photoBy: "Dillon Lobo",
    photoPage: "https://unsplash.com/photos/BmP0dv6WfSo",

    ingredients: [
      "1 large tortilla",
      "3–4 slices deli turkey",
      "1 slice cheese",
      "Lettuce",
      "Mayonnaise or mustard"
    ],

    steps: []
  },

  {
    id: "chicken-salad",
    name: "Chicken Salad Sandwich",
    category: "lunch",
    timeMinutes: 15,
    icon: "🥪",

    image: "https://images.unsplash.com/photo-1754652327590-634bfebc7cf0?auto=format&fit=crop&w=700&q=80",
    photoBy: "Dillon Lobo",
    photoPage: "https://unsplash.com/photos/BmP0dv6WfSo",

    ingredients: [
      "1 cup cooked, cooled chicken",
      "2 tablespoons mayonnaise",
      "1 teaspoon mustard",
      "Diced celery",
      "Salt and pepper",
      "2 slices bread"
    ],

    steps: [
      "Chop or shred the cooked chicken.",
      "Mix chicken, mayonnaise, mustard, and celery.",
      "Season with salt and pepper.",
      "Spread between two slices of bread."
    ]
  },

  {
    id: "leftover-pasta",
    name: "Leftover Pasta",
    category: "lunch",
    timeMinutes: 5,
    icon: "🍝",

    image: "https://images.unsplash.com/photo-1760390952355-a6b9cf50a7a2?auto=format&fit=crop&w=700&q=80",
    photoBy: "Anbinh Pho",
    photoPage: "https://unsplash.com/photos/hSU3YyEZ62c",

    ingredients: [
      "Previously cooked and refrigerated pasta"
    ],

    steps: []
  },


  // ======================================
  // DINNER
  // ======================================

  {
    id: "tacos",
    name: "Taco Night",
    category: "dinner",
    timeMinutes: 25,
    icon: "🌮",

    image: "https://images.unsplash.com/photo-1683062332605-4e1209d75346?auto=format&fit=crop&w=700&q=80",
    photoBy: "We The Creators",
    photoPage: "https://unsplash.com/photos/5mpht0M5H0E",

    ingredients: [
      "1 lb ground beef or turkey",
      "Taco seasoning",
      "Taco shells or tortillas",
      "Shredded lettuce",
      "Shredded cheese",
      "Salsa",
      "Your favorite toppings"
    ],

    steps: [
      "Brown ground beef or turkey in a skillet until fully cooked.",
      "Drain excess grease if necessary.",
      "Add taco seasoning and water according to the seasoning packet.",
      "Simmer until the sauce thickens.",
      "Warm tortillas or taco shells.",
      "Fill with meat and your favorite toppings."
    ]
  },

  {
    id: "spaghetti",
    name: "Spaghetti",
    category: "dinner",
    timeMinutes: 30,
    icon: "🍝",

    image: "https://images.unsplash.com/photo-1760390952355-a6b9cf50a7a2?auto=format&fit=crop&w=700&q=80",
    photoBy: "Anbinh Pho",
    photoPage: "https://unsplash.com/photos/hSU3YyEZ62c",

    ingredients: [
      "12 oz spaghetti",
      "1 jar pasta sauce",
      "1 lb ground beef or turkey",
      "Garlic",
      "Italian seasoning",
      "Salt and pepper"
    ],

    steps: [
      "Bring salted water to a boil.",
      "Cook spaghetti according to package directions.",
      "Brown the ground meat in a separate pan until fully cooked.",
      "Add garlic and Italian seasoning.",
      "Pour in pasta sauce and simmer for 10 minutes.",
      "Drain pasta and serve with the sauce."
    ]
  },

  {
    id: "chicken-rice",
    name: "Chicken & Rice Bowls",
    category: "dinner",
    timeMinutes: 30,
    icon: "🍚",

    image: "https://images.unsplash.com/photo-1762631383378-115f2d4cbe07?auto=format&fit=crop&w=700&q=80",
    photoBy: "joe boshra",
    photoPage: "https://unsplash.com/photos/6XDDOrCMs64",

    ingredients: [
      "1 lb boneless chicken",
      "1 cup uncooked white rice",
      "2 cups water (or package directions)",
      "1–2 cups vegetables",
      "Olive oil",
      "Garlic powder",
      "Paprika",
      "Salt and pepper"
    ],

    steps: [
      "Cook rice according to package directions.",
      "Dice chicken and season with garlic powder, paprika, salt, and pepper.",
      "Cook chicken in an oiled skillet until it reaches 165°F internally.",
      "Steam or sauté the vegetables.",
      "Assemble rice bowls with chicken and vegetables.",
      "Add your favorite sauce if desired."
    ]
  },

  {
    id: "chicken-potatoes",
    name: "Creamy Chicken & Potatoes",
    category: "dinner",
    timeMinutes: 360,
    icon: "🥔",
    note: "Slow cooker",

    // Representative chicken-and-potato photo
    image: "https://images.unsplash.com/photo-1679310289677-fdcb43ffb6ee?auto=format&fit=crop&w=700&q=80",
    photoBy: "SJ",
    photoPage: "https://unsplash.com/photos/PrGHwtV9Tz0",

    ingredients: [
      "1 lb boneless chicken",
      "3 medium potatoes",
      "1 small onion",
      "1 cup chicken broth or water",
      "1/2 cup heavy cream",
      "Garlic powder",
      "Paprika",
      "Salt and pepper"
    ],

    steps: [
      "Dice the potatoes and onion.",
      "Place chicken, potatoes, and onion into the slow cooker.",
      "Add broth or water and seasonings.",
      "Cover and cook on low for about 6 hours, until potatoes are tender and chicken reaches 165°F internally.",
      "Stir in the cream near the end and heat through.",
      "Adjust seasonings and serve."
    ]
  },

  {
    id: "frozen-pizza",
    name: "Frozen Pizza",
    category: "dinner",
    timeMinutes: 20,
    icon: "🍕",

    image: "https://images.unsplash.com/photo-1774806189229-ed02b4f77de1?auto=format&fit=crop&w=700&q=80",
    photoBy: "Diego Arenas de Rodrigo",
    photoPage: "https://unsplash.com/photos/oj0GX4lCYFI",

    ingredients: [
      "Your favorite frozen pizza"
    ],

    steps: []
  }

];
