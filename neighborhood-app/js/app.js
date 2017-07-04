var locations = [
  { name: "Badarpur",             lat: 28.493498,  lng: 77.302969         },
  { name: "Sector 28",            lat: 28.4382752, lng: 77.30896249999999 },
  { name: "Badkhal Mor",          lat: 28.422814,  lng: 77.310278         },
  { name: "Faridabad Old",        lat: 28.410672,  lng: 77.31134          },
  { name: "Neelam Chowk Ajronda", lat: 28.3976295, lng: 77.31232519999999 }
];

var Marker = function(data) {
  this.name = ko.observable(data.name);
  this.lat  = ko.observable(data.lat);
  this.lng  = ko.observable(data.lng);
}

var ViewModel = function() {
  var self     = this;
  this.markers = ko.observableArray([]);

  locations.forEach(function(location) {
    self.markers.push(new Marker(location));
  });

  this.currentMarker = ko.observable(this.markers()[0]);

  this.setCurrentMarker = function(marker) {
    console.log("Setting current marker as: " + marker.name());
    self.currentMarker(marker);
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

var viewModel = new ViewModel();
ko.applyBindings(viewModel);


/* Callback method for rendering Google Map */
function initMap() {
  var markers = [];

  viewModel.filteredMarkers().forEach(function(filteredMarker) {
    markers.push({ lat: filteredMarker.lat(), lng: filteredMarker.lng() });
  });


  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: markers[0]
  });

  console.log(markers);
  markers.forEach(function(marker) {
    new google.maps.Marker({ position: marker, map: map });
  });
}