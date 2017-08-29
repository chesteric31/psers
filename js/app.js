if ('serviceWorker' in navigator) {
     navigator.serviceWorker
             .register('./sw.js')
             .then(function() { console.log('Service Worker Registered'); });
}
(function() {
  'use strict';

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