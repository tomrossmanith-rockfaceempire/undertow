/* Undertow prompts: science. Uses UT.P() from js/prompts.js. */
(function (UT) {
  'use strict';
  var P = UT.P;

  /* ------------------------------------------------------------ CHEMISTRY */

  P({
    id: 'alkali-metals', category: 'Science',
    prompt: 'Name an alkali metal',
    common: ['Sodium|na', 'Potassium|k'],
    uncommon: ['Lithium|li'],
    rare: ['Caesium|cesium|cs'],
    deep: ['Rubidium|rb'],
    legendary: ['Francium|fr'],
    notes: {
      'Lithium': 'The lightest metal of all, light enough to float on water.',
      'Caesium': 'Atomic clocks use caesium atoms to define the length of a second.',
      'Francium': 'So rare and radioactive that no one has ever seen a visible amount of it.',
      'Sodium': 'Soft enough to cut with a butter knife, and it fizzes violently in water.'
    },
    reject: [
      ['hydrogen', 'Hydrogen sits at the top of group 1, but it is a nonmetal, not an alkali metal.'],
      ['calcium|magnesium|beryllium|strontium|barium|radium', 'That is an alkaline earth metal, from the column next door.']
    ]
  });

  P({
    id: 'halogens', category: 'Science',
    prompt: 'Name a halogen element',
    common: ['Chlorine|cl', 'Fluorine|f|flourine'],
    uncommon: ['Iodine|i', 'Bromine|br'],
    deep: ['Astatine|at'],
    legendary: ['Tennessine|ts'],
    notes: {
      'Fluorine': 'The most reactive element of all. It can even react with some noble gases.',
      'Bromine': 'One of only two elements that are liquid at room temperature. The other is mercury.',
      'Astatine': 'One of the rarest naturally occurring elements on Earth.',
      'Tennessine': 'Element 117, named after the U.S. state of Tennessee.'
    },
    reject: [
      ['chloride|fluoride|bromide|iodide', 'That is the ion or compound form. Name the element itself, like chlorine.'],
      ['neon|argon|helium', 'That is a noble gas, the column just to the right of the halogens.']
    ]
  });

  P({
    id: 'elements-named-places', category: 'Science',
    prompt: 'Name a chemical element named after a place on Earth',
    common: ['Americium|am', 'Francium|fr', 'Germanium|ge', 'Polonium|po', 'Californium|cf'],
    uncommon: ['Europium|eu', 'Scandium|sc', 'Berkelium|bk', 'Tennessine|ts'],
    rare: ['Gallium|ga', 'Nihonium|nh', 'Darmstadtium|ds', 'Moscovium|mc', 'Dubnium|db'],
    deep: ['Ruthenium|ru', 'Hassium|hs', 'Strontium|sr', 'Magnesium|mg', 'Yttrium|y', 'Ytterbium|yb', 'Livermorium|lv'],
    legendary: ['Lutetium|lu', 'Hafnium|hf', 'Holmium|ho', 'Rhenium|re', 'Terbium|tb', 'Erbium|er', 'Thulium|tm'],
    notes: {
      'Lutetium': 'Named after Lutetia, the old Latin name for Paris.',
      'Hafnium': 'Named after Hafnia, the Latin name for Copenhagen.',
      'Holmium': 'Named after Holmia, the Latin name for Stockholm.',
      'Rhenium': 'Named after the Rhine River (Rhenus in Latin).',
      'Ytterbium': 'The Swedish village of Ytterby gave its name to four elements: yttrium, ytterbium, terbium, and erbium.',
      'Nihonium': 'Nihon is a Japanese name for Japan. It was the first element discovered in Asia.',
      'Gallium': 'Named after Gallia, the Latin name for France.',
      'Thulium': 'Named after Thule, an ancient name for a far-northern land, often linked to Scandinavia.'
    },
    reject: [
      ['mercury|uranium|neptunium|plutonium', 'That element is named after a planet (or dwarf planet), not a place on Earth.'],
      ['helium|selenium|cerium|palladium|tellurium', 'Named after something in space (the Sun, the Moon, an asteroid or dwarf planet, or Earth as a whole), not a particular place.']
    ]
  });

  P({
    id: 'elements-named-people', category: 'Science',
    prompt: 'Name a chemical element named after a real person',
    common: ['Einsteinium|es', 'Curium|cm', 'Nobelium|no'],
    uncommon: ['Mendelevium|md', 'Fermium|fm', 'Copernicium|cn'],
    rare: ['Rutherfordium|rf', 'Bohrium|bh', 'Meitnerium|mt'],
    deep: ['Seaborgium|sg', 'Lawrencium|lr', 'Roentgenium|röntgenium|rg', 'Oganesson|og'],
    legendary: ['Gadolinium|gd', 'Samarium|sm', 'Flerovium|fl'],
    notes: {
      'Meitnerium': 'Honors Lise Meitner, who helped discover nuclear fission.',
      'Seaborgium': 'Glenn Seaborg was still alive when it was named after him.',
      'Oganesson': 'Named after Yuri Oganessian, who was alive when it was named in 2016.',
      'Gadolinium': 'Named after the mineral gadolinite, which honors Finnish chemist Johan Gadolin.',
      'Samarium': 'Named after the mineral samarskite, which honors Russian mining official Vasili Samarsky-Bykhovets.',
      'Flerovium': 'Named after a Russian laboratory that honors physicist Georgy Flyorov.'
    },
    reject: [
      ['thorium|promethium|vanadium|titanium|niobium|tantalum', 'That element is named after a figure from mythology, not a real person.'],
      ['cerium', 'Cerium is named after Ceres, a dwarf planet. Did you mean curium, named after Marie and Pierre Curie?']
    ]
  });

  P({
    id: 'symbol-other-letter', category: 'Science',
    prompt: 'Name a chemical element whose symbol does not start with the first letter of its English name',
    common: ['Gold|au', 'Silver|ag', 'Iron|fe'],
    uncommon: ['Sodium|na', 'Potassium|k', 'Lead|pb'],
    rare: ['Mercury|hg', 'Tin|sn'],
    deep: ['Tungsten|w|wolfram'],
    legendary: ['Antimony|sb'],
    notes: {
      'Mercury': 'Hg comes from hydrargyrum, Greek-Latin for "water-silver."',
      'Lead': 'Pb comes from plumbum, which also gave us the word "plumbing."',
      'Antimony': 'Sb comes from stibium, its old Latin name.',
      'Tin': 'Sn comes from stannum, the Latin word for tin.'
    },
    reject: [
      ['copper|cu', 'So close! Copper’s symbol Cu still starts with C.'],
      ['helium|carbon|oxygen|hydrogen|nitrogen', 'That symbol starts with the same letter as the name.']
    ]
  });

  /* ------------------------------------------------------------ MEASUREMENT */

  P({
    id: 'si-base-units', category: 'Science',
    prompt: 'Name one of the seven SI base units',
    common: ['Metre|meter|m', 'Kilogram|kg', 'Second|sec'],
    uncommon: ['Kelvin|k', 'Ampere|amp'],
    rare: ['Mole|mol'],
    legendary: ['Candela|cd'],
    notes: {
      'Kilogram': 'The only base unit with a prefix built into its name.',
      'Candela': 'Measures luminous intensity: roughly the brightness of one candle.',
      'Mole': 'One mole is exactly 602,214,076,000,000,000,000,000 particles.',
      'Kelvin': 'Zero kelvin is absolute zero, the coldest possible temperature.'
    },
    reject: [
      ['gram', 'Close! The SI base unit of mass is the kilogram, not the gram.'],
      ['newton|joule|watt|volt|hertz|pascal|ohm|coulomb|celsius|degree celsius', 'That is an SI derived unit, built from the base units.'],
      ['litre|liter|foot|inch|pound|mile|fahrenheit', 'That unit is not one of the SI base units.']
    ]
  });

  P({
    id: 'si-prefixes', category: 'Science',
    prompt: 'Name a metric (SI) prefix',
    common: ['Kilo', 'Centi', 'Milli', 'Mega'],
    uncommon: ['Giga', 'Micro', 'Nano', 'Tera'],
    rare: ['Deci', 'Hecto', 'Deca|deka', 'Pico', 'Peta'],
    deep: ['Femto', 'Atto', 'Exa', 'Zetta', 'Yotta'],
    legendary: ['Zepto', 'Yocto', 'Ronna', 'Quetta', 'Ronto', 'Quecto'],
    notes: {
      'Quetta': 'Means 10 to the 30th power. Added in 2022 along with ronna, ronto, and quecto.',
      'Quecto': 'The smallest SI prefix: 10 to the minus 30th power.',
      'Atto': 'Comes from the Danish word for eighteen, since it means 10 to the minus 18th.',
      'Hecto': 'Means 100, as in the hectare, a common unit of land area.'
    },
    reject: [
      ['kibi|mebi|gibi|tebi', 'That is a binary prefix (1,024-based), not an SI prefix.'],
      ['semi|hemi|demi|multi|mini|ultra|super', 'A handy prefix, but not one of the metric (SI) prefixes.']
    ]
  });

  P({
    id: 'si-unit-scientists', category: 'Science',
    prompt: 'Name a scientist who has an SI unit named after them',
    common: ['Isaac Newton|newton', 'James Watt|watt', 'Anders Celsius|celsius', 'Nikola Tesla|tesla'],
    uncommon: ['Lord Kelvin|kelvin|william thomson', 'Alessandro Volta|volta|volt', 'André-Marie Ampère|ampere', 'Georg Ohm|ohm', 'James Prescott Joule|joule|james joule', 'Blaise Pascal|pascal'],
    rare: ['Heinrich Hertz|hertz', 'Michael Faraday|faraday|farad', 'Charles-Augustin de Coulomb|coulomb'],
    deep: ['Joseph Henry|henry', 'Henri Becquerel|becquerel', 'Werner von Siemens|siemens|werner siemens'],
    legendary: ['Wilhelm Weber|weber', 'Louis Harold Gray|gray|louis gray', 'Rolf Sievert|sievert'],
    notes: {
      'Lord Kelvin': 'William Thomson took the title Lord Kelvin from the River Kelvin in Glasgow.',
      'Louis Harold Gray': 'The gray measures how much radiation energy a material absorbs.',
      'Rolf Sievert': 'A Swedish medical physicist who studied how radiation affects the body.',
      'Wilhelm Weber': 'Built an early electric telegraph with mathematician Carl Friedrich Gauss in 1833.'
    },
    reject: [
      ['albert einstein|einstein|thomas edison|edison|galileo|galileo galilei|marie curie', 'A famous scientist, but no SI unit is named after them.'],
      ['daniel fahrenheit|fahrenheit', 'Fahrenheit has a temperature scale, but it is not an SI unit.'],
      ['gauss|carl friedrich gauss', 'The gauss is an older unit. The SI unit of magnetic field is the tesla.']
    ]
  });

  P({
    id: 'length-units', category: 'Science',
    prompt: 'Name a unit for measuring length or distance',
    common: ['Metre|meter|m', 'Kilometre|kilometer|km', 'Centimetre|centimeter|cm', 'Inch|in', 'Foot|feet|ft', 'Mile|mi'],
    uncommon: ['Millimetre|millimeter|mm', 'Yard|yd', 'Light-year|ly', 'Nanometre|nanometer|nm', 'Micrometre|micrometer|micron'],
    rare: ['Nautical mile|nmi', 'Astronomical unit|au', 'Parsec|pc', 'Furlong', 'Fathom', 'Decimetre|decimeter|dm'],
    deep: ['Ångström|angstrom', 'League', 'Cubit', 'Hand', 'Chain', 'Rod|pole|perch', 'Picometre|picometer|pm', 'Light-second'],
    legendary: ['Fermi|femtometre|femtometer|fm', 'Mil|thou', 'Link', 'Planck length'],
    notes: {
      'Hand': 'Four inches, still used to measure the height of horses.',
      'Chain': '22 yards, which is exactly the length of a cricket pitch.',
      'Mil': 'One thousandth of an inch, used for things like wire thickness.',
      'Furlong': '220 yards, still used in horse racing.',
      'Light-year': 'Despite the name, it measures distance: how far light travels in a year.'
    },
    reject: [
      ['acre|hectare|square foot|square metre|square meter', 'That measures area, not length.'],
      ['litre|liter|gallon|pint|cup', 'That measures volume, not length.']
    ]
  });

  /* ------------------------------------------------------------ PHYSICS */

  P({
    id: 'em-spectrum', category: 'Science',
    prompt: 'Name a type or band of electromagnetic radiation',
    common: ['Visible light|light|visible', 'X-rays|x ray|xray', 'Ultraviolet|uv|ultraviolet light', 'Microwaves|microwave'],
    uncommon: ['Radio waves|radio|radio wave', 'Infrared|ir|infrared light'],
    rare: ['Gamma rays|gamma|gamma ray'],
    deep: ['UVA|ultraviolet a', 'UVB|ultraviolet b'],
    legendary: ['UVC|ultraviolet c', 'Terahertz radiation|terahertz', 'Extreme ultraviolet|euv', 'Near-infrared', 'Far-infrared'],
    notes: {
      'Gamma rays': 'The highest-energy light there is, made by things like exploding stars.',
      'Radio waves': 'The longest radio waves can be larger than Earth itself.',
      'UVC': 'Almost all of it is blocked by Earth’s ozone layer.',
      'Infrared': 'Discovered in 1800 by astronomer William Herschel using a prism and thermometers.'
    },
    reject: [
      ['sound|sound waves', 'Sound is a vibration that needs matter to travel through, not electromagnetic radiation.'],
      ['alpha|beta|alpha particles|beta particles', 'Alpha and beta radiation are streams of particles, not electromagnetic waves.']
    ]
  });

  P({
    id: 'subatomic-particles', category: 'Science',
    prompt: 'Name a subatomic particle',
    common: ['Proton', 'Neutron', 'Electron'],
    uncommon: ['Quark', 'Photon', 'Neutrino', 'Positron|antielectron'],
    rare: ['Muon', 'Gluon', 'Higgs boson|higgs|god particle', 'Antiproton'],
    deep: ['Tau|tau lepton|tauon', 'Pion|pi meson', 'W boson', 'Z boson', 'Up quark', 'Down quark', 'Antineutron', 'Antineutrino', 'Alpha particle', 'Beta particle'],
    legendary: ['Strange quark', 'Charm quark', 'Top quark|truth quark', 'Bottom quark|beauty quark', 'Kaon|k meson'],
    notes: {
      'Positron': 'The first antimatter particle ever discovered, in 1932.',
      'Higgs boson': 'Its discovery at CERN in 2012 confirmed a 48-year-old prediction.',
      'Top quark': 'The heaviest elementary particle known.',
      'Muon': 'Like a heavy electron, about 200 times as massive.'
    },
    reject: [
      ['atom|molecule|ion|cell', 'That is bigger than an atom’s pieces. Subatomic means smaller than an atom.'],
      ['nucleus', 'The nucleus is the atom’s center, a cluster of protons and neutrons. Name one of the particles inside it!'],
      ['graviton', 'Gravitons are predicted by some theories, but none has ever been detected.']
    ]
  });

  P({
    id: 'states-of-matter', category: 'Science',
    prompt: 'Name a state or phase of matter',
    common: ['Solid', 'Liquid', 'Gas|vapor|vapour'],
    uncommon: ['Plasma'],
    rare: ['Bose–Einstein condensate|bose einstein condensate|bec'],
    deep: ['Superfluid', 'Supercritical fluid', 'Liquid crystal', 'Fermionic condensate'],
    legendary: ['Quark–gluon plasma|quark gluon plasma', 'Supersolid', 'Degenerate matter'],
    notes: {
      'Plasma': 'The most common state of ordinary matter in the universe, since stars are made of it.',
      'Bose–Einstein condensate': 'First created in a lab in 1995, at a temperature just above absolute zero.',
      'Superfluid': 'Superfluid helium can creep up the walls of its container and flow out.',
      'Supercritical fluid': 'Supercritical carbon dioxide is used to remove caffeine from coffee beans.'
    },
    reject: [
      ['ice|water|steam', 'That is water in one of its states. Name the state itself!'],
      ['melting|freezing|boiling|evaporation|condensation|sublimation|deposition', 'That is a change between states, not a state.']
    ]
  });

  P({
    id: 'simple-machines', category: 'Science',
    prompt: 'Name one of the six classical simple machines',
    common: ['Lever', 'Pulley'],
    uncommon: ['Wheel and axle|wheel|axle', 'Inclined plane|ramp|slope'],
    rare: ['Wedge'],
    legendary: ['Screw'],
    notes: {
      'Screw': 'Really an inclined plane wrapped around a cylinder.',
      'Wedge': 'Works like two inclined planes back to back. An axe blade is one.',
      'Lever': 'Archimedes is said to have claimed that with a long enough lever he could move the world.'
    },
    reject: [
      ['gear|gears', 'Gears are useful, but they are not one of the six classical simple machines.'],
      ['seesaw|see saw|crowbar', 'That is an example of a lever. Name the machine type!']
    ]
  });

  P({
    id: 'energy-forms', category: 'Science',
    prompt: 'Name a form of energy',
    strip: ['energy'],
    common: ['Kinetic', 'Potential', 'Thermal|heat', 'Electrical|electric|electricity'],
    uncommon: ['Chemical', 'Nuclear|atomic', 'Light|radiant|electromagnetic', 'Sound|acoustic', 'Mechanical'],
    rare: ['Gravitational potential|gravitational', 'Elastic potential|elastic|strain'],
    deep: ['Magnetic', 'Internal'],
    legendary: ['Rest energy|rest mass|mass energy'],
    notes: {
      'Rest energy': 'The energy stored in mass itself, from Einstein’s famous E = mc².',
      'Chemical': 'Food and batteries both store chemical energy.',
      'Mechanical': 'The total of an object’s kinetic and potential energy.',
      'Elastic potential': 'Stored in a stretched rubber band or a squashed spring.'
    },
    reject: [
      ['solar|wind|hydro|hydroelectric|geothermal|coal|oil|natural gas|tidal', 'That is a source of energy, not a form of it.'],
      ['force|power', 'Close, but in science force and power are different from energy.']
    ]
  });

  P({
    id: 'ology-sciences', category: 'Science',
    prompt: 'Name a branch of science or medicine whose name ends in -ology',
    common: ['Biology', 'Geology', 'Zoology', 'Ecology', 'Psychology'],
    uncommon: ['Meteorology', 'Paleontology|palaeontology', 'Archaeology|archeology', 'Microbiology', 'Anthropology', 'Seismology', 'Volcanology|vulcanology', 'Sociology'],
    rare: ['Entomology', 'Ornithology', 'Cosmology', 'Virology', 'Immunology', 'Neurology', 'Cardiology', 'Dermatology', 'Radiology', 'Pathology', 'Climatology', 'Physiology', 'Gynecology|gynaecology', 'Urology'],
    deep: ['Ichthyology', 'Herpetology', 'Mycology', 'Hydrology', 'Mineralogy', 'Glaciology', 'Oncology', 'Pharmacology', 'Toxicology', 'Epidemiology', 'Bacteriology', 'Embryology', 'Primatology', 'Hematology|haematology', 'Ophthalmology', 'Astrobiology|exobiology', 'Endocrinology', 'Criminology', 'Gastroenterology', 'Nephrology', 'Audiology', 'Anesthesiology|anaesthesiology', 'Gerontology', 'Ethology', 'Kinesiology'],
    legendary: ['Speleology', 'Dendrology', 'Limnology', 'Malacology', 'Myrmecology', 'Oology', 'Arachnology', 'Petrology', 'Histology', 'Cytology', 'Lepidopterology', 'Mammalogy', 'Parasitology'],
    notes: {
      'Oology': 'The study of birds’ eggs.',
      'Myrmecology': 'The study of ants.',
      'Speleology': 'The study of caves.',
      'Limnology': 'The study of lakes and other inland waters.',
      'Malacology': 'The study of mollusks, like snails and octopuses.'
    },
    reject: [
      ['astrology', 'Astrology is not a science. Its scientific cousin is astronomy!'],
      ['etymology', 'Etymology is the study of word origins. Did you mean entomology, the study of insects?'],
      ['theology|mythology|technology|terminology|ideology|methodology|apology', 'That ends in -ology, but it is not a branch of science.'],
      ['chemistry|physics|astronomy|botany|genetics|anatomy', 'A great science, but its name does not end in -ology!']
    ]
  });

  /* ------------------------------------------------------------ EARTH */

  P({
    id: 'atmosphere-layers', category: 'Science',
    prompt: 'Name a layer of Earth’s atmosphere or a boundary between its layers',
    common: ['Troposphere', 'Stratosphere', 'Ozone layer|ozonosphere|ozone'],
    uncommon: ['Mesosphere', 'Thermosphere', 'Exosphere'],
    rare: ['Ionosphere'],
    deep: ['Tropopause', 'Stratopause', 'Mesopause'],
    legendary: ['Thermopause|exobase', 'Homosphere', 'Heterosphere', 'Planetary boundary layer|boundary layer|atmospheric boundary layer'],
    notes: {
      'Troposphere': 'Holds about three quarters of the atmosphere’s mass and nearly all of its weather.',
      'Mesosphere': 'Most meteors burn up in this layer.',
      'Thermosphere': 'The International Space Station orbits inside this layer.',
      'Homosphere': 'The lower atmosphere, where the gases are evenly mixed together.'
    },
    reject: [
      ['crust|mantle|core|lithosphere|asthenosphere', 'That is a layer of the solid Earth, not the atmosphere.'],
      ['magnetosphere', 'The magnetosphere is the region controlled by Earth’s magnetic field, not a layer of air.'],
      ['biosphere|hydrosphere', 'That is one of Earth’s “spheres,” but not a layer of the atmosphere.']
    ]
  });

  P({
    id: 'earth-layers', category: 'Science',
    prompt: 'Name a layer of the Earth’s interior structure, or a boundary between layers',
    common: ['Crust', 'Mantle', 'Core'],
    uncommon: ['Inner core|solid core', 'Outer core|liquid core'],
    rare: ['Lithosphere', 'Asthenosphere', 'Upper mantle', 'Lower mantle'],
    deep: ['Oceanic crust', 'Continental crust', 'Mohorovičić discontinuity|moho|mohorovicic', 'Gutenberg discontinuity|gutenberg|core mantle boundary'],
    legendary: ['Lehmann discontinuity|lehmann', 'Transition zone|mantle transition zone', 'D″ layer|d double prime|d double prime layer', 'Mesosphere'],
    notes: {
      'Inner core': 'About as hot as the surface of the Sun, but kept solid by enormous pressure.',
      'Outer core': 'Swirling liquid iron here creates Earth’s magnetic field.',
      'Mohorovičić discontinuity': 'Named after Croatian scientist Andrija Mohorovičić, who found it in 1909.',
      'Lehmann discontinuity': 'Named after Danish seismologist Inge Lehmann, who discovered the solid inner core in 1936.',
      'Mesosphere': 'Geologists sometimes use this name for the strong lower mantle beneath the asthenosphere.'
    },
    reject: [
      ['magma|lava', 'Magma is molten rock, but it is not a layer. Most of the mantle is actually solid rock.'],
      ['troposphere|stratosphere|ozone layer|exosphere', 'That is part of the atmosphere, above the ground.']
    ]
  });

  /* ------------------------------------------------------------ SPACE */

  P({
    id: 'moon-walkers', category: 'Space',
    prompt: 'Name an astronaut who walked on the Moon',
    common: ['Neil Armstrong|armstrong', 'Buzz Aldrin|aldrin|edwin aldrin'],
    uncommon: ['Alan Shepard|shepard', 'Gene Cernan|eugene cernan|cernan'],
    rare: ['John Young|young', 'Pete Conrad|charles conrad|conrad'],
    deep: ['Edgar Mitchell|mitchell', 'Alan Bean|bean', 'Harrison Schmitt|jack schmitt|schmitt'],
    legendary: ['David Scott|dave scott|scott', 'James Irwin|jim irwin|irwin', 'Charlie Duke|charles duke|duke'],
    notes: {
      'Gene Cernan': 'The last person to walk on the Moon, in December 1972.',
      'Harrison Schmitt': 'A geologist, and the only professional scientist to walk on the Moon.',
      'Alan Shepard': 'Hit two golf balls on the Moon during Apollo 14.',
      'Charlie Duke': 'The youngest moonwalker, at 36 years old.',
      'John Young': 'Later commanded the very first Space Shuttle mission in 1981.'
    },
    reject: [
      ['michael collins|collins', 'Collins orbited the Moon during Apollo 11 but never landed.'],
      ['jim lovell|james lovell|lovell', 'Lovell flew around the Moon twice (Apollo 8 and 13) but never landed.'],
      ['yuri gagarin|gagarin|john glenn|glenn|sally ride', 'A space pioneer, but they never went to the Moon.']
    ]
  });

  P({
    id: 'apollo-landings', category: 'Space',
    prompt: 'Name an Apollo mission that landed astronauts on the Moon',
    common: ['Apollo 11|11'],
    uncommon: ['Apollo 12|12', 'Apollo 17|17'],
    rare: ['Apollo 14|14'],
    deep: ['Apollo 15|15'],
    legendary: ['Apollo 16|16'],
    notes: {
      'Apollo 11': 'The first Moon landing, on July 20, 1969.',
      'Apollo 12': 'Landed near the Surveyor 3 probe, and the astronauts brought pieces of it home.',
      'Apollo 15': 'The first mission to drive the Lunar Roving Vehicle on the Moon.',
      'Apollo 17': 'The last crewed Moon landing. Its crew took the famous “Blue Marble” photo of Earth.'
    },
    reject: [
      ['apollo 13|13', 'Apollo 13 had to abort its landing after an oxygen tank exploded. The crew made it home safely.'],
      ['apollo 8|apollo 10|8|10', 'That mission orbited the Moon but did not land.'],
      ['apollo 1|apollo 7|apollo 9|1|7|9', 'That mission never reached the Moon.'],
      ['apollo 18|apollo 19|apollo 20|18|19|20', 'Those missions were planned but canceled.']
    ]
  });

  P({
    id: 'mars-rovers', category: 'Space',
    prompt: 'Name a rover that has driven on the surface of Mars',
    common: ['Curiosity', 'Perseverance|percy'],
    uncommon: ['Opportunity|oppy', 'Spirit'],
    rare: ['Sojourner'],
    legendary: ['Zhurong'],
    notes: {
      'Zhurong': 'China’s first Mars rover, landed in 2021 and named after a Chinese god of fire.',
      'Opportunity': 'Planned to last 90 Martian days, it kept exploring for about 14 years.',
      'Sojourner': 'The first Mars rover, in 1997, named after abolitionist Sojourner Truth.',
      'Curiosity': 'About the size of a car, it was lowered to the ground by a rocket-powered “sky crane.”'
    },
    reject: [
      ['ingenuity', 'Ingenuity was a helicopter. It flew on Mars instead of driving!'],
      ['pathfinder|mars pathfinder', 'Pathfinder was the lander that carried the Sojourner rover.'],
      ['viking|viking 1|viking 2|insight|phoenix', 'That was a lander that stayed in one place, not a rover.'],
      ['rosalind franklin|exomars', 'Europe’s Rosalind Franklin rover has not launched yet.'],
      ['lunokhod|yutu|yutu 2|pragyan', 'That rover explored the Moon, not Mars.']
    ]
  });

  P({
    id: 'space-shuttles', category: 'Space',
    prompt: 'Name a NASA Space Shuttle orbiter',
    common: ['Challenger', 'Discovery'],
    uncommon: ['Columbia', 'Atlantis'],
    rare: ['Endeavour|endeavor'],
    legendary: ['Enterprise'],
    notes: {
      'Enterprise': 'Never went to space. It was used for landing tests in 1977.',
      'Discovery': 'Flew 39 missions, more than any other shuttle.',
      'Atlantis': 'Flew the final Space Shuttle mission in July 2011.',
      'Endeavour': 'Named after Captain Cook’s ship, which is why it uses the British spelling.'
    },
    reject: [
      ['buran', 'Buran was the Soviet Union’s space shuttle, not NASA’s.'],
      ['apollo|gemini|mercury|orion|dragon|soyuz', 'That is a spacecraft, but not a Space Shuttle orbiter.']
    ]
  });

  P({
    id: 'jupiter-spacecraft', category: 'Space',
    prompt: 'Name a spacecraft that has flown past or orbited Jupiter',
    common: ['Juno', 'Voyager 1', 'Voyager 2'],
    uncommon: ['Galileo', 'Cassini|cassini huygens'],
    rare: ['Pioneer 10', 'New Horizons'],
    deep: ['Pioneer 11'],
    legendary: ['Ulysses'],
    notes: {
      'Pioneer 10': 'The first spacecraft to fly past Jupiter, in December 1973.',
      'Galileo': 'The first spacecraft to orbit Jupiter. It also dropped a probe into Jupiter’s clouds.',
      'Ulysses': 'Used Jupiter’s gravity to swing out over the Sun’s poles.',
      'New Horizons': 'Got a speed boost from Jupiter in 2007 on its way to Pluto.'
    },
    reject: [
      ['voyager|pioneer', 'Two spacecraft with that name flew past Jupiter. Add the number!'],
      ['europa clipper|juice|jupiter icy moons explorer', 'On its way, but it has not reached Jupiter yet (due in the early 2030s).']
    ]
  });

  /* ------------------------------------------------------------ TECHNOLOGY */

  P({
    id: 'computer-hardware', category: 'Technology',
    prompt: 'Name a piece of computer hardware',
    common: ['Keyboard', 'Mouse|mice', 'Monitor|screen|display', 'CPU|processor|central processing unit'],
    uncommon: ['RAM|memory|random access memory', 'Motherboard|mainboard|logic board', 'Hard drive|hdd|hard disk|hard disk drive', 'GPU|graphics card|video card|graphics processing unit', 'Power supply|psu|power supply unit'],
    rare: ['SSD|solid state drive', 'Fan|cooling fan', 'Case|tower|chassis', 'Speakers|speaker', 'Webcam', 'Printer', 'Microphone|mic', 'Touchpad|trackpad', 'Scanner', 'Headphones|headphone|headset|earphones'],
    deep: ['Heat sink|heatsink', 'Network card|nic|network interface card|wifi card', 'Sound card', 'Optical drive|cd drive|dvd drive|disc drive', 'Flash drive|usb stick|thumb drive|usb drive', 'ROM|read only memory', 'Router', 'Modem', 'USB port|usb|port'],
    legendary: ['Thermal paste', 'CMOS battery', 'Expansion slot|pcie slot', 'Floppy disk drive|floppy drive'],
    notes: {
      'Thermal paste': 'A gooey layer that helps heat flow from the processor into the heat sink.',
      'CMOS battery': 'A small coin battery that keeps the computer’s clock running when it is unplugged.',
      'Floppy disk drive': 'Its disks are why the “save” icon looks the way it does.',
      'Mouse': 'The first computer mouse, built in the 1960s, was made of wood.'
    },
    reject: [
      ['internet|windows|google|software|browser|operating system|app', 'That is software or a service, not a piece of hardware.']
    ]
  });

  P({
    id: 'file-extensions', category: 'Technology',
    prompt: 'Name a file extension used on computers, like the letters after the dot in a file name',
    common: ['pdf', 'jpg|jpeg', 'png', 'mp3', 'mp4', 'docx', 'gif'],
    uncommon: ['txt', 'html|htm', 'zip', 'exe', 'wav', 'mov', 'doc', 'pptx', 'xlsx', 'csv'],
    rare: ['json', 'js', 'css', 'py', 'svg', 'xml', 'bmp', 'avi', 'rar', 'iso', 'apk', 'ppt', 'xls', 'webp', 'heic'],
    deep: ['dmg', 'epub', 'mkv', 'flac', 'tiff|tif', 'md', 'java', 'cpp', 'rtf', 'odt', 'ttf', 'ogg', 'm4a', 'psd', 'sql', 'php', 'bat', 'dll', 'mpeg|mpg', 'wmv', 'webm', 'log', 'jar', 'msi', 'bin', 'ini', 'mid|midi', 'stl', 'c'],
    legendary: ['sb3', 'ics', 'tar', 'gz', '7z', 'sh', 'aac'],
    notes: {
      'sb3': 'The file type for a Scratch 3 project.',
      'docx': 'The x was added in 2007 when Word files switched to an XML-based format.',
      'heic': 'The format many iPhones use to save photos.',
      'ics': 'A calendar event file that many calendar apps can open.'
    },
    reject: [
      ['www|http|https', 'That is part of a web address, not a file extension.'],
      ['word|excel|powerpoint|photoshop|notepad', 'That is an app. Name the letters at the end of its files instead!']
    ]
  });

  P({
    id: 'programming-languages', category: 'Technology',
    prompt: 'Name a programming language',
    common: ['Python', 'Java', 'JavaScript', 'Scratch', 'C Plus Plus|cpp|cplusplus'],
    uncommon: ['C', 'C Sharp|csharp', 'Ruby', 'Swift', 'SQL'],
    rare: ['Go|golang', 'Rust', 'Kotlin', 'PHP', 'TypeScript', 'Lua', 'R', 'MATLAB', 'Assembly|assembly language', 'Visual Basic|vb'],
    deep: ['Perl', 'Haskell', 'Fortran', 'COBOL', 'Lisp', 'Pascal', 'BASIC', 'Dart', 'Scala', 'Julia', 'Objective-C', 'Logo'],
    legendary: ['Elixir', 'Erlang', 'Prolog', 'Ada', 'Smalltalk', 'Clojure', 'OCaml', 'Simula', 'ALGOL', 'APL'],
    notes: {
      'Ada': 'Named after Ada Lovelace, often called the first computer programmer.',
      'JavaScript': 'Despite the name, it is a separate language from Java. The name was mostly a marketing choice.',
      'Logo': 'Created in 1967 as a language for teaching kids, it became famous for its drawing “turtle.”',
      'Fortran': 'Released in 1957, it is one of the oldest programming languages still in use.',
      'Scratch': 'A block-based language made at the MIT Media Lab.'
    },
    reject: [
      ['html|css', 'HTML and CSS describe how web pages look, but they are not usually counted as programming languages.']
    ]
  });

  P({
    id: 'data-units', category: 'Technology',
    prompt: 'Name a unit for measuring digital information',
    common: ['Byte', 'Megabyte|mb', 'Gigabyte|gb', 'Kilobyte|kb', 'Bit'],
    uncommon: ['Terabyte|tb'],
    rare: ['Petabyte|pb', 'Nibble|nybble', 'Megabit'],
    deep: ['Exabyte|eb', 'Zettabyte|zb', 'Yottabyte|yb', 'Kibibyte|kib', 'Mebibyte|mib', 'Gibibyte|gib', 'Kilobit', 'Gigabit'],
    legendary: ['Ronnabyte', 'Quettabyte', 'Tebibyte|tib', 'Octet', 'Qubit'],
    notes: {
      'Nibble': 'Four bits, or half a byte. The name is a pun on “bite.”',
      'Kibibyte': 'Exactly 1,024 bytes, while a kilobyte is 1,000 bytes.',
      'Octet': 'Exactly eight bits. Networking engineers use this word.',
      'Qubit': 'A quantum bit, which can be in a blend of 0 and 1 at the same time.'
    },
    reject: [
      ['pixel|megapixel', 'Pixels measure image resolution, not data.'],
      ['hertz|megahertz|gigahertz|ghz|mhz', 'That measures how fast a processor runs, not how much data there is.']
    ]
  });

  /* ------------------------------------------------------------ MATH */

  P({
    id: 'angle-types', category: 'Math',
    prompt: 'Name a type of angle or angle pair from geometry',
    strip: ['angle', 'angles'],
    common: ['Acute', 'Right', 'Obtuse'],
    uncommon: ['Straight', 'Reflex', 'Complementary', 'Supplementary'],
    rare: ['Full|full turn|complete|perigon|round', 'Adjacent', 'Vertical|vertically opposite', 'Corresponding', 'Interior', 'Exterior'],
    deep: ['Alternate interior', 'Alternate exterior', 'Co-interior|same side interior|consecutive interior', 'Central', 'Inscribed', 'Angle of elevation|elevation', 'Angle of depression|depression', 'Linear pair'],
    legendary: ['Explementary|conjugate', 'Oblique', 'Zero', 'Dihedral', 'Solid'],
    notes: {
      'Explementary': 'Two angles that add up to 360 degrees.',
      'Dihedral': 'The angle between two flat planes, like the pages of an open book.',
      'Oblique': 'Any angle that is not a right angle or a multiple of one.',
      'Reflex': 'Bigger than 180 degrees but less than 360 degrees.'
    },
    reject: [
      ['degree|degrees|radian|radians|protractor', 'That is used to measure angles, not a type of angle.']
    ]
  });

  P({
    id: 'solids-3d', category: 'Math',
    prompt: 'Name a three-dimensional geometric solid',
    common: ['Sphere', 'Cube|hexahedron', 'Cylinder', 'Cone', 'Pyramid', 'Prism'],
    uncommon: ['Rectangular prism|cuboid|box', 'Triangular prism', 'Square pyramid', 'Tetrahedron|triangular pyramid', 'Hemisphere', 'Octahedron'],
    rare: ['Dodecahedron', 'Icosahedron', 'Torus|donut|doughnut', 'Ellipsoid', 'Pentagonal prism', 'Hexagonal prism', 'Rectangular pyramid', 'Pentagonal pyramid', 'Hexagonal pyramid'],
    deep: ['Frustum', 'Spheroid', 'Parallelepiped', 'Antiprism', 'Cuboctahedron', 'Truncated icosahedron', 'Rhombohedron'],
    legendary: ['Rhombicuboctahedron', 'Snub cube', 'Stella octangula|stellated octahedron', 'Icosidodecahedron'],
    notes: {
      'Truncated icosahedron': 'The shape of a classic soccer ball: 12 pentagons and 20 hexagons.',
      'Frustum': 'A cone or pyramid with its top sliced off, like a lampshade.',
      'Snub cube': 'Comes in two mirror-image versions, like a left and right hand.',
      'Stella octangula': 'Named by astronomer Johannes Kepler. It looks like two tetrahedra stuck through each other.'
    },
    reject: [
      ['circle|square|triangle|rectangle|hexagon|pentagon|oval', 'That is a flat 2D shape. Think 3D!'],
      ['tesseract|hypercube', 'That is a four-dimensional shape!']
    ]
  });

  P({
    id: 'primes-under-100', category: 'Math',
    prompt: 'Name a prime number less than 100',
    common: ['2', '3', '5', '7'],
    uncommon: ['11', '13|thirteen', '17|seventeen', '19|nineteen', '23|twenty-three'],
    rare: ['29|twenty-nine', '31|thirty-one', '37|thirty-seven', '41|forty-one', '43|forty-three', '47|forty-seven', '53|fifty-three', '97|ninety-seven'],
    deep: ['59|fifty-nine', '61|sixty-one', '67|sixty-seven', '71|seventy-one', '73|seventy-three'],
    legendary: ['79|seventy-nine', '83|eighty-three', '89|eighty-nine'],
    notes: {
      '2': 'The only even prime number.',
      '97': 'The largest prime number below 100.',
      '89': 'A prime that is also a Fibonacci number.',
      '11': 'The smallest two-digit prime.'
    },
    reject: [
      ['1|0', 'Not prime. A prime needs exactly two different factors: 1 and itself.'],
      ['51', 'Sneaky, but 51 = 3 × 17.'],
      ['57', 'Sneaky, but 57 = 3 × 19.'],
      ['91', 'Sneaky, but 91 = 7 × 13.'],
      ['87', 'Sneaky, but 87 = 3 × 29.'],
      ['9|15|21|25|27|33|35|39|45|49|55|63|65|69|75|77|81|85|93|95|99', 'Not prime. It can be divided evenly by a smaller number.'],
      ['101|103|107|109|113', 'That is prime, but it is not less than 100.']
    ]
  });

  P({
    id: 'math-constants', category: 'Math',
    prompt: 'Name a famous mathematical constant',
    common: ['Pi', 'e|eulers number|napiers constant', 'Golden ratio|phi|golden mean|golden section|divine proportion'],
    uncommon: ['Square root of 2|root 2|sqrt 2|pythagoras constant', 'Imaginary unit|i|square root of negative 1', 'Tau'],
    rare: ['Euler–Mascheroni constant|euler mascheroni|gamma', 'Silver ratio|silver mean', 'Apéry’s constant|aperys constant|apery constant'],
    deep: ['Catalan’s constant|catalans constant|catalan constant', 'Feigenbaum constant|feigenbaum constants|feigenbaum', 'Khinchin’s constant|khinchins constant|khinchin constant', 'Plastic ratio|plastic number|plastic constant', 'Omega constant', 'Champernowne constant|champernownes constant'],
    legendary: ['Gelfond’s constant|gelfonds constant|gelfond constant', 'Chaitin’s constant|chaitins constant|chaitin constant', 'Conway’s constant|conways constant|conway constant', 'Liouville’s constant|liouvilles constant|liouville constant', 'Glaisher–Kinkelin constant|glaisher kinkelin|glaishers constant'],
    notes: {
      'Tau': 'Equal to 2π, about 6.283. Some people think it should replace pi.',
      'Gelfond’s constant': 'It is e raised to the power π, about 23.14.',
      'Conway’s constant': 'Describes how fast the look-and-say sequence (1, 11, 21, 1211, ...) grows.',
      'Champernowne constant': 'Written by listing the counting numbers in order: 0.123456789101112...',
      'Chaitin’s constant': 'A number that exists but can never be fully calculated by any computer.'
    },
    reject: [
      ['infinity', 'Infinity is not a number, so it is not a constant.'],
      ['speed of light|avogadros number|avogadro|planck constant|plancks constant|gravitational constant', 'That is a physical constant from science, not a mathematical one.']
    ]
  });

  /* ------------------------------------------------------------ HUMAN BODY */

  P({
    id: 'eye-parts', category: 'Human Body',
    prompt: 'Name a part of the human eye',
    common: ['Pupil', 'Iris', 'Cornea', 'Retina', 'Lens'],
    uncommon: ['Optic nerve', 'Eyelid', 'Eyelash|lash', 'Sclera|white of the eye', 'Tear duct|nasolacrimal duct|lacrimal duct'],
    rare: ['Rods|rod|rod cells', 'Cones|cone cells', 'Optic disc|blind spot|optic disk', 'Macula'],
    deep: ['Fovea', 'Choroid', 'Vitreous humour|vitreous humor|vitreous|vitreous body', 'Aqueous humour|aqueous humor|aqueous', 'Conjunctiva'],
    legendary: ['Ciliary body|ciliary muscle', 'Suspensory ligaments|zonules|zonule', 'Lacrimal gland|tear gland'],
    notes: {
      'Cornea': 'It has no blood vessels and takes oxygen straight from the air.',
      'Fovea': 'A tiny pit packed with cone cells that gives you your sharpest vision.',
      'Optic disc': 'Where the optic nerve leaves the eye. It has no light-sensing cells, so it is a blind spot.',
      'Iris': 'Its pattern is so unique it can be used like a fingerprint.'
    }
  });

  P({
    id: 'ear-parts', category: 'Human Body',
    prompt: 'Name a part of the human ear',
    common: ['Eardrum|tympanic membrane|tympanum', 'Earlobe|lobe|lobule', 'Cochlea', 'Ear canal|auditory canal'],
    uncommon: ['Hammer|malleus', 'Anvil|incus', 'Stirrup|stapes', 'Outer ear|external ear', 'Middle ear', 'Inner ear', 'Pinna|auricle'],
    rare: ['Semicircular canals|semicircular canal', 'Eustachian tube|auditory tube', 'Auditory nerve|cochlear nerve|vestibulocochlear nerve', 'Ossicles|ear bones|middle ear bones'],
    deep: ['Oval window', 'Round window', 'Vestibule', 'Hair cells|hair cell', 'Organ of Corti', 'Tragus'],
    legendary: ['Utricle', 'Saccule', 'Basilar membrane', 'Helix'],
    notes: {
      'Stirrup': 'Also called the stapes, it is the smallest bone in the human body.',
      'Semicircular canals': 'Three fluid-filled loops that help you keep your balance.',
      'Eustachian tube': 'Connects the middle ear to the throat. It is why your ears pop on a plane.',
      'Cochlea': 'Named after the Greek word for snail because of its spiral shape.'
    },
    reject: [
      ['earwax|ear wax|wax|cerumen', 'The ear makes earwax, but it is not a part of the ear.']
    ]
  });

  P({
    id: 'brain-parts', category: 'Human Body',
    prompt: 'Name a part of the human brain',
    common: ['Cerebrum', 'Cerebellum', 'Brainstem|brain stem', 'Frontal lobe|frontal'],
    uncommon: ['Hippocampus', 'Hypothalamus', 'Amygdala', 'Medulla oblongata|medulla', 'Cerebral cortex|cortex', 'Temporal lobe|temporal', 'Occipital lobe|occipital', 'Parietal lobe|parietal'],
    rare: ['Thalamus', 'Corpus callosum', 'Pons', 'Midbrain', 'Prefrontal cortex', 'Gray matter|grey matter', 'White matter', 'Limbic system', 'Pituitary gland|pituitary', 'Cerebral hemisphere|hemisphere|left hemisphere|right hemisphere'],
    deep: ['Pineal gland|pineal', 'Basal ganglia', 'Broca’s area|brocas area|broca area', 'Wernicke’s area|wernickes area|wernicke area', 'Ventricles|ventricle', 'Motor cortex'],
    legendary: ['Insula', 'Substantia nigra', 'Fornix', 'Cingulate gyrus|cingulate cortex'],
    notes: {
      'Hippocampus': 'Named after the Greek word for seahorse because of its curvy shape.',
      'Amygdala': 'Named after the Greek word for almond, which it resembles.',
      'Cerebellum': 'Latin for “little brain,” yet it holds more than half of the brain’s neurons.',
      'Substantia nigra': 'Latin for “black substance.” Its cells make dopamine.'
    }
  });

  P({
    id: 'heart-parts', category: 'Human Body',
    prompt: 'Name a part of the human heart or a blood vessel attached to it',
    common: ['Atrium|atria|left atrium|right atrium', 'Ventricle|ventricles|left ventricle|right ventricle', 'Aorta', 'Valve|heart valve'],
    uncommon: ['Vena cava|superior vena cava|inferior vena cava', 'Pulmonary artery|pulmonary trunk', 'Pulmonary vein', 'Septum', 'Coronary artery|coronary arteries'],
    rare: ['Tricuspid valve|tricuspid', 'Mitral valve|mitral|bicuspid valve|bicuspid', 'Aortic valve', 'Pulmonary valve|pulmonic valve', 'Sinoatrial node|sa node|sinus node|pacemaker'],
    deep: ['Atrioventricular node|av node', 'Pericardium', 'Myocardium|heart muscle|cardiac muscle'],
    legendary: ['Bundle of His|his bundle', 'Purkinje fibers|purkinje fibres', 'Chordae tendineae|heartstrings|heart strings', 'Papillary muscles|papillary muscle', 'Endocardium', 'Epicardium'],
    notes: {
      'Chordae tendineae': 'These cords keep the valve flaps from flipping backward. They are nicknamed the “heartstrings.”',
      'Sinoatrial node': 'The heart’s natural pacemaker, which starts every heartbeat.',
      'Ventricle': 'The left ventricle has the thickest wall, because it pumps blood to the whole body.',
      'Mitral valve': 'Named because it looks like a bishop’s pointed hat, called a mitre.'
    }
  });

  P({
    id: 'organ-systems', category: 'Human Body',
    prompt: 'Name an organ system of the human body',
    strip: ['system'],
    common: ['Circulatory|cardiovascular', 'Respiratory', 'Digestive|gastrointestinal', 'Nervous', 'Skeletal'],
    uncommon: ['Muscular', 'Immune', 'Reproductive'],
    rare: ['Endocrine', 'Urinary|excretory|renal'],
    deep: ['Lymphatic', 'Musculoskeletal'],
    legendary: ['Integumentary|integument'],
    notes: {
      'Integumentary': 'Your skin, hair, and nails. The skin is the body’s largest organ.',
      'Lymphatic': 'Has no heart-like pump. Its fluid moves mainly when your muscles squeeze.',
      'Endocrine': 'Glands that send chemical messages called hormones through the blood.',
      'Nervous': 'Some nerve signals travel at over 100 meters per second.'
    },
    reject: [
      ['solar|operating|eco', 'Wrong kind of system! Think about the human body.'],
      ['heart|brain|lung|lungs|stomach|liver|kidney', 'That is an organ. Name the system it belongs to!']
    ]
  });

  P({
    id: 'vitamins', category: 'Human Body',
    prompt: 'Name a vitamin',
    common: ['Vitamin C|c|ascorbic acid', 'Vitamin D|d|calciferol|sunshine vitamin', 'Vitamin A|a|retinol'],
    uncommon: ['Vitamin E|e|tocopherol', 'Vitamin K|k', 'Vitamin B12|b12|vitamin b 12|b 12|cobalamin'],
    rare: ['Vitamin B6|b6|vitamin b 6|b 6|pyridoxine', 'Vitamin B1|b1|vitamin b 1|b 1|thiamine|thiamin', 'Vitamin B2|b2|vitamin b 2|b 2|riboflavin', 'Vitamin B3|b3|vitamin b 3|b 3|niacin'],
    deep: ['Vitamin B9|b9|vitamin b 9|b 9|folate|folic acid'],
    legendary: ['Vitamin B5|b5|vitamin b 5|b 5|pantothenic acid', 'Vitamin B7|b7|vitamin b 7|b 7|biotin|vitamin h|vitamin b8|b8|vitamin b 8|b 8'],
    notes: {
      'Vitamin C': 'Sailors once carried limes and lemons to prevent scurvy, caused by too little vitamin C.',
      'Vitamin D': 'Your skin makes it when sunlight shines on it.',
      'Vitamin K': 'The K comes from the German word Koagulation, because it helps blood clot.',
      'Vitamin B12': 'Contains the metal cobalt, which is where the name cobalamin comes from.'
    },
    reject: [
      ['vitamin b|b|vitamin b complex', 'There are eight B vitamins. Say which one, like B12!'],
      ['vitamin b4|b4|vitamin b10|b10|vitamin b11|b11', 'That name was used long ago, but it is no longer counted as a vitamin.'],
      ['iron|calcium|zinc|potassium|magnesium|sodium', 'That is a mineral, not a vitamin.']
    ]
  });

})(window.UT = window.UT || {});
