
/* =========================================
   MO OS | WHERE WE EATING?
   EDIT YOUR FOOD OPTIONS HERE
========================================= */


/* =========================================
   1. ACTIVE CUISINES

   These are the options currently
   displayed in your app.

   Remove an ID to hide a cuisine.
   Add it back whenever you want.
========================================= */

const activeCuisineIds = [
  "mexican",
  "italian",
  "bbq",
  "burgers",
  "pizza",
  "latin",
  "chicken",
  "brunch"
];


/* =========================================
   2. CUISINE LIBRARY

   id       - Unique name used in code
   name     - What appears on the screen
   icon     - Emoji shown on the card
   craving  - Examples of what to eat
   search   - Google Maps search phrase
   color    - Card accent color
   image    - Optional photo file

   You can add your own pictures later:
   image: "../images/cuisines/pizza.jpg"

   Leave image as "" to use the emoji.
========================================= */

const cuisineLibrary = [

  {
    id: "mexican",
    name: "Mexican / Tex-Mex",
    icon: "🌮",
    craving: "Tacos, burritos, quesadillas",
    search: "Mexican food",
    color: "#B87855",
    image: ""
  },

  {
    id: "italian",
    name: "Italian",
    icon: "🍝",
    craving: "Pasta, lasagna, Italian comfort food",
    search: "Italian food",
    color: "#657957",
    image: ""
  },

  {
    id: "bbq",
    name: "BBQ",
    icon: "🍖",
    craving: "Smoky, saucy, grilled",
    search: "BBQ food",
    color: "#926249",
    image: ""
  },

  {
    id: "burgers",
    name: "Burgers",
    icon: "🍔",
    craving: "Burgers, fries, sandwiches",
    search: "Burger restaurants",
    color: "#9A8150",
    image: ""
  },

  {
    id: "pizza",
    name: "Pizza",
    icon: "🍕",
    craving: "Classic, loaded, or something different",
    search: "Pizza",
    color: "#A55F50",
    image: ""
  },

  {
    id: "latin",
    name: "Latin",
    icon: "🫓",
    craving: "Empanadas, rice dishes, comfort food",
    search: "Latin American restaurants",
    color: "#977D4A",
    image: ""
  },

  {
    id: "chicken",
    name: "Chicken",
    icon: "🍗",
    craving: "Wings, grilled chicken, crispy tenders",
    search: "Chicken restaurants",
    color: "#667F75",
    image: ""
  },

  {
    id: "brunch",
    name: "Brunch",
    icon: "🥞",
    craving: "Breakfast plates, waffles, brunch favorites",
    search: "Brunch restaurants",
    color: "#947160",
    image: ""
  }

];

