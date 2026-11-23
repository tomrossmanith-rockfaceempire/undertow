/* Undertow prompts: nature-food. Uses UT.P() from js/prompts.js. */
(function (UT) {
  'use strict';
  var P = UT.P;

  /* ------------------------------------------------------------- ANIMALS */

  P({
    id: 'cat-breeds', category: 'Animals',
    prompt: 'Name a cat breed',
    strip: ['cat', 'cats'],
    common: ['Siamese', 'Persian', 'Maine Coon', 'Sphynx|sphinx', 'Bengal'],
    uncommon: ['Ragdoll', 'British Shorthair', 'Scottish Fold', 'Russian Blue', 'Abyssinian', 'Siberian', 'American Shorthair', 'Himalayan', 'Manx', 'Exotic Shorthair|exotic'],
    rare: ['Birman', 'Burmese', 'Norwegian Forest Cat|norwegian forest|wegie', 'Devon Rex', 'Cornish Rex', 'Savannah', 'Oriental Shorthair|oriental', 'Tonkinese', 'Turkish Angora|angora', 'Turkish Van', 'Ragamuffin', 'Bombay', 'Munchkin', 'Egyptian Mau', 'Ocicat', 'Balinese', 'Somali', 'Selkirk Rex', 'Japanese Bobtail', 'Chartreux'],
    deep: ['Korat', 'LaPerm|la perm', 'Havana Brown|havana', 'Singapura', 'American Curl', 'Snowshoe', 'Toyger', 'Pixie-bob|pixiebob', 'Nebelung', 'Burmilla', 'Peterbald', 'Donskoy|don sphynx', 'American Bobtail', 'Cymric', 'European Shorthair|european', 'American Wirehair', 'British Longhair', 'Colorpoint Shorthair'],
    legendary: ['Khao Manee', 'Lykoi', 'Sokoke', 'Kurilian Bobtail', 'Australian Mist', 'Serengeti', 'Chausie', 'Thai'],
    notes: {
      'Lykoi': 'Its patchy, partly hairless coat earned it the nickname “werewolf cat.”',
      'Sphynx': 'Not truly hairless: it is covered in a fine, peach-like fuzz.',
      'Maine Coon': 'One of the largest domestic cat breeds.',
      'Manx': 'A natural mutation from the Isle of Man leaves many Manx cats with no tail.',
      'Khao Manee': 'An all-white breed from Thailand, often with two different-colored eyes.',
      'Thai': 'The old-style Siamese, with a rounder head than today’s show Siamese.',
      'Serengeti': 'A newer breed, still being developed, from crosses of Bengal and Oriental Shorthair cats.'
    },
    reject: [
      ['tabby|calico|tortoiseshell|tortie|tuxedo|ginger|orange tabby', 'That is a coat color or pattern, not a breed.'],
      ['domestic shorthair|domestic longhair|domestic|moggy|mixed breed', 'That describes a mixed-breed cat, not a specific breed.'],
      ['rex|bobtail|shorthair|longhair', 'Which one? Several breeds share that name, like the Devon Rex or the Japanese Bobtail.']
    ]
  });

  P({
    id: 'horse-breeds', category: 'Animals',
    prompt: 'Name a horse or pony breed',
    strip: ['horse', 'horses', 'pony', 'ponies'],
    common: ['Arabian|arab', 'Thoroughbred', 'Clydesdale', 'Mustang', 'Shetland Pony'],
    uncommon: ['Quarter Horse|american quarter horse|quarter', 'Appaloosa', 'Paint Horse|american paint horse|paint', 'Morgan', 'Friesian', 'Shire', 'Percheron', 'Belgian|belgian draft|brabant', 'Tennessee Walking Horse|tennessee walker|walking', 'Lipizzaner|lipizzan', 'Andalusian|pura raza espanola', 'Miniature Horse|miniature|american miniature horse'],
    rare: ['Standardbred', 'Hanoverian', 'Trakehner', 'Icelandic', 'Akhal-Teke', 'Haflinger', 'Connemara', 'Welsh Pony|welsh cob|welsh', 'Fjord|norwegian fjord', 'Missouri Fox Trotter|fox trotter', 'Paso Fino', 'Lusitano', 'Suffolk Punch|suffolk', 'Falabella', 'Chincoteague Pony|chincoteague|assateague', 'American Saddlebred|saddlebred', 'Irish Cob|gypsy vanner|gypsy cob|vanner|tinker', 'Peruvian Paso|peruvian horse'],
    deep: ['Marwari', 'Knabstrupper', 'Exmoor Pony', 'Dartmoor Pony', 'Fell Pony', 'Dales Pony', 'Highland Pony', 'Holsteiner', 'Oldenburg', 'Dutch Warmblood|kwpn', 'Irish Draught|irish draft', 'Cleveland Bay', 'Camargue', 'Criollo', 'Hackney', 'Mongolian Horse', 'Noriker', 'Ardennes|ardennais', 'Rocky Mountain Horse', 'New Forest Pony|new forest', 'Selle Français|selle francais', 'Barb|berber', 'Brumby', 'Orlov Trotter|orlov'],
    legendary: ['Kathiawari', 'Caspian', 'Sorraia', 'Nokota', 'Yakutian|yakut', 'Boulonnais', 'Eriskay Pony', 'Newfoundland Pony', 'American Bashkir Curly|bashkir curly|curly', 'American Cream Draft|american cream'],
    notes: {
      'Akhal-Teke': 'Its coat has a shimmering metallic sheen.',
      'Falabella': 'One of the smallest horse breeds in the world, from Argentina.',
      'Marwari': 'This Indian breed has ear tips that curve inward and can touch.',
      'Icelandic': 'Has a special smooth, fast gait called the tölt.',
      'Mustang': 'Free-roaming horses of the American West, descended from horses brought by Europeans.',
      'Brumby': 'Australia’s free-roaming horses, much like America’s mustangs.'
    },
    reject: [
      ['palomino|pinto|piebald|skewbald|roan|dapple|bay|chestnut', 'That is a coat color or pattern, not a breed.'],
      ['zebra|donkey|mule', 'A close relative, but not a horse breed.'],
      ['przewalski|przewalskis|przewalski’s horse|takhi', 'Przewalski’s horse is a wild horse, not a domestic breed.']
    ]
  });

  P({
    id: 'wild-cats', category: 'Animals',
    prompt: 'Name a wild cat species',
    common: ['Lion', 'Tiger', 'Leopard', 'Cheetah', 'Jaguar'],
    uncommon: ['Cougar|puma|mountain lion|florida panther|catamount', 'Lynx|eurasian lynx', 'Bobcat', 'Snow leopard', 'Ocelot'],
    rare: ['Serval', 'Caracal', 'Clouded leopard', 'Canada lynx', 'Iberian lynx', 'Margay', 'Jaguarundi', 'Sand cat', 'Fishing cat', 'Pallas’s cat|pallas cat|manul', 'Jungle cat'],
    deep: ['European wildcat|wildcat|scottish wildcat', 'African wildcat', 'Black-footed cat', 'Rusty-spotted cat', 'Leopard cat', 'Sunda clouded leopard', 'Asian golden cat', 'African golden cat', 'Geoffroy’s cat|geoffroy cat', 'Oncilla|tigrina'],
    legendary: ['Flat-headed cat', 'Marbled cat', 'Bay cat|bornean bay cat', 'Kodkod|güiña', 'Andean mountain cat|andean cat', 'Pampas cat|colocolo', 'Chinese mountain cat|chinese desert cat', 'Sunda leopard cat'],
    notes: {
      'Fishing cat': 'Has partly webbed feet and dives into water to catch fish.',
      'Sand cat': 'Lives in deserts and can get almost all the water it needs from its food.',
      'Snow leopard': 'Wraps its long, thick tail around itself like a scarf to keep warm.',
      'Pallas’s cat': 'Unlike most small cats, it has round pupils instead of slits.',
      'Rusty-spotted cat': 'One of the smallest wild cats in the world.'
    },
    reject: [
      ['panther|black panther', 'Black panthers are leopards or jaguars with dark fur. Name the species!'],
      ['liger|tigon', 'That is a hybrid bred in captivity, not a wild species.'],
      ['house cat|domestic cat|tabby', 'That is a pet, not a wild cat!'],
      ['hyena|civet|genet|fossa', 'Cat-like, but not a member of the cat family.']
    ]
  });

  P({
    id: 'birds-of-prey', category: 'Animals',
    prompt: 'Name a bird of prey',
    common: ['Eagle', 'Hawk', 'Owl', 'Falcon', 'Vulture'],
    uncommon: ['Bald eagle', 'Golden eagle', 'Osprey|fish hawk|sea hawk', 'Condor', 'Kestrel|american kestrel|common kestrel', 'Peregrine falcon|peregrine', 'Red-tailed hawk|redtail', 'Barn owl', 'Great horned owl', 'Snowy owl', 'Buzzard'],
    rare: ['Harrier', 'Kite', 'Harpy eagle', 'California condor', 'Andean condor', 'Goshawk|northern goshawk', 'Sparrowhawk|sparrow hawk', 'Merlin', 'Gyrfalcon', 'Turkey vulture', 'Secretary bird|secretarybird', 'Caracara', 'Cooper’s hawk|cooper hawk', 'Sea eagle', 'African fish eagle', 'Burrowing owl', 'Barred owl', 'Screech owl', 'Black vulture', 'Great gray owl|great grey owl', 'Sharp-shinned hawk', 'Red-shouldered hawk', 'Spotted owl', 'Long-eared owl', 'Short-eared owl', 'Little owl'],
    deep: ['Philippine eagle|monkey-eating eagle', 'Steller’s sea eagle|steller sea eagle', 'Bearded vulture|lammergeier|lammergeyer', 'Hobby|eurasian hobby', 'Lanner falcon|lanner', 'Saker falcon|saker', 'King vulture', 'Red kite', 'Black kite', 'Snail kite', 'Swallow-tailed kite', 'Northern harrier', 'Hen harrier', 'Eurasian eagle-owl|eagle-owl', 'Elf owl', 'Tawny owl', 'Martial eagle', 'Crowned eagle', 'Bateleur', 'Egyptian vulture', 'Griffon vulture|griffon', 'Harris’s hawk|harris hawk', 'Broad-winged hawk', 'Rough-legged hawk|rough-legged buzzard', 'Ferruginous hawk', 'Swainson’s hawk|swainson hawk', 'Pygmy owl', 'Saw-whet owl|northern saw-whet owl', 'Prairie falcon', 'White-tailed eagle', 'Honey buzzard', 'Marsh harrier', 'Mississippi kite', 'Lappet-faced vulture'],
    legendary: ['Laughing falcon', 'Bat hawk', 'Palm-nut vulture', 'Blakiston’s fish owl|blakiston fish owl', 'Pel’s fishing owl|pel fishing owl', 'Spectacled owl', 'Aplomado falcon', 'Brahminy kite', 'Wedge-tailed eagle', 'Shikra', 'Pygmy falcon'],
    notes: {
      'Peregrine falcon': 'The fastest animal on Earth, diving at over 300 km/h (about 190 mph).',
      'Bearded vulture': 'Most of its diet is bone, which it drops from high up to crack open.',
      'Secretary bird': 'Hunts snakes on long legs, stomping them with powerful kicks.',
      'Harpy eagle': 'Its back talons are often said to be as long as a grizzly bear’s claws.'
    },
    reject: [['shrike|butcher bird|butcherbird', 'Shrikes hunt like little hawks, but they are songbirds, not birds of prey.']]
  });

  P({
    id: 'venomous-snakes', category: 'Animals',
    prompt: 'Name a venomous snake',
    common: ['Rattlesnake|rattler', 'Cobra', 'King cobra', 'Black mamba', 'Viper'],
    uncommon: ['Copperhead', 'Cottonmouth|water moccasin|moccasin', 'Coral snake', 'Mamba', 'Adder|common adder|european adder', 'Taipan', 'Sea snake', 'Diamondback rattlesnake|diamondback|eastern diamondback|western diamondback', 'Pit viper', 'Sidewinder'],
    rare: ['Green mamba', 'Inland taipan|fierce snake', 'Coastal taipan', 'Krait', 'Boomslang', 'Puff adder', 'Gaboon viper', 'Fer-de-lance', 'Bushmaster', 'Eastern brown snake|brown snake', 'Tiger snake', 'Death adder', 'Spitting cobra', 'Russell’s viper|russell viper', 'Saw-scaled viper|carpet viper', 'Timber rattlesnake', 'Mojave rattlesnake', 'Eyelash viper', 'Massasauga', 'Sea krait'],
    deep: ['Rinkhals|ringhals', 'Twig snake|bird snake', 'Banded krait', 'Cape cobra', 'Egyptian cobra', 'Indian cobra|spectacled cobra', 'Monocled cobra', 'Rhinoceros viper', 'Horned viper|desert horned viper', 'Jararaca', 'Malayan pit viper', 'Habu', 'Mulga snake|king brown', 'Red-bellied black snake', 'Yellow-bellied sea snake', 'Asp viper|asp', 'Pygmy rattlesnake', 'Prairie rattlesnake', 'Nose-horned viper'],
    legendary: ['Golden lancehead', 'Cantil', 'Jumping viper', 'Blue krait', 'Blue coral snake', 'Bandy-bandy', 'Black-necked spitting cobra', 'Rough-scaled snake'],
    notes: {
      'Inland taipan': 'Has the most toxic venom of any land snake, but it is shy and rarely bites people.',
      'King cobra': 'The longest venomous snake in the world. It can grow over 5 meters long.',
      'Gaboon viper': 'Has the longest fangs of any snake, up to 5 cm.',
      'Golden lancehead': 'Lives only on one small island off Brazil.'
    },
    reject: [
      ['python|boa|boa constrictor|anaconda|ball python|reticulated python', 'Constrictors squeeze their prey. They are not venomous.'],
      ['corn snake|king snake|kingsnake|milk snake|rat snake|grass snake|gopher snake|bull snake', 'That snake has no venom and is harmless to people.'],
      ['gila monster|komodo dragon', 'Venomous, yes, but that is a lizard!']
    ]
  });

  P({
    id: 'marine-mammals', category: 'Animals',
    prompt: 'Name a marine mammal',
    common: ['Whale', 'Dolphin', 'Seal', 'Sea lion|california sea lion', 'Walrus', 'Orca|killer whale'],
    uncommon: ['Manatee', 'Sea otter', 'Narwhal', 'Beluga|beluga whale|white whale', 'Porpoise|harbor porpoise|harbour porpoise', 'Blue whale', 'Humpback whale|humpback', 'Sperm whale', 'Bottlenose dolphin|bottlenose', 'Polar bear', 'Sea cow'],
    rare: ['Dugong', 'Elephant seal', 'Leopard seal', 'Harp seal', 'Gray whale|grey whale', 'Fin whale|finback', 'Minke whale|minke', 'Right whale', 'Bowhead whale|bowhead', 'Pilot whale', 'Fur seal', 'Monk seal|hawaiian monk seal|mediterranean monk seal', 'Harbor seal|harbour seal|common seal', 'Vaquita', 'Steller sea lion|steller’s sea lion'],
    deep: ['Sei whale', 'Bryde’s whale|bryde whale', 'Beaked whale', 'Cuvier’s beaked whale|cuvier beaked whale', 'Weddell seal', 'Crabeater seal', 'Ross seal', 'Hooded seal', 'Ringed seal', 'Bearded seal', 'Grey seal|gray seal', 'Spinner dolphin', 'Risso’s dolphin|risso dolphin', 'False killer whale', 'Dall’s porpoise|dall porpoise', 'Commerson’s dolphin|commerson dolphin', 'Hector’s dolphin|hector dolphin', 'Melon-headed whale', 'Common dolphin', 'Striped dolphin', 'Spotted dolphin', 'White-sided dolphin|pacific white-sided dolphin|atlantic white-sided dolphin', 'Dusky dolphin'],
    legendary: ['Marine otter|chungungo', 'Omura’s whale|omura whale', 'Spade-toothed whale', 'Pygmy killer whale', 'Rice’s whale|rice whale', 'Ribbon seal', 'Spotted seal|largha seal', 'Pygmy sperm whale', 'Dwarf sperm whale', 'Pygmy right whale', 'Steller’s sea cow|steller sea cow'],
    notes: {
      'Polar bear': 'Counted as a marine mammal because it spends most of its life on sea ice.',
      'Blue whale': 'The largest animal known to have ever lived.',
      'Narwhal': 'Its “horn” is really a long tooth that grows through its upper lip.',
      'Sea otter': 'Has the densest fur of any animal.',
      'Sea cow': 'A nickname for manatees and dugongs, which graze on sea grass.',
      'Steller’s sea cow': 'A giant relative of the dugong, hunted to extinction by 1768.',
      'Rice’s whale': 'Recognized as its own species only in 2021, and found in just one small area off the U.S. Gulf Coast.'
    },
    reject: [
      ['whale shark', 'Despite its name, the whale shark is a fish, not a mammal.'],
      ['shark|fish|penguin|jellyfish|octopus|turtle|sea turtle|tortoise|seahorse|stingray|squid|eel|crab|lobster|starfish|sea star|clam', 'That sea animal is not a mammal.'],
      ['otter|river otter', 'River otters live mostly in fresh water. Try the sea otter or the marine otter!']
    ]
  });

  P({
    id: 'insects', category: 'Animals',
    prompt: 'Name an insect',
    common: ['Ant', 'Bee|honeybee', 'Butterfly', 'Fly|housefly', 'Mosquito', 'Ladybug|ladybird|lady beetle', 'Beetle', 'Grasshopper'],
    uncommon: ['Dragonfly', 'Moth', 'Cricket', 'Wasp', 'Cockroach|roach', 'Termite', 'Flea', 'Praying mantis|mantis|mantid', 'Firefly|lightning bug', 'Hornet', 'Bumblebee', 'Cicada', 'Louse|lice|head louse', 'Caterpillar'],
    rare: ['Stick insect|walking stick|stick bug|phasmid', 'Aphid', 'Earwig', 'Damselfly', 'Silverfish', 'Katydid', 'Locust', 'Weevil|boll weevil', 'Stink bug|shield bug', 'Bed bug', 'Water strider|pond skater', 'Gnat', 'Monarch butterfly|monarch', 'Yellowjacket', 'Horsefly', 'Mayfly', 'Dung beetle', 'Stag beetle', 'Leaf insect|walking leaf', 'Fruit fly', 'June bug|june beetle|may bug|maybug|cockchafer', 'Japanese beetle', 'Fire ant', 'Crane fly', 'Carpenter ant', 'Carpenter bee', 'Silkworm|silk moth', 'Mealworm', 'Maggot'],
    deep: ['Caddisfly', 'Lacewing', 'Scorpionfly', 'Thrips', 'Leafhopper', 'Treehopper', 'Antlion|doodlebug', 'Dobsonfly', 'Stonefly', 'Firebrat', 'Booklouse|barklouse', 'Cochineal', 'Water boatman', 'Backswimmer', 'Whirligig beetle', 'Assassin bug', 'Hercules beetle', 'Atlas moth', 'Luna moth', 'Tsetse fly', 'Botfly', 'Hoverfly|flower fly', 'Sawfly', 'Blowfly|blow fly|bluebottle|greenbottle', 'Mud dauber', 'Rhinoceros beetle', 'Leafcutter ant|leaf-cutter ant', 'Army ant', 'Bullet ant', 'Whitefly', 'Mealybug', 'Hawk moth|sphinx moth|hummingbird moth', 'Giant water bug', 'Click beetle', 'Tiger beetle', 'Mole cricket'],
    legendary: ['Webspinner', 'Angel insect|zorapteran', 'Jumping bristletail|bristletail', 'Snakefly', 'Alderfly', 'Twisted-wing parasite|strepsipteran', 'Ice crawler|rock crawler', 'Heelwalker|gladiator', 'Weta|giant weta', 'Goliath beetle', 'Titan beetle', 'Owlfly'],
    notes: {
      'Ladybug': 'Not a bug at all: ladybugs are beetles.',
      'Caterpillar': 'The young (larva) of a butterfly or moth. Larvae are insects too!',
      'Cicada': 'Periodical cicadas spend 13 or 17 years underground before emerging.',
      'Goliath beetle': 'One of the heaviest insects on Earth.',
      'Dragonfly': 'Catches up to 95% of the prey it chases.'
    },
    reject: [
      ['spider|tick|scorpion|mite', 'That is an arachnid, with eight legs. Insects have six.'],
      ['centipede|millipede', 'Too many legs! Insects have exactly six.'],
      ['pill bug|roly poly|woodlouse|sowbug|sow bug', 'Surprise: that is a crustacean, related to shrimp!'],
      ['worm|earthworm|slug|snail', 'No legs at all, so not an insect.'],
      ['springtail', 'Springtails have six legs, but scientists no longer count them as true insects.']
    ]
  });

  P({
    id: 'amphibians', category: 'Animals',
    prompt: 'Name an amphibian',
    common: ['Frog', 'Toad', 'Salamander', 'Newt'],
    uncommon: ['Axolotl', 'Bullfrog', 'Tree frog|treefrog', 'Poison dart frog|poison frog|dart frog|poison arrow frog', 'Cane toad|marine toad', 'Red-eyed tree frog', 'Caecilian', 'Hellbender', 'Fire salamander', 'Tiger salamander', 'Spring peeper', 'Leopard frog'],
    rare: ['Mudpuppy', 'Olm|proteus', 'Siren|greater siren', 'Amphiuma', 'Chinese giant salamander|giant salamander', 'Japanese giant salamander', 'Glass frog', 'Goliath frog', 'Surinam toad|suriname toad|pipa', 'Natterjack toad|natterjack', 'Horned frog|pacman frog', 'African clawed frog|clawed frog', 'Wood frog', 'Common toad|european toad', 'Spadefoot toad|spadefoot', 'Golden poison frog', 'Golden toad', 'Midwife toad', 'Fire-bellied toad', 'Great crested newt', 'Eastern newt|red eft|red-spotted newt', 'Spotted salamander', 'American toad', 'Common frog', 'Smooth newt|common newt', 'White’s tree frog|white tree frog|dumpy tree frog|australian green tree frog', 'Green tree frog', 'Gray tree frog|grey tree frog'],
    deep: ['Darwin’s frog|darwin frog', 'Wallace’s flying frog|flying frog', 'Tomato frog', 'Texas blind salamander', 'Ensatina', 'Rough-skinned newt', 'Coquí|coqui', 'Budgett’s frog|budgett frog', 'Mole salamander', 'Marbled salamander', 'Pickerel frog', 'Chorus frog', 'Red-backed salamander', 'Alpine newt', 'Cuban tree frog', 'Mantella'],
    legendary: ['Gastric-brooding frog', 'Purple frog|pignose frog', 'Lake Titicaca frog|titicaca water frog', 'Iberian ribbed newt|ribbed newt|sharp-ribbed newt', 'Hairy frog|horror frog', 'Desert rain frog', 'Mexican burrowing toad'],
    notes: {
      'Axolotl': 'Keeps its feathery gills as an adult and can regrow lost limbs.',
      'Olm': 'A blind cave salamander that may live for more than 100 years.',
      'Glass frog': 'Its belly skin is see-through, so you can watch its heart beat.',
      'Gastric-brooding frog': 'Raised its babies inside its stomach. Sadly, it is now extinct.',
      'Hairy frog': 'Can break its own toe bones to push out claws when threatened.'
    },
    reject: [
      ['lizard|gecko|iguana|turtle|tortoise|snake|crocodile|alligator|chameleon|tuatara', 'That is a reptile, not an amphibian.'],
      ['tadpole|polliwog', 'Tadpoles are young frogs and toads. Which kind?'],
      ['mudskipper|lungfish', 'That is a fish that can breathe air, not an amphibian.']
    ]
  });

  P({
    id: 'sharks', category: 'Animals',
    prompt: 'Name a kind of shark (living or extinct)',
    common: ['Great white shark|great white|white shark|white pointer', 'Hammerhead shark|hammerhead|great hammerhead|scalloped hammerhead|smooth hammerhead', 'Tiger shark|tiger', 'Whale shark', 'Bull shark|bull'],
    uncommon: ['Mako shark|mako|shortfin mako', 'Nurse shark|nurse', 'Megalodon|meg', 'Basking shark', 'Blue shark', 'Lemon shark', 'Blacktip shark|blacktip', 'Thresher shark|thresher', 'Reef shark', 'Goblin shark', 'Greenland shark', 'Megamouth shark|megamouth', 'Dogfish|spiny dogfish'],
    rare: ['Leopard shark', 'Zebra shark', 'Cookiecutter shark|cookiecutter|cookie cutter shark', 'Frilled shark', 'Wobbegong|carpet shark', 'Sand tiger shark|sand tiger|sand shark|grey nurse shark|ragged-tooth shark', 'Bonnethead', 'Oceanic whitetip shark|oceanic whitetip', 'Silky shark', 'Porbeagle', 'Salmon shark', 'Horn shark', 'Port Jackson shark', 'Sixgill shark|bluntnose sixgill', 'Sevengill shark|broadnose sevengill', 'Epaulette shark|walking shark', 'Swell shark', 'Catshark', 'Lanternshark|lantern shark', 'Sawshark|saw shark', 'Blacktip reef shark', 'Whitetip reef shark', 'Grey reef shark|gray reef shark'],
    deep: ['Galapagos shark', 'Dusky shark', 'Sandbar shark', 'Bramble shark', 'Crocodile shark', 'Pyjama shark|pajama shark', 'Sleeper shark', 'Spinner shark', 'Pygmy shark', 'Kitefin shark', 'Gulper shark', 'Angel shark|angelshark', 'Ganges shark', 'Copper shark|bronze whaler', 'Tope|school shark|soupfin shark', 'Smooth-hound|smoothhound', 'Silvertip shark|silvertip', 'Caribbean reef shark'],
    legendary: ['Ninja lanternshark', 'Pocket shark', 'Viper dogfish|viper shark', 'Daggernose shark', 'Dwarf lanternshark', 'Ginsu shark|cretoxyrhina', 'Speartooth shark', 'Pondicherry shark', 'Tasselled wobbegong|tasseled wobbegong', 'Longfin mako'],
    notes: {
      'Greenland shark': 'Scientists estimate it can live 250 years or more, the longest known lifespan of any vertebrate.',
      'Whale shark': 'The biggest fish in the world, yet it eats tiny plankton.',
      'Cookiecutter shark': 'Bites neat round plugs of flesh out of much bigger animals.',
      'Megalodon': 'One of the largest predators ever. It died out about 3.6 million years ago.',
      'Ninja lanternshark': 'Scientifically described in 2015. The lead scientist’s young cousins helped pick its common name.'
    },
    reject: [
      ['whale|killer whale|orca|dolphin', 'That is a mammal, not a shark. (The whale shark is a shark, though!)'],
      ['stingray|ray|manta ray|manta|skate|sawfish|guitarfish', 'A close cousin of sharks, but that is a ray.'],
      ['ratfish|chimaera|ghost shark', 'Ghost sharks are cousins of sharks, not true sharks.']
    ]
  });

  P({
    id: 'parrots', category: 'Animals',
    prompt: 'Name a kind of parrot',
    common: ['Macaw', 'Cockatoo', 'Parakeet', 'Budgie|budgerigar|budgy', 'Cockatiel', 'African grey|african gray|african grey parrot|african gray parrot|grey parrot|gray parrot'],
    uncommon: ['Lovebird', 'Scarlet macaw', 'Blue-and-yellow macaw|blue and gold macaw', 'Hyacinth macaw', 'Conure', 'Amazon parrot|amazon', 'Lorikeet|rainbow lorikeet', 'Kakapo|kākāpō', 'Kea', 'Parrotlet'],
    rare: ['Eclectus|eclectus parrot', 'Galah|rose-breasted cockatoo', 'Rosella', 'Lory', 'Caique', 'Quaker parrot|quaker|monk parakeet', 'Sun conure', 'Ring-necked parakeet|ringneck|rose-ringed parakeet|indian ringneck', 'Senegal parrot|senegal', 'Pionus', 'Sulphur-crested cockatoo|sulfur-crested cockatoo', 'Kaka|kākā', 'Spix’s macaw|spix macaw|little blue macaw', 'Carolina parakeet', 'Military macaw', 'Green-winged macaw|red-and-green macaw', 'Corella', 'Palm cockatoo', 'Major Mitchell’s cockatoo|pink cockatoo', 'Red-tailed black cockatoo|black cockatoo', 'Umbrella cockatoo|white cockatoo', 'Green-cheeked conure', 'Alexandrine parakeet|alexandrine', 'Moluccan cockatoo|salmon-crested cockatoo'],
    deep: ['Ground parrot', 'Hanging parrot', 'Fig parrot', 'Gang-gang cockatoo|gang-gang', 'Lear’s macaw|lear macaw', 'Superb parrot', 'Princess parrot', 'Swift parrot', 'Orange-bellied parrot', 'Golden conure|golden parakeet', 'Bourke’s parrot|bourke parrot', 'Turquoise parrot', 'Hawk-headed parrot', 'Thick-billed parrot', 'Kakariki', 'Goffin’s cockatoo|goffin cockatoo|tanimbar corella', 'Meyer’s parrot|meyer parrot', 'Jenday conure|jandaya parakeet'],
    legendary: ['Night parrot', 'Vasa parrot', 'Pygmy parrot', 'Glaucous macaw', 'Puerto Rican amazon|iguaca', 'Pesquet’s parrot|pesquet parrot|dracula parrot', 'Kuhl’s lorikeet|rimatara lorikeet', 'Antipodes parakeet', 'Blue-throated macaw', 'Seychelles black parrot'],
    notes: {
      'Kakapo': 'The world’s only flightless parrot, and the heaviest parrot too.',
      'Hyacinth macaw': 'The longest parrot that can fly, about one meter from beak to tail.',
      'Carolina parakeet': 'The only parrot native to the eastern U.S. The last known one died in a zoo in 1918.',
      'Night parrot': 'So secretive that no one took a confirmed photo of a live one until 2013.',
      'Pesquet’s parrot': 'Nicknamed the “Dracula parrot” for its black and red feathers.'
    },
    reject: [['toucan|hornbill|myna|mynah|crow|raven', 'Clever or colorful, but not a parrot!']]
  });

  P({
    id: 'primates', category: 'Animals',
    prompt: 'Name a primate',
    common: ['Gorilla|mountain gorilla|western gorilla|eastern gorilla|lowland gorilla|silverback', 'Chimpanzee|chimp|common chimpanzee', 'Orangutan|orangutang|orang utan|bornean orangutan|sumatran orangutan', 'Monkey', 'Baboon', 'Lemur'],
    uncommon: ['Bonobo', 'Gibbon', 'Mandrill', 'Capuchin|capuchin monkey', 'Howler monkey|howler', 'Spider monkey', 'Macaque', 'Marmoset', 'Ape', 'Squirrel monkey', 'Proboscis monkey|proboscis', 'Ring-tailed lemur|ringtail lemur', 'Tamarin|golden lion tamarin', 'Rhesus monkey|rhesus macaque|rhesus', 'Snow monkey|japanese macaque'],
    rare: ['Human|humans|homo sapiens', 'Tarsier', 'Loris|slow loris', 'Bushbaby|galago|bush baby', 'Aye-aye', 'Colobus|colobus monkey', 'Langur', 'Gelada|gelada baboon', 'Snub-nosed monkey|golden snub-nosed monkey', 'Siamang', 'Vervet|vervet monkey', 'Drill', 'Uakari', 'Sifaka', 'Indri', 'Owl monkey|night monkey', 'Mouse lemur', 'Saki', 'Titi monkey|titi', 'Mangabey', 'Guenon'],
    deep: ['Potto', 'Muriqui|woolly spider monkey', 'Woolly monkey', 'Patas monkey|patas', 'De Brazza’s monkey|de brazza monkey', 'Hoolock gibbon|hoolock', 'Hanuman langur|gray langur', 'Douc|douc langur', 'Barbary macaque|barbary ape', 'Sportive lemur', 'Bamboo lemur', 'Ruffed lemur', 'Pygmy marmoset', 'Neanderthal|neandertal', 'Golden monkey', 'Lion-tailed macaque', 'Diana monkey', 'Emperor tamarin', 'Cotton-top tamarin'],
    legendary: ['Angwantibo', 'Talapoin', 'Kipunji', 'Allen’s swamp monkey|allen swamp monkey', 'Lesula', 'Gigantopithecus', 'Skywalker hoolock gibbon|skywalker gibbon', 'Madame Berthe’s mouse lemur|berthe mouse lemur', 'Popa langur'],
    notes: {
      'Human': 'Yes! Humans are primates, part of the great ape family.',
      'Neanderthal': 'An extinct close relative of modern humans that lived in Europe and Asia.',
      'Tarsier': 'Each of its eyes is about as big as its whole brain.',
      'Aye-aye': 'Taps on trees and fishes out grubs with a long, skinny middle finger.',
      'Madame Berthe’s mouse lemur': 'The world’s smallest primate, weighing about 30 grams.',
      'Skywalker hoolock gibbon': 'Described in 2017 and named partly after Luke Skywalker.'
    },
    reject: [['sloth|koala|raccoon|red panda|meerkat|kinkajou|flying lemur|colugo', 'Not a primate, though it might look a bit like one!']]
  });

  P({
    id: 'lizards', category: 'Animals',
    prompt: 'Name a kind of lizard',
    common: ['Iguana|green iguana', 'Gecko', 'Chameleon|chamaeleon', 'Komodo dragon|komodo', 'Bearded dragon|beardie'],
    uncommon: ['Monitor lizard|monitor', 'Gila monster', 'Skink', 'Anole|green anole|carolina anole', 'Horned lizard|horny toad|horned toad', 'Frilled lizard|frilled|frill-necked lizard|frilled dragon', 'Leopard gecko', 'Basilisk|jesus lizard', 'Marine iguana', 'Tegu', 'Blue-tongued skink|blue-tongue skink|bluetongue'],
    rare: ['Thorny devil|thorny dragon|moloch', 'Chuckwalla', 'Glass lizard|glass snake', 'Slowworm|slow worm|blindworm', 'Beaded lizard|mexican beaded lizard|beaded', 'Uromastyx|spiny-tailed lizard', 'Water dragon|chinese water dragon', 'Flying dragon|draco|flying lizard', 'Collared lizard', 'Whiptail|whiptail lizard', 'Fence lizard', 'Alligator lizard', 'Crested gecko', 'Tokay gecko|tokay', 'Savannah monitor', 'Nile monitor', 'Armadillo lizard', 'Night lizard', 'Goanna', 'Agama', 'Spiny lizard'],
    deep: ['Crocodile monitor', 'Lace monitor', 'Perentie', 'Shingleback|sleepy lizard', 'Caiman lizard', 'Leaf-tailed gecko|uroplatus', 'Panther chameleon', 'Jackson’s chameleon|jackson chameleon|three-horned chameleon', 'Veiled chameleon', 'Day gecko', 'Rhinoceros iguana', 'Desert iguana', 'Lava lizard', 'Racerunner', 'Gargoyle gecko', 'Water monitor|asian water monitor', 'Sand lizard', 'Wall lizard', 'Green lizard|european green lizard', 'Sailfin lizard'],
    legendary: ['Nano chameleon|brookesia nana', 'Sungazer', 'Galliwasp', 'Earless monitor', 'Fiji banded iguana', 'Blue iguana|grand cayman blue iguana', 'Crocodile skink', 'Knob-tailed gecko'],
    notes: {
      'Komodo dragon': 'The largest living lizard, up to 3 meters long.',
      'Basilisk': 'Can sprint across the surface of water on its back legs.',
      'Thorny devil': 'Tiny grooves in its skin carry water to the corners of its mouth so it can drink.',
      'Slowworm': 'A legless lizard. Unlike snakes, it can blink.',
      'Nano chameleon': 'Described from Madagascar in 2021, it may be the smallest reptile on Earth.'
    },
    reject: [
      ['salamander|newt|axolotl', 'Lizard-shaped, but that is an amphibian!'],
      ['tuatara', 'Tuataras look like lizards but belong to their own ancient group of reptiles.'],
      ['crocodile|alligator|snake|turtle|tortoise', 'A reptile, but not a lizard.'],
      ['dragon', 'Which dragon? Try a real lizard with “dragon” in its name.']
    ]
  });

  P({
    id: 'bears', category: 'Animals',
    prompt: 'Name a kind of bear (living or extinct)',
    common: ['Polar bear|polar|ice bear', 'Grizzly bear|grizzly|silvertip', 'Brown bear|alaskan brown bear', 'Black bear|american black bear', 'Panda|giant panda|panda bear|giant panda bear'],
    uncommon: ['Kodiak bear|kodiak', 'Sun bear', 'Sloth bear', 'Spectacled bear|andean bear', 'Asiatic black bear|moon bear|asian black bear|himalayan black bear'],
    rare: ['Cave bear', 'Short-faced bear|giant short-faced bear|arctodus', 'Spirit bear|kermode bear|kermode', 'Cinnamon bear', 'Glacier bear|blue bear', 'Eurasian brown bear', 'Kamchatka brown bear', 'Syrian brown bear', 'Gobi bear|mazaalai', 'Marsican brown bear|apennine brown bear', 'Himalayan brown bear|himalayan red bear'],
    deep: ['California grizzly|california golden bear', 'Mexican grizzly', 'Ussuri brown bear|black grizzly', 'Formosan black bear', 'Tibetan blue bear'],
    legendary: ['Atlas bear', 'Etruscan bear', 'Arctotherium|south american short-faced bear', 'Pizzly|pizzly bear|grolar|grolar bear'],
    notes: {
      'Polar bear': 'Under its see-through fur, a polar bear’s skin is black.',
      'Sun bear': 'The smallest bear. It uses its extra-long tongue to lick honey and insects out of nests.',
      'Sloth bear': 'Can close its nostrils and vacuum termites out of their mounds.',
      'California grizzly': 'Still pictured on California’s state flag, though it died out in the 1920s.',
      'Pizzly': 'A rare wild hybrid of a polar bear and a grizzly.'
    },
    reject: [
      ['koala|koala bear', 'Koalas are marsupials, not bears!'],
      ['red panda', 'Red pandas are not bears. They have a family all their own.'],
      ['sloth', 'Sloths are not bears, but the sloth bear is!'],
      ['teddy bear|teddy|gummy bear|care bear|pooh bear|winnie the pooh|paddington bear|water bear|tardigrade|bearcat|binturong', 'Not a true bear!']
    ]
  });

  P({
    id: 'chicken-breeds', category: 'Animals',
    prompt: 'Name a chicken breed',
    strip: ['chicken', 'chickens'],
    common: ['Rhode Island Red', 'Leghorn|white leghorn|brown leghorn', 'Silkie|silky', 'Plymouth Rock|barred rock|barred plymouth rock'],
    uncommon: ['Orpington|buff orpington', 'Wyandotte|silver laced wyandotte|golden laced wyandotte', 'Australorp', 'Sussex|light sussex|speckled sussex', 'Brahma', 'Cochin', 'Polish', 'Ameraucana', 'Araucana'],
    rare: ['Marans|black copper marans|cuckoo marans', 'Faverolles|salmon faverolles', 'Sebright', 'Ayam Cemani', 'Jersey Giant', 'Barnevelder', 'Welsummer', 'Hamburg', 'Minorca', 'Andalusian|blue andalusian', 'Ancona', 'Cornish|indian game', 'Dorking', 'Naked Neck|turken', 'Serama', 'New Hampshire|new hampshire red', 'Langshan', 'Buckeye', 'Dominique|dominicker', 'Delaware', 'Cream Legbar|legbar', 'Old English Game', 'Rhode Island White'],
    deep: ['Onagadori', 'Phoenix', 'Sultan', 'Malay', 'Chantecler', 'Appenzeller Spitzhauben|spitzhauben', 'Crèvecœur|crevecoeur', 'Houdan', 'La Flèche|la fleche', 'Lakenvelder', 'Campine', 'Java', 'Yokohama', 'Sumatra', 'Belgian d’Uccle|d uccle|duccle', 'Bielefelder', 'Asil|aseel', 'Shamo', 'Modern Game', 'Japanese Bantam|chabo'],
    legendary: ['Dong Tao|dragon chicken', 'Kraienköppe|kraienkoppe|twentse', 'Sicilian Buttercup|buttercup', 'Scots Dumpy|dumpy', 'Derbyshire Redcap|redcap', 'Bresse', 'Swedish Flower Hen|blommehöna', 'Vorwerk', 'Orloff'],
    notes: {
      'Ayam Cemani': 'Black all over: feathers, skin, beak, and even its bones.',
      'Silkie': 'Fluffy fur-like feathers, black skin, and five toes on each foot.',
      'Onagadori': 'A Japanese breed whose tail feathers can grow longer than 10 meters.',
      'Dong Tao': 'A rare Vietnamese breed with enormous, thick legs.',
      'Araucana': 'Lays blue eggs.'
    },
    reject: [
      ['bantam', 'Bantam usually means a small-sized version of a breed. Which breed?'],
      ['easter egger|olive egger', 'Those are mixed-breed hens, not a recognized breed.'],
      ['isa brown|red star|black star|golden comet|sex link|red sex link|black sex link', 'That is a hybrid bred for laying eggs, not a recognized breed.'],
      ['rooster|hen|chick|pullet|cockerel|broiler', 'That word describes a chicken’s age, sex, or use, not its breed.']
    ]
  });

  /* -------------------------------------------------------------- NATURE */

  P({
    id: 'trees', category: 'Nature',
    prompt: 'Name a kind of tree',
    strip: ['tree', 'trees'],
    common: ['Oak|white oak|red oak|live oak|english oak', 'Maple|sugar maple|red maple|japanese maple|silver maple', 'Pine|white pine|scots pine|ponderosa pine|ponderosa|lodgepole pine|longleaf pine|loblolly pine', 'Palm', 'Birch|white birch|silver birch|paper birch', 'Willow|weeping willow', 'Apple', 'Cherry|cherry blossom|sakura'],
    uncommon: ['Elm', 'Ash', 'Spruce|blue spruce|norway spruce|sitka spruce', 'Fir|balsam fir|fraser fir|noble fir', 'Cedar', 'Redwood|coast redwood', 'Giant sequoia|sequoia', 'Aspen|quaking aspen', 'Poplar', 'Beech', 'Magnolia', 'Dogwood', 'Cypress', 'Walnut', 'Chestnut', 'Orange', 'Lemon', 'Peach', 'Pear', 'Plum', 'Coconut', 'Hickory', 'Sycamore'],
    rare: ['Baobab', 'Eucalyptus|gum', 'Yew', 'Larch|tamarack', 'Hemlock', 'Juniper', 'Linden|basswood', 'Lime', 'Mahogany', 'Teak', 'Ginkgo|gingko|maidenhair', 'Olive', 'Fig', 'Banyan', 'Alder', 'Hawthorn', 'Holly', 'Acacia', 'Jacaranda', 'Cottonwood', 'Mango', 'Avocado', 'Horse chestnut|buckeye|conker', 'Rowan|mountain ash', 'Hornbeam', 'Douglas fir', 'Pecan', 'Mangrove', 'Elder|elderberry', 'Almond', 'Apricot', 'Mulberry', 'Hazel|hazelnut', 'Crabapple|crab apple', 'London plane|plane|plane tree', 'Date palm|date', 'Balsa'],
    deep: ['Monkey puzzle', 'Kapok|ceiba', 'Sweetgum|sweet gum|liquidambar', 'Tulip poplar|tuliptree|yellow poplar', 'Joshua tree', 'Catalpa', 'Sassafras', 'Mesquite', 'Persimmon', 'Pawpaw|papaw', 'Osage orange|hedge apple', 'Dawn redwood', 'Bristlecone pine|bristlecone', 'Bald cypress', 'Cork oak', 'Rubber tree', 'Cacao|cocoa', 'Neem', 'Tamarind', 'Locust|black locust|honey locust', 'Tupelo|black gum', 'Ebony', 'Sandalwood', 'Rosewood', 'Redbud', 'Crape myrtle|crepe myrtle', 'Frangipani|plumeria', 'Breadfruit', 'Lychee|litchi', 'Pistachio', 'Cashew', 'Nectarine', 'Grapefruit', 'Bodhi tree|bodhi|sacred fig'],
    legendary: ['Wollemi pine', 'Dragon’s blood tree|dragon blood|dragon tree', 'Quiver tree|kokerboom', 'Sandbox tree', 'Manchineel', 'Rainbow eucalyptus', 'Kauri', 'Huon pine', 'Pōhutukawa|pohutukawa', 'Lignum vitae', 'Bunya pine'],
    notes: {
      'Bristlecone pine': 'Some are over 4,800 years old, among the oldest living things on Earth.',
      'Giant sequoia': 'The largest trees on Earth by volume.',
      'Wollemi pine': 'Known only from fossils until living trees were found in Australia in 1994.',
      'Sandbox tree': 'Its seed pods explode with a bang, flinging seeds far away.',
      'Manchineel': 'So toxic that rain dripping off its leaves can blister your skin.',
      'Lime': 'Could be the citrus tree, or the linden, which the British call a lime tree.',
      'Mangrove': 'Grows in salty coastal water, standing on stilt-like roots.'
    },
    reject: [
      ['bamboo', 'Bamboo can grow as tall as a tree, but it is actually a giant grass.'],
      ['banana', 'Banana plants look like trees, but they are giant herbs with no wood.'],
      ['christmas', 'Christmas trees are usually firs, spruces, or pines. Name one!'],
      ['bonsai', 'Bonsai is the art of growing miniature trees. Which kind of tree?'],
      ['evergreen|deciduous|conifer|coniferous|broadleaf|fruit|nut|shade|plant|shrub|bush', 'That describes a whole group of plants. Name a specific kind of tree!']
    ]
  });

  P({
    id: 'edible-mushrooms', category: 'Nature',
    prompt: 'Name an edible mushroom',
    strip: ['mushroom', 'mushrooms'],
    common: ['Button mushroom|white button|white|champignon', 'Portobello|portabella|portobella|portabello', 'Shiitake|shitake', 'Oyster mushroom'],
    uncommon: ['Cremini|crimini|baby bella|chestnut|brown', 'Chanterelle|girolle', 'Morel', 'Porcini|cep|king bolete|penny bun', 'Enoki|enokitake', 'Maitake|hen of the woods', 'Truffle|black truffle|white truffle', 'King oyster|king trumpet|eryngii'],
    rare: ['Lion’s mane|lion mane', 'Chicken of the woods|sulphur shelf|sulfur shelf', 'Shimeji|beech|bunashimeji', 'Wood ear|cloud ear|jelly ear', 'Black trumpet|horn of plenty', 'Hedgehog mushroom|hedgehog|sweet tooth|pied de mouton', 'Matsutake', 'Nameko', 'Straw mushroom|paddy straw', 'Puffball|giant puffball', 'Shaggy mane|shaggy ink cap', 'Lobster mushroom', 'Field mushroom|meadow', 'Blewit|wood blewit'],
    deep: ['Cauliflower mushroom|cauliflower fungus', 'Saffron milk cap|red pine', 'Parasol', 'St George’s mushroom|saint george', 'Snow fungus|tremella|silver ear', 'Pioppino|black poplar', 'Golden oyster', 'Pink oyster', 'Wine cap|king stropharia|garden giant'],
    legendary: ['Bamboo fungus|veiled lady|bamboo pith', 'Termite mushroom|termitomyces', 'Beefsteak fungus|beefsteak|ox tongue', 'Indigo milk cap|indigo milky', 'Candy cap'],
    notes: {
      'Portobello': 'Button, cremini, and portobello are all the same species, picked at different ages.',
      'Truffle': 'Grows underground and is sniffed out by trained dogs or pigs.',
      'Morel': 'Must be cooked. Poisonous “false morels” look similar, so foragers need an expert eye.',
      'Indigo milk cap': 'An edible mushroom that is bright blue, inside and out.',
      'Candy cap': 'Smells so much like maple syrup that it is used in desserts.'
    },
    reject: [
      ['death cap|destroying angel|fly agaric|jack o lantern|false morel|deadly webcap|galerina|toadstool|earthball|false parasol|panther cap', 'Danger! That mushroom is poisonous. Never eat a wild mushroom unless an expert has identified it.'],
      ['amanita', 'Careful! The Amanita group includes the deadliest mushrooms, like the death cap. Never eat a wild mushroom unless an expert has identified it.']
    ]
  });

  /* ---------------------------------------------------- PLANTS AND PRODUCE */

  P({
    id: 'culinary-herbs', category: 'Food',
    prompt: 'Name an herb used in cooking',
    common: ['Basil|sweet basil|genovese basil', 'Parsley|flat-leaf parsley|italian parsley|curly parsley', 'Mint', 'Cilantro|coriander|coriander leaf|chinese parsley', 'Rosemary', 'Oregano', 'Thyme'],
    uncommon: ['Dill|dill weed', 'Sage', 'Chives', 'Bay leaf|bay|bay laurel|laurel', 'Tarragon', 'Lemongrass', 'Marjoram', 'Fennel'],
    rare: ['Chervil', 'Lovage', 'Sorrel', 'Savory|summer savory|winter savory', 'Lemon balm', 'Thai basil', 'Curry leaf', 'Shiso|perilla', 'Epazote', 'Makrut lime leaf|makrut|lime leaf', 'Borage', 'Lemon verbena', 'Spearmint', 'Peppermint', 'Garlic chives|chinese chives', 'Fenugreek leaves|methi|fenugreek', 'Culantro|sawtooth coriander|recao', 'Holy basil|tulsi', 'Lavender'],
    deep: ['Vietnamese coriander|rau ram', 'Mitsuba', 'Angelica', 'Pandan|screwpine', 'Lemon thyme', 'Hyssop', 'Rue'],
    legendary: ['Pápalo|papalo', 'Hoja santa', 'Sweet cicely', 'Costmary', 'Sweet woodruff|woodruff', 'Lemon myrtle', 'Salad burnet|burnet', 'Rice paddy herb|ngo om'],
    notes: {
      'Cilantro': 'Some people have a gene that makes cilantro taste like soap.',
      'Basil': 'Its name comes from a Greek word meaning “royal.”',
      'Bay leaf': 'Ancient Greeks and Romans crowned winners with wreaths of bay laurel.',
      'Epazote': 'Often cooked with beans in Mexican kitchens.',
      'Rue': 'Used in tiny amounts in some Ethiopian and Mediterranean cooking. Larger amounts are harmful.'
    },
    reject: [
      ['cinnamon|cumin|nutmeg|pepper|black pepper|paprika|cloves|turmeric|cardamom|saffron|ginger', 'That is a spice, from seeds, bark, roots, or flowers. Herbs are the leafy parts.'],
      ['salt', 'Salt is a mineral, not an herb.'],
      ['herbes de provence|italian seasoning|fines herbes|bouquet garni', 'That is a mix of herbs. Name one of the herbs in it!']
    ]
  });

  P({
    id: 'spices', category: 'Food',
    prompt: 'Name a spice',
    common: ['Cinnamon', 'Pepper|black pepper|peppercorn|white pepper|green peppercorn', 'Paprika|smoked paprika|sweet paprika', 'Cumin', 'Nutmeg', 'Ginger', 'Turmeric'],
    uncommon: ['Cloves|clove', 'Cardamom|cardamon', 'Saffron', 'Cayenne|cayenne pepper', 'Vanilla', 'Allspice|pimento|jamaica pepper', 'Mustard seed|mustard', 'Chili flakes|red pepper flakes|crushed red pepper|chili|chile|chilli|dried chili', 'Coriander seed|coriander', 'Star anise', 'Anise|aniseed|anise seed', 'Fennel seed|fennel', 'Garlic powder|garlic'],
    rare: ['Fenugreek', 'Caraway', 'Mace', 'Sumac|sumach', 'Juniper berry|juniper', 'Celery seed', 'Poppy seed', 'Sesame seed|sesame', 'Sichuan pepper|szechuan pepper|szechwan pepper', 'Pink peppercorn|pink pepper', 'Nigella|nigella seed|kalonji|black seed', 'Dill seed', 'Annatto|achiote', 'Galangal', 'Asafoetida|asafetida|hing', 'Onion powder|onion', 'Cassia'],
    deep: ['Ajwain|carom|carom seed', 'Black cardamom', 'Long pepper|pippali', 'Grains of paradise|melegueta pepper', 'Mahleb|mahlab', 'Amchur|amchoor|mango powder', 'Black lime|loomi|dried lime', 'Anardana|pomegranate seed', 'Aleppo pepper|pul biber'],
    legendary: ['Grains of Selim|kani pepper', 'Mastic', 'Cubeb|cubeb pepper', 'Wattleseed', 'Orris root', 'Zedoary', 'Kokum', 'Tasmanian pepperberry|pepperberry|mountain pepper'],
    notes: {
      'Saffron': 'The world’s most expensive spice: each thread is a tiny part of a crocus flower.',
      'Vanilla': 'Comes from the seed pods of an orchid.',
      'Nutmeg': 'Nutmeg and mace come from the very same fruit.',
      'Allspice': 'One dried berry that tastes like cinnamon, nutmeg, and cloves together.',
      'Pink peppercorn': 'Not a true pepper at all. It grows on a completely different plant.'
    },
    reject: [
      ['salt|sea salt', 'Salt is a mineral, not a spice. A great seasoning, though!'],
      ['basil|oregano|thyme|rosemary|parsley|mint|sage|dill weed|bay leaf|cilantro', 'That is an herb, the leafy part of a plant. Spices come from seeds, bark, roots, fruit, or flowers.'],
      ['curry powder|curry|garam masala|pumpkin spice|five spice|chinese five spice|chili powder|ras el hanout|za’atar|italian seasoning|herbes de provence|old bay|berbere|chaat masala', 'That is a spice blend. Name one of the spices inside it!']
    ]
  });

  P({
    id: 'citrus', category: 'Food',
    prompt: 'Name a citrus fruit',
    common: ['Orange|sweet orange', 'Lemon', 'Lime', 'Grapefruit|ruby red|pink grapefruit|red grapefruit', 'Tangerine', 'Clementine'],
    uncommon: ['Mandarin|mandarin orange', 'Kumquat|cumquat', 'Blood orange', 'Key lime|mexican lime', 'Pomelo|pummelo|shaddock', 'Navel orange', 'Satsuma|mikan', 'Meyer lemon', 'Yuzu'],
    rare: ['Citron|etrog', 'Tangelo|minneola', 'Bergamot|bergamot orange', 'Cara cara|cara cara orange', 'Valencia orange|valencia', 'Seville orange|bitter orange|sour orange', 'Makrut lime|thai lime', 'Calamansi|calamondin|kalamansi', 'Finger lime|caviar lime', 'Ugli fruit|ugli|uniq fruit|jamaican tangelo', 'Buddha’s hand|buddha hand|fingered citron', 'Persian lime|tahiti lime', 'Sumo|dekopon|shiranui'],
    deep: ['Sudachi', 'Kabosu', 'Rangpur|rangpur lime', 'Limequat', 'Oroblanco|sweetie', 'Sweet lime|sweet lemon|limetta|mosambi', 'Desert lime', 'Hassaku', 'Iyokan', 'Tangor'],
    legendary: ['Chinotto', 'Kinnow', 'Natsumikan', 'Trifoliate orange|hardy orange|poncirus', 'Ichang papeda|papeda', 'Ponkan'],
    notes: {
      'Pomelo': 'The largest citrus fruit, and one of the grapefruit’s parents.',
      'Buddha’s hand': 'Shaped like fingers, with almost no juice. People use its fragrant peel.',
      'Finger lime': 'Filled with tiny juice beads that look like caviar.',
      'Bergamot': 'Its oil gives Earl Grey tea its flavor.',
      'Citron': 'One of the few original citrus species from which most others were bred.'
    },
    reject: [['pineapple|passion fruit|kiwi|kiwifruit|mango|starfruit', 'Tangy, but not a citrus fruit.']]
  });

  P({
    id: 'berry-names', category: 'Food',
    prompt: 'Name a fruit whose name ends in -berry',
    common: ['Strawberry', 'Blueberry', 'Raspberry', 'Blackberry', 'Cranberry'],
    uncommon: ['Gooseberry', 'Elderberry', 'Boysenberry', 'Huckleberry', 'Mulberry', 'Goji berry|wolfberry'],
    rare: ['Lingonberry|cowberry', 'Loganberry', 'Cloudberry', 'Açaí berry', 'Marionberry', 'Bilberry|whortleberry|blaeberry', 'Salmonberry', 'Chokeberry', 'Serviceberry|saskatoon berry|juneberry', 'Dewberry', 'Barberry', 'Black raspberry'],
    deep: ['Thimbleberry', 'Tayberry', 'Olallieberry|ollalieberry', 'Wineberry', 'Crowberry', 'Bearberry', 'Honeyberry|haskap berry', 'Jostaberry', 'Youngberry', 'Hackberry', 'Chinese bayberry|yumberry', 'Bayberry', 'Cape gooseberry', 'Indian gooseberry', 'Miracle berry'],
    legendary: ['Tummelberry', 'Checkerberry|teaberry', 'Buffaloberry', 'Nannyberry', 'Salal berry', 'Chinese gooseberry', 'Partridgeberry', 'Bunchberry'],
    notes: {
      'Strawberry': 'Botanically not a berry at all. Its “seeds” are actually tiny fruits.',
      'Cranberry': 'Farmers flood cranberry bogs so the floating berries can be scooped up.',
      'Marionberry': 'Named after Marion County, Oregon.',
      'Lingonberry': 'The classic jam served with Swedish meatballs.',
      'Chinese gooseberry': 'An old name for the kiwifruit.'
    },
    reject: [
      ['banana|grape|tomato|kiwi|kiwifruit|avocado|eggplant', 'Fun fact: botanists call that a berry! But its name does not end in “berry.”'],
      ['currant|blackcurrant|redcurrant|black currant|red currant', 'A close cousin of the gooseberry, but its name does not end in “berry.”'],
      ['goji|acai|aronia|haskap|saskatoon|salal', 'Almost! The name has to end in “berry,” so try adding “berry” to it.']
    ]
  });

  P({
    id: 'cabbage-family', category: 'Food',
    prompt: 'Name a vegetable in the cabbage family',
    common: ['Broccoli', 'Cabbage', 'Cauliflower', 'Kale', 'Brussels sprouts|brussel sprouts|sprouts'],
    uncommon: ['Bok choy|pak choi|bok choi|pak choy', 'Radish', 'Turnip', 'Collard greens|collards', 'Arugula|rocket|roquette', 'Kohlrabi', 'Napa cabbage|chinese cabbage|wombok', 'Watercress', 'Horseradish', 'Mustard greens|mustard', 'Rutabaga|swede'],
    rare: ['Broccoli rabe|rapini|broccoli raab|cime di rapa', 'Broccolini|baby broccoli|tenderstem', 'Romanesco', 'Daikon|mooli', 'Wasabi', 'Red cabbage', 'Savoy cabbage', 'Gai lan|chinese broccoli|kai lan', 'Turnip greens', 'Mizuna', 'Tatsoi', 'Garden cress|cress'],
    deep: ['Choy sum|choi sum|yu choy', 'Land cress|upland cress', 'Komatsuna', 'Maca', 'Cavolo nero|lacinato kale|tuscan kale|dinosaur kale', 'Watermelon radish', 'Black radish'],
    legendary: ['Sea kale', 'Ethiopian kale|gomen', 'Kalettes|flower sprouts', 'Jersey cabbage|walking stick cabbage', 'Shepherd’s purse'],
    notes: {
      'Broccoli': 'Broccoli, cauliflower, cabbage, kale, kohlrabi, and Brussels sprouts are all one species of plant.',
      'Romanesco': 'Its florets form natural spiraling fractals.',
      'Wasabi': 'Much of the “wasabi” served in restaurants is actually horseradish dyed green.',
      'Jersey cabbage': 'Its stalks grow so tall that people dried them to make walking sticks.'
    },
    reject: [['lettuce|spinach|chard|swiss chard|iceberg|romaine|celery|artichoke|endive|radicchio', 'A great vegetable, but not in the cabbage family.']]
  });

  P({
    id: 'gourd-family', category: 'Food',
    prompt: 'Name a plant in the gourd family (squashes, melons, and cucumbers)',
    common: ['Pumpkin', 'Cucumber', 'Watermelon', 'Zucchini|courgette', 'Cantaloupe|rockmelon|muskmelon|canteloupe'],
    uncommon: ['Squash|winter squash', 'Butternut squash|butternut', 'Honeydew|honeydew melon', 'Acorn squash', 'Spaghetti squash', 'Yellow squash|summer squash|crookneck', 'Gourd', 'Melon', 'Gherkin|cornichon|pickle'],
    rare: ['Bitter melon|bitter gourd|karela|goya|ampalaya', 'Chayote|mirliton|choko|christophene', 'Luffa|loofah|loofa|sponge gourd|ridge gourd', 'Bottle gourd|calabash|lauki|opo', 'Kabocha', 'Delicata', 'Hubbard squash|hubbard', 'Pattypan squash|pattypan|scallop squash', 'Horned melon|kiwano', 'Winter melon|wax gourd|ash gourd', 'Cucamelon|mouse melon|mexican sour gherkin', 'Galia', 'Casaba', 'Crenshaw', 'Armenian cucumber|snake melon', 'Snake gourd', 'Ivy gourd|tindora', 'Marrow|vegetable marrow'],
    deep: ['Pointed gourd|parwal|potol', 'Chilacayote|figleaf gourd', 'Tromboncino', 'Korean melon|chamoe', 'Santa Claus melon|piel de sapo', 'Charentais', 'Spiny gourd|kantola|teasel gourd', 'Tinda|round gourd|apple gourd', 'Turban squash', 'Gac|gac fruit', 'Calabaza', 'Buttercup squash', 'Cushaw', 'Canary melon'],
    legendary: ['Squirting cucumber', 'Buffalo gourd', 'Tacaco', 'Caigua|achocha'],
    notes: {
      'Luffa': 'When dried, its fibrous insides become a scrubbing sponge.',
      'Watermelon': 'About 92% water.',
      'Squirting cucumber': 'When ripe, it squirts its seeds out explosively, several meters away.',
      'Chayote': 'Every part is edible: fruit, seed, shoots, and roots.'
    },
    reject: [
      ['eggplant|aubergine|tomato|pepper|bell pepper', 'That is in the nightshade family, not the gourd family.'],
      ['papaya|avocado', 'Melon-like, but not in the gourd family.']
    ]
  });

  P({
    id: 'tree-nuts', category: 'Food',
    prompt: 'Name a nut that grows on a tree',
    common: ['Almond', 'Walnut|english walnut|persian walnut', 'Cashew', 'Pecan', 'Pistachio'],
    uncommon: ['Hazelnut|filbert|cobnut', 'Macadamia|macadamia nut|queensland nut', 'Brazil nut', 'Chestnut|sweet chestnut', 'Pine nut|pignoli|piñon|pinyon', 'Coconut'],
    rare: ['Hickory nut|hickory', 'Butternut|white walnut', 'Black walnut', 'Beechnut|beech nut', 'Acorn', 'Pili nut|pili', 'Candlenut|kukui nut|kemiri', 'Ginkgo nut|gingko nut'],
    deep: ['Kola nut|cola nut', 'Heartnut', 'Chinquapin|chinkapin', 'Bunya nut', 'Tropical almond|indian almond|sea almond'],
    legendary: ['Sapucaia nut|paradise nut', 'Mongongo nut|mongongo', 'Baru nut|baru', 'Monkey puzzle nut|piñón araucaria'],
    notes: {
      'Cashew': 'Grows hanging below a fruit called the cashew apple, one nut per fruit.',
      'Brazil nut': 'Up to two dozen grow packed inside a hard, coconut-like pod.',
      'Coconut': 'Botanists call it a drupe, not a true nut, but the name stuck.',
      'Acorn': 'People can eat them, but only after soaking out the bitter tannins.',
      'Pistachio': 'The shell splits open on its own when the nut is ripe.'
    },
    reject: [
      ['peanut|groundnut', 'Peanuts grow underground and are legumes, related to beans and peas!'],
      ['tiger nut|water chestnut', 'Despite the name, that does not grow on a tree.'],
      ['nutmeg', 'Nutmeg is a seed used as a spice, not eaten as a nut.'],
      ['horse chestnut|conker|buckeye', 'Careful! Horse chestnuts and buckeyes are poisonous. Sweet chestnuts are the edible kind.']
    ]
  });

  P({
    id: 'apple-varieties', category: 'Food',
    prompt: 'Name an apple variety',
    strip: ['apple', 'apples'],
    common: ['Granny Smith|granny', 'Red Delicious', 'Golden Delicious', 'Gala|royal gala', 'Fuji', 'Honeycrisp|honey crisp'],
    uncommon: ['McIntosh|macintosh', 'Pink Lady|cripps pink', 'Braeburn', 'Jazz', 'Envy', 'Ambrosia', 'Cosmic Crisp', 'Jonagold', 'Empire'],
    rare: ['Jonathan', 'Cortland', 'Rome|rome beauty', 'Macoun', 'SweeTango|sweet tango', 'Opal', 'Newtown Pippin|pippin', 'Cox’s Orange Pippin|cox orange pippin|cox', 'Bramley|bramley seedling', 'Northern Spy', 'Winesap', 'Gravenstein', 'Crispin|mutsu', 'Zestar', 'Snapdragon', 'Baldwin', 'Paula Red', 'Ginger Gold', 'Kanzi', 'EverCrisp|ever crisp', 'SugarBee|sugar bee', 'Autumn Glory'],
    deep: ['Arkansas Black', 'Esopus Spitzenburg|spitzenburg', 'Roxbury Russet', 'Egremont Russet', 'Belle de Boskoop|boskoop', 'Golden Russet', 'Stayman|stayman winesap', 'York|york imperial', 'Idared', 'Liberty', 'Cameo', 'Pacific Rose', 'Discovery', 'Worcester Pearmain', 'Spartan', 'Pazazz', 'Piñata|pinata', 'Rave'],
    legendary: ['Ashmead’s Kernel|ashmead kernel', 'Calville Blanc', 'Pink Pearl', 'Hidden Rose', 'Court Pendu Plat', 'Black Oxford', 'Blenheim Orange', 'Knobbed Russet', 'Lady|api'],
    notes: {
      'Granny Smith': 'First grown by Maria Ann Smith in Australia in the 1860s.',
      'McIntosh': 'Every McIntosh tree descends from one tree found in Ontario, Canada, in 1811.',
      'Cosmic Crisp': 'Bred at Washington State University and first sold in 2019.',
      'Esopus Spitzenburg': 'Said to be a favorite of Thomas Jefferson, who grew it at Monticello.',
      'Hidden Rose': 'Plain on the outside, bright pink on the inside.'
    },
    reject: [
      ['pineapple|custard apple|star apple|rose apple|big apple', 'Despite the name, that is not an apple!'],
      ['red|green|yellow', 'Which one? Name a specific variety.'],
      ['golden|delicious', 'Which one? Red Delicious and Golden Delicious are both varieties.'],
      ['pear|asian pear|nashi', 'A close cousin, but that is a pear.']
    ]
  });

  /* ------------------------------------------------------ DISHES AND DRINKS */

  P({
    id: 'breads', category: 'Food',
    prompt: 'Name a type of bread',
    strip: ['bread', 'breads', 'loaf'],
    common: ['White bread|white', 'Whole wheat|wheat|wholemeal|whole grain|wholegrain', 'Sourdough', 'Rye', 'Baguette|french bread|french', 'Bagel', 'Pita|pitta', 'Naan|nan'],
    uncommon: ['Cornbread|corn', 'Banana bread', 'Focaccia', 'Ciabatta', 'Brioche', 'Tortilla', 'Pumpernickel', 'Challah|hallah', 'Multigrain', 'English muffin', 'Soda bread|irish soda', 'Garlic bread', 'Pretzel|soft pretzel', 'Roti|chapati|chapatti', 'Matzo|matzah|matza|matzoh', 'Flatbread', 'Dinner roll|roll|bread roll|bun'],
    rare: ['Injera', 'Lavash', 'Paratha', 'Arepa', 'Panettone', 'Stollen', 'Babka', 'Pão de queijo|cheese bread', 'Bao|baozi|steamed bun', 'Bannock', 'Fry bread|frybread', 'Pandesal|pan de sal', 'Khachapuri', 'Simit', 'Puri|poori', 'Bhatura', 'Kulcha', 'Pain de mie', 'Ezekiel', 'Hot cross bun', 'Brown bread', 'Milk bread|shokupan', 'Potato bread', 'Monkey bread', 'Raisin bread|cinnamon raisin', 'Zucchini bread', 'Pumpkin bread', 'Kaiser roll'],
    deep: ['Fougasse', 'Piadina', 'Mantou', 'Tsoureki', 'Borodinsky', 'Rugbrød|rugbrod', 'Knäckebröd|crispbread', 'Damper', 'Barmbrack', 'Zopf', 'Pan dulce|concha', 'Bolillo', 'Lefse', 'Tiger bread|dutch crunch', 'Pan de muerto', 'Spelt'],
    legendary: ['Pane carasau|carta da musica', 'Sangak', 'Barbari', 'Taftan', 'Lahoh', 'Malawach', 'Kalach', 'Lepinja|somun', 'Pogača|pogaca', 'Bammy', 'Laufabrauð|laufabraud|leaf bread'],
    notes: {
      'Injera': 'A spongy Ethiopian flatbread made from the tiny grain teff.',
      'Pão de queijo': 'Brazilian cheese bread made with cassava flour, so it is naturally gluten-free.',
      'Bagel': 'Boiled before it is baked, which gives it a chewy crust.',
      'Pane carasau': 'So thin and crisp that it is nicknamed “sheet music.”',
      'Pumpernickel': 'Traditionally baked for up to 24 hours at a low temperature.'
    },
    reject: [
      ['croissant|danish|doughnut|donut', 'That is usually counted as a pastry, not a bread.'],
      ['toast', 'Toast is bread that has been toasted. Which bread?']
    ]
  });

  P({
    id: 'french-desserts', category: 'Food',
    prompt: 'Name a French pastry or dessert',
    common: ['Croissant', 'Crème brûlée', 'Éclair', 'Macaron|french macaron', 'Crêpe', 'Chocolate mousse|mousse'],
    uncommon: ['Profiterole|cream puff', 'Pain au chocolat|chocolatine|chocolate croissant', 'Madeleine', 'Soufflé', 'Tarte Tatin|tatin', 'Mille-feuille|napoleon', 'Beignet', 'Crème caramel|flan'],
    rare: ['Clafoutis', 'Financier', 'Choux bun|choux|choux pastry', 'Croquembouche', 'Paris-Brest', 'Canelé|cannele', 'Kouign-amann', 'Palmier|elephant ear', 'Bûche de Noël|yule log', 'Galette des rois|king cake', 'Opéra cake|opera|gateau opera', 'Tarte au citron|lemon tart', 'Île flottante|floating island', 'Saint-Honoré|st honore|gateau saint honore', 'Crêpes Suzette|crepe suzette', 'Pain perdu|french toast', 'Pain aux raisins', 'Galette', 'Fruit tart|tarte aux fruits', 'Brioche', 'Petit four|petits fours'],
    deep: ['Far breton', 'Pithiviers', 'Gâteau basque', 'Tarte tropézienne', 'Religieuse', 'Merveilleux', 'Fraisier', 'Dacquoise', 'Tuile', 'Sablé', 'Pot de crème', 'Chouquette', 'Charlotte', 'Chausson aux pommes|apple turnover', 'Baba au rhum|rum baba', 'Savarin'],
    legendary: ['Fiadone', 'Kouglof|kugelhopf|kougelhopf', 'Puits d’amour', 'Bugne', 'Flaugnarde', 'Canistrelli'],
    notes: {
      'Mille-feuille': 'Its name means “a thousand leaves,” for its many flaky layers.',
      'Croquembouche': 'A tall tower of cream puffs held together with caramel, served at weddings.',
      'Paris-Brest': 'Created in 1910 for a bicycle race, and shaped like a wheel.',
      'Kouign-amann': 'From Brittany. The name means “butter cake.”',
      'Pain perdu': 'Means “lost bread,” because it rescues stale bread.'
    },
    reject: [
      ['tiramisu|cannoli|gelato|panna cotta', 'Delicious, but that one is Italian!'],
      ['churro|churros', 'Churros come from Spain, not France.'],
      ['danish', 'Danish pastries are named after Denmark, though their roots are in Vienna.']
    ]
  });

  P({
    id: 'cakes', category: 'Food',
    prompt: 'Name a kind of cake',
    strip: ['cake', 'cakes'],
    common: ['Chocolate cake', 'Vanilla cake', 'Cheesecake', 'Carrot cake', 'Red velvet', 'Cupcake'],
    uncommon: ['Angel food cake', 'Pound cake', 'Sponge cake', 'Funnel cake', 'Fruitcake', 'Coffee cake', 'Pineapple upside-down cake|upside-down|pineapple upside-down', 'Black Forest cake|black forest gateau', 'Lava cake|molten chocolate|molten lava|chocolate lava', 'Devil’s food cake|devil food', 'Lemon drizzle cake|lemon drizzle|lemon', 'Bundt cake', 'Tres leches cake|tres leches', 'Marble cake', 'Swiss roll|jelly roll', 'German chocolate cake', 'Boston cream pie', 'Strawberry shortcake|shortcake', 'Chiffon cake', 'Coconut cake', 'Birthday cake', 'Wedding cake', 'Ice cream cake', 'Yellow cake', 'White cake', 'Strawberry cake'],
    rare: ['Victoria sponge|victoria sandwich|victoria', 'Battenberg|battenburg', 'Sachertorte|sacher torte|sacher', 'Madeira cake', 'Dundee cake', 'Génoise', 'Hummingbird cake', 'Opera cake', 'Lamington', 'Mooncake', 'Baumkuchen', 'Castella|kasutera', 'Simnel cake', 'Princess cake|prinsesstårta', 'Dobos torte|dobos', 'Kransekake', 'Basque cheesecake|burnt basque cheesecake', 'Japanese cheesecake|cotton cheesecake', 'Mug cake', 'Gooey butter cake', 'Ube cake', 'Pandan cake', 'Banana cake', 'Spice cake', 'Rum cake', 'Crumb cake', 'Mud cake|mississippi mud', 'Christmas cake', 'Confetti cake|funfetti|sprinkle cake', 'Yule log|bûche de noël', 'Layer cake', 'Sheet cake', 'Butter cake'],
    deep: ['Honey cake|medovik|lekach', 'Kek lapis|lapis legit|spekkoek', 'Bibingka', 'Esterházy torte|esterhazy', 'Prinzregententorte', 'Bienenstich|bee sting', 'Gugelhupf|kugelhopf', 'Torta caprese', 'Basbousa|revani', 'Tarta de Santiago', 'Pão de ló|pao de lo', 'Kladdkaka', 'Smith Island cake', 'Lady Baltimore cake'],
    legendary: ['Jaffa Cake', 'Bolo de rolo', 'Spettekaka', 'Šakotis|sakotis|tree cake', 'Welsh cake'],
    notes: {
      'Jaffa Cake': 'In 1991 a UK tax court ruled that Jaffa Cakes are cakes, not biscuits.',
      'Battenberg': 'Slice it to reveal a pink-and-yellow checkerboard.',
      'Baumkuchen': 'Baked one thin layer at a time, so each slice shows rings like a tree.',
      'Boston cream pie': 'Despite the name, it is a cake.',
      'Angel food cake': 'Made with whipped egg whites and no butter at all.'
    },
    reject: [
      ['pancake|pancakes', 'Pancakes are usually counted as a breakfast food, not a cake. Try another!'],
      ['pie|tart|brownie|cookie|muffin', 'Close, but that is a different kind of baked treat.']
    ]
  });

  P({
    id: 'soups', category: 'Food',
    prompt: 'Name a kind of soup',
    strip: ['soup', 'soups'],
    common: ['Chicken noodle soup|chicken noodle|chicken', 'Tomato soup|cream of tomato', 'Minestrone', 'French onion soup|french onion|onion', 'Clam chowder|chowder|new england clam chowder', 'Vegetable soup|veggie', 'Ramen', 'Pho|phở', 'Miso soup'],
    uncommon: ['Gazpacho', 'Borscht|borsch|borshch', 'Split pea soup|split pea|pea', 'Lentil soup', 'Potato leek soup|potato leek|leek and potato|potato', 'Broccoli cheddar soup|broccoli cheddar|broccoli', 'Beef barley soup|beef barley', 'Wonton soup', 'Egg drop soup', 'Hot and sour soup', 'Tortilla soup|chicken tortilla', 'Butternut squash soup|butternut squash|squash', 'Pumpkin soup', 'Matzo ball soup|matzah ball|matzo ball', 'Bisque|lobster bisque', 'Gumbo', 'Tom yum|tom yam', 'Mushroom soup|cream of mushroom', 'Black bean soup|black bean', 'Alphabet soup|alphabet'],
    rare: ['Vichyssoise', 'Mulligatawny', 'Avgolemono', 'Tom kha|tom kha gai', 'Laksa', 'Pozole|posole', 'Menudo', 'Ribollita', 'Pasta e fagioli|pasta fagioli', 'Bouillabaisse', 'Goulash|gulyás', 'Harira', 'Caldo verde', 'Scotch broth', 'Cock-a-leekie', 'Cullen skink', 'Sinigang', 'Italian wedding soup|wedding|italian wedding', 'Consommé', 'Oxtail soup', 'Callaloo', 'Bird’s nest soup|bird nest', 'Corn chowder', 'Cream of chicken', 'Carrot soup|carrot ginger|carrot', 'Cabbage soup|cabbage', 'Zuppa toscana', 'Beef noodle soup|beef noodle'],
    deep: ['Solyanka', 'Shchi', 'Okroshka', 'Ajiaco', 'Sancocho', 'Sopa de lima', 'Caldo de res', 'Tteokguk', 'Samgyetang', 'Kharcho', 'Çorba|corba|chorba|shorba', 'Sopa de ajo|garlic', 'Egusi soup', 'Caldo de pollo', 'Seaweed soup|miyeok-guk|miyeokguk'],
    legendary: ['Fanesca', 'Ukha', 'Żurek|zurek', 'Snert|erwtensoep', 'Ogbono soup', 'Pepper soup', 'Cazuela'],
    notes: {
      'Gazpacho': 'A Spanish tomato soup served cold.',
      'Vichyssoise': 'A potato and leek soup that is served chilled.',
      'Bird’s nest soup': 'Made from nests that swiftlets build out of their own hardened saliva.',
      'Borscht': 'Beets give it a deep ruby-red color.',
      'Fanesca': 'An Ecuadorian soup with a dozen kinds of grains and beans, eaten around Easter.'
    },
    reject: [['sopa paraguaya', 'Surprise: sopa paraguaya is a cornbread, not a soup!']]
  });

  P({
    id: 'sauces', category: 'Food',
    prompt: 'Name a sauce',
    strip: ['sauce', 'sauces'],
    common: ['Ketchup|catsup|tomato ketchup', 'Barbecue sauce|bbq|barbeque', 'Soy sauce|soya|shoyu', 'Hot sauce|hot pepper|tabasco', 'Marinara', 'Alfredo', 'Pesto', 'Gravy', 'Salsa', 'Tomato sauce|pasta sauce|spaghetti sauce|pizza sauce'],
    uncommon: ['Mayonnaise|mayo', 'Mustard', 'Teriyaki', 'Sriracha', 'Tartar sauce|tartare', 'Hollandaise', 'Béchamel|white', 'Worcestershire sauce|worcester', 'Buffalo sauce|wing', 'Sweet and sour sauce', 'Chocolate sauce|fudge|hot fudge', 'Caramel sauce', 'Applesauce|apple', 'Cranberry sauce', 'Cheese sauce|queso|nacho cheese', 'Hoisin', 'Oyster sauce', 'Fish sauce', 'Aioli|aïoli', 'Tzatziki', 'Enchilada sauce', 'Cocktail sauce', 'Honey mustard'],
    rare: ['Béarnaise', 'Velouté', 'Espagnole', 'Brown sauce|hp|steak|a1', 'Mole', 'Chimichurri', 'Romesco', 'Ponzu', 'Rémoulade', 'Demi-glace', 'Beurre blanc', 'Bordelaise|red wine|wine', 'Mornay', 'Puttanesca', 'Bolognese|ragù|bolognaise', 'Salsa verde|green', 'Mint sauce', 'Bread sauce', 'Satay sauce|peanut', 'Sambal|sambal oelek', 'Piri piri|peri peri', 'Plum sauce|duck', 'Black bean sauce', 'Tonkatsu sauce|bulldog|katsu', 'XO sauce', 'Au jus|jus', 'Sweet chili sauce|sweet chilli|sweet chile', 'Vodka sauce', 'Peppercorn sauce|pepper', 'Horseradish sauce|horseradish', 'Tahini sauce|tahini', 'Taco sauce', 'Crème anglaise|custard', 'Butterscotch sauce'],
    deep: ['Sauce Robert|robert', 'Soubise', 'Gribiche', 'Ravigote', 'Tkemali', 'Mojo', 'Nước chấm|nuoc cham', 'Huancaína|huancaina', 'Agrodolce', 'Mignonette', 'Chermoula'],
    legendary: ['Bigarade', 'Choron', 'Nantua', 'Cumberland sauce|cumberland', 'Salmoriglio', 'Pipián', 'Toum', 'Skordalia', 'Zhoug|zhug|skhug', 'Bagna càuda', 'Garum'],
    notes: {
      'Béchamel': 'One of the five French “mother sauces” that many other sauces are built from.',
      'Worcestershire sauce': 'Its exact recipe is secret, but its ingredients include fermented anchovies.',
      'Sriracha': 'Named after the seaside town of Si Racha in Thailand.',
      'Garum': 'A fermented fish sauce that ancient Romans put on almost everything.'
    },
    reject: [['ranch|italian|thousand island|vinaigrette|caesar', 'That is usually called a salad dressing.']]
  });

  P({
    id: 'cooking-methods', category: 'Food',
    prompt: 'Name a way of cooking food with heat',
    common: ['Bake|baking|baked', 'Boil|boiling|boiled', 'Fry|frying|fried', 'Grill|grilling|grilled', 'Roast|roasting|roasted', 'Microwave|microwaving', 'Steam|steaming|steamed'],
    uncommon: ['Sauté|sauteing|sauteed', 'Broil|broiling|broiled', 'Deep-fry|deep frying|deep fried', 'Stir-fry|stir frying|stir fried', 'Poach|poaching|poached', 'Simmer|simmering', 'Barbecue|bbq|barbecuing|barbeque', 'Toast|toasting|toasted', 'Smoke|smoking|smoked', 'Pan-fry|pan frying', 'Braise|braising|braised|pot roast', 'Stew|stewing|stewed', 'Sear|searing|seared', 'Air-fry|air frying|air fryer'],
    rare: ['Blanch|blanching|blanched', 'Sous vide', 'Slow cook|slow cooking|slow cooker|crock pot|crockpot', 'Pressure cook|pressure cooking|pressure cooker', 'Caramelize|caramelise|caramelizing', 'Parboil|parboiling', 'Shallow fry|shallow frying', 'Rotisserie|spit roast|spit roasting', 'Griddle|griddling', 'Brown|browning', 'Double boiler|bain marie|water bath', 'Flambé|flambeing', 'Scald|scalding', 'Char|charring|chargrill|chargrilling', 'Reduce|reducing|reduction', 'Brûlée|bruleeing|torch|blowtorch'],
    deep: ['Coddle|coddling|coddled', 'Confit', 'En papillote|papillote', 'Tandoor|tandoori', 'Render|rendering', 'Earth oven|pit roast|pit roasting|hangi|imu|umu', 'Plancha|a la plancha'],
    legendary: ['Salt crust|salt baking', 'Clambake', 'Tadka|tarka|tempering|chhaunk', 'Solar cooking|solar oven'],
    notes: {
      'Sous vide': 'French for “under vacuum”: food is sealed in a bag and cooked in warm water.',
      'Confit': 'Food cooked slowly while completely covered in fat.',
      'Blanch': 'A quick boil, then an ice bath, which keeps vegetables bright green.',
      'Sear': 'High heat browns the surface through a process called the Maillard reaction.',
      'Tadka': 'Spices are sizzled in hot oil or ghee and poured over a dish, like dal.'
    },
    reject: [
      ['chop|chopping|dice|dicing|slice|slicing|mince|mincing|peel|peeling|grate|grating|mix|mixing|stir|stirring|whisk|whisking|knead|kneading|blend|blending|cut|cutting', 'That is a kitchen skill, but it does not cook food with heat.'],
      ['marinate|freeze|pickle|ferment|cure', 'That changes food without cooking it with heat.']
    ]
  });

  P({
    id: 'knife-cuts', category: 'Food',
    prompt: 'Name a way of cutting food in the kitchen',
    common: ['Chop|chopping|chopped', 'Slice|slicing|sliced', 'Dice|dicing|diced', 'Mince|mincing|minced', 'Cube|cubing|cubed'],
    uncommon: ['Julienne|matchstick|matchsticks', 'Shred|shredding|shredded', 'Grate|grating|grated', 'Carve|carving', 'Peel|peeling', 'Fillet|filet|filleting', 'Halve|halving|halves|in half', 'Quarter|quartering', 'Butterfly|butterflying|butterflied', 'Spiralize|spiralizing|spiralise'],
    rare: ['Chiffonade', 'Brunoise', 'Batonnet|baton|batons', 'Score|scoring', 'Zest|zesting', 'Pare|paring', 'Bias cut|bias|diagonal|on the bias', 'Rondelle|rounds|coins', 'Trim|trimming', 'Core|coring', 'Debone|deboning|boning', 'Shave|shaving', 'Spatchcock|spatchcocking', 'Wedge|wedges', 'Hull|hulling', 'Devein|deveining', 'Snip|snipping', 'Cleave|cleaving', 'Sliver|slivers|slivered'],
    deep: ['Allumette', 'Tourné|tourner', 'Paysanne', 'Macédoine', 'Oblique cut|oblique|roll cut', 'Concassé', 'Suprême|supreme|segment|segmenting', 'Frenching|french trim', 'Crinkle cut|crinkle'],
    legendary: ['Gaufrette|waffle cut', 'Hasselback', 'Pont-neuf', 'Lozenge|diamond cut', 'Fine brunoise'],
    notes: {
      'Chiffonade': 'From the French word for “rags”: leafy herbs rolled up and sliced into ribbons.',
      'Brunoise': 'Tiny cubes, only about 3 mm on each side.',
      'Tourné': 'A football shape with exactly seven sides, a classic test for chefs.',
      'Hasselback': 'Named after the Hasselbacken restaurant in Stockholm, Sweden.',
      'Spatchcock': 'Removing a bird’s backbone so it lies flat and cooks faster.'
    },
    reject: [
      ['boil|bake|fry|roast|grill|steam', 'That is a way of cooking, not cutting!'],
      ['mirepoix|sofrito|holy trinity', 'That is a mix of chopped vegetables, not a cutting method.']
    ]
  });

  P({
    id: 'coffee-drinks', category: 'Food',
    prompt: 'Name a coffee drink',
    strip: ['coffee', 'coffees'],
    common: ['Espresso|expresso|espresso shot', 'Latte|caffe latte|cafe latte|iced latte|vanilla latte', 'Cappuccino', 'Mocha|mochaccino|cafe mocha', 'Americano|caffe americano|iced americano', 'Iced coffee|iced', 'Cold brew', 'Black coffee|black|drip|filter|brewed'],
    uncommon: ['Macchiato|espresso macchiato|caffe macchiato', 'Flat white', 'Cortado', 'Affogato', 'Café au lait', 'Turkish coffee|turkish', 'Frappuccino', 'Latte macchiato', 'Pumpkin spice latte|pumpkin spice|psl', 'Vietnamese iced coffee|vietnamese|ca phe sua da', 'Caramel macchiato', 'Decaf|decaffeinated', 'Instant coffee|instant'],
    rare: ['Ristretto', 'Lungo', 'Doppio|double espresso', 'Red eye', 'Cuban coffee|cuban|cafecito|cafe cubano', 'Café con leche', 'Piccolo|piccolo latte', 'Frappé|greek frappe', 'Dalgona|whipped coffee|whipped', 'Nitro cold brew|nitro', 'Espresso con panna|con panna', 'Breve|cafe breve', 'Long black', 'Thai iced coffee|oliang', 'Café de olla', 'Dirty chai', 'Irish coffee|irish', 'White mocha'],
    deep: ['Egg coffee|egg|ca phe trung', 'Galão|galao', 'Café bombón|bombon', 'Einspänner|einspanner', 'Wiener Melange|melange', 'Yuenyeung|yuanyang', 'Shakerato', 'Espresso tonic', 'Butter coffee|bulletproof', 'Arabic coffee|qahwa|gahwa', 'Cafezinho', 'Black eye'],
    legendary: ['Kaffeost', 'Marocchino', 'Bicerin', 'Mazagran', 'Kopi tubruk'],
    notes: {
      'Cappuccino': 'Named for the brown robes of Capuchin friars.',
      'Frappuccino': 'A blended iced coffee drink. The name is a Starbucks trademark.',
      'Affogato': 'Italian for “drowned”: a shot of espresso poured over ice cream.',
      'Cortado': 'Spanish for “cut”: espresso cut with a little warm milk.',
      'Kaffeost': 'A Nordic tradition of dropping cubes of cheese into hot coffee.',
      'Egg coffee': 'A Vietnamese drink topped with whipped egg yolk and sugar.'
    },
    reject: [
      ['chai|chai latte|matcha|matcha latte|london fog', 'That latte is made with tea, not coffee!'],
      ['hot chocolate|cocoa|hot cocoa', 'Delicious, but there is no coffee in it.']
    ]
  });

  P({
    id: 'tea-types', category: 'Food',
    prompt: 'Name a type of tea made from the tea plant',
    strip: ['tea', 'teas'],
    common: ['Green tea', 'Black tea', 'Earl Grey', 'Chai|masala chai|chai latte', 'Matcha|matcha latte', 'English Breakfast|breakfast', 'Iced tea|iced|sweet tea|sweet'],
    uncommon: ['Oolong|wulong', 'White tea', 'Jasmine tea', 'Darjeeling', 'Assam', 'Ceylon', 'Pu-erh|puer|pu er', 'Bubble tea|boba|pearl milk', 'Milk tea|hong kong milk tea', 'Sencha', 'Irish Breakfast'],
    rare: ['Lapsang souchong|lapsang', 'Gyokuro', 'Genmaicha', 'Hojicha|houjicha', 'Keemun', 'Lady Grey', 'Dragon Well|longjing|lung ching', 'Gunpowder', 'Yellow tea', 'Tieguanyin|ti kuan yin|iron goddess', 'Silver Needle|baihao yinzhen', 'Bancha', 'Kukicha|twig', 'Nilgiri', 'Thai tea|thai iced', 'Russian Caravan', 'Kombucha', 'Butter tea|po cha', 'Teh tarik', 'Orange pekoe|pekoe', 'Moroccan mint tea|moroccan mint|maghrebi mint'],
    deep: ['Da Hong Pao|big red robe', 'White Peony|bai mudan|pai mu tan', 'Tencha', 'Kabusecha', 'Bi Luo Chun|biluochun|pi lo chun', 'Yunnan black|dian hong|yunnan', 'Oriental Beauty|dongfang meiren', 'Alishan|ali shan', 'Junshan Yinzhen', 'Dong Ding|tung ting'],
    legendary: ['Lu’an Melon Seed|luan guapian', 'Sun Moon Lake', 'Kahwa|kehwa', 'Pink tea|noon chai|kashmiri chai|sheer chai', 'Anji Bai Cha|anji white'],
    notes: {
      'Green tea': 'Green, black, white, and oolong teas all come from the same plant, just processed differently.',
      'Earl Grey': 'Flavored with oil from the bergamot orange.',
      'Matcha': 'Whole tea leaves ground into powder, so you drink the leaf itself.',
      'Lapsang souchong': 'Its leaves are dried over pinewood fires, giving a smoky taste.',
      'Pink tea': 'A Kashmiri tea that turns pink when cooked with a pinch of baking soda and milk.'
    },
    reject: [['chamomile|camomile|peppermint|mint|rooibos|redbush|hibiscus|rosehip|ginger|herbal|fruit|yerba mate|mate|lemongrass|echinacea|honeybush|tulsi|barley', 'That is an herbal drink. It does not come from the tea plant, Camellia sinensis.']]
  });

  P({
    id: 'japanese-dishes', category: 'Food',
    prompt: 'Name a Japanese dish',
    common: ['Sushi', 'Ramen|tonkotsu|tonkotsu ramen|shoyu ramen', 'Tempura', 'Miso soup|miso', 'Teriyaki', 'Sashimi'],
    uncommon: ['Udon|udon noodles', 'Soba|soba noodles', 'Edamame', 'Gyoza', 'Tonkatsu|katsu', 'Yakitori', 'Onigiri|rice ball|omusubi', 'Mochi', 'Bento|bento box', 'Japanese curry|katsu curry|curry rice|kare raisu', 'Takoyaki', 'Okonomiyaki', 'Sukiyaki', 'Shabu-shabu', 'Teppanyaki'],
    rare: ['Donburi|don', 'Oyakodon', 'Katsudon', 'Gyudon|beef bowl', 'Natto|nattō', 'Dango', 'Unagi|unadon|unaju', 'Chawanmushi', 'Karaage', 'Oden', 'Nikujaga', 'Yakisoba', 'Omurice', 'Tamagoyaki|tamago|dashimaki', 'Taiyaki', 'Dorayaki', 'Nigiri', 'Maki|makizushi', 'Temaki|hand roll', 'Chirashi|chirashizushi', 'Inari sushi|inari|inarizushi', 'Agedashi tofu|agedashi', 'Kakigōri|kakigori|shaved ice', 'Tsukemono', 'Ochazuke|chazuke', 'Korokke', 'Tonjiru|butajiru', 'Nabe|nabemono', 'Tsukemen', 'Umeboshi', 'Yakiniku', 'Melon pan|melonpan'],
    deep: ['Monjayaki|monja', 'Chanko nabe|chanko', 'Tamago kake gohan', 'Hambāgu|hambagu|hamburg steak', 'Kushikatsu|kushiage', 'Gyutan', 'Zosui|ojiya', 'Okayu', 'Yudofu', 'Nikuman', 'Kare pan|curry bread', 'Warabimochi', 'Imagawayaki', 'Champon|chanpon', 'Goya champuru|champuru', 'Hiyayakko', 'Kinpira', 'Sekihan', 'Fugu', 'Katsu sando|katsu sandwich', 'Castella|kasutera', 'Futomaki'],
    legendary: ['Funazushi', 'Kiritanpo', 'Hōtō|hoto', 'Shiokara', 'Raindrop cake|mizu shingen mochi', 'Ikameshi', 'Sobagaki', 'Kusaya'],
    notes: {
      'Fugu': 'Pufferfish. Only specially licensed chefs may prepare it, because parts are deadly poisonous.',
      'Natto': 'Fermented soybeans with a strong smell and long, sticky strings.',
      'Takoyaki': 'Balls of batter with bits of octopus inside, a famous Osaka street food.',
      'Raindrop cake': 'A clear jelly dessert that looks like a giant drop of water.',
      'Ramen': 'Came to Japan from China, then became a Japanese icon.'
    },
    reject: [
      ['california roll|philadelphia roll|philly roll', 'That roll was invented in North America, not Japan!'],
      ['kimchi|bibimbap|bulgogi|pad thai|dim sum|egg roll|pho', 'Tasty, but that dish comes from another country.']
    ]
  });

  P({
    id: 'indian-dishes', category: 'Food',
    prompt: 'Name a dish from Indian cuisine',
    common: ['Curry|chicken curry|lamb curry|vegetable curry|fish curry', 'Butter chicken|murgh makhani', 'Chicken tikka masala|tikka masala', 'Samosa', 'Naan|nan', 'Biryani|biriyani|briyani', 'Tandoori chicken|tandoori', 'Dal|daal|dhal|dahl'],
    uncommon: ['Palak paneer', 'Saag|saag paneer|sarson ka saag', 'Chana masala|chole|chhole', 'Korma', 'Vindaloo', 'Chicken tikka|tikka', 'Rogan josh', 'Pakora|pakoda|bhaji|onion bhaji', 'Aloo gobi', 'Paneer tikka', 'Dosa|masala dosa', 'Idli|idly', 'Gulab jamun', 'Raita', 'Roti|chapati|chapatti', 'Paratha', 'Pani puri|golgappa|puchka', 'Kheer', 'Puri|poori', 'Papadum|poppadom|papad|pappadam|papadam', 'Chutney'],
    rare: ['Dal makhani', 'Malai kofta', 'Rajma|rajma chawal', 'Bhel puri|bhel', 'Pav bhaji', 'Vada pav|wada pav', 'Medu vada|vada', 'Sambar|sambhar', 'Rasam', 'Upma', 'Poha', 'Chole bhature|chole bhatura', 'Jalebi', 'Rasgulla|rasagola|rosogolla', 'Kulfi', 'Uttapam|uthappam', 'Dhokla', 'Khichdi|khichri|kitchari', 'Kadai paneer|karahi paneer', 'Keema|kheema|qeema', 'Jeera rice', 'Pulao|pulav', 'Thali', 'Aloo paratha', 'Matar paneer|mutter paneer', 'Baingan bharta|bharta', 'Gajar halwa|halwa|gajar ka halwa', 'Laddu|ladoo|laddoo', 'Barfi|burfi', 'Kachori', 'Seekh kebab', 'Chaat', 'Jalfrezi', 'Bhindi masala|bhindi', 'Paneer butter masala|paneer makhani', 'Kulcha'],
    deep: ['Haleem', 'Nihari', 'Appam', 'Pongal', 'Avial|aviyal', 'Thepla', 'Misal pav|misal', 'Litti chokha|litti', 'Dum aloo', 'Rasmalai|ras malai', 'Sandesh', 'Mysore pak', 'Puran poli', 'Kadhi', 'Chicken 65', 'Payasam', 'Shrikhand', 'Dhansak', 'Dal baati|dal bati|dal baati churma', 'Modak', 'Idiyappam|string hoppers', 'Neer dosa', 'Khandvi', 'Dabeli', 'Gobi manchurian', 'Lemon rice', 'Curd rice|thayir sadam', 'Malabar parotta|parotta|porotta', 'Kathi roll|kati roll'],
    legendary: ['Undhiyu', 'Xacuti', 'Sorpotel', 'Laal maas', 'Gatte ki sabzi|gatte', 'Bisi bele bath', 'Kozhukattai', 'Puttu', 'Pesarattu', 'Kosha mangsho', 'Shorshe ilish', 'Eromba', 'Jadoh', 'Dalma'],
    notes: {
      'Chicken tikka masala': 'Its origin is debated: many credit a restaurant in Glasgow, Scotland.',
      'Dosa': 'A thin, crispy crepe made from fermented rice and lentil batter.',
      'Mysore pak': 'A rich sweet first made in the royal kitchens of Mysore Palace.',
      'Undhiyu': 'A Gujarati mixed-vegetable dish once cooked upside down in clay pots buried in the ground.',
      'Pani puri': 'Crispy hollow balls filled with spiced water, eaten in a single bite.'
    },
    reject: [['sushi|pad thai|kimchi|taco|tacos|falafel|hummus|pho', 'Delicious, but that dish comes from another cuisine.']]
  });

  P({
    id: 'dumplings', category: 'Food',
    prompt: 'Name a kind of dumpling',
    strip: ['dumpling', 'dumplings'],
    common: ['Gyoza', 'Pierogi|pierogy|perogy|pirogi|perogi', 'Wonton|won ton', 'Momo', 'Jiaozi', 'Xiaolongbao|xiao long bao|xlb|soup dumpling'],
    uncommon: ['Potsticker|pot sticker|guotie', 'Gnocchi', 'Matzo ball|matzah ball|matzoh ball', 'Shumai|siu mai|shu mai|shaomai', 'Har gow|har gau|ha gow|shrimp dumpling', 'Mandu', 'Pelmeni', 'Bao|baozi|steamed bun'],
    rare: ['Khinkali', 'Manti|mantu', 'Varenyky|vareniki', 'Spätzle|spaetzle', 'Knödel|knodel|knoedel|klöße|potato dumpling|bread dumpling|semmelknödel', 'Kreplach', 'Tangyuan|tang yuan', 'Modak', 'Halušky|halusky|haluski', 'Kopytka', 'Knedlíky|knedliky', 'Buuz|buuza', 'Gnudi', 'Dango', 'Zongzi', 'Chuchvara', 'Ravioli', 'Apple dumpling', 'Drop dumpling|chicken and dumplings'],
    deep: ['Canederli', 'Bánh bột lọc|banh bot loc', 'Kroppkaka|kroppkakor', 'Palt|pitepalt', 'Germknödel|germknodel', 'Marillenknödel|marillenknodel', 'Maultaschen', 'Kalduny|kolduny', 'Kluski', 'Tortellini', 'Suet dumpling', 'Siopao'],
    legendary: ['Cepelinai|zeppelins', 'Shish barak', 'Dushbara', 'Pyzy', 'Gombóc|gomboc'],
    notes: {
      'Xiaolongbao': 'The soup inside starts as a solid jelly that melts when the dumpling is steamed.',
      'Khinkali': 'Georgians hold it by its twisted knot and leave the knot on the plate.',
      'Cepelinai': 'Lithuanian potato dumplings named after zeppelin airships because of their shape.',
      'Tangyuan': 'Sweet rice balls eaten at the Lantern Festival.',
      'Ravioli': 'Filled pasta like ravioli is often counted as a kind of dumpling.'
    },
    reject: [
      ['dim sum', 'Dim sum is a style of meal with many small dishes. Which dumpling?'],
      ['egg roll|spring roll', 'That is a roll, not a dumpling.']
    ]
  });

})(window.UT = window.UT || {});
