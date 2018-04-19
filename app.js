const { Map } = require('./canvas_visuals/canvas.js');

// const { workbook } = require('./data/data.js');

let HBMap = new Map;
HBMap.render();

// function loadData() {
//   var url="https://docs.google.com/spreadsheets/d/e/2PACX-1vSZAkr1mDh-DWEIP6kSrERE3Bj4BnGCzCLBVyGJfl_4g0JBWWYSa-YDYGDw9nijqGMFE8JvMkghghPA/pubhtml?gid=1031805306&single=true?key=AIzaSyC3H_vpeG4Vcp2VEx-UjqAIW96US0Ddono";
//   let xmlhttp = new XMLHttpRequest();
//   console.log("base load");
//   xmlhttp.open("GET",url,true);
//   console.log(xmlhttp, "open xmlhttp");
//   xmlhttp.onreadystatechange = function() {
//     // console.log(xmlhttp.withCredentials);
//     // if (xmlhttp.readyState === 4) {
//     //   console.log(xmlhttp.status, "ready 4");
//     // }
//     console.log(xmlhttp.readyState, "ready state");
//     console.log(xmlhttp.status, "status");
//     if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
//       console.log(xmlhttp.responseText);
//       console.log("hello");
//     }
//   };
//   xmlhttp.send();
// }
//
// window.onload = loadData;

function start() {
  // Initializes the client with the API key and the Translate API.
  gapi.client.init({
    'apiKey': 'AIzaSyC3H_vpeG4Vcp2VEx-UjqAIW96US0Ddono',
    'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  }).then(function() {
    // Executes an API request, and returns a Promise.
    // console.log(anything);
    // let resp = gapi.client.request({
    //   "path": "https://docs.google.com/spreadsheets/d/e/2PACX-1vSZAkr1mDh-DWEIP6kSrERE3Bj4BnGCzCLBVyGJfl_4g0JBWWYSa-YDYGDw9nijqGMFE8JvMkghghPA/pubhtml?gid=1031805306&single=true"
    // });
    // return resp;
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '10i952_UlOAfVAIBbAVskHEIXqR3miTTdRbQE6xElqzg',
      clientId: "733051836624-9l0ljgjagc03pl7pl210f9s2huebu7ca.apps.googleusercontent.com",
      range: 'A1:N2',
      includeGridData: true
    }).then(function(response) {
      var range = response.result;
      if (range.values.length > 0) {
        // appendPre('Name, Major:');
        // for (i = 0; i < range.values.length; i++) {
        //   var row = range.values[i];
        //   // Print columns A and E, which correspond to indices 0 and 4.
        //   appendPre(row[0] + ', ' + row[4]);
        // }
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

/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */
function list() {

}
// Loads the JavaScript client library and invokes `start` afterwards.
gapi.load('client', start);
