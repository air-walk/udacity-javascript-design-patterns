/* Variable to hold the map */
var map;

/* Wikipedia info */
var loadWikiInfo = function(queryStr) {
  var $wikiElem = $('#wikipedia-links');
  $wikiElem.text("");

  var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + queryStr + '&format=json&callback=wikiCallback';
  var wikiRequestTimeout = setTimeout(function() {
      $wikiElem.text("Failed to get information from Wikipedia, please try again after sometime :(");
  }, 3000);

  /* AJAX for fetching data from Wikipedia and loading it into the DOM */
  $.ajax({
    url:      wikiUrl,
    dataType: "jsonp",
    jsonp:    "callback",
    success: function(response) {
      var articleList = response[1];

      for (var i = 0; i < articleList.length; i++) {
        articleStr = articleList[i];
        var url = 'http://en.wikipedia.org/wiki/' + articleStr;
        $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
      };

      clearTimeout(wikiRequestTimeout);
    },
    fail: function(response) {
      $wikiElem.append('<li>Sorry, we were unable to retrieve information from Wikipedia :(</li>');
    }
  });
}

/* Predefined locations in the neighborhood */
var locations = [
  { name: "Badarpur, Delhi",         lat: 28.493498,  lng: 77.302969         },
  { name: "Sector 28 Metro Station", lat: 28.4382752, lng: 77.30896249999999 },
  { name: "Badkhal Mor",             lat: 28.422814,  lng: 77.310278         },
  { name: "Faridabad Old",           lat: 28.410672,  lng: 77.31134          },
  { name: "Neelam Chowk Ajronda",    lat: 28.3976295, lng: 77.31232519999999 }
];

/* Marker representation */
var Marker = function(data) {
  this.name = ko.observable(data.name);
  this.lat  = ko.observable(data.lat);
  this.lng  = ko.observable(data.lng);
}

/* ViewModel for Knockout */
var ViewModel = function() {
  var self     = this;
  this.markers = ko.observableArray([]);

  locations.forEach(function(location) {
    self.markers.push(new Marker(location));
  });

  this.currentMarker = ko.observable(this.markers()[0]);

  this.setCurrentMarker = function(marker) {
    self.currentMarker(marker);
    loadWikiInfo(marker.name());
  };

  this.searchQuery = ko.observable('');
  this.filteredMarkers = ko.computed(function() {
    var searchQueryStr = self.searchQuery().toLowerCase();

    if(!searchQueryStr) {
      return self.markers();
    } else {
      return ko.utils.arrayFilter(self.markers(), function(marker) {
        return marker.name().toLowerCase().indexOf(searchQueryStr) != -1;
      });
    }
  }, this);
}

/* Callback method for rendering Google Map */
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 28.422814,  lng: 77.310278 },
    zoom:   11
  });

  /* Add markers to the map and bind click events for them */
  viewModel.filteredMarkers().forEach(function(filteredMarker) {
    var marker = new google.maps.Marker({ position: new google.maps.LatLng(filteredMarker.lat(), filteredMarker.lng()), map: map, title: filteredMarker.name()});

    marker.addListener('click', function() {
      // console.log("Clicked " + marker.getTitle() + " at location: "+ marker.getPosition());
      viewModel.setCurrentMarker(filteredMarker);

      // Make the selected marker bounce twice
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function() {
        marker.setAnimation(null);
      }, 1400);
    });
  });
}

/* Applying bindings in Knockout */
var viewModel = new ViewModel();
ko.applyBindings(viewModel);