const { columns } = require('./columns.js');
const { Hex } = require('./hexs/hex.js');
const { Biome } = require('../biome/biome.js');

export class Map {
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
