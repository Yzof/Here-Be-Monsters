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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const { Map } = __webpack_require__(1);
const { Monster } = __webpack_require__(5);

let HBMap = new Map;


function start() {
  // Initializes the client with the API key and the Translate API.
  gapi.client.init({
    'apiKey': 'AIzaSyC3H_vpeG4Vcp2VEx-UjqAIW96US0Ddono',
    'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  }).then(function() {
    gapi.client.sheets.spreadsheets.values.batchGet({
      spreadsheetId: '10i952_UlOAfVAIBbAVskHEIXqR3miTTdRbQE6xElqzg',
      ranges: [
        //Forest
        'A2:N2', //Awakened Shrub
        'A170:N170', //Gnoll
        'A47:N47', //Kobold
        'A126:N126', //Sprite
        'A169:N169', //Giant Wasp
        'A193:N193', //Satyr
        //Desert
        'A173:N173', //Hobgoblin
        'A161:N161', //Dust Mephit
        'A175:N175', //Jackalwere
        'A197:N197', //Swarm of Insects
        'A275:N275', //Thri-Kreen
        'A599:N599', //Greater Basilisk
        //Mountain
        'A185:N185', //Orc
        'A139:N139', //Winged Kobold
        'A358:N358', //Ogre
        'A248:N248', //Harpy
        'A442:N442', //HellHound
        'A494:N494', //Ash Drake
        //Volcano
        'A959:N959', //Red Dragon
      ],
      includeGridData: true
    }).then(function(response) {
      var range = response.result;
      if (range.valueRanges.length > 0) {
        //Create Monsters add them to biome
        for (var i = 0; i < range.valueRanges.length; i++) {
          let data = range.valueRanges[i];
          let row = extractNum(data.range);

          let monster = new Monster(data.values[0], row);
          HBMap.biomes[monster.biome].addMonster(monster);
        }
      } else {
        console.log("No Data Found.");
      }
    });
  });
}

        // // Get the button that opens the modal
        // var btn = document.getElementById("myBtn");

function extractNum(string) {
  let array = string.split("N");
  return parseInt(array[array.length - 1]);
}

// Get the modal
var modal = document.getElementById('myModal');
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// Get the button that opens the modal
var aboutBtn = document.getElementById("aboutBtn");
aboutBtn.addEventListener("click", aboutHandle);
function aboutHandle(e) {
  e.preventDefault();
  let modalHeader = document.getElementById("modal-header");
  let head = document.getElementById("header");
  let para1 = document.createElement("p");
  let node = document.createTextNode("About");

  modal.style.display = "block";
  modalHeader.style.backgroundColor = '#7ea6e0';
  para1.appendChild(node);
  head.appendChild(para1);

  let main = document.getElementsByClassName('modal-body')[0];
  let para2 = document.createElement("p");
  para2.id = "detail-body";
  let text = document.createTextNode(
    "Here Be Monsters is a visual representation of data points stored in a spreadsheet. It uses Googles Sheets API and HTML canvas to create an interactive map. Given any spreadsheet, a similar system can be implemented in order to create a pleasing display for users. You can visit the original spreadsheet here: "
  );
  let anchor = document.createElement("a");
  anchor.href = "https://goo.gl/mV8Dq8";
  anchor.innerText = "Monsters";
  para2.appendChild(text);
  para2.appendChild(anchor);
  main.appendChild(para2);
}

var helpBtn = document.getElementById("helpBtn");
helpBtn.addEventListener("click", helpHandle);

function helpHandle(e) {
  e.preventDefault();
  let modalHeader = document.getElementById("modal-header");
  let head = document.getElementById("header");
  let para1 = document.createElement("p");
  let node = document.createTextNode("Help");

  modal.style.display = "block";
  modalHeader.style.backgroundColor = '#7ea6e0';
  para1.appendChild(node);
  head.appendChild(para1);

  let main = document.getElementsByClassName('modal-body')[0];
  let para2 = document.createElement("p");
  para2.id = "detail-body";
  let text = document.createTextNode(
    "Each of the Hexagrams on the map below represent a Biome, each containing a unique assortment of dangerous monsters. The selection is a semi-randomized list of those monsters and their associated data. Feel free to explore and see what you find!"
  );
  para2.appendChild(text);
  main.appendChild(para2);
}

span.onclick = function() {
    modal.style.display = "none";
    let head = document.getElementById("header");
    let node = head.firstElementChild;
    let main = document.getElementsByClassName('modal-body')[0];
    let node2 = document.getElementById("detail-body");

    head.removeChild(node);
    main.removeChild(node2);
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        let head = document.getElementById("header");
        let node = head.firstElementChild;
        let main = document.getElementsByClassName('modal-body')[0];
        let node2 = document.getElementById("detail-body");
        //remove child
        head.removeChild(node);
        main.removeChild(node2);
    }
};
// Loads the JavaScript client library and invokes `start` afterwards.
gapi.load('client', start);
HBMap.render();


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
const { columns } = __webpack_require__(2);
const { Hex } = __webpack_require__(3);
const { Biome } = __webpack_require__(4);

