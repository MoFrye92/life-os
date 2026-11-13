/* =========================================
   MO OS | SET THE MOOD
   YOUR MUSIC LIBRARY — EDIT THIS FILE
========================================= */

// QUESTION 1: How are you feeling?
// QUESTION 2: What's the scene?
// QUESTION 3: What energy do you want?
// Change the labels/icons if you like, but keep IDs aligned with genre tags.
const musicQuestions = [
  {
    id: "mood",
    title: "How are we feeling?",
    subtitle: "No wrong answers. Pick what fits right now.",
    options: [
      { id: "good", label: "Feeling good", icon: "☀️" },
      { id: "boost", label: "Need a boost", icon: "🔥" },
      { id: "emotional", label: "In my feelings", icon: "💭" },
      { id: "nostalgic", label: "Feeling nostalgic", icon: "📼" },
      { id: "peaceful", label: "Need some peace", icon: "🌙" },
      { id: "grounded", label: "Need grounding", icon: "🙏" },
      { id: "dramatic", label: "Main character", icon: "🎭" },
      { id: "confident", label: "Feeling myself", icon: "👑" }
    ]
  },
  {
    id: "activity",
    title: "What's the scene?",
    subtitle: "What are you getting into?",
    options: [
      { id: "drive", label: "Driving", icon: "🚗" },
      { id: "clean", label: "Cleaning / moving", icon: "🧹" },
      { id: "focus", label: "Working / focusing", icon: "💻" },
      { id: "unwind", label: "Unwinding", icon: "🛋️" },
      { id: "getready", label: "Getting ready", icon: "✨" },
      { id: "sing", label: "Singing my heart out", icon: "🎤" }
    ]
  },
  {
    id: "energy",
    title: "How much energy?",
    subtitle: "Set the volume on your vibe.",
    options: [
      { id: "low", label: "Soft & slow", icon: "🫧" },
      { id: "medium", label: "A little bounce", icon: "🪩" },
      { id: "high", label: "Turn it UP", icon: "⚡" }
    ]
  }
];

/* =========================================
   YOUR GENRES

   To hide a genre, remove its ID from
   activeMusicGenres.

   To add a genre, copy an object below,
   change its ID/name/etc., then add its ID
   to activeMusicGenres.

   searchQuery is sent to Apple Music search.
   You can swap it for favorite artists,
   albums, or playlist search terms.
========================================= */

const activeMusicGenres = [
  "hiphop", "pop", "country", "jazz", "blues", "broadway",
  "disney", "motown", "pop-punk", "gospel", "rnb", "rock"
];

const musicGenres = [
  {
    id: "hiphop", name: "Hip-Hop", icon: "🎤", color: "#835B87",
    tagline: "Beats, bars, and main-character confidence.",
    searchQuery: "hip hop essentials playlist",
    moods: ["boost", "confident", "good"],
    activities: ["drive", "clean", "getready"], energies: ["medium", "high"]
  },
  {
    id: "pop", name: "Pop", icon: "💫", color: "#9E6581",
    tagline: "Catchy hooks and sing-it-loud moments.",
    searchQuery: "pop hits essentials playlist",
    moods: ["good", "boost", "confident"],
    activities: ["getready", "sing", "clean"], energies: ["medium", "high"]
  },
  {
    id: "country", name: "Country", icon: "🤠", color: "#9A794D",
    tagline: "Stories, open roads, and a little heart.",
    searchQuery: "country essentials playlist",
    moods: ["nostalgic", "emotional", "peaceful"],
    activities: ["drive", "unwind", "sing"], energies: ["low", "medium"]
  },
  {
    id: "jazz", name: "Jazz", icon: "🎷", color: "#536C75",
    tagline: "Smooth, sophisticated, and unhurried.",
    searchQuery: "smooth jazz essentials playlist",
    moods: ["peaceful", "emotional", "grounded"],
    activities: ["focus", "unwind"], energies: ["low", "medium"]
  },
  {
    id: "blues", name: "Blues", icon: "🎸", color: "#476A9B",
    tagline: "A little soul for whatever you're feeling.",
    searchQuery: "blues essentials playlist",
    moods: ["emotional", "peaceful", "nostalgic"],
    activities: ["unwind", "drive"], energies: ["low", "medium"]
  },
  {
    id: "broadway", name: "Broadway", icon: "🎭", color: "#9A5B69",
    tagline: "Big feelings. Bigger vocals. Curtain up.",
    searchQuery: "Broadway musical theatre favorites playlist",
    moods: ["dramatic", "good", "emotional"],
    activities: ["sing", "getready"], energies: ["medium", "high"]
  },
  {
    id: "disney", name: "Disney", icon: "🏰", color: "#6686A8",
    tagline: "A little magic and all the songs you know.",
    searchQuery: "Disney sing along songs playlist",
    moods: ["good", "nostalgic", "dramatic"],
    activities: ["sing", "clean", "unwind"], energies: ["medium", "high"]
  },
  {
    id: "motown", name: "Motown", icon: "🪩", color: "#9B764B",
    tagline: "Classic soul that moves your whole house.",
    searchQuery: "Motown essentials playlist",
    moods: ["nostalgic", "good", "boost"],
    activities: ["drive", "clean", "sing"], energies: ["medium", "high"]
  },
  {
    id: "pop-punk", name: "2000s Pop-Punk", icon: "🖤", color: "#747A8E",
    tagline: "Simple Plan, Good Charlotte, and teenage-you energy.",
    searchQuery: "2000s pop punk Simple Plan Good Charlotte",
    moods: ["nostalgic", "boost", "emotional"],
    activities: ["drive", "sing", "clean"], energies: ["medium", "high"]
  },
  {
    id: "gospel", name: "Gospel", icon: "🙌", color: "#7D8B63",
    tagline: "Faith, comfort, and a little strength.",
    searchQuery: "gospel music essentials playlist",
    moods: ["grounded", "peaceful", "boost"],
    activities: ["unwind", "focus", "sing"], energies: ["low", "medium", "high"]
  },
  {
    id: "rnb", name: "R&B / Soul", icon: "🎶", color: "#956C7C",
    tagline: "Smooth vocals, feelings, and good grooves.",
    searchQuery: "R&B soul essentials playlist",
    moods: ["emotional", "peaceful", "confident"],
    activities: ["unwind", "getready", "drive"], energies: ["low", "medium"]
  },
  {
    id: "rock", name: "Alternative Rock", icon: "🤘", color: "#7D675E",
    tagline: "Guitars, big choruses, and a little edge.",
    searchQuery: "2000s alternative rock essentials playlist",
    moods: ["boost", "nostalgic", "dramatic"],
    activities: ["drive", "clean", "sing"], energies: ["medium", "high"]
  }
];
