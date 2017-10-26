const clientId = 'c226804d0c4c8924afa47211d6037b677bd31083a26f21d6baccd7c1f8493cb6';

var myhero = document.querySelector('.hero');
var imgName = myhero.querySelector('.photographname span');
var imgDescription = myhero.querySelector('.photocaption span');


var host = "https://api.unsplash.com";
var path = "/photos/random/?client_id="+clientId;
var url_unsplash = host+path;


fetch(url_unsplash)
  .then(function(response){return response.json();})
  .then(function(data){
    myhero.style.backgroundImage= "url('"+data.urls.regular+"')";
    imgName.textContent = data.user.name;
    imgDescription.textContent = data.description;
  });
