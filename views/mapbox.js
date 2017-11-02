// Map Calling & customization
mapboxgl.accessToken = 'pk.eyJ1IjoibWlja2V5bWljazI1IiwiYSI6ImNqOThvcmY0ejBwdjYyd24ycmUwb2J5OG8ifQ.FtLU2J74aNJxTx7_WTRxlw';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mickeymick25/cj9ffl8ym04tj2ro4zbvmj9n2', // stylesheet location
    center: [2.095, 48.745], // starting position [lng, lat]
    zoom: 15, // starting zoom
    bearing: 21.60,
    pitch: 60
});
// Add controls to the map
var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'bottom-right');
