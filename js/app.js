if ('serviceWorker' in navigator) {
     navigator.serviceWorker
             .register('./sw.js')
             .then(function() { console.log('Service Worker Registered'); });
}
(function() {
  'use strict';

  function fetchShows() {
    var url = 'https://api.tvmaze.com/search/shows?q=' + document.querySelector('#showToAdd').value;
    fetch(url)
    .then(function(fetchResponse){ 
      return fetchResponse.json();
    })
    .then(function(response) {
    	var options = document.querySelectorAll("option");
    	Array.prototype.forEach.call( options, function( node ) {
    		node.parentNode.removeChild( node );
		});
	    response.forEach(function(item) {
	    	var option = document.createElement('option');
	        option.label = item.show.name;
	        option.value = item.show.id;
	        shows.appendChild(option);
	    });
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  
  document.querySelector("#showToAdd").addEventListener('keyup', function () {
    if (document.querySelector('#showToAdd').value.length > 2) {
      fetchShows();
    }
  });
  document.querySelector("#showToAdd").addEventListener('input', function () {
    console.log(document.querySelector('#showToAdd').value);
  });

})();