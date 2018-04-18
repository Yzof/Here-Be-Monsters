const { Map } = require('./canvas_visuals/canvas.js');

// const { workbook } = require('./data/data.js');

let HBMap = new Map;
HBMap.render();

function loadData() {
  var url="https://docs.google.com/spreadsheets/d/e/2PACX-1vSZAkr1mDh-DWEIP6kSrERE3Bj4BnGCzCLBVyGJfl_4g0JBWWYSa-YDYGDw9nijqGMFE8JvMkghghPA/pubhtml?gid=1031805306&single=truekey=AIzaSyC3H_vpeG4Vcp2VEx-UjqAIW96US0Ddono";
  let xmlhttp = new XMLHttpRequest();
  console.log("base load");
  xmlhttp.open("GET",url,true);
  console.log(xmlhttp, "open xmlhttp");
  xmlhttp.onreadystatechange = function() {
    // console.log(xmlhttp.withCredentials);
    // if (xmlhttp.readyState === 4) {
    //   console.log(xmlhttp.status, "ready 4");
    // }
    console.log(xmlhttp.readyState, "ready state");
    console.log(xmlhttp.status, "status");
    if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
      console.log(xmlhttp.responseText);
      console.log("hello");
    }
  };
  xmlhttp.send();
}

window.onload = loadData;
