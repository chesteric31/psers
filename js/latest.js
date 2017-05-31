(function() {
  'use strict';

  var app = {
    spinner: document.querySelector('.loader')
  };

  var container = document.querySelector('.container');


  // Get Commit Data from Github API
  function fetchCommits() {
    //var url = 'https://api.github.com/repos/unicodeveloper/resources-i-like/commits';
    var url = 'http://api.tvmaze.com/shows/11?embed=nextepisode';
    fetch(url)
    .then(function(fetchResponse){ 
      return fetchResponse.json();
    })
    .then(function(response) {

        container.querySelector('.first').innerHTML = 
        "<img src='" + response.image.medium + "' />"
        +
        "<h4> Name: " + response._embedded.nextepisode.name + "</h4>"
        +
        "<h4> Number: " + response._embedded.nextepisode.number + "</h4>"
        +
        "<h4> Air stamp: " + (new Date(response._embedded.nextepisode.airstamp)).toUTCString() +  "</h4>"
        +
        "<h4><a href='" + response._embedded.nextepisode.url + "'>Click me to see more!</a>"  + "</h4>"
        ;


        app.spinner.setAttribute('hidden', true); //hide spinner
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  fetchCommits();
})();