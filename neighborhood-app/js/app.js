/* Variable to hold the map and all markers */
var map;
var markers = [];
var infoWindow;

/* Predefined locations in the neighborhood */
var locations = [
  { title: 'Badarpur, Delhi',         position: { lat: 28.493498,  lng: 77.302969         }},
  { title: 'Sector 28 Metro Station', position: { lat: 28.4382752, lng: 77.30896249999999 }},
  { title: 'Badkhal Mor',             position: { lat: 28.422814,  lng: 77.310278         }},
  { title: 'Faridabad Old',           position: { lat: 28.410672,  lng: 77.31134          }},
  { title: 'Neelam Chowk Ajronda',    position: { lat: 28.3976295, lng: 77.31232519999999 }}
];

/* Wikipedia info */
var loadWikiInfo = function(marker) {

  var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + marker.title + '&format=json&callback=wikiCallback';
  var wikiRequestTimeout = setTimeout(function() {
    populateInfoWindow(marker, 'Failed to get information from Wikipedia, please try again after sometime :(');
  }, 3000);
  var content = '';

  /* AJAX for fetching data from Wikipedia and loading it into the infoWindow */
  $.ajax({
    url:      wikiUrl,
    dataType: 'jsonp',
    jsonp:    'callback',
    success: function(response) {
      var articleList = response[1];

      for (var i = 0; i < articleList.length; i++) {
        articleStr = articleList[i];
        var url = 'http://en.wikipedia.org/wiki/' + articleStr;
        content += ('<li><a href="' + url + '">' + articleStr + '</a></li>');
      }

      populateInfoWindow(marker, content);
      clearTimeout(wikiRequestTimeout);
    },
    fail: function(response) {
      content = '<li>Sorry, we were unable to retrieve information from Wikipedia :(</li>';
      populateInfoWindow(marker, content);
    }
  });
};

/* ViewModel for Knockout */
var ViewModel = function() {
  var self         = this;
  self.vmMarkers   = ko.observableArray([]);
  self.searchQuery = ko.observable('');

  self.filteredMarkers = ko.computed(function() {
    var searchQueryStr = self.searchQuery().toLowerCase();
    var selectedMarkers;

    if(!searchQueryStr) {
      selectedMarkers = self.vmMarkers();
    } else {
      selectedMarkers = ko.utils.arrayFilter(self.vmMarkers(), function(marker) {
        return marker.title.toLowerCase().indexOf(searchQueryStr) != -1;
      });

      selectedMarkers;
    }

    removeMarkersFromMap();
    renderMarkersOnMap(selectedMarkers);

    return selectedMarkers;
  }, this);


  self.locationClick = function() {
    new google.maps.event.trigger(this, 'click');
  };
};

function removeMarkersFromMap() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
}

function renderMarkersOnMap(selectedMarkers) {
  for(var i = 0; i < selectedMarkers.length; i++) {
    selectedMarkers[i].setMap(map);
  }
}

function populateInfoWindow(marker, content) {
  if (infoWindow.marker != marker) {
    infoWindow.marker = marker;
    infoWindow.setContent('<div>' + '<h3>' + marker.title + '</h3>' + content + '</div>');
    infoWindow.open(map, marker);

    // Make sure the marker property is cleared if the infoWindow is closed
    infoWindow.addListener('closeclick', function() {
      infoWindow.marker = null;
    });
  } else {
    infoWindow.open(map, marker);
  }
}

/* Callback method for rendering Google Map */
function initMap() {
  /* Render the map */
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 28.422814,  lng: 77.310278 },
    zoom:   11
  });

  infoWindow = new google.maps.InfoWindow();

  /* Add markers to the map and markers array, and bind click events for them */
  for (var i = 0; i < locations.length; i++) {
    var position = locations[i].position;
    var title    = locations[i].title;

    var marker = new google.maps.Marker({position: position, map: map, title: title, id: i});
    markers.push(marker);

    marker.addListener('click', function() {
      var thisMarker = this;
      // console.log("Clicked " + thisMarker.getTitle() + " at location: "+ thisMarker.getPosition());

      // Make the selected marker bounce twice
      thisMarker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function() {
        thisMarker.setAnimation(null);
      }, 1400);

      // Diplay info from Wikipedia about this place
      loadWikiInfo(thisMarker);
    });
  }

  for (i = 0; i < markers.length; i++) {
    viewModel.vmMarkers.push(markers[i]);
  }
}

/* Applying bindings in Knockout */
var viewModel = new ViewModel();
ko.applyBindings(viewModel);