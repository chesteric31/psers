(function() {
  'use strict';

  var app = {
    spinner: document.querySelector('.loader')
  };

  var container = document.querySelector('.container');

  function fetchLastEpisodes() {
    navigator.serviceWorker.ready
      .then(function(registration) {
        registration.pushManager.getSubscription().then(subscription => {
        console.log(subscription);
        if (typeof subscription != 'undefined' && subscription != null) {
          var subscription_id = subscription.endpoint.split('gcm/send/')[1];
          fetchShows(subscription_id);
        }
      })
    });
    /*fetchEpisode(8167, ".second");
    fetchEpisode(170, ".third");
    fetchEpisode(66, ".fourth");
    fetchEpisode(5495, ".fifth");*/
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

  function fetchShows ( subscription_id ) {
    var url = 'https://psers-api.herokuapp.com/api/user/' + subscription_id;
    fetch(url)
    .then(function(fetchResponse){ 
        console.log(fetchResponse);
      return fetchResponse.json();
    })
    .then(function(response) {
        console.log(response);
        if (response.success == true) {
          response.user.watching_shows_tvmaze_ids.forEach(function(show_id) {
            fetchEpisode(show_id);
          });
        } else {
          alert('Error in fetch shows.');
          return;
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function fetchEpisode ( id ) {
    var url = 'https://api.tvmaze.com/shows/' + id + '?embed=nextepisode';
    fetch(url)
    .then(function(fetchResponse){ 
      return fetchResponse.json();
    })
    .then(function(response) {
        var section = document.createElement("section");
        section.className = "card";
        section.innerHTML = buildHtml(response);
        container.appendChild(section);
        app.spinner.setAttribute('hidden', true); //hide spinner
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  fetchLastEpisodes();
})();