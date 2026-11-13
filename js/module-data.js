/* ==============================================================
   MO OS v0.8 | EDIT YOUR STARTER MENUS HERE

   This is the ONE FILE to customize the seven new modules.
   Add, remove, or change objects in each section.
   Icons can be emoji. Optional photo: image: '../images/yourphoto.jpg'

   None of these are live local listings, your actual wardrobe,
   or your real bills. They're editable starting ideas.
============================================================== */

window.MO_MODULE_DATA = {

  // 🚗 GET OUT THE HOUSE: budget = Free / Low / Spend
  // company = Solo / Company / Family / Dog
  outside: [
    {id:'photo-walk', icon:'📷', title:'Take a photo walk', energy:'Medium', budget:'Free', company:['Solo','Company'], search:'scenic photography spots', note:'Pick one color or texture to photograph. No perfect shots required.'},
    {id:'park', icon:'🌳', title:'Find a park trail', energy:'Low', budget:'Free', company:['Solo','Company','Family','Dog'], search:'public parks walking trails', note:'Get some air, walk a little, and head back whenever you want.'},
    {id:'bookstore', icon:'📚', title:'Browse a bookstore', energy:'Low', budget:'Free', company:['Solo','Company','Family'], search:'bookstores', note:'Browse without needing to buy anything.'},
    {id:'coffee', icon:'☕', title:'Coffee or tea date', energy:'Low', budget:'Low', company:['Solo','Company'], search:'coffee shops tea cafes', note:'Bring a book, journal, or just sit and people-watch.'},
    {id:'museum', icon:'🏛️', title:'Museum afternoon', energy:'Medium', budget:'Low', company:['Solo','Company','Family'], search:'museums art museums', note:'Check admission and hours before heading out.'},
    {id:'live-music', icon:'🎷', title:'Find live music', energy:'Medium', budget:'Spend', company:['Solo','Company'], search:'live music venues', note:'Jazz, local bands, or an open mic. Check the event calendar first.'},
    {id:'thrift', icon:'🧥', title:'Thrift-store treasure hunt', energy:'Medium', budget:'Low', company:['Solo','Company'], search:'thrift stores', note:'Find a cool jacket, frame, or home accent. Browsing counts.'},
    {id:'market', icon:'🥬', title:'Visit a farmers market', energy:'Medium', budget:'Low', company:['Solo','Company','Family'], search:'farmers markets', note:'Browse local produce and handmade goods. Verify market dates.'},
    {id:'art-class', icon:'🎨', title:'Try a creative workshop', energy:'High', budget:'Spend', company:['Solo','Company'], search:'pottery art classes workshops', note:'Something hands-on that gets you out of the house.'},
    {id:'arcade', icon:'🕹️', title:'Arcade or game café', energy:'High', budget:'Spend', company:['Solo','Company','Family'], search:'arcades board game cafes', note:'A playful outing with no big itinerary.'},
    {id:'garden', icon:'🌿', title:'Botanical garden stroll', energy:'Medium', budget:'Low', company:['Solo','Company','Family'], search:'botanical gardens', note:'Walk, take pictures, enjoy the plants.'},
    {id:'sunset', icon:'🌇', title:'Chase a good sunset', energy:'Low', budget:'Free', company:['Solo','Company','Dog'], search:'sunset viewpoints scenic overlooks', note:'A tiny outing that still feels special.'},
    {id:'dog-trip', icon:'🐾', title:'Take the dog somewhere new', energy:'Medium', budget:'Free', company:['Solo','Company','Dog'], search:'dog friendly parks trails', note:'Check leash rules and bring water.'},
    {id:'food-adventure', icon:'🥡', title:'Try a new food spot', energy:'Medium', budget:'Spend', company:['Solo','Company','Family'], search:'restaurants', note:'Try a cuisine you rarely order.'},
    {id:'gallery', icon:'🖼️', title:'Gallery or street-art hunt', energy:'Medium', budget:'Free', company:['Solo','Company'], search:'art galleries street art', note:'Make it a mini photography challenge.'}
  ],

  // 📸 CREATIVE ROULETTE: minutes = estimated active time
  creative: [
    {id:'photo-color',icon:'📸',title:'One-color photo challenge',category:'Photography',energy:'Low',minutes:20,prompt:'Choose a color, then capture five different photos featuring it.'},
    {id:'photo-light',icon:'🌤️',title:'Light & shadow hunt',category:'Photography',energy:'Medium',minutes:30,prompt:'Shoot ten photos focusing only on interesting light and shadow.'},
    {id:'photo-story',icon:'📖',title:'A story in three photos',category:'Photography',energy:'Medium',minutes:30,prompt:'Tell a tiny beginning-middle-end story without any captions.'},
    {id:'photo-edit',icon:'🖼️',title:'Re-edit an old photo',category:'Photography',energy:'Low',minutes:15,prompt:'Pick an old favorite and create a totally different edit.'},
    {id:'lego-small',icon:'🧱',title:'Mini LEGO scene',category:'LEGO',energy:'Low',minutes:20,prompt:'Build a tiny scene with only the loose pieces you already have.'},
    {id:'lego-display',icon:'🏗️',title:'Remix your LEGO display',category:'LEGO',energy:'Medium',minutes:30,prompt:'Rearrange one little section of your LEGO collection.'},
    {id:'code-widget',icon:'💻',title:'Build one tiny UI component',category:'Coding',energy:'Medium',minutes:30,prompt:'Code a card, toggle, or animation for MO OS. One feature only.'},
    {id:'code-cleanup',icon:'🧹',title:'Refactor a small function',category:'Coding',energy:'Low',minutes:15,prompt:'Improve names, comments, or clarity in one small function.'},
    {id:'code-experiment',icon:'🧪',title:'Code a playful experiment',category:'Coding',energy:'High',minutes:60,prompt:'Try a small new CSS or JavaScript technique and save the result.'},
    {id:'color',icon:'🖍️',title:'Color for a little while',category:'Art',energy:'Low',minutes:15,prompt:'Pick a coloring page and enjoy the process. No finishing required.'},
    {id:'sketch',icon:'✏️',title:'Draw five imperfect objects',category:'Art',energy:'Low',minutes:15,prompt:'Sketch five things you can see without erasing.'},
    {id:'collage',icon:'📰',title:'Make a mood board',category:'Art',energy:'Medium',minutes:30,prompt:'Create a mini mood board around a color, room, or feeling.'},
    {id:'paper-craft',icon:'✂️',title:'Small craft project',category:'Crafts',energy:'Medium',minutes:30,prompt:'Make one simple paper or recycled-material decoration.'},
    {id:'diy',icon:'🔨',title:'One tiny DIY upgrade',category:'Crafts',energy:'High',minutes:60,prompt:'Improve one small home item using supplies you already own.'},
    {id:'puzzle',icon:'🧩',title:'Puzzle sprint',category:'Puzzles',energy:'Low',minutes:20,prompt:'Do a puzzle for 20 minutes with no need to finish it.'},
    {id:'crossword',icon:'📝',title:'Crossword or word game',category:'Puzzles',energy:'Low',minutes:15,prompt:'Try a few clues just for fun.'},
    {id:'gaming',icon:'🎮',title:'Play one game round',category:'Gaming',energy:'Low',minutes:30,prompt:'Choose something enjoyable and play without making it a task.'},
    {id:'game-quest',icon:'🏆',title:'Make a silly in-game quest',category:'Gaming',energy:'Medium',minutes:30,prompt:'Create one fun self-imposed challenge in a game you already love.'}
  ],

  // ✨ TREAT YOURSELF: budget = Free / Under $15 / Splurge
  treat: [
    {id:'tea',icon:'🫖',title:'Make a fancy drink',budget:'Under $15',minutes:15,detail:'Make a latte, iced tea, cocoa, or special syrup using what you have.'},
    {id:'bath',icon:'🛁',title:'At-home spa hour',budget:'Free',minutes:45,detail:'A shower or bath, comfy clothes, music, and no chores afterward.'},
    {id:'movie',icon:'🍿',title:'Cozy movie night',budget:'Free',minutes:120,detail:'Pick a safe movie, dim the lights, and get the best blanket.'},
    {id:'solo',icon:'🌷',title:'Mini solo date',budget:'Under $15',minutes:60,detail:'Go somewhere easy and make it feel intentional.'},
    {id:'reading',icon:'📚',title:'Reading corner reset',budget:'Free',minutes:30,detail:'Grab a book or audiobook and make a little cozy space.'},
    {id:'dessert',icon:'🍪',title:'Bake a small sweet treat',budget:'Under $15',minutes:60,detail:'Cookies, brownies, or a mug cake. Keep it simple.'},
    {id:'photo',icon:'📷',title:'Take yourself on a photo date',budget:'Free',minutes:60,detail:'Visit an interesting place and photograph whatever catches your eye.'},
    {id:'plant',icon:'🪴',title:'Bring home a little plant',budget:'Under $15',minutes:30,detail:'Only if your space has room for it. Low-maintenance is the goal.'},
    {id:'lego',icon:'🧱',title:'New LEGO build',budget:'Splurge',minutes:120,detail:'Choose a set you actually want and have budgeted for.'},
    {id:'takeout',icon:'🥡',title:'Order your favorite meal',budget:'Splurge',minutes:45,detail:'No cooking, no dishes. Check the budget before placing an order.'},
    {id:'playlist',icon:'🎶',title:'Make a personal playlist',budget:'Free',minutes:30,detail:'Put together songs for one very specific mood.'},
    {id:'sleep',icon:'🛌',title:'A guilt-free early night',budget:'Free',minutes:60,detail:'Put the phone down, get comfortable, and rest.'}
  ],

  // 👟 FIT CHECK: starter outfit formulas, NOT an inventory of your closet.
  // weather refers to how you're dressing, not live weather.
  outfits: [
    {id:'cozy-dark',icon:'🖤',title:'Cozy & put-together',occasion:'Casual',weather:['Cool','Cold'],top:'Black crewneck sweatshirt',bottom:'Charcoal joggers',shoes:'Black sneakers',layer:'Black denim jacket',extras:'Gold chain or black watch',note:'Comfortable, intentional, not sloppy.'},
    {id:'tee-denim',icon:'👖',title:'Classic tee & denim',occasion:'Casual',weather:['Warm','Cool'],top:'White or black tee',bottom:'Dark straight-leg jeans',shoes:'Clean sneakers',layer:'Open overshirt if cool',extras:'Black belt and gold chain',note:'The reliable everyday fit.'},
    {id:'olive',icon:'🫒',title:'Olive & black',occasion:'Casual',weather:['Warm','Cool'],top:'Olive tee or polo',bottom:'Black chinos',shoes:'Black low-top sneakers',layer:'Light jacket if needed',extras:'Matte black watch',note:'Warm, grounded color combo.'},
    {id:'office',icon:'💼',title:'Easy office uniform',occasion:'Work',weather:['Warm','Cool','Cold'],top:'Neutral knit polo or button-down',bottom:'Charcoal tailored trousers',shoes:'Black loafers or clean boots',layer:'Structured cardigan or jacket',extras:'Gold or black accessories',note:'Professional without feeling stiff.'},
    {id:'work-layer',icon:'🧥',title:'Smart layered office fit',occasion:'Work',weather:['Cool','Cold'],top:'Black long-sleeve top',bottom:'Olive or charcoal trousers',shoes:'Black boots',layer:'Cognac or charcoal overshirt',extras:'Simple gold chain',note:'Easy layers for temperature changes.'},
    {id:'dinner-dark',icon:'🍷',title:'Dinner in dark tones',occasion:'Date',weather:['Cool','Cold'],top:'Black fitted knit',bottom:'Black trousers or dark denim',shoes:'Black leather boots',layer:'Tailored dark jacket',extras:'Gold chain or ring',note:'Low-key, sharp, and a little dressed up.'},
    {id:'dinner-warm',icon:'🤎',title:'Warm-tone date fit',occasion:'Date',weather:['Warm','Cool'],top:'Cream or tan knit polo',bottom:'Dark jeans',shoes:'Brown or black loafers',layer:'Cognac jacket if needed',extras:'Gold watch',note:'Soft color contrast, still masculine.'},
    {id:'game-day',icon:'🦅',title:'Game-day layers',occasion:'Game Day',weather:['Cool','Cold'],top:'Eagles tee or jersey',bottom:'Black or dark jeans',shoes:'Black boots or sneakers',layer:'Team jacket or hoodie',extras:'Black cap',note:'Comfort first when the game gets long.'},
    {id:'game-day-warm',icon:'🏈',title:'Warm-weather game day',occasion:'Game Day',weather:['Warm'],top:'Eagles tee',bottom:'Black shorts or jeans',shoes:'Sneakers',layer:'None',extras:'Black cap',note:'Easy tailgate outfit.'},
    {id:'dressy',icon:'✨',title:'Clean & elevated',occasion:'Dressy',weather:['Warm','Cool','Cold'],top:'Crisp black button-down',bottom:'Tailored black trousers',shoes:'Leather loafers or dress boots',layer:'Dark blazer if needed',extras:'Gold watch',note:'Sharp without over-accessorizing.'},
    {id:'summer',icon:'☀️',title:'Summer neutral',occasion:'Casual',weather:['Warm'],top:'Cream or white short-sleeve shirt',bottom:'Olive or black shorts',shoes:'Low-profile sneakers',layer:'None',extras:'Gold chain',note:'Lightweight and uncomplicated.'},
    {id:'errands',icon:'🚗',title:'Errands, but make it a fit',occasion:'Casual',weather:['Warm','Cool','Cold'],top:'Graphic tee',bottom:'Black relaxed jeans',shoes:'Sneakers',layer:'Oversized flannel or hoodie',extras:'Black cap',note:'Something quick that still looks like you.'}
  ],

  // 🧹 RESET MY SPACE: these lists are editable.
  cleaning: {
    daily: ['Make bed / straighten sleep space','Clear dishes or load sink','Wipe one kitchen surface','Quick trash check','Five-minute pickup','Set out tomorrow essentials'],
    rooms: {
      'Bedroom':['Put away stray clothes','Clear nightstand','Wipe visible surfaces','Vacuum or sweep','Change bedding'],
      'Bathroom':['Wipe sink and mirror','Clean toilet','Refresh towels','Empty trash','Sweep floor'],
      'Kitchen':['Clear counters','Wash or load dishes','Wipe stove','Check fridge for old food','Sweep floor'],
      'Living Room':['Reset blankets and pillows','Put away loose items','Dust one surface','Vacuum','Tidy LEGO/display area'],
      'Dining Room':['Clear dining table','Wipe seating','Pick up floor items','Sweep or vacuum'],
      'Foyer':['Put shoes away','Hang coats and bags','Wipe entry surface','Sweep'],
      'Office / Desk':['Clear desktop','Sort loose notes','Put supplies away','Wipe workspace'],
      'Basement':['Clear a walking path','Sort one small pile','Put tools away','Sweep one section'],
      'Laundry':['Start one load','Switch laundry','Fold one batch','Put one batch away']
    }
  },

  // 🧠 THE DAILY RESET: quick next-step suggestions.
  reset: [
    {id:'water',energy:'Low',focus:'Self',minutes:2,title:'Water + window',detail:'Get a drink of water and look outside for a minute.'},
    {id:'stretch',energy:'Low',focus:'Self',minutes:5,title:'Gentle stretch',detail:'Move a little in a way that feels comfortable.'},
    {id:'rest',energy:'Low',focus:'Rest',minutes:5,title:'Five minutes off duty',detail:'Sit somewhere comfortable. Nothing to accomplish.'},
    {id:'lights',energy:'Low',focus:'Rest',minutes:10,title:'Change the atmosphere',detail:'Dim the lights, get comfy, and put on a familiar song.'},
    {id:'bed',energy:'Low',focus:'Home',minutes:5,title:'Reset one surface',detail:'Pick one surface and remove only what does not belong.'},
    {id:'dish',energy:'Low',focus:'Home',minutes:10,title:'Do a few dishes',detail:'Set a ten-minute limit. Stop when it is up.'},
    {id:'message',energy:'Low',focus:'Life',minutes:5,title:'Reply to one message',detail:'Choose the easiest outstanding message and answer it.'},
    {id:'list',energy:'Low',focus:'Life',minutes:10,title:'Write a three-item list',detail:'Capture three things on your mind. You do not need to do them now.'},
    {id:'puzzle',energy:'Low',focus:'Fun',minutes:10,title:'Puzzle break',detail:'Play with a puzzle or coloring page for a few minutes.'},
    {id:'song',energy:'Low',focus:'Fun',minutes:5,title:'One-song reset',detail:'Play one favorite song, with no phone scrolling.'},
    {id:'room',energy:'Medium',focus:'Home',minutes:15,title:'Quick room sweep',detail:'Pick up visible items in one room for 15 minutes.'},
    {id:'laundry',energy:'Medium',focus:'Home',minutes:15,title:'Handle one laundry stage',detail:'Start, switch, fold, or put away. Only one stage.'},
    {id:'calendar',energy:'Medium',focus:'Life',minutes:15,title:'Check the next seven days',detail:'Open your calendar and identify one thing to prepare for.'},
    {id:'admin',energy:'Medium',focus:'Life',minutes:15,title:'One admin task',detail:'Complete one short errand, form, or reminder.'},
    {id:'lego',energy:'Medium',focus:'Fun',minutes:15,title:'Mini build',detail:'Make a small LEGO scene or reorganize some pieces.'},
    {id:'photo',energy:'Medium',focus:'Fun',minutes:15,title:'Photo editing break',detail:'Find one photo and give it a fresh edit.'},
    {id:'walk',energy:'Medium',focus:'Self',minutes:15,title:'Take a short walk',detail:'Go outside for a short walk if that feels good today.'},
    {id:'routine',energy:'Medium',focus:'Self',minutes:15,title:'Check your basics',detail:'Look at food, water, rest, and the next obligation.'},
    {id:'deep-clean',energy:'High',focus:'Home',minutes:30,title:'Reset one whole zone',detail:'Choose one area, gather supplies, and give it a focused half-hour.'},
    {id:'plan',energy:'High',focus:'Life',minutes:30,title:'Plan the next week',detail:'Review obligations, pick priorities, and leave breathing room.'},
    {id:'project',energy:'High',focus:'Fun',minutes:30,title:'Make something',detail:'Open a coding, art, or photography project and build for 30 minutes.'},
    {id:'outside',energy:'High',focus:'Self',minutes:30,title:'Get some fresh air',detail:'Take an easy outing or walk, weather permitting.'},
    {id:'bed-rest',energy:'Medium',focus:'Rest',minutes:15,title:'Set up a restful space',detail:'Make the room comfortable and put away distractions.'}
  ],

  // 📋 HANDLE YOUR BUSINESS: suggested labels only, not actual bills.
  // Added tasks are stored ON THIS DEVICE, not in GitHub.
  adminQuickAdds: [
    {title:'Review upcoming bills',category:'Money'},
    {title:'Sort mail and paperwork',category:'Paperwork'},
    {title:'Check next week’s calendar',category:'Scheduling'},
    {title:'Follow up on an open task',category:'Follow-up'},
    {title:'Check home maintenance list',category:'Home'}
  ]
};
