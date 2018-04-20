/*
Different render locations
downshift col:[0, 130, 260, 390, 520]
let biomes = ["Mountain", "Desert", "Forest", "Volcano", "ocean"];
info is an object containing:
{
  color: hex code
  biome: string
  parity: string(odd or even)
  column: number
  row: vertical offset
}
*/
const BIOMES = {
  "ocean": {
    color: '#7ea6e0',
    biome: "ocean"
  },
  "forest": {
    color: "#97d077",
    biome: "Forest"
  },
  "desert": {
    color: "#fff2cc",
    biome: "Desert"
  },
  "mountain": {
    color: "#a18160",
    biome: "Mountain"
  },
  "volcano": {
    color: "#ff3333",
    biome: "Volcano"
  }
};

let columns = [
  [ //col 0
    {
      color: BIOMES.desert.color,
      biome: "Desert",
      parity: "even",
      column: 0,
      row: 130
    },
    {
      color: BIOMES.desert.color,
      biome: "Desert",
      parity: "even",
      column: 0,
      row: 260
    },
  ],
  [ //col 1
    {
      color: BIOMES.forest.color,
      biome: "Forest",
      parity: "odd",
      column: 1,
      row: 130
    },
    {
      color: BIOMES.forest.color,
      biome: "Forest",
      parity: "odd",
      column: 1,
      row: 260
    },
    {
      color: BIOMES.desert.color,
      biome: "Desert",
      parity: "odd",
      column: 1,
      row: 390
    },
  ],
  [ //col 2
    {
      color: BIOMES.desert.color,
      biome: "Desert",
      parity: "even",
      column: 2,
      row: 130
    },
    {
      color: BIOMES.forest.color,
      biome: "Forest",
      parity: "even",
      column: 2,
      row: 260
    },
    {
      color: BIOMES.forest.color,
      biome: "Forest",
      parity: "even",
      column: 2,
      row: 390
    },
    {
      color: BIOMES.desert.color,
      biome: "Desert",
      parity: "even",
      column: 2,
      row: 520
    }
  ],
  [ //col 3
    {
      color: BIOMES.forest.color,
      biome: "Forest",
      parity: "odd",
      column: 3,
      row: 130
    },
    {
      color: BIOMES.mountain.color,
      biome: "Mountain",
      parity: "odd",
      column: 3,
      row: 260
    },
    {
      color: BIOMES.forest.color,
      biome: "Forest",
      parity: "odd",
      column: 3,
      row: 390
    },
  ],
  [ //col 4
    {
      color: BIOMES.forest.color,
      biome: "Forest",
      parity: "even",
      column: 4,
      row: 260
    },
    {
      color: BIOMES.mountain.color,
      biome: "Mountain",
      parity: "even",
      column: 4,
      row: 390
    },
    {
      color: BIOMES.forest.color,
      biome: "Forest",
      parity: "even",
      column: 4,
      row: 520
    },
  ],
  [ //col 5
    {
      color: BIOMES.desert.color,
      biome: "Desert",
      parity: "odd",
      column: 5,
      row: 0
    },
    {
      color: BIOMES.ocean.color, //ocean
      biome: "ocean",
      parity: "odd",
      column: 5,
      row: 130
    },
    {
      color: BIOMES.forest.color,
      biome: "Forest",
      parity: "odd",
      column: 5,
      row: 260
    },
    {
      color: BIOMES.mountain.color,
      biome: "Mountain",
      parity: "odd",
      column: 5,
      row: 390
    },
    {
      color: BIOMES.forest.color,
      biome: "Forest",
      parity: "odd",
      column: 5,
      row: 520
    },
  ],
  [ //col 6
    {
      color: BIOMES.desert.color,
      biome: "Desert",
      parity: "even",
      column: 6,
      row: 0
    },
    {
      color: BIOMES.forest.color,
      biome: "Forest",
      parity: "even",
      column: 6,
      row: 130
    },
    {
      color: BIOMES.forest.color,
      biome: "Forest",
      parity: "even",
      column: 6,
      row: 260
    },
    {
      color: BIOMES.mountain.color,
      biome: "Mountain",
      parity: "even",
      column: 6,
      row: 390
    },
    {
      color: BIOMES.forest.color,
      biome: "Forest",
      parity: "even",
      column: 6,
      row: 520
    },
  ],
  [ //col 7
    {
      color: BIOMES.mountain.color,
      biome: "Mountain",
      parity: "odd",
      column: 7,
      row: 0
    },
    {
      color: BIOMES.mountain.color,
      biome: "Mountain",
      parity: "odd",
      column: 7,
      row: 130
    },
    {
      color: BIOMES.ocean.color, //ocean
      biome: "ocean",
      parity: "odd",
      column: 7,
      row: 260
    },
    {
      color: BIOMES.forest.color,
      biome: "Forest",
      parity: "odd",
      column: 7,
      row: 390
    },
    {
      color: BIOMES.forest.color,
      biome: "forest",
      parity: "odd",
      column: 7,
      row: 520
    },
  ],
  [ //col 8
    {
      color: BIOMES.mountain.color,
      biome: "Mountain",
      parity: "even",
      column: 8,
      row: 0
    },
    {
      color: BIOMES.volcano.color,
      biome: "Volcano",
      parity: "even",
      column: 8,
      row: 130
    },
    {
      color: BIOMES.mountain.color,
      biome: "Mountain",
      parity: "even",
      column: 8,
      row: 260
    },
    {
      color: BIOMES.desert.color,
      biome: "Desert",
      parity: "even",
      column: 8,
      row: 390
    },
    {
      color: BIOMES.desert.color,
      biome: "Desert",
      parity: "even",
      column: 8,
      row: 520
    },
  ],
  [ //col 9
    {
      color: BIOMES.mountain.color,
      biome: "Mountain",
      parity: "odd",
      column: 9,
      row: 0
    },
    {
      color: BIOMES.mountain.color,
      biome: "Mountain",
      parity: "odd",
      column: 9,
      row: 130
    },
    {
      color: BIOMES.desert.color,
      biome: "Desert",
      parity: "odd",
      column: 9,
      row: 260
    },
  ],
];

export { columns };
