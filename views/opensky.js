var host = "https://opensky-network.org/api";
var path = "/states/all";
var url_unsplash = host+path;


fetch(url_unsplash)
  .then(function(response){return response.json();})
  .then(function(data){
    console.log("coucou mika :: " + data.time + ", "+data.states);
  });
