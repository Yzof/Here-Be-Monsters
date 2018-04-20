export class Biome {
  constructor(type) {
    let area = "";
    let code = "";
    switch (type) {
      case "forest":
        area = "Forest";
        code = "#97d077";
        break;
      case "mountain":
        area = "Mountain";
        code = "#a18160";
        break;
      case "desert":
        area = "Desert";
        code = "#fff2cc";
        break;
      case "volcano":
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
