// Authentic specialty coffee community reviews
export const REVIEWS = [
  {
    id: 1,
    reviewer: "Clara Lindqvist",
    location: "Oslo, Norway",
    brewMethod: "Fellow Ode Gen 2 + V60 02",
    coffeePurchased: "Guji Uraga Natural",
    rating: 5,
    date: "3 days ago",
    quote: "The bergamot aroma upon cracking the bag is sensational. At 92°C with a 1:16.5 ratio, the peach sweetness dominates without any alcoholic fermentation funk that plagues poorly processed naturals. Truly Nordic-grade clean roast."
  },
  {
    id: 2,
    reviewer: "Marcus Vance",
    location: "Portland, OR",
    brewMethod: "La Marzocco Linea Micra",
    coffeePurchased: "Kalo Hearth Blend",
    rating: 5,
    date: "1 week ago",
    quote: "Dialed in at 18.5g in, 39g out in 27 seconds. Unbelievably unctuous crema with actual dark chocolate praline finish—not charred ash like most so-called espresso roasts. Pairs effortlessly with steamed oat milk."
  },
  {
    id: 3,
    reviewer: "Dr. Alistair Finch",
    location: "Edinburgh, UK",
    brewMethod: "Kalita Wave 185",
    coffeePurchased: "Huila Pink Bourbon",
    rating: 5,
    date: "2 weeks ago",
    quote: "Pink Bourbon is notoriously fickle if roasted too dark or underdeveloped, but this lot hits the sweet spot. Juicy Meyer lemon upfront that melts into brown sugar sweetness as it drops to 50°C."
  },
  {
    id: 4,
    reviewer: "Elena Rostov",
    location: "Melbourne, Australia",
    brewMethod: "AeroPress (Inverted, 2:30 steep)",
    coffeePurchased: "Nyeri Hill Peaberry",
    rating: 5,
    date: "2 weeks ago",
    quote: "Razor-sharp phosphoric acidity that Kenyan coffees are prized for. The blackcurrant cordial note is unmistakable. No dry astringency on the tail—just lingering ruby citrus sweetness."
  },
  {
    id: 5,
    reviewer: "Julian Sato",
    location: "Kyoto, Japan",
    brewMethod: "Kono Meimon Ceramic Dripper",
    coffeePurchased: "Tarrazú La Pastora Honey",
    rating: 5,
    date: "3 weeks ago",
    quote: "Remarkable clarity for a honey process. Notes of baked red apple and sweet marzipan make this the most comforting morning companion. Ordering the 1kg bag next cycle."
  },
  {
    id: 6,
    reviewer: "Sophie Dubois",
    location: "Montréal, QC",
    brewMethod: "Chemex 6-Cup + Fellow Kettle",
    coffeePurchased: "Dusk Mountain Decaf",
    rating: 5,
    date: "1 month ago",
    quote: "Finally a decaf that respects the palate. The mountain water process preserved all the body and fig richness. Brewed after 8pm without sacrificing sleep or sensory joy."
  }
];

