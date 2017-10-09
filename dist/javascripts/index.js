
const https = require('https');
const axios = require("axios");

const clientId = 'c226804d0c4c8924afa47211d6037b677bd31083a26f21d6baccd7c1f8493cb6';

var express = require('express');
var router = express.Router();

var unsplash_photo_name;
var unsplash_photo_title;
var unsplash_photo_url;

var options = {
  host: "https://api.unsplash.com",
  port: 443,
  path: "/photos/random/?client_id="+clientId,
  method: "GET"
};

// only invoked if the path starts with '/' from the mount point
router.use('/', function(req, res, next) {
  console.log("Coucou Michael");
  var url = options.host+options.path;
  axios
    .get(url)
    .then(response => {
      console.log(
        `Title: ${response.data.description} -`,
        `Name: ${response.data.user.name} -`,
        `Photo_url: ${response.data.urls.regular} -`
      );
      unsplash_photo_name = response.data.user.name;
      unsplash_photo_title = response.data.description;
      unsplash_photo_url = response.data.urls.regular;
    })
    .catch(error => {
      console.log(error);
    });
  next();

});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SkyGuard', img_photograph: unsplash_photo_name, img_description: unsplash_photo_title, img_url: unsplash_photo_url });
});

module.exports = router;
