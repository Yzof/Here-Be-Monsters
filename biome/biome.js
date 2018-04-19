const { Monster } = require('../monster/monster.js');

export class Biome {
  constructor(type) {
    switch (type) {
      case "forest":
        this.biome = "Forest";
        this.color = "#97d077";
        this.monsterIds = [];
        break;
      case "mountain":
        this.biome = "Mountain";
        this.color = "#a18160";
        this.monsterIds = [];
        break;
      case "desert":
        this.biome = "Desert";
        this.color = "#fff2cc";
        this.monsterIds = [];
        break;
      case "volcano":
        this.biome = "Volcano";
        this.color = "#ff3333";
        this.monsterIds = [959];
        break;
    }
  }

  monsters() {


    return {

    };
  }
}
