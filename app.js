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
