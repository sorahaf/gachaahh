// gacha-database.js
// โครงสร้าง: แต่ละ key คือตู้ย่อย 1 ตู้
// cabinetType บอก engine ที่ใช้สุ่ม → gacha-core.js จะดึงไปใช้เอง

const GACHA_DATABASE = {

  // ══════════════════════════════════════════
  // ตู้ใหญ่ — engine: "big"
  // กฎ: pity 10/25 (ชุด) หรือ 10/30 (บ้าน), รีเบทเฉพาะตู้ใหญ่
  // ══════════════════════════════════════════

  "big_golden_mirage_female": {
    cabinetType: "big",
    group: "big",
    name: "Golden Mirage — ชุดหญิง (Seer)",
    label: "👗 ชุดหญิง",
    theme: "✨ Golden Mirage",
    rareRate: 0.05,
    guarantee1: 10,
    guarantee2: 25,
    costPerPull: 6,         // ตั๋ว/ครั้ง
    heartMultiplier: 10,    // 1 ตั๋ว = 10 หัวใจ
    items: {
      rare: [
        { name: "Flowing Shadow Winged Cape",      tag: "🌈", c: 0.004545 },
        { name: "Seer Feathered Pibo Clothes",     tag: "🌈", c: 0.004545 },
        { name: "Blossom Rattle",                  tag: "🌈", c: 0.004545 },
        { name: "Sacred Hime Cut Twin Braids",     tag: "🌈", c: 0.004545 },
        { name: "Bountiful Chain Shoes",           tag: "🌈", c: 0.004545 },
        { name: "Seer Tassel Veil",                tag: "🥇", c: 0.004545 },
        { name: "Seer Feather Drape Pants",        tag: "🥇", c: 0.004545 },
        { name: "Seer Feather Crown",              tag: "🥇", c: 0.004545 },
        { name: "Seer Misty Veil Bandana",         tag: "🥇", c: 0.004545 },
        { name: "Prophecy",                        tag: "🥇", c: 0.004545 },
        { name: "Gold Sand Flower Vine Watering Can", tag: "🥇", c: 0.004545 }
      ],
      common: [
        { name: "Blessing Feather Earrings",       c: 0.079167 },
        { name: "Crossbody Knotted Twig",          c: 0.079167 },
        { name: "Gold Sand Twig Face Chain",       c: 0.079167 },
        { name: "Seer Crescent Saber",             c: 0.079167 },
        { name: "Gold Sand Twig & Bead Bracelet",  c: 0.079167 },
        { name: "Seer's Attendant",                c: 0.079167 },
        { name: "Serpent Choker",                  c: 0.079167 },
        { name: "Gold Sand Flower Long Gloves",    c: 0.079167 },
        { name: "Gold Sand Tassel Leg Chain",      c: 0.079167 },
        { name: "Blazing Phoenix Eyes",            c: 0.079167 },
        { name: "Soft Straight Eyebrows",          c: 0.079167 },
        { name: "Sandscale",                       c: 0.079167 }
      ]
    }
  },

  "big_golden_mirage_male": {
    cabinetType: "big",
    group: "big",
    name: "Golden Mirage — ชุดชาย (Traveler)",
    label: "👔 ชุดชาย",
    theme: "✨ Golden Mirage",
    rareRate: 0.05,
    guarantee1: 10,
    guarantee2: 25,
    costPerPull: 6,
    heartMultiplier: 10,
    items: {
      rare: [
        { name: "Gold Sand Drift Traveler Hat",        tag: "🌈", c: 0.004545 },
        { name: "Gold Sand Travel Cape",               tag: "🌈", c: 0.004545 },
        { name: "Wilderness Flow Medium-Length Hair",  tag: "🌈", c: 0.004545 },
        { name: "Echoing Bow",                         tag: "🌈", c: 0.004545 },
        { name: "Bird Call Lyre",                      tag: "🌈", c: 0.004545 },
        { name: "Traveler Slant Hem Shorts",           tag: "🥇", c: 0.004545 },
        { name: "Screaming Mandrake",                  tag: "🥇", c: 0.004545 },
        { name: "Traveler's Detector",                 tag: "🥇", c: 0.004545 },
        { name: "Traveler Expedition Backpack",        tag: "🥇", c: 0.004545 },
        { name: "Traveler Buckle Leather Boots",       tag: "🥇", c: 0.004545 },
        { name: "Obscurity",                           tag: "🥇", c: 0.004545 }
      ],
      common: [
        { name: "Traveler Strapped Arm Warmers",   c: 0.079167 },
        { name: "Crossbody Leather Watering Can",  c: 0.079167 },
        { name: "Gold Sand Oracle Mask",           c: 0.079167 },
        { name: "Traveler Echo Socks",             c: 0.079167 },
        { name: "Ink-and-Notes Waist Bag",         c: 0.079167 },
        { name: "Leaf Vein Mask",                  c: 0.079167 },
        { name: "Gold Sand Noble Attire",          c: 0.079167 },
        { name: "Traveler's Diary",                c: 0.079167 },
        { name: "Traveler Strap Long Gloves",      c: 0.079167 },
        { name: "Twig Horns",                      c: 0.079167 },
        { name: "Piercing Phoenix Eyes",           c: 0.079167 },
        { name: "Resolute Eyebrow Slit",           c: 0.079167 }
      ]
    }
  },

  "big_golden_mirage_house": {
    cabinetType: "big",
    group: "big",
    name: "Golden Mirage — บ้าน (Oasis)",
    label: "🏠 บ้าน",
    theme: "✨ Golden Mirage",
    rareRate: 0.043,
    guarantee1: 10,
    guarantee2: 30,
    costPerPull: 6,
    heartMultiplier: 10,
    items: {
      rare: [
        { name: "Gold Sand Draped Lounge Couch",       tag: "🌈", c: 0.002867 },
        { name: "Gold Sand Lattice Alcove Couch",      tag: "🌈", c: 0.002867 },
        { name: "Gold Sand Silk Canopy Spice Boat",    tag: "🌈", c: 0.002867 },
        { name: "Gold Sand Brocade Loom",              tag: "🌈", c: 0.002867 },
        { name: "Oasis Lattice Square Pool",           tag: "🌈", c: 0.002867 },
        { name: "Oasis Arched Flower Walkway",         tag: "🌈", c: 0.002867 },
        { name: "Oasis Lattice Quartered Pool",        tag: "🌈", c: 0.002867 },
        { name: "Gold Sand Tower Archway",             tag: "🌈", c: 0.002867 },
        { name: "Gold Sand Canopy Pendant Lamp",       tag: "🥇", c: 0.002867 },
        { name: "Oasis Coffee Tent",                   tag: "🥇", c: 0.002867 },
        { name: "Gold Sand Instrument Stall",          tag: "🥇", c: 0.002867 },
        { name: "Gold Sand Large Fountain",            tag: "🥇", c: 0.002867 },
        { name: "Desert Fan Palm",                     tag: "🥇", c: 0.002867 },
        { name: "Gold Sand Argyle Dome",               tag: "🥇", c: 0.002867 },
        { name: "Gold Sand Draped Bay Window",         tag: "🥇", c: 0.002867 },
        { name: "Gold Sand Silk Screen Wall",          tag: "🥇", c: 0.002867 }
      ],
      common: [
        { name: "Hexagonal Medallion Rug",             c: 0.031667 },
        { name: "Silk Colored Light Stand",            c: 0.031667 },
        { name: "Gold Sand Floor Cushion Set",         c: 0.031667 },
        { name: "Gold Sand Plant Pendant Lamp",        c: 0.031667 },
        { name: "Tassel Knotted Hammock",              c: 0.031667 },
        { name: "Mosaic Glass Floor Lamp",             c: 0.031667 },
        { name: "Pointed Draped Vanity Mirror",        c: 0.031667 },
        { name: "Gold Sand Octagonal Table",           c: 0.031667 },
        { name: "Gold Sand Woven Hanging Decor",       c: 0.031667 },
        { name: "Oasis Terracotta Pot",                c: 0.031667 },
        { name: "Gold Sand Camel Statue",              c: 0.031667 },
        { name: "Gold Sand Floor Cushion",             c: 0.031667 },
        { name: "Terracotta String Lights",            c: 0.031667 },
        { name: "Gold Sand Teapot Set",                c: 0.031667 },
        { name: "Oasis Quartered Balcony",             c: 0.031667 },
        { name: "Brocade Canopy",                      c: 0.031667 },
        { name: "Oasis Lattice Pointed Window",        c: 0.031667 },
        { name: "Oasis Pointed Double Door",           c: 0.031667 },
        { name: "Oasis Lattice Hinged Door",           c: 0.031667 },
        { name: "Oasis Patterned Pointed Archway",     c: 0.031667 },
        { name: "Paper Flower",                        c: 0.031667 },
        { name: "Gold Sand Double-Pendant Wall Lamp",  c: 0.031667 },
        { name: "Gold Sand Short Handrail",            c: 0.031667 },
        { name: "Gold Sand Short Stairs",              c: 0.031667 },
        { name: "Gold Sand Patterned Flooring",        c: 0.031667 },
        { name: "Gold Sand Argyle Wallpaper",          c: 0.031667 },
        { name: "Gold Sand Wall",                      c: 0.031667 },
        { name: "Gold Sand Octagram Fence",            c: 0.031667 },
        { name: "Gold Sand Argyle Wall",               c: 0.031667 },
        { name: "Cactus",                              c: 0.031667 }
      ]
    }
  },

  "big_lustrous_parade_female": {
    cabinetType: "big",
    group: "big",
    name: "Lustrous Parade — ชุดหญิง (Floral Note)",
    label: "💐 Floral Note",
    theme: "🎪 Lustrous Parade",
    rareRate: 0.05,
    guarantee1: 10,
    guarantee2: 25,
    costPerPull: 6,
    heartMultiplier: 10,
    items: {
      rare: [
        { name: "Cheerful Twin Bow Braids",        tag: "🌈", c: 0.004545 },
        { name: "Lustrous Merry-Go-Round Staff",   tag: "🌈", c: 0.004545 },
        { name: "Lustrous Ribbon Babydoll Top",    tag: "🌈", c: 0.004545 },
        { name: "Lustrous Jingle Bubble Skirt",    tag: "🌈", c: 0.004545 },
        { name: "Parade Balloon Back Decor",       tag: "🌈", c: 0.004545 },
        { name: "Lustrous Ribbon Waist Decor",     tag: "🥇", c: 0.004545 },
        { name: "Lustrous Star Leg Warmers",       tag: "🥇", c: 0.004545 },
        { name: "Lustrous Bow Sneakers",           tag: "🥇", c: 0.004545 },
        { name: "Unicorn Trapper Hat",             tag: "🥇", c: 0.004545 },
        { name: "Glistening Downturned Eyes",      tag: "🥇", c: 0.004545 },
        { name: "Star Sparkle",                    tag: "🥇", c: 0.004545 }
      ],
      common: [
        { name: "Lustrous Horn Headwear",          c: 0.079167 },
        { name: "Lustrous Handheld Console",       c: 0.079167 },
        { name: "Lustrous Ribbon Satin Gloves",    c: 0.079167 },
        { name: "Rainbow Cloud Bag",               c: 0.079167 },
        { name: "Rainbow Star Hair Clip",          c: 0.079167 },
        { name: "Stardazzle",                      c: 0.079167 },
        { name: "Lustrous Ribbon Earrings",        c: 0.079167 },
        { name: "Lustrous Bow Ankle Socks",        c: 0.079167 },
        { name: "Lustrous Meteor Crossbody Bag",   c: 0.079167 },
        { name: "Star-Shaped Eyebrows",            c: 0.079167 },
        { name: "Rainbow Balloon Tail Decor",      c: 0.079167 },
        { name: "Rainbow Star Choker",             c: 0.079167 }
      ]
    }
  },

  "big_lustrous_parade_male": {
    cabinetType: "big",
    group: "big",
    name: "Lustrous Parade — ชุดชาย (Feather String)",
    label: "🎸 Feather String",
    theme: "🎪 Lustrous Parade",
    rareRate: 0.05,
    guarantee1: 10,
    guarantee2: 25,
    costPerPull: 6,
    heartMultiplier: 10,
    items: {
      rare: [
        { name: "Asym Short Hair (Personalized)",  tag: "🌈", c: 0.004545 },
        { name: "Rainbow Melody Bubble Gun",       tag: "🌈", c: 0.004545 },
        { name: "Lustrous Featherwoven Shirt",     tag: "🌈", c: 0.004545 },
        { name: "Lustrous Dazzling Pants",         tag: "🌈", c: 0.004545 },
        { name: "Lustrous Feathered Wings",        tag: "🌈", c: 0.004545 },
        { name: "Lustrous Starry Tail",            tag: "🥇", c: 0.004545 },
        { name: "Lustrous Winged Shoes",           tag: "🥇", c: 0.004545 },
        { name: "Unicorn Circlet",                 tag: "🥇", c: 0.004545 },
        { name: "Lying Unicorn Beret",             tag: "🥇", c: 0.004545 },
        { name: "Gleaming Downturned Eyes",        tag: "🥇", c: 0.004545 },
        { name: "Wispy Cloud",                     tag: "🥇", c: 0.004545 }
      ],
      common: [
        { name: "Star-Chain Sunglasses",           c: 0.079167 },
        { name: "Lustrous Star Ankle Socks",       c: 0.079167 },
        { name: "Lustrous Bow Satin Gloves",       c: 0.079167 },
        { name: "Unicorn Heart Backpack",          c: 0.079167 },
        { name: "Rainbow Marshmallow",             c: 0.079167 },
        { name: "Starshine",                       c: 0.079167 },
        { name: "Lustrous Star Ear Studs",         c: 0.079167 },
        { name: "Lustrous Dazzling Mic",           c: 0.079167 },
        { name: "Lustrous Unicorn Waist Bag",      c: 0.079167 },
        { name: "Heart-Shaped Eyebrows",           c: 0.079167 },
        { name: "Rainbow Unicorn Costume",         c: 0.079167 },
        { name: "Rainbow Star Ribbon Hat",         c: 0.079167 }
      ]
    }
  },

  "big_lustrous_parade_house": {
    cabinetType: "big",
    group: "big",
    name: "Lustrous Story — บ้าน (Paradise)",
    label: "🏰 Paradise",
    theme: "🎪 Lustrous Parade",
    rareRate: 0.043,
    guarantee1: 10,
    guarantee2: 30,
    costPerPull: 6,
    heartMultiplier: 10,
    items: {
      rare: [
        { name: "Lustrous Merry-Go-Round",             tag: "🌈", c: 0.002867 },
        { name: "Lustrous Balloon Shooting Counter",   tag: "🌈", c: 0.002867 },
        { name: "Lustrous Duck Tossing Stand",         tag: "🌈", c: 0.002867 },
        { name: "Lustrous Star Stage",                 tag: "🌈", c: 0.002867 },
        { name: "Starry Square Pool",                  tag: "🌈", c: 0.002867 },
        { name: "Starry Quartered Pool",               tag: "🌈", c: 0.002867 },
        { name: "Lustrous Clocktower Roof",            tag: "🌈", c: 0.002867 },
        { name: "Huge Unicorn Balloon",                tag: "🥇", c: 0.002867 },
        { name: "Lustrous Marshmallow Cart",           tag: "🥇", c: 0.002867 },
        { name: "Lustrous Theater Clock",              tag: "🥇", c: 0.002867 },
        { name: "Lustrous Carousel Horse",             tag: "🥇", c: 0.002867 },
        { name: "Utopian Castle Archway",              tag: "🥇", c: 0.002867 },
        { name: "Marshmallow Tree",                    tag: "🥇", c: 0.002867 },
        { name: "Lustrous Long Left-Curved Stairs",    tag: "🥇", c: 0.002867 },
        { name: "Lustrous Long Right-Curved Stairs",   tag: "🥇", c: 0.002867 }
      ],
      common: [
        { name: "Lustrous Moonlit Pavilion",           c: 0.031900 },
        { name: "Lustrous Plushie Showcase",           c: 0.031900 },
        { name: "Wonderland Photo Frame",              c: 0.031900 },
        { name: "Lustrous Rocking Horse",              c: 0.031900 },
        { name: "Lustrous Lotto Ball Machine",         c: 0.031900 },
        { name: "Lustrous Counter",                    c: 0.031900 },
        { name: "Luminous Street Light",               c: 0.031900 },
        { name: "Octagram Unicorn Rug",                c: 0.031900 },
        { name: "Utopian Balloon Bouquet",             c: 0.031900 },
        { name: "Lustrous Open Hours Sign",            c: 0.031900 },
        { name: "Lustrous 2-Seat Rocking Chair",       c: 0.031900 },
        { name: "Lustrous Outdoor Garbage Bin",        c: 0.031900 },
        { name: "Unicorn Plushie",                     c: 0.031900 },
        { name: "Utopian Pennant Banner",              c: 0.031900 },
        { name: "Lustrous Quartered Balcony",          c: 0.031900 },
        { name: "Lustrous Quartered Flower Bed",       c: 0.031900 },
        { name: "Lustrous Short Left-Curved Stairs",   c: 0.031900 },
        { name: "Lustrous Short Right-Curved Stairs",  c: 0.031900 },
        { name: "Lustrous Wonderland Wall",            c: 0.031900 },
        { name: "Rainbow Unicorn Pillar",              c: 0.031900 },
        { name: "Rainbow Unicorn Archway",             c: 0.031900 },
        { name: "Lustrous Carved Window",              c: 0.031900 },
        { name: "Lustrous Carved Double Door",         c: 0.031900 },
        { name: "Lustrous Gilded Pillar",              c: 0.031900 },
        { name: "Lustrous Thin Spiral Pillar",         c: 0.031900 },
        { name: "Lustrous Gilded Fence",               c: 0.031900 },
        { name: "Lustrous Long Handrail",              c: 0.031900 },
        { name: "Lustrous Short Handrail",             c: 0.031900 },
        { name: "Lustrous Short Stairs",               c: 0.031900 },
        { name: "Lustrous Long Stairs",                c: 0.031900 }
      ]
    }
  },

  // ══════════════════════════════════════════
  // ตู้ตัวเล็ก (Graffiti) — engine: "ticket_step"
  // กฎ: ราคาตั๋วเพิ่มแต่ละครั้ง, ครบ 10 ล้างตู้
  // Special = เหมาตู้ทันที
  // เรท avg: Special 10.6%, Rare 57.9%, Normal 31.5%
  // ══════════════════════════════════════════

  "small_graffiti_unconventional": {
    cabinetType: "ticket_step",
    group: "small",
    name: "Graffiti Channel — Unconventional",
    label: "👗 Unconventional",
    theme: "🎨 Graffiti Channel",
    costMap: [3, 9, 15, 21, 27, 33, 39, 45, 45, 45],
    heartMultiplier: 10,
    items: [
      { name: "Graffiti Buckle Jumpsuit",             isSpecial: true  },
      { name: "Graffiti Wing Drawstring Bag",         isRare: true     },
      { name: "Graffiti Woven Bandana Cap",           isRare: true     },
      { name: "Graffiti Braids w/ Colored Ropes",     isRare: true     },
      { name: "Unconventional Headphones",            isRare: true     },
      { name: "Graffiti Spray Can",                   isRare: true     },
      { name: "Unconventional Outdoor Running Shoes", isRare: true     },
      { name: "Graffiti Chain Eye Protector",         isRare: false    },
      { name: "Graffiti Protective Gloves",           isRare: false    },
      { name: "Graffiti Striped Asym Socks",          isRare: false    }
    ],
    drawWeights: [
      [0.00111, 0.017075,0.085375,0.085375,0.085375,0.085375,0.085375,0.12332, 0.12332, 0.308299],
      [0.00111, 0.018521,0.085086,0.085086,0.085086,0.085086,0.085086,0.160022,0.160022,0.234895],
      [0.00111, 0.020327,0.084725,0.084725,0.084725,0.084725,0.084725,0.192646,0.192646,0.169646],
      [0.001347,0.026351,0.102503,0.102503,0.102503,0.102503,0.102503,0.17286, 0.17286, 0.114064],
      [0.001664,0.036581,0.125769,0.125769,0.125769,0.125769,0.125769,0.130368,0.130368,0.072176],
      [0.001945,0.055099,0.144564,0.144564,0.144564,0.144564,0.144564,0.088301,0.088301,0.043535],
      [0.062611,0.080852,0.144244,0.144244,0.144244,0.144244,0.144244,0.054555,0.054555,0.026207],
      [0.123795,0.126839,0.132224,0.132224,0.132224,0.132224,0.132224,0.035686,0.035686,0.016876],
      [0.182722,0.485685,0.052215,0.052215,0.052215,0.052215,0.052215,0.030782,0.030782,0.008955],
      [1.0,     0.0,     0.0,     0.0,     0.0,     0.0,     0.0,     0.0,     0.0,     0.0     ]
    ]
  },

  "small_graffiti_uninhibited": {
    cabinetType: "ticket_step",
    group: "small",
    name: "Graffiti Channel — Uninhibited",
    label: "👔 Uninhibited",
    theme: "🎨 Graffiti Channel",
    costMap: [3, 9, 15, 21, 27, 33, 39, 45, 45, 45],
    heartMultiplier: 10,
    items: [
      { name: "Graffiti Drawstring Jacket",       isSpecial: true  },
      { name: "Graffiti Demon Cargo Pants",       isRare: true     },
      { name: "Graffiti Demon Headband",          isRare: true     },
      { name: "Uninhibited Spiky Short Hair",     isRare: true     },
      { name: "Graffiti Crossbody Tool Bag",      isRare: true     },
      { name: "Uninhibited Buckle Sports Shoes",  isRare: true     },
      { name: "Graffiti Spray Can Waist Bag",     isRare: true     },
      { name: "Demon Spray Toy",                  isRare: false    },
      { name: "Demon Square Glasses",             isRare: false    },
      { name: "Star Patch & Eyebrow Piercing",    isRare: false    }
    ],
    drawWeights: [
      [0.00111, 0.017075,0.085375,0.085375,0.085375,0.085375,0.085375,0.12332, 0.12332, 0.308299],
      [0.00111, 0.018521,0.085086,0.085086,0.085086,0.085086,0.085086,0.160022,0.160022,0.234895],
      [0.00111, 0.020327,0.084725,0.084725,0.084725,0.084725,0.084725,0.192646,0.192646,0.169646],
      [0.001347,0.026351,0.102503,0.102503,0.102503,0.102503,0.102503,0.17286, 0.17286, 0.114064],
      [0.001664,0.036581,0.125769,0.125769,0.125769,0.125769,0.125769,0.130368,0.130368,0.072176],
      [0.001945,0.055099,0.144564,0.144564,0.144564,0.144564,0.144564,0.088301,0.088301,0.043535],
      [0.062611,0.080852,0.144244,0.144244,0.144244,0.144244,0.144244,0.054555,0.054555,0.026207],
      [0.123795,0.126839,0.132224,0.132224,0.132224,0.132224,0.132224,0.035686,0.035686,0.016876],
      [0.182722,0.485685,0.052215,0.052215,0.052215,0.052215,0.052215,0.030782,0.030782,0.008955],
      [1.0,     0.0,     0.0,     0.0,     0.0,     0.0,     0.0,     0.0,     0.0,     0.0     ]
    ]
  },

  // ══════════════════════════════════════════
  // ตู้คอลแลป (Butter Bear) — engine: "ticket_step"
  // กฎ: ราคาตั๋วต่างจากตู้ตัวเล็ก, ครบ 10 ล้างตู้
  // เรท avg: Special 10.6%, Rare 57.9%, Normal 31.5%
  // ══════════════════════════════════════════

  "collab_butter_bear_chef": {
    cabinetType: "ticket_step",
    group: "collab",
    name: "Butter Bear — เชฟขนม",
    label: "🧁 เชฟขนม",
    theme: "🐻 Butter Bear",
    costMap: [3, 6, 12, 18, 28, 38, 48, 58, 58, 58],
    heartMultiplier: 10,
    items: [
      { name: "รถเข็นอาหารน้องเนย",          isSpecial: true  },
      { name: "ผมหางม้าคู่แบบเกลียวสุดเก๋",  isRare: true     },
      { name: "เสื้อตุ๊กตาหมีน้อย",           isRare: true     },
      { name: "กระโปรงลูกไม้หมีน้อย",         isRare: true     },
      { name: "รองเท้าแตะน้องเนย",            isRare: true     },
      { name: "หมวกไหมพรมน้องเนย",            isRare: true     },
      { name: "ถุงหิ้วขนมปังเนย",              isRare: true     },
      { name: "กระจกมือถือน้องเนย",            isRare: false    },
      { name: "ถาดคุกกี้",                    isRare: false    },
      { name: "ชุดทำขนมหวาน",                 isRare: false    }
    ],
    drawWeights: [
      [0.00111, 0.02018, 0.02018, 0.100898,0.100898,0.100898,0.100898,0.12332, 0.308299,0.12332 ],
      [0.00111, 0.022189,0.022189,0.099893,0.099893,0.099893,0.099893,0.160022,0.234895,0.160022],
      [0.00111, 0.024819,0.024819,0.098578,0.098578,0.098578,0.098578,0.192646,0.169646,0.192646],
      [0.001347,0.032874,0.032874,0.11828, 0.11828, 0.11828, 0.11828, 0.17286, 0.114064,0.17286 ],
      [0.001663,0.048378,0.048378,0.142147,0.142147,0.142147,0.142147,0.130399,0.072193,0.130399],
      [0.001944,0.07385, 0.07385, 0.157511,0.157511,0.157511,0.157511,0.088371,0.043569,0.088371],
      [0.062595,0.109329,0.109329,0.145802,0.145802,0.145802,0.145802,0.054644,0.026249,0.054644],
      [0.123519,0.226472,0.226472,0.083142,0.083142,0.083142,0.083142,0.036798,0.017373,0.036798],
      [0.182514,0.324466,0.324466,0.023102,0.023102,0.023102,0.023102,0.033239,0.009669,0.033239],
      [1.0,     0.0,     0.0,     0.0,     0.0,     0.0,     0.0,     0.0,     0.0,     0.0     ]
    ]
  },

  "collab_butter_bear_street": {
    cabinetType: "ticket_step",
    group: "collab",
    name: "Butter Bear — ตะลุยชิม",
    label: "🛒 ตะลุยชิม",
    theme: "🐻 Butter Bear",
    costMap: [3, 6, 12, 18, 28, 38, 48, 58, 58, 58],
    heartMultiplier: 10,
    items: [
      { name: "รถเข็นช็อปปิ้งน้องเนย",          isSpecial: true  },
      { name: "ผมสั้นคุกกี้เกลียว",              isRare: true     },
      { name: "เสื้อเชิ้ตคุกกี้หมีน้อย",          isRare: true     },
      { name: "กางเกงสตรีทแฟชั่นหมีน้อย",        isRare: true     },
      { name: "รองเท้าหนังคุกกี้หัวใจ",           isRare: true     },
      { name: "หมวกนิวส์บอยคุกกี้หมีน้อย",        isRare: true     },
      { name: "กระเป๋าธุรกิจน้องเนย",             isRare: true     },
      { name: "กล้องฟิล์มสตรีทแฟชั่น",            isRare: false    },
      { name: "ถาดน้องเนย",                       isRare: false    },
      { name: "กระเป๋าโทสต์เนย",                  isRare: false    }
    ],
    drawWeights: [
      [0.00111, 0.02018, 0.02018, 0.100898,0.100898,0.100898,0.100898,0.12332, 0.308299,0.12332 ],
      [0.00111, 0.022189,0.022189,0.099893,0.099893,0.099893,0.099893,0.160022,0.234895,0.160022],
      [0.00111, 0.024819,0.024819,0.098578,0.098578,0.098578,0.098578,0.192646,0.169646,0.192646],
      [0.001347,0.032874,0.032874,0.11828, 0.11828, 0.11828, 0.11828, 0.17286, 0.114064,0.17286 ],
      [0.001663,0.048378,0.048378,0.142147,0.142147,0.142147,0.142147,0.130399,0.072193,0.130399],
      [0.001944,0.07385, 0.07385, 0.157511,0.157511,0.157511,0.157511,0.088371,0.043569,0.088371],
      [0.062595,0.109329,0.109329,0.145802,0.145802,0.145802,0.145802,0.054644,0.026249,0.054644],
      [0.123519,0.226472,0.226472,0.083142,0.083142,0.083142,0.083142,0.036798,0.017373,0.036798],
      [0.182514,0.324466,0.324466,0.023102,0.023102,0.023102,0.023102,0.033239,0.009669,0.033239],
      [1.0,     0.0,     0.0,     0.0,     0.0,     0.0,     0.0,     0.0,     0.0,     0.0     ]
    ]
  },

  // ══════════════════════════════════════════
  // ตู้หัวใจเล็ก (Raindrop) — engine: "heart_step"
  // กฎ: ใช้หัวใจโดยตรง, ครบ 12 ล้างตู้
  // Special = เหมาตู้ทันที
  // เรท avg: Special 8.9%, Premium 58.0%, Normal 33.1%
  // ══════════════════════════════════════════

  "heart_raindrop_limpid": {
    cabinetType: "heart_step",
    group: "heart",
    name: "Raindrop Song — Limpid",
    label: "🪼 Limpid",
    theme: "🌧️ Raindrop Song",
    costMap: [30, 60, 90, 120, 150, 190, 230, 270, 310, 350, 390, 430],
    heartMultiplier: 1,
    items: [
      { name: "Light Jellyfish Dress",               isSpecial: true  },
      { name: "Light Jellyfish Rain Hat",            isRare: true     },
      { name: "Playful Spiral Curls",                isRare: true     },
      { name: "Teardrop Bellflower Umbrella",        isRare: true     },
      { name: "Jellyfish Sun Hat w/ Bow",            isRare: true     },
      { name: "Light Jellyfish Backpack",            isRare: true     },
      { name: "Light Jellyfish Gloves",              isRare: true     },
      { name: "Fish Raindrop Rain Boots",            isRare: true     },
      { name: "Cyperus Jellyfish Headwear",          isRare: false    },
      { name: "Little Raindrop",                     isRare: false    },
      { name: "Light Jellyfish Earrings",            isRare: false    },
      { name: "Rainbow Cloud Motif",                 isRare: false    }
    ],
    drawWeights: [
      [0.00111, 0.012064,0.060319,0.060319,0.060319,0.120639,0.120639,0.120639,0.08879, 0.08879, 0.08879, 0.17758 ],
      [0.00111, 0.013399,0.063652,0.063652,0.063652,0.116861,0.116861,0.116861,0.095367,0.095367,0.095367,0.157849],
      [0.00111, 0.015112,0.067643,0.067643,0.067643,0.112299,0.112299,0.112299,0.101944,0.101944,0.101944,0.138118],
      [0.00111, 0.017415,0.072538,0.072538,0.072538,0.106636,0.106636,0.106636,0.108521,0.108521,0.108521,0.118387],
      [0.001144,0.021092,0.080379,0.080379,0.080379,0.103332,0.103332,0.103332,0.109324,0.109324,0.109324,0.098656],
      [0.001221,0.027544,0.09221, 0.09221, 0.09221, 0.102152,0.102152,0.102152,0.102817,0.102817,0.102817,0.079697],
      [0.020799,0.045336,0.103648,0.103648,0.103648,0.097895,0.097895,0.097895,0.089269,0.089269,0.089269,0.061431],
      [0.043406,0.074076,0.113685,0.113685,0.113685,0.08865, 0.08865, 0.08865, 0.075348,0.075348,0.075348,0.049468],
      [0.070248,0.106974,0.121984,0.121984,0.121984,0.07168, 0.07168, 0.07168, 0.066179,0.066179,0.066179,0.043249],
      [0.102297,0.147208,0.127335,0.127335,0.127335,0.045682,0.045682,0.045682,0.06484, 0.06484, 0.06484, 0.036924],
      [0.139814,0.429007,0.052763,0.052763,0.052763,0.01144, 0.01144, 0.01144, 0.071571,0.071571,0.071571,0.023857],
      [1.0,     0.0,     0.0,     0.0,     0.0,     0.0,     0.0,     0.0,     0.0,     0.0,     0.0,     0.0     ]
    ]
  },

  "heart_raindrop_drift": {
    cabinetType: "heart_step",
    group: "heart",
    name: "Raindrop Song — Drift",
    label: "🐟 Drift",
    theme: "🌧️ Raindrop Song",
    costMap: [30, 60, 90, 120, 150, 190, 230, 270, 310, 350, 390, 430],
    heartMultiplier: 1,
    items: [
      { name: "Drift Manta Ray Cape Outfit",         isSpecial: true  },
      { name: "Manta Ray Rain Hat",                  isRare: true     },
      { name: "Flowing Seaweed Curls",               isRare: true     },
      { name: "Teardrop Leaf Umbrella",              isRare: true     },
      { name: "Raindrop Rainforest Backpack",        isRare: true     },
      { name: "Dragonfly Lotus Hat",                 isRare: true     },
      { name: "Rainforest Creature Crossbody Bag",   isRare: true     },
      { name: "Drift Rain Boots",                    isRare: true     },
      { name: "Dragonfly Bracelet",                  isRare: false    },
      { name: "Leaves Headwear",                     isRare: false    },
      { name: "Cumulonimbus Glasses",                isRare: false    },
      { name: "Raindrop Rainforest Asym Socks",      isRare: false    }
    ],
    drawWeights: [
      [0.00111, 0.012064,0.060319,0.060319,0.060319,0.120639,0.120639,0.120639,0.08879, 0.08879, 0.08879, 0.17758 ],
      [0.00111, 0.013399,0.063652,0.063652,0.063652,0.116861,0.116861,0.116861,0.095367,0.095367,0.095367,0.157849],
      [0.00111, 0.015112,0.067643,0.067643,0.067643,0.112299,0.112299,0.112299,0.101944,0.101944,0.101944,0.138118],
      [0.00111, 0.017415,0.072538,0.072538,0.072538,0.106636,0.106636,0.106636,0.108521,0.108521,0.108521,0.118387],
      [0.001144,0.021092,0.080379,0.080379,0.080379,0.103332,0.103332,0.103332,0.109324,0.109324,0.109324,0.098656],
      [0.001221,0.027544,0.09221, 0.09221, 0.09221, 0.102152,0.102152,0.102152,0.102817,0.102817,0.102817,0.079697],
      [0.020799,0.045336,0.103648,0.103648,0.103648,0.097895,0.097895,0.097895,0.089269,0.089269,0.089269,0.061431],
      [0.043406,0.074076,0.113685,0.113685,0.113685,0.08865, 0.08865, 0.08865, 0.075348,0.075348,0.075348,0.049468],
      [0.070248,0.106974,0.121984,0.121984,0.121984,0.07168, 0.07168, 0.07168, 0.066179,0.066179,0.066179,0.043249],
      [0.102297,0.147208,0.127335,0.127335,0.127335,0.045682,0.045682,0.045682,0.06484, 0.06484, 0.06484, 0.036924],
      [0.139814,0.429007,0.052763,0.052763,0.052763,0.01144, 0.01144, 0.01144, 0.071571,0.071571,0.071571,0.023857],
      [1.0,     0.0,     0.0,     0.0,     0.0,     0.0,     0.0,     0.0,     0.0,     0.0,     0.0,     0.0     ]
    ]
  }

};

