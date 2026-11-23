/*
 * Undertow prompt bank.
 *
 * Each prompt is written with the P() helper below, which expands it into the
 * plain data shape the game uses:
 *
 *   { id, prompt, category, strip, lengthRule, reject: [{words, message}],
 *     answers: [{ text, tier, aliases, note }] }
 *
 * Writing answers: "Canonical Text|alias one|alias two". Aliases are matched
 * after normalization (lowercase, no accents, no punctuation, no leading "the").
 * Tiers: common (10) · uncommon (35) · rare (60) · deep (85) · legendary (100).
 *
 * strip:      trailing words removed from both the player's input and every answer
 *             before comparing (e.g. "cheese" so "blue cheese" == "blue").
 * reject:     friendly messages for near-misses that are wrong on purpose.
 * lengthRule: the answer must have exactly this many letters.
 *
 * Plain JS (not JSON) so the game runs straight from index.html with no server.
 */
(function (UT) {
  'use strict';
  var TIERS = ['common', 'uncommon', 'rare', 'deep', 'legendary'];
  var list = [];

  function P(def) {
    var answers = [];
    TIERS.forEach(function (tier) {
      (def[tier] || []).forEach(function (entry) {
        var parts = entry.split('|');
        var a = { text: parts[0], tier: tier, aliases: parts.slice(1) };
        if (def.notes && def.notes[parts[0]]) a.note = def.notes[parts[0]];
        answers.push(a);
      });
    });
    list.push({
      id: def.id,
      prompt: def.prompt,
      category: def.category,
      strip: def.strip || [],
      lengthRule: def.lengthRule || 0,
      reject: (def.reject || []).map(function (r) { return { words: r[0].split('|'), message: r[1] }; }),
      answers: answers,
      _notes: def.notes || {}
    });
  }

  /* ------------------------------------------------------------ GEOGRAPHY */

  P({
    id: 'us-states-canada', category: 'Geography',
    prompt: 'Name a U.S. state that borders Canada',
    common: ['Washington|wa|washington state', 'Montana|mt', 'New York|ny|new york state', 'Michigan|mi', 'Maine|me'],
    uncommon: ['Alaska|ak', 'Minnesota|mn', 'North Dakota|nd'],
    rare: ['Vermont|vt', 'Idaho|id'],
    deep: ['New Hampshire|nh'],
    legendary: ['Ohio|oh', 'Pennsylvania|pa'],
    notes: {
      'Ohio': 'Its border with Ontario runs through the middle of Lake Erie.',
      'Pennsylvania': 'It touches Canada only across the waters of Lake Erie.',
      'Idaho': 'Its narrow panhandle reaches all the way up to British Columbia.',
      'New Hampshire': 'Its northern tip borders Quebec for about 58 miles.'
    },
    reject: [['washington dc|dc|district of columbia', 'Washington, D.C. is far from Canada. Washington State works, though!']]
  });

  P({
    id: 'countries-m', category: 'Geography',
    prompt: 'Name a country whose name begins with the letter M',
    common: ['Mexico', 'Morocco'],
    uncommon: ['Madagascar', 'Malaysia', 'Mongolia'],
    rare: ['Malta', 'Mali', 'Monaco', 'Mozambique', 'Myanmar|burma'],
    deep: ['Malawi', 'Maldives', 'Mauritius', 'Montenegro', 'Moldova', 'Mauritania'],
    legendary: ['Marshall Islands', 'Micronesia|federated states of micronesia'],
    notes: {
      'Micronesia': 'Made up of more than 600 islands spread across the western Pacific.',
      'Marshall Islands': 'Its 29 coral atolls sit, on average, about 2 meters above sea level.',
      'Monaco': 'The second-smallest country in the world, after Vatican City.'
    },
    reject: [['macedonia', 'Its official name is now North Macedonia, so it starts with N.']]
  });

  P({
    id: 'south-america', category: 'Geography',
    prompt: 'Name a country in South America',
    common: ['Brazil|brasil', 'Argentina', 'Peru', 'Colombia|columbia'],
    uncommon: ['Chile', 'Venezuela', 'Ecuador', 'Bolivia'],
    rare: ['Uruguay', 'Paraguay'],
    deep: ['Guyana'],
    legendary: ['Suriname|surinam'],
    notes: {
      'Suriname': 'The smallest country in South America, where Dutch is the official language.',
      'Guyana': 'The only South American country with English as its official language.',
      'Bolivia': 'Has two capitals: Sucre and La Paz.'
    },
    reject: [
      ['french guiana', 'French Guiana is part of France, not its own country.'],
      ['panama|costa rica|mexico|cuba', 'Close, but that country is not in South America.']
    ]
  });

  P({
    id: 'state-capitals', category: 'Geography',
    prompt: 'Name a U.S. state capital',
    common: ['Austin', 'Boston', 'Atlanta', 'Denver', 'Phoenix', 'Nashville', 'Sacramento', 'Honolulu'],
    uncommon: ['Tallahassee', 'Albany', 'Salt Lake City|salt lake', 'Indianapolis', 'Columbus', 'Richmond', 'Raleigh', 'Oklahoma City|okc', 'Little Rock', 'Baton Rouge', 'Providence', 'Hartford', 'Springfield', 'Madison'],
    rare: ['Saint Paul|st paul', 'Lansing', 'Harrisburg', 'Annapolis', 'Trenton', 'Olympia', 'Santa Fe', 'Carson City', 'Juneau', 'Boise', 'Des Moines', 'Montgomery', 'Columbia', 'Charleston', 'Jackson', 'Lincoln', 'Topeka', 'Salem', 'Dover'],
    deep: ['Frankfort', 'Concord', 'Cheyenne', 'Helena', 'Bismarck', 'Jefferson City'],
    legendary: ['Pierre', 'Montpelier', 'Augusta'],
    notes: {
      'Pierre': 'Capital of South Dakota. Locals say it like "peer."',
      'Montpelier': 'Vermont’s capital is the least populous state capital in the U.S.',
      'Augusta': 'Augusta, Maine. Not Augusta, Georgia!',
      'Juneau': 'Alaska’s capital has no road connection to the rest of North America.'
    },
    reject: [
      ['new york city|nyc', 'New York’s capital is Albany.'],
      ['los angeles|san francisco|la', 'California’s capital is Sacramento.'],
      ['chicago', 'Illinois’s capital is Springfield.'],
      ['miami|orlando|jacksonville|tampa', 'Florida’s capital is Tallahassee.'],
      ['washington dc|dc|washington', 'Washington, D.C. is the national capital, not a state capital.']
    ]
  });

  P({
    id: 'africa', category: 'Geography',
    prompt: 'Name a country in Africa',
    common: ['Egypt', 'South Africa', 'Nigeria', 'Kenya', 'Morocco', 'Ethiopia'],
    uncommon: ['Ghana', 'Madagascar', 'Somalia', 'Sudan', 'Algeria', 'Libya', 'Tanzania', 'Zimbabwe', 'Uganda', 'Rwanda', 'Democratic Republic of the Congo|drc|dr congo|democratic republic of congo|congo kinshasa|zaire', 'Tunisia', 'Senegal', 'Mali', 'Cameroon', 'Angola'],
    rare: ['Namibia', 'Botswana', 'Zambia', 'Mozambique', 'Ivory Coast|cote divoire|cote d ivoire', 'Niger', 'Chad', 'Liberia', 'Sierra Leone', 'Malawi', 'South Sudan', 'Eritrea', 'Republic of the Congo|congo|congo brazzaville|republic of congo', 'Burkina Faso', 'Mauritania', 'Gabon', 'Togo', 'Benin', 'Guinea', 'Gambia', 'Lesotho'],
    deep: ['Burundi', 'Djibouti', 'Central African Republic', 'Equatorial Guinea', 'Guinea-Bissau|guinea bissau', 'Eswatini|swaziland', 'Mauritius', 'Seychelles', 'Cape Verde|cabo verde', 'Comoros'],
    legendary: ['São Tomé and Príncipe|sao tome|sao tome and principe'],
    notes: {
      'São Tomé and Príncipe': 'Africa’s second-smallest country, two islands sitting almost on the equator.',
      'Lesotho': 'Completely surrounded by South Africa.',
      'Seychelles': 'Africa’s smallest country by population.'
    },
    reject: [['western sahara', 'Western Sahara is a disputed territory, not a UN member state.']]
  });

  P({
    id: 'borders-germany', category: 'Geography',
    prompt: 'Name a country that shares a land border with Germany',
    common: ['France', 'Poland', 'Austria'],
    uncommon: ['Switzerland', 'Netherlands|holland'],
    rare: ['Belgium', 'Czech Republic|czechia'],
    deep: ['Denmark'],
    legendary: ['Luxembourg'],
    notes: {
      'Denmark': 'Germany’s only neighbor to the north.',
      'Luxembourg': 'Germany’s shortest border with any neighbor except Denmark.'
    },
    reject: [
      ['italy', 'Close! Austria and Switzerland sit in between.'],
      ['hungary|russia|slovakia|slovenia|liechtenstein', 'Close, but that country does not touch Germany.']
    ]
  });

  P({
    id: 'borders-china', category: 'Geography',
    prompt: 'Name a country that shares a land border with China',
    common: ['Russia', 'India', 'Mongolia'],
    uncommon: ['North Korea', 'Vietnam|viet nam', 'Nepal', 'Pakistan'],
    rare: ['Laos', 'Myanmar|burma', 'Kazakhstan', 'Bhutan'],
    deep: ['Kyrgyzstan', 'Tajikistan'],
    legendary: ['Afghanistan'],
    notes: {
      'Afghanistan': 'The border is a 47-mile strip at the end of the narrow Wakhan Corridor.',
      'Russia': 'China and Russia are tied for the most neighbors: 14 each.'
    },
    reject: [
      ['south korea', 'South Korea does not border China. North Korea does!'],
      ['korea', 'Which Korea? Only one of them borders China.'],
      ['japan|taiwan|philippines', 'Separated from mainland China by sea, so no land border.'],
      ['thailand|cambodia', 'Close, but Laos and Myanmar sit in between.']
    ]
  });

  P({
    id: 'caribbean', category: 'Geography',
    prompt: 'Name an independent country in the Caribbean',
    common: ['Jamaica', 'Cuba', 'Bahamas'],
    uncommon: ['Haiti', 'Dominican Republic', 'Barbados', 'Trinidad and Tobago|trinidad|tobago'],
    rare: ['Antigua and Barbuda|antigua|barbuda', 'Grenada', 'Saint Lucia|st lucia'],
    deep: ['Dominica', 'Saint Kitts and Nevis|st kitts and nevis|st kitts|saint kitts|nevis|saint kitts nevis'],
    legendary: ['Saint Vincent and the Grenadines|st vincent and the grenadines|st vincent|saint vincent|grenadines'],
    notes: {
      'Dominica': 'A separate island nation from the Dominican Republic, known for its boiling lake.',
      'Saint Kitts and Nevis': 'The smallest country in the Americas.',
      'Saint Vincent and the Grenadines': 'A chain of 32 islands and cays.'
    },
    reject: [
      ['puerto rico', 'Puerto Rico is a U.S. territory, not an independent country.'],
      ['aruba|curacao|cayman islands|bermuda|virgin islands|us virgin islands|british virgin islands|turks and caicos|martinique|guadeloupe|anguilla|montserrat|sint maarten|saint martin', 'That is a territory, not an independent country.']
    ]
  });

  P({
    id: 'euro', category: 'Geography',
    prompt: 'Name a country that uses the euro as its official currency',
    common: ['France', 'Germany', 'Italy', 'Spain'],
    uncommon: ['Netherlands|holland', 'Belgium', 'Portugal', 'Greece', 'Ireland', 'Austria'],
    rare: ['Finland', 'Luxembourg', 'Croatia', 'Slovakia', 'Slovenia', 'Malta'],
    deep: ['Estonia', 'Latvia', 'Lithuania', 'Cyprus', 'Bulgaria', 'Monaco'],
    legendary: ['Montenegro', 'Kosovo', 'San Marino', 'Vatican City|vatican|holy see', 'Andorra'],
    notes: {
      'Croatia': 'Switched from the kuna to the euro in 2023.',
      'Bulgaria': 'The newest euro country, switching on January 1, 2026.',
      'Montenegro': 'Uses the euro even though it is not in the European Union.',
      'Kosovo': 'Uses the euro without being an EU member.'
    },
    reject: [
      ['united kingdom|uk|england|britain|great britain|scotland|wales', 'The UK uses the pound sterling.'],
      ['switzerland|liechtenstein', 'Switzerland and Liechtenstein use the Swiss franc.'],
      ['denmark', 'Denmark kept its krone.'],
      ['sweden', 'Sweden uses the krona.'],
      ['norway|iceland', 'They use their own króna or krone.'],
      ['poland|czech republic|czechia|hungary|romania', 'That EU country still uses its own currency.']
    ]
  });

  P({
    id: 'seas', category: 'Geography',
    prompt: 'Name an ocean or a sea',
    strip: ['sea', 'ocean'],
    common: ['Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Mediterranean Sea'],
    uncommon: ['Southern Ocean|antarctic ocean', 'Caribbean Sea', 'Red Sea', 'Dead Sea', 'Black Sea', 'Caspian Sea', 'North Sea', 'Baltic Sea'],
    rare: ['Arabian Sea', 'South China Sea', 'Bering Sea', 'Coral Sea', 'Sargasso Sea', 'Aegean Sea', 'Adriatic Sea', 'Sea of Japan|east sea|japan sea', 'Yellow Sea', 'Irish Sea', 'Tasman Sea', 'Philippine Sea', 'Labrador Sea', 'Norwegian Sea', 'East China Sea', 'Salish Sea'],
    deep: ['Barents Sea', 'Ross Sea', 'Weddell Sea', 'Beaufort Sea', 'Ionian Sea', 'Tyrrhenian Sea', 'Sea of Okhotsk|okhotsk', 'Andaman Sea', 'Java Sea', 'Celebes Sea', 'Sulu Sea', 'Banda Sea', 'Timor Sea', 'Arafura Sea', 'Greenland Sea', 'Chukchi Sea', 'White Sea', 'Kara Sea', 'Laptev Sea', 'Sea of Azov|azov', 'Sea of Marmara|marmara', 'Ligurian Sea', 'Balearic Sea', 'Scotia Sea', 'Bismarck Sea', 'Solomon Sea', 'Aral Sea'],
    legendary: ['East Siberian Sea', 'Alboran Sea', 'Bellingshausen Sea', 'Amundsen Sea', 'Lincoln Sea', 'Wandel Sea', 'Wadden Sea', 'Sea of the Hebrides|hebrides', 'Molucca Sea', 'Flores Sea', 'Savu Sea', 'Bohol Sea|mindanao sea', 'Sibuyan Sea', 'Sea of Crete|cretan sea', 'Libyan Sea', 'Levantine Sea', 'Seto Inland Sea|inland sea', 'Pechora Sea', 'Riiser-Larsen Sea|riiser larsen'],
    notes: {
      'Sargasso Sea': 'The only sea with no coastline. Ocean currents form its edges.',
      'Caspian Sea': 'Despite the name, it is the largest lake on Earth.',
      'Dead Sea': 'A salt lake almost ten times saltier than the ocean.',
      'Southern Ocean': 'National Geographic began recognizing it as the fifth ocean in 2021.',
      'Salish Sea': 'Named in 2009 for the connected waters around Seattle and Vancouver.',
      'Wadden Sea': 'The largest unbroken system of tidal flats in the world.'
    }
  });

  P({
    id: 'national-parks', category: 'Geography',
    prompt: 'Name a U.S. national park',
    strip: ['national park', 'national parks', 'np'],
    common: ['Yellowstone', 'Yosemite', 'Grand Canyon', 'Zion', 'Everglades', 'Great Smoky Mountains|smoky mountains|smokies|great smokies|smoky mountain'],
    uncommon: ['Glacier', 'Rocky Mountain|rocky mountains|rockies', 'Acadia', 'Arches', 'Grand Teton|grand tetons|tetons', 'Bryce Canyon|bryce', 'Joshua Tree', 'Death Valley', 'Olympic', 'Mount Rainier|mt rainier|rainier', 'Denali', 'Sequoia', 'Redwood|redwoods'],
    rare: ['Shenandoah', 'Badlands', 'Mammoth Cave', 'Hawaii Volcanoes|volcanoes', 'Haleakalā|haleakala', 'Canyonlands', 'Capitol Reef', 'Crater Lake', 'Big Bend', 'Carlsbad Caverns', 'Mesa Verde', 'Petrified Forest', 'Saguaro', 'White Sands', 'Kings Canyon', 'Hot Springs', 'Biscayne', 'Dry Tortugas', 'Glacier Bay', 'Gateway Arch', 'Indiana Dunes'],
    deep: ['Wind Cave', 'Theodore Roosevelt', 'Voyageurs', 'Isle Royale', 'Cuyahoga Valley', 'New River Gorge', 'Congaree', 'Channel Islands', 'Pinnacles', 'Lassen Volcanic|lassen', 'North Cascades', 'Great Basin', 'Great Sand Dunes', 'Black Canyon of the Gunnison|black canyon', 'Guadalupe Mountains', 'Katmai', 'Kenai Fjords'],
    legendary: ['Virgin Islands', 'American Samoa|national park of american samoa', 'Wrangell–St. Elias|wrangell st elias|wrangell saint elias|wrangell', 'Gates of the Arctic', 'Kobuk Valley', 'Lake Clark'],
    notes: {
      'Gates of the Arctic': 'The least visited national park. It has no roads or trails.',
      'Kobuk Valley': 'Has rolling sand dunes north of the Arctic Circle.',
      'Mammoth Cave': 'The longest known cave system on Earth.',
      'Death Valley': 'Recorded the hottest air temperature on Earth: 134°F in 1913.',
      'Wrangell–St. Elias': 'The largest U.S. national park, bigger than Switzerland.',
      'Dry Tortugas': 'About 99% water, reachable only by boat or seaplane.'
    },
    reject: [['mount rushmore|statue of liberty|niagara falls|lake tahoe|devils tower|golden gate', 'A famous landmark, but not one of the 63 national parks.']]
  });

  P({
    id: 'ancient-wonders', category: 'History',
    prompt: 'Name one of the Seven Wonders of the Ancient World',
    common: ['Great Pyramid of Giza|pyramids|pyramid|great pyramid|pyramids of giza|pyramid of giza|egyptian pyramids'],
    uncommon: ['Hanging Gardens of Babylon|hanging gardens', 'Colossus of Rhodes|colossus'],
    rare: ['Lighthouse of Alexandria|pharos|pharos of alexandria|lighthouse', 'Statue of Zeus at Olympia|statue of zeus'],
    deep: ['Temple of Artemis at Ephesus|temple of artemis'],
    legendary: ['Mausoleum at Halicarnassus|mausoleum of halicarnassus|mausoleum|tomb of mausolus'],
    notes: {
      'Great Pyramid of Giza': 'The oldest of the seven, and the only one still standing.',
      'Mausoleum at Halicarnassus': 'The word "mausoleum" comes from King Mausolus, who was buried there.',
      'Hanging Gardens of Babylon': 'No one has found proof of exactly where they stood.',
      'Lighthouse of Alexandria': 'Stood for over 1,500 years before earthquakes toppled it.'
    },
    reject: [
      ['great wall|great wall of china|machu picchu|colosseum|taj mahal|petra|chichen itza|christ the redeemer', 'That is one of the New Seven Wonders, not the ancient list.'],
      ['stonehenge|sphinx|great sphinx|parthenon', 'Ancient, but not on the classical list of seven.']
    ]
  });

  P({
    id: 'presidents', category: 'History',
    prompt: 'Name a U.S. president',
    common: ['George Washington|washington', 'Abraham Lincoln|lincoln|abe lincoln', 'Barack Obama|obama', 'Donald Trump|trump', 'Joe Biden|biden|joseph biden', 'John F. Kennedy|kennedy|jfk|john kennedy', 'Thomas Jefferson|jefferson'],
    uncommon: ['Franklin D. Roosevelt|fdr|franklin roosevelt|franklin delano roosevelt', 'Theodore Roosevelt|teddy roosevelt|teddy|theodore roosevelt', 'Ronald Reagan|reagan', 'Bill Clinton|clinton|william clinton', 'George W. Bush|george w bush|w bush|dubya|bush jr|bush junior', 'Richard Nixon|nixon', 'Jimmy Carter|carter', 'Harry S. Truman|truman|harry truman', 'Dwight D. Eisenhower|eisenhower|ike|dwight eisenhower', 'Ulysses S. Grant|grant|ulysses grant'],
    rare: ['George H. W. Bush|george hw bush|hw bush|bush sr|bush senior|george bush sr', 'Lyndon B. Johnson|lbj|lyndon johnson', 'Gerald Ford|ford', 'James Madison|madison', 'James Monroe|monroe', 'Andrew Jackson|jackson', 'John Adams', 'Woodrow Wilson|wilson', 'Herbert Hoover|hoover', 'Calvin Coolidge|coolidge', 'William Howard Taft|taft|william taft', 'John Quincy Adams|jqa|quincy adams', 'William McKinley|mckinley', 'James K. Polk|polk|james polk'],
    deep: ['Andrew Johnson', 'Martin Van Buren|van buren', 'William Henry Harrison|william harrison', 'Zachary Taylor|taylor', 'Grover Cleveland|cleveland', 'Warren G. Harding|harding|warren harding', 'James Garfield|garfield', 'James Buchanan|buchanan', 'John Tyler|tyler'],
    legendary: ['Chester A. Arthur|chester arthur|arthur', 'Millard Fillmore|fillmore', 'Franklin Pierce|pierce', 'Benjamin Harrison', 'Rutherford B. Hayes|hayes|rutherford hayes'],
    notes: {
      'William Henry Harrison': 'Served just 31 days, the shortest presidency.',
      'Grover Cleveland': 'Served two non-consecutive terms, like Donald Trump later did.',
      'Chester A. Arthur': 'Became president after James Garfield was assassinated in 1881.',
      'Millard Fillmore': 'The last president who was neither a Democrat nor a Republican.'
    },
    reject: [
      ['roosevelt', 'Which Roosevelt? Add a first name: Theodore or Franklin.'],
      ['bush|george bush', 'Which Bush? Try George W. Bush or George H. W. Bush.'],
      ['johnson', 'Which Johnson? Try Andrew Johnson or Lyndon B. Johnson.'],
      ['adams', 'Which Adams? Try John Adams or John Quincy Adams.'],
      ['harrison', 'Which Harrison? Try William Henry Harrison or Benjamin Harrison.'],
      ['benjamin franklin|ben franklin|franklin|alexander hamilton|hamilton', 'A Founding Father, but never president.']
    ]
  });

  P({
    id: 'summer-olympics', category: 'Sports',
    prompt: 'Name a sport or event at the Paris 2024 Summer Olympics',
    common: ['Swimming', 'Gymnastics', 'Basketball', 'Soccer|football', 'Track and field|athletics|track|running', 'Volleyball', 'Tennis'],
    uncommon: ['Boxing', 'Diving', 'Cycling', 'Wrestling', 'Fencing', 'Archery', 'Rowing', 'Judo', 'Beach volleyball', 'Weightlifting', 'Golf', 'Skateboarding', 'Surfing', 'Water polo', 'Equestrian|horse riding|show jumping|dressage|eventing', 'Table tennis|ping pong', 'Badminton', 'Marathon'],
    rare: ['Handball', 'Field hockey|hockey', 'Taekwondo|tae kwon do', 'Sailing', 'Canoeing|kayaking|canoe|kayak|canoe sprint', 'Shooting', 'Triathlon', 'Rugby sevens|rugby', 'Sport climbing|climbing|rock climbing', 'BMX|bmx racing|bmx freestyle', 'Trampoline', 'Long jump', 'High jump', 'Pole vault', 'Hurdles', 'Relay|relays'],
    deep: ['Breaking|breakdancing|break dancing', 'Modern pentathlon|pentathlon', 'Artistic swimming|synchronized swimming|synchronised swimming', 'Rhythmic gymnastics', 'Mountain biking|mountain bike', 'Marathon swimming|open water swimming', 'Kite foiling|kitesurfing|kiteboarding|formula kite', 'Javelin|javelin throw', 'Shot put', 'Discus|discus throw', 'Triple jump', 'Decathlon', 'Heptathlon'],
    legendary: ['Canoe slalom|kayak cross', 'Keirin', 'Madison', 'Omnium', 'Steeplechase', 'Race walking|racewalking|race walk', 'Skeet|trap shooting|trap', 'Hammer throw|hammer'],
    notes: {
      'Breaking': 'Debuted in Paris, but it is not on the program for LA 2028.',
      'Keirin': 'A track cycling race that started in Japan, where riders follow a motorbike before the sprint.',
      'Madison': 'A track cycling relay named after Madison Square Garden.',
      'Kite foiling': 'Made its Olympic debut in Paris, as part of sailing.'
    },
    reject: [
      ['baseball|softball|flag football|lacrosse|cricket|squash', 'Not at Paris 2024. It is on the program for LA 2028.'],
      ['karate', 'Karate was at Tokyo 2020 but not Paris 2024.'],
      ['ice hockey|figure skating|skiing|snowboarding|curling|bobsled|luge|speed skating', 'That is a Winter Olympics sport.']
    ]
  });

  P({
    id: 'winter-olympics', category: 'Sports',
    prompt: 'Name a Winter Olympics sport or event',
    common: ['Skiing|alpine skiing|downhill|downhill skiing', 'Figure skating|ice skating|skating', 'Ice hockey|hockey', 'Snowboarding'],
    uncommon: ['Speed skating', 'Bobsled|bobsleigh', 'Curling', 'Luge'],
    rare: ['Ski jumping', 'Cross-country skiing|cross country skiing|nordic skiing|cross country', 'Biathlon', 'Skeleton', 'Short track|short track speed skating', 'Freestyle skiing', 'Halfpipe|half pipe'],
    deep: ['Nordic combined', 'Moguls', 'Slalom|giant slalom', 'Super-G|super g', 'Slopestyle', 'Big air', 'Aerials', 'Ski cross', 'Snowboard cross|boardercross', 'Ice dance|ice dancing', 'Pairs skating|pairs'],
    legendary: ['Ski mountaineering|skimo', 'Monobob', 'Team pursuit', 'Mass start', 'Parallel giant slalom', 'Dual moguls'],
    notes: {
      'Ski mountaineering': 'Made its Olympic debut at Milan Cortina 2026.',
      'Skeleton': 'Riders slide headfirst and face down at over 80 mph.',
      'Biathlon': 'Combines cross-country skiing with rifle shooting.',
      'Monobob': 'A one-person bobsled event, added in 2022.'
    },
    reject: [['swimming|basketball|gymnastics|soccer|tennis|surfing', 'That is a Summer Olympics sport.']]
  });

  P({
    id: 'card-games', category: 'Games',
    prompt: 'Name a card game played with a standard deck or its own cards',
    common: ['Poker|texas holdem|holdem', 'Solitaire|klondike', 'Go Fish', 'Blackjack|twenty one|21', 'Uno', 'War'],
    uncommon: ['Rummy', 'Crazy Eights|crazy 8s|crazy 8', 'Old Maid', 'Hearts', 'Spades', 'Gin Rummy|gin', 'Bridge', 'Slapjack', 'Speed|spit', 'Phase 10|phase ten'],
    rare: ['Euchre', 'Cribbage', 'Canasta', 'Pinochle', 'Baccarat', 'Egyptian Ratscrew|egyptian rat screw|egyptian ratslap', 'President|scum', 'Cheat|i doubt it|bs', 'Spoons', 'Concentration|memory', 'Kings in the Corner|kings corner', 'Garbage|trash', 'Nertz', 'Spider Solitaire|spider', 'FreeCell|free cell', 'Skip-Bo|skip bo', 'Exploding Kittens'],
    deep: ['Whist', 'Pitch|setback', 'Skat', 'Durak', 'Belote', 'Sheepshead|schafkopf', 'Oh Hell|oh heck|up and down the river', 'Rook', 'Pounce', 'Mau-Mau|mau mau', 'Scopa', 'Briscola', 'Tarot|french tarot|tarocchi', 'Hand and Foot', 'Cassino|casino'],
    legendary: ['Bezique', 'Piquet', 'Klaverjas', 'Jass', 'Tichu', 'Écarté|ecarte', 'Faro', 'Mus', 'Truco', 'Sueca', 'Doppelkopf', 'Hanafuda', 'Big Two|deuces|choi dai di', 'Tiến lên|tien len'],
    notes: {
      'Faro': 'The most popular gambling game of the American Old West.',
      'Hanafuda': 'Japanese flower cards, the first thing Nintendo ever made (in 1889).',
      'Cribbage': 'Scored by moving pegs along a wooden board.',
      'Mus': 'A Basque game where partners signal their hands with secret facial gestures.'
    }
  });

  /* -------------------------------------------------------------- SCIENCE */

  P({
    id: 'single-letter-elements', category: 'Science',
    prompt: 'Name a chemical element whose symbol is a single letter',
    common: ['Hydrogen|h', 'Oxygen|o', 'Carbon|c', 'Nitrogen|n'],
    uncommon: ['Sulfur|s|sulphur', 'Potassium|k', 'Iodine|i', 'Phosphorus|p|phosphorous'],
    rare: ['Fluorine|f|flourine', 'Uranium|u'],
    deep: ['Boron|b', 'Tungsten|w|wolfram'],
    legendary: ['Vanadium|v', 'Yttrium|y'],
    notes: {
      'Potassium': 'K comes from kalium, its Latin name.',
      'Tungsten': 'W stands for wolfram, its other name.',
      'Yttrium': 'Named after Ytterby, a Swedish village that gave its name to three other elements too.',
      'Vanadium': 'Named after Vanadís, a Norse goddess of beauty.'
    }
  });

  P({
    id: 'noble-gases', category: 'Science',
    prompt: 'Name a noble gas',
    common: ['Helium', 'Neon'],
    uncommon: ['Argon'],
    rare: ['Krypton', 'Xenon'],
    deep: ['Radon'],
    legendary: ['Oganesson'],
    notes: {
      'Argon': 'Makes up almost 1% of the air you breathe.',
      'Oganesson': 'Element 118. Only a handful of atoms have ever been made.',
      'Radon': 'Radioactive, and it can build up in basements.'
    },
    reject: [
      ['kryptonite', 'That is Superman’s weakness. The real element is krypton!'],
      ['oxygen|nitrogen|hydrogen|chlorine|fluorine|carbon dioxide', 'A gas, but not a noble one. Noble gases sit in the far-right column of the periodic table.']
    ]
  });

  P({
    id: 'planets', category: 'Space',
    prompt: 'Name a planet or dwarf planet in our solar system',
    common: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
    uncommon: ['Venus', 'Mercury', 'Neptune', 'Uranus'],
    rare: ['Pluto'],
    deep: ['Ceres', 'Eris'],
    legendary: ['Haumea', 'Makemake'],
    notes: {
      'Makemake': 'Named after the creator god of the Rapa Nui people of Easter Island.',
      'Haumea': 'Spins so fast that it is stretched into an egg shape.',
      'Ceres': 'The largest object in the asteroid belt.',
      'Eris': 'Its discovery in 2005 led to Pluto being reclassified.'
    },
    reject: [
      ['sun', 'The Sun is a star, not a planet.'],
      ['moon|luna', 'The Moon orbits Earth. It is a moon, not a planet.']
    ]
  });

  P({
    id: 'moons', category: 'Space',
    prompt: 'Name a moon in our solar system (not Earth’s Moon)',
    common: ['Titan', 'Europa', 'Io'],
    uncommon: ['Ganymede', 'Phobos', 'Callisto', 'Enceladus', 'Triton', 'Charon'],
    rare: ['Deimos', 'Miranda', 'Oberon', 'Titania', 'Mimas'],
    deep: ['Iapetus', 'Rhea', 'Dione', 'Tethys', 'Hyperion', 'Ariel', 'Umbriel', 'Phoebe', 'Proteus', 'Nereid', 'Amalthea'],
    legendary: ['Pan', 'Puck', 'Nix', 'Hydra', 'Kerberos', 'Styx', 'Dysnomia', 'Janus', 'Epimetheus', 'Pandora', 'Prometheus', 'Atlas', 'Himalia'],
    notes: {
      'Io': 'The most volcanically active world in the solar system.',
      'Ganymede': 'The largest moon in the solar system, bigger than Mercury.',
      'Triton': 'Orbits Neptune backwards, opposite to the planet’s spin.',
      'Puck': 'Uranus’s moons are named after characters from Shakespeare and Alexander Pope.',
      'Dysnomia': 'The only known moon of the dwarf planet Eris.',
      'Mimas': 'Its giant crater makes it look like the Death Star.'
    },
    reject: [['moon|the moon|luna', 'Any moon except Earth’s, please!']]
  });

  P({
    id: 'constellations', category: 'Space',
    prompt: 'Name one of the 88 official constellations',
    common: ['Orion', 'Ursa Major|great bear', 'Ursa Minor|little bear', 'Cassiopeia', 'Scorpius|scorpio'],
    uncommon: ['Leo', 'Taurus', 'Gemini', 'Cancer', 'Virgo', 'Libra', 'Sagittarius', 'Capricornus|capricorn', 'Aquarius', 'Pisces', 'Aries', 'Andromeda', 'Pegasus', 'Draco', 'Hercules', 'Perseus'],
    rare: ['Cygnus|northern cross', 'Lyra', 'Aquila', 'Canis Major|great dog', 'Canis Minor', 'Crux|southern cross', 'Ophiuchus', 'Boötes|bootes', 'Cepheus', 'Centaurus', 'Auriga', 'Hydra', 'Corona Borealis', 'Phoenix', 'Lupus'],
    deep: ['Lepus', 'Columba', 'Delphinus', 'Sagitta', 'Vulpecula', 'Lacerta', 'Monoceros', 'Eridanus', 'Cetus', 'Corvus', 'Crater', 'Carina', 'Vela', 'Puppis', 'Lynx', 'Leo Minor', 'Coma Berenices', 'Canes Venatici', 'Serpens', 'Scutum', 'Sextans', 'Triangulum', 'Piscis Austrinus', 'Corona Australis', 'Ara', 'Pavo', 'Grus', 'Tucana', 'Dorado', 'Indus', 'Equuleus'],
    legendary: ['Camelopardalis', 'Fornax', 'Sculptor', 'Horologium', 'Pictor', 'Mensa', 'Octans', 'Microscopium', 'Telescopium', 'Norma', 'Circinus', 'Antlia', 'Pyxis', 'Caelum', 'Reticulum', 'Volans', 'Chamaeleon', 'Musca', 'Apus', 'Hydrus', 'Triangulum Australe'],
    notes: {
      'Ophiuchus': 'The Sun passes through it, but it was left out of the 12 zodiac signs.',
      'Mensa': 'Named after Table Mountain in South Africa.',
      'Crux': 'The smallest of all 88 constellations.',
      'Hydra': 'The largest of all 88 constellations.',
      'Octans': 'Contains the south celestial pole.'
    },
    reject: [['big dipper|little dipper|plough|plow|orions belt|summer triangle|winter triangle|seven sisters|pleiades', 'That is an asterism or star cluster, a pattern inside a constellation. Try the constellation it belongs to!']]
  });

  P({
    id: 'clouds', category: 'Science',
    prompt: 'Name a type of cloud',
    strip: ['cloud', 'clouds'],
    common: ['Cumulus', 'Cirrus', 'Stratus'],
    uncommon: ['Cumulonimbus|thunderhead|thunder cloud|thundercloud|storm cloud', 'Nimbostratus|nimbus|rain cloud', 'Fog'],
    rare: ['Altostratus', 'Altocumulus', 'Stratocumulus', 'Cirrostratus', 'Cirrocumulus', 'Contrail|vapor trail'],
    deep: ['Lenticular|lenticularis|ufo cloud', 'Mammatus', 'Shelf cloud|arcus', 'Wall cloud', 'Funnel cloud', 'Roll cloud|volutus', 'Anvil|incus', 'Mackerel sky', 'Virga'],
    legendary: ['Noctilucent', 'Asperitas', 'Pileus|cap cloud', 'Kelvin-Helmholtz|kelvin helmholtz|fluctus|wave cloud', 'Nacreous|mother of pearl|polar stratospheric', 'Pyrocumulus|flammagenitus|fire cloud', 'Fallstreak hole|hole punch cloud|cavum', 'Morning Glory'],
    notes: {
      'Fog': 'Fog is simply a cloud touching the ground.',
      'Noctilucent': 'The highest clouds on Earth, about 80 km up, glowing after sunset.',
      'Asperitas': 'Added to the International Cloud Atlas in 2017.',
      'Morning Glory': 'A tube-shaped cloud up to 1,000 km long, seen in northern Australia.',
      'Virga': 'Rain that evaporates before it reaches the ground.'
    }
  });

  P({
    id: 'mohs', category: 'Science',
    prompt: 'Name one of the 10 reference minerals on the Mohs hardness scale',
    common: ['Diamond'],
    uncommon: ['Quartz', 'Talc'],
    rare: ['Topaz', 'Calcite'],
    deep: ['Gypsum', 'Corundum|ruby|sapphire', 'Fluorite|flourite'],
    legendary: ['Apatite', 'Orthoclase|orthoclase feldspar|feldspar'],
    notes: {
      'Talc': 'Hardness 1, the softest. You can scratch it with a fingernail.',
      'Gypsum': 'Hardness 2.', 'Calcite': 'Hardness 3.', 'Fluorite': 'Hardness 4.',
      'Apatite': 'Hardness 5. Your tooth enamel is made of a kind of apatite.',
      'Orthoclase': 'Hardness 6.', 'Quartz': 'Hardness 7.', 'Topaz': 'Hardness 8.',
      'Corundum': 'Hardness 9. Rubies and sapphires are both corundum.',
      'Diamond': 'Hardness 10, the hardest.'
    }
  });

  P({
    id: 'rocks', category: 'Science',
    prompt: 'Name a type of rock',
    strip: ['rock', 'rocks'],
    common: ['Granite', 'Marble', 'Sandstone', 'Limestone', 'Igneous', 'Sedimentary', 'Metamorphic'],
    uncommon: ['Basalt', 'Obsidian', 'Pumice', 'Slate', 'Shale', 'Coal', 'Chalk'],
    rare: ['Quartzite', 'Gneiss', 'Schist', 'Conglomerate', 'Flint', 'Chert', 'Breccia', 'Tuff', 'Scoria', 'Mudstone', 'Siltstone', 'Travertine', 'Soapstone'],
    deep: ['Gabbro', 'Diorite', 'Andesite', 'Rhyolite', 'Peridotite', 'Dolomite|dolostone', 'Phyllite', 'Serpentinite', 'Hornfels', 'Pegmatite', 'Coquina', 'Rock salt|halite', 'Oolite'],
    legendary: ['Eclogite', 'Komatiite', 'Anorthosite', 'Kimberlite', 'Migmatite', 'Mylonite', 'Tillite', 'Greywacke|graywacke', 'Dunite', 'Ignimbrite'],
    notes: {
      'Pumice': 'So full of gas bubbles that it can float on water.',
      'Kimberlite': 'The volcanic rock that carries diamonds up to the surface.',
      'Anorthosite': 'Forms the bright highlands of the Moon.',
      'Komatiite': 'Formed from ultra-hot lava that mostly erupted billions of years ago.',
      'Coquina': 'Made almost entirely of broken seashells.'
    },
    reject: [
      ['diamond|quartz|ruby|gold|emerald|mica|feldspar', 'That is a mineral. Rocks are made of minerals.'],
      ['lava|magma', 'Lava cools into rock. Which rock?']
    ]
  });

  P({
    id: 'bones', category: 'Human Body',
    prompt: 'Name a bone in the human body',
    strip: ['bone', 'bones'],
    common: ['Femur|thigh bone|thighbone|thigh', 'Skull|cranium', 'Rib|rib cage|ribcage', 'Spine|vertebra|vertebrae|backbone|spinal column|vertebral column'],
    uncommon: ['Humerus', 'Tibia|shin bone|shinbone|shin', 'Pelvis|hip bone|hipbone|hip', 'Collarbone|clavicle|collar bone', 'Kneecap|patella|knee cap', 'Jawbone|mandible|jaw', 'Shoulder blade|scapula', 'Sternum|breastbone|breast bone'],
    rare: ['Fibula', 'Radius', 'Ulna', 'Phalanges|phalanx|finger bone|toe bone', 'Metacarpal|metacarpals', 'Metatarsal|metatarsals', 'Coccyx|tailbone|tail bone', 'Sacrum', 'Carpals|carpal|wrist bone', 'Tarsals|tarsal|ankle bone', 'Maxilla|upper jaw'],
    deep: ['Stapes|stirrup', 'Incus|anvil', 'Malleus|hammer', 'Calcaneus|heel bone|heel', 'Talus|astragalus', 'Ilium', 'Ischium', 'Pubis|pubic bone', 'Zygomatic|cheekbone|cheek bone|zygomatic bone', 'Occipital', 'Parietal', 'Temporal', 'Frontal', 'Scaphoid', 'Atlas', 'Axis'],
    legendary: ['Hyoid', 'Pisiform', 'Triquetrum', 'Hamate', 'Lunate', 'Capitate', 'Trapezium', 'Trapezoid', 'Vomer', 'Lacrimal', 'Ethmoid', 'Sphenoid', 'Cuboid', 'Navicular', 'Cuneiform', 'Palatine', 'Nasal'],
    notes: {
      'Femur': 'The longest and strongest bone in your body.',
      'Stapes': 'The smallest bone in the body, about 3 mm long, inside your ear.',
      'Hyoid': 'The only bone that does not connect to any other bone.',
      'Pisiform': 'A wrist bone whose name means "pea-shaped."',
      'Atlas': 'The top vertebra, named after the Titan who held up the sky.'
    },
    reject: [['funny bone', 'The funny bone is actually a nerve, not a bone!']]
  });

  P({
    id: 'muscles', category: 'Human Body',
    prompt: 'Name a muscle in the human body',
    strip: ['muscle', 'muscles'],
    common: ['Biceps|bicep', 'Triceps|tricep', 'Abs|abdominals|six pack|rectus abdominis|abdominal', 'Heart|cardiac'],
    uncommon: ['Quadriceps|quads|quad|quadricep', 'Hamstring|hamstrings', 'Calf|calves|gastrocnemius', 'Glutes|gluteus maximus|glute|gluteus', 'Pectorals|pecs|pectoralis|pectoralis major|pec', 'Deltoid|delts|deltoids|delt', 'Diaphragm', 'Tongue'],
    rare: ['Trapezius|traps|trap', 'Latissimus dorsi|lats|lat|latissimus', 'Obliques|oblique', 'Rotator cuff', 'Soleus', 'Hip flexor|hip flexors', 'Masseter|jaw', 'Adductors|adductor|groin'],
    deep: ['Sartorius', 'Sternocleidomastoid', 'Rhomboid|rhomboids', 'Serratus anterior|serratus', 'Tibialis anterior|tibialis', 'Psoas|iliopsoas', 'Gracilis', 'Brachioradialis', 'Brachialis', 'Piriformis', 'Temporalis', 'Orbicularis oculi', 'Orbicularis oris', 'Buccinator', 'Erector spinae', 'Gluteus medius', 'Teres major', 'Infraspinatus', 'Supraspinatus', 'Subscapularis', 'Teres minor', 'Iliacus', 'Pectoralis minor', 'Transverse abdominis|transversus abdominis'],
    legendary: ['Stapedius', 'Platysma', 'Popliteus', 'Risorius', 'Procerus', 'Levator scapulae', 'Corrugator supercilii', 'Plantaris', 'Palmaris longus', 'Pyramidalis', 'Arrector pili', 'Lumbricals|lumbrical', 'Tensor fasciae latae', 'Mentalis'],
    notes: {
      'Stapedius': 'The smallest skeletal muscle, tucked inside your middle ear.',
      'Sartorius': 'The longest muscle in the body, running across the thigh.',
      'Palmaris longus': 'About 1 in 7 people are missing it, and they never notice.',
      'Arrector pili': 'Tiny muscles that give you goosebumps.',
      'Risorius': 'Pulls the corners of your mouth when you smile. Its name means "laughing."'
    }
  });

  P({
    id: 'digestive', category: 'Human Body',
    prompt: 'Name a part of the human digestive system',
    common: ['Stomach', 'Mouth', 'Intestines|intestine|gut|guts|bowel|bowels', 'Esophagus|oesophagus|food pipe'],
    uncommon: ['Small intestine', 'Large intestine|colon', 'Liver', 'Teeth|tooth', 'Tongue', 'Pancreas'],
    rare: ['Gallbladder|gall bladder', 'Rectum', 'Appendix', 'Salivary glands|salivary gland|saliva glands', 'Pharynx|throat', 'Anus'],
    deep: ['Duodenum', 'Ileum', 'Jejunum', 'Cecum|caecum', 'Epiglottis', 'Bile duct', 'Pyloric sphincter|pylorus', 'Villi|villus', 'Sigmoid colon'],
    legendary: ['Lower esophageal sphincter|cardiac sphincter|esophageal sphincter', 'Ileocecal valve', 'Sphincter of Oddi', 'Parotid gland|parotid', 'Haustra', 'Peyer’s patches|peyers patches', 'Ampulla of Vater', 'Rugae'],
    notes: {
      'Small intestine': 'About 20 feet long in adults.',
      'Rugae': 'Folds in the stomach lining that let it stretch after a big meal.',
      'Villi': 'Millions of tiny finger-like bumps that soak up nutrients.',
      'Liver': 'The largest internal organ, and it can regrow lost tissue.'
    },
    reject: [['heart|lungs|lung|kidney|kidneys|brain', 'An important organ, but not part of digestion.']]
  });

  P({
    id: 'three-letter-body', category: 'Human Body',
    prompt: 'Name a body part spelled with exactly three letters',
    lengthRule: 3,
    common: ['Arm', 'Leg', 'Eye', 'Ear'],
    uncommon: ['Toe', 'Lip', 'Hip'],
    rare: ['Rib', 'Jaw', 'Gum'],
    deep: ['Gut', 'Lid', 'Abs'],
    legendary: ['Pec', 'Lat'],
    notes: {
      'Lat': 'Short for latissimus dorsi, the broad muscles of your back.',
      'Pec': 'Short for pectoral, your chest muscle.',
      'Lid': 'As in eyelid, which you blink around 15 times a minute.'
    }
  });

  P({
    id: 'cell-parts', category: 'Science',
    prompt: 'Name a part of a plant or animal cell',
    common: ['Nucleus|nuclei', 'Mitochondria|mitochondrion', 'Cell membrane|plasma membrane|membrane', 'Cell wall'],
    uncommon: ['Cytoplasm', 'Chloroplast', 'Ribosome', 'Vacuole|central vacuole'],
    rare: ['Golgi apparatus|golgi|golgi body|golgi complex', 'Endoplasmic reticulum|er|rough er|smooth er|rough endoplasmic reticulum|smooth endoplasmic reticulum', 'Lysosome', 'Nucleolus', 'Chromosome|chromosomes|dna|chromatin'],
    deep: ['Peroxisome', 'Centriole', 'Centrosome', 'Vesicle', 'Cytoskeleton|microtubule|microfilament', 'Nuclear envelope|nuclear membrane', 'Cilia|cilium', 'Flagellum|flagella', 'Plastid', 'Nuclear pore'],
    legendary: ['Glyoxysome', 'Amyloplast', 'Chromoplast', 'Leucoplast', 'Contractile vacuole', 'Plasmodesmata|plasmodesma', 'Melanosome', 'Acrosome', 'Tonoplast', 'Proteasome', 'Cytosol'],
    notes: {
      'Mitochondria': 'They carry their own DNA, inherited from your mother.',
      'Plasmodesmata': 'Tiny channels that connect neighboring plant cells.',
      'Amyloplast': 'Stores starch, and helps roots sense which way is down.',
      'Chromoplast': 'Holds the pigments that make carrots orange and tomatoes red.'
    }
  });

  P({
    id: 'flower-parts', category: 'Science',
    prompt: 'Name a part of a flower',
    common: ['Petal|petals', 'Pollen', 'Stem|stalk'],
    uncommon: ['Stamen', 'Pistil', 'Sepal', 'Nectar'],
    rare: ['Anther', 'Stigma', 'Ovary', 'Filament', 'Style', 'Ovule', 'Carpel'],
    deep: ['Receptacle', 'Nectary', 'Pedicel', 'Peduncle', 'Calyx', 'Corolla', 'Bract'],
    legendary: ['Tepal', 'Perianth', 'Gynoecium', 'Androecium', 'Pollen tube', 'Hypanthium'],
    notes: {
      'Tepal': 'Used when petals and sepals look alike, as in lilies and tulips.',
      'Calyx': 'All the sepals of a flower together.',
      'Corolla': 'All the petals of a flower together.',
      'Bract': 'A leaf-like part. A poinsettia’s red "petals" are actually bracts.'
    },
    reject: [['root|roots|leaf|leaves', 'Part of the plant, but not part of the flower itself.']]
  });

  P({
    id: 'underground-food', category: 'Food',
    prompt: 'Name a food plant whose edible part grows underground',
    common: ['Potato', 'Carrot', 'Onion', 'Garlic'],
    uncommon: ['Sweet potato', 'Radish', 'Beet|beetroot', 'Turnip', 'Ginger', 'Yam', 'Parsnip'],
    rare: ['Rutabaga|swede', 'Cassava|yuca|manioc', 'Taro', 'Jicama', 'Shallot', 'Horseradish', 'Daikon', 'Turmeric', 'Celeriac|celery root'],
    deep: ['Jerusalem artichoke|sunchoke', 'Burdock|gobo', 'Salsify', 'Lotus root', 'Water chestnut', 'Wasabi', 'Arrowroot', 'Ginseng', 'Peanut|groundnut'],
    legendary: ['Oca', 'Ulluco', 'Mashua', 'Yacón|yacon', 'Tiger nut|chufa', 'Skirret', 'Crosne|chinese artichoke', 'Galangal', 'Malanga|yautia', 'Parsley root|hamburg parsley', 'Konjac'],
    notes: {
      'Peanut': 'Peanut flowers bend down and push their pods into the soil to grow.',
      'Oca': 'A tangy tuber from the Andes, second only to the potato there.',
      'Konjac': 'Its root is used to make zero-calorie shirataki noodles.',
      'Cassava': 'The source of tapioca.'
    },
    reject: [['truffle|truffles|mushroom', 'Truffles grow underground, but they are fungi, not plants.']]
  });

  P({
    id: 'pasta', category: 'Food',
    prompt: 'Name a shape or type of pasta',
    strip: ['pasta', 'noodles', 'noodle'],
    common: ['Spaghetti', 'Macaroni|mac', 'Penne', 'Lasagna|lasagne', 'Fettuccine|fettucine|fettuccini'],
    uncommon: ['Ravioli', 'Linguine|linguini', 'Rigatoni', 'Rotini', 'Farfalle|bow tie|bowtie|bow ties', 'Tortellini', 'Ziti', 'Angel hair|capellini', 'Shells|conchiglie', 'Elbow|elbows|elbow macaroni', 'Orzo', 'Gnocchi'],
    rare: ['Fusilli', 'Manicotti', 'Cannelloni', 'Pappardelle', 'Tagliatelle', 'Orecchiette', 'Bucatini', 'Ditalini', 'Cavatappi', 'Vermicelli', 'Gemelli', 'Radiatori', 'Rotelle|wagon wheels|ruote', 'Campanelle|gigli', 'Tortelloni', 'Stelline', 'Acini di pepe', 'Mostaccioli'],
    deep: ['Paccheri', 'Strozzapreti', 'Trofie', 'Casarecce', 'Cavatelli', 'Agnolotti', 'Anelli', 'Fregola|fregula', 'Lumache', 'Maltagliati', 'Pici', 'Garganelli', 'Tortiglioni', 'Mafaldine|mafalda|reginette', 'Cappelletti', 'Malloreddus', 'Busiate', 'Calamarata', 'Conchiglioni', 'Tagliolini'],
    legendary: ['Su filindeu', 'Corzetti|croxetti', 'Lorighittas', 'Culurgiones|culurgionis', 'Testaroli', 'Lagane', 'Strangozzi', 'Scialatielli', 'Fileja', 'Capunti'],
    notes: {
      'Su filindeu': 'Hand-pulled in Sardinia by only a few people. The name means "threads of God."',
      'Corzetti': 'Flat coins of pasta stamped with a carved wooden design.',
      'Gnocchi': 'Technically a dumpling, but it lives in the pasta aisle.',
      'Strozzapreti': 'The name means "priest stranglers."',
      'Orecchiette': 'Means "little ears."'
    },
    reject: [['ramen|udon|soba|lo mein|pad thai', 'Delicious noodles, but not Italian pasta.']]
  });

  P({
    id: 'cheese', category: 'Food',
    prompt: 'Name a kind of cheese',
    strip: ['cheese'],
    common: ['Cheddar', 'Mozzarella', 'Swiss', 'Parmesan|parmigiano|parmigiano reggiano', 'American'],
    uncommon: ['Brie', 'Gouda', 'Feta', 'Provolone', 'Pepper Jack', 'Monterey Jack|jack', 'Colby|colby jack', 'Cream cheese', 'Ricotta', 'Blue cheese|bleu cheese|bleu', 'Goat cheese|chevre', 'Cottage cheese', 'String cheese'],
    rare: ['Camembert', 'Gruyère|gruyere', 'Havarti', 'Muenster|munster', 'Manchego', 'Emmental|emmentaler', 'Edam', 'Roquefort', 'Gorgonzola', 'Stilton', 'Pecorino|pecorino romano|romano', 'Asiago', 'Halloumi', 'Paneer', 'Cotija', 'Queso fresco', 'Burrata', 'Mascarpone', 'Fontina', 'Jarlsberg'],
    deep: ['Limburger', 'Taleggio', 'Comté|comte', 'Raclette', 'Reblochon', 'Wensleydale', 'Oaxaca|quesillo', 'Red Leicester', 'Double Gloucester', 'Port Salut', 'Boursin', 'Mimolette', 'Brunost|gjetost|geitost', 'Leerdammer', 'Tilsit', 'Appenzeller', 'Neufchâtel|neufchatel', 'Labneh', 'Queso blanco', 'Cheshire', 'Caerphilly', 'Lancashire'],
    legendary: ['Époisses|epoisses', 'Casu marzu', 'Vacherin|vacherin mont d or', 'Morbier', 'Stinking Bishop', 'Pule', 'Bryndza', 'Cabrales', 'Torta del Casar', 'Mahón|mahon', 'Idiazabal', 'Ossau-Iraty|ossau iraty', 'Sbrinz', 'Oscypek'],
    notes: {
      'Casu marzu': 'A Sardinian sheep cheese that contains live insect larvae.',
      'Pule': 'Made from Balkan donkey milk, and one of the priciest cheeses in the world.',
      'Stinking Bishop': 'Washed in perry made from the Stinking Bishop pear.',
      'Mimolette': 'Tiny cheese mites help shape its rind.',
      'Morbier': 'Has a thin layer of ash running through the middle.'
    }
  });

  /* ------------------------------------------------------------- ANIMALS */

  P({
    id: 'eight-legs', category: 'Animals',
    prompt: 'Name an animal with exactly eight legs',
    common: ['Spider', 'Scorpion', 'Arachnid'],
    uncommon: ['Tick', 'Tarantula', 'Black widow|black widow spider'],
    rare: ['Mite|dust mite|spider mite', 'Daddy longlegs|harvestman|harvestmen|daddy long legs', 'Wolf spider', 'Jumping spider', 'Brown recluse', 'Orb weaver|orb weaver spider', 'Huntsman spider|huntsman', 'Trapdoor spider'],
    deep: ['Pseudoscorpion|book scorpion', 'Camel spider|sun spider|solifugid|wind scorpion'],
    legendary: ['Sea spider|pycnogonid', 'Vinegaroon|whip scorpion|whipscorpion', 'Whip spider|tailless whip scorpion|amblypygid'],
    notes: {
      'Vinegaroon': 'Sprays a vinegar-smelling acid when threatened.',
      'Sea spider': 'Its body is so thin that its gut extends down into its legs.',
      'Daddy longlegs': 'Harvestmen are arachnids, but they are not true spiders.',
      'Pseudoscorpion': 'A tiny scorpion look-alike with no tail, often found in old books.'
    },
    reject: [
      ['octopus|octopi|octopuses', 'Octopuses have arms, not legs! Try again.'],
      ['crab|crabs|lobster', 'Crabs and lobsters are decapods: ten legs, counting the claws.'],
      ['insect|ant|beetle|bee', 'Insects have six legs.']
    ]
  });

  P({
    id: 'dog-breeds', category: 'Animals',
    prompt: 'Name a dog breed',
    common: ['Labrador Retriever|labrador|lab', 'Golden Retriever|golden', 'German Shepherd|alsatian', 'Poodle', 'Bulldog|english bulldog', 'Beagle', 'Chihuahua'],
    uncommon: ['French Bulldog|frenchie', 'Dachshund|wiener dog|sausage dog|doxie', 'Siberian Husky|husky', 'Pug', 'Boxer', 'Rottweiler|rottie', 'Corgi|pembroke welsh corgi|welsh corgi', 'Dalmatian', 'Great Dane', 'Shih Tzu', 'Yorkshire Terrier|yorkie', 'Border Collie', 'Pit Bull|pitbull|american pit bull terrier', 'Doberman|doberman pinscher', 'Collie'],
    rare: ['Basset Hound', 'Bloodhound', 'Saint Bernard|st bernard', 'Newfoundland', 'Greyhound', 'Whippet', 'Maltese', 'Pomeranian', 'Bichon Frise|bichon', 'Cocker Spaniel', 'Shiba Inu|shiba', 'Akita', 'Samoyed', 'Bernese Mountain Dog|bernese', 'Australian Shepherd|aussie', 'Mastiff|english mastiff', 'Chow Chow|chow', 'Weimaraner', 'Vizsla', 'Boston Terrier', 'Schnauzer|miniature schnauzer', 'Jack Russell Terrier|jack russell', 'Cavalier King Charles Spaniel|cavalier', 'Shetland Sheepdog|sheltie', 'Alaskan Malamute|malamute', 'Irish Setter', 'Bull Terrier', 'Cane Corso', 'Havanese', 'Lhasa Apso'],
    deep: ['Basenji', 'Borzoi', 'Saluki', 'Shar Pei', 'Papillon', 'Pekingese', 'Afghan Hound', 'Rhodesian Ridgeback', 'Irish Wolfhound', 'Komondor', 'Puli', 'Bedlington Terrier', 'Leonberger', 'Keeshond', 'Xoloitzcuintli|xolo|mexican hairless', 'Great Pyrenees', 'Chinese Crested', 'Scottish Terrier|scottie', 'West Highland White Terrier|westie', 'Old English Sheepdog', 'Italian Greyhound', 'Bullmastiff|bull mastiff', 'Dogue de Bordeaux', 'Belgian Malinois|malinois', 'Portuguese Water Dog', 'Anatolian Shepherd'],
    legendary: ['Otterhound', 'Lagotto Romagnolo', 'Azawakh', 'Mudi', 'Bergamasco', 'Norwegian Lundehund|lundehund', 'Sloughi', 'Catahoula Leopard Dog|catahoula', 'Kooikerhondje|nederlandse kooikerhondje', 'Thai Ridgeback', 'Peruvian Inca Orchid', 'Skye Terrier', 'Dandie Dinmont Terrier|dandie dinmont', 'Sussex Spaniel', 'Pumi'],
    notes: {
      'Norwegian Lundehund': 'Has six toes on each foot, bred to climb cliffs hunting puffins.',
      'Basenji': 'Known as the barkless dog. It yodels instead.',
      'Lagotto Romagnolo': 'An Italian breed trained to sniff out truffles.',
      'Komondor': 'Its coat grows into long white cords that look like a mop.',
      'Otterhound': 'One of the rarest breeds, with webbed feet for swimming.'
    },
    reject: [['labradoodle|goldendoodle|cockapoo|doodle|puggle', 'A popular cross, but not a recognized breed.']]
  });

  P({
    id: 'flightless-birds', category: 'Animals',
    prompt: 'Name a bird that cannot fly',
    common: ['Penguin', 'Ostrich', 'Emu'],
    uncommon: ['Kiwi', 'Dodo', 'Cassowary'],
    rare: ['Rhea', 'Kakapo', 'Moa'],
    deep: ['Takahe|takahē', 'Weka', 'Great auk', 'Elephant bird', 'Galápagos cormorant|galapagos cormorant|flightless cormorant'],
    legendary: ['Steamer duck|flightless steamer duck', 'Inaccessible Island rail', 'Titicaca grebe', 'Campbell teal', 'Adzebill'],
    notes: {
      'Kakapo': 'The world’s only flightless parrot, and the heaviest parrot.',
      'Inaccessible Island rail': 'The smallest living flightless bird, about the size of a chick.',
      'Cassowary': 'Has a dagger-like claw and is often called the most dangerous bird.',
      'Moa': 'Giant birds from New Zealand, some over 3.5 meters tall, now extinct.'
    },
    reject: [
      ['chicken|turkey|peacock|duck|goose', 'Clumsy fliers, but they can fly short distances!'],
      ['bat|bats', 'Bats fly, and they are mammals, not birds.']
    ]
  });

  P({
    id: 'marsupials', category: 'Animals',
    prompt: 'Name a marsupial',
    common: ['Kangaroo', 'Koala|koala bear', 'Opossum|possum|virginia opossum'],
    uncommon: ['Wombat', 'Wallaby', 'Tasmanian devil|tassie devil', 'Sugar glider'],
    rare: ['Quokka', 'Bandicoot', 'Numbat', 'Bilby', 'Quoll', 'Tree kangaroo', 'Thylacine|tasmanian tiger|tasmanian wolf'],
    deep: ['Pademelon', 'Potoroo', 'Bettong', 'Dunnart', 'Antechinus', 'Cuscus', 'Wallaroo', 'Brushtail possum', 'Ringtail possum', 'Honey possum|noolbenger', 'Marsupial mole', 'Phascogale'],
    legendary: ['Monito del monte', 'Shrew opossum', 'Mulgara', 'Kultarr', 'Ningaui', 'Planigale', 'Water opossum|yapok', 'Feathertail glider', 'Diprotodon', 'Marsupial lion|thylacoleo'],
    notes: {
      'Water opossum': 'The only aquatic marsupial. Males have a pouch too.',
      'Monito del monte': 'A tiny South American marsupial more closely related to Australia’s marsupials than its neighbors.',
      'Opossum': 'The only marsupial native to the U.S. and Canada.',
      'Diprotodon': 'An extinct wombat relative the size of a rhinoceros.'
    },
    reject: [['platypus|echidna', 'Those are monotremes: egg-laying mammals, not marsupials.']]
  });

  P({
    id: 'sea-invertebrates', category: 'Animals',
    prompt: 'Name a sea creature with no backbone',
    common: ['Jellyfish|jelly', 'Octopus', 'Crab', 'Starfish|sea star', 'Shrimp|prawn'],
    uncommon: ['Squid', 'Lobster', 'Sea urchin|urchin', 'Clam', 'Oyster', 'Coral', 'Sponge|sea sponge', 'Sea anemone|anemone', 'Sea snail|snail', 'Mussel', 'Scallop'],
    rare: ['Sea cucumber', 'Sand dollar', 'Krill', 'Nautilus', 'Cuttlefish', 'Barnacle', 'Sea slug|nudibranch', 'Conch', 'Horseshoe crab', 'Portuguese man o’ war|man o war|portuguese man of war|man of war|bluebottle', 'Hermit crab', 'Mantis shrimp', 'Box jellyfish|sea wasp'],
    deep: ['Sea pen', 'Brittle star|brittlestar', 'Sea lily|crinoid|feather star', 'Comb jelly|ctenophore', 'Tube worm|giant tube worm', 'Feather duster worm|feather duster', 'Sea spider', 'Copepod', 'Giant isopod|isopod', 'Salp', 'Sea squirt|tunicate', 'Vampire squid', 'Christmas tree worm', 'Limpet', 'Chiton', 'Whelk', 'Abalone', 'Sea hare', 'Giant squid', 'Colossal squid', 'Blue-ringed octopus|blue ringed octopus', 'Dumbo octopus'],
    legendary: ['Bobbit worm', 'Sea butterfly|pteropod', 'Yeti crab', 'Pyrosome', 'Sea angel', 'Siphonophore', 'Boxer crab|pom pom crab', 'Blue dragon|glaucus|glaucus atlanticus', 'Bone-eating worm|osedax|zombie worm', 'Scaly-foot snail|scaly foot snail|volcano snail', 'Pompeii worm'],
    notes: {
      'Siphonophore': 'A colony of many tiny animals working together as one body.',
      'Scaly-foot snail': 'Builds armor from iron sulfide near deep-sea vents.',
      'Krill': 'Tiny crustaceans that feed some of the biggest whales on Earth.',
      'Yeti crab': 'Grows bacteria on its hairy arms, then eats them.',
      'Blue dragon': 'A blue sea slug that eats Portuguese man o’ war and keeps their stings.',
      'Pompeii worm': 'Lives on hydrothermal vents, one of the most heat-tolerant animals known.',
      'Colossal squid': 'Has the largest eyes of any animal, about the size of a dinner plate.'
    },
    reject: [['fish|shark|whale|dolphin|seal|eel|seahorse|sea horse|manta ray|stingray|ray|turtle|sea turtle|sea lion|otter|sea otter', 'That animal has a backbone! Try something squishy or shelled.']]
  });

  P({
    id: 'dinosaurs', category: 'Animals',
    prompt: 'Name a dinosaur',
    common: ['Tyrannosaurus rex|t rex|trex|tyrannosaurus|t-rex', 'Triceratops', 'Stegosaurus', 'Velociraptor|raptor'],
    uncommon: ['Brachiosaurus', 'Diplodocus', 'Spinosaurus', 'Ankylosaurus', 'Brontosaurus', 'Allosaurus', 'Parasaurolophus', 'Iguanodon', 'Pachycephalosaurus', 'Apatosaurus'],
    rare: ['Dilophosaurus', 'Gallimimus', 'Carnotaurus', 'Giganotosaurus', 'Argentinosaurus', 'Compsognathus', 'Deinonychus', 'Maiasaura', 'Oviraptor', 'Protoceratops', 'Therizinosaurus', 'Utahraptor', 'Baryonyx', 'Archaeopteryx', 'Edmontosaurus', 'Albertosaurus', 'Styracosaurus', 'Microraptor', 'Troodon'],
    deep: ['Coelophysis', 'Herrerasaurus', 'Mamenchisaurus', 'Kentrosaurus', 'Corythosaurus', 'Carcharodontosaurus', 'Suchomimus', 'Nodosaurus', 'Patagotitan', 'Dreadnoughtus', 'Eoraptor', 'Plateosaurus', 'Psittacosaurus', 'Amargasaurus', 'Nigersaurus', 'Yutyrannus', 'Concavenator', 'Lambeosaurus', 'Ouranosaurus', 'Sauropelta', 'Majungasaurus', 'Ceratosaurus', 'Camarasaurus', 'Struthiomimus'],
    legendary: ['Dracorex', 'Stygimoloch', 'Mononykus', 'Irritator', 'Minmi', 'Leaellynasaura', 'Qianzhousaurus', 'Halszkaraptor', 'Borealopelta', 'Mei long|mei', 'Epidexipteryx', 'Zuul', 'Bird|birds|chicken|pigeon|sparrow'],
    notes: {
      'Brontosaurus': 'Lumped in with Apatosaurus for a century, then brought back as its own genus in 2015.',
      'Mei long': 'Its name means "soundly sleeping dragon."',
      'Irritator': 'Named for the scientists’ irritation after finding its fossil had been tampered with.',
      'Zuul': 'Named after the monster in Ghostbusters.',
      'Bird': 'Birds are living dinosaurs, so this counts!',
      'Argentinosaurus': 'One of the largest land animals ever, possibly over 30 meters long.'
    },
    reject: [
      ['pterodactyl|pteranodon|pterosaur|quetzalcoatlus', 'Pterosaurs flew alongside dinosaurs, but they are not dinosaurs.'],
      ['plesiosaur|plesiosaurus|mosasaur|mosasaurus|ichthyosaur|elasmosaurus|megalodon', 'Ancient sea creatures lived alongside dinosaurs, but they are not dinosaurs.'],
      ['dimetrodon', 'Dimetrodon is more closely related to mammals than to dinosaurs!'],
      ['mammoth|woolly mammoth|sabertooth|saber tooth tiger|smilodon|mastodon', 'That is an Ice Age mammal, not a dinosaur.']
    ]
  });

  P({
    id: 'collective-nouns', category: 'Language',
    prompt: 'Name a collective noun for a group of animals (a ___ of geese)',
    common: ['Herd', 'Flock', 'Pack', 'School', 'Swarm'],
    uncommon: ['Pride', 'Pod', 'Gaggle', 'Colony', 'Litter', 'Hive', 'Troop', 'Shoal'],
    rare: ['Murder', 'Parliament', 'Army', 'Brood', 'Drove', 'Clutch', 'Flight', 'Band', 'Bevy', 'Covey', 'Kindle'],
    deep: ['Tower', 'Crash', 'Bloat', 'Dazzle', 'Mischief', 'Murmuration', 'Skulk', 'Sleuth|sloth', 'Parade', 'Smack', 'Prickle', 'Business', 'Caravan', 'Kettle', 'Cauldron', 'Convocation', 'Charm', 'Romp', 'Raft', 'Rookery', 'Bale', 'Leap'],
    legendary: ['Exaltation', 'Unkindness', 'Shrewdness', 'Conspiracy', 'Ostentation', 'Muster', 'Knot', 'Obstinacy', 'Gulp', 'Siege', 'Wisdom', 'Cackle', 'Zeal'],
    notes: {
      'Herd': 'A herd of cattle or elephants.', 'Flock': 'A flock of sheep or birds.', 'Pack': 'A pack of wolves.',
      'School': 'A school of fish.', 'Swarm': 'A swarm of bees.', 'Pride': 'A pride of lions.',
      'Pod': 'A pod of dolphins or whales.', 'Gaggle': 'A gaggle of geese on the ground.', 'Colony': 'A colony of ants.',
      'Litter': 'A litter of puppies.', 'Hive': 'A hive of bees.', 'Troop': 'A troop of monkeys or baboons.',
      'Shoal': 'A shoal of fish.', 'Murder': 'A murder of crows.', 'Parliament': 'A parliament of owls.',
      'Army': 'An army of ants or frogs.', 'Brood': 'A brood of chicks.', 'Drove': 'A drove of cattle or pigs.',
      'Clutch': 'A clutch of eggs or chicks.', 'Flight': 'A flight of birds.', 'Band': 'A band of gorillas.',
      'Bevy': 'A bevy of quail or swans.', 'Covey': 'A covey of quail.', 'Kindle': 'A kindle of kittens.',
      'Tower': 'A tower of giraffes.', 'Crash': 'A crash of rhinoceroses.', 'Bloat': 'A bloat of hippopotamuses.',
      'Dazzle': 'A dazzle of zebras.', 'Mischief': 'A mischief of mice.', 'Murmuration': 'A murmuration of starlings.',
      'Skulk': 'A skulk of foxes.', 'Sleuth': 'A sleuth of bears.', 'Parade': 'A parade of elephants.',
      'Smack': 'A smack of jellyfish.', 'Prickle': 'A prickle of porcupines.', 'Business': 'A business of ferrets.',
      'Caravan': 'A caravan of camels.', 'Kettle': 'A kettle of hawks circling in the sky.', 'Cauldron': 'A cauldron of bats.',
      'Convocation': 'A convocation of eagles.', 'Charm': 'A charm of finches.', 'Romp': 'A romp of otters.',
      'Raft': 'A raft of otters or ducks floating together.', 'Rookery': 'A rookery of penguins or seals.',
      'Bale': 'A bale of turtles.', 'Leap': 'A leap of leopards.', 'Exaltation': 'An exaltation of larks.',
      'Unkindness': 'An unkindness of ravens.', 'Shrewdness': 'A shrewdness of apes.', 'Conspiracy': 'A conspiracy of lemurs.',
      'Ostentation': 'An ostentation of peacocks.', 'Muster': 'A muster of peacocks or storks.', 'Knot': 'A knot of toads.',
      'Obstinacy': 'An obstinacy of buffalo.', 'Gulp': 'A gulp of cormorants.', 'Siege': 'A siege of herons.',
      'Wisdom': 'A wisdom of wombats.', 'Cackle': 'A cackle of hyenas.', 'Zeal': 'A zeal of zebras.'
    }
  });

  /* ------------------------------------------------------------- LANGUAGE */

  P({
    id: 'greek-letters', category: 'Language',
    prompt: 'Name a letter of the Greek alphabet',
    common: ['Alpha', 'Beta', 'Omega', 'Pi', 'Delta'],
    uncommon: ['Gamma', 'Sigma', 'Theta', 'Lambda'],
    rare: ['Epsilon', 'Zeta', 'Kappa', 'Mu', 'Phi', 'Psi', 'Chi', 'Rho', 'Tau'],
    deep: ['Omicron', 'Iota', 'Eta', 'Nu', 'Xi'],
    legendary: ['Upsilon', 'Digamma', 'Koppa', 'Sampi', 'Stigma', 'Heta', 'San'],
    notes: {
      'Digamma': 'An early Greek letter that dropped out of the classical alphabet.',
      'Koppa': 'An archaic letter that survives today only as a number sign.',
      'Sampi': 'An old letter used for the number 900.',
      'Iota': 'The smallest letter, which gave us the phrase "not one iota."',
      'Omega': 'The last letter, as in "the alpha and the omega."'
    },
    reject: [['aleph|alef', 'Aleph is Hebrew, not Greek.']]
  });

  P({
    id: 'happy-synonyms', category: 'Language',
    prompt: 'Name a word that means "happy"',
    common: ['Glad', 'Joyful', 'Cheerful', 'Excited', 'Content|contented'],
    uncommon: ['Delighted', 'Pleased', 'Thrilled', 'Ecstatic', 'Elated', 'Merry', 'Jolly', 'Overjoyed', 'Upbeat', 'Joyous'],
    rare: ['Jubilant', 'Euphoric', 'Blissful', 'Gleeful', 'Chipper', 'Sunny', 'Exuberant', 'Jovial', 'Lighthearted|light hearted', 'Carefree', 'Giddy', 'Peppy', 'Bubbly', 'Satisfied', 'Positive'],
    deep: ['Buoyant', 'Blithe', 'Exultant', 'Rapturous', 'Radiant', 'Chirpy', 'Mirthful', 'Gratified', 'Tickled|tickled pink', 'Rhapsodic', 'Beaming', 'Triumphant', 'Exhilarated', 'Stoked', 'Chuffed', 'Over the moon|on cloud nine'],
    legendary: ['Sanguine', 'Beatific', 'Gruntled', 'Blithesome', 'Eudaemonic|eudaimonic'],
    notes: {
      'Gruntled': 'A playful back-formation from "disgruntled," meaning pleased.',
      'Beatific': 'Blissfully happy, like a saint in an old painting.',
      'Sanguine': 'Cheerfully optimistic, even when things look bad.',
      'Chuffed': 'British slang for very pleased.'
    },
    reject: [['happy|happiness', 'That is the word itself! Try a synonym.'], ['sad|angry|mad|upset', 'That is the opposite of happy.']]
  });

  P({
    id: 'polygons', category: 'Math',
    prompt: 'Name a polygon',
    common: ['Triangle', 'Square', 'Rectangle', 'Pentagon', 'Hexagon', 'Octagon'],
    uncommon: ['Rhombus|diamond', 'Trapezoid|trapezium', 'Parallelogram', 'Heptagon|septagon', 'Quadrilateral', 'Decagon', 'Kite'],
    rare: ['Nonagon|enneagon', 'Dodecagon', 'Hendecagon|undecagon|endecagon', 'Icosagon'],
    deep: ['Tridecagon|triskaidecagon', 'Tetradecagon', 'Pentadecagon', 'Hexadecagon', 'Heptadecagon', 'Octadecagon', 'Enneadecagon', 'Triacontagon', 'Pentagram|star polygon|hexagram'],
    legendary: ['Hectogon', 'Chiliagon', 'Myriagon', 'Megagon', 'Apeirogon', 'Googolgon'],
    notes: {
      'Hectogon': 'A polygon with 100 sides.',
      'Chiliagon': 'A polygon with 1,000 sides.',
      'Myriagon': 'A polygon with 10,000 sides.',
      'Megagon': 'A polygon with one million sides.',
      'Apeirogon': 'A "polygon" with infinitely many sides.',
      'Googolgon': 'A polygon with a googol sides: 1 followed by 100 zeros.',
      'Icosagon': 'A polygon with 20 sides.'
    },
    reject: [
      ['circle|oval|ellipse|semicircle', 'Curves have no straight sides, so they are not polygons.'],
      ['cube|pyramid|sphere|prism|cylinder|cone', 'That is a 3D shape. Polygons are flat.']
    ]
  });

  /* ------------------------------------------------------------ ARTS & MYTH */

  P({
    id: 'shakespeare', category: 'Literature',
    prompt: 'Name a play by William Shakespeare',
    common: ['Romeo and Juliet|romeo juliet|romeo', 'Hamlet', 'Macbeth'],
    uncommon: ['Othello', 'King Lear|lear', 'A Midsummer Night’s Dream|midsummer nights dream|midsummer', 'Julius Caesar', 'The Tempest|tempest'],
    rare: ['Much Ado About Nothing|much ado', 'Twelfth Night|12th night', 'The Merchant of Venice|merchant of venice', 'The Taming of the Shrew|taming of the shrew', 'As You Like It', 'Richard III|richard the third|richard 3', 'Henry V|henry the fifth|henry 5', 'Antony and Cleopatra'],
    deep: ['The Winter’s Tale|winters tale', 'Coriolanus', 'Titus Andronicus', 'The Comedy of Errors|comedy of errors', 'Measure for Measure', 'All’s Well That Ends Well|alls well that ends well', 'Love’s Labour’s Lost|loves labours lost|loves labors lost', 'The Merry Wives of Windsor|merry wives of windsor', 'Richard II|richard the second|richard 2', 'Henry IV|henry the fourth|henry 4|henry iv part 1|henry iv part 2', 'Henry VI|henry the sixth|henry 6', 'Henry VIII|henry the eighth|henry 8'],
    legendary: ['Cymbeline', 'Pericles|pericles prince of tyre', 'Timon of Athens', 'Troilus and Cressida', 'The Two Gentlemen of Verona|two gentlemen of verona', 'King John', 'The Two Noble Kinsmen|two noble kinsmen'],
    notes: {
      'The Two Noble Kinsmen': 'Co-written with John Fletcher, and left out of the First Folio.',
      'The Winter’s Tale': 'Home of the famous stage direction "Exit, pursued by a bear."',
      'Hamlet': 'Shakespeare’s longest play.',
      'The Comedy of Errors': 'His shortest play, built around two sets of identical twins.'
    },
    reject: [['sonnet|sonnets|venus and adonis', 'Shakespeare wrote it, but it is a poem, not a play.']]
  });

  P({
    id: 'greek-gods', category: 'Mythology',
    prompt: 'Name a god, goddess, or Titan from Greek mythology',
    common: ['Zeus', 'Poseidon', 'Hades', 'Athena|athene'],
    uncommon: ['Apollo', 'Aphrodite', 'Ares', 'Hermes', 'Hera', 'Artemis'],
    rare: ['Dionysus|dionysos', 'Hephaestus|hephaistos', 'Demeter', 'Persephone', 'Hestia', 'Eros', 'Gaia|gaea', 'Cronus|kronos|cronos', 'Nike', 'Pan'],
    deep: ['Hecate|hekate', 'Helios', 'Selene', 'Eos', 'Uranus|ouranos', 'Rhea', 'Nyx', 'Hypnos', 'Thanatos', 'Iris', 'Hebe', 'Nemesis', 'Tyche', 'Asclepius|asklepios', 'Morpheus', 'Aeolus', 'Triton', 'Eris', 'Atlas', 'Prometheus', 'Hyperion', 'Themis', 'Mnemosyne', 'Oceanus'],
    legendary: ['Chaos', 'Erebus', 'Aether', 'Hemera', 'Nereus', 'Proteus', 'Harmonia', 'Enyo', 'Phobos', 'Deimos', 'Eileithyia', 'Ananke', 'Boreas', 'Zephyrus', 'Notus', 'Eurus', 'Pontus', 'Tartarus', 'Momus', 'Plutus'],
    notes: {
      'Hestia': 'Goddess of the hearth. In some tellings she gave her Olympian seat to Dionysus.',
      'Eileithyia': 'Goddess of childbirth.',
      'Ananke': 'The personification of necessity, so powerful even the gods obeyed her.',
      'Momus': 'The god of mockery, thrown out of Olympus for criticizing the other gods.',
      'Chaos': 'In many tellings, the very first thing that existed.'
    },
    reject: [
      ['jupiter|mars|venus|neptune|mercury|minerva|juno|vulcan|pluto|cupid|diana|bacchus|ceres|saturn|vesta', 'That is the Roman name. Try its Greek counterpart!'],
      ['perseus|achilles|odysseus|medusa|heracles|hercules|jason|theseus', 'A famous figure from the myths, but not a god.']
    ]
  });

  P({
    id: 'orchestra', category: 'Music',
    prompt: 'Name an instrument you might find in a symphony orchestra',
    common: ['Violin', 'Cello', 'Flute', 'Trumpet', 'Drums|drum'],
    uncommon: ['Clarinet', 'Trombone', 'French horn|horn', 'Tuba', 'Viola', 'Double bass|bass|upright bass|contrabass|string bass', 'Harp', 'Piano'],
    rare: ['Oboe', 'Bassoon', 'Timpani|kettle drum|kettledrum', 'Piccolo', 'Cymbals|cymbal', 'Snare drum', 'Bass drum', 'Xylophone', 'Triangle'],
    deep: ['English horn|cor anglais', 'Contrabassoon|double bassoon', 'Bass clarinet', 'Glockenspiel', 'Tubular bells|chimes', 'Celesta|celeste', 'Tam-tam|gong|tam tam', 'Marimba', 'Saxophone|sax', 'Tambourine'],
    legendary: ['Wagner tuba', 'Alto flute', 'E-flat clarinet|e flat clarinet|eb clarinet', 'Organ|pipe organ', 'Castanets', 'Bass trombone', 'Harpsichord', 'Contrabass clarinet', 'Wind machine', 'Anvil'],
    notes: {
      'Celesta': 'Famous for the "Dance of the Sugar Plum Fairy" in The Nutcracker.',
      'Wagner tuba': 'Invented for Richard Wagner’s Ring cycle operas.',
      'Saxophone': 'Not a regular member, but it gets a big solo in Ravel’s Boléro.',
      'Wind machine': 'A rotating drum against canvas that makes a howling wind sound.',
      'Anvil': 'Verdi wrote a part for it in the "Anvil Chorus" of Il Trovatore.'
    },
    reject: [['guitar|electric guitar|ukulele|banjo|drum set|drum kit', 'Rare in a symphony orchestra. Try strings, winds, brass, or percussion.']]
  });

  P({
    id: 'gemstones', category: 'Science',
    prompt: 'Name a gemstone',
    common: ['Diamond', 'Ruby', 'Emerald', 'Sapphire'],
    uncommon: ['Amethyst', 'Topaz', 'Opal', 'Pearl', 'Garnet', 'Jade', 'Turquoise', 'Aquamarine'],
    rare: ['Peridot', 'Onyx', 'Citrine', 'Tanzanite', 'Tourmaline', 'Moonstone', 'Lapis lazuli|lapis', 'Jasper', 'Agate', 'Amber', 'Coral', 'Obsidian', 'Malachite', 'Quartz|rose quartz|smoky quartz'],
    deep: ['Alexandrite', 'Spinel', 'Zircon', 'Morganite', 'Kunzite', 'Iolite', 'Chrysoberyl', 'Labradorite', 'Sunstone', 'Beryl', 'Jet', 'Tsavorite', 'Chrysoprase', 'Carnelian', 'Bloodstone', 'Hematite', 'Rhodochrosite', 'Sodalite', 'Tiger’s eye|tigers eye|tiger eye', 'Ammolite'],
    legendary: ['Benitoite', 'Painite', 'Taaffeite', 'Grandidierite', 'Red beryl|bixbite', 'Musgravite', 'Jeremejevite', 'Poudretteite', 'Serendibite', 'Larimar', 'Demantoid', 'Paraíba tourmaline|paraiba tourmaline|paraiba', 'Padparadscha', 'Hiddenite', 'Euclase'],
    notes: {
      'Painite': 'Was once listed as the rarest gem mineral on Earth.',
      'Larimar': 'Found in only one place: the Dominican Republic.',
      'Benitoite': 'California’s official state gem.',
      'Alexandrite': 'Looks green in daylight and red under lamplight.',
      'Ammolite': 'Made from the fossilized shells of ancient sea creatures called ammonites.'
    }
  });

  UT.PROMPTS = list;
  UT.P = P; // extra prompt files (js/prompts-*.js) add to the same list
  UT.TIER_ORDER = TIERS;
})(window.UT = window.UT || {});
