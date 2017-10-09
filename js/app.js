if ('serviceWorker' in navigator) {
     navigator.serviceWorker
             .register('./sw.js')
             .then(function() { console.log('Service Worker Registered'); });
}
(function() {
  'use strict';

  function fetchShows(event) {
    var url = 'https://api.tvmaze.com/search/shows?q=' + event.target.value;
    fetch(url)
    .then(function(fetchResponse){ 
      return fetchResponse.json();
    })
    .then(function(response) {
    	var options = document.querySelectorAll("option");
    	Array.prototype.forEach.call( options, function( node ) {
    		node.parentNode.removeChild( node );
		});
	    response.forEach(function(response) {

	    	var option = document.createElement("section");
        option.class = "card";
        option.innerHTML = response.show.name + "<img class='card__img' src='" + response.show.image.medium.replace("http", "https") + "' />"
	        console.log(response.show.name);
	        document.querySelector("#shows").appendChild(option);
	    });
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  document.addEventListener("DOMContentLoad", onReady, false);

  function onReady() {
    $("#selectShow").select2({
  ajax: {
    url: "https://api.tvmaze.com/search/shows?q=",
    dataType: 'json',
    delay: 250,
    data: function (params) {
      return {
        q: params.term, // search term
        page: params.page
      };
    },
    processResults: function (data, params) {
      // parse the results into the format expected by Select2
      // since we are using custom formatting functions we do not need to
      // alter the remote JSON data, except to indicate that infinite
      // scrolling can be used
      params.page = params.page || 1;

      return {
        results: data.items,
        pagination: {
          more: (params.page * 30) < data.total_count
        }
      };
    },
    cache: true
  },
  escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
  minimumInputLength: 1,
  templateResult: formatRepo, // omitted for brevity, see the source of this page
  templateSelection: formatRepoSelection // omitted for brevity, see the source of this page
});
  }
  $("#shows").select2({
    placeholder: 'Select a show',
    allowClear: true,
    selectOnClose: true,
    minimumInputLength: 3,
    multiple: true,
    ajax: {
      url: function (params) {
        return "https://api.tvmaze.com/search/shows?q=" + params.term;
      },
      dataType: "json",
      delay: 250,
      processResults: function (data, params) {

        return {
            results: $.map(data, function(obj) {
              return { id: obj.show.id, text: obj.show.name };
          })
        };
      }
    }
  });

})();