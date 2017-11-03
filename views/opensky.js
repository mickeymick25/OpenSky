var host = "https://opensky-network.org/api";
var path = "/states/all";
var url_opensky = host+path;
var map;
var jsonFlightData = {};

// Helpers
function unixTimeToFormat(unixTime){
  // We create a new Javascript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  var date = new Date(unixTime*1000);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();
  // Will display time in hh:mm:ss format
  return formattedTime = hours +':'+ minutes.substr(-2) +':'+ seconds.substr(-2);
}


// 1 - Retreive data from opensky
fetch(url_opensky)
  .then(function(response){return response.json();})
  .then(function(data){
    // from https://opensky-network.org/apidoc/rest.html
    console.log("Nb Vols :: " + unixTimeToFormat(data.time) + " :: "+data.states.length);
    jsonFlightData = {
      "type":"geojson",
      "data":{
        "type": "FeatureCollection",
        "features":[]
      }
    };

    for( var i=0; i< data.states.length; i++ ){
      jsonFlightData.data.features.push(
        {
        "type":"flight",
        "geometry":{
          "type": "Point",
          "coordinates":[data.states[i][5], data.states[i][6]]
        },
        "properties":{
          "icao":           data.states[i][0],
          "callsign":       data.states[i][1],
          "origin":         data.states[i][2],
          "timePosition":   data.states[i][3],
          "lastContact":    data.states[i][4],
          "altitude":       data.states[i][7],
          "onGround":       data.states[i][8],
          "velocity":       data.states[i][9],
          "heading":        data.states[i][10],
          "verticalRate":   data.states[i][11],
          "sensors":        data.states[i][12],
          "baroAltitude":   data.states[i][13],
          "squawk":         data.states[i][14],
          "spi":            data.states[i][15],
          "positionSource": data.states[i][16]
        }
      });
      // jsonFlightData['id']            = i;
      // jsonFlightData['icao']          = data.states[i][0];
      // jsonFlightData['callsign']      = data.states[i][1];
      // jsonFlightData['origin']        = data.states[i][2];
      // jsonFlightData['timePosition']  = unixTimeToFormat(data.states[i][3]);
      // jsonFlightData['lastContact']   = unixTimeToFormat(data.states[i][4]);
      // jsonFlightData['longitude']     = data.states[i][5];
      // jsonFlightData['latitude']      = data.states[i][6];
      // jsonFlightData['altitude']      = data.states[i][7];
      // jsonFlightData['onGround']      = data.states[i][8];
      // jsonFlightData['velocity']      = data.states[i][9];
      // jsonFlightData['heading']       = data.states[i][10];
      // jsonFlightData['verticalRate']  = data.states[i][11];
      // jsonFlightData['sensors']       = data.states[i][12];
      // jsonFlightData['baroAltitude']  = data.states[i][13];
      // jsonFlightData['squawk']        = data.states[i][14];
      // jsonFlightData['spi']           = data.states[i][15];
      // jsonFlightData['positionSource']= data.states[i][16];
    }
    console.log(jsonFlightData);
    // On dessine la map
    this.drawMap();
  });

// 2 - On dessine la map
function drawMap(){
  // Map Calling & customization
  mapboxgl.accessToken = 'pk.eyJ1IjoibWlja2V5bWljazI1IiwiYSI6ImNqOThvcmY0ejBwdjYyd24ycmUwb2J5OG8ifQ.FtLU2J74aNJxTx7_WTRxlw';
  map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mickeymick25/cj9ffl8ym04tj2ro4zbvmj9n2', // stylesheet location
      center: [2.095, 48.745], // starting position [lng, lat]
      zoom: 5, // starting zoom
      //bearing: 21.60,
      //pitch: 60
  });

  // Add controls to the map
  var nav = new mapboxgl.NavigationControl();
  map.addControl(nav, 'bottom-right');

  //
  map.on('load', function(){
    // Define a style for all the flights.
    map.addLayer({
      "id":"points",
      "type":"symbol",
      "source": jsonFlightData,
      "layout":{
        "icon-image": "airport-15",
        "icon-rotate": { "type": "identity", "property": "heading" }
      },
      // "paint": {
      //   "fill-color": "#00d1b2"
      // }
    });
  });
}