export const ORIGINS_TERROIR = [
  {
    id: "ethiopia",
    country: "Ethiopia",
    region: "Uraga & Yirgacheffe, Oromia",
    elevation: "2,000 – 2,350 m.a.s.l.",
    soil: "Deep volcanic loam, shaded indigenous canopy",
    harvestSeason: "November to February",
    profileTitle: "Ethereal Florals & Stone Fruit",
    flavorNotes: ["Jasmine", "Bergamot", "Peach Nectar", "Wild Honey"],
    climate: "Cool sub-tropical highland with dense morning mists and slow maturation.",
    story: "Ethiopia is the biological birthplace of Arabica. Our partner smallholder plots in Uraga benefit from extreme altitudes where cool nights extend cherry maturation, concentrating complex organic sucrose and delicate floral terpenes.",
    activeLots: ["Guji Uraga Natural", "Yirgacheffe Gedeb Washed (Coming soon)"],
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "colombia",
    country: "Colombia",
    region: "San Agustín, Southern Huila",
    elevation: "1,750 – 1,950 m.a.s.l.",
    soil: "Mineral-rich Andean volcanic ash",
    harvestSeason: "Main: Oct–Jan / Mitaca: April–June",
    profileTitle: "Vibrant Tropicals & Cane Sugar Density",
    flavorNotes: ["Pink Guava", "Meyer Lemon", "Wild Strawberry", "Panela"],
    climate: "Canyon breeze and high daily thermal swing yielding exceptional glucose levels.",
    story: "We work directly with Jhoan Vergara at Finca Monteverde. Their experimental anaerobic chambers allow calibrated 48-hour thermal shock fermentations that bring rare Pink Bourbon varietals into vivid sensory focus.",
    activeLots: ["Huila Pink Bourbon Anaerobic", "Kalo Hearth Espresso Blend"],
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "kenya",
    country: "Kenya",
    region: "Nyeri County, Mount Kenya Slopes",
    elevation: "1,900 – 2,100 m.a.s.l.",
    soil: "Iron-rich red volcanic clay",
    harvestSeason: "November to January",
    profileTitle: "Phosphoric Spark & Blackcurrant Cordial",
    flavorNotes: ["Blackcurrant", "Blood Orange", "Red Plum", "Cacao"],
    climate: "Snowmelt fed crystalline streams and high equatorial ultraviolet intensity.",
    story: "Kenyan processing is legendary for its 72-hour double fermentation and fresh soak in mountain spring water. The result is unparalleled phosphoric brightness and dense blackberry cordial depth found nowhere else on earth.",
    activeLots: ["Nyeri Hill Peaberry Microlot"],
    image: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "costa-rica",
    country: "Costa Rica",
    region: "Tarrazú Valley, Central Highlands",
    elevation: "1,600 – 1,750 m.a.s.l.",
    soil: "Sedimentary alluvial soils on steep Pacific slopes",
    harvestSeason: "December to March",
    profileTitle: "Honey Process & Sweet Baked Pastry",
    flavorNotes: ["Baked Apple", "Marzipan", "Panela Sugar", "Hazelnut"],
    climate: "Pronounced dry summer season creating ideal micro-climates for raised bed honey drying.",
    story: "Our partner micro-mill retains 80% of cherry mucilage during slow shade-bed drying. The bean absorbs ambient sugars, yielding a cup reminiscent of warm pastry, toasted hazelnuts, and caramelized honey.",
    activeLots: ["Tarrazú La Pastora Red Honey"],
    image: "https://images.unsplash.com/photo-1518832553480-cd0e625ed3e6?auto=format&fit=crop&w=800&q=80"
  }
];

