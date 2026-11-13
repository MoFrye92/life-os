/* ============================================
   MO OS | WHAT WE WATCHING?
   v0.7 - YOUR ONE EDITABLE TITLE LIBRARY

   50 discoveries: 25 movies + 25 shows.
   These are suggestions, NOT confirmed favorites
   or confirmed streaming availability.

   To remove a suggestion: delete its object.
   To add one: copy an object and change its fields.
   tags control filters. wiki is the Wikipedia
   page title used to look up a poster thumbnail.

   Safe lists are YOUR choices: tap the heart
   on a card or use the Add Favorite form.
   Saved selections live in this browser.
============================================ */

const WATCH_TAGS = [
  "Black Stories", "Queer Stories", "Cult Favorite",
  "Marvel / Superhero", "Mystery & Thriller",
  "Animation / Anime", "Comedy", "Romance",
  "Emotional", "Music & Stage", "Reality & Creative",
  "Action & Adventure", "Feel-Good"
];

const watchCatalog = [
  // ---------- 25 MOVIES ----------
  {
    id: "black-panther", title: "Black Panther",
    type: "movie", year: 2018,
    tags: ["Marvel / Superhero", "Black Stories", "Action & Adventure"],
    why: "A bold Marvel world with family, legacy, and a killer soundtrack.",
    wiki: "Black Panther (film)"
  },
  {
    id: "into-spider-verse", title: "Spider-Man: Into the Spider-Verse",
    type: "movie", year: 2018,
    tags: ["Marvel / Superhero", "Animation / Anime", "Cult Favorite"],
    why: "A wildly creative animated superhero adventure with a ton of heart.",
    wiki: "Spider-Man: Into the Spider-Verse"
  },
  {
    id: "across-spider-verse", title: "Spider-Man: Across the Spider-Verse",
    type: "movie", year: 2023,
    tags: ["Marvel / Superhero", "Animation / Anime"],
    why: "Gorgeous animation and a bigger multiverse story.",
    wiki: "Spider-Man: Across the Spider-Verse"
  },
  {
    id: "love-basketball", title: "Love & Basketball",
    type: "movie", year: 2000,
    tags: ["Black Stories", "Romance", "Cult Favorite"],
    why: "A slow-burn sports romance with real chemistry and nostalgia.",
    wiki: "Love & Basketball"
  },
  {
    id: "the-wood", title: "The Wood",
    type: "movie", year: 1999,
    tags: ["Black Stories", "Comedy", "Cult Favorite"],
    why: "Friendship and coming-of-age memories with a classic late-90s feel.",
    wiki: "The Wood"
  },
  {
    id: "set-it-off", title: "Set It Off",
    type: "movie", year: 1996,
    tags: ["Black Stories", "Mystery & Thriller", "Cult Favorite"],
    why: "A fierce heist drama led by four unforgettable women.",
    wiki: "Set It Off (film)"
  },
  {
    id: "eves-bayou", title: "Eve's Bayou",
    type: "movie", year: 1997,
    tags: ["Black Stories", "Emotional", "Cult Favorite"],
    why: "Atmospheric family secrets and standout performances.",
    wiki: "Eve's Bayou"
  },
  {
    id: "dope", title: "Dope",
    type: "movie", year: 2015,
    tags: ["Black Stories", "Comedy", "Cult Favorite"],
    why: "Fast, funny, music-soaked coming-of-age energy.",
    wiki: "Dope (2015 film)"
  },
  {
    id: "photograph", title: "The Photograph",
    type: "movie", year: 2020,
    tags: ["Black Stories", "Romance"],
    why: "A gentle, stylish love story with grown-up energy.",
    wiki: "The Photograph (2020 film)"
  },
  {
    id: "moonlight", title: "Moonlight",
    type: "movie", year: 2016,
    tags: ["Black Stories", "Queer Stories", "Emotional"],
    why: "An intimate, moving story of love, identity, and growing up.",
    wiki: "Moonlight (2016 film)"
  },
  {
    id: "bottoms", title: "Bottoms",
    type: "movie", year: 2023,
    tags: ["Queer Stories", "Comedy", "Cult Favorite"],
    why: "Off-the-wall sapphic comedy with chaotic high-school energy.",
    wiki: "Bottoms (film)"
  },
  {
    id: "cheerleader", title: "But I'm a Cheerleader",
    type: "movie", year: 1999,
    tags: ["Queer Stories", "Comedy", "Cult Favorite"],
    why: "A bright, campy queer cult classic.",
    wiki: "But I'm a Cheerleader"
  },
  {
    id: "half-of-it", title: "The Half of It",
    type: "movie", year: 2020,
    tags: ["Queer Stories", "Romance", "Emotional"],
    why: "Quiet, sweet queer coming-of-age with a clever premise.",
    wiki: "The Half of It"
  },
  {
    id: "booksmart", title: "Booksmart",
    type: "movie", year: 2019,
    tags: ["Comedy", "Cult Favorite"],
    why: "Smart friendship comedy about one very wild night.",
    wiki: "Booksmart"
  },
  {
    id: "everything-everywhere", title: "Everything Everywhere All at Once",
    type: "movie", year: 2022,
    tags: ["Action & Adventure", "Emotional", "Cult Favorite"],
    why: "A weird, moving multiverse story about family and possibility.",
    wiki: "Everything Everywhere All at Once"
  },
  {
    id: "scott-pilgrim", title: "Scott Pilgrim vs. the World",
    type: "movie", year: 2010,
    tags: ["Comedy", "Cult Favorite", "Music & Stage"],
    why: "Comic-book visuals, indie rock, and full-on 2010 nostalgia.",
    wiki: "Scott Pilgrim vs. the World"
  },
  {
    id: "ten-things", title: "10 Things I Hate About You",
    type: "movie", year: 1999,
    tags: ["Romance", "Comedy", "Cult Favorite"],
    why: "A funny, sharp teen rom-com with prime throwback energy.",
    wiki: "10 Things I Hate About You"
  },
  {
    id: "clueless", title: "Clueless",
    type: "movie", year: 1995,
    tags: ["Comedy", "Cult Favorite"],
    why: "Outfits, quotable lines, and classic 90s charm.",
    wiki: "Clueless"
  },
  {
    id: "bend-it", title: "Bend It Like Beckham",
    type: "movie", year: 2002,
    tags: ["Comedy", "Cult Favorite", "Emotional"],
    why: "A feel-good friendship and sports story with heart.",
    wiki: "Bend It Like Beckham"
  },
  {
    id: "knives-out", title: "Knives Out",
    type: "movie", year: 2019,
    tags: ["Mystery & Thriller", "Comedy"],
    why: "A satisfying whodunit with a hilarious ensemble.",
    wiki: "Knives Out"
  },
  {
    id: "glass-onion", title: "Glass Onion: A Knives Out Mystery",
    type: "movie", year: 2022,
    tags: ["Mystery & Thriller", "Comedy"],
    why: "A sunny island mystery with twists and sharp satire.",
    wiki: "Glass Onion: A Knives Out Mystery"
  },
  {
    id: "princess-frog", title: "The Princess and the Frog",
    type: "movie", year: 2009,
    tags: ["Animation / Anime", "Black Stories", "Music & Stage"],
    why: "Disney magic, New Orleans jazz, and a hardworking heroine.",
    wiki: "The Princess and the Frog"
  },
  {
    id: "soul", title: "Soul",
    type: "movie", year: 2020,
    tags: ["Animation / Anime", "Black Stories", "Emotional", "Music & Stage"],
    why: "Jazz, purpose, and a surprisingly moving Pixar story.",
    wiki: "Soul (2020 film)"
  },
  {
    id: "in-the-heights", title: "In the Heights",
    type: "movie", year: 2021,
    tags: ["Music & Stage", "Romance"],
    why: "A colorful, big-hearted musical full of neighborhood love.",
    wiki: "In the Heights (film)"
  },
  {
    id: "wicked", title: "Wicked",
    type: "movie", year: 2024,
    tags: ["Music & Stage", "Emotional"],
    why: "Big Broadway feelings, spectacle, friendship, and powerhouse songs.",
    wiki: "Wicked (2024 film)"
  },

  // ---------- 25 SHOWS ----------
  {
    id: "abbott", title: "Abbott Elementary",
    type: "show", year: 2021,
    tags: ["Black Stories", "Comedy", "Feel-Good"],
    why: "A warm, funny workplace comedy with Philadelphia energy.",
    wiki: "Abbott Elementary"
  },
  {
    id: "insecure", title: "Insecure",
    type: "show", year: 2016,
    tags: ["Black Stories", "Comedy", "Romance"],
    why: "Friendship, dating, and messy grown-up life with sharp humor.",
    wiki: "Insecure (TV series)"
  },
  {
    id: "living-single", title: "Living Single",
    type: "show", year: 1993,
    tags: ["Black Stories", "Comedy", "Cult Favorite"],
    why: "90s Black friendship sitcom comfort.",
    wiki: "Living Single"
  },
  {
    id: "girlfriends", title: "Girlfriends",
    type: "show", year: 2000,
    tags: ["Black Stories", "Comedy", "Cult Favorite"],
    why: "Friendship, careers, and relationship drama with a classic sitcom feel.",
    wiki: "Girlfriends (American TV series)"
  },
  {
    id: "different-world", title: "A Different World",
    type: "show", year: 1987,
    tags: ["Black Stories", "Comedy", "Cult Favorite"],
    why: "Campus friendships and culture with true throwback charm.",
    wiki: "A Different World"
  },
  {
    id: "proud-family", title: "The Proud Family",
    type: "show", year: 2001,
    tags: ["Animation / Anime", "Black Stories", "Cult Favorite"],
    why: "Animated family chaos, humor, and Disney nostalgia.",
    wiki: "The Proud Family"
  },
  {
    id: "good-place", title: "The Good Place",
    type: "show", year: 2016,
    tags: ["Comedy", "Feel-Good"],
    why: "A funny, surprising show about people trying to be better.",
    wiki: "The Good Place"
  },
  {
    id: "only-murders", title: "Only Murders in the Building",
    type: "show", year: 2021,
    tags: ["Mystery & Thriller", "Comedy"],
    why: "Cozy true-crime-style mystery with a lovable oddball trio.",
    wiki: "Only Murders in the Building"
  },
  {
    id: "poker-face", title: "Poker Face",
    type: "show", year: 2023,
    tags: ["Mystery & Thriller", "Comedy"],
    why: "A clever case-of-the-week mystery with a charismatic lead.",
    wiki: "Poker Face (TV series)"
  },
  {
    id: "reasonable-doubt", title: "Reasonable Doubt",
    type: "show", year: 2022,
    tags: ["Black Stories", "Mystery & Thriller"],
    why: "Stylish legal drama with complicated relationships.",
    wiki: "Reasonable Doubt (2022 TV series)"
  },
  {
    id: "harlem", title: "Harlem",
    type: "show", year: 2021,
    tags: ["Black Stories", "Comedy", "Romance"],
    why: "Friendship and love lives in a lively New York setting.",
    wiki: "Harlem (TV series)"
  },
  {
    id: "queen-sugar", title: "Queen Sugar",
    type: "show", year: 2016,
    tags: ["Black Stories", "Emotional"],
    why: "A beautiful, layered family drama.",
    wiki: "Queen Sugar"
  },
  {
    id: "p-valley", title: "P-Valley",
    type: "show", year: 2020,
    tags: ["Black Stories", "Emotional"],
    why: "Bold, music-rich Southern drama with layered characters.",
    wiki: "P-Valley"
  },
  {
    id: "reservation-dogs", title: "Reservation Dogs",
    type: "show", year: 2021,
    tags: ["Comedy", "Emotional", "Cult Favorite"],
    why: "Funny, heartfelt coming-of-age with a distinctive voice.",
    wiki: "Reservation Dogs"
  },
  {
    id: "heartstopper", title: "Heartstopper",
    type: "show", year: 2022,
    tags: ["Queer Stories", "Romance", "Feel-Good"],
    why: "A tender queer coming-of-age romance.",
    wiki: "Heartstopper (TV series)"
  },
  {
    id: "league-of-their-own", title: "A League of Their Own",
    type: "show", year: 2022,
    tags: ["Queer Stories", "Romance", "Emotional"],
    why: "Queer women, baseball, friendship, and finding your people.",
    wiki: "A League of Their Own (2022 TV series)"
  },
  {
    id: "owl-house", title: "The Owl House",
    type: "show", year: 2020,
    tags: ["Queer Stories", "Animation / Anime", "Feel-Good"],
    why: "Magical fantasy with humor and a sweet queer storyline.",
    wiki: "The Owl House"
  },
  {
    id: "she-ra", title: "She-Ra and the Princesses of Power",
    type: "show", year: 2018,
    tags: ["Queer Stories", "Animation / Anime", "Feel-Good"],
    why: "Friendship, big emotions, and an excellent animated adventure.",
    wiki: "She-Ra and the Princesses of Power"
  },
  {
    id: "arcane", title: "Arcane",
    type: "show", year: 2021,
    tags: ["Animation / Anime", "Emotional", "Action & Adventure"],
    why: "Gorgeous animation, complicated women, and huge feelings.",
    wiki: "Arcane (TV series)"
  },
  {
    id: "blue-eye", title: "Blue Eye Samurai",
    type: "show", year: 2023,
    tags: ["Animation / Anime", "Mystery & Thriller", "Action & Adventure"],
    why: "A visually stunning revenge story with a fierce lead.",
    wiki: "Blue Eye Samurai"
  },
  {
    id: "violet", title: "Violet Evergarden",
    type: "show", year: 2018,
    tags: ["Animation / Anime", "Emotional"],
    why: "Beautiful, tearjerking anime about connection and healing.",
    wiki: "Violet Evergarden"
  },
  {
    id: "frieren", title: "Frieren: Beyond Journey's End",
    type: "show", year: 2023,
    tags: ["Animation / Anime", "Emotional", "Feel-Good"],
    why: "Reflective fantasy anime about friendship, memory, and time.",
    wiki: "Frieren"
  },
  {
    id: "derry-girls", title: "Derry Girls",
    type: "show", year: 2018,
    tags: ["Comedy", "Cult Favorite"],
    why: "Chaotic teen friendships with an amazing ensemble.",
    wiki: "Derry Girls"
  },
  {
    id: "bake-off", title: "The Great British Bake Off",
    type: "show", year: 2010,
    tags: ["Reality & Creative", "Feel-Good"],
    why: "Low-stakes competition, cozy vibes, and baking inspiration.",
    wiki: "The Great British Bake Off"
  },
  {
    id: "queer-eye", title: "Queer Eye",
    type: "show", year: 2018,
    tags: ["Reality & Creative", "Feel-Good", "Queer Stories"],
    why: "Style, home transformations, and feel-good moments.",
    wiki: "Queer Eye (2018 TV series)"
  }
];
