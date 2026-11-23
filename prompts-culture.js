/* Undertow prompts: culture. Uses UT.P() from js/prompts.js. */
(function (UT) {
  'use strict';
  var P = UT.P;

  /* Helpers for prompts that need many regular aliases. */

  // English monarchs: "Henry VIII" also accepts "Henry 8", "Henry the Eighth", "Henry 8th", "King Henry VIII".
  var ROM = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
  var ORD = ['', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth'];
  var SUF = ['', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];
  function mon(title, name, n, extra) {
    return [
      name + ' ' + ROM[n], name + ' ' + n, name + ' the ' + ORD[n],
      name + ' ' + SUF[n], name + ' the ' + SUF[n], title + ' ' + name + ' ' + ROM[n]
    ].concat(extra || []).join('|');
  }

  // Battles: "Saratoga" also accepts "Battle of Saratoga" (for every alias).
  function bat(list) {
    return list.map(function (e) {
      var p = e.split('|');
      var extra = p.filter(function (x) { return !/^siege of |expedition$/i.test(x); });
      return p.concat(extra.map(function (x) { return 'battle of ' + x; })).join('|');
    });
  }

  /* ------------------------------------------------------------ HISTORY */

  P({
    id: 'thirteen-colonies', category: 'History',
    prompt: 'Name one of the original 13 American colonies',
    common: ['Virginia', 'Massachusetts|massachusetts bay|massachusetts bay colony', 'New York', 'Pennsylvania'],
    uncommon: ['Georgia', 'New Jersey', 'Maryland', 'Connecticut'],
    rare: ['Rhode Island|rhode island and providence plantations', 'Delaware', 'North Carolina'],
    deep: ['South Carolina'],
    legendary: ['New Hampshire'],
    notes: {
      'Georgia': 'The last of the 13 colonies to be founded, in 1732.',
      'Delaware': 'The first state to ratify the U.S. Constitution, in 1787.',
      'Rhode Island': 'The last of the 13 to ratify the Constitution, in 1790.',
      'Pennsylvania': 'King Charles II named it in honor of William Penn’s father, an admiral.'
    },
    reject: [
      ['carolina|carolinas', 'Carolina split into two colonies. Name North or South Carolina!'],
      ['maine', 'Maine was part of Massachusetts until it became a state in 1820.'],
      ['vermont', 'Vermont was not one of the 13. It joined in 1791 as the 14th state.'],
      ['plymouth|plymouth colony', 'Plymouth Colony merged into Massachusetts in 1691.'],
      ['florida|ohio|kentucky|tennessee|west virginia', 'Not one of the original 13 colonies.']
    ]
  });

  P({
    id: 'henry-viii-wives', category: 'History',
    prompt: 'Name one of the six wives of King Henry VIII',
    common: ['Anne Boleyn|boleyn|ann boleyn'],
    uncommon: ['Catherine of Aragon|katherine of aragon|katharine of aragon|aragon', 'Jane Seymour|seymour|jane'],
    rare: ['Catherine Parr|katherine parr|kateryn parr|parr'],
    deep: ['Catherine Howard|katherine howard|kathryn howard|howard'],
    legendary: ['Anne of Cleves|ann of cleves|cleves'],
    notes: {
      'Catherine Parr': 'She outlived Henry and later remarried.',
      'Jane Seymour': 'Mother of Henry’s only legitimate son to survive infancy, the future Edward VI.',
      'Anne of Cleves': 'Their marriage was annulled after about six months, and she stayed on good terms with Henry.',
      'Catherine of Aragon': 'Mother of Mary I, and married to Henry for about 24 years.'
    },
    reject: [
      ['catherine|katherine|katharine|kathryn', 'Henry married three Catherines! Add a last name.'],
      ['anne|ann', 'Henry married two Annes! Add a last name.'],
      ['elizabeth|mary|elizabeth i|mary i|edward|edward vi', 'That is one of Henry’s children, not a wife.']
    ]
  });

  P({
    id: 'greek-philosophers', category: 'History',
    prompt: 'Name an ancient Greek philosopher',
    common: ['Socrates', 'Plato', 'Aristotle'],
    uncommon: ['Pythagoras', 'Diogenes|diogenes of sinope', 'Epicurus', 'Thales|thales of miletus', 'Heraclitus'],
    rare: ['Democritus', 'Parmenides', 'Zeno of Elea', 'Zeno of Citium', 'Hypatia', 'Epictetus', 'Protagoras', 'Empedocles', 'Anaximander', 'Xenophon'],
    deep: ['Anaxagoras', 'Anaximenes', 'Xenophanes', 'Leucippus', 'Gorgias', 'Antisthenes', 'Plotinus', 'Pyrrho|pyrrho of elis', 'Theophrastus', 'Chrysippus'],
    legendary: ['Aristippus', 'Cleanthes', 'Crates of Thebes|crates', 'Hipparchia', 'Porphyry', 'Proclus', 'Speusippus', 'Carneades', 'Philolaus'],
    notes: {
      'Socrates': 'He wrote nothing himself; we know his ideas mainly through his student Plato.',
      'Aristotle': 'He tutored the young Alexander the Great.',
      'Diogenes': 'Said to have lived in a large ceramic jar in Athens.',
      'Hypatia': 'A mathematician and philosopher who taught in Alexandria, Egypt, around AD 400.'
    },
    reject: [
      ['zeno', 'There were two famous Zenos! Try Zeno of Elea or Zeno of Citium.'],
      ['archimedes|euclid|hippocrates|homer|herodotus|thucydides|sophocles|aesop|alexander the great|pericles', 'A famous ancient Greek, but not usually called a philosopher.'],
      ['marcus aurelius|seneca|cicero|lucretius|confucius', 'A great philosopher, but not an ancient Greek one.']
    ]
  });

  P({
    id: 'declaration-signers', category: 'History',
    prompt: 'Name a signer of the Declaration of Independence',
    common: ['John Hancock|hancock', 'Benjamin Franklin|franklin|ben franklin', 'Thomas Jefferson|jefferson', 'John Adams'],
    uncommon: ['Samuel Adams|sam adams', 'Roger Sherman|sherman', 'Richard Henry Lee', 'Benjamin Rush|rush'],
    rare: ['Elbridge Gerry|gerry', 'Caesar Rodney|rodney', 'John Witherspoon|witherspoon', 'Benjamin Harrison|harrison', 'Robert Morris', 'James Wilson|wilson', 'Button Gwinnett|gwinnett', 'George Wythe|wythe', 'Edward Rutledge|rutledge', 'Charles Carroll|charles carroll of carrollton|carroll', 'Samuel Chase|chase', 'Stephen Hopkins|hopkins', 'Francis Hopkinson|hopkinson'],
    deep: ['Josiah Bartlett|bartlett', 'Robert Treat Paine|robert paine', 'Oliver Wolcott|wolcott', 'Philip Livingston|livingston', 'Richard Stockton|stockton', 'Thomas McKean|mckean', 'George Read|read', 'Thomas Nelson Jr.|thomas nelson|nelson', 'Francis Lightfoot Lee', 'Lyman Hall|hall', 'George Walton|walton', 'Arthur Middleton|middleton', 'William Whipple|whipple', 'Matthew Thornton|thornton', 'William Floyd|floyd', 'Lewis Morris', 'Francis Lewis|lewis'],
    legendary: ['William Ellery|ellery', 'Samuel Huntington|huntington', 'William Williams|williams', 'John Hart|hart', 'Abraham Clark|clark', 'John Morton|morton', 'George Clymer|clymer', 'James Smith|smith', 'George Taylor|taylor', 'George Ross|ross', 'William Paca|paca', 'Thomas Stone|stone', 'Carter Braxton|braxton', 'William Hooper|hooper', 'Joseph Hewes|hewes', 'John Penn', 'Thomas Heyward Jr.|thomas heyward|heyward', 'Thomas Lynch Jr.|thomas lynch|lynch'],
    notes: {
      'John Hancock': 'His signature was so large that "John Hancock" now means any signature.',
      'Button Gwinnett': 'His autographs are so rare that they are among the most valuable of any American.',
      'Charles Carroll': 'The last surviving signer; he died in 1832.',
      'John Witherspoon': 'The only active clergyman to sign.',
      'Caesar Rodney': 'Rode through a stormy night to Philadelphia to cast Delaware’s deciding vote for independence.'
    },
    reject: [
      ['adams', 'Two Adamses signed: John and his cousin Samuel. Add a first name!'],
      ['lee', 'Two Lees signed: the brothers Richard Henry Lee and Francis Lightfoot Lee. Use a full name!'],
      ['morris', 'Two Morrises signed: Robert Morris and Lewis Morris. Add a first name!'],
      ['george washington|washington', 'Washington was leading the Continental Army and did not sign the Declaration.'],
      ['alexander hamilton|hamilton|james madison|madison', 'He did not sign the Declaration, though he did sign the Constitution.'],
      ['thomas paine', 'He wrote Common Sense but did not sign. (Robert Treat Paine did!)'],
      ['robert livingston|robert r livingston', 'He helped draft it but did not sign. (His relative Philip Livingston did!)'],
      ['patrick henry', 'Famous for "Give me liberty, or give me death!", but he did not sign.'],
      ['paul revere', 'Famous for his midnight ride, but he did not sign.']
    ]
  });

  P({
    id: 'roman-emperors', category: 'History',
    prompt: 'Name an emperor of the Roman Empire who ruled before AD 476',
    common: ['Augustus|octavian|octavius|caesar augustus', 'Nero', 'Caligula'],
    uncommon: ['Marcus Aurelius', 'Hadrian', 'Constantine|constantine the great|constantine i', 'Tiberius', 'Claudius', 'Commodus'],
    rare: ['Trajan', 'Vespasian', 'Titus', 'Domitian', 'Diocletian', 'Caracalla', 'Septimius Severus', 'Antoninus Pius', 'Theodosius I|theodosius the great|theodosius 1', 'Julian|julian the apostate', 'Romulus Augustulus'],
    deep: ['Galba', 'Otho', 'Vitellius', 'Nerva', 'Lucius Verus', 'Pertinax', 'Elagabalus|heliogabalus', 'Severus Alexander|alexander severus', 'Aurelian', 'Valerian', 'Maximian', 'Valentinian I|valentinian 1', 'Valens', 'Honorius', 'Constantius II'],
    legendary: ['Didius Julianus', 'Geta', 'Macrinus', 'Maximinus Thrax', 'Gordian III', 'Philip the Arab', 'Decius', 'Gallienus', 'Claudius Gothicus|claudius ii', 'Probus', 'Carus', 'Galerius', 'Licinius', 'Jovian', 'Arcadius', 'Constantius I|constantius chlorus', 'Gratian', 'Majorian', 'Theodosius II|theodosius 2', 'Valentinian II|valentinian 2', 'Valentinian III|valentinian 3', 'Maxentius', 'Constans', 'Julius Nepos'],
    notes: {
      'Caligula': 'His nickname means "little boots," after the small soldier’s boots he wore as a child.',
      'Hadrian': 'He built a wall across northern Britain that still partly stands today.',
      'Diocletian': 'One of the few emperors to retire, reportedly to grow cabbages.',
      'Romulus Augustulus': 'Usually called the last Western Roman emperor; he was deposed in 476.'
    },
    reject: [
      ['julius caesar|caesar|julius', 'Julius Caesar ruled as dictator but was never emperor. His adopted heir Augustus was the first.'],
      ['constantius', 'Two emperors were named Constantius. Add a number: Constantius I or II!'],
      ['theodosius', 'Two emperors named Theodosius ruled before 476. Add a number: Theodosius I or II!'],
      ['valentinian', 'Three emperors named Valentinian ruled before 476. Add a number: Valentinian I, II, or III!'],
      ['romulus|remus', 'In legend, Romulus founded Rome as its first king, long before the emperors. (If you mean the last Western emperor, type Romulus Augustulus!)'],
      ['justinian|charlemagne|constantine xi|basil ii', 'That ruler reigned after AD 476, so they fall outside this prompt.'],
      ['cleopatra|mark antony|marc antony|pompey|spartacus|cicero', 'A famous figure from Roman times, but never an emperor.']
    ]
  });

  P({
    id: 'english-monarchs', category: 'History',
    prompt: 'Name a monarch of England or the United Kingdom who reigned from 1066 onward',
    common: [mon('Queen', 'Elizabeth', 2), mon('King', 'Henry', 8), 'Victoria|queen victoria', mon('Queen', 'Elizabeth', 1, ['the virgin queen', 'good queen bess']), mon('King', 'Charles', 3)],
    uncommon: [mon('King', 'William', 1, ['william the conqueror', 'the conqueror']), mon('King', 'Richard', 1, ['richard the lionheart', 'richard the lionhearted', 'lionheart']), 'John|king john', mon('King', 'Charles', 1), mon('King', 'George', 3), mon('King', 'Henry', 5), mon('King', 'Richard', 3), mon('Queen', 'Mary', 1, ['bloody mary'])],
    rare: [mon('King', 'Edward', 6), mon('King', 'James', 1), mon('King', 'Charles', 2), mon('King', 'George', 6), mon('King', 'Edward', 8), mon('King', 'George', 5), mon('King', 'Edward', 7), 'Anne|queen anne', mon('King', 'Henry', 7), mon('King', 'Edward', 1, ['longshanks']), mon('King', 'William', 4)],
    deep: [mon('King', 'Henry', 2), mon('King', 'Edward', 3), mon('King', 'Henry', 4), mon('King', 'Henry', 6), mon('King', 'Edward', 4), mon('King', 'George', 1), mon('King', 'George', 2), mon('King', 'George', 4), mon('King', 'James', 2), mon('King', 'William', 3, ['william of orange']), mon('Queen', 'Mary', 2), mon('King', 'Richard', 2), 'Stephen|king stephen', mon('King', 'William', 2, ['william rufus', 'rufus'])],
    legendary: [mon('King', 'Henry', 1), mon('King', 'Henry', 3), mon('King', 'Edward', 2), mon('King', 'Edward', 5), 'Lady Jane Grey|jane grey|queen jane|lady jane'],
    notes: {
      'Edward V': 'One of the "Princes in the Tower," he reigned for about two months in 1483 and was never crowned.',
      'Lady Jane Grey': 'Known as the Nine Days’ Queen (1553). Some lists of monarchs leave her out.',
      'Victoria': 'Reigned for over 63 years, a record beaten only by Elizabeth II.',
      'Stephen': 'His reign (1135–1154) was so chaotic it is remembered as "the Anarchy."',
      'Edward VIII': 'Gave up the throne in 1936 after less than a year.'
    },
    reject: [
      ['henry|king henry', 'There were eight King Henrys! Add a number, like Henry VIII.'],
      ['edward|king edward', 'There have been eight King Edwards since 1066. Add a number!'],
      ['george|king george', 'There were six King Georges. Add a number!'],
      ['william|king william', 'There were four King Williams. Add a number!'],
      ['richard|king richard', 'There were three King Richards. Add a number!'],
      ['charles|king charles', 'There have been three King Charleses. Add a number!'],
      ['elizabeth|queen elizabeth', 'There have been two Queen Elizabeths. Add a number!'],
      ['mary|queen mary', 'Two Queen Marys reigned. Add a number!'],
      ['james|king james', 'There were two King Jameses of England. Add a number!'],
      ['william and mary', 'They ruled together! Name one at a time: William III or Mary II.'],
      ['alfred|alfred the great|harold|harold ii|harold godwinson|canute|cnut|athelstan|edward the confessor|aethelred|ethelred', 'That king ruled before William the Conqueror arrived in 1066.'],
      ['oliver cromwell|cromwell|richard cromwell', 'Cromwell ruled as Lord Protector, not as king.'],
      ['mary queen of scots', 'She was Queen of Scotland, but never ruled England.'],
      ['matilda|empress matilda', 'Matilda fought for the throne in the 1100s but was never crowned, so she is not usually counted.'],
      ['robert the bruce|macbeth', 'That was a king of Scotland, not England.'],
      ['arthur|king arthur', 'King Arthur is a legend, not a historical monarch.']
    ]
  });

  P({
    id: 'ancient-civilizations', category: 'History',
    prompt: 'Name a civilization or people of the ancient world (before AD 500)',
    strip: ['civilization', 'civilisation', 'empire', 'people', 'culture'],
    common: ['Egyptians|ancient egypt|egypt', 'Greeks|ancient greece|greece|greek|spartans|sparta|athenians', 'Romans|ancient rome|rome', 'Maya|mayans|mayan', 'Chinese|ancient china|china'],
    uncommon: ['Mesopotamians|mesopotamia', 'Sumerians|sumer', 'Babylonians|babylon|babylonia', 'Persians|persia|achaemenids|achaemenid', 'Phoenicians|phoenicia', 'Celts|celtic', 'Olmecs', 'Ancient India|india|maurya|mauryans|gupta|guptas'],
    rare: ['Assyrians|assyria', 'Hittites', 'Minoans', 'Indus Valley|harappans|indus', 'Carthaginians|carthage|punic', 'Etruscans|etruria', 'Israelites|hebrews|ancient israel', 'Akkadians|akkad', 'Mycenaeans|mycenae', 'Kush|kushites|nubians|nubia|kingdom of kush', 'Huns', 'Gauls|gaul', 'Goths|visigoths|ostrogoths'],
    deep: ['Aksum|axum|aksumites', 'Scythians', 'Parthians|parthia', 'Nabataeans|nabateans', 'Zapotecs', 'Teotihuacan', 'Moche', 'Nazca|nasca', 'Nok', 'Lydians|lydia', 'Elamites|elam', 'Sasanians|sassanids|sasanids|sassanians', 'Vandals', 'Thracians', 'Byzantines|byzantium'],
    legendary: ['Norte Chico|caral|caral supe', 'Sabaeans|saba|sheba', 'Mitanni', 'Urartu|urartians', 'Chavín|chavin de huantar', 'Hyksos', 'Amorites', 'Hurrians', 'Sea Peoples', 'Philistines', 'Jōmon|jomon period', 'Dacians'],
    notes: {
      'Sumerians': 'They developed cuneiform, one of the world’s first writing systems.',
      'Kush': 'The kings of Kush, in what is now Sudan, built more pyramids than ancient Egypt did.',
      'Olmecs': 'Famous for giant carved stone heads.',
      'Norte Chico': 'One of the oldest civilizations in the Americas, building cities in Peru nearly 5,000 years ago.',
      'Lydians': 'Credited with minting some of the world’s first coins.'
    },
    reject: [
      ['aztecs|aztec|inca|incas|inka|vikings|viking|mongols|mongol|ottomans|ottoman|normans', 'A great civilization, but it rose after AD 500.']
    ]
  });

  P({
    id: 'historical-empires', category: 'History',
    prompt: 'Name an empire from history',
    strip: ['empire', 'dynasty', 'caliphate'],
    common: ['Roman Empire|rome|romans', 'Ottoman Empire|ottomans', 'British Empire', 'Mongol Empire|mongols', 'Persian Empire|persia|persians|achaemenid'],
    uncommon: ['Byzantine Empire|byzantium|eastern roman', 'Aztec Empire|aztecs|mexica', 'Inca Empire|incas|inka|tawantinsuyu', 'Holy Roman Empire', 'Mali Empire', 'Mughal Empire|mughals|mogul', 'Chinese Empire|imperial china', 'Spanish Empire', 'Russian Empire|imperial russia', 'French Empire|napoleonic empire|napoleonic', 'Egyptian Empire|ancient egypt|egyptians|egypt'],
    rare: ['Songhai Empire|songhay', 'Ghana Empire|wagadu', 'Maurya Empire|mauryan', 'Gupta Empire', 'Austro-Hungarian Empire|austria-hungary', 'Portuguese Empire', 'German Empire', 'Empire of Japan|japanese empire|imperial japan|japanese', 'Babylonian Empire|babylonians|babylon', 'Assyrian Empire|assyrians|assyria|neo-assyrian', 'Carolingian Empire|frankish empire', 'Khmer Empire|angkor', 'Macedonian Empire|alexander’s empire', 'Han dynasty', 'Qing dynasty|manchu'],
    deep: ['Akkadian Empire|akkadians|akkad', 'Seleucid Empire|seleucids', 'Parthian Empire|parthians|parthia|arsacid', 'Sasanian Empire|sassanid|sasanid|sassanian', 'Umayyad Caliphate|umayyads', 'Abbasid Caliphate|abbasids', 'Kushan Empire|kushans', 'Benin Empire|kingdom of benin', 'Ashanti Empire|asante', 'Vijayanagara Empire|vijayanagar', 'Timurid Empire|timurids', 'Safavid Empire|safavids', 'Ethiopian Empire|abyssinia', 'Aksumite Empire|aksum|axum', 'Hittite Empire|hittites', 'Tang dynasty', 'Ming dynasty', 'Dutch Empire', 'Empire of Brazil|brazilian empire', 'Austrian Empire', 'Hunnic Empire|huns', 'Carthaginian Empire|carthage|carthaginians'],
    legendary: ['Majapahit Empire', 'Srivijaya', 'Chola Empire|cholas', 'Kanem-Bornu Empire|kanem|bornu', 'Tibetan Empire', 'Golden Horde', 'Latin Empire', 'Wari Empire|huari', 'Oyo Empire', 'Maratha Empire|marathas', 'Sikh Empire'],
    notes: {
      'Mongol Empire': 'The largest connected land empire in history.',
      'Mali Empire': 'Its ruler Mansa Musa is often called one of the richest people who ever lived.',
      'Holy Roman Empire': 'Voltaire joked that it was neither holy, nor Roman, nor an empire.',
      'Ghana Empire': 'The modern country of Ghana took its name from this West African empire.'
    },
    reject: [
      ['galactic empire|empire strikes back', 'That one is from Star Wars!']
    ]
  });

  P({
    id: 'age-of-exploration', category: 'History',
    prompt: 'Name an explorer whose famous voyages took place between 1400 and 1700',
    common: ['Christopher Columbus|columbus|cristoforo colombo|cristobal colon', 'Ferdinand Magellan|magellan|fernao de magalhaes|magalhaes', 'Vasco da Gama|da gama'],
    uncommon: ['Henry Hudson|hudson', 'Francis Drake|drake|sir francis drake', 'Amerigo Vespucci|vespucci', 'Hernán Cortés|cortes|cortez|hernando cortes|hernando cortez', 'Juan Ponce de León|ponce de leon|ponce', 'Hernando de Soto|de soto', 'Jacques Cartier|cartier', 'John Cabot|giovanni caboto'],
    rare: ['Francisco Pizarro|pizarro', 'Vasco Núñez de Balboa|balboa', 'Samuel de Champlain|champlain', 'Bartolomeu Dias|dias|diaz|bartholomew diaz|bartolomeu diaz', 'Walter Raleigh|raleigh|ralegh|sir walter raleigh', 'Francisco Vázquez de Coronado|coronado', 'Zheng He|cheng ho', 'Abel Tasman|tasman', 'Giovanni da Verrazzano|verrazzano|verrazano', 'Pedro Álvares Cabral|cabral', 'Juan Sebastián Elcano|elcano|del cano|juan sebastian del cano'],
    deep: ['Álvar Núñez Cabeza de Vaca|cabeza de vaca', 'Francisco de Orellana|orellana', 'Martin Frobisher|frobisher', 'Willem Barentsz|barentsz|barents', 'Sebastian Cabot', 'Juan Rodríguez Cabrillo|cabrillo', 'Jacques Marquette|marquette|pere marquette', 'Louis Jolliet|jolliet|joliet', 'René-Robert Cavelier de La Salle|la salle|lasalle', 'Thomas Cavendish|cavendish', 'Diogo Cão'],
    legendary: ['Estevanico|esteban|estebanico', 'William Baffin|baffin', 'John Davis|davis', 'Luis Váez de Torres|torres', 'Willem Janszoon|janszoon|jansz', 'Pedro Fernandes de Queirós|queiros|quiros', 'Álvaro de Mendaña|mendana', 'Dirk Hartog|hartog', 'Jean Nicolet|nicolet', 'Étienne Brûlé|brule', 'John Smith|captain john smith', 'William Dampier|dampier'],
    notes: {
      'Ferdinand Magellan': 'He died in the Philippines in 1521; Juan Sebastián Elcano led the survivors home, completing the first voyage around the world.',
      'Zheng He': 'Led huge Chinese treasure fleets across the Indian Ocean in the early 1400s.',
      'Amerigo Vespucci': 'The Americas are named after him.',
      'Willem Janszoon': 'In 1606 he made the first recorded European landing in Australia.',
      'Estevanico': 'A Moroccan-born explorer who crossed much of what is now Texas and Mexico in the 1530s.'
    },
    reject: [
      ['marco polo|polo', 'Marco Polo traveled in the late 1200s, before 1400.'],
      ['leif erikson|leif ericson|leif eriksson|leif|erik the red', 'The Norse reached North America around AD 1000, long before 1400.'],
      ['james cook|captain cook|cook', 'Captain Cook’s voyages were in the 1760s and 1770s, after 1700.'],
      ['lewis and clark|meriwether lewis|william clark|sacagawea', 'The Lewis and Clark expedition was in 1804–1806, after 1700.'],
      ['ibn battuta', 'Ibn Battuta traveled in the 1300s, just before this time window.'],
      ['henry the navigator|prince henry', 'He sponsored many Portuguese voyages but did not sail on them himself.'],
      ['cabot', 'Two Cabots explored: John and his son Sebastian. Add a first name!'],
      ['neil armstrong|amelia earhart', 'A famous explorer, but from the 20th century!']
    ]
  });

  P({
    id: 'revolutionary-battles', category: 'History',
    prompt: 'Name a battle of the American Revolutionary War',
    common: bat(['Lexington and Concord|lexington|concord', 'Bunker Hill|breeds hill', 'Yorktown|siege of yorktown', 'Saratoga|freemans farm|bemis heights']),
    uncommon: bat(['Trenton', 'Princeton', 'Brandywine|brandywine creek', 'Long Island|brooklyn|brooklyn heights', 'Fort Ticonderoga|ticonderoga']),
    rare: bat(['Germantown', 'Monmouth|monmouth court house', 'Cowpens', 'Camden', 'Kings Mountain', 'Guilford Court House|guilford courthouse|guilford', 'Quebec', 'Charleston|siege of charleston', 'Siege of Boston|boston', 'Bennington', 'White Plains']),
    deep: bat(['Savannah|siege of savannah', 'Moores Creek Bridge|moores creek', 'Oriskany', 'Harlem Heights', 'Fort Washington', 'Stony Point', 'Eutaw Springs', 'Sullivan’s Island|fort moultrie', 'Paoli', 'Great Bridge', 'Hubbardton', 'Fort Stanwix|siege of fort stanwix', 'Chesapeake|the chesapeake|virginia capes|chesapeake capes']),
    legendary: bat(['Blue Licks', 'Newtown', 'Penobscot Expedition|penobscot', 'Fort Mifflin|siege of fort mifflin', 'Green Spring', 'Hobkirk’s Hill', 'Ninety Six|siege of ninety six', 'Waxhaws', 'Cooch’s Bridge', 'Valcour Island|valcour bay', 'Fort Griswold|groton heights', 'Flamborough Head']),
    notes: {
      'Bunker Hill': 'Most of the fighting actually took place on nearby Breed’s Hill.',
      'Saratoga': 'The American victory in 1777 helped convince France to join the war.',
      'Trenton': 'Came right after Washington’s famous crossing of the Delaware River on Christmas night, 1776.',
      'Cooch’s Bridge': 'The only significant Revolutionary War battle fought on Delaware soil.',
      'Flamborough Head': 'A sea battle where John Paul Jones reportedly said, "I have not yet begun to fight!"'
    },
    reject: [
      ['valley forge', 'Valley Forge was the army’s winter camp, not a battle.'],
      ['boston tea party|boston massacre', 'An event that led up to the war, but not a battle.'],
      ['gettysburg|antietam|bull run|fort sumter|vicksburg|shiloh', 'That battle was in the Civil War (1861–1865).'],
      ['new orleans', 'The Battle of New Orleans was in the War of 1812.'],
      ['alamo', 'The Alamo was in the Texas Revolution of 1836.']
    ]
  });

  /* ------------------------------------------------------------ CIVICS */

  P({
    id: 'government-words', category: 'Civics',
    prompt: 'Name a word for a type of rule or government ending in -cracy or -archy',
    common: ['Democracy', 'Monarchy'],
    uncommon: ['Autocracy', 'Theocracy', 'Oligarchy', 'Aristocracy', 'Anarchy'],
    rare: ['Plutocracy', 'Technocracy', 'Meritocracy', 'Bureaucracy', 'Kleptocracy'],
    deep: ['Gerontocracy', 'Diarchy|dyarchy', 'Tetrarchy', 'Ochlocracy|mobocracy', 'Stratocracy', 'Timocracy', 'Kakistocracy', 'Polyarchy', 'Patriarchy', 'Matriarchy'],
    legendary: ['Triarchy', 'Heptarchy', 'Thalassocracy', 'Gynarchy|gynocracy|gynecocracy', 'Ethnocracy', 'Pentarchy'],
    notes: {
      'Anarchy': 'Literally means "without a ruler": a society with no government at all.',
      'Patriarchy': 'Literally means "rule by the father."',
      'Ochlocracy': 'Rule by a mob, from the Greek word "ochlos," meaning crowd.',
      'Thalassocracy': 'A state whose power comes from ruling the seas, like the ancient Minoans.',
      'Tetrarchy': 'Rule by four people, like the system Diocletian set up for the Roman Empire.',
      'Kakistocracy': 'Means rule by the worst or least qualified people.'
    },
    reject: [
      ['hierarchy', 'It ends in -archy, but today it usually means a ranking system rather than a type of government.'],
      ['republic|dictatorship|communism|socialism|federalism|tyranny|totalitarianism', 'A real form of government or idea, but it doesn’t end in -cracy or -archy!']
    ]
  });

  /* ------------------------------------------------------------ MYTHOLOGY */

  P({
    id: 'norse-gods', category: 'Mythology',
    prompt: 'Name a god or goddess from Norse mythology',
    common: ['Odin|woden|wotan|odinn|othin', 'Thor|donar|thunor', 'Loki'],
    uncommon: ['Freya|freyja|freja', 'Frigg|frigga|frija', 'Baldur|balder|baldr', 'Tyr|tiw|tiwaz', 'Heimdall|heimdallr|heimdal'],
    rare: ['Freyr|frey|yngvi', 'Hel|hela', 'Njord|njordr|njorth', 'Idun|idunn|iduna', 'Bragi', 'Sif'],
    deep: ['Vidar|vidarr', 'Vali', 'Hodr|hod|hoder|hodur', 'Forseti', 'Ullr|ull|uller', 'Skadi|skathi', 'Mimir', 'Hoenir'],
    legendary: ['Nanna', 'Sigyn', 'Gefjon|gefion|gefjun', 'Hermod|hermodr', 'Eir', 'Fulla', 'Saga', 'Sol|sunna', 'Snotra', 'Lofn', 'Jord|jorth'],
    notes: {
      'Tyr': 'Tuesday is named after him (Tiw’s day).',
      'Heimdall': 'Guardian of the rainbow bridge Bifröst, said to be able to hear grass growing.',
      'Idun': 'Keeper of the golden apples that keep the gods young.',
      'Sigyn': 'Loki’s loyal wife, who held a bowl to catch the venom dripping onto him.'
    },
    reject: [
      ['zeus|jupiter|apollo|hera|athena|poseidon|ares|mars', 'That god is from Greek or Roman mythology, not Norse.'],
      ['fenrir|fenris|jormungandr|sleipnir|ymir|surtr|surt|valkyrie|huginn|muninn', 'A famous figure from Norse myths, but not one of the gods.'],
      ['asgard|valhalla|yggdrasil|bifrost|midgard', 'That is a place in Norse myth, not a god.']
    ]
  });

  P({
    id: 'egyptian-gods', category: 'Mythology',
    prompt: 'Name a god or goddess of ancient Egypt',
    common: ['Ra|re', 'Anubis', 'Osiris', 'Isis', 'Horus'],
    uncommon: ['Set|seth|sutekh', 'Thoth|djehuty', 'Bastet|bast', 'Hathor', 'Amun|amon|amen|amun ra|amon ra|amen ra'],
    rare: ['Ptah', 'Sobek', 'Sekhmet|sakhmet', 'Nut', 'Geb', 'Maat', 'Nephthys', 'Aten|aton', 'Khonsu|khons'],
    deep: ['Shu', 'Tefnut', 'Atum', 'Khnum', 'Bes', 'Taweret|tawaret|taueret', 'Hapi', 'Apep|apophis', 'Montu', 'Neith', 'Wadjet', 'Nekhbet', 'Min', 'Mut'],
    legendary: ['Serket|selket|serqet', 'Heqet|heket', 'Meretseger', 'Wepwawet|upuaut', 'Renenutet', 'Seshat', 'Anuket|anukis', 'Satet|satis', 'Khepri|khepera', 'Apis'],
    notes: {
      'Thoth': 'The ibis-headed god of writing and wisdom.',
      'Taweret': 'A hippopotamus goddess who protected mothers and babies.',
      'Bes': 'A dwarf god who guarded homes and children.',
      'Aten': 'The sun disk, worshipped above all other gods under the pharaoh Akhenaten.'
    },
    reject: [
      ['sphinx|cleopatra|tutankhamun|tutankhamen|king tut|ramesses|ramses|nefertiti|akhenaten|pharaoh', 'A famous name from ancient Egypt, but not one of the gods.'],
      ['zeus|odin|thor|jupiter|ishtar|marduk', 'That god belongs to a different mythology.']
    ]
  });

  P({
    id: 'roman-gods', category: 'Mythology',
    prompt: 'Name a god or goddess from Roman mythology',
    common: ['Jupiter|jove', 'Mars', 'Venus', 'Neptune', 'Mercury'],
    uncommon: ['Juno', 'Minerva', 'Pluto|dis|dis pater', 'Apollo', 'Diana', 'Cupid|amor', 'Vulcan', 'Saturn', 'Bacchus'],
    rare: ['Ceres', 'Vesta', 'Janus', 'Aurora', 'Fortuna', 'Faunus', 'Sol|sol invictus', 'Luna', 'Terra|tellus|terra mater', 'Victoria', 'Proserpina|proserpine'],
    deep: ['Bellona', 'Quirinus', 'Flora', 'Pomona', 'Portunus', 'Somnus', 'Orcus', 'Nox', 'Concordia', 'Pax', 'Terminus', 'Vertumnus|vortumnus', 'Ops', 'Liber'],
    legendary: ['Cardea', 'Carmenta', 'Consus', 'Feronia', 'Robigus', 'Laverna', 'Mater Matuta|matuta', 'Spes', 'Fides', 'Juturna'],
    notes: {
      'Janus': 'The two-faced god of doorways and beginnings; January is named after him.',
      'Vesta': 'Her sacred fire in Rome was tended by priestesses called the Vestals.',
      'Terminus': 'The god of boundary stones.',
      'Cardea': 'The goddess of door hinges.'
    },
    reject: [
      ['zeus|hera|ares|aphrodite|poseidon|hermes|athena|artemis|hades|hephaestus|dionysus|demeter|hestia|eros|persephone|cronus|kronos', 'That is the Greek name. Try its Roman counterpart!'],
      ['odin|thor|loki|anubis|osiris', 'That god belongs to a different mythology.']
    ]
  });

  P({
    id: 'nine-muses', category: 'Mythology',
    prompt: 'Name one of the nine Muses of Greek mythology',
    common: ['Calliope|kalliope', 'Clio|kleio'],
    uncommon: ['Thalia|thaleia', 'Terpsichore'],
    rare: ['Urania|ourania', 'Erato', 'Melpomene'],
    deep: ['Euterpe'],
    legendary: ['Polyhymnia|polymnia'],
    notes: {
      'Calliope': 'Muse of epic poetry, often called the chief of the Muses.',
      'Clio': 'Muse of history.',
      'Terpsichore': 'Muse of dance; "terpsichorean" means having to do with dancing.',
      'Urania': 'Muse of astronomy.',
      'Polyhymnia': 'Muse of sacred hymns.'
    },
    reject: [
      ['mnemosyne', 'She is the mother of the Muses, not one of them.'],
      ['apollo', 'Apollo led the Muses, but he was not one of them.'],
      ['zeus', 'Zeus was the Muses’ father.'],
      ['aglaea|euphrosyne|clotho|lachesis|atropos', 'That is one of the Graces or Fates, not a Muse.']
    ]
  });

  P({
    id: 'greek-monsters', category: 'Mythology',
    prompt: 'Name a monster or mythical creature from Greek mythology',
    common: ['Medusa', 'Minotaur', 'Cyclops|cyclopes', 'Pegasus', 'Hydra|lernaean hydra'],
    uncommon: ['Centaur', 'Cerberus|kerberos', 'Sphinx', 'Harpy|harpies', 'Siren', 'Chimera|chimaera', 'Satyr', 'Gorgon'],
    rare: ['Scylla', 'Charybdis', 'Typhon', 'Echidna', 'Nemean Lion', 'Python', 'Talos', 'Argus|argus panoptes', 'Polyphemus', 'Phoenix'],
    deep: ['Ladon', 'Stymphalian Birds', 'Erymanthian Boar', 'Calydonian Boar', 'Cretan Bull', 'Geryon', 'Orthrus|orthos', 'Lamia', 'Empusa|empousa', 'Hippocampus|hippocamp', 'Griffin|gryphon|griffon', 'Cetus|ketos', 'Hecatoncheires|hundred handed ones|hundred handers'],
    legendary: ['Khalkotauroi|colchian bulls|bronze bulls', 'Teumessian Fox', 'Ceryneian Hind', 'Colchian Dragon', 'Caucasian Eagle', 'Campe|kampe', 'Ophiotaurus', 'Ichthyocentaur'],
    notes: {
      'Charybdis': 'A deadly whirlpool facing the monster Scylla, so sailors had to pass between the two.',
      'Talos': 'A giant bronze man who guarded the island of Crete.',
      'Argus': 'A giant with a hundred eyes; Hera placed his eyes on the peacock’s tail.',
      'Echidna': 'Half woman, half serpent, and called the "Mother of Monsters."'
    },
    reject: [
      ['kraken|troll|yeti|bigfoot|loch ness monster|nessie|werewolf|vampire|leprechaun|banshee', 'A famous creature, but not from Greek mythology.'],
      ['zeus|hades|poseidon|athena', 'That is a god, not a monster!'],
      ['hercules|heracles|perseus|theseus|odysseus', 'That is a hero who fought monsters, not a monster!']
    ]
  });

  P({
    id: 'trojan-war', category: 'Mythology',
    prompt: 'Name a mortal warrior who fought in the Trojan War',
    common: ['Achilles', 'Hector', 'Odysseus|ulysses'],
    uncommon: ['Agamemnon', 'Menelaus', 'Paris', 'Patroclus|patroklos', 'Ajax the Great|ajax|aias|telamonian ajax|great ajax', 'Aeneas'],
    rare: ['Diomedes', 'Nestor', 'Philoctetes|philoktetes', 'Neoptolemus|pyrrhus', 'Penthesilea', 'Sarpedon', 'Ajax the Lesser|lesser ajax|locrian ajax|little ajax'],
    deep: ['Memnon', 'Troilus', 'Idomeneus', 'Teucer', 'Glaucus', 'Deiphobus', 'Pandarus', 'Antilochus', 'Palamedes', 'Protesilaus', 'Rhesus'],
    legendary: ['Polydamas', 'Machaon', 'Podalirius', 'Meriones', 'Menestheus', 'Euphorbus', 'Agenor', 'Helenus'],
    notes: {
      'Philoctetes': 'Left behind on an island because of a festering wound, he later returned and killed Paris with Heracles’ bow.',
      'Penthesilea': 'An Amazon queen who fought for Troy and was slain by Achilles.',
      'Protesilaus': 'The first Greek to leap ashore at Troy, and the first to die.',
      'Nestor': 'The oldest and wisest of the Greek kings at Troy.'
    },
    reject: [
      ['helen|helen of troy|priam|cassandra|hecuba|andromache|penelope', 'Part of the story, but not known as a warrior.'],
      ['zeus|apollo|athena|ares|aphrodite|hera|poseidon', 'The gods took sides, but name a mortal warrior!'],
      ['heracles|hercules|perseus|theseus|jason', 'A great hero, but from an earlier generation than the Trojan War.'],
      ['trojan horse|horse', 'That was the famous trick, not a warrior!']
    ]
  });

  P({
    id: 'chinese-zodiac', category: 'Culture',
    prompt: 'Name one of the 12 animals of the Chinese zodiac',
    common: ['Dragon', 'Tiger', 'Rat|mouse', 'Monkey'],
    uncommon: ['Snake|serpent', 'Horse', 'Dog', 'Pig|boar|hog'],
    rare: ['Ox|cow|bull|buffalo|water buffalo', 'Rabbit|hare|bunny'],
    deep: ['Rooster|chicken|hen|cockerel'],
    legendary: ['Goat|sheep|ram'],
    notes: {
      'Rat': 'In the legend of the Great Race, the clever Rat rode on the Ox’s back and jumped ahead to finish first.',
      'Horse': 'The Lunar New Year on February 17, 2026, began a Year of the Horse.',
      'Goat': 'The Chinese word yáng can mean goat or sheep, so both names are used.',
      'Pig': 'The last of the 12 animals to finish the Great Race.'
    },
    reject: [
      ['cat', 'In legend the Cat missed the race. (Vietnam’s zodiac does have a Cat in place of the Rabbit!)'],
      ['lion|panda|elephant|fish|bear|crane|turtle', 'Not one of the 12 zodiac animals.']
    ]
  });

  /* ------------------------------------------------------------ LITERATURE */

  P({
    id: 'arthurian-legend', category: 'Literature',
    prompt: 'Name a character from the Arthurian legends',
    common: ['Arthur|king arthur', 'Merlin', 'Lancelot|launcelot|sir lancelot', 'Guinevere|guenevere|gwenhwyfar|queen guinevere'],
    uncommon: ['Morgan le Fay|morgan|morgana|morgan la fee', 'Galahad|sir galahad', 'Gawain|gawaine|sir gawain|gwalchmai', 'Mordred|modred|medraut', 'Lady of the Lake|nimue|viviane|vivien|vivienne|nineve', 'Uther Pendragon|uther'],
    rare: ['Percival|perceval|parzival|parsifal|peredur|sir percival', 'Tristan|tristram|sir tristan', 'Isolde|iseult|isolt|yseult', 'Kay|sir kay', 'Bedivere|bedwyr|sir bedivere', 'Igraine|ygraine|igerna', 'Elaine of Astolat|lady of shalott|elaine of shalott', 'Green Knight|bertilak|bercilak'],
    deep: ['Bors|sir bors', 'Gareth|sir gareth', 'Gaheris', 'Agravain', 'Lamorak', 'Pellinore|king pellinore', 'Ector|sir ector', 'Morgause', 'Palamedes', 'Ywain|yvain|owain|sir ywain', 'King Lot|lot', 'King Mark|mark'],
    legendary: ['Dagonet', 'Balin', 'Balan', 'Lucan', 'Galehaut|galehault', 'Lynette|linet', 'Elaine of Corbenic', 'Fisher King'],
    notes: {
      'Dagonet': 'King Arthur’s court jester, knighted as a joke.',
      'Bedivere': 'In many versions, he is the knight who returns Excalibur to the lake.',
      'Galahad': 'The purest of the knights, who achieves the Holy Grail.',
      'Green Knight': 'He challenges Gawain to a beheading game in a famous 14th-century poem.'
    },
    reject: [
      ['excalibur|camelot|round table|avalon|holy grail|grail|tintagel', 'Part of the legend, but not a character.'],
      ['robin hood|beowulf|maid marian|little john', 'A legendary hero, but from a different set of stories.']
    ]
  });

  P({
    id: 'grimm-tales', category: 'Literature',
    prompt: 'Name a fairy tale collected by the Brothers Grimm',
    common: ['Hansel and Gretel', 'Snow White|little snow white|snow white and the seven dwarfs', 'Rapunzel', 'Cinderella|aschenputtel', 'Little Red Riding Hood|red riding hood|little red cap', 'Rumpelstiltskin|rumplestiltskin'],
    uncommon: ['Sleeping Beauty|little briar rose|briar rose|brier rose', 'The Frog Prince|frog king', 'The Elves and the Shoemaker|shoemaker and the elves', 'The Bremen Town Musicians|town musicians of bremen|musicians of bremen'],
    rare: ['The Twelve Dancing Princesses|dancing princesses|shoes that were danced to pieces', 'The Golden Goose', 'The Fisherman and His Wife', 'The Goose Girl', 'Snow-White and Rose-Red|rose red', 'The Valiant Little Tailor|brave little tailor|seven at one blow|little tailor', 'The Wolf and the Seven Young Kids|wolf and the seven little kids|wolf and the seven kids'],
    deep: ['Mother Holle|mother hulda|frau holle', 'The Six Swans', 'The Seven Ravens', 'The Twelve Brothers', 'Brother and Sister|little brother and little sister', 'The Juniper Tree', 'Iron John|iron hans', 'The Water of Life', 'The Golden Bird', 'Sweet Porridge|magic porridge pot', 'King Thrushbeard', 'Hans in Luck', 'Thumbling'],
    legendary: ['Allerleirauh|all kinds of fur|thousandfurs', 'Jorinde and Joringel', 'The Devil with the Three Golden Hairs|devil with three golden hairs|three golden hairs', 'Godfather Death', 'The Girl Without Hands|handless maiden|maiden without hands', 'The Singing Bone', 'The Star Money|star talers|star coins', 'The Three Spinners'],
    notes: {
      'The Frog Prince': 'Story number 1 in the Grimms’ collection. In their version the princess throws the frog against a wall instead of kissing it.',
      'Rapunzel': 'Named after a leafy plant (rampion) that her mother craved.',
      'Cinderella': 'In the Grimm version, Aschenputtel, a hazel tree on her mother’s grave helps her instead of a fairy godmother.',
      'Sweet Porridge': 'A magic pot cooks so much porridge that it floods the whole town.'
    },
    reject: [
      ['little mermaid|ugly duckling|thumbelina|snow queen|princess and the pea|emperors new clothes|little match girl|steadfast tin soldier', 'That one is by Hans Christian Andersen, not the Grimms.'],
      ['goldilocks|goldilocks and the three bears|jack and the beanstalk|three little pigs', 'That is an English fairy tale, not one from the Grimms.'],
      ['beauty and the beast', 'That tale comes from France.'],
      ['aladdin|pinocchio|peter pan', 'A classic story, but not from the Brothers Grimm.']
    ]
  });

  P({
    id: 'dickens-novels', category: 'Literature',
    prompt: 'Name a novel or novella by Charles Dickens',
    common: ['A Christmas Carol', 'Oliver Twist', 'Great Expectations'],
    uncommon: ['A Tale of Two Cities', 'David Copperfield'],
    rare: ['Bleak House', 'Hard Times', 'Nicholas Nickleby|nickleby', 'The Pickwick Papers|pickwick|posthumous papers of the pickwick club', 'Little Dorrit', 'The Old Curiosity Shop'],
    deep: ['Our Mutual Friend', 'Martin Chuzzlewit|chuzzlewit', 'Dombey and Son|dombey', 'Barnaby Rudge', 'The Mystery of Edwin Drood|edwin drood'],
    legendary: ['The Chimes', 'The Cricket on the Hearth', 'The Battle of Life', 'The Haunted Man|the haunted man and the ghosts bargain'],
    notes: {
      'A Christmas Carol': 'Dickens wrote it in about six weeks, and it was published in December 1843.',
      'The Mystery of Edwin Drood': 'Left unfinished when Dickens died in 1870, so no one knows how the mystery ends.',
      'The Pickwick Papers': 'His first novel, published in monthly parts in 1836–37.',
      'The Chimes': 'His second Christmas book, written the year after A Christmas Carol.'
    },
    reject: [
      ['pride and prejudice|jane eyre|wuthering heights|frankenstein|treasure island|dracula|little women|secret garden|moby dick', 'A classic, but not by Charles Dickens.'],
      ['scrooge|ebenezer scrooge|pip|tiny tim|fagin|artful dodger', 'That is a Dickens character. Name the book!']
    ]
  });

  P({
    id: 'poetic-forms', category: 'Literature',
    prompt: 'Name a form or type of poem',
    strip: ['poem', 'poetry'],
    common: ['Haiku', 'Sonnet', 'Limerick'],
    uncommon: ['Free verse', 'Acrostic', 'Ode', 'Ballad', 'Epic', 'Elegy', 'Cinquain', 'Concrete poem|shape poem|calligram|visual poem'],
    rare: ['Villanelle', 'Tanka', 'Blank verse', 'Narrative poem', 'Lyric poem', 'Diamante', 'Epitaph', 'Epigram', 'Spoken word|slam poetry|slam'],
    deep: ['Sestina', 'Ghazal', 'Pantoum', 'Rondeau', 'Triolet', 'Terza rima', 'Clerihew', 'Senryu', 'Ottava rima', 'Dramatic monologue', 'Aubade', 'Prose poem'],
    legendary: ['Renga', 'Ballade', 'Rondel', 'Rubaiyat|rubai', 'Kyrielle', 'Virelai', 'Golden shovel', 'Nonet'],
    notes: {
      'Clerihew': 'A funny four-line poem about a person, named after its inventor, Edmund Clerihew Bentley.',
      'Villanelle': '19 lines with two repeating refrains, as in Dylan Thomas’s "Do not go gentle into that good night."',
      'Sestina': 'Six stanzas that reuse the same six end-words in a rotating pattern, plus a short final stanza.',
      'Golden shovel': 'Invented by Terrance Hayes: each line ends with a word from a line by another poet, Gwendolyn Brooks in the original.'
    },
    reject: [
      ['rhyme|stanza|verse|line|meter|metre|rhythm', 'That is a part or feature of a poem, not a whole form.']
    ]
  });

  /* ------------------------------------------------------------ LANGUAGE */

  P({
    id: 'parts-of-speech', category: 'Language',
    prompt: 'Name a part of speech in English grammar',
    common: ['Noun|proper noun|common noun', 'Verb', 'Adjective'],
    uncommon: ['Adverb', 'Pronoun'],
    rare: ['Preposition', 'Conjunction'],
    deep: ['Interjection|exclamation', 'Article'],
    legendary: ['Determiner'],
    notes: {
      'Interjection': 'Words like "wow" and "ouch" that express sudden feeling.',
      'Conjunction': 'FANBOYS (for, and, nor, but, or, yet, so) are the coordinating conjunctions.',
      'Determiner': 'A modern grammar category that includes articles plus words like "this," "some," and "every."'
    },
    reject: [
      ['subject|predicate|object|clause|phrase|sentence', 'That is a part of a sentence, not a part of speech.'],
      ['participle|gerund|infinitive', 'That is a form of a verb, not usually counted as its own part of speech in English.']
    ]
  });

  P({
    id: 'punctuation-marks', category: 'Language',
    prompt: 'Name a punctuation mark',
    common: ['Period|full stop', 'Comma', 'Question mark', 'Exclamation point|exclamation mark'],
    uncommon: ['Apostrophe', 'Colon', 'Semicolon', 'Quotation marks|quotes|quote marks|inverted commas|speech marks', 'Hyphen', 'Parentheses|parenthesis|round brackets|brackets'],
    rare: ['Dash|em dash', 'Ellipsis|ellipses|dot dot dot', 'Square brackets', 'Slash|forward slash|solidus|virgule|oblique'],
    deep: ['Curly brackets|braces|curly braces', 'Angle brackets|chevrons', 'En dash', 'Guillemets|angle quotes'],
    legendary: ['Interrobang', 'Inverted question mark', 'Inverted exclamation mark|inverted exclamation point'],
    notes: {
      'Interrobang': 'A combined ?! mark invented in 1962 by advertising executive Martin Speckter.',
      'Inverted question mark': 'Used in Spanish to open a question, as in ¿Qué?',
      'Guillemets': 'The « » marks used as quotation marks in French and many other languages.',
      'Semicolon': 'Joins two closely related complete sentences.'
    },
    reject: [
      ['at sign|hashtag|hash|pound sign|dollar sign|percent sign|ampersand', 'That is a symbol, not usually counted as a punctuation mark.']
    ]
  });

  P({
    id: 'figures-of-speech', category: 'Language',
    prompt: 'Name a figure of speech',
    common: ['Simile', 'Metaphor', 'Personification', 'Hyperbole|exaggeration', 'Onomatopoeia', 'Alliteration'],
    uncommon: ['Oxymoron', 'Pun|paronomasia', 'Irony|verbal irony', 'Euphemism', 'Understatement|meiosis'],
    rare: ['Assonance', 'Consonance', 'Synecdoche', 'Metonymy', 'Paradox', 'Rhetorical question', 'Litotes', 'Apostrophe', 'Idiom'],
    deep: ['Anaphora', 'Chiasmus', 'Antithesis', 'Zeugma', 'Epistrophe', 'Polysyndeton', 'Asyndeton', 'Anastrophe', 'Allusion'],
    legendary: ['Hendiadys', 'Aposiopesis', 'Antimetabole', 'Hypallage|transferred epithet', 'Epizeuxis', 'Anadiplosis', 'Merism', 'Periphrasis|circumlocution'],
    notes: {
      'Litotes': 'Understatement by denying the opposite, like "not bad at all."',
      'Zeugma': 'One word used with two others in different senses: "She lost her keys and her temper."',
      'Synecdoche': 'A part stands for the whole, as in "all hands on deck."',
      'Merism': 'Naming parts to mean the whole, like "searched high and low."'
    },
    reject: [
      ['foreshadowing|flashback|cliffhanger|plot twist|plot', 'That is a storytelling technique, not a figure of speech.'],
      ['noun|verb|adjective|adverb', 'That is a part of speech, not a figure of speech!']
    ]
  });

  P({
    id: 'contronyms', category: 'Language',
    prompt: 'Name a word that can mean the opposite of itself (a contronym)',
    common: ['Sanction', 'Dust', 'Left', 'Fast', 'Cleave'],
    uncommon: ['Oversight', 'Bolt', 'Screen', 'Seed', 'Trim', 'Overlook'],
    rare: ['Weather', 'Buckle', 'Clip', 'Rent', 'Lease', 'Table', 'Literally', 'Bound'],
    deep: ['Moot', 'Citation', 'Garnish', 'Transparent', 'Apology', 'Custom', 'Off'],
    legendary: ['Peer', 'Wear', 'Hold up', 'Wind up', 'Strike', 'Out', 'Ravel', 'Scan', 'Temper'],
    notes: {
      'Sanction': 'Can mean to approve something or to punish it.',
      'Cleave': 'Can mean to split apart or to cling together.',
      'Dust': 'You dust a shelf to remove dust, but dust a cake to add sugar.',
      'Oversight': 'Can mean careful supervision or a careless mistake.',
      'Table': 'In the U.S., to table a plan delays it; in Britain, it brings it up for discussion.',
      'Garnish': 'You garnish food by adding to it, but garnished wages are taken away.'
    },
    reject: [
      ['inflammable', 'It looks like the opposite of flammable, but it actually means the same thing!']
    ]
  });

  P({
    id: 'latin-phrases', category: 'Language',
    prompt: 'Name a Latin phrase that is used in English',
    common: ['Carpe diem', 'Et cetera|etc', 'Vice versa', 'Status quo', 'Alma mater', 'Per se'],
    uncommon: ['Ad hoc', 'Bona fide', 'De facto', 'Quid pro quo', 'Mea culpa', 'Alter ego', 'Pro bono', 'Exempli gratia|e.g.|eg', 'Id est|i.e.|ie', 'Per capita', 'Ad nauseam', 'Veni vidi vici', 'Magnum opus', 'Tempus fugit', 'E pluribus unum'],
    rare: ['Modus operandi', 'Non sequitur', 'Persona non grata', 'Caveat emptor', 'Habeas corpus', 'Terra firma', 'Ad infinitum', 'Post mortem', 'In memoriam', 'Prima facie', 'Deus ex machina', 'Semper fidelis|semper fi', 'Curriculum vitae|cv', 'Nota bene|n.b.|nb', 'Post scriptum|p.s.|ps', 'Anno Domini|ad', 'Et tu, Brute|et tu'],
    deep: ['Tabula rasa', 'Ad hominem', 'A priori', 'Ipso facto', 'De jure', 'Per diem', 'Summa cum laude|magna cum laude|cum laude', 'Sine qua non', 'Memento mori', 'Cogito ergo sum', 'Et al.|et alii', 'Vox populi|vox pop', 'Ad lib|ad libitum', 'Ante meridiem|a.m.|am', 'Post meridiem|p.m.|pm', 'Rigor mortis', 'Per annum'],
    legendary: ['Mutatis mutandis', 'Sui generis', 'In loco parentis', 'Non compos mentis|compos mentis', 'In absentia', 'In situ', 'Alea iacta est|alea jacta est', 'Per aspera ad astra|ad astra per aspera|ad astra', 'Quo vadis'],
    notes: {
      'Carpe diem': 'Means "seize the day," from the Roman poet Horace.',
      'E pluribus unum': '"Out of many, one," a traditional motto of the United States.',
      'Veni vidi vici': '"I came, I saw, I conquered," attributed to Julius Caesar.',
      'Alma mater': 'Literally means "nourishing mother."'
    },
    reject: [
      ['deja vu|faux pas|bon voyage|bon appetit|joie de vivre|rsvp|cest la vie|en route|coup detat|hors doeuvre', 'That phrase is French, not Latin.'],
      ['ciao|bravo|al dente|fiasco', 'That one is Italian, not Latin.']
    ]
  });

  P({
    id: 'writing-systems', category: 'Language',
    prompt: 'Name a writing system or script other than the Latin (Roman) alphabet',
    strip: ['alphabet', 'script', 'syllabary', 'characters', 'letters'],
    common: ['Cyrillic', 'Greek alphabet', 'Arabic script', 'Chinese characters|hanzi|kanji|hanja', 'Egyptian hieroglyphs|hieroglyphs|hieroglyphics|hieroglyphic'],
    uncommon: ['Hebrew', 'Hiragana', 'Katakana', 'Hangul|hangeul|chosongul', 'Runes|runic|futhark|elder futhark', 'Braille', 'Devanagari|nagari'],
    rare: ['Cuneiform', 'Thai', 'Armenian', 'Georgian|mkhedruli', 'Bengali|bangla', 'Tamil', 'Cherokee syllabary', 'Ogham|ogam', 'Tibetan', 'Mongolian|mongol bichig'],
    deep: ['Gujarati', 'Gurmukhi', 'Ethiopic|geez|fidel', 'Khmer', 'Lao', 'Burmese|myanmar', 'Sinhala|sinhalese', 'Telugu', 'Kannada', 'Malayalam', 'Odia|oriya', 'Syriac', 'Coptic', 'Linear B', 'Maya script|maya glyphs|mayan glyphs|mayan hieroglyphs', 'Canadian Aboriginal syllabics|inuktitut syllabics|cree syllabics'],
    legendary: ['Glagolitic', 'Linear A', 'Phoenician', 'Tifinagh', 'Thaana', 'Vai', 'N’Ko', 'Javanese|aksara jawa', 'Hieratic', 'Demotic', 'Zhuyin|bopomofo', 'Ugaritic', 'Brahmi', 'Kharosthi'],
    notes: {
      'Hangul': 'Created in the 1440s under King Sejong the Great.',
      'Cherokee syllabary': 'Created by Sequoyah in the early 1800s; each symbol stands for a syllable.',
      'Ogham': 'An early medieval Irish script carved as notches along the edges of stones.',
      'Linear A': 'Used by the Minoans of Crete and still not deciphered.',
      'Thaana': 'The script of the Maldives, written right to left.'
    },
    reject: [
      ['english|spanish|french|german|italian|latin|roman', 'That uses the Latin alphabet, which doesn’t count here.'],
      ['japanese', 'Japanese mixes several scripts. Name one: kanji, hiragana, or katakana!'],
      ['mandarin|cantonese', 'That is a spoken language. Its script is Chinese characters!'],
      ['russian|ukrainian|bulgarian|serbian', 'That language is written in the Cyrillic alphabet. Name the script!'],
      ['korean', 'Korean is written in Hangul. Name the script!'],
      ['hindi|marathi|nepali', 'That language is written in Devanagari. Name the script!'],
      ['persian|farsi|urdu|pashto', 'That language is written in a form of the Arabic script. Name the script!'],
      ['yiddish', 'Yiddish is written with the Hebrew alphabet. Name the script!'],
      ['morse code|morse|semaphore|emoji|sign language', 'Interesting, but not a script for writing down a language.']
    ]
  });

  P({
    id: 'right-to-left', category: 'Language',
    prompt: 'Name a language usually written from right to left',
    common: ['Arabic', 'Hebrew'],
    uncommon: ['Persian|farsi|dari', 'Urdu'],
    rare: ['Yiddish', 'Pashto|pashtu|pushto', 'Aramaic'],
    deep: ['Dhivehi|divehi|maldivian', 'Sindhi', 'Uyghur|uighur|uygur', 'Syriac', 'Kashmiri'],
    legendary: ['Balochi|baluchi', 'Phoenician', 'Mandaic', 'Ottoman Turkish'],
    notes: {
      'Arabic': 'Words run right to left, but numbers inside the text are written left to right.',
      'Yiddish': 'A Germanic language written with the Hebrew alphabet.',
      'Dhivehi': 'The language of the Maldives, written in a script called Thaana.',
      'Phoenician': 'Its alphabet is an ancestor of the Greek, Latin, Hebrew, and Arabic alphabets.',
      'Ottoman Turkish': 'Written in Arabic script until Turkey switched to the Latin alphabet in 1928.'
    },
    reject: [
      ['japanese|chinese|korean|mandarin', 'It is written left to right, or top to bottom in columns, but not usually right to left.'],
      ['english|spanish|hindi|russian|greek|french|german|turkish', 'That language is written from left to right.']
    ]
  });

  P({
    id: 'japanese-loanwords', category: 'Language',
    prompt: 'Name an English word borrowed from Japanese',
    common: ['Sushi', 'Karate', 'Anime', 'Emoji', 'Tsunami', 'Karaoke', 'Ninja'],
    uncommon: ['Origami', 'Manga', 'Samurai', 'Ramen', 'Haiku', 'Bonsai', 'Judo', 'Tofu', 'Kimono', 'Sudoku', 'Sumo', 'Teriyaki', 'Wasabi', 'Tempura'],
    rare: ['Tycoon', 'Futon', 'Honcho|head honcho', 'Zen', 'Sake', 'Jujitsu|jiujitsu|jujutsu|ju jitsu', 'Kamikaze', 'Edamame', 'Udon', 'Miso', 'Sensei', 'Dojo', 'Shogun', 'Bento', 'Umami', 'Sashimi', 'Mochi', 'Koi', 'Aikido'],
    deep: ['Kabuki', 'Ikebana', 'Tatami', 'Geisha', 'Kudzu', 'Skosh', 'Noh', 'Bokeh', 'Kaizen', 'Matcha', 'Panko', 'Rickshaw', 'Kaiju', 'Shiitake'],
    legendary: ['Hibachi', 'Shiatsu', 'Satsuma', 'Mikado', 'Ronin', 'Katana', 'Banzai', 'Shoji', 'Nori', 'Netsuke'],
    notes: {
      'Karaoke': 'Means "empty orchestra" in Japanese.',
      'Emoji': 'From e (picture) + moji (character), not from the English word "emotion."',
      'Tycoon': 'From taikun, "great lord," a title foreigners used for the shogun.',
      'Skosh': 'From sukoshi, "a little," brought home by U.S. soldiers in the 1950s.',
      'Rickshaw': 'Short for jinrikisha, "human-powered vehicle."'
    },
    reject: [
      ['kung fu|wok|dim sum|chow mein|tai chi|feng shui|tea', 'That word comes from Chinese, not Japanese.'],
      ['kimchi|taekwondo|bibimbap', 'That word comes from Korean, not Japanese.'],
      ['pokemon|nintendo|toyota|sony', 'That is a brand name, not a borrowed word.']
    ]
  });

  /* ------------------------------------------------------------ ART */

  P({
    id: 'art-movements', category: 'Art',
    prompt: 'Name an art movement or style',
    common: ['Impressionism', 'Cubism', 'Surrealism', 'Pop Art', 'Renaissance'],
    uncommon: ['Baroque', 'Expressionism', 'Abstract Expressionism', 'Romanticism', 'Realism', 'Post-Impressionism', 'Art Nouveau', 'Art Deco', 'Dada|dadaism', 'Gothic', 'Abstract art|abstraction', 'Modernism|modern art'],
    rare: ['Rococo', 'Fauvism|fauves', 'Pointillism|neo-impressionism', 'Futurism', 'Minimalism', 'Neoclassicism', 'Mannerism', 'Bauhaus', 'Pre-Raphaelites|pre-raphaelite brotherhood|pre-raphaelitism', 'Op Art|optical art', 'Conceptual art', 'Photorealism', 'Constructivism', 'Harlem Renaissance', 'Street art|graffiti art|graffiti'],
    deep: ['Suprematism', 'De Stijl|neoplasticism', 'Der Blaue Reiter|blue rider', 'Die Brücke|brucke', 'Vorticism', 'Orphism', 'Symbolism', 'Hudson River School', 'Ashcan School', 'Precisionism', 'Arts and Crafts|arts and crafts movement', 'Art Brut|outsider art', 'Postmodernism|postmodern art', 'Ukiyo-e'],
    legendary: ['Synthetism', 'Rayonism|rayism', 'Nabis|les nabis', 'Cloisonnism', 'Luminism', 'Tachisme|tachism', 'Arte Povera', 'Fluxus', 'Gutai'],
    notes: {
      'Fauvism': 'From the French "les fauves," meaning "the wild beasts."',
      'Impressionism': 'Named after Claude Monet’s painting "Impression, Sunrise."',
      'Dada': 'An anti-art movement born in Zurich during World War I.',
      'Pointillism': 'Pictures built from tiny dots of color, pioneered by Georges Seurat.'
    },
    reject: [
      ['watercolor|watercolour|oil painting|sculpture|portrait|landscape|still life|collage|mosaic', 'That is a medium or subject, not an art movement.']
    ]
  });

  P({
    id: 'renaissance-artists', category: 'Art',
    prompt: 'Name a painter, sculptor, or architect of the Renaissance',
    common: ['Leonardo da Vinci|leonardo|da vinci', 'Michelangelo|michelangelo buonarroti'],
    uncommon: ['Raphael|raffaello|raffaello sanzio|raphael sanzio', 'Donatello', 'Sandro Botticelli|botticelli', 'El Greco|greco|domenikos theotokopoulos'],
    rare: ['Titian|tiziano|tiziano vecellio', 'Filippo Brunelleschi|brunelleschi', 'Albrecht Dürer|durer|duerer|albrecht duerer', 'Jan van Eyck|van eyck', 'Hieronymus Bosch|bosch', 'Pieter Bruegel|bruegel|brueghel|breughel|pieter bruegel the elder|pieter brueghel'],
    deep: ['Masaccio', 'Lorenzo Ghiberti|ghiberti', 'Fra Angelico|angelico', 'Andrea Mantegna|mantegna', 'Giovanni Bellini|bellini', 'Hans Holbein|holbein|hans holbein the younger', 'Tintoretto', 'Paolo Veronese|veronese', 'Giorgione', 'Andrea del Verrocchio|verrocchio', 'Domenico Ghirlandaio|ghirlandaio', 'Perugino|pietro perugino', 'Piero della Francesca', 'Paolo Uccello|uccello', 'Benvenuto Cellini|cellini', 'Donato Bramante|bramante', 'Lucas Cranach|cranach|lucas cranach the elder', 'Giotto|giotto di bondone', 'Giorgio Vasari|vasari'],
    legendary: ['Correggio', 'Andrea del Sarto|del sarto', 'Jacopo Pontormo|pontormo', 'Agnolo Bronzino|bronzino', 'Parmigianino', 'Luca della Robbia|della robbia', 'Sofonisba Anguissola|anguissola', 'Rogier van der Weyden|van der weyden', 'Hans Memling|memling', 'Matthias Grünewald|grunewald', 'Leon Battista Alberti|alberti', 'Andrea Palladio|palladio', 'Filippo Lippi|fra filippo lippi', 'Giulio Romano', 'Lavinia Fontana'],
    notes: {
      'Donatello': 'He, Leonardo, Michelangelo, and Raphael gave their names to the Teenage Mutant Ninja Turtles.',
      'Filippo Brunelleschi': 'He engineered the giant dome of Florence Cathedral, finished in 1436.',
      'Sofonisba Anguissola': 'She became a court painter at the Spanish court of King Philip II.',
      'Giotto': 'Painting around 1300, he is often called the forerunner of the Renaissance.',
      'Leonardo da Vinci': 'His notebooks are written in mirror-image handwriting.',
      'El Greco': 'Born on Crete, he trained in Venice and worked in Spain in a very personal late-Renaissance (Mannerist) style.'
    },
    reject: [
      ['caravaggio|rembrandt|vermeer|rubens|bernini|velazquez|artemisia gentileschi|gentileschi', 'A great artist, but from the Baroque period that followed the Renaissance.'],
      ['van gogh|monet|picasso|dali|warhol', 'A famous artist, but from a much later era.']
    ]
  });

  /* ------------------------------------------------------------ MUSIC & DANCE */

  P({
    id: 'tempo-markings', category: 'Music',
    prompt: 'Name an Italian tempo marking used in music',
    common: ['Allegro', 'Andante', 'Adagio', 'Presto'],
    uncommon: ['Largo', 'Lento', 'Moderato', 'Vivace', 'Accelerando|accel', 'Ritardando|rit|ritard'],
    rare: ['Allegretto', 'Prestissimo', 'Andantino', 'Grave', 'Rallentando|rall', 'Rubato|tempo rubato'],
    deep: ['Larghetto', 'Adagietto', 'Larghissimo', 'Vivacissimo', 'Stringendo', 'Allargando', 'Ritenuto|riten', 'Meno mosso', 'Più mosso', 'Vivo'],
    legendary: ['Tempo primo|tempo i', 'L’istesso tempo|lo stesso tempo', 'Allegrissimo', 'Doppio movimento'],
    notes: {
      'Andante': 'Means "walking": a moderate, easygoing pace.',
      'Presto': 'Very fast. Prestissimo is even faster!',
      'Rubato': 'Means "stolen time": the performer speeds up and slows down for expression.',
      'Doppio movimento': 'Means "double speed."'
    },
    reject: [
      ['forte|piano|fortissimo|pianissimo|crescendo|decrescendo|diminuendo|mezzo forte|mezzo piano|sforzando', 'That marking is about loudness (dynamics), not tempo.'],
      ['staccato|legato|dolce|cantabile', 'That marking is about how to play the notes, not the tempo.']
    ]
  });

  P({
    id: 'dynamics-markings', category: 'Music',
    prompt: 'Name a dynamics marking (for loudness) used in music',
    common: ['Forte|f', 'Piano|p'],
    uncommon: ['Crescendo|cresc', 'Fortissimo|ff', 'Pianissimo|pp', 'Mezzo forte|mf', 'Mezzo piano|mp'],
    rare: ['Decrescendo|decresc', 'Diminuendo|dim', 'Sforzando|sfz|sforzato|sf|forzando|fz', 'Fortepiano|fp'],
    deep: ['Pianississimo|ppp', 'Fortississimo|fff', 'Morendo', 'Rinforzando|rfz|rf', 'Calando'],
    legendary: ['Smorzando|smorz', 'Perdendosi', 'Niente|al niente'],
    notes: {
      'Piano': 'Means "soft." The instrument’s full name, pianoforte, means "soft-loud."',
      'Niente': 'Means "nothing": fade all the way to silence.',
      'Morendo': 'Means "dying away."',
      'Sforzando': 'A sudden, strong accent on a single note or chord.'
    },
    reject: [
      ['allegro|andante|adagio|presto|largo|lento|vivace|moderato', 'That marking is about speed (tempo), not loudness.'],
      ['staccato|legato|fermata', 'That marking is about how notes are played, not how loud.']
    ]
  });

  P({
    id: 'classical-composers', category: 'Music',
    prompt: 'Name a classical composer born before 1900',
    common: ['Wolfgang Amadeus Mozart|mozart', 'Ludwig van Beethoven|beethoven', 'Johann Sebastian Bach|bach|j.s. bach', 'Antonio Vivaldi|vivaldi', 'Pyotr Ilyich Tchaikovsky|tchaikovsky|chaikovsky|tchaikowsky', 'Frédéric Chopin|chopin'],
    uncommon: ['George Frideric Handel|handel|haendel', 'Joseph Haydn|haydn|franz joseph haydn', 'Johannes Brahms|brahms', 'Franz Schubert|schubert', 'Claude Debussy|debussy', 'Richard Wagner|wagner', 'Giuseppe Verdi|verdi', 'Giacomo Puccini|puccini', 'Felix Mendelssohn|mendelssohn', 'Franz Liszt|liszt', 'Antonín Dvořák|dvorak', 'Edvard Grieg|grieg', 'Sergei Rachmaninoff|rachmaninoff|rachmaninov'],
    rare: ['Igor Stravinsky|stravinsky', 'Maurice Ravel|ravel', 'Gustav Mahler|mahler', 'Gioachino Rossini|rossini', 'Georges Bizet|bizet', 'Gustav Holst|holst', 'Edward Elgar|elgar', 'George Gershwin|gershwin', 'Sergei Prokofiev|prokofiev', 'Robert Schumann', 'Camille Saint-Saëns|saint saens', 'Modest Mussorgsky|mussorgsky|moussorgsky', 'Nikolai Rimsky-Korsakov|rimsky korsakov', 'Jean Sibelius|sibelius', 'Erik Satie|satie', 'Johann Pachelbel|pachelbel', 'Henry Purcell|purcell', 'Johann Strauss II|johann strauss|strauss ii|the waltz king', 'Richard Strauss', 'Béla Bartók|bartok', 'Georg Philipp Telemann|telemann', 'Claudio Monteverdi|monteverdi', 'Antonio Salieri|salieri', 'Niccolò Paganini|paganini', 'Scott Joplin|joplin'],
    deep: ['Hildegard of Bingen|hildegard|hildegard von bingen', 'Giovanni Pierluigi da Palestrina|palestrina', 'Gabriel Fauré|faure', 'Hector Berlioz|berlioz', 'Bedřich Smetana|smetana', 'Leoš Janáček|janacek', 'Ralph Vaughan Williams|vaughan williams', 'Clara Schumann', 'Thomas Tallis|tallis', 'Arnold Schoenberg|schoenberg|schonberg', 'Anton Bruckner|bruckner', 'Alexander Borodin|borodin', 'Charles Gounod|gounod', 'Jacques Offenbach|offenbach', 'Gaetano Donizetti|donizetti', 'Vincenzo Bellini|bellini', 'Domenico Scarlatti|scarlatti', 'Arcangelo Corelli|corelli', 'Christoph Willibald Gluck|gluck', 'Arthur Sullivan|sullivan', 'Carl Maria von Weber|von weber', 'John Philip Sousa|sousa', 'William Byrd|byrd'],
    legendary: ['Josquin des Prez|josquin', 'Guillaume de Machaut|machaut', 'Jean-Philippe Rameau|rameau', 'Florence Price', 'Amy Beach', 'Lili Boulanger', 'Joseph Bologne|chevalier de saint-georges', 'Samuel Coleridge-Taylor|coleridge-taylor', 'Cécile Chaminade|chaminade', 'Fanny Mendelssohn|fanny hensel', 'Charles Ives|ives', 'Alexander Scriabin|scriabin|skryabin', 'Ottorino Respighi|respighi', 'Jean-Baptiste Lully|lully'],
    notes: {
      'Hildegard of Bingen': 'A 12th-century German abbess whose chants are among the earliest music by a composer we know by name.',
      'Ludwig van Beethoven': 'He kept composing after losing his hearing, including his Ninth Symphony.',
      'Florence Price': 'In 1933 she became the first African American woman to have a symphony played by a major U.S. orchestra.',
      'Joseph Bologne': 'A virtuoso violinist and champion fencer in 18th-century France.'
    },
    reject: [
      ['schumann', 'There are two famous Schumanns: Robert and Clara. Add a first name!'],
      ['strauss', 'Johann Strauss II or Richard Strauss? Add a first name!'],
      ['john williams|hans zimmer|philip glass|leonard bernstein|bernstein|dmitri shostakovich|shostakovich|aaron copland|copland|benjamin britten|britten|ludovico einaudi|einaudi', 'A real composer, but born in 1900 or later, so outside this prompt.']
    ]
  });

  P({
    id: 'dance-styles', category: 'Dance',
    prompt: 'Name a style of dance',
    strip: ['dance', 'dancing'],
    common: ['Ballet', 'Tap dance', 'Hip-hop', 'Salsa', 'Tango', 'Waltz|viennese waltz', 'Breakdancing|breaking|breakdance|b-boying'],
    uncommon: ['Jazz dance', 'Swing dance', 'Foxtrot', 'Cha-cha|cha-cha-cha|chacha', 'Rumba|rhumba', 'Samba', 'Line dancing', 'Square dance', 'Flamenco', 'Irish dance|irish step dance|step dance', 'Hula', 'Contemporary dance', 'Modern dance', 'Belly dance|raqs sharqi', 'Ballroom'],
    rare: ['Polka', 'Charleston', 'Lindy Hop|lindy', 'Quickstep', 'Paso doble', 'Jive', 'Disco', 'Bollywood', 'Bhangra', 'Mambo', 'Merengue', 'Bachata', 'Clogging|clog dance', 'Krumping|krump', 'Popping', 'Cancan|can-can', 'Folk dance', 'Lyrical dance'],
    deep: ['Kathak', 'Bharatanatyam|bharata natyam', 'Cumbia', 'Lion dance', 'Minuet', 'Tarantella', 'Mazurka', 'Polonaise', 'Hornpipe', 'Morris dance', 'Haka', 'Jig', 'Fandango', 'Twist', 'Conga', 'Limbo', 'Highland dance|highland fling'],
    legendary: ['Gavotte', 'Pavane|pavan', 'Galliard', 'Sarabande', 'Bourrée', 'Sardana', 'Hora', 'Jota', 'Odissi', 'Kathakali'],
    notes: {
      'Haka': 'A Māori ceremonial dance from New Zealand, famously performed by its rugby team.',
      'Tarantella': 'Old folklore claimed it could cure a tarantula’s bite.',
      'Lindy Hop': 'Born in Harlem, New York, in the late 1920s.',
      'Flamenco': 'Comes from Andalusia in southern Spain.'
    },
    reject: [
      ['dab|floss|moonwalk|pirouette|plie|splits|worm', 'That is a dance move, not a style of dance.']
    ]
  });

})(window.UT = window.UT || {});
