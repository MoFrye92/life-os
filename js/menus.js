/* ==========================================
   MO OS | MENU CATALOG | Version 0.7
   Only 'What We Watching?' is newly connected.
========================================== */

const moMenus = [
  // EAT
  { id: "food", title: "What's to Eat?", icon: "🍳", group: "EAT",
    description: "Breakfast, lunch, dinner. What's on the menu?", path: "pages/food.html" },
  { id: "eating-out", title: "Where We Eating?", icon: "🍜", group: "EAT",
    description: "Pick a cuisine and find something good.", path: "pages/eating-out.html" },

  // VIBE
  { id: "bored", title: "I'm Bored", icon: "🎮", group: "VIBE",
    description: "Find something fun without overthinking." },
  { id: "music", title: "Set the Mood", icon: "🎧", group: "VIBE",
    description: "Let MO OS find your soundtrack.", path: "pages/music.html" },
  { id: "watching", title: "What We Watching?", icon: "🍿", group: "VIBE",
    description: "Comfort watches, cult favorites, and new discoveries.", path: "pages/watching.html" },
  { id: "outside", title: "Get Out the House", icon: "🚗", group: "VIBE",
    description: "Go somewhere. Do something. Make memories." },
  { id: "creative", title: "Creative Roulette", icon: "📸", group: "VIBE",
    description: "Photography, crafts, art, and creative ideas." },
  { id: "treat", title: "Treat Yourself", icon: "✨", group: "VIBE",
    description: "Because you deserve a little something." },

  // LIFE
  { id: "outfit", title: "Fit Check", icon: "👟", group: "LIFE",
    description: "Pick a fit without the closet crisis." },
  { id: "cleaning", title: "Reset My Space", icon: "🧹", group: "LIFE",
    description: "A little cleaning goes a long way." },
  { id: "daily-reset", title: "The Daily Reset", icon: "🧠", group: "LIFE",
    description: "Get unstuck. Find your next move." },
  { id: "admin", title: "Handle Your Business", icon: "📋", group: "LIFE",
    description: "Bills, paperwork, and grown-up stuff." }
];
