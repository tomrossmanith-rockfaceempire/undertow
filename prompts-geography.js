/* Undertow prompts: geography. Uses UT.P() from js/prompts.js. */
(function (UT) {
  'use strict';
  var P = UT.P;

  /* ------------------------------------------------ COUNTRIES BY CRITERIA */

  P({
    id: 'landlocked-europe', category: 'Geography',
    prompt: 'Name a landlocked country in Europe',
    common: ['Switzerland', 'Austria', 'Hungary', 'Czech Republic|czechia'],
    uncommon: ['Slovakia', 'Serbia', 'Luxembourg', 'Belarus'],
    rare: ['Liechtenstein', 'Vatican City|vatican|holy see', 'San Marino', 'Andorra', 'North Macedonia|macedonia'],
    deep: ['Moldova'],
    legendary: ['Kazakhstan', 'Azerbaijan'],
    notes: {
      'Liechtenstein': 'One of only two doubly landlocked countries: all its neighbors are landlocked too.',
      'Belarus': 'The largest landlocked country that lies entirely in Europe.',
      'Kazakhstan': 'The world’s largest landlocked country. Its land west of the Ural River counts as Europe.',
      'Azerbaijan': 'Spans Europe and Asia. Its only shore is on the Caspian Sea, which geographers usually count as a lake.'
    },
    reject: [
      ['kosovo', 'Kosovo’s status as a country is disputed, so it isn’t counted in this list.'],
      ['bosnia|bosnia and herzegovina', 'Bosnia and Herzegovina has a tiny 20 km coastline at the town of Neum.'],
      ['slovenia', 'Slovenia has a short coastline on the Adriatic Sea.'],
      ['montenegro|croatia|albania|germany|poland|netherlands|belgium|portugal|denmark|romania|bulgaria|ukraine', 'That country has a sea coast, so it is not landlocked.']
    ]
  });

  P({
    id: 'landlocked-africa', category: 'Geography',
    prompt: 'Name a landlocked country in Africa',
    common: ['Ethiopia', 'Uganda', 'Zimbabwe', 'Rwanda'],
    uncommon: ['Chad', 'Mali', 'Niger', 'Zambia', 'Botswana', 'South Sudan'],
    rare: ['Malawi', 'Burkina Faso', 'Lesotho', 'Central African Republic|car'],
    deep: ['Burundi'],
    legendary: ['Eswatini|swaziland'],
    notes: {
      'Ethiopia': 'The most populous landlocked country in the world.',
      'Lesotho': 'Completely surrounded by South Africa.',
      'Eswatini': 'Changed its English name from Swaziland in 2018.',
      'South Sudan': 'The world’s newest country, independent since 2011.'
    },
    reject: [
      ['sudan', 'Sudan has a Red Sea coast. South Sudan is the landlocked one!'],
      ['democratic republic of the congo|drc|congo|republic of the congo', 'Both Congos have a short Atlantic coastline.'],
      ['kenya|tanzania|mozambique|somalia|egypt|nigeria|angola|namibia|eritrea|cameroon', 'That country has a sea coast, so it is not landlocked.']
    ]
  });

  P({
    id: 'borders-russia', category: 'Geography',
    prompt: 'Name a country that shares a land border with Russia',
    common: ['China', 'Ukraine', 'Finland'],
    uncommon: ['Kazakhstan', 'Belarus', 'Mongolia'],
    rare: ['Estonia', 'Latvia', 'Georgia'],
    deep: ['Norway', 'Azerbaijan', 'North Korea'],
    legendary: ['Poland', 'Lithuania'],
    notes: {
      'Poland': 'It touches only Kaliningrad, a piece of Russia cut off from the rest on the Baltic Sea.',
      'Lithuania': 'Its border with Russia is along Kaliningrad, not the Russian mainland.',
      'North Korea': 'The border is only about 17 km (11 miles) long, along the Tumen River.',
      'Kazakhstan': 'Russia and Kazakhstan share the second-longest land border in the world.'
    },
    reject: [
      ['united states|usa|us|america|alaska', 'Russia and the U.S. are under 4 km apart across the Bering Strait, but share no land border.'],
      ['japan', 'Japan is separated from Russia by sea, so no land border.'],
      ['sweden', 'Close! Finland sits in between.'],
      ['armenia|turkey|moldova|kyrgyzstan|uzbekistan', 'Close, but that country does not touch Russia.']
    ]
  });

  P({
    id: 'borders-france', category: 'Geography',
    prompt: 'Name a country that shares a land border with France, including its overseas regions and territories',
    common: ['Spain', 'Germany', 'Italy', 'Belgium', 'Switzerland'],
    uncommon: ['Luxembourg', 'Monaco', 'Andorra'],
    rare: ['Brazil|brasil'],
    deep: ['Suriname|surinam'],
    legendary: ['Netherlands|holland|kingdom of the netherlands'],
    notes: {
      'Brazil': 'France’s longest land border is with Brazil, through French Guiana.',
      'Suriname': 'Borders French Guiana along the Maroni River.',
      'Netherlands': 'On the Caribbean island of Saint Martin, the French north meets Dutch Sint Maarten.',
      'Monaco': 'Surrounded on three sides by France, with the sea on the fourth.'
    },
    reject: [
      ['united kingdom|uk|england|britain|great britain', 'Linked by the Channel Tunnel, but there is no land border.'],
      ['portugal', 'Close! Spain sits in between.'],
      ['austria|liechtenstein', 'Close, but Switzerland or Germany sits in between.'],
      ['french guiana|martinique|guadeloupe', 'That is part of France itself. Which countries does it touch?']
    ]
  });

  P({
    id: 'borders-brazil', category: 'Geography',
    prompt: 'Name a country that shares a land border with Brazil',
    common: ['Argentina', 'Peru', 'Colombia|columbia', 'Venezuela'],
    uncommon: ['Bolivia', 'Paraguay', 'Uruguay'],
    rare: ['Guyana'],
    deep: ['Suriname|surinam'],
    legendary: ['France'],
    notes: {
      'France': 'Through French Guiana, an overseas region of France. It is France’s longest land border.',
      'Bolivia': 'Brazil’s longest border, over 3,400 km.',
      'Uruguay': 'Brazil’s southernmost point, near the town of Chuí, is on the border with Uruguay.'
    },
    reject: [
      ['chile|ecuador', 'One of the only two South American countries that do not touch Brazil.'],
      ['french guiana', 'French Guiana is not a country. It is an overseas region of France.'],
      ['panama|mexico|costa rica', 'Too far north to touch Brazil.']
    ]
  });

  P({
    id: 'equator-countries', category: 'Geography',
    prompt: 'Name a country the Equator passes through, on land or in its territorial waters',
    common: ['Ecuador', 'Brazil|brasil', 'Kenya', 'Indonesia'],
    uncommon: ['Colombia|columbia', 'Uganda', 'Somalia', 'Democratic Republic of the Congo|drc|dr congo|democratic republic of congo|congo kinshasa'],
    rare: ['Gabon', 'Republic of the Congo|congo|republic of congo|congo brazzaville'],
    deep: ['Maldives', 'Kiribati'],
    legendary: ['São Tomé and Príncipe|sao tome|sao tome and principe'],
    notes: {
      'Ecuador': 'Its name is simply the Spanish word for “equator.”',
      'Kiribati': 'Its islands lie in all four hemispheres: north, south, east, and west.',
      'São Tomé and Príncipe': 'The Equator crosses its tiny islet of Ilhéu das Rolas.',
      'Maldives': 'The Equator passes through the sea between its southern atolls.'
    },
    reject: [
      ['equatorial guinea', 'Despite its name, the Equator misses Equatorial Guinea’s land and territorial waters.'],
      ['tanzania|rwanda|burundi|ethiopia|singapore|malaysia', 'Close, but the Equator just misses that country.']
    ]
  });

  P({
    id: 'mediterranean-coast', category: 'Geography',
    prompt: 'Name a UN member country with a coastline on the Mediterranean Sea',
    common: ['Italy', 'Spain', 'France', 'Greece', 'Egypt', 'Turkey|turkiye'],
    uncommon: ['Morocco', 'Libya', 'Tunisia', 'Algeria', 'Israel', 'Lebanon', 'Croatia', 'Cyprus', 'Malta'],
    rare: ['Syria', 'Albania', 'Monaco', 'Montenegro', 'Slovenia'],
    legendary: ['Bosnia and Herzegovina|bosnia|bosnia herzegovina'],
    notes: {
      'Bosnia and Herzegovina': 'Its only coast is about 20 km long, around the town of Neum.',
      'Slovenia': 'Has under 50 km of coastline on the Adriatic, an arm of the Mediterranean.',
      'Morocco': 'Has coasts on both the Mediterranean and the Atlantic.',
      'Malta': 'An island nation right in the middle of the Mediterranean.'
    },
    reject: [
      ['portugal', 'Portugal faces only the Atlantic Ocean.'],
      ['jordan', 'Jordan’s only coast is on the Red Sea, at the Gulf of Aqaba.'],
      ['gibraltar', 'Gibraltar is a British Overseas Territory, not a country.'],
      ['united kingdom|uk|britain|great britain|england', 'The UK itself has no Mediterranean coast. Gibraltar is a British Overseas Territory.'],
      ['bulgaria|serbia|north macedonia|macedonia|san marino|vatican city|switzerland', 'Close, but that country has no Mediterranean coast.']
    ]
  });

  P({
    id: 'oceania-countries', category: 'Geography',
    prompt: 'Name a UN member country in Oceania',
    common: ['Australia', 'New Zealand|nz|aotearoa', 'Fiji'],
    uncommon: ['Papua New Guinea|png', 'Samoa', 'Tonga'],
    rare: ['Solomon Islands', 'Vanuatu', 'Micronesia|federated states of micronesia|fsm', 'Marshall Islands'],
    deep: ['Kiribati', 'Palau', 'Tuvalu'],
    legendary: ['Nauru'],
    notes: {
      'Nauru': 'The world’s smallest island country, only 21 square kilometers.',
      'Papua New Guinea': 'Home to more than 800 languages, more than any other country.',
      'Kiribati': 'Pronounced “KEER-ih-bahss.”',
      'Tuvalu': 'Its highest point is only about 4.6 meters (15 feet) above sea level.'
    },
    reject: [
      ['hawaii|guam|american samoa|northern mariana islands', 'That is part of the United States, not a separate country.'],
      ['new caledonia|french polynesia|tahiti|wallis and futuna', 'That is a French territory, not a UN member country.'],
      ['cook islands|niue|tokelau', 'Linked with New Zealand and not a UN member.'],
      ['indonesia|philippines|east timor|timor leste|japan', 'That country is usually counted as part of Asia.']
    ]
  });

  P({
    id: 'central-america', category: 'Geography',
    prompt: 'Name a country in Central America',
    common: ['Costa Rica', 'Panama', 'Guatemala'],
    uncommon: ['Honduras', 'Nicaragua'],
    rare: ['El Salvador'],
    legendary: ['Belize'],
    notes: {
      'Belize': 'The only Central American country with English as its official language.',
      'El Salvador': 'The smallest Central American country, and the only one with no Caribbean coast.',
      'Costa Rica': 'Abolished its army in 1948.',
      'Panama': 'The Panama Canal links the Atlantic and Pacific Oceans.'
    },
    reject: [
      ['mexico', 'Mexico is in North America but is not usually counted as Central America.'],
      ['cuba|jamaica|haiti|dominican republic|puerto rico|bahamas', 'That is in the Caribbean, not Central America.'],
      ['colombia|venezuela', 'That is in South America.']
    ]
  });

  P({
    id: 'americas-pacific-coast', category: 'Geography',
    prompt: 'Name a country in the Americas with a Pacific Ocean coastline',
    common: ['United States|usa|us|united states of america|america', 'Mexico', 'Chile', 'Peru'],
    uncommon: ['Canada', 'Ecuador', 'Colombia|columbia', 'Panama', 'Costa Rica'],
    rare: ['Guatemala', 'Nicaragua', 'El Salvador'],
    legendary: ['Honduras'],
    notes: {
      'Honduras': 'Reaches the Pacific only through the small Gulf of Fonseca.',
      'Colombia': 'The only South American country with both Pacific and Caribbean coasts.',
      'Chile': 'A ribbon of land about 4,300 km long but, on average, under 200 km wide.'
    },
    reject: [
      ['bolivia', 'Bolivia lost its coast to Chile in the War of the Pacific (1879–1884).'],
      ['belize', 'Belize has only a Caribbean coast.'],
      ['argentina', 'Argentina faces the Atlantic. Chile holds the Pacific side.'],
      ['brazil|venezuela|guyana|suriname|uruguay|paraguay', 'That country does not touch the Pacific.']
    ]
  });

  P({
    id: 'stan-countries', category: 'Geography',
    prompt: 'Name a country whose name ends in -stan',
    common: ['Pakistan', 'Afghanistan', 'Kazakhstan'],
    uncommon: ['Uzbekistan', 'Turkmenistan'],
    rare: ['Tajikistan'],
    legendary: ['Kyrgyzstan|kirghizstan|kirgizstan'],
    notes: {
      'Kazakhstan': 'The largest landlocked country in the world.',
      'Uzbekistan': 'Doubly landlocked: every country around it is landlocked too.',
      'Pakistan': 'Its name was coined in 1933, and the country was founded in 1947.',
      'Kyrgyzstan': 'Most of the country is covered by the Tian Shan mountains.'
    },
    reject: [
      ['kurdistan|balochistan|baluchistan|tatarstan|dagestan|bashkortostan|waziristan|turkestan', 'That is a region, not an independent country.'],
      ['hindustan', 'Hindustan is an old name for India.']
    ]
  });

  P({
    id: 'eu-members', category: 'Geography',
    prompt: 'Name a member country of the European Union',
    common: ['France', 'Germany', 'Italy', 'Spain'],
    uncommon: ['Netherlands|holland', 'Belgium', 'Portugal', 'Greece', 'Ireland', 'Austria', 'Sweden', 'Poland', 'Denmark'],
    rare: ['Finland', 'Czech Republic|czechia', 'Hungary', 'Romania', 'Croatia', 'Bulgaria'],
    deep: ['Slovakia', 'Slovenia', 'Luxembourg', 'Estonia', 'Latvia', 'Lithuania', 'Malta'],
    legendary: ['Cyprus'],
    notes: {
      'Croatia': 'The newest member, joining in 2013.',
      'Malta': 'The smallest EU country by both area and population.',
      'Cyprus': 'Geographically it sits in Asia, off the coast of Turkey and Syria.',
      'Belgium': 'Brussels hosts the main offices of the EU.'
    },
    reject: [
      ['united kingdom|uk|britain|great britain|england|scotland|wales', 'The UK left the European Union in 2020.'],
      ['norway|switzerland|iceland|liechtenstein', 'A close partner of the EU, but not a member.'],
      ['turkey|ukraine|serbia|albania|montenegro|north macedonia|moldova|georgia|bosnia and herzegovina|bosnia', 'That country is an EU candidate, but not a member yet.'],
      ['monaco|san marino|andorra|vatican city|vatican', 'It uses the euro, but it is not an EU member.'],
      ['greenland', 'Greenland left the EU’s forerunner, the European Community, in 1985.']
    ]
  });

  /* ------------------------------------------------------------ CAPITALS */

  P({
    id: 'european-capitals', category: 'Geography',
    prompt: 'Name the capital city of a country in Europe',
    common: ['London', 'Paris', 'Rome|roma', 'Berlin', 'Madrid', 'Moscow', 'Athens'],
    uncommon: ['Dublin', 'Amsterdam', 'Brussels', 'Vienna|wien', 'Lisbon|lisboa', 'Prague|praha', 'Warsaw|warszawa', 'Stockholm', 'Oslo', 'Copenhagen', 'Budapest', 'Kyiv|kiev', 'Helsinki', 'Bern|berne'],
    rare: ['Reykjavík|reykjavik', 'Bucharest', 'Belgrade|beograd', 'Sofia', 'Zagreb', 'Luxembourg|luxembourg city', 'Monaco', 'Vatican City|vatican', 'Minsk', 'Tallinn', 'Riga', 'Vilnius', 'Bratislava', 'Valletta'],
    deep: ['Ljubljana', 'Sarajevo', 'Tirana|tirane', 'Skopje', 'Nicosia', 'San Marino|city of san marino'],
    legendary: ['Podgorica', 'Chișinău|chisinau|kishinev', 'Vaduz', 'Andorra la Vella'],
    notes: {
      'Bern': 'Swiss law never names a capital. Bern is officially the “federal city.”',
      'Reykjavík': 'The northernmost capital of a sovereign country.',
      'Valletta': 'The smallest national capital in the European Union.',
      'Vaduz': 'Capital of Liechtenstein, with only about 6,000 residents.'
    },
    reject: [
      ['pristina|prishtina', 'Kosovo’s status as a country is disputed, so it isn’t counted in this list.'],
      ['the hague|den haag', 'The Dutch government meets in The Hague, but Amsterdam is the capital.'],
      ['geneva|zurich', 'Switzerland’s capital is Bern.'],
      ['ankara', 'Ankara is Turkey’s capital, but it lies in Asia, not Europe.'],
      ['istanbul', 'Istanbul is Turkey’s largest city, but not its capital.'],
      ['edinburgh|cardiff|belfast', 'That is the capital of a part of the UK. The UK’s capital is London.'],
      ['barcelona|milan|munich|saint petersburg|st petersburg|krakow|venice|frankfurt|hamburg|marseille|porto|rotterdam', 'A big city, but not a national capital.']
    ]
  });

  P({
    id: 'south-america-capitals', category: 'Geography',
    prompt: 'Name the capital city of a country in South America',
    common: ['Buenos Aires', 'Lima', 'Brasília|brasilia', 'Bogotá|bogota', 'Santiago|santiago de chile'],
    uncommon: ['Caracas', 'Quito', 'Montevideo'],
    rare: ['La Paz', 'Asunción|asuncion'],
    deep: ['Sucre', 'Georgetown'],
    legendary: ['Paramaribo'],
    notes: {
      'Sucre': 'Bolivia’s constitutional capital. The government sits in La Paz.',
      'Brasília': 'Built from scratch and opened in 1960 to replace Rio de Janeiro.',
      'Quito': 'Sits about 2,850 meters (9,350 feet) above sea level.',
      'Paramaribo': 'Capital of Suriname, with a historic center of Dutch wooden buildings.'
    },
    reject: [
      ['rio de janeiro|rio', 'Rio was Brazil’s capital until 1960. Now it is Brasília.'],
      ['sao paulo', 'Brazil’s biggest city, but not its capital.'],
      ['cayenne', 'Cayenne is the capital of French Guiana, which is part of France.'],
      ['guayaquil|medellin|cordoba|valparaiso|santa cruz', 'A big city, but not a national capital.']
    ]
  });

  P({
    id: 'capital-same-name', category: 'Geography',
    prompt: 'Name a capital city with the same name as its country (adding City is allowed)',
    strip: ['city'],
    common: ['Mexico City|mexico', 'Singapore', 'Vatican City|vatican', 'Monaco'],
    uncommon: ['Panama City|panama', 'Guatemala City|guatemala'],
    rare: ['Kuwait City|kuwait', 'Luxembourg'],
    deep: ['San Marino'],
    legendary: ['Djibouti'],
    notes: {
      'Vatican City': 'The smallest country in the world, entirely inside Rome.',
      'Singapore': 'A city-state: the city and the country are the same place.',
      'Djibouti': 'More than half of the country’s people live in its capital.',
      'Kuwait City': 'Sits on Kuwait Bay at the top of the Persian Gulf.'
    },
    reject: [
      ['andorra|andorra la vella', 'Close! Andorra’s capital is Andorra la Vella, so the names do not fully match.'],
      ['sao tome|sao tome and principe', 'Close! The capital is São Tomé, but the country is São Tomé and Príncipe.'],
      ['tunis|tunisia|algiers|algeria|brasilia|brazil', 'Close, but the names are not quite the same.'],
      ['belize|belize city', 'Belize City is the biggest city, but the capital is Belmopan.'],
      ['new york|new york city', 'New York is not a country.']
    ]
  });

  /* ------------------------------------------------------------ U.S. STATES */

  P({
    id: 'states-mississippi-river', category: 'Geography',
    prompt: 'Name a U.S. state that borders the Mississippi River',
    common: ['Mississippi|ms', 'Louisiana|la', 'Missouri|mo', 'Minnesota|mn'],
    uncommon: ['Illinois|il', 'Iowa|ia', 'Tennessee|tn', 'Arkansas|ar'],
    rare: ['Wisconsin|wi'],
    legendary: ['Kentucky|ky'],
    notes: {
      'Minnesota': 'The river begins at Lake Itasca in northern Minnesota.',
      'Kentucky': 'A loop of the river cuts off the Kentucky Bend, a piece of Kentucky reachable by road only through Tennessee.',
      'Louisiana': 'The river reaches the sea through Louisiana’s huge delta.'
    },
    reject: [
      ['ohio', 'The Ohio River flows into the Mississippi, but the state of Ohio does not touch it.'],
      ['alabama|texas|oklahoma|indiana|kansas|nebraska|michigan|north dakota|south dakota', 'Close, but that state does not touch the Mississippi.']
    ]
  });

  P({
    id: 'states-atlantic-coast', category: 'Geography',
    prompt: 'Name a U.S. state with a coastline on the Atlantic Ocean',
    common: ['Florida|fl', 'New York|ny', 'Maine|me', 'Massachusetts|ma', 'New Jersey|nj', 'North Carolina|nc', 'South Carolina|sc'],
    uncommon: ['Georgia|ga', 'Virginia|va', 'Maryland|md', 'Delaware|de', 'Rhode Island|ri'],
    rare: ['Connecticut|ct'],
    legendary: ['New Hampshire|nh'],
    notes: {
      'New Hampshire': 'Has the shortest ocean coastline of any coastal state, about 13 miles.',
      'Florida': 'Has the longest coastline in the lower 48 states.',
      'Connecticut': 'Its coast faces Long Island Sound, an arm of the Atlantic.'
    },
    reject: [
      ['pennsylvania', 'Philadelphia’s port is on the Delaware River. Pennsylvania has no ocean coast.'],
      ['vermont|west virginia', 'That state is landlocked.'],
      ['washington dc|dc|district of columbia', 'Washington, D.C. is not a state, and it is not on the coast.']
    ]
  });

  P({
    id: 'states-great-lakes', category: 'Geography',
    prompt: 'Name a U.S. state that borders one of the Great Lakes',
    common: ['Michigan|mi', 'Ohio|oh', 'Wisconsin|wi'],
    uncommon: ['Illinois|il', 'New York|ny', 'Minnesota|mn'],
    rare: ['Indiana|in'],
    legendary: ['Pennsylvania|pa'],
    notes: {
      'Michigan': 'Touches four of the five Great Lakes: all but Lake Ontario.',
      'Indiana': 'Has the shortest Great Lakes shoreline, about 45 miles on Lake Michigan.',
      'Pennsylvania': 'Its only Great Lakes shore is a short stretch of Lake Erie around the city of Erie.'
    },
    reject: [
      ['vermont', 'Lake Champlain was briefly named a Great Lake in 1998, but the law was changed weeks later.'],
      ['iowa|kentucky|west virginia|new jersey|missouri|north dakota', 'Close, but that state does not touch a Great Lake.']
    ]
  });

  P({
    id: 'states-two-words', category: 'Geography',
    prompt: 'Name a U.S. state whose name is two words',
    common: ['New York|ny', 'New Jersey|nj', 'North Carolina|nc', 'South Carolina|sc', 'New Mexico|nm'],
    uncommon: ['North Dakota|nd', 'South Dakota|sd'],
    rare: ['West Virginia|wv', 'New Hampshire|nh'],
    legendary: ['Rhode Island|ri'],
    notes: {
      'Rhode Island': 'Until 2020 its official name was “State of Rhode Island and Providence Plantations.”',
      'West Virginia': 'Split from Virginia during the Civil War and became a state in 1863.',
      'New Mexico': 'Became the 47th state in 1912.'
    },
    reject: [
      ['washington dc|district of columbia', 'Washington, D.C. is not a state.'],
      ['new england', 'New England is a region of six states.'],
      ['puerto rico', 'Puerto Rico is a U.S. territory, not a state.']
    ]
  });

  P({
    id: 'appalachian-trail', category: 'Geography',
    prompt: 'Name a U.S. state the Appalachian Trail passes through',
    common: ['Georgia|ga', 'Maine|me', 'Virginia|va', 'North Carolina|nc', 'Tennessee|tn'],
    uncommon: ['Pennsylvania|pa', 'New York|ny', 'New Hampshire|nh', 'Vermont|vt'],
    rare: ['Massachusetts|ma', 'New Jersey|nj', 'Connecticut|ct'],
    deep: ['Maryland|md'],
    legendary: ['West Virginia|wv'],
    notes: {
      'Georgia': 'The trail’s southern end is on Springer Mountain.',
      'Maine': 'The trail ends at the top of Mount Katahdin.',
      'Virginia': 'Has more trail miles than any other state, over 500.',
      'West Virginia': 'Only about 4 miles of the trail lie wholly in West Virginia, around Harpers Ferry.'
    },
    reject: [['kentucky|south carolina|ohio|delaware|rhode island|alabama', 'Close, but the trail does not pass through that state.']]
  });

  P({
    id: 'canada-provinces', category: 'Geography',
    prompt: 'Name a Canadian province or territory',
    common: ['Ontario|on', 'Quebec|qc', 'British Columbia|bc', 'Alberta|ab'],
    uncommon: ['Nova Scotia|ns', 'Manitoba|mb', 'Saskatchewan|sk'],
    rare: ['New Brunswick|nb', 'Newfoundland and Labrador|newfoundland|labrador|nl', 'Prince Edward Island|pei|pe', 'Yukon|yukon territory|yt'],
    deep: ['Northwest Territories|nwt|nt|northwest territory'],
    legendary: ['Nunavut|nu'],
    notes: {
      'Nunavut': 'Canada’s newest and largest territory, created in 1999.',
      'Prince Edward Island': 'The smallest province by both area and population.',
      'Quebec': 'The largest province by area.',
      'Saskatchewan': 'Alberta and Saskatchewan are the only landlocked provinces.'
    },
    reject: [
      ['toronto|vancouver|montreal|ottawa|calgary|edmonton|winnipeg|halifax', 'That is a city. Name the province or territory!'],
      ['alaska', 'Alaska is a U.S. state.'],
      ['greenland', 'Greenland is part of the Kingdom of Denmark.']
    ]
  });

  /* -------------------------------------------------- RIVERS, MOUNTAINS, ETC. */

  P({
    id: 'danube-countries', category: 'Geography',
    prompt: 'Name a country the Danube River flows through or along',
    common: ['Germany', 'Austria', 'Hungary'],
    uncommon: ['Romania', 'Serbia', 'Bulgaria', 'Slovakia'],
    rare: ['Croatia'],
    deep: ['Ukraine'],
    legendary: ['Moldova'],
    notes: {
      'Moldova': 'Owns less than 1 km of Danube riverbank, at Giurgiulești.',
      'Germany': 'The river begins in Germany’s Black Forest.',
      'Hungary': 'Budapest is one of four capitals on the Danube, with Vienna, Bratislava, and Belgrade.',
      'Ukraine': 'Shares the Danube Delta with Romania, where the river meets the Black Sea.'
    },
    reject: [['czech republic|czechia|slovenia|bosnia and herzegovina|bosnia|switzerland|poland|italy|montenegro|france', 'Close, but the Danube itself does not flow through or along that country.']]
  });

  P({
    id: 'alps-countries', category: 'Geography',
    prompt: 'Name a country that the Alps mountains extend into',
    common: ['Switzerland', 'Austria', 'Italy', 'France'],
    uncommon: ['Germany'],
    rare: ['Slovenia', 'Liechtenstein'],
    legendary: ['Monaco'],
    notes: {
      'Austria': 'Has the largest share of the Alps of any country.',
      'Monaco': 'Sits where the foothills of the Maritime Alps drop into the Mediterranean.',
      'Slovenia': 'Its highest peak, Triglav, appears on the national flag.',
      'Germany': 'Its highest mountain, the Zugspitze, is in the Alps.'
    },
    reject: [
      ['spain|andorra', 'Those have the Pyrenees, not the Alps.'],
      ['nepal|norway|czech republic|czechia', 'Mountainous, but not part of the Alps.']
    ]
  });

  P({
    id: 'seven-summits', category: 'Geography',
    prompt: 'Name one of the Seven Summits, the highest mountains on each continent',
    common: ['Mount Everest|everest|mt everest|sagarmatha|chomolungma|qomolangma'],
    uncommon: ['Mount Kilimanjaro|kilimanjaro|mt kilimanjaro', 'Denali|mount mckinley|mt mckinley|mckinley', 'Aconcagua'],
    rare: ['Mount Elbrus|elbrus|mt elbrus'],
    deep: ['Vinson Massif|vinson|mount vinson|mt vinson', 'Mount Kosciuszko|kosciuszko|kosciusko|mt kosciuszko|mount kosciusko'],
    legendary: ['Puncak Jaya|carstensz pyramid|carstensz'],
    notes: {
      'Denali': 'The U.S. federal government changed its official name back to Mount McKinley in 2025; the state of Alaska uses Denali.',
      'Puncak Jaya': 'On the island of New Guinea, it is the highest island mountain in the world.',
      'Mount Kosciuszko': 'Australia’s highest peak is an easy walk compared to the other six.',
      'Mount Elbrus': 'A dormant volcano in Russia’s Caucasus Mountains.'
    },
    reject: [
      ['k2', 'The world’s second-highest mountain, but Everest is Asia’s highest.'],
      ['mont blanc', 'The highest peak in the Alps, but the Seven Summits lists use Elbrus, in the Caucasus, for Europe.'],
      ['mount whitney|whitney', 'The highest peak in the lower 48 U.S. states, not all of North America.'],
      ['mount logan|logan', 'Canada’s highest peak, but Denali is higher.'],
      ['mauna kea', 'Tallest from base to peak, but most of it is underwater, and it is not on the list.'],
      ['matterhorn|mount cook|aoraki|mount fuji|fuji', 'Famous, but not the highest mountain on its continent.']
    ]
  });

  P({
    id: 'volcanoes', category: 'Geography',
    prompt: 'Name a volcano',
    common: ['Mount St. Helens|mt st helens|st helens|saint helens|mount saint helens', 'Mount Vesuvius|vesuvius|mt vesuvius', 'Mount Fuji|fuji|mt fuji|fujisan', 'Mauna Loa', 'Kīlauea|kilauea', 'Mount Etna|etna|mt etna'],
    uncommon: ['Krakatoa|krakatau', 'Mount Pinatubo|pinatubo|mt pinatubo', 'Mauna Kea', 'Mount Kilimanjaro|kilimanjaro|mt kilimanjaro', 'Mount Rainier|rainier|mt rainier', 'Eyjafjallajökull|eyjafjallajokull', 'Yellowstone Caldera|yellowstone|yellowstone supervolcano', 'Stromboli', 'Popocatépetl|popocatepetl|popo'],
    rare: ['Mount Hood|mt hood', 'Mount Shasta|shasta|mt shasta', 'Mount Tambora|tambora', 'Cotopaxi', 'Hekla', 'Mount Pelée|mount pelee|pelee|mt pelee', 'Mount Erebus|erebus|mt erebus', 'Nyiragongo', 'Parícutin|paricutin', 'Santorini|thera', 'Mayon|mount mayon', 'Merapi|mount merapi', 'Haleakalā|haleakala', 'Mount Teide|teide', 'Mount Elbrus|elbrus', 'Mount Ararat|ararat', 'Chimborazo', 'Sakurajima', 'Taal'],
    deep: ['Mount Baker|mt baker', 'Lassen Peak|mount lassen|lassen', 'Mount Adams|mt adams', 'Mount Mazama|mazama', 'Surtsey', 'Soufrière Hills|soufriere hills', 'Mount Damavand|damavand', 'Villarrica', 'Mount Unzen|unzen', 'Mount Ruapehu|ruapehu', 'Hunga Tonga–Hunga Ha‘apai|hunga tonga|hunga tonga hunga haapai', 'Mount Cameroon', 'Grímsvötn|grimsvotn', 'Askja', 'Mount Kenya'],
    legendary: ['Ojos del Salado', 'Klyuchevskaya Sopka|klyuchevskoy|kliuchevskoi', 'Erta Ale', 'Ol Doinyo Lengai', 'Novarupta', 'Laki'],
    notes: {
      'Ojos del Salado': 'On the Chile–Argentina border, it is the highest active volcano on Earth.',
      'Ol Doinyo Lengai': 'Erupts a rare black lava that soon turns white.',
      'Parícutin': 'Grew out of a farmer’s cornfield in Mexico in 1943.',
      'Mauna Loa': 'The largest active volcano on Earth.',
      'Surtsey': 'A new island that rose out of the sea near Iceland in 1963.'
    },
    reject: [['mount everest|everest|k2|denali|matterhorn|mont blanc|mount rushmore|mount whitney', 'A famous mountain, but not a volcano.']]
  });

  P({
    id: 'mountain-ranges', category: 'Geography',
    prompt: 'Name a mountain range',
    strip: ['mountains', 'mountain range', 'range', 'mts'],
    common: ['Rocky Mountains|rockies|rocky', 'Himalayas|himalaya', 'Andes', 'Alps', 'Appalachian Mountains|appalachians|appalachian'],
    uncommon: ['Sierra Nevada', 'Ural Mountains|urals|ural', 'Pyrenees', 'Atlas Mountains|atlas', 'Cascade Range|cascades|cascade', 'Carpathian Mountains|carpathians|carpathian', 'Great Smoky Mountains|smoky mountains|smokies|great smokies|smoky', 'Blue Ridge Mountains|blue ridge'],
    rare: ['Caucasus Mountains|caucasus', 'Apennines|apennine', 'Dolomites', 'Karakoram|karakorum', 'Hindu Kush', 'Great Dividing Range|great dividing', 'Drakensberg', 'Alaska Range', 'Brooks Range', 'Sierra Madre|sierra madre occidental|sierra madre oriental', 'Teton Range|tetons|teton', 'Adirondack Mountains|adirondacks|adirondack', 'Southern Alps', 'Catskill Mountains|catskills|catskill', 'White Mountains', 'Green Mountains', 'Olympic Mountains', 'Black Hills'],
    deep: ['Tian Shan|tien shan', 'Pamir Mountains|pamirs|pamir', 'Altai Mountains|altai|altay', 'Zagros Mountains|zagros', 'Kunlun Mountains|kunlun', 'Rwenzori Mountains|rwenzori|ruwenzori|mountains of the moon', 'Balkan Mountains|balkan|stara planina', 'Scandinavian Mountains|scandes', 'Western Ghats', 'Eastern Ghats', 'Vosges', 'Jura Mountains|jura', 'Tatra Mountains|tatras|tatra', 'Dinaric Alps', 'Wasatch Range|wasatch', 'Coast Mountains', 'Ouachita Mountains|ouachitas|ouachita', 'San Juan Mountains|san juan', 'Sangre de Cristo Mountains|sangre de cristo'],
    legendary: ['Transantarctic Mountains|transantarctic', 'Tibesti Mountains|tibesti', 'Ahaggar Mountains|ahaggar|hoggar', 'Annamite Range|annamites|annamite|truong son', 'Gamburtsev Mountains|gamburtsev', 'Mid-Atlantic Ridge|mid atlantic ridge'],
    notes: {
      'Andes': 'The longest mountain range above water, running about 7,000 km down South America.',
      'Gamburtsev Mountains': 'A mountain range the size of the Alps, buried under the ice of Antarctica.',
      'Mid-Atlantic Ridge': 'Mostly underwater, it is part of the longest mountain range system on Earth.',
      'Rwenzori Mountains': 'Nicknamed the “Mountains of the Moon,” with glaciers right near the Equator.'
    },
    reject: [
      ['mount everest|everest|kilimanjaro|denali|mont blanc|matterhorn|mount fuji', 'That is a single mountain. Name a whole range!'],
      ['great plains', 'The Great Plains are flat grasslands, not mountains.']
    ]
  });

  P({
    id: 'deserts', category: 'Geography',
    prompt: 'Name a desert',
    strip: ['desert'],
    common: ['Sahara', 'Gobi', 'Mojave|mohave', 'Kalahari', 'Atacama', 'Sonoran'],
    uncommon: ['Arabian', 'Antarctic|antarctica|antarctic polar', 'Namib', 'Chihuahuan|chihuahua', 'Great Basin', 'Thar|great indian', 'Painted Desert|painted'],
    rare: ['Taklamakan|taklimakan', 'Great Victoria', 'Great Sandy', 'Simpson', 'Patagonian|patagonia', 'Syrian', 'Negev', 'Arctic|arctic polar', 'Karakum|kara kum|garagum', 'Kyzylkum|kyzyl kum', 'Rub’ al Khali|rub al khali|empty quarter', 'Colorado', 'Black Rock', 'Libyan', 'Nubian', 'Danakil'],
    deep: ['Gibson', 'Tanami', 'Dasht-e Kavir|dasht e kavir|kavir|great salt desert', 'Dasht-e Lut|dasht e lut|lut', 'Ordos', 'Judaean|judean', 'Sinai', 'Monte', 'Red Desert|red'],
    legendary: ['Tabernas', 'Strzelecki', 'Chalbi', 'Sechura', 'Alvord'],
    notes: {
      'Antarctic': 'The largest desert on Earth: deserts are defined by low rainfall, not heat.',
      'Sahara': 'The largest hot desert, about the size of the United States.',
      'Atacama': 'One of the driest places on Earth; some weather stations there have never recorded rain.',
      'Tabernas': 'Often called Europe’s only true desert. Many Western movies were filmed there.'
    },
    reject: [
      ['death valley', 'Death Valley is a valley inside the Mojave Desert. Name the desert!'],
      ['sahel', 'The Sahel is a dry grassland belt south of the Sahara, not a desert.'],
      ['outback', 'The Outback is a huge region of Australia that contains several deserts.']
    ]
  });

  P({
    id: 'waterfalls', category: 'Geography',
    prompt: 'Name a waterfall',
    strip: ['falls', 'fall', 'waterfall'],
    common: ['Niagara Falls|niagara', 'Victoria Falls|victoria|mosi oa tunya', 'Angel Falls|angel|kerepakupai meru', 'Iguazu Falls|iguazu|iguacu|iguassu'],
    uncommon: ['Yosemite Falls|yosemite', 'Horseshoe Falls|horseshoe', 'Multnomah Falls|multnomah', 'Gullfoss', 'Bridalveil Fall|bridal veil|bridalveil'],
    rare: ['Kaieteur Falls|kaieteur', 'Tugela Falls|tugela', 'Skógafoss|skogafoss', 'Seljalandsfoss', 'Dettifoss', 'Rhine Falls|rhine|rheinfall', 'Havasu Falls|havasu', 'Lower Yellowstone Falls|yellowstone falls|yellowstone|lower yellowstone', 'Snoqualmie Falls|snoqualmie', 'Shoshone Falls|shoshone', 'American Falls|american', 'Sutherland Falls|sutherland', 'Ruby Falls|ruby', 'Akaka Falls|akaka'],
    deep: ['Jog Falls|jog', 'Kegon Falls|kegon', 'Krimml Falls|krimml', 'Detian Falls|detian|ban gioc', 'Blue Nile Falls|blue nile|tis abay', 'Murchison Falls|murchison', 'Dunn’s River Falls|dunns river', 'Burney Falls|burney', 'Cumberland Falls|cumberland', 'Palouse Falls|palouse'],
    legendary: ['Gocta Falls|gocta', 'Khone Phapheng Falls|khone phapheng|khone', 'Huangguoshu Falls|huangguoshu'],
    notes: {
      'Angel Falls': 'The world’s tallest uninterrupted waterfall: 979 meters high, with a single plunge of 807 meters.',
      'Victoria Falls': 'Its local name, Mosi-oa-Tunya, means “The Smoke That Thunders.”',
      'Horseshoe Falls': 'The biggest of the three falls that make up Niagara Falls.',
      'Gocta Falls': 'One of the world’s tallest, but outsiders barely knew about it until 2005.'
    },
    reject: [['hoover dam|grand coulee dam', 'A dam, not a waterfall.']]
  });

  P({
    id: 'rivers-europe', category: 'Geography',
    prompt: 'Name a river in Europe',
    strip: ['river'],
    common: ['Danube|donau|river danube', 'Thames|river thames', 'Rhine|rhein|river rhine', 'Seine|river seine', 'Volga|river volga'],
    uncommon: ['Loire', 'Rhône|rhone', 'Elbe', 'Po', 'Tiber|tevere', 'Ebro', 'Tagus|tejo|tajo', 'Dnieper|dnipro|dnepr', 'Shannon|river shannon', 'Severn|river severn', 'Vistula|wisla'],
    rare: ['Oder|odra', 'Don', 'Garonne', 'Dordogne', 'Meuse|maas', 'Moselle|mosel', 'Main', 'Arno', 'Douro|duero', 'Guadalquivir', 'Mersey|river mersey', 'Tyne|river tyne', 'Clyde|river clyde', 'Liffey|river liffey', 'Avon|river avon', 'Trent|river trent', 'Spree', 'Vltava|moldau', 'Dniester|nistru', 'Somme', 'Marne'],
    deep: ['Scheldt|schelde|escaut', 'Neckar', 'Weser', 'Inn', 'Isar', 'Adige', 'Sava', 'Drava|drau', 'Tisza|tisa', 'Morava', 'Daugava|western dvina', 'Neman|nemunas|memel', 'Kama', 'Neva', 'Prut', 'Ruhr', 'Saône|saone', 'Tay|river tay', 'Ural', 'Guadiana', 'Minho|mino'],
    legendary: ['Glomma', 'Kemijoki', 'Northern Dvina', 'Pechora', 'Spey|river spey'],
    notes: {
      'Volga': 'Europe’s longest river, flowing about 3,500 km to the Caspian Sea.',
      'Shannon': 'The longest river in Ireland and in all of the British Isles.',
      'Glomma': 'Norway’s longest river.',
      'Danube': 'Flows through four capital cities: Vienna, Bratislava, Budapest, and Belgrade.'
    },
    reject: [['nile|amazon|mississippi|yangtze|ganges|congo|zambezi|mekong|hudson|jordan|euphrates|tigris', 'A famous river, but not in Europe.']]
  });

  P({
    id: 'rivers-us', category: 'Geography',
    prompt: 'Name a river in the United States',
    strip: ['river'],
    common: ['Mississippi', 'Missouri', 'Colorado', 'Hudson', 'Ohio', 'Rio Grande'],
    uncommon: ['Columbia', 'Snake', 'Tennessee', 'Arkansas', 'Potomac', 'Red', 'Delaware', 'Yukon', 'Platte', 'Susquehanna', 'Sacramento', 'Connecticut', 'Chicago', 'Charles'],
    rare: ['Illinois', 'Kansas', 'Alabama', 'Kentucky', 'Minnesota', 'Wisconsin', 'Iowa', 'Yellowstone', 'Gila', 'Pecos', 'Brazos', 'Savannah', 'James', 'Allegheny', 'Monongahela', 'Wabash', 'Cumberland', 'Shenandoah', 'Willamette', 'San Joaquin', 'Niagara', 'St. Lawrence|saint lawrence', 'St. Johns|saint johns', 'Suwannee', 'Chattahoochee', 'Mohawk', 'Kanawha'],
    deep: ['Atchafalaya', 'Tombigbee', 'Kuskokwim', 'Niobrara', 'Klamath', 'Salmon', 'Deschutes', 'Merrimack', 'Penobscot', 'Kennebec', 'Housatonic', 'Rappahannock', 'Roanoke', 'Yazoo', 'Cuyahoga', 'Kalamazoo', 'Sabine', 'Apalachicola'],
    legendary: ['Altamaha', 'Loxahatchee', 'Androscoggin', 'Tanana', 'Owyhee'],
    notes: {
      'Missouri': 'The longest river in the U.S., a little longer than the Mississippi.',
      'Rio Grande': 'Forms part of the border between the U.S. and Mexico.',
      'Chicago': 'Engineers reversed its flow in 1900, and it is dyed green every St. Patrick’s Day.',
      'Cuyahoga': 'Its 1969 fire helped inspire the first Earth Day and the Clean Water Act.'
    },
    reject: [['nile|amazon|thames|danube|yangtze|ganges|congo|volga|seine|rhine', 'A famous river, but not in the United States.']]
  });

  /* ------------------------------------------------------ ISLANDS & LAKES */

  P({
    id: 'hawaiian-islands', category: 'Geography',
    prompt: 'Name one of the eight main Hawaiian Islands',
    common: ['Maui', 'O‘ahu|oahu', 'Hawai‘i|big island|hawaii island|island of hawaii'],
    uncommon: ['Kaua‘i|kauai'],
    rare: ['Moloka‘i|molokai', 'Lāna‘i|lanai'],
    deep: ['Ni‘ihau|niihau'],
    legendary: ['Kaho‘olawe|kahoolawe'],
    notes: {
      'Hawai‘i': 'The Big Island is larger than all the other Hawaiian Islands combined.',
      'O‘ahu': 'Home to Honolulu and most of the state’s people.',
      'Ni‘ihau': 'Called “the Forbidden Island” because it is privately owned and closed to most visitors.',
      'Kaho‘olawe': 'The smallest of the eight, uninhabited and once used for military bombing practice.'
    },
    reject: [
      ['honolulu|hilo|waikiki|pearl harbor|kona', 'That is a place on one of the islands, not an island itself.'],
      ['midway|guam|tahiti|samoa', 'Not one of the eight main Hawaiian Islands.']
    ]
  });

  P({
    id: 'canary-islands', category: 'Geography',
    prompt: 'Name one of the Canary Islands',
    common: ['Tenerife', 'Gran Canaria'],
    uncommon: ['Lanzarote', 'Fuerteventura'],
    rare: ['La Palma'],
    deep: ['La Gomera|gomera', 'El Hierro|hierro'],
    legendary: ['La Graciosa|graciosa'],
    notes: {
      'Tenerife': 'Home to Mount Teide, the highest peak in Spain.',
      'La Palma': 'A volcano there erupted for almost three months in 2021.',
      'La Graciosa': 'Officially recognized as the eighth Canary Island in 2018.',
      'La Gomera': 'People there still use Silbo Gomero, a whistled language.'
    },
    reject: [
      ['madeira|azores', 'Those are Portuguese islands, not the Canaries.'],
      ['mallorca|majorca|ibiza|menorca|minorca|formentera', 'That is one of Spain’s Balearic Islands, in the Mediterranean.']
    ]
  });

  P({
    id: 'mediterranean-islands', category: 'Geography',
    prompt: 'Name an island in the Mediterranean Sea',
    common: ['Sicily|sicilia', 'Sardinia|sardegna', 'Corsica|corse', 'Crete|kriti', 'Cyprus', 'Malta'],
    uncommon: ['Mallorca|majorca', 'Ibiza', 'Menorca|minorca', 'Rhodes|rodos', 'Santorini|thera', 'Corfu|kerkyra', 'Mykonos', 'Capri', 'Elba'],
    rare: ['Gozo', 'Lesvos|lesbos', 'Naxos', 'Kos', 'Ischia', 'Lampedusa', 'Formentera', 'Stromboli', 'Hvar', 'Djerba|jerba', 'Zakynthos|zante', 'Kefalonia|cephalonia', 'Chios', 'Samos', 'Paros'],
    deep: ['Lipari', 'Korčula|korcula', 'Brač|brac', 'Krk', 'Euboea|evia', 'Ithaca|ithaki', 'Delos', 'Patmos', 'Vis', 'Procida', 'Giglio'],
    legendary: ['Comino', 'Pantelleria', 'Mljet', 'Kastellorizo|megisti', 'Gavdos'],
    notes: {
      'Sicily': 'The largest island in the Mediterranean.',
      'Gavdos': 'Its southern tip is often called the southernmost point of Europe.',
      'Elba': 'Napoleon was exiled here in 1814, and escaped the next year.',
      'Stromboli': 'Erupts so often that sailors call it the “Lighthouse of the Mediterranean.”'
    },
    reject: [
      ['canary islands|tenerife|madeira|azores|gran canaria', 'Those islands are in the Atlantic Ocean.'],
      ['balearic islands|balearics|cyclades|dodecanese', 'That is a group of islands. Name a single island!'],
      ['gibraltar', 'Gibraltar is a peninsula, not an island.']
    ]
  });

  P({
    id: 'lakes-africa', category: 'Geography',
    prompt: 'Name a lake in Africa',
    common: ['Lake Victoria|victoria', 'Lake Tanganyika|tanganyika', 'Lake Malawi|malawi|lake nyasa|nyasa|lake niassa'],
    uncommon: ['Lake Chad|chad', 'Lake Turkana|turkana|lake rudolf', 'Lake Kivu|kivu', 'Lake Albert|albert', 'Lake Nasser|nasser'],
    rare: ['Lake Volta|volta', 'Lake Kariba|kariba', 'Lake Tana|tana', 'Lake Edward|edward', 'Lake Kyoga|kyoga', 'Lake Natron|natron', 'Lake Nakuru|nakuru', 'Lake Naivasha|naivasha'],
    deep: ['Lake Mweru|mweru', 'Lake Bangweulu|bangweulu', 'Lake Rukwa|rukwa', 'Lake Manyara|manyara', 'Lake Abaya|abaya', 'Lake Bogoria|bogoria'],
    legendary: ['Lake Assal|assal', 'Lake Retba|retba|lac rose|pink lake', 'Lake Bosumtwi|bosumtwi'],
    notes: {
      'Lake Victoria': 'Africa’s largest lake, shared by Uganda, Kenya, and Tanzania.',
      'Lake Tanganyika': 'The longest freshwater lake in the world and the second deepest.',
      'Lake Assal': 'In Djibouti, its shore is the lowest point in Africa, about 155 meters below sea level.',
      'Lake Retba': 'A lake in Senegal that turns pink because of salt-loving algae.',
      'Lake Bosumtwi': 'Fills a crater left by a meteorite impact about a million years ago.'
    },
    reject: [
      ['lake titicaca|titicaca', 'Lake Titicaca is in South America.'],
      ['lake baikal|baikal|caspian sea|caspian', 'That lake is in Asia or Europe, not Africa.'],
      ['nile|congo|zambezi|niger', 'That is a river, not a lake.'],
      ['victoria falls', 'Victoria Falls is a waterfall. Try Lake Victoria!']
    ]
  });

  /* -------------------------------------------------------- WORLD LANGUAGES */

  P({
    id: 'spanish-official', category: 'Geography',
    prompt: 'Name a country where Spanish is an official or national language',
    common: ['Mexico', 'Spain', 'Argentina', 'Colombia|columbia', 'Cuba', 'Peru'],
    uncommon: ['Chile', 'Venezuela', 'Ecuador', 'Bolivia', 'Guatemala', 'Dominican Republic', 'Costa Rica', 'Panama', 'Uruguay'],
    rare: ['Paraguay', 'Honduras', 'Nicaragua', 'El Salvador'],
    legendary: ['Equatorial Guinea'],
    notes: {
      'Equatorial Guinea': 'The only African country where Spanish is an official language.',
      'Mexico': 'Has more Spanish speakers than any other country, including Spain.',
      'Paraguay': 'Guaraní, an Indigenous language, is also official and spoken by most people.',
      'Bolivia': 'Recognizes Spanish and 36 Indigenous languages as official.'
    },
    reject: [
      ['brazil', 'Brazilians speak Portuguese.'],
      ['portugal', 'Portugal’s language is Portuguese.'],
      ['puerto rico', 'Spanish is official in Puerto Rico, but it is a U.S. territory, not a country.'],
      ['united states|usa|us|america', 'The U.S. has tens of millions of Spanish speakers, but Spanish is not an official national language.'],
      ['belize', 'Many people in Belize speak Spanish, but its official language is English.'],
      ['philippines', 'Spanish lost its official status in the Philippines in 1987.'],
      ['andorra', 'Andorra’s only official language is Catalan.']
    ]
  });

  P({
    id: 'portuguese-official', category: 'Geography',
    prompt: 'Name a country where Portuguese is an official language',
    common: ['Brazil|brasil', 'Portugal'],
    uncommon: ['Angola', 'Mozambique'],
    rare: ['Cape Verde|cabo verde', 'Guinea-Bissau|guinea bissau'],
    deep: ['East Timor|timor leste|timor', 'São Tomé and Príncipe|sao tome|sao tome and principe'],
    legendary: ['Equatorial Guinea'],
    notes: {
      'Brazil': 'Home to far more Portuguese speakers than Portugal itself.',
      'East Timor': 'Portuguese shares official status with Tetum, a local language.',
      'Equatorial Guinea': 'Added Portuguese around 2010, alongside Spanish and French.',
      'Mozambique': 'Portuguese is official, but many people grow up speaking Bantu languages like Makhuwa.'
    },
    reject: [
      ['macau|macao', 'Portuguese is official in Macau, but Macau is a region of China, not a country.'],
      ['goa', 'Goa is a state in India and a former Portuguese colony.'],
      ['spain', 'Spain’s language is Spanish, not Portuguese.']
    ]
  });

})(window.UT = window.UT || {});
