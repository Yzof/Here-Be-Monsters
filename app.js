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
    debugger;
    return gapi.client.request({
      path: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSZAkr1mDh-DWEIP6kSrERE3Bj4BnGCzCLBVyGJfl_4g0JBWWYSa-YDYGDw9nijqGMFE8JvMkghghPA/pubhtml?gid=1031805306&single=true"
    });
  }).then(function(response) {
    //Do stuff with response
    console.log("response:", response);
  }, function(reason) {
    console.log('Error: ' + reason.result.error.message);
  });
}

// Loads the JavaScript client library and invokes `start` afterwards.
gapi.load('client', start);
