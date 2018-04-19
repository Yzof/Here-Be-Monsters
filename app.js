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
      ranges: ['A1:N2', 'A3:N3'],
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
