const { Map } = require('./canvas_visuals/canvas.js');
const { Monster } = require('./monster/monster.js');

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
        console.log(range);
      } else {
        console.log("No Data Found.");
      }
    });
  });
}

function extractNum(string) {
  let array = string.split("N");
  return parseInt(array[array.length - 1]);
}

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// Loads the JavaScript client library and invokes `start` afterwards.
gapi.load('client', start);
HBMap.render();
