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
        "name": "flights_ADS-B_opensky",
        "type": "geojson",
        "data":[],
        "layout": {
            "icon-image": "{icon}-15",
            "text-field": "{title}",
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [0, 0.6],
            "text-anchor": "top"
        }
    };

    for( var i=0; i< data.states.length; i++ ){
      jsonFlightData.data.push(
        {
        "type" : "flight",
        "properties":{
          "id": i,
          "icao": data.states[i][0],
          "callsign":data.states[i][1],
          "maker-symbol":"monument"
        },
        "geometry":{
          "type":"Point",
          "coordinates":[data.states[i][5],data.states[i][6]]
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
      zoom: 7, // starting zoom
      bearing: 21.60,
      pitch: 60
  });
  // Add controls to the map
  var nav = new mapboxgl.NavigationControl();
  map.addControl(nav, 'bottom-right');

  map.on('load', function(){
    // map.addLayer({
    //
    // });
    console.log('Map is loading...');

  });
  // Add JsonData to the map
  addDataToMap();
}

// 3 - On ajoute les data à la map
function addDataToMap(){
  map.addSource('flights',{
    type: 'geojson',
    data: jsonFlightData
  });
}
