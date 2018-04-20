const { Map } = require('./canvas_visuals/canvas.js');

// const { workbook } = require('./data/data.js');

let HBMap = new Map;
HBMap.render();

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
        console.log("test1");
        console.log(range);
      } else {
        // appendPre('No data found.');
        console.log("No Data Found.");
      }
    }, function(response) {
      // appendPre('Error: ' + response.result.error.message);
      console.log(response);
    });
  });
}


// Loads the JavaScript client library and invokes `start` afterwards.
gapi.load('client', start);
