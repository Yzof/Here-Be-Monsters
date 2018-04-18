const Hex = require('./canvas_visuals/hexs/hex.js');
const { Map } = require('./canvas_visuals/canvas.js');
let HBMap = new Map;
HBMap.render();

//array creator
// while (hexArr.length != 10) {
//   let innerArr = [];
//   let biome = biomes[(selector % 4)];
//   while (innerArr.length != 5) {
//     let hex = new Hex(BIOMES[biome], ctx);
//     innerArr.push(hex);
//   }
//   selector ++;
//   hexArr.push(innerArr);
// }

//itterative render
// for (var i = 0; i < hexArr.length; i++) {
//   let xOffset = 112.5 * i;
//   let yOffset = 0;
//   if (i % 2 != 0) {
//     yOffset = 65;
//   }
//   let innerArr = hexArr[i];
//   for (var j = 0; j < innerArr.length; j++) {
//
//     innerArr[j].render(x + xOffset, y + yOffset + downshift);
//   }
// }
