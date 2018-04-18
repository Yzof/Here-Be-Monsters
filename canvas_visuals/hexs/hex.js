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

export class Hex {
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
