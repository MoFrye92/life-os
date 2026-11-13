/* ==========================================
   MO OS | MENU CATALOG | Version 0.8
   Keep your existing pages + connect the seven new ones.
   Only edit a path if you rename its page file.
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
    description: "Go somewhere. Do something. Make memories.", path: "pages/outside.html" },
  { id: "creative", title: "Creative Roulette", icon: "📸", group: "VIBE",
    description: "Photography, crafts, art, and creative ideas.", path: "pages/creative.html" },
  { id: "treat", title: "Treat Yourself", icon: "✨", group: "VIBE",
    description: "Because you deserve a little something.", path: "pages/treat.html" },

  // LIFE
  { id: "outfit", title: "Fit Check", icon: "👟", group: "LIFE",
    description: "Pick a fit without the closet crisis.", path: "pages/outfit.html" },
  { id: "cleaning", title: "Reset My Space", icon: "🧹", group: "LIFE",
    description: "A little cleaning goes a long way.", path: "pages/cleaning.html" },
  { id: "daily-reset", title: "The Daily Reset", icon: "🧠", group: "LIFE",
    description: "Get unstuck. Find your next move.", path: "pages/reset.html" },
  { id: "admin", title: "Handle Your Business", icon: "📋", group: "LIFE",
    description: "Bills, paperwork, and grown-up stuff.", path: "pages/admin.html" }
];
