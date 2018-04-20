export class Monster {
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