// ══════════════════════════════════════════
// THEME_META — ใส่ URL รูปที่นี่
// bannerUrl : รูปแบนเนอร์การ์ดบน index และหัว simulator
// bgUrl     : รูปพื้นหลังทั้งเว็บ (ใส่ได้ต่อ theme หรือจะใช้ตัวเดียวกันก็ได้)
//
// วิธีหา URL:
//   GitHub  → อัปไฟล์ใน repo แล้วใช้  https://raw.githubusercontent.com/<user>/<repo>/main/images/<file>
//   Imgur   → คลิกขวารูป "Copy image address"
//   อื่นๆ   → URL ตรงไปที่ไฟล์ภาพ (.jpg/.png/.webp)
// ══════════════════════════════════════════
const THEME_META = {
  "✨ Golden Mirage": {
    bannerUrl: "https://raw.github.com/sorahaf/gachaahh/blob/main/images/Golden%20Mirage.jpg",   // ← วาง URL รูปแบนเนอร์ที่นี่
    bgUrl:     ""    // ← วาง URL รูปพื้นหลังที่นี่ (ถ้าไม่ต้องการใส่ว่างไว้)
  },
  "🎪 Lustrous Parade": {
    bannerUrl: "https://raw.github.com/sorahaf/gachaahh/blob/main/images/Lustrous%20Parade.jpg",
    bgUrl:     ""
  },
  "🎨 Graffiti Channel": {
    bannerUrl: "https://raw.github.com/sorahaf/gachaahh/blob/main/images/Graffiti%20Channel.jpg",
    bgUrl:     ""
  },
  "🐻 Butter Bear": {
    bannerUrl: "https://raw.github.com/sorahaf/gachaahh/blob/main/images/Butter%20Bear.jpg",
    bgUrl:     ""
  },
  "🌧️ Raindrop Song": {
    bannerUrl: "https://raw.github.com/sorahaf/gachaahh/blob/main/images/Raindrop%20Song.jpg",
    bgUrl:     ""
  }
};

// ── helpers ──
function getGroupedCabinets() {
  const groups = {};
  for (const [id, cfg] of Object.entries(GACHA_DATABASE)) {
    if (!groups[cfg.group]) groups[cfg.group] = [];
    groups[cfg.group].push({ id, ...cfg });
  }
  return groups;
}

function getThemeBanner(themeKey) {
  return THEME_META[themeKey]?.bannerUrl || "";
}

function getThemeBg(themeKey) {
  return THEME_META[themeKey]?.bgUrl || "";
}
