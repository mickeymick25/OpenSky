var host = "https://opensky-network.org/api";
var path = "/states/all";
var url_opensky = host+path;
var map;
var jsonFlightData = {};
var jsonFlightOpensky = {};

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
function getFlights(){
  fetch(url_opensky)
    .then(function(response){return response.json();})
    .then(function(data){
      var alt_min;
      var alt_max;

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

        if(alt_min == undefined){
          alt_min = data.states[i][7];
        }
        if(alt_max == undefined){
          alt_max = data.states[i][7];
        }

        if( data.states[i][7] < alt_min && alt_min != undefined ){
          alt_min = data.states[i][7];
        }
        if( data.states[i][7] > alt_max && alt_max != undefined ){
          alt_max = data.states[i][7];
        }
      }
      // console.log(jsonFlightData);
      console.log("alt_min :: "+alt_min);
      console.log("alt_max :: "+alt_max);

    });
}

// 2 - On dessine la map
function drawMap(){
  // Map Calling & customization
  mapboxgl.accessToken = 'pk.eyJ1IjoibWlja2V5bWljazI1IiwiYSI6ImNqOThvcmY0ejBwdjYyd24ycmUwb2J5OG8ifQ.FtLU2J74aNJxTx7_WTRxlw';
  map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mickeymick25/cj9ffl8ym04tj2ro4zbvmj9n2', // stylesheet location
      center: [2.095, 48.745], // starting position [lng, lat]
      zoom: 8, // starting zoom
      //bearing: 21.60,
      //pitch: 40
  });

  // Add controls to the map
  var nav = new mapboxgl.NavigationControl();
  map.addControl(nav, 'bottom-right');

  //
  map.on('load', function(){
    map.addSource('points', {
      type: 'geojson',
      data: jsonFlightData.data
    });

    // Define a style for all the flights.
    map.addLayer({
      "id":"flights",
      "type":"symbol",
      "source": "points",
      "layout":{
        "icon-image": "airport-15",
        "icon-rotate": { "type": "identity", "property": "heading" },
        "icon-allow-overlap": false,
        "icon-ignore-placement": false,
        "icon-pitch-alignment" : "map"
      },
      "paint":{
        // "icon-color": "#FF0000"
      }
    });
  });

  /* Define interaction with flights */
  map.on('click', 'flights', function(e){
    map.flyTo({center: e.features[0].geometry.coordinates});
    console.log("flight event: Flight clicked!");
    console.log("flight event: Flight "+e.features[0].properties.callsign);
  });

  map.on('mouseenter', 'flights', function(){
    console.log("flight event: Mouse entered!");
  });

  map.on('mouseleave', 'flights', function(){
    console.log("flight event: Mouse leaved!");
  });

  window.setInterval(function() {
    console.log("------------------------------------ Log");
    getFlights();
    map.getSource('points').setData(jsonFlightData.data);
  }, 10500);

  // window.setInterval(function(){
  //
  // }, 1000);

}

this.drawMap();
this.getFlights();
