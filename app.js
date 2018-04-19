const { Map } = require('./canvas_visuals/canvas.js');

// const { workbook } = require('./data/data.js');

let HBMap = new Map;
HBMap.render();

function start() {
  // Initializes the client with the API key and the Translate API.
  gapi.client.init({
    'apiKey': 'AIzaSyC3H_vpeG4Vcp2VEx-UjqAIW96US0Ddono',
    'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  });
}

function fetch(id) {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '10i952_UlOAfVAIBbAVskHEIXqR3miTTdRbQE6xElqzg',
    range: `A${id}:N${id}`,
    includeGridData: true
  }).then(function(response) {
    var range = response.result;
    if (range.values.length > 0) {
      console.log(range);
    } else {
      // appendPre('No data found.');
      console.log("No Data Found.");
    }
  }, function(response) {
    // appendPre('Error: ' + response.result.error.message);
    console.log(response);
  });
}

// Loads the JavaScript client library and invokes `start` afterwards.
gapi.load('client', start);
gapi.load('client', fetch(2));
