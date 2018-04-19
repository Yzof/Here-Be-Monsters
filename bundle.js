/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const { Map } = __webpack_require__(2);

// const { workbook } = require('./data/data.js');

let HBMap = new Map;
HBMap.render();

// function loadData() {
//   var url="https://docs.google.com/spreadsheets/d/e/2PACX-1vSZAkr1mDh-DWEIP6kSrERE3Bj4BnGCzCLBVyGJfl_4g0JBWWYSa-YDYGDw9nijqGMFE8JvMkghghPA/pubhtml?gid=1031805306&single=true?key=AIzaSyC3H_vpeG4Vcp2VEx-UjqAIW96US0Ddono";
//   let xmlhttp = new XMLHttpRequest();
//   console.log("base load");
//   xmlhttp.open("GET",url,true);
//   console.log(xmlhttp, "open xmlhttp");
//   xmlhttp.onreadystatechange = function() {
//     // console.log(xmlhttp.withCredentials);
//     // if (xmlhttp.readyState === 4) {
//     //   console.log(xmlhttp.status, "ready 4");
//     // }
//     console.log(xmlhttp.readyState, "ready state");
//     console.log(xmlhttp.status, "status");
//     if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
//       console.log(xmlhttp.responseText);
//       console.log("hello");
//     }
//   };
//   xmlhttp.send();
// }
//
// window.onload = loadData;

function start() {
  // Initializes the client with the API key and the Translate API.
  gapi.client.init({
    'apiKey': 'AIzaSyC3H_vpeG4Vcp2VEx-UjqAIW96US0Ddono',
    'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  }).then(function() {
    // Executes an API request, and returns a Promise.
    let resp = gapi.client.request({
      "path": "https://docs.google.com/spreadsheets/d/e/2PACX-1vSZAkr1mDh-DWEIP6kSrERE3Bj4BnGCzCLBVyGJfl_4g0JBWWYSa-YDYGDw9nijqGMFE8JvMkghghPA/pubhtml?gid=1031805306&single=true"
    });
    return resp;
  }).then(function(response) {
    //Do stuff with response
    console.log("response:", response.result);
  }, function(reason) {
    console.log('Error: ' + reason.result.error.message);
  });
}

// Loads the JavaScript client library and invokes `start` afterwards.
gapi.load('client', start);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
const { columns } = __webpack_require__(3);
const { Hex } = __webpack_require__(4);

class Map {
  constructor(){
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext('2d');
    this.startX = 300;
    this.startY = 100;
    this.columns = columns;
    this.hexs = {};
    this.keys = [];
    this.clickHandler = this.clickHandler.bind(this);

    this.populate();
  }

  populate() {
    for (var i = 0; i < this.columns.length; i++) {
      let column = this.columns[i];

      for (var j = 0; j < column.length; j++) {
        let hex = new Hex(column[j], this.ctx, [this.startX, this.startY]);
        let pos = hex.posX + "," + hex.posY;
        this.hexs[pos] = hex;
      }
    }
  }

  clickHandler(e) {
    e.preventDefault();
    if (e) {
      //Finds the x,y of mouse
      let mouseX = e.offsetX;
      let mouseY = e.offsetY;
      let target = null;
      let smallest = null;
      for (var i = 0; i < this.keys.length; i++) {
        // extracts the x and y of all the hexs
        let points = this.keys[i].split(",");
        let hexX = parseInt(points[0]);
        let hexY = parseInt(points[1]);

        //Math
        let a = mouseX - hexX;
        let b = mouseY - hexY;
        let c = Math.sqrt( a*a + b*b );

        //Finds smallest line
        if ((smallest === null || c < smallest) && c < 65) {
          smallest = c;
          target = points.join(",");
        }
      }

      //If hex exists render it's details
      let hex = this.hexs[target];
      if (hex) {
        hex.details();
      }
    }
  }

