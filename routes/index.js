
const https = require('https');
const axios = require("axios");

const clientId = 'c226804d0c4c8924afa47211d6037b677bd31083a26f21d6baccd7c1f8493cb6';

var express = require('express');
var router = express.Router();

var unsplash_photo_name;
var unsplash_photo_title;
var unsplash_photo_url;

var mapScripts = [{
  script: 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.41.0/mapbox-gl.js',
  script: 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.41.0/mapbox-gl.css'
}];

var options = {
  host: "https://api.unsplash.com",
  port: 443,
  path: "/photos/random/?client_id="+clientId,
  method: "GET"
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SkyGuard', scripts: mapScripts });
});

module.exports = router;
