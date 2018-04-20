export class Biome {
  constructor(type) {
    switch (type) {
      case "forest":
        this.biome = "Forest";
        this.color = "#97d077";
        this.monsters = [];
        break;
      case "mountain":
        this.biome = "Mountain";
        this.color = "#a18160";
        this.monsters = [];
        break;
      case "desert":
        this.biome = "Desert";
        this.color = "#fff2cc";
        this.monsters = [];
        break;
      case "volcano":
        this.biome = "Volcano";
        this.color = "#ff3333";
        this.monsters = [];
        break;
    }
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