export const BREW_RECIPES = [
  {
    id: "v60",
    name: "Hario V60 02 Conical",
    ratio: "1:16",
    ratioMultiplier: 16,
    defaultDose: 15,
    minDose: 12,
    maxDose: 30,
    grindSize: "Medium-Fine (600–700 microns)",
    waterTemp: "93°C / 200°F (95°C for light naturals)",
    targetTime: "2:45 – 3:15 min",
    filterType: "Tabbed bleached paper, rinsed thoroughly",
    sensoryGoal: "High aromatic clarity, distinct floral and stone fruit separation",
    steps: [
      { time: "0:00 – 0:45", action: "Bloom Pour", amount: "45g", note: "Pour 3x coffee weight in gentle spiral, swirl gently to saturate all grounds." },
      { time: "0:45 – 1:15", action: "First Pour", amount: "100g (Total 145g)", note: "Pour concentric circles at steady 5g/sec, avoiding paper rim." },
      { time: "1:15 – 1:45", action: "Second Pour", amount: "95g (Total 240g)", note: "Maintain slurry level, gentle central pour to agitate without channeling." },
      { time: "1:45 – 2:45", action: "Drawdown", amount: "Complete", note: "One gentle swirl, allow uniform flat coffee bed as water draws down." }
    ]
  },
  {
    id: "aeropress",
    name: "AeroPress (Inverted Method)",
    ratio: "1:14",
    ratioMultiplier: 14,
    defaultDose: 16,
    minDose: 12,
    maxDose: 22,
    grindSize: "Medium (500–600 microns)",
    waterTemp: "88°C – 90°C / 192°F",
    targetTime: "2:15 min total",
    filterType: "Single paper disc or reusable metal mesh",
    sensoryGoal: "Intense round sweetness, velvet mouthfeel, concentrated aromatics",
    steps: [
      { time: "0:00 – 0:15", action: "Initial Fill", amount: "80g water", note: "Invert chamber, add grounds, pour quick water and stir briskly 5 times." },
      { time: "0:15 – 0:45", action: "Top Up", amount: "144g (Total 224g)", note: "Fill to top, stir once to immerse foam crust." },
      { time: "0:45 – 1:45", action: "Immersion Steep", amount: "Cap on", note: "Screw filter cap on, gently push out trapped air, wait until 1:45." },
      { time: "1:45 – 2:15", action: "Invert & Press", amount: "Gentle press", note: "Invert onto warmed server. Smooth steady downward plunge over 30s. Stop at hiss." }
    ]
  },
  {
    id: "chemex",
    name: "Chemex 6-Cup",
    ratio: "1:15",
    ratioMultiplier: 15,
    defaultDose: 30,
    minDose: 20,
    maxDose: 50,
    grindSize: "Medium-Coarse (800–900 microns)",
    waterTemp: "94°C / 202°F",
    targetTime: "3:45 – 4:30 min",
    filterType: "Bonded triple-fold Chemex paper filter",
    sensoryGoal: "Ultra-clean tea-like body, highlights delicate floral & fruit top notes",
    steps: [
      { time: "0:00 – 0:45", action: "Heavy Bloom", amount: "90g water", note: "Evenly wet the larger bed, allow gas to exhaust through the thick paper." },
      { time: "0:45 – 1:45", action: "Main Body Pour", amount: "200g (Total 290g)", note: "Gentle steady circles around center of bed." },
      { time: "1:45 – 2:45", action: "Finishing Pour", amount: "160g (Total 450g)", note: "Slow continuous pour to target weight." },
      { time: "2:45 – 4:00", action: "Drawdown", amount: "Filter removal", note: "Lift filter with grounds once dripping slows to single drops." }
    ]
  },
  {
    id: "espresso",
    name: "Modern Espresso (9-Bar Extraction)",
    ratio: "1:2.1",
    ratioMultiplier: 2.1,
    defaultDose: 18,
    minDose: 16,
    maxDose: 22,
    grindSize: "Fine espresso (200–280 microns)",
    waterTemp: "93.5°C / 200°F",
    targetTime: "27 – 30 seconds",
    filterType: "Precision 18g basket (e.g. VST / IMS)",
    sensoryGoal: "Dense viscous crema, rich cacao sweetness, crisp citric lift",
    steps: [
      { time: "Preparation", action: "Puck Prep", amount: "18.0g dosed", note: "Use WDT needle tool to de-clump, level evenly, tamp with level 25lb pressure." },
      { time: "0:00 – 0:06", action: "Pre-infusion", amount: "Slow saturation", note: "Low-pressure pump ramp, first drops bead on bottom of naked portafilter." },
      { time: "0:07 – 0:28", action: "Full 9-Bar Flow", amount: "38g liquid yield", note: "Golden tiger-stripe stream flows into preheated demitasse." },
      { time: "Finish", action: "Stir & Serve", amount: "Uniform cup", note: "Stir with small spoon to integrate stratified crema layers before sipping." }
    ]
  },
  {
    id: "french-press",
    name: "Classic French Press Immersion",
    ratio: "1:15",
    ratioMultiplier: 15,
    defaultDose: 30,
    minDose: 20,
    maxDose: 50,
    grindSize: "Coarse gravel (900–1100 microns)",
    waterTemp: "95°C / 203°F",
    targetTime: "6:00 min total (Hoffmann method)",
    filterType: "Stainless steel mesh plunger",
    sensoryGoal: "Full heavy body, rich chocolate undertones, comforting finish",
    steps: [
      { time: "0:00 – 0:30", action: "Add Water & Wet", amount: "450g water", note: "Pour total water aggressively over dry grounds to saturate everything." },
      { time: "0:30 – 4:00", action: "Crust Formation", amount: "Rest uncovered", note: "Do not touch or stir. Allow natural crust to form and steep." },
      { time: "4:00 – 4:30", action: "Break & Scoop", amount: "Two spoons", note: "Stir top crust 3 times so grounds sink. Scoop off remaining white foam and floating chaff." },
      { time: "4:30 – 6:00", action: "Settle & Decant", amount: "Plunge to surface", note: "Place plunger just at the water surface (do not plunge down). Pour gently into carafe." }
    ]
  }
];
