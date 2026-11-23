/* Undertow prompts: everyday. Uses UT.P() from js/prompts.js. */
(function (UT) {
  'use strict';
  var P = UT.P;

  /* ---------------------------------------------------------------- GAMES */

  P({
    id: 'board-games', category: 'Games',
    prompt: 'Name a classic board game',
    common: ['Monopoly', 'Chess', 'Checkers|draughts', 'Scrabble', 'Clue|cluedo', 'Candy Land|candyland', 'Chutes and Ladders|snakes and ladders|snakes and ladder', 'The Game of Life|life|game of life'],
    uncommon: ['Sorry!', 'Connect Four|connect 4', 'Battleship|battleships', 'Trouble|frustration|pop o matic trouble', 'Backgammon', 'Risk', 'Mouse Trap|mousetrap', 'Guess Who?|guess who', 'Trivial Pursuit', 'Pictionary', 'Chinese checkers|sternhalma', 'Othello|reversi', 'Mancala|kalah|kalaha'],
    rare: ['Go|weiqi|baduk|igo', 'Stratego', 'Parcheesi|pachisi|parchis', 'Ludo', 'Catan|settlers of catan|the settlers of catan', 'Ticket to Ride', 'Mastermind', 'Cranium', 'Payday|pay day', 'Sequence', 'Aggravation', 'Hungry Hungry Hippos|hungry hippos', 'Operation', 'Hi Ho! Cherry-O|hi ho cherry o|cherry o'],
    deep: ['Shogi|japanese chess', 'Xiangqi|chinese chess', 'Nine men’s morris|nine mens morris|mill|merels|morris', 'Halma', 'Diplomacy', 'Acquire', 'Scotland Yard', 'Pente', 'Gomoku|five in a row', 'Abalone', 'Blokus', 'Carcassonne', 'Pandemic', 'Axis and Allies|axis & allies', 'Careers', 'Labyrinth', 'Fox and Geese'],
    legendary: ['Senet', 'Royal Game of Ur|game of ur|ur', 'Hnefatafl|tafl|tablut', 'Chaturanga', 'Shatranj', 'Patolli', 'Mehen', 'Hounds and Jackals|58 holes|fifty eight holes', 'Kōnane|konane', 'Fanorona', 'Oware|awale|awari', 'Bao', 'Alquerque', 'Surakarta'],
    notes: {
      'Monopoly': 'Grew out of The Landlord’s Game, patented by Lizzie Magie in 1904.',
      'Senet': 'Played in ancient Egypt; several boards were buried with Tutankhamun.',
      'Royal Game of Ur': 'Its rules were worked out from a Babylonian clay tablet.',
      'Chinese checkers': 'Despite the name, it was invented in Germany in 1892.',
      'Chaturanga': 'An ancient Indian game that is the ancestor of chess.'
    },
    reject: [
      ['yahtzee|farkle', 'That is a dice game. No board needed!'],
      ['uno|go fish|old maid|solitaire', 'That is a card game, not a board game.'],
      ['jenga', 'Jenga is a stacking game, with no board.']
    ]
  });

  P({
    id: 'chess-terms', category: 'Games',
    prompt: 'Name a chess piece, chess term, or chess opening',
    common: ['Checkmate|mate', 'Check', 'King', 'Queen', 'Pawn', 'Knight|horse', 'Bishop', 'Rook|castle'],
    uncommon: ['Stalemate', 'Castling', 'Gambit', 'En passant', 'Promotion|pawn promotion|queening', 'Grandmaster|gm', 'Endgame|end game', 'Fork', 'Pin', 'Draw', 'Queen’s Gambit|queens gambit', 'Sacrifice|sac', 'Blunder', 'Resign|resignation', 'Capture'],
    rare: ['Skewer', 'Zugzwang', 'Fianchetto', 'Discovered check', 'Discovered attack', 'Double check', 'Perpetual check', 'Fool’s mate|fools mate', 'Scholar’s mate|scholars mate', 'Back-rank mate|back rank mate|back rank checkmate', 'Smothered mate', 'Middlegame|middle game', 'Tempo', 'Rank', 'File', 'Elo rating|elo', 'Sicilian Defense|sicilian|sicilian defence', 'Ruy Lopez|spanish opening|spanish game', 'French Defense|french defence', 'Italian Game|giuoco piano|italian opening', 'King’s Gambit|kings gambit', 'Blitz|blitz chess|speed chess', 'Kingside|king side', 'Queenside|queen side', 'Passed pawn', 'Chess clock', 'Touch-move|touch move|touch move rule', 'Notation|algebraic notation|chess notation'],
    deep: ['Underpromotion', 'Threefold repetition|repetition|3 fold repetition', 'Fifty-move rule|50 move rule|fifty move rule', 'Caro-Kann|caro kann defense|caro kann', 'King’s Indian Defense|kings indian|kings indian defence', 'Nimzo-Indian|nimzo indian defense|nimzo indian', 'Grünfeld Defense|grunfeld|gruenfeld', 'English Opening', 'London System', 'Scandinavian Defense|scandinavian|center counter|centre counter', 'Pirc Defense|pirc', 'Dutch Defense|dutch defence', 'Slav Defense|slav|slav defence', 'Catalan Opening|catalan', 'Vienna Game', 'Scotch Game|scotch', 'Petrov’s Defense|petrov|petroff|russian game', 'Alekhine’s Defense|alekhines defence|alekhine', 'Evans Gambit', 'Isolated pawn|isolani', 'Opposition', 'Outpost', 'Desperado', 'Deflection', 'Decoy', 'Fortress'],
    legendary: ['J’adoube|jadoube', 'Zwischenzug|intermezzo|in between move', 'Luft', 'Zeitnot|time trouble', 'Trébuchet|trebuchet', 'Lucena position|lucena', 'Philidor position|philidor', 'Fried Liver Attack|fried liver', 'Halloween Gambit', 'Englund Gambit', 'Elephant Gambit', 'Grob’s Attack|grob|grobs attack', 'Latvian Gambit', 'Danish Gambit', 'Budapest Gambit', 'Trompowsky Attack|trompowsky'],
    notes: {
      'En passant': 'French for "in passing": a special way for a pawn to capture another pawn.',
      'Zugzwang': 'German for "compulsion to move," when any move you make worsens your position.',
      'J’adoube': 'French for "I adjust," said before straightening a piece so touching it does not count as a move.',
      'Halloween Gambit': 'White gives away a knight on move 4 for a fast attack.',
      'Fool’s mate': 'The fastest possible checkmate, in just two moves.'
    },
    reject: [['king me|crown', 'That is from checkers, not chess.']]
  });

  P({
    id: 'dice-games', category: 'Games',
    prompt: 'Name a dice game',
    common: ['Yahtzee', 'Craps', 'Farkle|ten thousand|10000|zilch|hot dice|dix mille'],
    uncommon: ['Liar’s dice|liars dice|perudo|dudo|pirates dice', 'Bunco|bunko|bonko', 'Shut the Box', 'Pig', 'Left Right Center|lcr|left center right|left right centre', 'Ship, Captain, and Crew|ship captain and crew|ship captain crew|654', 'Poker dice|dice poker'],
    rare: ['Yacht', 'Generala', 'Sic bo|sicbo|dai siu', 'Chuck-a-luck|chuck a luck|birdcage', 'Mexico|mia|maxchen', 'Cee-lo|cee lo|celo|4 5 6', 'Zombie Dice', 'Tenzi', 'Qwixx', 'Kismet', 'Beetle|cootie|beetle drive', 'Pass the Pigs|pigmania'],
    deep: ['Hazard', 'Balut', 'Drop Dead', 'Chō-han|cho han|cho han bakuchi', 'Going to Boston|newmarket|yankee grab'],
    legendary: ['Midnight|1 4 24|1 4 24 dice', 'Chicago', 'Thirty-six|36|thirty six dice'],
    notes: {
      'Hazard': 'A dice game played in medieval England that grew into modern craps.',
      'Chō-han': 'A Japanese game where players bet on whether two dice add up to an even (chō) or odd (han) number.',
      'Yahtzee': 'Based on an older game called Yacht.',
      'Liar’s dice': 'A bluffing game; the version called Perudo comes from South America.'
    },
    reject: [
      ['backgammon|monopoly|ludo|snakes and ladders|chutes and ladders|parcheesi|trouble|risk|catan', 'It uses dice, but it is a board game.'],
      ['dungeons and dragons|d and d', 'D&D uses lots of dice, but it is a role-playing game.']
    ]
  });

  P({
    id: 'video-game-genres', category: 'Games',
    prompt: 'Name a video game genre',
    strip: ['game', 'games', 'genre'],
    common: ['Platformer|platform', 'Racing|driving', 'Shooter', 'Puzzle', 'Sports', 'Fighting', 'RPG|role playing|role playing game', 'Adventure', 'Action', 'Strategy', 'Simulation|sim', 'Sandbox', 'Horror'],
    uncommon: ['Action-adventure|action adventure', 'First-person shooter|fps|first person shooter', 'Battle royale', 'Survival', 'MMO|mmorpg|massively multiplayer|massively multiplayer online', 'Open world', 'Party', 'Rhythm|music|dance', 'Tower defense|tower defence', 'Real-time strategy|rts|real time strategy', 'Stealth', 'Third-person shooter|tps|third person shooter', 'Survival horror', 'Endless runner|runner', 'Educational|edutainment', 'Trivia|quiz'],
    rare: ['Roguelike|rogue like', 'Roguelite|rogue lite', 'Metroidvania', 'MOBA|multiplayer online battle arena', 'Turn-based strategy|turn based strategy|turn based', 'City-builder|city builder|city building', 'Visual novel', 'Point-and-click|point and click|point and click adventure|graphic adventure', 'Idle|incremental|clicker', 'Shoot ’em up|shoot em up|shmup', 'Beat ’em up|beat em up|brawler', 'Hack and slash|hack n slash', 'Bullet hell|danmaku', 'Soulslike|souls like|soulsborne', 'Life simulation|life sim', 'Farming simulation|farming sim|farming', 'Flight simulator|flight sim|flight simulation', 'Kart racing|kart racer|kart', 'Deck-builder|deckbuilder|deck building|deckbuilding', 'Text adventure|interactive fiction', 'Dungeon crawler|dungeon crawl', 'Action RPG|arpg|action role playing', 'JRPG|japanese rpg|japanese role playing', 'Tactical RPG|tactics|strategy rpg|srpg', 'Hero shooter', 'Management|tycoon|business sim', 'Hidden object', 'Match-3|match 3|match three', 'Word', 'Fitness|exergame', 'Arcade'],
    deep: ['Collectathon', 'Walking simulator|walking sim', 'Immersive sim', 'Grand strategy', '4X|4 x', 'Auto battler|autobattler|auto chess', 'Looter shooter', 'Rail shooter|on rails shooter', 'Light gun|light gun shooter', 'God', 'Survival crafting|crafting', 'Extraction shooter', 'Collectible card|ccg|digital card|card battler', 'Escape room', 'Monster tamer|monster collecting|creature collector'],
    legendary: ['MUD|multi user dungeon', 'Twin-stick shooter|twin stick shooter|twin stick', 'Run and gun', 'Sokoban', 'Typing', 'Arena shooter', 'Artillery'],
    notes: {
      'Metroidvania': 'Named after two classic series: Metroid and Castlevania.',
      'Roguelike': 'Named after Rogue, a 1980 dungeon game with randomly generated levels.',
      '4X': 'Stands for eXplore, eXpand, eXploit, and eXterminate.',
      'MUD': 'Text-based online worlds from the late 1970s that inspired today’s MMOs.',
      'Sokoban': 'A 1982 Japanese box-pushing puzzle game; its name means "warehouse keeper."'
    },
    reject: [
      ['mobile|console|pc|nintendo|xbox|playstation|switch', 'That is a way to play games, not a genre.'],
      ['minecraft|fortnite|mario|tetris|pokemon|zelda|roblox', 'That is a specific game or series. What genre is it?'],
      ['world', 'Did you mean open world? Type the whole genre name.']
    ]
  });

  /* --------------------------------------------------------------- SPORTS */

  P({
    id: 'soccer-positions', category: 'Sports',
    prompt: 'Name a position in soccer (association football)',
    common: ['Goalkeeper|goalie|keeper|goaltender|gk', 'Defender', 'Midfielder|midfield|mid', 'Forward|attacker', 'Striker'],
    uncommon: ['Winger|wing|outside forward', 'Center back|centre back|cb|central defender|center half|centre half', 'Fullback|full back', 'Left back', 'Right back', 'Center forward|centre forward|number 9', 'Defensive midfielder|cdm|holding midfielder', 'Attacking midfielder|cam|number 10|playmaker'],
    rare: ['Wingback|wing back', 'Sweeper|libero', 'Stopper', 'Central midfielder|centre midfielder|cm', 'Left winger', 'Right winger', 'Left midfielder', 'Right midfielder', 'Second striker|support striker|shadow striker', 'Inside forward', 'Wide midfielder'],
    deep: ['False nine|false 9', 'Box-to-box midfielder|box to box|box to box midfielder', 'Deep-lying playmaker|deep lying playmaker|regista', 'Target man|target forward', 'Anchor|anchor man', 'Trequartista', 'Inverted winger', 'Inverted fullback|inverted full back', 'Poacher|fox in the box', 'Half-back|halfback|half back'],
    legendary: ['Sweeper keeper', 'Mezzala', 'Raumdeuter', 'Volante', 'Enganche'],
    notes: {
      'Raumdeuter': 'German for "space interpreter," a word Thomas Müller invented to describe his own role.',
      'False nine': 'A center forward who drops back into midfield to pull defenders out of position.',
      'Deep-lying playmaker': 'Also called a regista, Italian for "director," because this deep midfielder runs the team’s passing.',
      'Sweeper keeper': 'A goalkeeper who rushes far off the line to clear danger like a defender.'
    },
    reject: [
      ['quarterback|pitcher|point guard|linebacker|shortstop|catcher', 'That position is from a different sport.'],
      ['referee|ref|coach|manager', 'Important at a soccer game, but not a player position.']
    ]
  });

  P({
    id: 'football-positions', category: 'Sports',
    prompt: 'Name a player position in American football',
    common: ['Quarterback|qb', 'Running back|rb', 'Wide receiver|receiver|wr|wideout|wide out', 'Kicker|placekicker|place kicker', 'Linebacker|lb'],
    uncommon: ['Tight end|te', 'Center|centre', 'Punter', 'Cornerback|corner|cb', 'Safety', 'Defensive end|de', 'Offensive lineman|lineman|ol|offensive line', 'Defensive tackle|dt', 'Fullback|fb|full back', 'Defensive lineman|dl|defensive line'],
    rare: ['Guard|offensive guard|left guard|right guard', 'Offensive tackle|tackle|left tackle|right tackle', 'Nose tackle|nose guard|nt', 'Free safety|fs', 'Strong safety|ss', 'Middle linebacker|mike|mlb|mike linebacker', 'Outside linebacker|olb', 'Long snapper|snapper', 'Kick returner|kr', 'Punt returner|pr', 'Halfback|hb', 'Defensive back|db', 'Slot receiver|slot'],
    deep: ['Holder', 'Nickelback|nickel back|nickel corner|nickel', 'Dimeback|dime back|dime', 'Gunner', 'Edge rusher|edge', 'Tailback', 'Split end|x receiver', 'Flanker|z receiver', 'H-back|h back'],
    legendary: ['Strongside linebacker|sam|sam linebacker|strong side linebacker', 'Weakside linebacker|will|will linebacker|weak side linebacker', 'Upback|up back|personal protector', 'Jammer', 'Wingback|wing back', 'Kickoff specialist'],
    notes: {
      'Long snapper': 'A specialist who snaps the ball back to the punter or holder on kicks.',
      'Nickelback': 'Named because it is the fifth defensive back, just as a nickel is five cents.',
      'Dimeback': 'The sixth defensive back: two nickels make a dime!',
      'Gunner': 'Sprints down the field on punts to tackle the returner.'
    },
    reject: [
      ['goalkeeper|striker|pitcher|shortstop|point guard|goalie', 'That position is from a different sport.'],
      ['coach|referee|ref|cheerleader|mascot', 'Part of game day, but not a player position.'],
      ['runner', 'Close! Try the full name, like running back.']
    ]
  });

  P({
    id: 'baseball-positions', category: 'Sports',
    prompt: 'Name a player position or role on a baseball team',
    common: ['Pitcher', 'Catcher', 'Shortstop|ss|short stop', 'First baseman|first base|1b', 'Second baseman|second base|2b', 'Third baseman|third base|3b|hot corner', 'Outfielder|outfield'],
    uncommon: ['Left fielder|left field|lf', 'Center fielder|center field|centre field|cf|centre fielder', 'Right fielder|right field|rf', 'Designated hitter|dh', 'Infielder|infield', 'Relief pitcher|reliever|relief', 'Starting pitcher|starter|sp'],
    rare: ['Closer', 'Pinch hitter|ph', 'Pinch runner|pr', 'Setup man|setup pitcher|set up man', 'Utility player|utility infielder|utility man|utility', 'Batter|hitter', 'Leadoff hitter|leadoff|lead off', 'Cleanup hitter|cleanup|clean up'],
    deep: ['Middle reliever|middle relief', 'Long reliever|long man|long relief', 'Two-way player|two way player', 'Bullpen catcher', 'Ace|staff ace', 'Position player'],
    legendary: ['Opener', 'LOOGY|lefty one out guy|left handed specialist|lefty specialist', 'Swingman|swing man', 'Emergency catcher', 'Fourth outfielder|4th outfielder'],
    notes: {
      'Shortstop': 'Doc Adams is credited with creating the position around 1850, partly to relay throws from the outfield.',
      'Third baseman': 'Third base is nicknamed "the hot corner" because hard-hit balls arrive so fast.',
      'Opener': 'A reliever who starts the game for an inning or two, made popular by the Tampa Bay Rays in 2018.',
      'LOOGY': 'Short for "lefty one-out guy"; MLB’s 2020 three-batter minimum rule mostly ended the role.'
    },
    reject: [
      ['umpire|ump|manager|coach|bat boy|batboy|bat girl|mascot', 'Part of the game, but not a player position.'],
      ['quarterback|goalie|goalkeeper|striker|point guard', 'That position is from a different sport.']
    ]
  });

  P({
    id: 'net-sports', category: 'Sports',
    prompt: 'Name a sport where you hit, kick, or throw a ball or shuttlecock over a net',
    common: ['Tennis|lawn tennis', 'Volleyball', 'Badminton', 'Table tennis|ping pong'],
    uncommon: ['Pickleball', 'Beach volleyball', 'Padel|padel tennis'],
    rare: ['Sepak takraw|takraw|kick volleyball', 'Footvolley|foot volley', 'Sitting volleyball', 'Paddle tennis', 'Platform tennis', 'Beach tennis', 'Newcomb ball|newcomb', 'Teqball', 'Wheelchair tennis'],
    deep: ['Fistball|faustball', 'Real tennis|court tennis|royal tennis|jeu de paume', 'Soft tennis', 'Throwball', 'Snow volleyball', 'Jianzi|shuttlecock kicking'],
    legendary: ['Bossaball', 'Footbag net', 'Water volleyball|pool volleyball|biribol'],
    notes: {
      'Sepak takraw': 'Players use their feet, knees, chest, and head, but never their hands.',
      'Pickleball': 'Invented in 1965 on Bainbridge Island, Washington.',
      'Bossaball': 'Mixes volleyball, soccer, and gymnastics on an inflatable court with trampolines.',
      'Fistball': 'Players hit the ball with a fist or forearm, and it may bounce between touches.',
      'Teqball': 'Invented in Hungary and played over a curved table.'
    },
    reject: [
      ['squash|racquetball|racketball', 'No net there: the ball is hit against the walls.'],
      ['speedminton|crossminton', 'Crossminton is like badminton but played without a net.'],
      ['roundnet|spikeball', 'In roundnet the ball bounces off a small round net instead of going over one.'],
      ['basketball|soccer|hockey|netball|lacrosse|water polo|handball', 'The net there is part of a goal or hoop. Try a game played over a net.']
    ]
  });

  P({
    id: 'bat-sports', category: 'Sports',
    prompt: 'Name a sport played with a bat',
    common: ['Baseball', 'Cricket', 'Softball'],
    uncommon: ['Wiffle ball|whiffle ball|wiffleball', 'Rounders', 'Table tennis|ping pong', 'Stickball', 'Tee-ball|t ball|tee ball|teeball'],
    rare: ['Stoolball', 'Pesäpallo|pesapallo|finnish baseball', 'Kilikiti|samoan cricket', 'Indoor cricket', 'Beach cricket', 'Town ball|townball', 'Corkball|cork ball', 'Brännboll|brannboll'],
    deep: ['Lapta', 'Over-the-line|over the line', 'Vigoro', 'Tape-ball cricket|tape ball cricket|tapeball'],
    legendary: ['Oină|oina', 'Trap ball|trapball'],
    notes: {
      'Table tennis': 'In Britain, a table tennis paddle is usually called a bat.',
      'Pesäpallo': 'Finland’s national sport, where the pitcher tosses the ball straight up over home plate.',
      'Kilikiti': 'Samoan cricket, played with a three-sided bat and huge teams.',
      'Oină': 'A Romanian bat-and-ball game said to have first been mentioned in writing in the 1300s.',
      'Lapta': 'A Russian bat-and-ball game that dates back to medieval times.'
    },
    reject: [
      ['golf|hockey|field hockey|ice hockey|lacrosse|tennis|polo|croquet|badminton|squash', 'That sport uses a club, stick, racket, or mallet instead of a bat.'],
      ['kickball', 'In kickball you kick the ball. No bat!']
    ]
  });

  P({
    id: 'stick-sports', category: 'Sports',
    prompt: 'Name a sport played with a stick',
    common: ['Ice hockey|hockey', 'Field hockey', 'Lacrosse'],
    uncommon: ['Roller hockey|inline hockey|in line hockey|rink hockey', 'Floorball|unihockey', 'Street hockey|ball hockey|road hockey', 'Polo|horse polo', 'Pool|8 ball|pocket billiards|9 ball', 'Snooker', 'Billiards|carom billiards|cue sports|cue sport'],
    rare: ['Hurling', 'Broomball', 'Ringette', 'Sledge hockey|sled hockey|para ice hockey', 'Underwater hockey|octopush', 'Polocrosse', 'Box lacrosse', 'Indoor hockey', 'Stickball', 'Shinny|pond hockey'],
    deep: ['Camogie', 'Shinty', 'Bandy', 'Rinkball', 'Shuffleboard'],
    legendary: ['Unicycle hockey', 'Cammag', 'Bando'],
    notes: {
      'Lacrosse': 'Created by Indigenous peoples of North America; the Haudenosaunee (Iroquois) call it "the Creator’s game."',
      'Hurling': 'The stick is called a hurley and the ball a sliotar.',
      'Bandy': 'Played on ice with a ball instead of a puck, on a rink about the size of a soccer field.',
      'Ringette': 'Invented in Canada in 1963; players use a straight stick to control a rubber ring.',
      'Polo': 'Players swing a long mallet that is often just called a polo stick.'
    },
    reject: [
      ['golf', 'Golf uses clubs.'],
      ['croquet', 'Croquet players use a mallet.'],
      ['curling', 'Curling is played with stones and brooms. Hurling, though, uses a stick!'],
      ['baseball|cricket|softball', 'That sport uses a bat.'],
      ['tennis|badminton|squash|pickleball', 'That sport uses a racket or paddle.']
    ]
  });

  P({
    id: 'martial-arts', category: 'Sports',
    prompt: 'Name a martial art',
    common: ['Karate', 'Judo', 'Taekwondo|tae kwon do', 'Kung fu|kungfu|gung fu', 'Jiu-jitsu|jujutsu|jujitsu|ju jitsu|jiu jitsu'],
    uncommon: ['Brazilian jiu-jitsu|bjj|brazilian jiu jitsu|brazilian jujitsu', 'Kickboxing', 'Muay Thai|thai boxing', 'Aikido', 'Kendo', 'Krav Maga', 'Tai chi|tai chi chuan|taiji|taijiquan', 'Capoeira', 'Boxing', 'Wrestling|greco roman wrestling|greco roman|freestyle wrestling', 'Sumo', 'Mixed martial arts|mma'],
    rare: ['Hapkido', 'Wing Chun', 'Jeet Kune Do', 'Sambo', 'Savate|french boxing', 'Eskrima|escrima|arnis|kali', 'Silat|pencak silat', 'Kenpo|kempo', 'Iaido', 'Kyudo', 'Ninjutsu', 'Wushu', 'Kalaripayattu|kalari', 'Fencing', 'Shotokan', 'Kyokushin', 'Tang Soo Do|tangsoodo'],
    deep: ['Bōjutsu|bojutsu', 'Systema', 'Taekkyeon|taekkyon', 'Hung Gar', 'Choy Li Fut', 'Baguazhang|bagua', 'Xingyiquan|xing yi', 'Kūdō|kudo', 'Shorinji Kempo', 'Sanda|sanshou', 'Naginatajutsu|naginata', 'Pankration', 'Vovinam', 'Kenjutsu'],
    legendary: ['Bartitsu', 'Kajukenbo', 'Lua', 'Glima', 'Kurash', 'Lethwei|burmese boxing', 'Bokator', 'Gatka', 'Silambam', 'Okichitaw'],
    notes: {
      'Capoeira': 'A Brazilian art that blends fighting moves, dance, acrobatics, and music.',
      'Bartitsu': 'A Victorian-era British style mentioned (as "baritsu") in a Sherlock Holmes story.',
      'Kajukenbo': 'Created in Hawaii in 1947; its name blends karate, judo, jujitsu, kenpo, and Chinese boxing.',
      'Judo': 'The first Asian martial art in the Olympics, at Tokyo 1964.',
      'Glima': 'Iceland’s traditional style of wrestling, practiced since Viking times.'
    },
    reject: [['ninja|samurai|black belt', 'Close! Name the art itself, like ninjutsu or kendo.']]
  });

  P({
    id: 'yoga-poses', category: 'Sports',
    prompt: 'Name a yoga pose',
    strip: ['pose'],
    common: ['Downward dog|downward facing dog|down dog|adho mukha svanasana', 'Tree|vrikshasana|vrksasana', 'Child’s pose|child|childs|balasana', 'Warrior|warrior 1|warrior 2|warrior 3|warrior i|warrior ii|warrior iii|virabhadrasana', 'Cobra|bhujangasana', 'Lotus|padmasana', 'Mountain|tadasana', 'Plank|kumbhakasana'],
    uncommon: ['Triangle|trikonasana', 'Cat|marjaryasana|cat cow', 'Cow|bitilasana', 'Bridge|setu bandhasana|setu bandha sarvangasana', 'Corpse|savasana|shavasana', 'Crow|bakasana|crane', 'Pigeon|kapotasana|eka pada rajakapotasana|king pigeon|half pigeon', 'Boat|navasana', 'Chair|utkatasana', 'Happy baby|ananda balasana', 'Upward dog|upward facing dog|up dog|urdhva mukha svanasana', 'Headstand|sirsasana|shirshasana'],
    rare: ['Camel|ustrasana', 'Fish|matsyasana', 'Plow|plough|halasana', 'Bow|dhanurasana', 'Eagle|garudasana', 'Half moon|ardha chandrasana', 'Dancer|natarajasana|lord of the dance', 'Wheel|urdhva dhanurasana|chakrasana|full wheel', 'Shoulder stand|shoulderstand|sarvangasana|salamba sarvangasana', 'Side plank|vasisthasana', 'Locust|salabhasana|shalabhasana', 'Garland|malasana|yogi squat', 'Butterfly|bound angle|cobbler|baddha konasana', 'Sphinx|salamba bhujangasana', 'Standing forward fold|forward fold|uttanasana|standing forward bend', 'Seated forward bend|paschimottanasana|seated forward fold', 'Easy|sukhasana', 'Staff|dandasana', 'Low lunge|crescent lunge|anjaneyasana|crescent', 'Lizard|utthan pristhasana', 'Frog|mandukasana', 'Legs up the wall|viparita karani', 'Seated twist|ardha matsyendrasana|half lord of the fishes', 'Extended side angle|side angle|utthita parsvakonasana', 'Puppy|extended puppy|uttana shishosana', 'Thread the needle', 'Hero|virasana', 'Cow face|gomukhasana', 'Goddess|utkata konasana', 'Pyramid|parsvottanasana', 'Tabletop|table top', 'Chaturanga|chaturanga dandasana|four limbed staff', 'Handstand|adho mukha vrksasana', 'Dolphin|ardha pincha mayurasana', 'Wind-relieving|wind relieving|pavanamuktasana'],
    deep: ['Firefly|tittibhasana', 'Peacock|mayurasana', 'Scorpion|vrschikasana|vrischikasana', 'Eight-angle|eight angle|astavakrasana', 'Side crow|parsva bakasana', 'Flying pigeon|eka pada galavasana', 'Fire log|firelog|agnistambhasana|double pigeon', 'Wild thing|camatkarasana', 'Reverse warrior|viparita virabhadrasana', 'Humble warrior', 'Monkey|hanumanasana|splits|full splits', 'Bird of paradise|svarga dvijasana', 'Gate|parighasana', 'Revolved triangle|parivrtta trikonasana'],
    legendary: ['Lion|simhasana', 'Tortoise|kurmasana', 'Heron|krounchasana', 'Rooster|kukkutasana', 'Embryo in womb|garbha pindasana|embryo', 'Compass|parivrtta surya yantrasana'],
    notes: {
      'Corpse': 'Usually done at the end of class: you just lie still and relax.',
      'Monkey': 'Named after Hanuman, a monkey god who made a giant leap across the sea.',
      'Lion': 'You stick your tongue out wide and breathe out with a roar.',
      'Peacock': 'The whole body balances on the hands, with the elbows pressed into the belly.'
    },
    reject: [['sun salutation|surya namaskar|vinyasa|flow', 'That is a sequence of poses. Name a single pose!']]
  });

  P({
    id: 'golf-scores', category: 'Sports',
    prompt: 'Name a golf term for a score on a single hole',
    common: ['Par', 'Birdie', 'Eagle', 'Bogey|bogie', 'Hole in one|ace|hole in 1'],
    uncommon: ['Double bogey', 'Albatross|double eagle'],
    rare: ['Triple bogey'],
    deep: ['Quadruple bogey|quad bogey|quadruple', 'Snowman'],
    legendary: ['Condor|triple eagle|double albatross'],
    notes: {
      'Birdie': 'Said to come from 1890s American slang, when "bird" meant something excellent.',
      'Condor': 'Four under par on one hole, recorded only a handful of times ever.',
      'Albatross': 'Three under par; Gene Sarazen’s at the 1935 Masters became famous as "the shot heard round the world."',
      'Snowman': 'Slang for an 8 on a hole, because the number looks like a snowman.'
    },
    reject: [
      ['mulligan', 'A mulligan is a do-over shot, not a score.'],
      ['fore', 'That is what golfers shout to warn people a ball is coming!'],
      ['tee|green|fairway|bunker|putt', 'That is a golf word, but not a score.']
    ]
  });

  P({
    id: 'horse-sports', category: 'Sports',
    prompt: 'Name a sport or competition involving horses',
    common: ['Horse racing|racing|flat racing|thoroughbred racing', 'Polo', 'Rodeo', 'Show jumping|jumping|showjumping', 'Dressage'],
    uncommon: ['Barrel racing', 'Eventing|three day eventing|horse trials', 'Steeplechase|jump racing|national hunt racing', 'Harness racing|trotting|standardbred racing|sulky racing', 'Endurance riding|endurance', 'Equestrian vaulting|vaulting', 'Team roping', 'Bronc riding|saddle bronc|bareback bronc|bronco riding', 'Cross-country|cross country riding', 'Jousting', 'Chariot racing', 'Gymkhana|mounted games|pony club games', 'Equestrian|equestrianism|horseback riding|horse riding|riding', 'Horse show|horse shows', 'Kentucky Derby|derby'],
    rare: ['Reining', 'Cutting', 'Polocrosse', 'Tie-down roping|calf roping|tie down roping', 'Steer wrestling|bulldogging', 'Breakaway roping', 'Pole bending', 'Carriage driving|combined driving|driving', 'Hunters|show hunter|hunter', 'Equitation|hunt seat equitation', 'Western pleasure', 'Para-dressage|para dressage|para equestrian', 'Point-to-point|point to point', 'Mounted archery|horseback archery', 'Team penning', 'Preakness Stakes|preakness', 'Belmont Stakes|belmont', 'Grand National', 'Melbourne Cup'],
    deep: ['Horseball', 'Tent pegging|tentpegging', 'Buzkashi|kokpar|kok boru|ulak tartysh', 'Pato', 'Skijoring', 'Working equitation', 'Cowboy mounted shooting|mounted shooting', 'Ride and tie', 'TREC|le trec'],
    legendary: ['Charrería|charreria', 'Escaramuza', 'Yabusame', 'Palio di Siena|palio', 'Jineteada gaucha|jineteada'],
    notes: {
      'Pato': 'Argentina’s national sport; today it is played with a ball that has six handles.',
      'Yabusame': 'Japanese archery from a galloping horse, performed at Shinto shrines.',
      'Charrería': 'Mexico’s national sport, a kind of rodeo with deep ranching roots.',
      'Palio di Siena': 'A bareback race around the main square of Siena, Italy, held twice each summer.',
      'Skijoring': 'A skier is pulled across the snow by a galloping horse.'
    },
    reject: [
      ['hobby horsing|hobbyhorsing', 'A real sport, but the horses are on sticks!'],
      ['bull riding', 'A rodeo event, but there is no horse in it!'],
      ['horseshoes', 'The game of horseshoes uses the shoes but not the horse!']
    ]
  });

  P({
    id: 'circus', category: 'Entertainment',
    prompt: 'Name a circus act or circus performer',
    common: ['Clown', 'Acrobat|acrobatics', 'Juggler|juggling', 'Trapeze artist|trapeze|flying trapeze', 'Tightrope walker|tightrope|tightrope walking|high wire|wire walker|funambulist|high wire walker', 'Lion tamer|animal trainer', 'Ringmaster', 'Magician|magic'],
    uncommon: ['Contortionist|contortion', 'Fire breather|fire eater|fire breathing|fire eating', 'Unicyclist|unicycle|unicycling', 'Stilt walker|stilts|stilt walking', 'Knife thrower|knife throwing', 'Human cannonball', 'Strongman|strong man|strongwoman', 'Sword swallower|sword swallowing', 'Trampoline|trampolining', 'Aerial silks|silks|aerial fabric|tissu', 'Tumbler|tumbling', 'Mime', 'Hula hoop|hoop act|hula hooping|hula hooper', 'Plate spinning|plate spinner', 'Trick riding|bareback riding|bareback rider|trick rider|equestrian act', 'Escape artist|escapologist|escapology', 'Aerialist|aerial act|aerial acrobat'],
    rare: ['Wheel of Death', 'Globe of Death', 'Wall of death', 'Teeterboard|teeter board|korean plank', 'Chinese pole', 'Cyr wheel|roue cyr', 'German wheel|rhonrad', 'Russian swing', 'Diabolo', 'Lyra|aerial hoop|aerial ring', 'Hand balancing|hand balancer|handstand act', 'Slack wire|slackwire', 'Ventriloquist', 'Human pyramid', 'Clown car', 'Fire dancing|fire twirling|poi', 'Trick cycling|acrobatic cycling', 'Bed of nails', 'Aerial straps|straps', 'Chair balancing|chair stacking'],
    deep: ['Rola bola|rolla bolla', 'Corde lisse|aerial rope', 'Icarian games|risley', 'Foot juggling|antipodism', 'Spanish web', 'Cloud swing', 'Aerial cradle|cradle'],
    legendary: ['Banquine', 'Washington trapeze', 'Hair hanging', 'Flea circus'],
    notes: {
      'Trapeze artist': 'Jules Léotard performed the first flying trapeze act in 1859, and the leotard is named after him.',
      'Human cannonball': 'First performed in London in 1877 by a young performer known as Zazel.',
      'Icarian games': 'One performer lies on their back and juggles another person with their feet.',
      'Banquine': 'Flyers are launched by teams who lock their hands together like a basket.',
      'Cyr wheel': 'Named after Canadian performer Daniel Cyr, who made it popular in the early 2000s.'
    },
    reject: [['elephant|lion|tiger|horse|seal', 'Name a human performer or act, like a lion tamer or trick rider!']]
  });

  /* ---------------------------------------------------------------- HOME */

  P({
    id: 'kitchen-utensils', category: 'Home',
    prompt: 'Name a kitchen utensil or gadget',
    common: ['Spatula|turner|flipper|fish slice', 'Whisk', 'Ladle', 'Tongs', 'Knife|chef’s knife|chefs knife|kitchen knife|paring knife|bread knife|butter knife|steak knife|carving knife', 'Spoon|teaspoon|tablespoon|serving spoon', 'Fork', 'Peeler|vegetable peeler|potato peeler', 'Can opener|tin opener', 'Rolling pin'],
    uncommon: ['Grater|cheese grater|box grater', 'Colander', 'Strainer|sieve', 'Measuring cup|measuring jug', 'Measuring spoon', 'Cutting board|chopping board', 'Potato masher|masher', 'Garlic press', 'Pizza cutter|pizza wheel', 'Ice cream scoop|scoop', 'Bottle opener', 'Corkscrew', 'Kitchen scissors|kitchen shears|shears', 'Oven mitt|oven glove', 'Slotted spoon', 'Wooden spoon', 'Mixing bowl', 'Funnel', 'Kitchen timer|timer', 'Meat thermometer|thermometer|food thermometer', 'Baster|turkey baster', 'Rubber spatula|silicone spatula|scraper'],
    rare: ['Zester|microplane|rasp|lemon zester', 'Salad spinner', 'Egg beater|eggbeater|rotary beater', 'Knife sharpener|sharpener|honing steel', 'Jar opener', 'Mortar and pestle|mortar|pestle', 'Pastry brush|basting brush', 'Melon baller', 'Apple corer|corer', 'Cookie cutter|biscuit cutter', 'Sifter|flour sifter', 'Mandoline|mandoline slicer', 'Pastry cutter|pastry blender', 'Egg separator', 'Nutcracker', 'Skewer', 'Juicer|citrus juicer|lemon squeezer|reamer', 'Pot holder|potholder', 'Trivet', 'Bench scraper|dough scraper', 'Cleaver|meat cleaver', 'Meat tenderizer|meat mallet|meat hammer', 'Piping bag|pastry bag', 'Egg slicer', 'Pie server|cake server', 'Kitchen scale|scale', 'Chopsticks', 'Spider|spider strainer|skimmer', 'Cooling rack|wire rack', 'Tea strainer|tea infuser|infuser', 'Pasta server|spaghetti server|pasta fork'],
    deep: ['Mezzaluna', 'Potato ricer|ricer', 'Honey dipper|honey wand', 'Cherry pitter', 'Pizza peel|peel', 'Splatter screen|splatter guard', 'Tortilla press', 'Rice paddle|shamoji', 'Danish dough whisk|dough whisk', 'Herb stripper', 'Avocado slicer', 'Nutmeg grater', 'Egg timer'],
    legendary: ['Spurtle', 'Chinois', 'Tamis|drum sieve', 'Food mill|mouli', 'Bread lame|lame', 'Larding needle', 'Trussing needle', 'Butter curler', 'Makisu|sushi mat'],
    notes: {
      'Spurtle': 'A Scottish wooden stick made for stirring porridge.',
      'Mezzaluna': 'Italian for "half moon," a curved blade you rock back and forth.',
      'Chinois': 'A cone-shaped fine strainer; its name is French for "Chinese," after the shape of a conical hat.',
      'Mortar and pestle': 'People have ground food and spices this way since the Stone Age.'
    },
    reject: [
      ['blender|toaster|microwave|oven|refrigerator|fridge|dishwasher|stove|mixer|stand mixer|food processor|kettle|air fryer|slow cooker', 'That is an appliance. Try a hand tool, like a whisk!'],
      ['pot|pan|frying pan|saucepan|wok|skillet|baking sheet', 'That is cookware. Try a tool you hold in your hand!']
    ]
  });

  P({
    id: 'toolbox', category: 'Home',
    prompt: 'Name a tool you might find in a toolbox',
    common: ['Hammer|claw hammer', 'Screwdriver|phillips screwdriver|flathead screwdriver|flathead|phillips', 'Wrench|spanner|adjustable wrench|adjustable spanner', 'Pliers', 'Saw|handsaw|hand saw', 'Tape measure|measuring tape|tape', 'Drill|power drill|cordless drill'],
    uncommon: ['Level|spirit level|bubble level', 'Allen key|allen wrench|hex key', 'Utility knife|box cutter|stanley knife', 'Socket wrench|ratchet|socket set', 'Mallet|rubber mallet', 'Chisel', 'File', 'Wire cutters|side cutters|cutters', 'Needle-nose pliers|needle nose pliers|long nose pliers', 'Hacksaw', 'Crowbar|pry bar|wrecking bar', 'Clamp|c clamp', 'Locking pliers|vise grips|mole grips', 'Stud finder', 'Sandpaper', 'Flashlight|torch', 'Ruler|steel rule|folding rule'],
    rare: ['Monkey wrench', 'Pipe wrench', 'Awl', 'Plane|hand plane|block plane', 'Wire strippers|wire stripper', 'Putty knife', 'Staple gun', 'Caulking gun|caulk gun', 'Square|speed square|try square|combination square|carpenters square', 'Rasp', 'Sledgehammer|sledge hammer|sledge', 'Ball-peen hammer|ball peen hammer|ball pein hammer', 'Tongue-and-groove pliers|channel locks|channellock|tongue and groove pliers|water pump pliers', 'Coping saw', 'Jigsaw|jig saw', 'Circular saw', 'Bolt cutters', 'Tin snips|snips', 'Nail set', 'Chalk line', 'Torque wrench', 'Multimeter', 'Hot glue gun|glue gun', 'Soldering iron', 'Center punch|centre punch|punch', 'Nut driver', 'Box wrench|ring spanner', 'Pencil|carpenters pencil', 'Pocketknife|pocket knife'],
    deep: ['Plumb bob', 'Bradawl', 'Countersink', 'Hand drill|eggbeater drill', 'Brace|brace and bit', 'Tack hammer', 'Nail puller|cats paw', 'Wire brush', 'Calipers|caliper|vernier caliper', 'Impact driver', 'Cold chisel', 'Jab saw|drywall saw|keyhole saw', 'Dovetail saw', 'Fret saw', 'Deburring tool'],
    legendary: ['Spokeshave', 'Drawknife|draw knife', 'Froe', 'Adze|adz', 'Feeler gauge', 'Tap and die|tap|taps and dies', 'Scriber|scribe', 'Marking gauge', 'Sliding bevel|bevel|t bevel'],
    notes: {
      'Allen key': 'Named after the Allen Manufacturing Company of Hartford, Connecticut.',
      'Plumb bob': '"Plumb" comes from the Latin plumbum, meaning lead, because the weights were made of lead.',
      'Froe': 'A blade hammered into wood to split it along the grain, used for making shingles.',
      'Spokeshave': 'Originally used to shape the wooden spokes of wagon wheels.'
    },
    reject: [
      ['nail|nails|screw|screws|bolt|nut|nuts', 'Useful in a toolbox, but that is hardware, not a tool.'],
      ['duct tape|electrical tape|glue|wd 40', 'Handy to keep in a toolbox, but that is a supply, not a tool.'],
      ['lever', 'A lever is a simple machine. A crowbar is one you might find in a toolbox!']
    ]
  });

  P({
    id: 'house-rooms', category: 'Home',
    prompt: 'Name a room or space in a house',
    strip: ['room'],
    common: ['Kitchen', 'Bedroom', 'Bathroom|bath|restroom|washroom|toilet|lavatory|loo|wc|water closet', 'Living room|front room', 'Dining room', 'Garage', 'Basement', 'Attic|loft'],
    uncommon: ['Laundry room|laundry|utility room', 'Office|home office|study', 'Den', 'Family room', 'Closet', 'Hallway|hall|corridor', 'Pantry', 'Playroom|play room', 'Guest room|spare room|guest bedroom|spare bedroom', 'Nursery', 'Porch|front porch', 'Sunroom|sun room|solarium|florida room', 'Mudroom|mud room|boot room', 'Foyer|entryway|entrance hall|entry', 'Lounge'],
    rare: ['Library', 'Cellar', 'Wine cellar', 'Conservatory', 'Parlor|parlour', 'Sitting room', 'Drawing room', 'Game room|games room|rec room|recreation room|rumpus room', 'Home theater|media room|home cinema|theater room|theatre room|screening room', 'Home gym|gym|exercise room', 'Workshop', 'Walk-in closet|walk in closet|dressing room', 'Powder room|half bath|half bathroom', 'Ensuite|en suite|ensuite bathroom|master bath', 'Primary bedroom|master bedroom', 'Breakfast nook|nook', 'Great room', 'Storage room|storeroom', 'Crawl space|crawlspace', 'Staircase|stairwell|stairs', 'Landing', 'Balcony', 'Patio', 'Deck', 'Ballroom|ball room', 'Music room', 'Craft room', 'Sewing room', 'Linen closet', 'Bonus room'],
    deep: ['Scullery', 'Larder', 'Butler’s pantry|butlers pantry', 'Vestibule', 'Box room', 'Boiler room|furnace room|mechanical room', 'Panic room|safe room', 'Snug', 'Morning room', 'Root cellar', 'Billiard room|pool room', 'Lanai', 'Veranda|verandah', 'Atrium', 'Gallery'],
    legendary: ['Garret', 'Inglenook', 'Solar', 'Buttery', 'Lumber room', 'Still room|stillroom', 'Widow’s walk|widows walk', 'Priest hole|priests hole', 'Belvedere'],
    notes: {
      'Drawing room': 'Short for "withdrawing room," where guests withdrew after dinner.',
      'Scullery': 'A back kitchen used for washing dishes and other messy jobs.',
      'Priest hole': 'Secret hiding places built into English houses in the 1500s and 1600s to hide Catholic priests.',
      'Widow’s walk': 'A railed rooftop platform on coastal houses, with a view of the sea.',
      'Solar': 'In medieval homes, the family’s private upstairs room, away from the noisy great hall.'
    }
  });

  P({
    id: 'furniture', category: 'Home',
    prompt: 'Name a piece of furniture',
    common: ['Chair', 'Table', 'Sofa|couch|settee|davenport|chesterfield', 'Bed', 'Desk', 'Dresser|chest of drawers|bureau', 'Bookcase|bookshelf|bookshelves|shelf|shelves|shelving', 'Stool', 'Bench', 'Armchair|easy chair'],
    uncommon: ['Wardrobe|armoire', 'Cabinet|cupboard', 'Nightstand|bedside table|night table|bedside cabinet', 'Ottoman|footstool|pouf|pouffe|hassock|footrest', 'Recliner', 'Futon', 'Bunk bed|bunk beds|bunks', 'Crib|cot', 'Coffee table', 'Rocking chair|rocker', 'Loveseat|love seat', 'Sectional|sectional sofa', 'Beanbag|bean bag|beanbag chair', 'End table|side table', 'Dining table|kitchen table', 'TV stand|entertainment center|media console|tv cabinet', 'Filing cabinet|file cabinet', 'High chair|highchair', 'Barstool|bar stool', 'Office chair|desk chair|swivel chair', 'Vanity|dressing table', 'Hutch|china cabinet'],
    rare: ['Sideboard|buffet|credenza', 'Chaise longue|chaise lounge|chaise|fainting couch', 'Daybed|day bed', 'Murphy bed|wall bed', 'Four-poster bed|four poster|canopy bed', 'Trundle bed|trundle', 'Bassinet', 'Cradle', 'Console table', 'Curio cabinet|display cabinet', 'Hope chest|blanket chest|cedar chest', 'Trunk|chest|toy chest|toy box', 'Coat rack|hall tree|hat stand|coat stand', 'Folding chair', 'Deck chair|sun lounger|lounger', 'Adirondack chair', 'Wingback chair|wing chair|wingback', 'Papasan chair|papasan', 'Divan', 'Pew', 'Throne', 'Workbench', 'Tallboy|highboy', 'Lowboy', 'Secretary desk|secretary|secretaire', 'Roll-top desk|rolltop desk|roll top desk', 'Writing desk', 'Window seat', 'Room divider|folding screen', 'Plant stand', 'Magazine rack', 'Hammock', 'Glider|porch glider', 'Porch swing', 'Waterbed|water bed', 'Sofa bed|sleeper sofa|pull out couch|pullout couch|sofa sleeper', 'Picnic table', 'Changing table'],
    deep: ['Escritoire', 'Étagère|etagere', 'Chiffonier|chiffonnier', 'Whatnot', 'Tuffet', 'Morris chair', 'Windsor chair', 'Gateleg table|gate leg table|gateleg', 'Pembroke table', 'Bar cart|tea cart|tea trolley', 'Settle', 'Hall table'],
    legendary: ['Fauteuil', 'Bergère|bergere', 'Récamier|recamier', 'Méridienne|meridienne', 'Kotatsu', 'Chabudai', 'Cassone', 'Canterbury'],
    notes: {
      'Ottoman': 'Named after the Ottoman Empire, where low cushioned seats were popular.',
      'Tuffet': 'Little Miss Muffet sat on one in the nursery rhyme.',
      'Kotatsu': 'A low Japanese table with a heater underneath and a blanket draped over it.',
      'Récamier': 'Named after Madame Récamier, who posed on one in an 1800 painting by Jacques-Louis David.',
      'Murphy bed': 'Named after William Murphy, who patented folding beds in the early 1900s.'
    },
    reject: [
      ['refrigerator|fridge|stove|oven|tv|television|computer|microwave|dishwasher', 'That is an appliance or device, not furniture.'],
      ['deck', 'A deck is part of a house, not a piece of furniture.']
    ]
  });

  P({
    id: 'bathroom', category: 'Home',
    prompt: 'Name something you might find in a bathroom',
    common: ['Toilet|loo|lavatory', 'Sink|basin|washbasin|wash basin', 'Bathtub|tub|bath', 'Shower', 'Towel|bath towel', 'Toothbrush', 'Toothpaste', 'Soap|bar of soap', 'Mirror', 'Toilet paper|toilet roll|loo roll|tp|bathroom tissue'],
    uncommon: ['Shampoo', 'Conditioner', 'Hairbrush|hair brush', 'Comb', 'Floss|dental floss', 'Mouthwash', 'Razor|electric razor|shaver', 'Hair dryer|hairdryer|blow dryer|blow drier', 'Bath mat|bathmat|bath rug', 'Shower curtain', 'Plunger', 'Toilet brush', 'Bathroom scale|scale|scales', 'Medicine cabinet', 'Cotton swabs|q tips|cotton buds|cotton swab|qtips', 'Washcloth|flannel|facecloth|face cloth|wash cloth', 'Loofah|luffa', 'Sponge', 'Bubble bath', 'Body wash|shower gel', 'Lotion|moisturizer|moisturiser|body lotion', 'Deodorant', 'Faucet|tap|taps', 'Towel rack|towel rail|towel bar', 'Hand towel', 'Rubber duck|rubber ducky|rubber duckie'],
    rare: ['Nail clippers', 'Tweezers', 'Bath bomb', 'Soap dish', 'Soap dispenser|hand soap', 'Toothbrush holder', 'Shower head|showerhead', 'Drain', 'Plug|stopper|drain plug', 'Laundry hamper|hamper|laundry basket', 'Tissues|tissue box|kleenex', 'Trash can|wastebasket|bin|garbage can|rubbish bin|waste bin', 'Nail file|emery board', 'Pumice stone|pumice', 'Shaving cream|shaving foam', 'Bathrobe|robe|dressing gown', 'Exhaust fan|extractor fan|vent fan|bathroom fan', 'Vanity|vanity unit', 'Grab bar|grab rail', 'Shower caddy', 'Bath toys', 'Curling iron|curling tongs', 'Hair straightener|straightener|flat iron', 'Shower cap', 'Cotton balls|cotton wool balls|cotton pads', 'Air freshener', 'Night light|nightlight', 'Electric toothbrush', 'Hairspray|hair spray', 'Face wash|cleanser', 'Bath salts', 'Squeegee', 'Toilet seat', 'Shower door|shower screen', 'Tiles|tile', 'Towel hook|hook', 'Toilet roll holder|toilet paper holder', 'Urinal', 'Hand dryer', 'Paper towels|paper towel', 'Makeup|make up|cosmetics', 'Perfume|cologne', 'Medicine|medication|pills', 'Bandages|band aids|bandaids|plasters'],
    deep: ['Bidet', 'Toilet tank|cistern', 'Grout', 'Bath oil', 'Body scrub|exfoliator', 'Toilet cleaner|toilet bowl cleaner', 'Shower curtain rings|curtain rings', 'Bath caddy|bath tray', 'Heated towel rail|towel warmer'],
    legendary: ['P-trap|p trap|u bend|s bend|trap', 'Escutcheon', 'Flapper', 'Ballcock|float valve', 'Wax ring', 'Overflow|overflow drain'],
    notes: {
      'Bidet': 'First appeared in France around 1700; no one knows exactly who invented it.',
      'P-trap': 'Its U-shaped bend holds water that stops sewer gas from coming up the drain.',
      'Escutcheon': 'The decorative plate around a pipe or faucet where it meets the wall.',
      'Toilet paper': 'Joseph Gayetty sold the first packaged toilet paper in the U.S. in 1857.',
      'Flapper': 'The rubber seal inside a toilet tank that lifts when you flush.'
    }
  });

  P({
    id: 'camping-gear', category: 'Outdoors',
    prompt: 'Name a piece of camping gear',
    common: ['Tent', 'Sleeping bag', 'Flashlight|torch', 'Lantern|camping lantern', 'Cooler|cool box|ice chest|esky', 'Backpack|rucksack|pack|knapsack', 'Camp stove|stove|camping stove'],
    uncommon: ['Sleeping pad|sleeping mat|camping mat|roll mat|foam pad|bedroll', 'Air mattress|air bed|airbed|blow up mattress|inflatable mattress', 'Camp chair|camping chair|folding chair', 'Matches', 'Lighter', 'Pocketknife|pocket knife|swiss army knife|penknife|jackknife', 'Compass', 'Map', 'First aid kit', 'Water bottle', 'Bug spray|insect repellent|mosquito repellent|bug repellent', 'Sunscreen|sunblock|suncream', 'Headlamp|head torch', 'Hammock', 'Tarp|tarpaulin', 'Rope', 'Axe|ax', 'Hatchet', 'Pillow|camp pillow', 'Mess kit', 'Canteen', 'Knife|camp knife|hunting knife', 'Blanket|camp blanket'],
    rare: ['Tent stakes|tent pegs|stakes|pegs', 'Mallet|tent mallet', 'Cookware|pots and pans|cooking pot|camp cookware|pot|pan', 'Shovel|camp shovel|folding shovel', 'Saw|folding saw|camp saw', 'Thermos|vacuum flask', 'Kettle|camp kettle', 'Portable grill|camp grill|grill', 'Water filter|water purifier', 'Multitool|multi tool', 'Bear spray', 'Bear canister', 'Fire starter|firestarter', 'Ferro rod|ferrocerium rod|flint and steel|fire steel', 'Trekking poles|hiking poles|walking poles', 'Cot|camp bed|camping cot', 'Dry bag', 'Stuff sack', 'Groundsheet|ground sheet|footprint|ground cloth', 'Rain fly|rainfly|flysheet|fly sheet', 'Guy lines|guylines|guy ropes', 'Tent poles', 'Emergency blanket|space blanket|mylar blanket', 'Poncho|rain poncho', 'Whistle', 'GPS|gps unit', 'Trowel|camp trowel', 'Paracord', 'Carabiner|karabiner', 'Percolator|coffee percolator', 'Dutch oven', 'Skillet|cast iron skillet', 'Roasting stick|marshmallow stick|toasting fork', 'Camp shower|solar shower', 'Water jug|water container', 'Bandana', 'Binoculars', 'Duct tape', 'Spork', 'Bivy sack|bivvy bag|bivouac sack|bivy', 'Fuel canister|gas canister', 'Camp table|folding table', 'Mosquito net|bug net|insect net', 'Canopy|pop up canopy|gazebo', 'Sleeping bag liner', 'Hydration pack|hydration bladder|water bladder'],
    deep: ['Bear bag', 'Camp soap|biodegradable soap', 'Pack cover|rain cover', 'Hand warmers', 'Campfire tripod|tripod', 'Grill grate', 'Collapsible bucket', 'Sit pad|sit mat', 'Gaiters', 'Ditty bag'],
    legendary: ['Billy can|billy|billycan', 'Storm kettle|kelly kettle|volcano kettle', 'Pie iron|mountain pie maker|pudgie pie maker', 'Bothy bag|group shelter'],
    notes: {
      'Billy can': 'An Australian bush cooking pot that appears in the song "Waltzing Matilda."',
      'Storm kettle': 'A chimney-shaped kettle heated by a small fire burning inside it.',
      'Spork': 'Half spoon, half fork.',
      'Pie iron': 'Clamps bread and filling together so you can toast it over a campfire.'
    },
    reject: [['campfire|fire|marshmallows|smores|s mores', 'Part of the fun, but not a piece of gear!']]
  });

  /* ------------------------------------------------------------- EVERYDAY */

  P({
    id: 'hats', category: 'Fashion',
    prompt: 'Name a type of hat or cap',
    strip: ['hat', 'cap'],
    common: ['Baseball cap|ball cap|baseball hat|ballcap', 'Top hat|stovepipe', 'Beanie|toque|tuque|ski hat|stocking cap|toboggan|pom pom hat|knit cap|knit hat|winter hat|woolly hat|wooly hat|bobble hat', 'Cowboy hat|stetson|ten gallon hat|10 gallon hat', 'Sombrero', 'Beret', 'Fedora'],
    uncommon: ['Bucket hat|fishing hat|fisherman hat', 'Bowler|derby|bowler hat', 'Sun hat', 'Fez', 'Santa hat|santa claus hat|christmas hat', 'Visor|sun visor', 'Trucker hat|trucker cap', 'Snapback', 'Hard hat', 'Party hat', 'Chef’s hat|chef hat|chefs hat|toque blanche', 'Witch’s hat|witch hat|witches hat', 'Bonnet|sun bonnet', 'Graduation cap|mortarboard', 'Straw hat', 'Cloche', 'Newsboy cap|baker boy cap|newsie', 'Flat cap|ivy cap|cabbie cap|scally cap', 'Swim cap|bathing cap|swimming cap', 'Shower cap', 'Wizard hat|wizards hat', 'Turban'],
    rare: ['Trilby', 'Panama hat|panama', 'Boater|straw boater|skimmer', 'Pork pie hat|porkpie', 'Deerstalker', 'Tam o’ shanter|tam o shanter|tam|tammy', 'Pillbox hat|pillbox', 'Fascinator', 'Tricorne|tricorn|three cornered hat|pirate hat', 'Bicorne|bicorn', 'Bearskin', 'Pith helmet|sun helmet|safari helmet', 'Bush hat|boonie hat|boonie', 'Ushanka|trapper hat|aviator hat', 'Sou’wester|souwester', 'Kippah|yarmulke|kipa', 'Coonskin cap', 'Jester hat|jester cap|fools cap|cap and bells', 'Conical hat|rice hat|non la', 'Nightcap|night cap|sleeping cap', 'Sailor hat|sailor cap|dixie cup', 'Captain’s hat|captains hat|captains cap|skipper hat', 'Homburg', 'Beanie propeller|propeller beanie|propeller', 'Slouch hat', 'Skullcap|skull cap'],
    deep: ['Busby', 'Kepi|képi', 'Shako', 'Kufi|taqiyah', 'Zucchetto', 'Mitre|miter', 'Phrygian cap|liberty cap', 'Garrison cap|side cap|forage cap', 'Peaked cap|service cap', 'Tyrolean hat|alpine hat', 'Glengarry', 'Balmoral', 'Gaucho hat|gaucho'],
    legendary: ['Pakol', 'Karakul|qaraqul', 'Capotain', 'Chullo', 'Montera', 'Galero'],
    notes: {
      'Panama hat': 'Despite the name, Panama hats are made in Ecuador.',
      'Bowler': 'Created in 1849 by London hatmakers Thomas and William Bowler.',
      'Sombrero': 'Its name comes from sombra, the Spanish word for shade.',
      'Bearskin': 'The tall fur hat worn by the guards at Buckingham Palace.',
      'Chullo': 'An Andean knit hat with earflaps, traditionally made from alpaca wool.'
    },
    reject: [
      ['crown|tiara|headband|earmuffs|hood|scarf|headscarf|bandana|balaclava|hijab|wig', 'That goes on your head, but it is not really a hat or cap.'],
      ['helmet|bike helmet|football helmet', 'A helmet is protective gear rather than a hat. (A hard hat or pith helmet counts, though!)']
    ]
  });

  P({
    id: 'footwear', category: 'Fashion',
    prompt: 'Name a type of footwear',
    strip: ['shoe', 'shoes', 'boot', 'boots', 'sandal', 'sandals'],
    common: ['Sneakers|trainers|running shoes|tennis shoes|gym shoes|athletic shoes|basketball shoes|sneaks|runners|kicks', 'Boots|boot', 'Sandals|sandal', 'Flip-flops|flip flops|jandals', 'Slippers|house shoes', 'High heels|heels'],
    uncommon: ['Loafers|penny loafers', 'Rain boots|wellingtons|wellies|gumboots|rubber boots|galoshes|wellington boots', 'Cowboy boots', 'Hiking boots|hikers|walking boots', 'Cleats|football boots|soccer cleats|studs', 'Clogs|wooden shoes|klompen|sabots|crocs', 'Moccasins|mocs', 'Ballet flats|flats', 'Oxfords|oxford', 'Dress shoes', 'Slides|sliders|pool slides', 'Snow boots', 'Boat shoes|deck shoes|topsiders', 'Wedges|wedge heels', 'Mules', 'Platform shoes|platforms'],
    rare: ['Pumps|court shoes', 'Stilettos|stiletto heels', 'Espadrilles|alpargatas', 'Brogues|wingtips', 'Mary Janes', 'Chelsea boots', 'Combat boots|army boots|military boots', 'Ugg boots|uggs|ugg|sheepskin boots', 'Ankle boots|booties', 'Tap shoes', 'Ballet shoes|ballet slippers', 'Pointe shoes|toe shoes', 'Bowling shoes', 'Plimsolls|sandshoes|canvas shoes', 'Slip-ons|slip ons', 'High-tops|high tops|high top sneakers', 'Kitten heels', 'Slingbacks|slingback', 'Peep-toes|peep toe', 'Gladiator sandals', 'Huaraches|huarache', 'Snowshoes', 'Ski boots', 'Waders', 'Work boots|steel toe boots|steel toes|steel toe', 'Riding boots|equestrian boots', 'Overshoes', 'Saddle shoes', 'Monk straps|monk shoes|monk strap', 'Derby shoes|derbies|bluchers', 'Chukka boots|chukkas', 'Desert boots', 'Spikes|track spikes|running spikes', 'Climbing shoes', 'Water shoes|aqua shoes|reef shoes', 'Jelly shoes|jellies', 'Go-go boots|gogo boots', 'Knee-high boots|knee high boots|knee boots', 'Golf shoes', 'Thigh-high boots|thigh high boots'],
    deep: ['Geta', 'Zori', 'Mukluks', 'Kamiks', 'Tabi|jika tabi', 'Chappals|kolhapuris|kolhapuri chappals', 'Waraji', 'Valenki', 'Babouches|babouche', 'Jutti|mojari'],
    legendary: ['Chopines', 'Poulaines|crakows', 'Pattens', 'Winklepickers', 'Veldskoen|vellies', 'Caligae'],
    notes: {
      'Rain boots': 'Wellingtons are named after the Duke of Wellington, who had his boots restyled in the early 1800s.',
      'Chopines': 'Renaissance platform shoes from Venice that could be as much as 20 inches tall.',
      'Poulaines': 'Medieval shoes with extremely long, pointed toes.',
      'Geta': 'Japanese wooden sandals that raise the foot up on wooden teeth.',
      'Caligae': 'Heavy hobnailed sandals worn by Roman soldiers.'
    },
    reject: [['socks|sock|stockings|tights|laces|shoelaces', 'Not quite! Try a kind of shoe, boot, or sandal.']]
  });

  P({
    id: 'fabrics', category: 'Fashion',
    prompt: 'Name a fabric or cloth',
    common: ['Cotton', 'Wool', 'Silk', 'Denim|jean', 'Polyester', 'Linen', 'Velvet', 'Nylon'],
    uncommon: ['Satin', 'Fleece|polar fleece', 'Flannel', 'Corduroy|cord|cords', 'Spandex|lycra|elastane', 'Cashmere', 'Lace', 'Felt', 'Canvas', 'Rayon|viscose', 'Chiffon', 'Tweed', 'Jersey', 'Terry cloth|terrycloth|terry|towelling|toweling', 'Acrylic', 'Microfiber|microfibre', 'Mesh', 'Burlap|hessian', 'Muslin', 'Velour', 'Tulle'],
    rare: ['Gingham', 'Organza', 'Taffeta', 'Chambray', 'Twill', 'Seersucker', 'Gauze', 'Cheesecloth', 'Oilcloth', 'Crepe|crêpe', 'Mohair', 'Alpaca', 'Angora', 'Merino', 'Pashmina', 'Hemp', 'Jute', 'Damask', 'Brocade', 'Chenille', 'Poplin', 'Voile', 'Georgette', 'Gabardine', 'Madras', 'Oxford cloth|oxford', 'Calico', 'Sateen', 'Jacquard', 'Velveteen', 'Bouclé|boucle', 'Broadcloth', 'Moleskin', 'Ripstop', 'Flannelette', 'Lyocell|tencel', 'Modal', 'Sailcloth', 'Toile'],
    deep: ['Percale', 'Batiste', 'Lawn', 'Crinoline', 'Ramie', 'Charmeuse', 'Organdy|organdie', 'Ticking', 'Loden', 'Melton', 'Sharkskin', 'Cretonne', 'Dimity', 'Worsted', 'Baize'],
    legendary: ['Qiviut', 'Vicuña|vicuna', 'Shantung', 'Dupioni|douppioni', 'Tussar|tussah', 'Grosgrain', 'Bombazine', 'Samite'],
    notes: {
      'Denim': 'The name comes from "serge de Nîmes," a fabric from Nîmes, France.',
      'Calico': 'Named after Calicut (now Kozhikode), a city in India.',
      'Qiviut': 'The soft underwool of the musk ox, warmer than sheep’s wool.',
      'Vicuña': 'Comes from a wild relative of the llama and is one of the most expensive fibers in the world.',
      'Baize': 'The green cloth that covers pool and snooker tables.'
    },
    reject: [
      ['leather|suede|plastic|rubber|vinyl|fur|wood', 'That is a material, but not a woven, knitted, or felted cloth.'],
      ['plaid|tartan|polka dot|polka dots|paisley|stripes|houndstooth|herringbone|argyle', 'That is a pattern rather than a type of cloth.']
    ]
  });

  P({
    id: 'knots', category: 'Outdoors',
    prompt: 'Name a knot',
    strip: ['knot'],
    common: ['Square knot|reef knot', 'Bow|bow knot|bowknot|shoelace knot', 'Slip knot|slipknot', 'Bowline', 'Granny knot', 'Overhand knot|overhand|thumb knot'],
    uncommon: ['Figure-eight knot|figure 8|figure of 8|figure eight', 'Clove hitch', 'Half hitch', 'Sheepshank', 'Sheet bend|becket bend', 'Windsor knot|windsor|full windsor|double windsor', 'Fisherman’s knot|fishermans knot|fishermans', 'Taut-line hitch|tautline hitch|taut line hitch', 'Two half hitches|2 half hitches', 'Trucker’s hitch|truckers hitch', 'Timber hitch', 'Cleat hitch', 'Double knot'],
    rare: ['Half Windsor', 'Four-in-hand|four in hand|4 in hand', 'Monkey’s fist|monkeys fist|monkey fist', 'Prusik|prusik knot', 'Constrictor knot|constrictor', 'Rolling hitch', 'Surgeon’s knot|surgeons knot', 'Alpine butterfly|butterfly knot|butterfly', 'Double fisherman’s knot|double fishermans|grapevine bend', 'Turk’s head|turks head', 'Lark’s head|larks head|girth hitch|cow hitch', 'Stopper knot|stopper', 'Running bowline', 'Bowline on a bight', 'Carrick bend', 'Water knot|tape knot|ring bend', 'Munter hitch|italian hitch', 'Highwayman’s hitch|highwaymans hitch', 'Improved clinch knot|clinch knot|improved clinch', 'Palomar knot|palomar', 'Blood knot|barrel knot', 'Anchor bend|fishermans bend', 'Pratt knot|pratt|shelby'],
    deep: ['Zeppelin bend', 'Hunter’s bend|hunters bend|riggers bend', 'Marlinspike hitch', 'Halyard hitch', 'Buntline hitch', 'Bimini twist', 'Uni knot|duncan loop', 'Albright knot|albright', 'Spanish bowline', 'Thief knot', 'Diamond knot', 'Cat’s paw|cats paw', 'Packer’s knot|packers knot', 'Celtic button knot|chinese button knot|button knot'],
    legendary: ['Ashley stopper knot|ashley stopper', 'Matthew Walker knot|matthew walker', 'Klemheist', 'Ossel hitch', 'Icicle hitch', 'Pile hitch', 'Eldredge knot|eldredge', 'Kelvin knot|kelvin', 'Trinity knot|trinity'],
    notes: {
      'Square knot': 'Sailors used it to tie up, or "reef," their sails, which is why it is also called a reef knot.',
      'Granny knot': 'A square knot tied the wrong way, so it slips more easily.',
      'Ashley stopper knot': 'Invented by Clifford Ashley, whose 1944 Ashley Book of Knots describes nearly 4,000 knots.',
      'Monkey’s fist': 'A ball-shaped knot used to add weight to the end of a throwing line.',
      'Bowline': 'Often called "the king of knots" because its loop does not slip or jam.'
    },
    reject: [['gordian knot|gordian', 'The Gordian knot is legendary: Alexander the Great is said to have cut it instead of untying it!']]
  });

  P({
    id: 'stringed-instruments', category: 'Music',
    prompt: 'Name a musical instrument that has strings',
    common: ['Guitar|acoustic guitar|classical guitar|spanish guitar', 'Violin|fiddle', 'Cello|violoncello', 'Harp', 'Banjo', 'Ukulele|uke', 'Bass guitar|bass|electric bass', 'Electric guitar'],
    uncommon: ['Viola', 'Double bass|upright bass|contrabass|string bass|bass fiddle', 'Mandolin', 'Sitar', 'Lute', 'Harpsichord', 'Lyre', 'Zither', 'Dulcimer|appalachian dulcimer|mountain dulcimer', 'Piano|pianoforte|grand piano|upright piano'],
    rare: ['Hammered dulcimer', 'Balalaika', 'Bouzouki', 'Koto', 'Shamisen', 'Erhu', 'Pipa', 'Guzheng', 'Oud', 'Autoharp', 'Steel guitar|pedal steel|lap steel|pedal steel guitar|lap steel guitar', 'Resonator guitar|dobro', 'Twelve-string guitar|12 string guitar|12 string', 'Charango', 'Hurdy-gurdy|hurdy gurdy', 'Kora', 'Clavichord', 'Cavaquinho', 'Berimbau', 'Viola da gamba|viol|gamba', 'Psaltery', 'Washtub bass', 'Cimbalom', 'Sarod', 'Veena|vina', 'Tanpura|tambura', 'Santoor|santur', 'Guqin', 'Bandura'],
    deep: ['Gayageum|kayagum', 'Kantele', 'Nyckelharpa', 'Bağlama|baglama|saz', 'Tres', 'Cuatro', 'Vihuela', 'Theorbo', 'Rebec', 'Sarangi', 'Kamancheh|kamanche', 'Morin khuur|horsehead fiddle', 'Domra', 'Dombra', 'Gusli', 'Rebab', 'Sanshin', 'Diddley bow', 'Mandola', 'Cittern', 'Archlute', 'Ektara', 'Guitarrón|guitarron', 'Bajo sexto'],
    legendary: ['Octobass', 'Baryton', 'Viola d’amore|viola damore', 'Valiha', 'Sape|sapeh', 'Ngoni', 'Ronroco', 'Tromba marina'],
    notes: {
      'Piano': 'Its hammers strike more than 200 strings inside, so it is often classed as a string instrument.',
      'Octobass': 'So tall (about 3.5 meters) that the player uses levers and pedals to press the strings.',
      'Hurdy-gurdy': 'A hand-cranked wheel rubs the strings, like a violin bow that never ends.',
      'Morin khuur': 'Mongolia’s national instrument, topped with a carved horse head.',
      'Valiha': 'Madagascar’s national instrument, a tube zither made from bamboo.'
    },
    reject: [['drum|drums|flute|trumpet|saxophone|clarinet|trombone|tuba|harmonica|accordion|xylophone|pipe|pipes|bagpipes|recorder|oboe|bassoon|organ|french horn|kazoo|tambourine|cymbals|marimba|glockenspiel|ocarina|piccolo', 'That instrument has no strings.']]
  });

  P({
    id: 'federal-holidays', category: 'Everyday',
    prompt: 'Name a U.S. federal holiday',
    common: ['Christmas|christmas day|xmas', 'Thanksgiving|thanksgiving day', 'Independence Day|fourth of july|4th of july|july 4th|july fourth|july 4', 'New Year’s Day|new years|new year|new years day'],
    uncommon: ['Memorial Day', 'Labor Day|labour day', 'Martin Luther King Jr. Day|mlk day|martin luther king day|mlk jr day|martin luther king jr day'],
    rare: ['Veterans Day|veterans|armistice day', 'Presidents’ Day|presidents day|washingtons birthday|president day'],
    deep: ['Juneteenth|juneteenth national independence day', 'Columbus Day|indigenous peoples day'],
    legendary: ['Inauguration Day'],
    notes: {
      'Juneteenth': 'Became the newest federal holiday in 2021.',
      'Presidents’ Day': 'Its official name in federal law is Washington’s Birthday.',
      'Veterans Day': 'Held on November 11, the day World War I fighting ended in 1918.',
      'Inauguration Day': 'A federal holiday every four years, but only for federal workers in and around Washington, D.C.',
      'Columbus Day': 'Its official name in federal law is Columbus Day; many states and cities observe the same day as Indigenous Peoples’ Day.'
    },
    reject: [
      ['halloween|valentines day|valentines|easter|st patricks day|saint patricks day|mothers day|fathers day|groundhog day|earth day|flag day|cinco de mayo|good friday|hanukkah|kwanzaa|diwali|eid|election day|tax day|black friday|boxing day|april fools day|arbor day', 'Many people mark that day, but it is not a federal holiday.'],
      ['christmas eve|new years eve', 'Not an official federal holiday, though the next day is!']
    ]
  });

  P({
    id: 'time-units', category: 'Everyday',
    prompt: 'Name a unit of time',
    common: ['Second|sec', 'Minute|min', 'Hour|hr', 'Day', 'Week', 'Month', 'Year|yr'],
    uncommon: ['Decade', 'Century', 'Millennium', 'Millisecond|ms', 'Fortnight'],
    rare: ['Microsecond', 'Nanosecond', 'Picosecond', 'Femtosecond', 'Eon|aeon', 'Era', 'Epoch', 'Age', 'Period', 'Jiffy'],
    deep: ['Attosecond', 'Zeptosecond', 'Yoctosecond', 'Sidereal day', 'Lunar month|synodic month', 'Olympiad', 'Lustrum', 'Sennight', 'Biennium', 'Quinquennium', 'Sol', 'Galactic year|cosmic year', 'Megaannum|megayear'],
    legendary: ['Planck time', 'Shake', 'Svedberg', 'Moment', 'Helek', 'Ke', 'Rontosecond', 'Quectosecond'],
    notes: {
      'Fortnight': 'Comes from "fourteen nights" in Old English.',
      'Shake': 'Ten nanoseconds; nuclear physicists named it after "two shakes of a lamb’s tail."',
      'Moment': 'A medieval unit equal to 1/40 of an hour, or 90 seconds.',
      'Sol': 'A day on Mars, about 24 hours and 39 minutes long.',
      'Helek': 'In the Hebrew calendar, 1/1,080 of an hour, or 3⅓ seconds.',
      'Quectosecond': 'Quecto- became the smallest official SI prefix in 2022, meaning 10⁻³⁰.'
    },
    reject: [['light year|lightyear|light years', 'A light-year measures distance, not time!']]
  });

  P({
    id: 'school-subjects', category: 'Everyday',
    prompt: 'Name a school subject',
    common: ['Math|maths|mathematics', 'English|english language arts|ela|language arts', 'Science', 'History', 'Art', 'Music', 'Physical education|pe|phys ed|gym', 'Reading'],
    uncommon: ['Geography', 'Biology|bio', 'Chemistry|chem', 'Physics', 'Spanish', 'French', 'Social studies', 'Writing', 'Health', 'Computer science|computing|cs|computers|ict|information technology', 'Drama|theater|theatre', 'Band', 'Choir|chorus', 'Algebra', 'Geometry', 'Calculus|calc', 'Literature|english literature', 'Economics|econ', 'Government|civics|politics|political science'],
    rare: ['German', 'Latin', 'Chinese|mandarin', 'Japanese', 'Italian', 'Statistics|stats', 'Trigonometry|trig', 'Psychology|psych', 'Sociology', 'Philosophy', 'Earth science', 'Environmental science', 'Anatomy|anatomy and physiology', 'Astronomy', 'Engineering', 'Robotics', 'Coding|programming', 'Journalism', 'Debate', 'Speech|public speaking', 'Photography', 'Ceramics|pottery', 'Woodworking|shop|woodshop|wood shop', 'Home economics|home ec|family and consumer sciences|fcs|food technology', 'Culinary arts|cooking', 'Business|business studies', 'Accounting', 'Creative writing', 'World history', 'Orchestra', 'Dance', 'Religious education|religious studies|religion|theology', 'Ethics', 'Art history', 'Geology', 'Spelling', 'Phonics', 'Typing|keyboarding', 'Driver’s education|drivers ed|drivers education', 'Marine biology', 'Forensic science|forensics', 'Graphic design', 'Media studies', 'Film studies|film', 'Pre-calculus|precalculus|precalc|pre calc', 'Grammar', 'Arithmetic', 'Foreign language|foreign languages|world languages|modern languages|languages', 'Humanities', 'Life science', 'Physical science', 'Technology|tech|design and technology|design technology'],
    deep: ['Arabic', 'Russian', 'Korean', 'Portuguese', 'Ancient Greek|greek', 'American Sign Language|asl|sign language', 'Agriculture|agricultural science', 'Marketing', 'Law', 'Anthropology', 'Archaeology|archeology', 'Botany', 'Zoology', 'Ecology', 'Genetics', 'Personal finance|financial literacy', 'Metalworking|metal shop', 'Auto shop|automotive technology', 'Music theory', 'Sculpture', 'Painting', 'Drawing', 'Textiles|sewing', 'Hebrew', 'Hindi'],
    legendary: ['Rhetoric', 'Logic', 'Classics|classical studies', 'Penmanship|handwriting|cursive', 'Theory of knowledge|tok', 'Swahili', 'Welsh', 'Irish|irish gaelic|gaelic'],
    notes: {
      'Rhetoric': 'One of the three core subjects of a medieval education, with grammar and logic.',
      'Penmanship': 'Cursive handwriting was a core subject in American schools for generations.',
      'Theory of knowledge': 'A required course in the International Baccalaureate diploma program.',
      'Latin': 'Studied in schools for centuries, long after anyone spoke it as a first language.'
    },
    reject: [['recess|lunch|homeroom|study hall|nap time|naptime|break', 'A fun part of the school day, but not a subject!']]
  });

  P({
    id: 'ist-jobs', category: 'Everyday',
    prompt: 'Name a job whose title ends in "-ist"',
    common: ['Dentist', 'Scientist|computer scientist|data scientist|rocket scientist|political scientist|social scientist', 'Artist', 'Pharmacist', 'Florist', 'Journalist', 'Therapist|occupational therapist|speech therapist|massage therapist|psychotherapist', 'Chemist'],
    uncommon: ['Biologist', 'Physicist', 'Pianist', 'Guitarist', 'Violinist', 'Psychologist', 'Cartoonist', 'Receptionist', 'Typist', 'Economist', 'Orthodontist', 'Geologist', 'Optometrist', 'Archaeologist|archeologist', 'Novelist', 'Zoologist', 'Meteorologist', 'Stylist|hairstylist|hair stylist', 'Nutritionist', 'Paleontologist|palaeontologist'],
    rare: ['Botanist', 'Columnist', 'Machinist', 'Psychiatrist', 'Dermatologist', 'Cardiologist', 'Neurologist', 'Radiologist', 'Anesthesiologist|anaesthesiologist', 'Oncologist', 'Pathologist', 'Podiatrist', 'Physiotherapist|physical therapist', 'Hygienist|dental hygienist', 'Anthropologist', 'Sociologist', 'Linguist', 'Ecologist', 'Entomologist', 'Ornithologist', 'Marine biologist', 'Astrophysicist', 'Geneticist', 'Cellist', 'Harpist', 'Flautist|flutist', 'Organist', 'Bassist', 'Percussionist', 'Vocalist', 'Lyricist', 'Publicist', 'Lobbyist', 'Archivist', 'Horticulturist', 'Arborist', 'Hypnotist', 'Ventriloquist', 'Illusionist', 'Contortionist', 'Taxidermist', 'Manicurist', 'Cosmetologist', 'Seismologist', 'Volcanologist|vulcanologist', 'Microbiologist', 'Neuroscientist', 'Specialist', 'Saxophonist', 'Biochemist', 'Soloist'],
    deep: ['Epidemiologist', 'Virologist', 'Immunologist', 'Toxicologist', 'Criminologist', 'Hydrologist', 'Glaciologist', 'Climatologist', 'Herpetologist', 'Ichthyologist', 'Mycologist', 'Primatologist', 'Egyptologist', 'Genealogist', 'Cosmologist', 'Ophthalmologist', 'Audiologist', 'Allergist', 'Internist', 'Phlebotomist', 'Anesthetist|anaesthetist', 'Periodontist', 'Endodontist', 'Metallurgist', 'Mineralogist', 'Agronomist', 'Satirist', 'Essayist', 'Accompanist', 'Aerialist', 'Physiologist', 'Pharmacologist', 'Trombonist', 'Clarinetist|clarinettist', 'Humorist', 'Muralist', 'Tattooist|tattoo artist', 'Strategist', 'Gynecologist|gynaecologist', 'Urologist'],
    legendary: ['Lepidopterist', 'Apiarist', 'Aquarist', 'Prosthetist', 'Orthotist', 'Chiropodist', 'Copyist', 'Lexicologist', 'Speleologist', 'Dendrologist'],
    notes: {
      'Lepidopterist': 'Studies butterflies and moths.',
      'Apiarist': 'A beekeeper, from apis, the Latin word for bee.',
      'Ventriloquist': 'From Latin words meaning "belly speaker."',
      'Ichthyologist': 'Studies fish.',
      'Speleologist': 'Studies caves.'
    },
    reject: [
      ['tourist|motorist|finalist|optimist|pessimist', 'That word ends in -ist, but it is not usually a job title.'],
      ['dietitian|optician|physician|chiropractor|astronomer|plumber|electrician|teacher|doctor|nurse', 'A real job, but its title does not end in -ist.'],
      ['analyst', 'So close! Analyst ends in -yst, not -ist.']
    ]
  });

  P({
    id: 'playground', category: 'Everyday',
    prompt: 'Name a piece of playground equipment',
    common: ['Swing|swings|swing set', 'Slide', 'Seesaw|teeter totter|see saw', 'Monkey bars|horizontal ladder|overhead ladder', 'Sandbox|sandpit|sand pit|sand box', 'Jungle gym|climbing frame|climber|play structure|playset|play set'],
    uncommon: ['Merry-go-round|merry go round|roundabout|carousel', 'Tire swing|tyre swing', 'Zip line|zipline|flying fox|zip wire', 'Climbing wall|rock wall|rock climbing wall', 'Tunnel|crawl tube|crawl tunnel', 'Spring rider|spring horse|rocking horse', 'Balance beam', 'Fireman’s pole|fire pole|firemans pole|fireman pole', 'Trampoline', 'Tetherball', 'Spiral slide|twisty slide|corkscrew slide', 'Tube slide|tunnel slide', 'Rope ladder', 'Cargo net|climbing net'],
    rare: ['Pull-up bar|pull up bar|chin up bar|chinning bar', 'Parallel bars', 'Splash pad|spray park', 'Playhouse|cubby house|wendy house', 'Nest swing|saucer swing|web swing|spider web swing', 'Baby swing|bucket swing|toddler swing', 'Wobble bridge|chain bridge|rope bridge|swinging bridge|bridge', 'Rope swing', 'Spinner|spinning cup|spinning seat', 'Dome climber|geodesic dome|igloo climber', 'Rings|gymnastic rings|trapeze rings|ring trek', 'Log roll|rolling log', 'Stepping stones|stepping posts', 'Glider|glider swing', 'Ladder', 'Gaga pit|gaga ball pit', 'Obstacle course|ninja course', 'Track ride', 'Basketball hoop', 'Wave slide', 'Ball pit'],
    deep: ['Rope pyramid|spacenet|climbing pyramid', 'Talking tube|speaking tube|talk tube', 'Roller slide', 'Sand digger|sandbox digger|digger', 'Sensory panel|activity panel', 'Embankment slide|hill slide', 'Double slide|racing slide'],
    legendary: ['Witch’s hat|witches hat|witchs hat', 'Giant stride|maypole swing', 'Ocean wave'],
    notes: {
      'Zip line': 'In Australia it is called a flying fox.',
      'Seesaw': 'Also called a teeter-totter in parts of the U.S.',
      'Witch’s hat': 'A cone-shaped spinning climbing frame found on older playgrounds.',
      'Giant stride': 'A tall pole with hanging ropes; kids ran in a circle and swung out into the air.',
      'Ocean wave': 'An early-1900s ride whose platform swayed and spun around a central pole.'
    }
  });

  /* ------------------------------------------------------------ TRANSPORT */

  P({
    id: 'boats', category: 'Transport',
    prompt: 'Name a type of boat or ship',
    strip: ['boat', 'ship'],
    common: ['Sailboat|sailing boat|sail boat', 'Canoe', 'Kayak', 'Yacht', 'Rowboat|rowing boat|row boat', 'Ferry|ferryboat', 'Submarine|sub', 'Cruise ship|cruise liner', 'Speedboat|motorboat|powerboat|speed boat|motor boat', 'Raft', 'Tugboat|tug'],
    uncommon: ['Gondola', 'Catamaran', 'Houseboat', 'Barge', 'Dinghy', 'Pontoon boat|pontoon', 'Lifeboat', 'Fishing boat', 'Cargo ship|freighter', 'Container ship', 'Tanker|oil tanker|supertanker', 'Aircraft carrier|carrier', 'Battleship', 'Warship|war ship|naval ship', 'Pedal boat|pedalo|paddle boat|paddleboat', 'Steamboat|steamship|paddle steamer|riverboat|sternwheeler', 'Jet ski|personal watercraft|pwc|waverunner', 'Ocean liner|liner', 'Schooner', 'Hovercraft', 'Longship|viking ship', 'Galleon'],
    rare: ['Destroyer', 'Frigate', 'Cutter', 'Trawler', 'Clipper', 'Junk', 'Sampan', 'Dhow', 'Trireme', 'Icebreaker', 'Hydrofoil', 'Trimaran', 'Sloop', 'Ketch', 'Yawl', 'Brig', 'Brigantine', 'Corvette', 'Skiff', 'Punt', 'Coracle', 'Dugout|dugout canoe', 'Outrigger|outrigger canoe', 'Narrowboat|canal boat|narrow boat', 'Airboat', 'Fireboat', 'Water taxi', 'Dragon boat', 'Whaleboat|whaler', 'Galley', 'Caravel', 'Felucca', 'Umiak', 'Scow', 'Tender', 'Rowing shell|shell|racing shell', 'Minesweeper', 'Cruiser', 'Gunboat', 'Ironclad', 'U-boat|uboat', 'Dreadnought', 'Man-of-war|man o war|man of war', 'Carrack', 'Tall ship', 'Windjammer', 'Barque|bark', 'Inflatable boat|inflatable|rubber boat|rubber dinghy'],
    deep: ['Bireme', 'Cog', 'Barquentine', 'Pinnace', 'Shallop', 'Pirogue', 'Proa|prau', 'Bateau', 'Lugger', 'Drakkar', 'Knarr', 'Baidarka'],
    legendary: ['Quinquereme', 'Xebec', 'Fluyt', 'Galleass', 'Balinger', 'Lorcha'],
    notes: {
      'Trireme': 'An ancient warship with three rows of oars on each side.',
      'Coracle': 'A small round boat of woven wood covered in hide or canvas, still paddled in Wales.',
      'Hovercraft': 'Rides on a cushion of air, so it can cross water, mud, and ice.',
      'Quinquereme': 'Its name means "five-oared"; historians still debate how its rowers sat.',
      'Junk': 'A Chinese sailing ship whose stiffened sails fold up like window blinds.'
    },
    reject: [['pirate ship|pirate', 'Pirates sailed many kinds of ships. Try galleon, sloop, or brigantine!']]
  });

  P({
    id: 'aircraft', category: 'Transport',
    prompt: 'Name a type of aircraft',
    common: ['Airplane|aeroplane|plane', 'Helicopter|chopper|heli', 'Jet|jet plane', 'Hot air balloon|balloon', 'Glider|sailplane', 'Blimp', 'Drone|quadcopter|uav|unmanned aerial vehicle'],
    uncommon: ['Airship|zeppelin|dirigible', 'Biplane', 'Seaplane|floatplane|float plane', 'Fighter jet|fighter|fighter plane', 'Jumbo jet|jumbo', 'Airliner|passenger plane|jetliner|passenger jet', 'Hang glider', 'Paraglider', 'Cargo plane|transport plane|freighter', 'Private jet|business jet|bizjet', 'Bomber', 'Propeller plane|prop plane'],
    rare: ['Gyrocopter|autogyro|gyroplane|autogiro', 'Crop duster|ag plane|agricultural aircraft', 'Monoplane', 'Triplane', 'Ultralight|microlight', 'Tiltrotor|tilt rotor', 'Flying boat', 'Spy plane|reconnaissance aircraft', 'Stealth aircraft|stealth bomber|stealth fighter', 'Turboprop', 'Jump jet|harrier|vtol', 'Water bomber|firefighting aircraft|air tanker', 'Tanker aircraft|refueling aircraft|aerial refueling tanker', 'Air ambulance', 'Supersonic jet|supersonic', 'Powered paraglider|paramotor', 'Gas balloon', 'Amphibious aircraft|amphibian', 'Trainer|trainer aircraft', 'Attack helicopter|gunship', 'Light aircraft|small plane|light plane'],
    deep: ['Flying wing', 'Rocket plane|rocket powered aircraft', 'Motor glider', 'Air taxi|evtol', 'Tandem rotor helicopter|tandem rotor', 'Coaxial helicopter', 'Compound helicopter', 'Hybrid airship'],
    legendary: ['Ornithopter', 'Gyrodyne', 'Rozière balloon|roziere balloon|roziere', 'Lifting body', 'Tailsitter|tail sitter'],
    notes: {
      'Ornithopter': 'Flies by flapping its wings like a bird; Leonardo da Vinci sketched designs for one.',
      'Rozière balloon': 'Combines a hot-air chamber with a gas chamber; one made the first nonstop balloon flight around the world in 1999.',
      'Gyrocopter': 'Its rotor is not powered by the engine; air flowing past it keeps it spinning.',
      'Tiltrotor': 'Its rotors tilt up to take off like a helicopter, then forward to fly like a plane.'
    },
    reject: [
      ['rocket|space shuttle|satellite|spaceship|spacecraft', 'That flies in space. It is a spacecraft, not an aircraft.'],
      ['parachute', 'A parachute slows a fall, but it is not an aircraft.'],
      ['hovercraft', 'A hovercraft rides on a cushion of air just above land or water, so it is not an aircraft.']
    ]
  });

  P({
    id: 'car-parts', category: 'Transport',
    prompt: 'Name a part of a car',
    common: ['Engine|motor', 'Wheel|wheels', 'Tire|tyre|tires|tyres', 'Steering wheel', 'Brakes|brake', 'Seat|seats', 'Door|doors', 'Windshield|windscreen', 'Headlights|headlight|headlamps|headlamp|head lights', 'Trunk|boot', 'Hood|bonnet', 'Bumper', 'Mirror|rearview mirror|rear view mirror|side mirror|wing mirror', 'Seatbelt|seat belt|safety belt', 'Horn', 'Battery'],
    uncommon: ['Radiator', 'Transmission|gearbox', 'Exhaust pipe|exhaust|tailpipe|tail pipe', 'Muffler|silencer', 'Gas tank|fuel tank|petrol tank|tank', 'Spark plug|spark plugs', 'Taillights|tail lights|taillight|tail light|brake lights', 'Dashboard|dash', 'Speedometer', 'Odometer', 'Gas pedal|accelerator|accelerator pedal|throttle', 'Brake pedal', 'Clutch', 'Gear shift|gear stick|gearstick|shifter|gear lever|stick shift', 'Glove box|glove compartment', 'Windshield wipers|wipers|wiper|windscreen wipers', 'Airbag|air bag', 'License plate|number plate|licence plate|registration plate', 'Sunroof|moonroof', 'Axle', 'Fender|wing|mudguard', 'Grille|grill', 'Hubcap|hub cap|wheel cover', 'Rim|rims', 'Turn signal|indicator|blinker|indicators|blinkers', 'Roof', 'Window|windows', 'Spare tire|spare tyre|spare wheel|spare', 'Radio|stereo|car stereo', 'Pedals|pedal'],
    rare: ['Alternator', 'Carburetor|carburettor|carb', 'Piston|pistons', 'Crankshaft', 'Camshaft', 'Spoiler', 'Fuel injector|injector', 'Catalytic converter|catalytic', 'Shock absorbers|shocks|shock absorber|dampers', 'Struts|strut', 'Suspension', 'Chassis|frame', 'Differential|diff', 'Driveshaft|drive shaft|propeller shaft|prop shaft', 'Starter motor|starter', 'Serpentine belt|fan belt|drive belt', 'Timing belt|cambelt|timing chain', 'Brake pads|brake pad', 'Brake rotor|rotor|brake disc', 'Caliper|brake caliper', 'Oil filter', 'Air filter', 'Dipstick', 'Thermostat', 'Water pump', 'Fuel pump', 'Cylinder head', 'Head gasket', 'Turbocharger|turbo', 'Supercharger', 'Flywheel', 'Tachometer|rev counter', 'Headrest|head rest|head restraint', 'Armrest', 'Cup holder|cupholder', 'Steering column', 'Ignition', 'Fuel gauge|gas gauge', 'Defroster|demister', 'Air conditioning|ac|air conditioner', 'Mud flaps|mud flap|splash guard', 'Roof rack', 'Tow hitch|tow bar|trailer hitch', 'Gas cap|fuel cap|petrol cap', 'Lug nuts|wheel nuts', 'Sun visor|visor', 'Door handle', 'Floor mats|floor mat', 'Antenna|aerial', 'Backup camera|reverse camera|rear camera', 'GPS|navigation system|sat nav|satnav', 'Tailgate|liftgate|hatch', 'Heater', 'Wiring|wires|wire|wiring harness', 'Fuse box|fuses|fuse', 'Center console|centre console|console', 'Fog lights|fog light|fog lamps', 'Door lock|door locks|lock|locks', 'Speakers|speaker'],
    deep: ['Distributor', 'Engine block|block', 'Oil pan|sump', 'Intake manifold', 'Exhaust manifold|headers', 'Master cylinder', 'Tie rod|tie rods', 'Ball joint|ball joints', 'CV joint|cv joints|constant velocity joint', 'Control arm|wishbone', 'Leaf spring|leaf springs', 'Coil spring|coil springs|springs', 'Rack and pinion|steering rack', 'Valve|valves', 'Connecting rod|con rod', 'Running boards|running board', 'Hood ornament', 'Wheel well|wheel arch', 'Heater core', 'Cylinder|cylinders'],
    legendary: ['Gudgeon pin|wrist pin|piston pin', 'Pushrod', 'Bell housing|bellhousing', 'Torque converter', 'Rocker arm|rocker arms', 'Throttle body', 'Oxygen sensor|o2 sensor|lambda sensor', 'Sway bar|anti roll bar|stabilizer bar', 'Glow plug|glow plugs', 'Harmonic balancer'],
    notes: {
      'Dashboard': 'Originally a board on horse carriages that blocked mud "dashed" up by the horses’ hooves.',
      'Glove box': 'Named for when drivers kept their driving gloves in it.',
      'Catalytic converter': 'Began appearing on most new U.S. cars in 1975 to clean up exhaust gases.',
      'Carburetor': 'Mixed air and fuel in older engines; fuel injection has almost completely replaced it.',
      'Odometer': 'From the Greek words for "path" and "measure."'
    },
    reject: [
      ['gas|gasoline|petrol|fuel', 'Fuel is not a part, but the gas tank is!'],
      ['oil|motor oil|coolant|antifreeze', 'That is a fluid, not a part, but the oil filter is!'],
      ['key|keys|car key', 'You need it to drive, but it is not part of the car.']
    ]
  });

  P({
    id: 'bicycles', category: 'Transport',
    prompt: 'Name a type of bicycle',
    strip: ['bike', 'bicycle'],
    common: ['Mountain bike|mtb', 'Road bike|racing bike|racer|road racer|ten speed', 'BMX|trick bike|freestyle bmx', 'Tandem|bicycle built for two', 'Electric bike|e bike|ebike|electric bicycle|pedelec'],
    uncommon: ['Recumbent', 'Penny-farthing|penny farthing|high wheeler|ordinary', 'Cruiser|beach cruiser', 'Folding bike|folder', 'Fixie|fixed gear|fixed wheel', 'Hybrid', 'Balance bike|run bike|push bike', 'Cargo bike|bakfiets|box bike', 'Touring bike|tourer', 'Gravel bike', 'Track bike', 'Fat bike|fat tire|fatbike', 'Exercise bike|stationary bike|spin bike'],
    rare: ['Cyclocross|cx|cyclo cross', 'Time trial bike|tt|triathlon bike', 'Lowrider', 'Chopper', 'Dutch bike|omafiets|city bike|roadster', 'Tall bike', 'Boneshaker|velocipede', 'Single speed|singlespeed', 'Downhill bike|downhill', 'Dirt jumper|dirt jump', 'Trials bike', 'Hardtail|hard tail', 'Full suspension|full sus|dual suspension'],
    deep: ['Dandy horse|draisine|running machine|laufmaschine|hobby horse', 'Safety bicycle|safety', 'Longtail|long tail', 'Delivery bike|butcher bike|bakers bike'],
    legendary: ['Sociable', 'Swing bike', 'Bamboo bike'],
    notes: {
      'Penny-farthing': 'Named after two British coins, the big penny and the small farthing.',
      'Dandy horse': 'Invented by Karl Drais in 1817; it had no pedals, so riders pushed with their feet.',
      'Safety bicycle': 'An 1880s design with two same-size wheels and a chain, the shape of most bikes today.',
      'Sociable': 'Like a tandem, except the two riders sit side by side.',
      'Fixie': 'Has no freewheel, so the pedals turn whenever the wheel does.'
    },
    reject: [
      ['unicycle', 'A unicycle has just one wheel. A bicycle has two!'],
      ['tricycle|trike|big wheel', 'A tricycle has three wheels. A bicycle has two!'],
      ['motorcycle|motorbike|dirt|moped|scooter|quad', 'That has an engine or no pedals. Try a kind of pedal bike!']
    ]
  });

  P({
    id: 'rail-vehicles', category: 'Transport',
    prompt: 'Name a type of vehicle that runs on rails',
    common: ['Train', 'Subway|metro|underground|tube|subway train', 'Tram|streetcar|trolley|trolley car|tramcar', 'Roller coaster|rollercoaster|coaster', 'Monorail', 'Locomotive|engine|loco', 'Steam train|steam locomotive|steam engine'],
    uncommon: ['Bullet train|high speed train|shinkansen|high speed rail', 'Freight train|goods train|cargo train', 'Cable car', 'Light rail|lrt', 'Funicular|incline|inclined railway|cliff railway', 'Commuter train|commuter rail', 'Mine cart|minecart|mine car|ore cart', 'Handcar|hand car|pump trolley', 'Caboose|brake van|guards van', 'Boxcar|box car', 'Sleeper train|night train|sleeper', 'Passenger train', 'Diesel locomotive|diesel train|diesel', 'Electric train|electric locomotive', 'Model train|toy train|train set', 'Railroad car|train car|railway car|rail car'],
    rare: ['Dining car|restaurant car|buffet car', 'Tank car|tanker car', 'Flatcar|flat car', 'Hopper car|hopper', 'Gondola car', 'Observation car|dome car', 'Passenger car|coach|carriage|railcar', 'Rack railway|cog railway|cog train|rack train', 'Railbus|diesel multiple unit|dmu', 'People mover|automated people mover|airport train', 'Tram-train|tram train', 'Sleeping car', 'Mail car|mail train|post office car', 'Autorack|car carrier', 'Freight car|freight wagon|goods wagon', 'Elevated train|el train|elevated railway'],
    deep: ['Speeder|track inspection car|motorcar', 'Rotary snowplow|snowplow train|rotary snowplough', 'Railway crane|crane car|breakdown crane', 'Well car|double stack', 'Interurban', 'Rail bike|railbike|rail cycle'],
    legendary: ['Horsecar|horse tram|horse drawn tram', 'Draisine|railway draisine', 'Railway velocipede|rail velocipede', 'Ballast tamper|tamper'],
    notes: {
      'Funicular': 'In most funiculars, two cars on a steep slope are linked by a cable, so one goes up as the other comes down.',
      'Cable car': 'San Francisco’s cable cars grip a moving cable that runs in a slot under the street.',
      'Bullet train': 'Japan’s first bullet train line opened in 1964.',
      'Monorail': 'Germany’s Wuppertal Schwebebahn, a hanging monorail, has run since 1901.',
      'Ballast tamper': 'A track machine that packs the stones under the rails so the track stays level.'
    },
    reject: [
      ['maglev|maglev train', 'Maglev trains float above a guideway instead of rolling on rails!'],
      ['trolleybus|trolley bus', 'A trolleybus uses overhead wires but drives on rubber tires, not rails.'],
      ['bus|truck|tank', 'That drives on roads, not rails.'],
      ['car', 'A car drives on roads. (A railroad car, like a boxcar, does count!)'],
      ['chairlift|chair lift|ski lift|gondola lift|aerial tramway|gondola', 'That hangs from a cable instead of running on rails. (A railroad gondola car counts, though!)']
    ]
  });

})(window.UT = window.UT || {});
