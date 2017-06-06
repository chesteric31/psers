(function() {
  'use strict';

  var app = {
    spinner: document.querySelector('.loader')
  };

  var container = document.querySelector('.container');

  function fetchLastEpisodes() {
    var url = 'https://api.tvmaze.com/shows/11?embed=nextepisode';
    fetch(url)
    .then(function(fetchResponse){ 
      return fetchResponse.json();
    })
    .then(function(response) {
        container.querySelector('.first').innerHTML = buildHtml(response);


        app.spinner.setAttribute('hidden', true); //hide spinner
      })
      .catch(function (error) {
        console.error(error);
      });
    var url = 'https://api.tvmaze.com/shows/8167?embed=nextepisode';
    fetch(url)
    .then(function(fetchResponse){ 
      return fetchResponse.json();
    })
    .then(function(response) {
        container.querySelector('.second').innerHTML = buildHtml(response);


        app.spinner.setAttribute('hidden', true); //hide spinner
      })
      .catch(function (error) {
        console.error(error);
      });
    var url = 'https://api.tvmaze.com/shows/170?embed=nextepisode';
    fetch(url)
    .then(function(fetchResponse){ 
      return fetchResponse.json();
    })
    .then(function(response) {
        container.querySelector('.third').innerHTML = buildHtml(response);


        app.spinner.setAttribute('hidden', true); //hide spinner
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  function buildHtml ( response ) {
    var html = "<img class='card__img' src='" + response.image.original.replace("http", "https") + "' />";
        
        if (response._embedded != undefined) {
          html += "<h4> Name: " + response._embedded.nextepisode.name + "</h4>"
          +
          "<h4> Number: " + response._embedded.nextepisode.number + "</h4>"
          +
          "<h4> Air stamp: " + (new Date(response._embedded.nextepisode.airstamp)).toUTCString() +  "</h4>"
          +
          "<h4><a href='" + response._embedded.nextepisode.url.replace("http", "https") + "'>Click me to see more!</a>"  + "</h4>"
        } else {
          html += "No more episode for now";
        };
    return html;
  }

  fetchLastEpisodes();
})();