  render(){
    this.ctx.fillStyle = '#7ea6e0';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.addEventListener("click", this.clickHandler);

    this.keys = Object.keys(this.hexs);
    for (var i = 0; i < this.keys.length; i++) {
      let hex = this.hexs[this.keys[i]];
      hex.render();
    }
  }

}
/* harmony export (immutable) */ __webpack_exports__["Map"] = Map;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "columns", function() { return columns; });
/*
Different render locations
downshift col:[0, 130, 260, 390, 520]
let biomes = ["mountain", "desert", "forest", "volcano", "ocean"];
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
    biome: "forest"
  },
  "desert": {
    color: "#fff2cc",
    biome: "desert"
  },
  "mountain": {
    color: "#a18160",
    biome: "mountain"
  },
  "volcano": {
    color: "#ff3333",
    biome: "volcano"
  }
};

let columns = [
  [ //col 0
    {
      color: BIOMES.desert.color,
      biome: "desert",
      parity: "even",
      column: 0,
      row: 130
    },
    {
      color: BIOMES.desert.color,
      biome: "desert",
      parity: "even",
      column: 0,
      row: 260
    },
  ],
  [ //col 1
    {
      color: BIOMES.forest.color,
      biome: "forest",
      parity: "odd",
      column: 1,
      row: 130
    },
    {
      color: BIOMES.forest.color,
      biome: "forest",
      parity: "odd",
      column: 1,
      row: 260
    },
    {
      color: BIOMES.desert.color,
      biome: "desert",
      parity: "odd",
      column: 1,
      row: 390
    },
  ],
  [ //col 2
    {
      color: BIOMES.desert.color,
      biome: "desert",
      parity: "even",
      column: 2,
      row: 130
    },
    {
      color: BIOMES.forest.color,
      biome: "forest",
      parity: "even",
      column: 2,
      row: 260
    },
    {
      color: BIOMES.forest.color,
      biome: "forest",
      parity: "even",
      column: 2,
      row: 390
    },
    {
      color: BIOMES.desert.color,
      biome: "desert",
      parity: "even",
      column: 2,
      row: 520
    }
  ],
  [ //col 3
    {
      color: BIOMES.forest.color,
      biome: "forest",
      parity: "odd",
      column: 3,
      row: 130
    },
    {
      color: BIOMES.mountain.color,
      biome: "mountain",
      parity: "odd",
      column: 3,
      row: 260
    },
    {
      color: BIOMES.forest.color,
      biome: "forest",
      parity: "odd",
      column: 3,
      row: 390
    },
  ],
  [ //col 4
    {
      color: BIOMES.forest.color,
      biome: "forest",
      parity: "even",
      column: 4,
      row: 260
    },
    {
      color: BIOMES.mountain.color,
      biome: "mountain",
      parity: "even",
      column: 4,
      row: 390
    },
    {
      color: BIOMES.forest.color,
      biome: "forest",
      parity: "even",
      column: 4,
      row: 520
    },
  ],
  [ //col 5
    {
      color: BIOMES.desert.color,
      biome: "desert",
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
      biome: "forest",
      parity: "odd",
      column: 5,
      row: 260
    },
    {
      color: BIOMES.mountain.color,
      biome: "mountain",
      parity: "odd",
      column: 5,
      row: 390
    },
    {
      color: BIOMES.forest.color,
      biome: "forest",
      parity: "odd",
      column: 5,
      row: 520
    },
  ],
  [ //col 6
    {
      color: BIOMES.desert.color,
      biome: "desert",
      parity: "even",
      column: 6,
      row: 0
    },
    {
      color: BIOMES.forest.color,
      biome: "forest",
      parity: "even",
      column: 6,
      row: 130
    },
    {
      color: BIOMES.forest.color,
      biome: "forest",
      parity: "even",
      column: 6,
      row: 260
    },
    {
      color: BIOMES.mountain.color,
      biome: "mountain",
      parity: "even",
      column: 6,
      row: 390
    },
    {
      color: BIOMES.forest.color,
      biome: "forest",
      parity: "even",
      column: 6,
      row: 520
    },
  ],
  [ //col 7
    {
      color: BIOMES.mountain.color,
      biome: "mountain",
      parity: "odd",
      column: 7,
      row: 0
    },
    {
      color: BIOMES.mountain.color,
      biome: "mountain",
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
      biome: "forest",
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
      biome: "mountain",
      parity: "even",
      column: 8,
      row: 0
    },
    {
      color: BIOMES.volcano.color,
      biome: "volcano",
      parity: "even",
      column: 8,
      row: 130
    },
    {
      color: BIOMES.mountain.color,
      biome: "mountain",
      parity: "even",
      column: 8,
      row: 260
    },
    {
      color: BIOMES.desert.color,
      biome: "desert",
      parity: "even",
      column: 8,
      row: 390
    },
    {
      color: BIOMES.desert.color,
      biome: "desert",
      parity: "even",
      column: 8,
      row: 520
    },
  ],
  [ //col 9
    {
      color: BIOMES.mountain.color,
      biome: "mountain",
      parity: "odd",
      column: 9,
      row: 0
    },
    {
      color: BIOMES.mountain.color,
      biome: "mountain",
      parity: "odd",
      column: 9,
      row: 130
    },
    {
      color: BIOMES.desert.color,
      biome: "desert",
      parity: "odd",
      column: 9,
      row: 260
    },
  ],
];




/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/*
info is an object containing:
{
  color: hex code
  biome: string
  parity: string(odd or even)
  column: number
  row: vertical offset
}
*/

class Hex {
  constructor(info, canvas, startArr) {
    this.color = info.color;
    this.biome = info.biome;
    this.size = 75;
    this.side = 0;
    this.canvas = canvas;

    //these become the center
    this.posX = 0;
    this.posY = 0;

    //we want to set a fixed x and y coord, do the math up here.
    this.position(info, startArr);
  }

  position(info, startArr) {
    this.posX = startArr[0] + (112.5 * info.column);
    if (info.parity === "odd") {
      //we want the 65 offset
      this.posY = startArr[1] + 65 + info.row;
    } else {
      this.posY = startArr[1] + info.row;
    }
  }

  details() {
    //Reveals monsters living here
    console.log(this.color, this.biome, [this.posX, this.posY]);
  }

  render() {
    this.canvas.beginPath();
    this.canvas.moveTo(
      this.posX + this.size * Math.cos(0),
      this.posY + this.size * Math.sin(0)
    );

    for (this.side; this.side < 7; this.side++) {
      this.canvas.lineTo(
        this.posX + this.size * Math.cos(this.side * 2 * Math.PI / 6),
        this.posY + this.size * Math.sin(this.side * 2 * Math.PI / 6)
      );
      if (this.biome === "ocean" && (this.side === 3)) {
        this.canvas.stroke();
      }
    }
    this.canvas.strokeStyle="#000";
    this.canvas.fillStyle = this.color;
    if (this.biome != "ocean") {
      this.canvas.stroke();
    }
    this.canvas.fill();
  }
}
/* harmony export (immutable) */ __webpack_exports__["Hex"] = Hex;



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map