class Map {
  constructor(){
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext('2d');
    this.startX = 300;
    this.startY = 100;
    this.columns = columns;
    this.hexs = {};
    this.keys = [];
    this.biomes = {};
    this.clickHandler = this.clickHandler.bind(this);
    this.resetDetails = this.resetDetails.bind(this);

    this.populate();
  }

  populate() {
    for (var i = 0; i < this.columns.length; i++) {
      let column = this.columns[i];

      for (var j = 0; j < column.length; j++) {
        let biome = new Biome(column[j].biome);
        if (this.biomes[biome.biome] === undefined) {
          this.biomes[biome.biome] = biome;
        }

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
        //hex is correct, the biomes aren't being added.
        let detes = this.biomes[hex.biome].details();
        this.addDetails(detes);
        // Get the modal
        var modal = document.getElementById('myModal');

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks the button, open the modal
          modal.style.display = "block";

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
            this.resetDetails();
        }.bind(this);

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                this.resetDetails();
            }
        }.bind(this);
      }
    }
  }

  addDetails(details) {
    let modalHeader = document.getElementById("modal-header");
    let head = document.getElementById("header");
    let para = document.createElement("p");
    let node = document.createTextNode(details.name);

    //Creates Header text
    para.appendChild(node);
    head.appendChild(para);
    modalHeader.style.backgroundColor = details.color;

    for (var j = 0; j < details.monsters.length; j++) {
      let mon = details.monsters[j];
      let li = document.getElementById(`monster${j + 1}`);

      li.innerHTML = `
      <p class="monster-name">${mon.name}</p>
      <ul class="monster-details">
        <li class="monster-li">XP: ${mon.xp}<li>
        <li class="monster-li">Size: ${mon.size}<li>
        <li class="monster-li">Type: ${mon.type}<li>
        <li class="monster-li">Description: ${mon.description}<li>
      </ul>
      `;
    }
  }

  resetDetails() {
    var head = document.getElementById("header");
    let div = document.getElementsByClassName("modal-body")[0];
    let ul = div.firstElementChild;
    let para = head.firstElementChild;
    let main = document.getElementsByClassName('modal-body')[0];
    let node2 = document.getElementById("detail-body");
    head.removeChild(para);
    if (node2) {
      main.removeChild(node2);
    }
    for (var j = 0; j < 3; j++) {
      let li = document.getElementById(`monster${j + 1}`);

      li.innerHTML = ``;
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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "columns", function() { return columns; });
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




/***/ }),
/* 3 */
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



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
class Biome {
  constructor(type) {
    let area = "";
    let code = "";
    switch (type) {
      case "Forest":
        area = "Forest";
        code = "#97d077";
        break;
      case "Mountain":
        area = "Mountain";
        code = "#a18160";
        break;
      case "Desert":
        area = "Desert";
        code = "#fff2cc";
        break;
      case "Volcano":
        area = "Volcano";
        code = "#ff3333";
        break;
    }
    this.biome = area;
    this.color = code;
    this.monsters = [];
    this.addMonster = this.addMonster.bind(this);
    this.details = this.details.bind(this);
  }

  addMonster(monster) {
    this.monsters.push(monster);
  }

  getRandomSubarray(arr, size) {
      var shuffled = arr.slice(0), i = arr.length, temp, index;
      while (i--) {
          index = Math.floor((i + 1) * Math.random());
          temp = shuffled[index];
          shuffled[index] = shuffled[i];
          shuffled[i] = temp;
      }
      return shuffled.slice(0, size);
  }

  details() {
    //Create selected array from list of monsters
    //return that so it can be displayed in a list
    let selected = this.getRandomSubarray(this.monsters, 3);

    return {
      name: this.biome,
      color: this.color,
      monsters: selected
    };
  }
}
/* harmony export (immutable) */ __webpack_exports__["Biome"] = Biome;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
class Monster {
  constructor(dataArr, id) {
    //Data passed in as an array from google api response
    this.name = dataArr[0];
    this.size = dataArr[2];
    this.type = dataArr[3];
    this.biome = dataArr[6];
    this.level = dataArr[7];
    this.xp = dataArr[8];
    this.description = dataArr[13];
    this.id = id; //Row in the spreadsheet

    this.details = this.details.bind(this);
  }

  details() {
    return {
      id: this.id,
      name: this.name,
      size: this.size,
      type: this.type,
      biomes: this.biome,
      level: this.level,
      xp: this.xp,
      description: this.description
    };
  }
}
/* harmony export (immutable) */ __webpack_exports__["Monster"] = Monster;



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map